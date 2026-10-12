import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { Resend } from "resend";
import { getStripe } from "@/lib/stripe";

/**
 * Webhook de Stripe. Configuralo en Dashboard → Developers → Webhooks
 * (URL: https://purrsomecreate.com/api/webhooks/stripe) o en local con:
 *   stripe listen --forward-to localhost:3000/api/webhooks/stripe
 * Avisa por correo (Resend) a STRIPE_NOTIFY_TO / CUESTIONARIO_TO.
 */
export const runtime = "nodejs";

const money = (amount: number | null | undefined, currency: string | null | undefined) =>
  amount == null ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency: currency ?? "usd" }).format(amount / 100);

async function notify(subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return console.log(`[stripe] ${subject}\n${text}`);
  const { error } = await new Resend(key).emails.send({
    from: process.env.CUESTIONARIO_FROM ?? "Purrsome <onboarding@resend.dev>",
    to: process.env.STRIPE_NOTIFY_TO ?? process.env.CUESTIONARIO_TO ?? "purrsomecreativity@gmail.com",
    subject,
    text,
  });
  if (error) console.error("[stripe] Resend:", error);
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature) {
    return NextResponse.json({ error: "Webhook no configurado." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await req.text(), signature, secret);
  } catch (err) {
    console.error("[stripe] firma inválida:", err);
    return NextResponse.json({ error: "Firma inválida." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const s = event.data.object;
      // Con métodos asíncronos (ACH, etc.) payment_status llega "unpaid" y se
      // confirma después con async_payment_succeeded.
      if (s.payment_status === "unpaid") break;
      await notify(
        `💸 Nuevo pago · ${s.metadata?.plan ?? s.mode} · ${money(s.amount_total, s.currency)}`,
        [
          `Cliente: ${s.customer_details?.name ?? "—"} <${s.customer_details?.email ?? "—"}>`,
          `Plan: ${s.metadata?.plan ?? "—"} (${s.mode})`,
          `Total: ${money(s.amount_total, s.currency)} (impuesto: ${money(s.total_details?.amount_tax, s.currency)})`,
          `Checkout Session: ${s.id}`,
        ].join("\n"),
      );
      break;
    }
    case "checkout.session.async_payment_failed": {
      const s = event.data.object;
      await notify(`⚠️ Pago fallido · ${s.customer_details?.email ?? s.id}`, `Checkout Session: ${s.id}`);
      break;
    }
    case "invoice.paid": {
      // Facturas manuales del Dashboard y cobros recurrentes del retainer.
      const inv = event.data.object;
      // Ya avisado por checkout: primer cobro del retainer o factura del depósito.
      if (inv.billing_reason === "subscription_create" || inv.metadata?.plan) break;
      await notify(
        `🧾 Factura pagada · ${inv.customer_email ?? "—"} · ${money(inv.amount_paid, inv.currency)}`,
        `Factura ${inv.number ?? inv.id} (${inv.billing_reason ?? "—"})\n${inv.hosted_invoice_url ?? ""}`,
      );
      break;
    }
    case "invoice.payment_failed": {
      const inv = event.data.object;
      await notify(
        `⚠️ Falló el cobro de una factura · ${inv.customer_email ?? "—"}`,
        `Factura ${inv.number ?? inv.id} por ${money(inv.amount_due, inv.currency)}. Smart Retries va a reintentar.\n${inv.hosted_invoice_url ?? ""}`,
      );
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      await notify(`👋 Retainer cancelado`, `Suscripción ${sub.id} (cliente ${sub.customer}).`);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
