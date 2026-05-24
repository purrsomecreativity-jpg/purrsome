"use client";

import { useState } from "react";

/* ─── COMPANY DATA ─── */
const EMAIL = "info@purrsomecreate.com";
const WEBSITE = "purrsomecreate.com";

type Lang = "en" | "es";

type Block = { type: "p"; text: string } | { type: "list"; items: string[] };
type Section = { title: string; blocks: Block[] };

type Content = {
  pageTitle: string;
  intro: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  sections: Section[];
  contact: {
    title: string;
    intro: string;
    emailLabel: string;
    websiteLabel: string;
    locationLabel: string;
    location: string;
  };
};

/* ─── CONTENT ─── */
const C: Record<Lang, Content> = {
  en: {
    pageTitle: "Privacy Policy",
    lastUpdatedLabel: "Last updated",
    lastUpdated: "May 23, 2026",
    intro:
      'Purrsome™ LLC ("Purrsome," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, share, and protect your information when you visit purrsomecreate.com or engage our services.',
    sections: [
      {
        title: "Information We Collect",
        blocks: [
          { type: "p", text: "We collect information you provide directly to us, including:" },
          {
            type: "list",
            items: [
              "Name",
              "Email address",
              "Phone number",
              "Business name",
              "Business type",
              "Project details",
            ],
          },
          {
            type: "p",
            text: "We also automatically collect limited technical data — such as your IP address, browser type, device information, and pages visited — through cookies and similar technologies.",
          },
        ],
      },
      {
        title: "How We Use Your Information",
        blocks: [
          { type: "p", text: "We use the information we collect to:" },
          {
            type: "list",
            items: [
              "Respond to your inquiries and provide quotes",
              "Deliver and manage the services you request",
              "Communicate with you about your project",
              "Send updates, proposals, and — with your consent — marketing communications",
              "Improve our website and services",
              "Comply with our legal obligations",
            ],
          },
        ],
      },
      {
        title: "How We Share Your Information",
        blocks: [
          {
            type: "p",
            text: "We do not sell your personal information. We may share it with:",
          },
          {
            type: "list",
            items: [
              "Trusted service providers who help us operate our business (e.g., hosting, analytics, email marketing)",
              "Advertising platforms such as Meta and Google to measure and improve campaigns",
              "Legal authorities when required by law or to protect our rights",
            ],
          },
        ],
      },
      {
        title: "Data Storage and Security",
        blocks: [
          {
            type: "p",
            text: "We store your information using reputable third-party providers and retain it only as long as necessary to fulfill the purposes described in this policy or as required by law.",
          },
          {
            type: "p",
            text: "We implement reasonable technical and organizational measures to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
          },
        ],
      },
      {
        title: "Your Rights",
        blocks: [
          { type: "p", text: "Depending on your location, you may have the right to:" },
          {
            type: "list",
            items: [
              "Access the personal information we hold about you",
              "Request correction or deletion of your data",
              "Opt out of marketing communications at any time",
              "Object to or restrict certain processing of your data",
            ],
          },
          {
            type: "p",
            text: `To exercise any of these rights, contact us at ${EMAIL}.`,
          },
        ],
      },
      {
        title: "Cookies",
        blocks: [
          {
            type: "p",
            text: "Our website uses cookies and similar technologies to remember your preferences, analyze traffic, and support advertising. You can control or disable cookies through your browser settings, though some features may not function properly without them.",
          },
        ],
      },
      {
        title: "Third-Party Services",
        blocks: [
          {
            type: "p",
            text: "We use third-party services that may collect or process information under their own privacy policies, including:",
          },
          {
            type: "list",
            items: [
              "Meta (Facebook & Instagram) — advertising and analytics",
              "Google (Analytics & Ads) — analytics and advertising",
              "Email marketing tools — to manage communications and newsletters",
            ],
          },
          {
            type: "p",
            text: "We encourage you to review the privacy policies of these third parties to understand how they handle your data.",
          },
        ],
      },
      {
        title: "Children's Privacy",
        blocks: [
          {
            type: "p",
            text: "Our services are intended for individuals 18 years of age or older. We do not knowingly collect personal information from anyone under 18. If you believe a minor has provided us with personal data, please contact us and we will delete it.",
          },
        ],
      },
      {
        title: "Changes to This Policy",
        blocks: [
          {
            type: "p",
            text: 'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date shown at the top of this page. We encourage you to review this page periodically to stay informed about how we protect your information.',
          },
        ],
      },
    ],
    contact: {
      title: "Contact",
      intro:
        "If you have questions about this Privacy Policy or how we handle your information, reach out to us:",
      emailLabel: "Email",
      websiteLabel: "Website",
      locationLabel: "Location",
      location: "Kissimmee, Florida, USA",
    },
  },
  es: {
    pageTitle: "Política de Privacidad",
    lastUpdatedLabel: "Última actualización",
    lastUpdated: "23 de mayo de 2026",
    intro:
      'Purrsome™ LLC ("Purrsome", "nosotros" o "nuestro") respeta tu privacidad y se compromete a proteger la información personal que compartes con nosotros. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos tu información cuando visitas purrsomecreate.com o contratas nuestros servicios.',
    sections: [
      {
        title: "Información que Recopilamos",
        blocks: [
          { type: "p", text: "Recopilamos la información que nos proporcionas directamente, incluyendo:" },
          {
            type: "list",
            items: [
              "Nombre",
              "Correo electrónico",
              "Número de teléfono",
              "Nombre del negocio",
              "Tipo de negocio",
              "Detalles del proyecto",
            ],
          },
          {
            type: "p",
            text: "También recopilamos automáticamente datos técnicos limitados — como tu dirección IP, tipo de navegador, información del dispositivo y páginas visitadas — mediante cookies y tecnologías similares.",
          },
        ],
      },
      {
        title: "Cómo Usamos tu Información",
        blocks: [
          { type: "p", text: "Usamos la información que recopilamos para:" },
          {
            type: "list",
            items: [
              "Responder a tus consultas y entregarte cotizaciones",
              "Brindar y gestionar los servicios que solicitas",
              "Comunicarnos contigo sobre tu proyecto",
              "Enviarte actualizaciones, propuestas y — con tu consentimiento — comunicaciones de marketing",
              "Mejorar nuestro sitio web y nuestros servicios",
              "Cumplir con nuestras obligaciones legales",
            ],
          },
        ],
      },
      {
        title: "Cómo Compartimos tu Información",
        blocks: [
          {
            type: "p",
            text: "No vendemos tu información personal. Podemos compartirla con:",
          },
          {
            type: "list",
            items: [
              "Proveedores de servicios de confianza que nos ayudan a operar (por ejemplo, hosting, analítica, email marketing)",
              "Plataformas publicitarias como Meta y Google para medir y mejorar campañas",
              "Autoridades legales cuando la ley lo exija o para proteger nuestros derechos",
            ],
          },
        ],
      },
      {
        title: "Almacenamiento y Seguridad",
        blocks: [
          {
            type: "p",
            text: "Almacenamos tu información mediante proveedores externos confiables y la conservamos solo durante el tiempo necesario para cumplir los fines descritos en esta política o según lo exija la ley.",
          },
          {
            type: "p",
            text: "Implementamos medidas técnicas y organizativas razonables para proteger tus datos. Sin embargo, ningún método de transmisión por internet o de almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar una seguridad absoluta.",
          },
        ],
      },
      {
        title: "Tus Derechos",
        blocks: [
          { type: "p", text: "Según tu ubicación, podrías tener derecho a:" },
          {
            type: "list",
            items: [
              "Acceder a la información personal que tenemos sobre ti",
              "Solicitar la corrección o eliminación de tus datos",
              "Cancelar la suscripción a comunicaciones de marketing en cualquier momento",
              "Oponerte o restringir cierto procesamiento de tus datos",
            ],
          },
          {
            type: "p",
            text: `Para ejercer cualquiera de estos derechos, escríbenos a ${EMAIL}.`,
          },
        ],
      },
      {
        title: "Cookies",
        blocks: [
          {
            type: "p",
            text: "Nuestro sitio web utiliza cookies y tecnologías similares para recordar tus preferencias, analizar el tráfico y apoyar la publicidad. Puedes controlar o desactivar las cookies desde la configuración de tu navegador, aunque algunas funciones podrían no operar correctamente sin ellas.",
          },
        ],
      },
      {
        title: "Servicios de Terceros",
        blocks: [
          {
            type: "p",
            text: "Utilizamos servicios de terceros que pueden recopilar o procesar información bajo sus propias políticas de privacidad, incluyendo:",
          },
          {
            type: "list",
            items: [
              "Meta (Facebook e Instagram) — publicidad y analítica",
              "Google (Analytics y Ads) — analítica y publicidad",
              "Herramientas de email marketing — para gestionar comunicaciones y boletines",
            ],
          },
          {
            type: "p",
            text: "Te recomendamos revisar las políticas de privacidad de estos terceros para entender cómo manejan tus datos.",
          },
        ],
      },
      {
        title: "Privacidad de Menores",
        blocks: [
          {
            type: "p",
            text: "Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos a sabiendas información personal de menores de 18 años. Si crees que un menor nos ha proporcionado datos personales, contáctanos y los eliminaremos.",
          },
        ],
      },
      {
        title: "Cambios a esta Política",
        blocks: [
          {
            type: "p",
            text: 'Podemos actualizar esta Política de Privacidad de vez en cuando. Cuando lo hagamos, actualizaremos la fecha de "Última actualización" que aparece al inicio de esta página. Te recomendamos revisar esta página periódicamente para mantenerte informado sobre cómo protegemos tu información.',
          },
        ],
      },
    ],
    contact: {
      title: "Contacto",
      intro:
        "Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tu información, contáctanos:",
      emailLabel: "Email",
      websiteLabel: "Sitio web",
      locationLabel: "Ubicación",
      location: "Kissimmee, Florida, USA",
    },
  },
};

/* ─── SECTION RENDERER ─── */
function SectionBlock({ index, section }: { index: number; section: Section }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl md:text-2xl font-semibold text-[#14B8A6] mb-4 scroll-mt-24">
        {index}. {section.title}
      </h2>
      {section.blocks.map((block, i) =>
        block.type === "p" ? (
          <p key={i} className="text-gray-300 leading-relaxed mb-4">
            {block.text}
          </p>
        ) : (
          <ul key={i} className="mb-4 space-y-2">
            {block.items.map((item, j) => (
              <li key={j} className="flex gap-3 text-gray-300 leading-relaxed">
                <span className="text-[#14B8A6] select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  );
}

/* ─── PAGE ─── */
export default function PrivacyPolicy() {
  const [lang, setLang] = useState<Lang>("en");
  const t = C[lang];

  return (
    <main className="min-h-screen bg-[#050507] text-gray-300">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16 md:py-24">
        {/* Header: home link + language toggle */}
        <div className="flex items-center justify-between gap-4 mb-12">
          <a
            href="/"
            className="text-sm tracking-[0.12em] uppercase text-gray-500 hover:text-[#14B8A6] transition-colors"
          >
            ← Purrsome™
          </a>
          <div className="inline-flex items-center rounded-full border border-white/10 p-0.5 text-xs font-medium">
            {(["en", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-3 py-1 rounded-full uppercase tracking-[0.12em] transition-colors ${
                  lang === l
                    ? "bg-[#14B8A6] text-[#050507]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#14B8A6] tracking-tight">
          {t.pageTitle}
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          {t.lastUpdatedLabel}: {t.lastUpdated}
        </p>

        {/* Intro */}
        <p className="mt-8 text-gray-300 leading-relaxed">{t.intro}</p>

        {/* Sections 1–9 */}
        {t.sections.map((section, i) => (
          <SectionBlock key={i} index={i + 1} section={section} />
        ))}

        {/* Section 10 — Contact */}
        <section className="mt-12">
          <h2 className="text-xl md:text-2xl font-semibold text-[#14B8A6] mb-4">
            {t.sections.length + 1}. {t.contact.title}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">{t.contact.intro}</p>
          <ul className="space-y-2 text-gray-300">
            <li>
              <span className="text-gray-500">{t.contact.emailLabel}: </span>
              <a
                href={`mailto:${EMAIL}`}
                className="text-[#14B8A6] hover:underline underline-offset-4"
              >
                {EMAIL}
              </a>
            </li>
            <li>
              <span className="text-gray-500">{t.contact.websiteLabel}: </span>
              <a
                href={`https://${WEBSITE}`}
                className="text-[#14B8A6] hover:underline underline-offset-4"
              >
                {WEBSITE}
              </a>
            </li>
            <li>
              <span className="text-gray-500">{t.contact.locationLabel}: </span>
              <span>{t.contact.location}</span>
            </li>
            <li>
              <span className="text-gray-500">Purrsome™ LLC</span>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-xs tracking-[0.15em] text-gray-500">
            © 2026 Purrsome™ LLC. Refuse to Blend In.™
          </p>
        </footer>
      </div>
    </main>
  );
}
