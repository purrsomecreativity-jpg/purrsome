import type { Metadata } from "next";
import Links from "./Links";

export const metadata: Metadata = {
  title: "Links — Purrsome",
  description: "Todos los enlaces de Purrsome: WhatsApp, portfolio, Instagram y contacto.",
  robots: { index: false, follow: true },
};

export default function LinksPage() {
  return <Links />;
}
