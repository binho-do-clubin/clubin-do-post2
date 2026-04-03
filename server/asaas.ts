/**
 * Asaas API helpers for Clubin do Post
 * Handles customer creation, subscription management, and payment links
 */

const ASAAS_BASE_URL = "https://api.asaas.com/v3";
const ASAAS_API_KEY = process.env.ASAAS_API_KEY ?? "";

export const PLAN_VALUES: Record<string, number> = {
  starter: 97,
  pro: 197,
  elite: 397,
};

export const PLAN_LABELS: Record<string, string> = {
  starter: "Starter",
  pro: "Pro",
  elite: "Elite",
};

export const PLAN_POSTS: Record<string, number> = {
  starter: 15,
  pro: 30,
  elite: 50,
};

export const PLAN_INCLUDES: Record<string, string[]> = {
  starter: [
    "15 posts por mês",
    "Design personalizado",
    "Legendas estratégicas",
    "1 revisão por post",
    "Entrega em 5 dias úteis",
    "Suporte por WhatsApp",
  ],
  pro: [
    "30 posts por mês",
    "Design premium personalizado",
    "Legendas com copy de vendas",
    "2 revisões por post",
    "Entrega em 3 dias úteis",
    "10 Stories por mês",
    "Suporte prioritário",
    "Relatório mensal de resultados",
  ],
  elite: [
    "50 posts por mês",
    "Design ultra premium",
    "Copy estratégica avançada",
    "Revisões ilimitadas",
    "Entrega em 48 horas",
    "20 Stories por mês",
    "4 Reels por mês",
    "Gerente de conta dedicado",
    "Relatório semanal",
    "Estratégia de conteúdo mensal",
  ],
};

async function asaasRequest(path: string, method = "GET", body?: unknown) {
  const res = await fetch(`${ASAAS_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "access_token": ASAAS_API_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("[Asaas] API error:", data);
    throw new Error(data?.errors?.[0]?.description ?? "Erro na API do Asaas");
  }
  return data;
}

export async function createAsaasCustomer(params: {
  name: string;
  email: string;
  mobilePhone: string;
}) {
  return asaasRequest("/customers", "POST", {
    name: params.name,
    email: params.email,
    mobilePhone: params.mobilePhone.replace(/\D/g, ""),
  });
}

export async function createAsaasSubscription(params: {
  asaasCustomerId: string;
  plan: string;
  billingType: string;
  nextDueDate: string;
  cycle?: string;
}) {
  const value = PLAN_VALUES[params.plan] ?? 97;
  const planLabel = PLAN_LABELS[params.plan] ?? params.plan;
  return asaasRequest("/subscriptions", "POST", {
    customer: params.asaasCustomerId,
    billingType: params.billingType,
    value,
    nextDueDate: params.nextDueDate,
    cycle: params.cycle ?? "MONTHLY",
    description: `Clubin do Post — Plano ${planLabel}`,
  });
}

export async function getAsaasPaymentLink(subscriptionId: string): Promise<string | null> {
  try {
    const data = await asaasRequest(`/subscriptions/${subscriptionId}/payments`);
    const payment = data?.data?.[0];
    return payment?.invoiceUrl ?? payment?.bankSlipUrl ?? null;
  } catch {
    return null;
  }
}

export async function sendWhatsAppMessage(to: string, message: string) {
  const phone = to.replace(/\D/g, "");
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN ?? "";
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID ?? "";

  if (!accessToken || !phoneNumberId) {
    console.warn("[WhatsApp] Missing credentials, skipping send");
    return { success: false };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: `55${phone}`,
          type: "text",
          text: { body: message },
        }),
      }
    );
    const result = await res.json();
    return { success: res.ok, result };
  } catch (err) {
    console.error("[WhatsApp] Send error:", err);
    return { success: false };
  }
}
