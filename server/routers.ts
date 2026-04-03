import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { ENV } from "./_core/env";
import {
  createCustomer,
  getCustomerByEmail,
  getCustomerById,
  updateCustomerAsaasId,
  createSubscription,
  updateSubscriptionAsaasData,
  getSubscriptionByCustomerId,
  getSubscriptionByAsaasId,
  updateSubscriptionStatus,
} from "./db";
import {
  createAsaasCustomer,
  createAsaasSubscription,
  getAsaasPaymentLink,
  sendWhatsAppMessage,
  PLAN_VALUES,
  PLAN_LABELS,
  PLAN_INCLUDES,
} from "./asaas";

const CUSTOMER_COOKIE = "clubin_customer";

async function signCustomerToken(customerId: number) {
  const secret = new TextEncoder().encode(ENV.cookieSecret || "fallback-secret");
  return new SignJWT({ customerId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(secret);
}

async function verifyCustomerToken(token: string): Promise<number | null> {
  try {
    const secret = new TextEncoder().encode(ENV.cookieSecret || "fallback-secret");
    const { payload } = await jwtVerify(token, secret);
    return (payload as { customerId: number }).customerId;
  } catch {
    return null;
  }
}

function getNextDueDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  customer: router({
    register: publicProcedure
      .input(
        z.object({
          name: z.string().min(2),
          email: z.string().email(),
          password: z.string().min(6),
          whatsapp: z.string().min(10),
          plan: z.enum(["starter", "pro", "elite"]),
          billingType: z.enum(["PIX", "CREDIT_CARD", "BOLETO"]).default("PIX"),
          billingCycle: z.enum(["monthly", "annual"]).default("monthly"),
        })
      )
      .mutation(async ({ input }) => {
        const existing = await getCustomerByEmail(input.email);
        if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Este e-mail ja esta cadastrado. Faca login para continuar.",
          });
        }

        const passwordHash = await bcrypt.hash(input.password, 10);
        const customer = await createCustomer({
          name: input.name,
          email: input.email,
          passwordHash,
          whatsapp: input.whatsapp,
        });

        const planValue = PLAN_VALUES[input.plan];
        const sub = await createSubscription({
          customerId: customer.id,
          plan: input.plan,
          billingType: input.billingType,
          billingCycle: input.billingCycle,
          value: planValue,
          status: "pending",
        });

        let paymentLink: string | null = null;
        try {
          const asaasCustomer = await createAsaasCustomer({
            name: input.name,
            email: input.email,
            mobilePhone: input.whatsapp,
          });
          await updateCustomerAsaasId(customer.id, asaasCustomer.id);

          const asaasSub = await createAsaasSubscription({
            asaasCustomerId: asaasCustomer.id,
            plan: input.plan,
            billingType: input.billingType,
            nextDueDate: getNextDueDate(),
            cycle: input.billingCycle === "annual" ? "YEARLY" : "MONTHLY",
          });

          paymentLink = await getAsaasPaymentLink(asaasSub.id);
          if (sub) {
            await updateSubscriptionAsaasData(sub.id, asaasSub.id, paymentLink ?? "");
          }
        } catch (err) {
          console.error("[Asaas] Error:", err);
        }

        const planLabel = PLAN_LABELS[input.plan];
        const whatsappMsg = `Ola, ${input.name}! Seu cadastro no *Clubin do Post* foi criado!\n\nPlano: *${planLabel}*\nValor: R$ ${planValue}/mes\n\n${paymentLink ? `Link de pagamento:\n${paymentLink}\n\nApos o pagamento, acesse o painel e o chat com o Binho!\n` : ""}Qualquer duvida, e so chamar!`;
        await sendWhatsAppMessage(input.whatsapp, whatsappMsg);

        return { success: true, customerId: customer.id, paymentLink, planLabel };
      }),

    login: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const customer = await getCustomerByEmail(input.email);
        if (!customer) {
          throw new TRPCError({ code: "NOT_FOUND", message: "E-mail nao encontrado." });
        }
        const valid = await bcrypt.compare(input.password, customer.passwordHash);
        if (!valid) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Senha incorreta." });
        }
        const token = await signCustomerToken(customer.id);
        ctx.res.cookie(CUSTOMER_COOKIE, token, {
          httpOnly: true,
          secure: ENV.isProduction,
          sameSite: "lax",
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        });
        return { success: true, customerId: customer.id };
      }),

    me: publicProcedure.query(async ({ ctx }) => {
      const token = ctx.req.cookies?.[CUSTOMER_COOKIE];
      if (!token) return null;
      const customerId = await verifyCustomerToken(token);
      if (!customerId) return null;
      const customer = await getCustomerById(customerId);
      if (!customer) return null;
      return { id: customer.id, name: customer.name, email: customer.email, whatsapp: customer.whatsapp };
    }),

    mySubscription: publicProcedure.query(async ({ ctx }) => {
      const token = ctx.req.cookies?.[CUSTOMER_COOKIE];
      if (!token) return null;
      const customerId = await verifyCustomerToken(token);
      if (!customerId) return null;
      const sub = await getSubscriptionByCustomerId(customerId);
      if (!sub) return null;
      return {
        ...sub,
        planLabel: PLAN_LABELS[sub.plan] ?? sub.plan,
        planIncludes: PLAN_INCLUDES[sub.plan] ?? [],
      };
    }),

    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(CUSTOMER_COOKIE, { path: "/" });
      return { success: true };
    }),
  }),

  asaasWebhook: publicProcedure
    .input(z.object({ event: z.string(), payment: z.any().optional(), subscription: z.any().optional() }))
    .mutation(async ({ input }) => {
      const { event, payment, subscription } = input;
      console.log("[Asaas Webhook]", event);

      const subId = payment?.subscription ?? subscription?.id;
      if (!subId) return { received: true };

      const sub = await getSubscriptionByAsaasId(subId);
      if (!sub) return { received: true };

      if (event === "PAYMENT_RECEIVED" || event === "PAYMENT_CONFIRMED") {
        const nextDue = payment?.dueDate ? new Date(payment.dueDate).getTime() : undefined;
        await updateSubscriptionStatus(sub.id, "active", nextDue);

        const customer = await getCustomerById(sub.customerId);
        if (customer) {
          const planLabel = PLAN_LABELS[sub.plan];
          const binhoChatUrl = `https://binhochat-btkg2qy7.manus.space/?plano=${sub.plan}&cliente=${encodeURIComponent(customer.name)}`;
          const msg = `Pagamento confirmado! Ola, ${customer.name}! Seu plano *${planLabel}* esta ativo.\n\nFaca seu briefing com o Binho: ${binhoChatUrl}\n\nPainel: https://clubindopost-j8vsyjc5.manus.space/painel`;
          await sendWhatsAppMessage(customer.whatsapp, msg);
        }
      } else if (event === "PAYMENT_OVERDUE") {
        await updateSubscriptionStatus(sub.id, "overdue");
      } else if (event === "SUBSCRIPTION_DELETED" || event === "PAYMENT_DELETED") {
        await updateSubscriptionStatus(sub.id, "cancelled");
      }

      return { received: true };
    }),
});

export type AppRouter = typeof appRouter;
