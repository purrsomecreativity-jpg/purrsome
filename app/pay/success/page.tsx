import Link from "next/link";
import type { Metadata } from "next";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Pago recibido — Purrsome™",
  robots: { index: false },
};

const money = (amount: number | null, currency: string | null) =>
  amount == null ? "" : new Intl.NumberFormat("en-US", { style: "currency", currency: currency ?? "usd" }).format(amount / 100);

export default async function PaySuccess({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;

  let name: string | null = null;
  let total = "";
  let pending = false;
  let isRetainer = false;

  if (session_id?.startsWith("cs_")) {
    try {
      const s = await getStripe().checkout.sessions.retrieve(session_id);
      name = s.customer_details?.name?.split(" ")[0] ?? null;
      total = money(s.amount_total, s.currency);
      pending = s.payment_status === "unpaid";
      isRetainer = s.mode === "subscription";
    } catch {
      // Sesión inválida: mostramos el mensaje genérico.
    }
  }

  const portal = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL;

  return (
    <main className="min-h-screen bg-primary text-white flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="text-muted uppercase tracking-[0.2em] text-xs mb-4">Purrsome™</p>
        <h1 className="font-display text-4xl md:text-5xl mb-6">
          {pending ? "Estamos procesando tu pago" : `¡Gracias${name ? `, ${name}` : ""}!`}
        </h1>
        <p className="text-muted text-lg mb-10">
          {pending
            ? "Tu método de pago tarda unos días en confirmarse. Te avisamos por correo apenas se acredite."
            : `Recibimos tu pago${total ? ` de ${total}` : ""}. Te llega el recibo por correo y en menos de 24 h te escribimos para arrancar.`}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="px-6 py-3 rounded-full bg-accent hover:bg-accent-hover transition-colors">
            Volver al inicio
          </Link>
          {isRetainer && portal && (
            <a href={portal} className="px-6 py-3 rounded-full border border-border hover:border-white transition-colors">
              Administrar suscripción
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
