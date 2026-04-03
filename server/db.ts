import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, customers, subscriptions } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// ---- Customer helpers ----
export async function createCustomer(data: { name: string; email: string; passwordHash: string; whatsapp: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(customers).values(data);
  const result = await db.select().from(customers).where(eq(customers.email, data.email)).limit(1);
  return result[0];
}

export async function getCustomerByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(customers).where(eq(customers.email, email)).limit(1);
  return result[0] ?? undefined;
}

export async function getCustomerById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(customers).where(eq(customers.id, id)).limit(1);
  return result[0] ?? undefined;
}

export async function updateCustomerAsaasId(customerId: number, asaasCustomerId: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(customers).set({ asaasCustomerId }).where(eq(customers.id, customerId));
}

// ---- Subscription helpers ----
export async function createSubscription(data: {
  customerId: number;
  plan: "starter" | "pro" | "elite";
  billingType: "PIX" | "CREDIT_CARD" | "BOLETO";
  billingCycle?: "monthly" | "annual";
  value: number;
  status: "pending" | "active" | "overdue" | "cancelled" | "expired";
  asaasSubscriptionId?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(subscriptions).values({
    customerId: data.customerId,
    plan: data.plan,
    billingType: data.billingType,
    billingCycle: data.billingCycle ?? "monthly",
    value: data.value,
    status: data.status,
    asaasSubscriptionId: data.asaasSubscriptionId,
  });
  const result = await db.select().from(subscriptions).where(eq(subscriptions.customerId, data.customerId)).limit(1);
  return result[0];
}

export async function updateSubscriptionAsaasData(subId: number, asaasSubscriptionId: string, paymentLink: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(subscriptions).set({ asaasSubscriptionId, asaasPaymentLink: paymentLink }).where(eq(subscriptions.id, subId));
}

export async function getSubscriptionByCustomerId(customerId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(subscriptions).where(eq(subscriptions.customerId, customerId)).limit(1);
  return result[0] ?? undefined;
}

export async function getSubscriptionByAsaasId(asaasSubscriptionId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(subscriptions).where(eq(subscriptions.asaasSubscriptionId, asaasSubscriptionId)).limit(1);
  return result[0] ?? undefined;
}

export async function updateSubscriptionStatus(
  subId: number,
  status: "pending" | "active" | "overdue" | "cancelled" | "expired",
  nextDueDate?: number
) {
  const db = await getDb();
  if (!db) return;
  await db.update(subscriptions).set({ status, ...(nextDueDate ? { nextDueDate } : {}) }).where(eq(subscriptions.id, subId));
}
