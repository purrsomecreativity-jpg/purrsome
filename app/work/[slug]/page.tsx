"use client";
import { useParams } from "next/navigation";
import { T, Nav, Footer, useLang } from "../../components/shared";
import { GradientDots } from "../../components/ui/gradient-dots";

type Project = {
  num: string;
  title: string;
  titleLine2?: string;
  category: string;
  year: string;
  heroGradient: string;
  accent: string;
  lede: string;
  direction: string;
  approach: string;
  services: string[];
  highlights: { stat: string; label: string; sub?: string }[];
  showcase?: string[];
  heroMockup?: string;
  palette?: { name: string; hex: string }[];
};

const PROJECTS: Record<string, Project> = {
  "magic-pets": {
    num: "01",
    title: "Magic",
    titleLine2: "Pets",
    category: "Grooming Studio · Concept Mockup",
    year: "2026",
    heroGradient: "linear-gradient(150deg, #1A0A1F 0%, #2C0E2A 45%, #0E0E30 100%)",
    accent: "#EC4899",
    lede: "A concept mockup for a premium pet grooming studio — playful, bold, and built around an interactive drag-to-discover hero.",
    direction:
      "Pet grooming sites tend to lean clinical or cookie-cutter. The brief was to imagine something that feels as warm and fun as the in-studio experience while still reading premium.",
    approach:
      "Bold pink + cream palette, character-driven photography, and a draggable hero that lets visitors swipe through featured pups. Designed bilingual EN/ES from the ground up, mobile-first.",
    services: ["UI Design", "Brand Visuals", "Bilingual Copy Direction", "Interaction Design"],
    highlights: [
      { stat: "Drag", label: "Hero Interaction", sub: "Custom swipe-to-explore" },
      { stat: "EN/ES", label: "Bilingual Layout", sub: "Built into the system" },
      { stat: "Mobile", label: "First", sub: "Responsive across breakpoints" },
    ],
    showcase: ["/work/magic-pets.png", "/work/magic-pets-2.png"],
    heroMockup: "/work/magic-pets-laptop.png?v=7",
    palette: [
      { name: "Hot Pink", hex: "#EC4899" },
      { name: "Cream", hex: "#F5E6D3" },
      { name: "Charcoal", hex: "#0A0A0A" },
      { name: "White", hex: "#FFFFFF" },
    ],
  },
  "lumiere-studio": {
    num: "02",
    title: "Lumière",
    titleLine2: "Studio",
    category: "Beauty Atelier · Concept Mockup",
    year: "2026",
    heroGradient: "linear-gradient(150deg, #1F1612 0%, #2A1E17 45%, #140D0A 100%)",
    accent: "#B08060",
    lede: "A concept mockup for a Miami beauty atelier — slow, considered, and built around the idea that the first twenty minutes of listening matter more than the haircut.",
    direction:
      "Beauty sites tend to shout. The brief was to imagine a hair house that reads like an editorial — serif typography, generous whitespace, and pacing that signals craft without announcing it.",
    approach:
      "Cream palette, italic serif display type, and a layout that prioritizes philosophy and specialists before services. A booking CTA is always in reach, but never the loudest thing on the page.",
    services: ["UI Design", "Typography System", "Editorial Art Direction", "Booking Flow"],
    highlights: [
      { stat: "Editorial", label: "Serif System", sub: "Display italic + quiet sans" },
      { stat: "Slow", label: "Pacing", sub: "Philosophy → specialists → services" },
      { stat: "Cream", label: "Neutral Palette", sub: "Warm, skin-friendly tones" },
    ],
    showcase: ["/work/lumiere-studio.png", "/work/lumiere-studio-2.png", "/work/lumiere-studio-3.png", "/work/lumiere-studio-4.png"],
    heroMockup: "/work/lumiere-studio-laptop.png",
    palette: [
      { name: "Cream", hex: "#F6EAD4" },
      { name: "Warm Taupe", hex: "#B08060" },
      { name: "Dusty Rose", hex: "#D4A5A5" },
      { name: "Ink", hex: "#1A1410" },
    ],
  },
  "ame": {
    num: "03",
    title: "Angel Mechanic",
    titleLine2: "Expert",
    category: "Automotive · Concept Mockup",
    year: "2026",
    heroGradient: "linear-gradient(150deg, #1A0A05 0%, #2C1508 45%, #0F0804 100%)",
    accent: "#E85102",
    lede: "A concept mockup for an independent auto shop — bold, trust-forward, and designed to make 36 years of craft impossible to ignore.",
    direction:
      "Independent mechanics compete with chains that have huge marketing budgets. The brief was to design something that reads professional and established without feeling corporate or sterile.",
    approach:
      "Persimmon-on-black hero with the owner front and center, stats that prove experience, and a service grid that lets visitors self-qualify fast. Bilingual toggle built in from day one.",
    services: ["UI Design", "Brand Visuals", "Bilingual Layout", "Trust Architecture"],
    highlights: [
      { stat: "36+", label: "Years Front-and-Center", sub: "Experience as the lead story" },
      { stat: "Owner", label: "Led Hero", sub: "Face of the business up top" },
      { stat: "EN/ES", label: "Bilingual", sub: "Toggle in the nav" },
    ],
    showcase: ["/work/ame.png", "/work/ame-2.png", "/work/ame-3.png", "/work/ame-4.png"],
    heroMockup: "/work/ame-laptop.png",
    palette: [
      { name: "Persimmon", hex: "#E85102" },
      { name: "Smoky Black", hex: "#0F0F0F" },
      { name: "Ghost White", hex: "#F9F9F9" },
      { name: "Inferno", hex: "#DC4A0A" },
    ],
  },
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [lang, setLang] = useLang();
  const t = T[lang];
  const p = PROJECTS[slug];

  if (!p) {
    return (
      <main className="relative bg-[#050507] text-white min-h-screen flex items-center justify-center">
        <Nav lang={lang} setLang={setLang} t={t} />
        <p className="text-white/40">Project not found.</p>
      </main>
    );
  }

  return (
    <main className="relative bg-[#050507] text-white overflow-x-hidden">
      <Nav lang={lang} setLang={setLang} t={t} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[60vh] flex flex-col justify-between overflow-hidden pt-28 pb-16"
        style={{ background: p.heroGradient }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 60% at 70% 80%, ${p.accent}15, transparent)` }}
        />

        {/* Top meta row */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 w-full flex items-center justify-between">
          <a
            href="/work"
            className="text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors flex items-center gap-2"
          >
            ← Work
          </a>
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/20 font-mono">
            {p.num} / 03
          </span>
        </div>

        {/* Title block */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div
                className="text-[11px] tracking-[0.35em] uppercase font-medium mb-8 flex items-center gap-4"
                style={{ color: p.accent }}
              >
                <span className="inline-block w-8 h-px" style={{ background: p.accent }} />
                {p.category} — {p.year}
              </div>
              <h1 className="font-extrabold leading-[0.88] tracking-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
                <span className="block text-white">{p.title}</span>
                {p.titleLine2 && (
                  <span className="block" style={{ WebkitTextStroke: `2px rgba(255,255,255,0.25)`, color: "transparent" }}>
                    {p.titleLine2}
                  </span>
                )}
              </h1>
            </div>
            {p.heroMockup && (
              <div className="flex justify-center lg:justify-end items-end mt-8 lg:mt-0">
                <img
                  src={p.heroMockup}
                  alt={`${p.title} laptop mockup`}
                  className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] h-auto object-contain"
                  style={{
                    filter: `drop-shadow(0 0 30px ${p.accent}40) drop-shadow(0 0 80px ${p.accent}30) drop-shadow(0 30px 60px rgba(0,0,0,0.6)) drop-shadow(0 60px 100px rgba(0,0,0,0.4))`,
                    animation: "float 2.8s ease-in-out infinite",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none bg-gradient-to-b from-transparent to-[#050507]" />
      </section>

      {/* ── Lede ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-2xl lg:text-3xl text-white/70 leading-[1.4] font-light tracking-tight">
            {p.lede}
          </p>
        </div>
      </section>

      {/* ── Showcase ─────────────────────────────────────── */}
      {p.showcase && p.showcase.length > 0 && (
        <section className="relative overflow-hidden pb-20 lg:pb-28">
          <GradientDots duration={24} colorCycleDuration={10} backgroundColor="#050507" />
          <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 space-y-6 lg:space-y-8 pt-10">
            {p.showcase.map((src, i) => (
              <div
                key={src}
                className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
              >
                <img
                  src={src}
                  alt={`${p.title} screenshot ${i + 1}`}
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ── Direction / Approach ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-20 lg:py-28">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">01</span>
              <span className="h-px flex-1 bg-white/[0.08]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">Direction</span>
            </div>
            <p className="text-white/55 text-lg leading-relaxed">{p.direction}</p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">02</span>
              <span className="h-px flex-1 bg-white/[0.08]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">Approach</span>
            </div>
            <p className="text-white/55 text-lg leading-relaxed">{p.approach}</p>
          </div>
        </div>
      </section>

      {/* ── Palette ──────────────────────────────────────── */}
      {p.palette && p.palette.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 lg:px-16 pb-20 lg:pb-28">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">Palette</span>
            <span className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
            {p.palette.map((c) => (
              <div key={c.hex} className="group">
                <div
                  className="aspect-square rounded-2xl border border-white/[0.06] transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ background: c.hex }}
                />
                <div className="mt-3 flex flex-col gap-0.5">
                  <span className="text-white/80 text-sm font-semibold tracking-wide">{c.name}</span>
                  <span className="text-white/40 text-xs tracking-wider font-mono uppercase">{c.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Services ─────────────────────────────────────── */}
      <section
        className="py-16 lg:py-20 border-y border-white/[0.05]"
        style={{ background: "rgba(255,255,255,0.015)" }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 flex flex-wrap items-center gap-x-10 gap-y-4">
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium shrink-0 mr-4">
            Services
          </span>
          {p.services.map((s, i) => (
            <div key={s} className="flex items-center gap-10">
              <span className="text-white/70 text-sm tracking-wide">{s}</span>
              {i < p.services.length - 1 && (
                <span className="text-white/15 text-xs">·</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Design Highlights ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-24 lg:py-32">
        <div className="flex items-center gap-3 mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">Design Highlights</span>
          <span className="h-px flex-1 bg-white/[0.06]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {p.highlights.map((r) => (
            <div
              key={r.label}
              className="bg-[#050507] p-10 lg:p-12 flex flex-col gap-3"
            >
              <div
                className="font-extrabold tracking-tight leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: p.accent }}
              >
                {r.stat}
              </div>
              <div className="text-white/80 font-semibold text-base">{r.label}</div>
              {r.sub && <div className="text-white/25 text-xs tracking-wide">{r.sub}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 pb-28">
        <div className="h-px bg-white/[0.06] mb-16" />
        <div className="flex items-center justify-between">
          <a
            href="/work"
            className="text-sm text-white/30 hover:text-white/60 transition-colors tracking-wide flex items-center gap-2"
          >
            ← Back to Work
          </a>
          <a
            href="/start"
            className="cta-btn font-semibold px-8 py-3.5 rounded-full text-sm flex items-center gap-2"
          >
            Start a Project <span>→</span>
          </a>
        </div>
      </section>

      <Footer t={t} />
    </main>
  );
}
