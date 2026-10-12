import Stripe from "stripe";

/**
 * Cliente de Stripe (solo servidor).
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   STRIPE_SECRET_KEY      — sk_test_... (sandbox "Purrsome LLC sandbox") o sk_live_...
 *   STRIPE_WEBHOOK_SECRET  — whsec_... del endpoint /api/webhooks/stripe
 *   NEXT_PUBLIC_SITE_URL   — https://purrsomecreate.com (para success/cancel URLs)
 */
let client: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Falta configurar STRIPE_SECRET_KEY.");
  client ??= new Stripe(key);
  return client;
}

/**
 * Planes que se pueden comprar desde el sitio. La clave es lo que manda el
 * formulario; el lookup_key apunta al Price en Stripe (así podés cambiar el
 * monto en el Dashboard sin tocar código).
 */
export const PLANS = {
  deposit: { lookupKey: "purrsome_project_deposit", mode: "payment" },
  retainer: { lookupKey: "purrsome_retainer_monthly", mode: "subscription" },
} as const satisfies Record<string, { lookupKey: string; mode: Stripe.Checkout.SessionCreateParams.Mode }>;

export type PlanId = keyof typeof PLANS;

export const isPlanId = (v: unknown): v is PlanId =>
  typeof v === "string" && Object.prototype.hasOwnProperty.call(PLANS, v);
