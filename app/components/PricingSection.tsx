"use client";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  priceUnit: string;
  priceSubtext: string;
  pages: string;
  features: string[];
  highlight: boolean;
  accentColor: "teal" | "amber";
  ctaText: string;
  num: string;
};

const plans: Plan[] = [
  {
    id: "standard",
    name: "Website Standard",
    tagline: "Perfecto para la mayoría de negocios locales",
    price: 299,
    priceUnit: "USD/mes",
    priceSubtext: "12 meses · sin costo inicial",
    pages: "Hasta 4 páginas",
    features: [
      "Diseño y desarrollo sin costo inicial",
      "Hasta 4 páginas a medida",
      "Dominio, hosting y SSL incluidos",
      "3 revisiones mensuales",
      "Soporte directo por WhatsApp y email",
      "Ownership del código al mes 12",
    ],
    highlight: true,
    accentColor: "teal",
    ctaText: "Empezar con Standard",
    num: "01",
  },
  {
    id: "premium",
    name: "Website Premium",
    tagline: "Para negocios con más contenido y actualizaciones frecuentes",
    price: 499,
    priceUnit: "USD/mes",
    priceSubtext: "12 meses · sin costo inicial",
    pages: "Hasta 7 páginas",
    features: [
      "Todo lo del plan Standard",
      "Hasta 7 páginas (más contenido)",
      "6 revisiones mensuales",
      "Reporte mensual de performance",
      "Soporte prioritario (< 24h de respuesta)",
      "Integración de blog o catálogo de productos",
    ],
    highlight: false,
    accentColor: "amber",
    ctaText: "Empezar con Premium",
    num: "02",
  },
];

const WHATSAPP_NUMBER = "14076938364";
const WHATSAPP_MESSAGE_STANDARD = encodeURIComponent(
  "Hola Purrsome, me interesa el plan Website Standard ($299/mes). ¿Podemos hablar?"
);
const WHATSAPP_MESSAGE_PREMIUM = encodeURIComponent(
  "Hola Purrsome, me interesa el plan Website Premium ($499/mes). ¿Podemos hablar?"
);
const WHATSAPP_MESSAGE_OTHER = encodeURIComponent(
  "Hola Purrsome, me gustaría cotizar otros servicios (branding, SEO, ads). ¿Podemos conversar?"
);

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-10 pt-28 md:pt-40 pb-20 md:pb-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-2xl mb-12 md:mb-20">
          <span className="text-[11px] tracking-[0.3em] uppercase text-teal-400/80 font-medium">
            PRICING
          </span>
          <h2 className="font-[var(--font-syne,sans-serif)] text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mt-4 mb-4 md:mb-6 leading-[1.02] tracking-tight">
            Plans built to make you stand out.
          </h2>
          <p className="text-white/25 text-base md:text-lg leading-relaxed">
            Sin costos escondidos. Sin contratos confusos. Sin sorpresas. Paga solo cuando tu sitio esté en línea, y después de 12 meses el código es completamente tuyo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-12 md:mb-16">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <OtherServicesCTA />

        <InfoStrip />
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  const isHighlight = plan.highlight;
  const accentClass =
    plan.accentColor === "teal" ? "text-[#14B8A6]" : "text-[#F59E0B]";
  const accentBorderClass =
    plan.accentColor === "teal" ? "border-[#14B8A6]/50" : "border-[#F59E0B]/50";
  const accentHoverBgClass =
    plan.accentColor === "teal" ? "hover:bg-[#14B8A6]" : "hover:bg-[#F59E0B]";
  const bulletBgClass =
    plan.accentColor === "teal" ? "bg-[#14B8A6]" : "bg-[#F59E0B]";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${
    plan.id === "standard" ? WHATSAPP_MESSAGE_STANDARD : WHATSAPP_MESSAGE_PREMIUM
  }`;

  return (
    <div className="relative group bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-6 md:p-8 lg:p-10 transition-all duration-500 hover:border-white/[0.18] hover:bg-white/[0.05]">
      <div className="flex items-start justify-between mb-8">
        <span className={`text-[10px] tracking-[0.3em] uppercase font-medium ${accentClass}`}>
          {plan.id === "standard" ? "Plan estándar" : "Plan premium"}
        </span>
        <span className="text-[11px] text-white/15 font-mono tracking-[0.2em]">
          #{plan.num}
        </span>
      </div>

      {isHighlight && (
        <div className="inline-flex items-center mb-5 px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#14B8A6] text-[10px] tracking-[0.2em] uppercase font-semibold">
          Más popular
        </div>
      )}

      <h3 className="font-[var(--font-syne,sans-serif)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
        {plan.name}
      </h3>

      <p className="text-sm text-white/40 mb-8 leading-relaxed">
        {plan.tagline}
      </p>

      <div className="mb-8 pb-8 border-b border-white/[0.06]">
        <div className="flex items-baseline gap-2">
          <span className={`font-[var(--font-syne,sans-serif)] text-5xl md:text-6xl font-extrabold tracking-tight ${accentClass}`}>
            ${plan.price}
          </span>
          <span className="text-xs text-white/40 tracking-wider uppercase font-medium">
            {plan.priceUnit}
          </span>
        </div>
        <p className="text-xs text-white/30 mt-2 tracking-wide">
          {plan.priceSubtext}
        </p>
      </div>

      <div className="mb-6">
        <div className="text-[10px] tracking-[0.25em] uppercase font-medium text-white/30 mb-2">
          Capacidad
        </div>
        <div className="text-base font-medium text-white/90">{plan.pages}</div>
      </div>

      <div className="mb-8">
        <div className="text-[10px] tracking-[0.25em] uppercase font-medium text-white/30 mb-4">
          Qué incluye
        </div>
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className={`flex-shrink-0 w-4 h-[2px] ${bulletBgClass} mt-[10px] opacity-80`} />
              <span className="text-white/55 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full text-center py-3.5 px-6 rounded-full border ${accentBorderClass} ${accentClass} text-[12px] tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:text-[#050507] ${accentHoverBgClass}`}
      >
        {plan.ctaText} →
      </a>
    </div>
  );
}

function OtherServicesCTA() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE_OTHER}`;

  return (
    <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 md:p-12 mb-12 transition-colors duration-500 hover:border-white/[0.18]">
      <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <div className="text-[11px] tracking-[0.3em] uppercase font-medium text-[#EC4899] mb-4">
            ¿Necesitas algo más?
          </div>
          <h3 className="font-[var(--font-syne,sans-serif)] text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Branding, SEO, ads y otros servicios cotizados a medida.
          </h3>
          <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-2xl">
            Cada negocio es diferente. Para branding completo, rebranding, SEO, campañas pagadas o combos personalizados, escríbenos por WhatsApp y te mandamos cotización según lo que necesites.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-center rounded-full border border-[#EC4899]/50 text-[#EC4899] py-3.5 px-8 text-[12px] tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:bg-[#EC4899] hover:text-[#050507] whitespace-nowrap"
        >
          Cotizar por WhatsApp →
        </a>
      </div>
    </div>
  );
}

function InfoStrip() {
  const infoPoints = [
    {
      num: "01",
      label: "Sin pago inicial",
      description: "Empiezas a pagar cuando tu sitio está en línea.",
      color: "#14B8A6",
    },
    {
      num: "02",
      label: "Bilingual EN · ES",
      description: "Diseñamos en ambos idiomas con la misma fuerza.",
      color: "#F59E0B",
    },
    {
      num: "03",
      label: "You own the code",
      description: "Al mes 12, transferimos ownership completo.",
      color: "#EC4899",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-3 md:gap-4">
      {infoPoints.map((point, i) => (
        <div
          key={i}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 md:p-8 transition-colors duration-500 hover:border-white/[0.18]"
        >
          <div className="flex items-start justify-between mb-5">
            <span
              className="text-[11px] tracking-[0.3em] uppercase font-medium"
              style={{ color: point.color }}
            >
              #{point.num}
            </span>
          </div>
          <h4 className="font-[var(--font-syne,sans-serif)] text-lg md:text-xl font-bold text-white tracking-tight mb-2">
            {point.label}
          </h4>
          <p className="text-sm text-white/40 leading-relaxed">
            {point.description}
          </p>
        </div>
      ))}
    </div>
  );
}
