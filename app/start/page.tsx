"use client";
import { useState } from "react";

/* ─── TYPES ─── */
type Lang = "en" | "es";
type Option = { value: string; label: string };
type Question = {
  id: string;
  question: string;
  type: "select" | "multi" | "text";
  subtitle?: string;
  placeholder?: string;
  options?: Option[];
};
type Section = { label: string; questions: Question[] };

/* ─── TRANSLATIONS ─── */
const T = {
  en: {
    nav: { back: "← Back", cta: "Let's Talk" },
    header: {
      tag: "Start a Project",
      title: "Tell us about your business.",
      sub: "The more we know, the better we can help. This takes about 2 minutes.",
    },
    sections: [
      {
        label: "Your Business",
        questions: [
          {
            id: "business_type",
            question: "What type of business do you have?",
            type: "select",
            options: [
              { value: "restaurant",    label: "Restaurant / Café" },
              { value: "contractor",    label: "Contractor / Home Services" },
              { value: "health",        label: "Health / Dental / Medical" },
              { value: "fitness",       label: "Gym / Yoga / Fitness" },
              { value: "beauty",        label: "Salon / Barbershop / Spa" },
              { value: "retail",        label: "Retail / Local Store" },
              { value: "realestate",    label: "Real Estate" },
              { value: "professional",  label: "Professional Services (Law, Accounting)" },
              { value: "other",         label: "Other" },
            ],
          } as Question,
          {
            id: "business_name",
            question: "What's your business name?",
            type: "text",
            placeholder: "e.g. Mike's Plumbing, Bella Cucina...",
          } as Question,
        ],
      },
      {
        label: "Your Needs",
        questions: [
          {
            id: "current_site",
            question: "Do you currently have a website?",
            type: "select",
            options: [
              { value: "no",       label: "No, I need one from scratch" },
              { value: "yes_bad",  label: "Yes, but it needs a complete redesign" },
              { value: "yes_ok",   label: "Yes, but I want to improve it" },
              { value: "unsure",   label: "Not sure what I need" },
            ],
          } as Question,
          {
            id: "services_needed",
            question: "What are you looking for?",
            subtitle: "Select all that apply",
            type: "multi",
            options: [
              { value: "website", label: "Website Design" },
              { value: "seo",     label: "SEO (Get found on Google)" },
              { value: "ads",     label: "Paid Ads (Meta / Google)" },
              { value: "brand",   label: "Logo / Brand Identity" },
              { value: "unsure",  label: "Not sure yet — advise me" },
            ],
          } as Question,
        ],
      },
      {
        label: "Your Goals",
        questions: [
          {
            id: "main_goal",
            question: "What's your #1 goal right now?",
            type: "select",
            options: [
              { value: "more_customers",   label: "Get more customers / leads" },
              { value: "online_presence",  label: "Build a professional online presence" },
              { value: "more_calls",       label: "Get more phone calls / bookings" },
              { value: "beat_competition", label: "Stand out from competitors" },
              { value: "credibility",      label: "Build credibility and trust" },
            ],
          } as Question,
        ],
      },
      {
        label: "Budget & Timeline",
        questions: [
          {
            id: "budget",
            question: "What's your approximate budget?",
            subtitle: "No judgment — this helps us recommend the right package",
            type: "select",
            options: [
              { value: "under1000", label: "Under $1,000" },
              { value: "1000_3000", label: "$1,000 – $3,000" },
              { value: "3000_5000", label: "$3,000 – $5,000" },
              { value: "5000_plus", label: "$5,000+" },
            ],
          } as Question,
          {
            id: "timeline",
            question: "How soon do you need this?",
            type: "select",
            options: [
              { value: "asap",     label: "ASAP — yesterday if possible" },
              { value: "2weeks",   label: "Within 1-2 weeks" },
              { value: "month",    label: "Within a month" },
              { value: "no_rush",  label: "No rush — just exploring" },
            ],
          } as Question,
        ],
      },
    ] as Section[],
    contact: {
      label: "Your Info",
      name:  { question: "Your name",           placeholder: "John Smith" },
      email: { question: "Email",               placeholder: "john@business.com" },
      phone: { question: "Phone (optional)",    placeholder: "+1 (555) 000-0000" },
      extra: { question: "Anything else you'd like us to know?", placeholder: "Tell us anything — your vision, inspiration, frustrations with your current site..." },
    },
    submit: "Send & Book Your Free Consultation",
    submitted: {
      title: "We got it!",
      sub: "We'll review your answers and reach out within 24 hours to schedule your free consultation.",
      back: "Back to Home",
    },
    progress: "Complete",
  },
  es: {
    nav: { back: "← Volver", cta: "Hablemos" },
    header: {
      tag: "Iniciar Proyecto",
      title: "Cuéntanos sobre tu negocio.",
      sub: "Entre más sepamos, mejor te podemos ayudar. Toma unos 2 minutos.",
    },
    sections: [
      {
        label: "Tu Negocio",
        questions: [
          {
            id: "business_type",
            question: "¿Qué tipo de negocio tienes?",
            type: "select",
            options: [
              { value: "restaurant",    label: "Restaurante / Café" },
              { value: "contractor",    label: "Contractor / Servicios del Hogar" },
              { value: "health",        label: "Salud / Dental / Médico" },
              { value: "fitness",       label: "Gym / Yoga / Fitness" },
              { value: "beauty",        label: "Salón / Barbería / Spa" },
              { value: "retail",        label: "Tienda Local" },
              { value: "realestate",    label: "Bienes Raíces" },
              { value: "professional",  label: "Servicios Profesionales (Legal, Contable)" },
              { value: "other",         label: "Otro" },
            ],
          } as Question,
          {
            id: "business_name",
            question: "¿Cómo se llama tu negocio?",
            type: "text",
            placeholder: "ej. Plomería Mike, Bella Cucina...",
          } as Question,
        ],
      },
      {
        label: "Tus Necesidades",
        questions: [
          {
            id: "current_site",
            question: "¿Actualmente tienes sitio web?",
            type: "select",
            options: [
              { value: "no",      label: "No, necesito uno desde cero" },
              { value: "yes_bad", label: "Sí, pero necesita rediseño completo" },
              { value: "yes_ok",  label: "Sí, pero quiero mejorarlo" },
              { value: "unsure",  label: "No estoy seguro de qué necesito" },
            ],
          } as Question,
          {
            id: "services_needed",
            question: "¿Qué estás buscando?",
            subtitle: "Selecciona todos los que apliquen",
            type: "multi",
            options: [
              { value: "website", label: "Diseño Web" },
              { value: "seo",     label: "SEO (Aparecer en Google)" },
              { value: "ads",     label: "Publicidad (Meta / Google Ads)" },
              { value: "brand",   label: "Logo / Identidad de Marca" },
              { value: "unsure",  label: "No estoy seguro — aconséjenme" },
            ],
          } as Question,
        ],
      },
      {
        label: "Tus Metas",
        questions: [
          {
            id: "main_goal",
            question: "¿Cuál es tu meta #1 ahora mismo?",
            type: "select",
            options: [
              { value: "more_customers",   label: "Conseguir más clientes / leads" },
              { value: "online_presence",  label: "Tener presencia online profesional" },
              { value: "more_calls",       label: "Recibir más llamadas / reservaciones" },
              { value: "beat_competition", label: "Destacar sobre la competencia" },
              { value: "credibility",      label: "Generar confianza y credibilidad" },
            ],
          } as Question,
        ],
      },
      {
        label: "Presupuesto y Tiempo",
        questions: [
          {
            id: "budget",
            question: "¿Cuál es tu presupuesto aproximado?",
            subtitle: "Sin juicio — esto nos ayuda a recomendar el paquete correcto",
            type: "select",
            options: [
              { value: "under1000", label: "Menos de $1,000" },
              { value: "1000_3000", label: "$1,000 – $3,000" },
              { value: "3000_5000", label: "$3,000 – $5,000" },
              { value: "5000_plus", label: "$5,000+" },
            ],
          } as Question,
          {
            id: "timeline",
            question: "¿Qué tan pronto lo necesitas?",
            type: "select",
            options: [
              { value: "asap",    label: "ASAP — ayer si fuera posible" },
              { value: "2weeks",  label: "En 1-2 semanas" },
              { value: "month",   label: "En un mes" },
              { value: "no_rush", label: "Sin prisa — solo estoy explorando" },
            ],
          } as Question,
        ],
      },
    ] as Section[],
    contact: {
      label: "Tu Info",
      name:  { question: "Tu nombre",              placeholder: "Juan Pérez" },
      email: { question: "Email",                  placeholder: "juan@negocio.com" },
      phone: { question: "Teléfono (opcional)",    placeholder: "+1 (555) 000-0000" },
      extra: { question: "¿Algo más que quieras compartirnos?", placeholder: "Tu visión, inspiración, frustraciones con tu sitio actual..." },
    },
    submit: "Enviar y Agendar Consulta Gratis",
    submitted: {
      title: "¡Lo tenemos!",
      sub: "Revisaremos tus respuestas y te contactaremos en 24 horas para agendar tu consulta gratuita.",
      back: "Volver al Inicio",
    },
    progress: "Completo",
  },
};

/* ─── OPTION ICONS ─── */
const ICONS: Record<string, React.ReactNode> = {
  restaurant: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 1v5a2.5 2.5 0 0 0 5 0V1M7.5 6v9" /><path d="M12 1v14" />
    </svg>
  ),
  contractor: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 2a3 3 0 0 0-2.8 4.2L2 12.1a1.5 1.5 0 1 0 2.1 2.1l5.7-5.8A3 3 0 1 0 10.5 2z" />
    </svg>
  ),
  health: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" /><path d="M8 4.5v7M4.5 8h7" />
    </svg>
  ),
  fitness: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7.5v1M4 5.5v5M4 8h8M12 5.5v5M14 7.5v1" />
    </svg>
  ),
  beauty: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4" cy="4.5" r="1.8" /><circle cx="4" cy="11.5" r="1.8" />
      <path d="M5.6 5.7L14 14M5.6 10.3L14 2" />
    </svg>
  ),
  retail: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 1.5h1.5l2.5 9h7l2-6H5" /><circle cx="6.5" cy="13.5" r="1" /><circle cx="12" cy="13.5" r="1" />
    </svg>
  ),
  realestate: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 7.5L8 2l6.5 5.5V14.5h-4v-4h-5v4h-4z" />
    </svg>
  ),
  professional: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="6" width="13" height="8.5" rx="1.5" />
      <path d="M5.5 6V4.5a2.5 2.5 0 0 1 5 0V6" /><path d="M1.5 10h13" />
    </svg>
  ),
  other: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 2v12M2 8h12M3.5 3.5l9 9M12.5 3.5l-9 9" strokeWidth="1.2" />
    </svg>
  ),
  no: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" /><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" />
    </svg>
  ),
  yes_bad: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5L14.5 13H1.5L8 1.5z" />
      <path d="M8 6v3.5" /><circle cx="8" cy="11.5" r=".6" fill="currentColor" strokeWidth="0" />
    </svg>
  ),
  yes_ok: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 3.5A6.5 6.5 0 1 1 8 1.5" /><path d="M13.5 1v4H9.5" />
    </svg>
  ),
  unsure: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.8 6a2.3 2.3 0 0 1 4.6 0c0 1.5-1.5 2-2.4 3.3" />
      <circle cx="8" cy="12.5" r=".6" fill="currentColor" strokeWidth="0" />
    </svg>
  ),
  website: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 1.5C6.5 3.5 5.5 5.6 5.5 8s1 4.5 2.5 6.5" />
      <path d="M8 1.5C9.5 3.5 10.5 5.6 10.5 8s-1 4.5-2.5 6.5" />
      <path d="M1.5 8h13" />
    </svg>
  ),
  seo: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="6.5" cy="6.5" r="5" /><path d="M11 11l3.5 3.5" />
    </svg>
  ),
  ads: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 6v4H1V6h1.5zM2.5 8L11 12V4L2.5 8z" /><path d="M12 5.5a3.5 3.5 0 0 1 0 5" />
    </svg>
  ),
  brand: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1l2 4h4l-3.2 3 1.4 4.5L8 10.2 3.8 12.5 5.2 8 2 5h4z" />
    </svg>
  ),
  more_customers: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 12l3.5-4 3 3 5.5-7" /><path d="M10.5 4H15v4.5" />
    </svg>
  ),
  online_presence: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 1.5C6.5 3.5 5.5 5.6 5.5 8s1 4.5 2.5 6.5" />
      <path d="M8 1.5C9.5 3.5 10.5 5.6 10.5 8s-1 4.5-2.5 6.5" />
      <path d="M1.5 8h13" />
    </svg>
  ),
  more_calls: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 1h3l1.5 4-2 1.5A9 9 0 0 0 10 11l1.5-2L15 10.5v3a1 1 0 0 1-1 1A13 13 0 0 1 2 2a1 1 0 0 1 1-1z" />
    </svg>
  ),
  beat_competition: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 1.5h8v5a4 4 0 0 1-8 0v-5z" /><path d="M4 4.5H1.5M12 4.5h2.5M8 10.5v4M5.5 14.5h5" />
    </svg>
  ),
  credibility: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5L13.5 4v4.5A6 6 0 0 1 8 14.5 6 6 0 0 1 2.5 8.5V4z" />
      <path d="M5.5 8.5l2 2L11 7" />
    </svg>
  ),
  asap: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 1.5L5.5 9h4L7 14.5l8-9H11z" />
    </svg>
  ),
  "2weeks": (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="3" width="13" height="11.5" rx="1.5" /><path d="M1.5 7h13M5 1v4M11 1v4" />
    </svg>
  ),
  month: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="3" width="13" height="11.5" rx="1.5" />
      <path d="M1.5 7h13M5 1v4M11 1v4M5 10.5h.01M8 10.5h.01M11 10.5h.01M5 13h.01M8 13h.01" />
    </svg>
  ),
  no_rush: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.5" /><path d="M8 4.5v4l2.5 2" />
    </svg>
  ),
};

const ICON_COLORS: Record<string, string> = {
  restaurant:       "#F59E0B",
  contractor:       "#14B8A6",
  health:           "#34D399",
  fitness:          "#F97316",
  beauty:           "#EC4899",
  retail:           "#A78BFA",
  realestate:       "#60A5FA",
  professional:     "#9333EA",
  other:            "#94A3B8",
  no:               "#F87171",
  yes_bad:          "#FBBF24",
  yes_ok:           "#34D399",
  unsure:           "#94A3B8",
  website:          "#14B8A6",
  seo:              "#F59E0B",
  ads:              "#EC4899",
  brand:            "#9333EA",
  more_customers:   "#34D399",
  online_presence:  "#14B8A6",
  more_calls:       "#60A5FA",
  beat_competition: "#F59E0B",
  credibility:      "#A78BFA",
  asap:             "#F87171",
  "2weeks":         "#FBBF24",
  month:            "#34D399",
  no_rush:          "#94A3B8",
};

/* ─── QUESTION COMPONENTS ─── */
function SelectQuestion({ question, subtitle, options, value, onChange }: {
  question: string; subtitle?: string; options: Option[];
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="mb-8">
      <label className="block text-white/80 font-semibold text-base mb-1.5">{question}</label>
      {subtitle && <p className="text-white/25 text-sm mb-4">{subtitle}</p>}
      <div className="grid gap-2.5">
        {options.map((opt) => (
          <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
            className={`text-left px-5 py-4 rounded-xl liquid-glass-btn text-sm flex items-center gap-3 ${
              value === opt.value
                ? "!border-amber-500/40 !bg-white/[0.10] text-white shadow-[0_0_24px_rgba(245,158,11,0.08)]"
                : "text-white/50"
            }`}>
            {ICONS[opt.value] && (
              <span
                className="flex-shrink-0 transition-all duration-300"
                style={{
                  color: ICON_COLORS[opt.value] ?? "currentColor",
                  opacity: value === opt.value ? 0.9 : 0.35,
                  filter: value === opt.value ? `drop-shadow(0 0 5px ${ICON_COLORS[opt.value]}80)` : "none",
                }}
              >{ICONS[opt.value]}</span>
            )}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiQuestion({ question, subtitle, options, values, onChange }: {
  question: string; subtitle?: string; options: Option[];
  values: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (val: string) =>
    onChange(values.includes(val) ? values.filter((v) => v !== val) : [...values, val]);
  return (
    <div className="mb-8">
      <label className="block text-white/80 font-semibold text-base mb-1.5">{question}</label>
      {subtitle && <p className="text-white/25 text-sm mb-4">{subtitle}</p>}
      <div className="grid gap-2.5">
        {options.map((opt) => {
          const selected = values.includes(opt.value);
          return (
            <button key={opt.value} type="button" onClick={() => toggle(opt.value)}
              className={`text-left px-5 py-4 rounded-xl liquid-glass-btn text-sm flex items-center gap-3 ${
                selected
                  ? "!border-amber-500/40 !bg-white/[0.10] text-white shadow-[0_0_24px_rgba(245,158,11,0.08)]"
                  : "text-white/50"
              }`}>
              <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${selected ? "border-amber-500 bg-amber-500/20" : "border-white/15"}`}>
                {selected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {ICONS[opt.value] && (
                <span
                  className="flex-shrink-0 transition-all duration-300"
                  style={{
                    color: ICON_COLORS[opt.value] ?? "currentColor",
                    opacity: selected ? 0.9 : 0.35,
                    filter: selected ? `drop-shadow(0 0 5px ${ICON_COLORS[opt.value]}80)` : "none",
                  }}
                >{ICONS[opt.value]}</span>
              )}
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TextQuestion({ question, placeholder, value, onChange, multiline = false }: {
  question: string; placeholder: string; value: string;
  onChange: (v: string) => void; multiline?: boolean;
}) {
  const cls = "w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-amber-500/25 focus:bg-white/[0.03] focus:shadow-[0_0_25px_rgba(245,158,11,0.04)] transition-all duration-300";
  return (
    <div className="mb-8">
      <label className="block text-white/80 font-semibold text-base mb-3">{question}</label>
      {multiline
        ? <textarea rows={4} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={`${cls} resize-none`} />
        : <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      }
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function StartProject() {
  const [lang, setLang] = useState<Lang>("en");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [multiAnswers, setMultiAnswers] = useState<Record<string, string[]>>({ services_needed: [] });
  const [contact, setContact] = useState({ name: "", email: "", phone: "", extra: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const t = T[lang];
  const set = (id: string, val: string) => setAnswers((prev) => ({ ...prev, [id]: val }));
  const setMulti = (id: string, val: string[]) => setMultiAnswers((prev) => ({ ...prev, [id]: val }));

  const filled = [
    answers.business_type, answers.business_name, answers.current_site,
    (multiAnswers.services_needed?.length ?? 0) > 0 ? "x" : "",
    answers.main_goal, answers.budget, answers.timeline,
  ].filter(Boolean).length;
  const progress = Math.round((filled / 7) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/mvzbyopz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...answers, ...multiAnswers, ...contact }),
      });
      if (res.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert(lang === "en" ? "Something went wrong. Please try again." : "Algo salió mal. Por favor intenta de nuevo.");
      }
    } catch {
      alert(lang === "en" ? "Network error. Please try again." : "Error de red. Por favor intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <img src="/stocks/cat2.jpg" alt="cat" className="w-40 h-40 object-cover rounded-2xl mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t.submitted.title}</h1>
          <p className="text-white/40 mb-10 leading-relaxed">{t.submitted.sub}</p>
          <a href="/" className="text-sm text-amber-400/80 hover:text-amber-400 transition-colors">{t.submitted.back}</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] -top-32 -right-32 animate-drift" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[100px] bottom-0 -left-32 animate-drift" style={{ animationDelay: "3s" }} />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#050507]/80 backdrop-blur-xl border-b border-white/[0.03]">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-sm text-white/30 hover:text-white/60 transition-colors">{t.nav.back}</a>
          <div className="relative inline-block">
            <div style={{ height: "24px", width: "120px", background: "#000000", WebkitMaskImage: "url(/stocks/PURRSOME-logo-oficial.svg)", maskImage: "url(/stocks/PURRSOME-logo-oficial.svg)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "left center", maskPosition: "left center" }} />
          </div>
          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="text-[11px] text-white/20 hover:text-white/50 border border-white/[0.06] rounded-full px-3 py-1 tracking-widest transition-all">
            {lang === "en" ? "ES" : "EN"}
          </button>
        </div>
      </nav>

      {/* Progress bar */}
      <div className="sticky top-16 z-40 bg-[#050507]/60 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-4">
          <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #F59E0B, #DC4A0A, #9333EA, #14B8A6)", backgroundSize: "200% 100%", animation: "iri 4s ease-in-out infinite" }} />
          </div>
          <span className="text-[11px] text-white/20 tracking-widest tabular-nums">{progress}% {t.progress}</span>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-10">
        <span className="text-[11px] tracking-[0.3em] uppercase text-amber-400/70 font-medium">{t.header.tag}</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4 leading-[1.08] tracking-tight">{t.header.title}</h1>
        <p className="text-white/30 text-base">{t.header.sub}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative z-10 max-w-3xl mx-auto px-6 pb-32">
        {t.sections.map((section, si) => (
          <div key={si} className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[11px] tracking-[0.25em] uppercase text-white/15 font-medium">{String(si + 1).padStart(2, "0")}</span>
              <span className="text-[13px] tracking-[0.15em] uppercase text-white/30 font-semibold">{section.label}</span>
              <div className="flex-1 h-px bg-white/[0.04]" />
            </div>
            {section.questions.map((q) => {
              if (q.type === "select") return <SelectQuestion key={q.id} question={q.question} subtitle={q.subtitle} options={q.options!} value={answers[q.id] ?? ""} onChange={(v) => set(q.id, v)} />;
              if (q.type === "multi")  return <MultiQuestion  key={q.id} question={q.question} subtitle={q.subtitle} options={q.options!} values={multiAnswers[q.id] ?? []} onChange={(v) => setMulti(q.id, v)} />;
              if (q.type === "text")   return <TextQuestion   key={q.id} question={q.question} placeholder={q.placeholder!} value={answers[q.id] ?? ""} onChange={(v) => set(q.id, v)} />;
              return null;
            })}
          </div>
        ))}

        {/* Contact */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] tracking-[0.25em] uppercase text-white/15 font-medium">05</span>
            <span className="text-[13px] tracking-[0.15em] uppercase text-white/30 font-semibold">{t.contact.label}</span>
            <div className="flex-1 h-px bg-white/[0.04]" />
          </div>
          <div className="grid sm:grid-cols-2 gap-x-5">
            <TextQuestion question={t.contact.name.question}  placeholder={t.contact.name.placeholder}  value={contact.name}  onChange={(v) => setContact({ ...contact, name: v })} />
            <TextQuestion question={t.contact.email.question} placeholder={t.contact.email.placeholder} value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
          </div>
          <TextQuestion question={t.contact.phone.question} placeholder={t.contact.phone.placeholder} value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
          <TextQuestion question={t.contact.extra.question} placeholder={t.contact.extra.placeholder} value={contact.extra} onChange={(v) => setContact({ ...contact, extra: v })} multiline />
        </div>

        {/* Submit */}
        <button type="submit" disabled={!contact.name || !contact.email || sending}
          className={`w-full py-5 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-500 ${
            contact.name && contact.email && !sending
              ? "liquid-glass-btn cursor-pointer hover:shadow-[0_0_40px_rgba(245,158,11,0.12)]"
              : "bg-white/[0.03] text-white/15 border border-white/[0.04] cursor-not-allowed"
          }`}>
          {sending ? (lang === "en" ? "Sending..." : "Enviando...") : t.submit}
        </button>
        {(!contact.name || !contact.email) && (
          <p className="text-center text-white/15 text-xs mt-3">
            {lang === "en" ? "Fill in your name and email to submit" : "Ingresa tu nombre y email para enviar"}
          </p>
        )}
      </form>
    </div>
  );
}
