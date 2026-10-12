import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, isPlanId, PLANS } from "@/lib/stripe";

/**
 * Crea una Checkout Session (página alojada por Stripe) y redirige ahí.
 * Uso desde cualquier página, sin JS:
 *   <form action="/api/checkout" method="POST">
 *     <input type="hidden" name="plan" value="retainer" />
 *     <button type="submit">Empezar</button>
 *   </form>
 */
export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const plan = form?.get("plan");
  if (!isPlanId(plan)) {
    return NextResponse.json({ error: "Plan inválido." }, { status: 400 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  const { lookupKey, mode } = PLANS[plan];

  try {
    const stripe = getStripe();
    const { data: prices } = await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 });
    const price = prices[0];
    if (!price) {
      return NextResponse.json({ error: `No existe un precio activo con lookup_key ${lookupKey}.` }, { status: 500 });
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      mode,
      line_items: [{ price: price.id, quantity: 1 }],
      // Stripe Tax: calcula el impuesto según la dirección del cliente
      // (solo cobra donde tengas registros cargados en Dashboard → Tax).
      automatic_tax: { enabled: true },
      billing_address_collection: "required",
      tax_id_collection: { enabled: true },
      allow_promotion_codes: true,
      metadata: { plan },
      success_url: `${origin}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/start`,
    };

    if (mode === "payment") {
      params.customer_creation = "always";
      params.invoice_creation = { enabled: true, invoice_data: { metadata: { plan } } };
      params.payment_intent_data = { metadata: { plan } };
    } else {
      params.subscription_data = { billing_mode: { type: "flexible" }, metadata: { plan } };
    }

    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: "No se pudo iniciar el pago." }, { status: 500 });
  }
}
