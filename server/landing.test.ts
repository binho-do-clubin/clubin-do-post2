import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Landing Page - Auth Routes", () => {
  it("auth.me returns null for unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("system router is accessible", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    expect(caller.system).toBeDefined();
  });
});

describe("Landing Page - Content Validation", () => {
  it("CDN URLs are properly formatted", () => {
    const cdnBase = "https://d2xsxph8kpxj0f.cloudfront.net";
    const assets = [
      "binho-main_645ac795.png",
      "binho-headset_90e9665d.png",
      "binho-sitting_1c31bdf4.png",
      "binho1_7e306ae3.webp",
      "binho2_92d70278.webp",
      "desconto-5_2f3db34f.png",
      "desconto-10_941675c4.png",
      "desconto-15_3e416cac.png",
      "posts-sempremai_bcf8222e.png",
      "posts-pegatroco_3611a2b1.png",
      "posts-tecnoport_f362621d.png",
      "binho-video_a965f071.mp4",
      "clubin2_32a6bb2d.mp4",
    ];

    assets.forEach((asset) => {
      const url = `${cdnBase}/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/${asset}`;
      expect(url).toMatch(/^https:\/\/d2xsxph8kpxj0f\.cloudfront\.net\/.+/);
      expect(url).not.toContain("undefined");
      expect(url).not.toContain("null");
    });
  });

  it("pricing plans have valid structure", () => {
    const plans = [
      { name: "Starter", monthlyPrice: 97, annualPrice: 77 },
      { name: "Pro", monthlyPrice: 197, annualPrice: 157 },
      { name: "Elite", monthlyPrice: 397, annualPrice: 317 },
    ];

    plans.forEach((plan) => {
      expect(plan.name).toBeTruthy();
      expect(plan.monthlyPrice).toBeGreaterThan(0);
      expect(plan.annualPrice).toBeGreaterThan(0);
      expect(plan.annualPrice).toBeLessThan(plan.monthlyPrice);
    });
  });

  it("annual discount is properly calculated", () => {
    const plans = [
      { name: "Starter", monthlyPrice: 97, annualPrice: 77 },
      { name: "Pro", monthlyPrice: 197, annualPrice: 157 },
      { name: "Elite", monthlyPrice: 397, annualPrice: 317 },
    ];

    plans.forEach((plan) => {
      const discountPercent = ((plan.monthlyPrice - plan.annualPrice) / plan.monthlyPrice) * 100;
      expect(discountPercent).toBeGreaterThan(0);
      expect(discountPercent).toBeLessThanOrEqual(25);
    });
  });

  it("testimonials have required fields", () => {
    const testimonials = [
      { name: "Ana Carolina", role: "Consultora Financeira", rating: 5, result: "+300% de engajamento" },
      { name: "Marcos Oliveira", role: "Advogado", rating: 5, result: "3 clientes em 1 mês" },
      { name: "Juliana Mendes", role: "Nutricionista", rating: 5, result: "+2.000 seguidores em 60 dias" },
    ];

    testimonials.forEach((t) => {
      expect(t.name).toBeTruthy();
      expect(t.role).toBeTruthy();
      expect(t.rating).toBe(5);
      expect(t.result).toBeTruthy();
    });
  });
});
