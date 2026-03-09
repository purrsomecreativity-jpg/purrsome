"use client";
import { useParams } from "next/navigation";
import { T, Nav, Footer, useLang } from "../../components/shared";

type Project = {
  num: string;
  title: string;
  titleLine2?: string;
  category: string;
  year: string;
  heroGradient: string;
  accent: string;
  lede: string;
  challenge: string;
  solution: string;
  services: string[];
  results: { stat: string; label: string; sub?: string }[];
};

const PROJECTS: Record<string, Project> = {
  "bella-cucina": {
    num: "01",
    title: "Bella",
    titleLine2: "Cucina",
    category: "Restaurant · Web Design",
    year: "2026",
    heroGradient: "linear-gradient(150deg, #5A0A0A 0%, #3D0E3A 45%, #2C1660 100%)",
    accent: "#F59E0B",
    lede: "A neighborhood Italian restaurant with exceptional food and a website that was holding them back. We gave them a digital presence as good as their pasta.",
    challenge:
      "Bella Cucina had great food but a website stuck in 2014 — no mobile optimization, no online reservations, and zero local SEO presence. Competitors with inferior menus were showing up first on Google.",
    solution:
      "We rebuilt their site from scratch with a modern, mobile-first design, integrated reservation system, full menu showcase, and a local SEO strategy targeting their neighborhood. Every page was optimized for Google Maps discovery.",
    services: ["Web Design", "Mobile Optimization", "Local SEO", "Google Business"],
    results: [
      { stat: "+40%", label: "Foot Traffic", sub: "Within 60 days of launch" },
      { stat: "3×", label: "Online Reservations", sub: "vs. phone bookings" },
      { stat: "Page 1", label: "Google Maps", sub: "For 12 local keywords" },
    ],
  },
  "profix-plumbing": {
    num: "02",
    title: "ProFix",
    titleLine2: "Plumbing",
    category: "Contractor · Web + SEO",
    year: "2026",
    heroGradient: "linear-gradient(150deg, #071E38 0%, #102030 45%, #1E1040 100%)",
    accent: "#14B8A6",
    lede: "A reliable plumbing contractor invisible online. We turned zero digital presence into page 1 rankings and a steady stream of inbound calls — in 90 days.",
    challenge:
      "ProFix was relying entirely on word of mouth. No website, no Google presence, and losing jobs to competitors who showed up first in search. Every missed click was a missed job.",
    solution:
      "Built a clean, fast website with a service area map, emergency contact CTA, and a 90-day SEO strategy focused on high-intent local keywords. Google Business profile fully optimized with photos and weekly posts.",
    services: ["Web Design", "SEO Strategy", "Google Business", "Speed Optimization"],
    results: [
      { stat: "Page 1", label: "in 3 Months", sub: "For 20+ local keywords" },
      { stat: "+65%", label: "Inbound Calls", sub: "Monthly average increase" },
      { stat: "4.9★", label: "Google Rating", sub: "From 0 to 47 reviews" },
    ],
  },
  "luma-skin-studio": {
    num: "03",
    title: "Luma Skin",
    titleLine2: "Studio",
    category: "Medspa · Branding + Web",
    year: "2026",
    heroGradient: "linear-gradient(150deg, #3A0A28 0%, #1E1040 50%, #0E0E30 100%)",
    accent: "#EC4899",
    lede: "A boutique skin studio with a loyal clientele and no brand to show for it. We built them an identity as premium as the treatments they offer — in two languages.",
    challenge:
      "Luma had a loyal clientele but no brand identity to match the premium experience they delivered. Their old site looked generic and didn't speak to their bilingual South Florida audience.",
    solution:
      "Created a complete brand system — logo, color palette, typography — and a bilingual website in English and Spanish that reflects the studio's luxury feel. Every touchpoint elevated.",
    services: ["Brand Identity", "Web Design", "Bilingual Copy", "Social Media Kit"],
    results: [
      { stat: "+55%", label: "New Client Bookings", sub: "3 months post-launch" },
      { stat: "2×", label: "Bilingual Reach", sub: "English + Spanish audience" },
      { stat: "100%", label: "Brand Cohesion", sub: "Across all touchpoints" },
    ],
  },
  "verdant-market": {
    num: "04",
    title: "Verdant",
    titleLine2: "Market",
    category: "Retail · Full Package",
    year: "2026",
    heroGradient: "linear-gradient(150deg, #0A2010 0%, #101A18 50%, #1A1040 100%)",
    accent: "#9333EA",
    lede: "An organic grocery store with strong community roots and no digital presence. We gave them a brand, a website, and a campaign that tripled weekend foot traffic.",
    challenge:
      "Verdant had strong community roots but no digital presence to match. Foot traffic was inconsistent and they had no way to reach new customers beyond their block.",
    solution:
      "Delivered a full brand refresh, new website with store info and weekly specials, plus an Instagram ad campaign targeting health-conscious locals within 10 miles. New identity drove real-world results.",
    services: ["Branding", "Web Design", "Instagram Ads", "Photography Direction"],
    results: [
      { stat: "3×", label: "Weekend Visits", sub: "vs. pre-campaign baseline" },
      { stat: "+800", label: "Instagram Followers", sub: "In first 6 weeks" },
      { stat: "$4.20", label: "ROAS on Ad Spend", sub: "Instagram campaign avg." },
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
        className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-16"
        style={{ background: p.heroGradient }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 60% at 70% 80%, ${p.accent}15, transparent)` }}
        />

        {/* Watermark number */}
        <span
          className="absolute right-0 bottom-0 font-extrabold leading-none select-none pointer-events-none translate-y-8 translate-x-8"
          style={{ fontSize: "30vw", color: "rgba(255,255,255,0.03)" }}
        >
          {p.num}
        </span>

        {/* Top meta row */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 w-full flex items-center justify-between">
          <a
            href="/work"
            className="text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors flex items-center gap-2"
          >
            ← Work
          </a>
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/20 font-mono">
            {p.num} / 04
          </span>
        </div>

        {/* Title block */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 w-full">
          <div
            className="text-[11px] tracking-[0.35em] uppercase font-medium mb-8 flex items-center gap-4"
            style={{ color: p.accent }}
          >
            <span className="inline-block w-8 h-px" style={{ background: p.accent }} />
            {p.category} — {p.year}
          </div>
          <h1 className="font-extrabold leading-[0.88] tracking-tight" style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}>
            <span className="block text-white">{p.title}</span>
            {p.titleLine2 && (
              <span className="block" style={{ WebkitTextStroke: `2px rgba(255,255,255,0.25)`, color: "transparent" }}>
                {p.titleLine2}
              </span>
            )}
          </h1>
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

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ── Challenge / Solution ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-20 lg:py-28">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">01</span>
              <span className="h-px flex-1 bg-white/[0.08]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">Challenge</span>
            </div>
            <p className="text-white/55 text-lg leading-relaxed">{p.challenge}</p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">02</span>
              <span className="h-px flex-1 bg-white/[0.08]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">Solution</span>
            </div>
            <p className="text-white/55 text-lg leading-relaxed">{p.solution}</p>
          </div>
        </div>
      </section>

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

      {/* ── Results ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-24 lg:py-32">
        <div className="flex items-center gap-3 mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">Results</span>
          <span className="h-px flex-1 bg-white/[0.06]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {p.results.map((r) => (
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
