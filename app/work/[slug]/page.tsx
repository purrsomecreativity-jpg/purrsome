"use client";
import { useEffect, useRef, useState } from "react";
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
  /** Live client site URL — renders the interactive browser frame + visit link. */
  liveUrl?: string;
  /** Full-page screenshot used inside the browser frame (scrolls on hover / loops on mobile). */
  fullpage?: string;
};

/**
 * "Browser frame" con el sitio real embebido: en desktop es un iframe
 * navegable (puedes scrollear el sitio completo dentro del marco); en movil
 * muestra la captura full-page en loop y el link abre el sitio real.
 */
function LiveSiteFrame({ url, fullpage, accent, title }: { url: string; fullpage?: string; accent: string; title: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [inView, setInView] = useState(false);
  const [travel, setTravel] = useState(0);
  const [imgOk, setImgOk] = useState(true);
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const measure = () => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img || !img.naturalHeight) return;
    const scaled = (img.naturalHeight / img.naturalWidth) * frame.clientWidth;
    setTravel(Math.max(0, scaled - frame.clientHeight));
  };

  return (
    <section className="max-w-7xl mx-auto px-8 lg:px-16 pb-20 lg:pb-28">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] tracking-[0.35em] uppercase text-white/20 font-medium">Live Site</span>
        <span className="h-px flex-1 bg-white/[0.06]" />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] tracking-[0.15em] uppercase font-semibold text-white/40 hover:text-white transition-colors"
        >
          {host} ↗
        </a>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        {/* Browser chrome bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.04] border-b border-white/[0.06]">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </span>
          <span className="flex-1 text-center text-[11px] tracking-wide text-white/35 font-mono truncate">{host}</span>
          <span className="w-12" />
        </div>

        <div ref={frameRef} className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-white group">
          {/* Desktop: el sitio real, navegable dentro del marco */}
          <iframe
            src={url}
            title={`${title} — live site`}
            loading="lazy"
            className="hidden md:block absolute inset-0 w-full h-full border-0 bg-white"
          />
          {/* Movil: captura full-page en loop (los iframes scrollean mal en touch) */}
          <div className="md:hidden absolute inset-0 bg-[#0A0A0C]">
            {fullpage && imgOk ? (
              <img
                ref={imgRef}
                src={fullpage}
                alt={`${title} — full page`}
                onLoad={measure}
                onError={() => setImgOk(false)}
                className="absolute top-0 left-0 w-full h-auto scroll-screenshot"
                style={{
                  ["--travel" as string]: `-${travel}px`,
                  animationPlayState: inView && travel > 0 ? "running" : "paused",
                }}
              />
            ) : (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center text-sm font-semibold"
                style={{ background: `linear-gradient(150deg, #0A0A0C 0%, ${accent}22 100%)`, color: accent }}
              >
                {host} ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scroll-screenshot {
          animation: fullpage-loop 26s ease-in-out infinite;
        }
        @keyframes fullpage-loop {
          0%, 10% { transform: translateY(0); }
          50%, 60% { transform: translateY(var(--travel)); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

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
  "claudia-garcia": {
    num: "04",
    title: "Claudia",
    titleLine2: "García",
    category: "Fitness Coach · Client Work",
    year: "2026",
    heroGradient: "linear-gradient(150deg, #16060A 0%, #2A0B10 45%, #1A0505 100%)",
    accent: "#FF4D2E",
    lede: "From Instagram-only to a complete brand with its own members app — branding, a fully bilingual site, and paid memberships in a single project.",
    direction:
      "Claudia had a 5.0★ following in Charlotte and zero web presence: no branding, no site, and no way to offer exclusive content to paying members — everything ran by hand over WhatsApp.",
    approach:
      "We built the 'Tropical Heat' identity from scratch — ink, coral, sun and magenta with bold editorial type — then a bilingual site with real class footage and integrated booking, plus a private members portal: her clients log in to see the day's routine, and Claudia runs everything from her phone. Paid memberships handled with Stripe.",
    services: ["Brand Identity", "Web Design & Dev", "Member Portal", "Stripe Memberships", "SEO"],
    highlights: [
      { stat: "−97%", label: "Site Weight", sub: "156 MB → 5.3 MB" },
      { stat: "EN/ES", label: "100% Bilingual", sub: "Full language switch" },
      { stat: "5.0★", label: "Client's ClassPass Rating", sub: "66 reviews" },
    ],
    palette: [
      { name: "Ink", hex: "#0D0D0D" },
      { name: "Coral", hex: "#FF4D2E" },
      { name: "Sun", hex: "#FFC93C" },
      { name: "Magenta", hex: "#D63BA8" },
    ],
    liveUrl: "https://claudiavgarcia.com",
    fullpage: "/work/claudia-garcia-fullpage.webp",
  },
  "riveros-street": {
    num: "05",
    title: "Rivero's",
    titleLine2: "Street",
    category: "Food Truck & Restaurant · Client Work",
    year: "2026",
    heroGradient: "linear-gradient(150deg, #1A0608 0%, #2A0A0E 45%, #12040A 100%)",
    accent: "#E63946",
    lede: "A dealer-fast, bilingual home for a Venezuelan street food family with three Florida locations — menus, catering, and online ordering in one place.",
    direction:
      "Rivero's Street was growing across the Florida panhandle, but its online presence lived on a generic ordering page. The family needed a site that carried the brand's loud, street-food energy and funneled real orders.",
    approach:
      "A fast Next.js build with all three locations managed from a single source, a catering request flow that lands straight in their inbox, and online ordering built on Square — orders drop into the same dashboard and POS the trucks already use.",
    services: ["Web Design & Dev", "Online Ordering (Square)", "Local SEO", "Catering Flow"],
    highlights: [
      { stat: "100/100", label: "Lighthouse SEO", sub: "Perfect score" },
      { stat: "100", label: "Best Practices", sub: "Lighthouse audit" },
      { stat: "3", label: "Locations, One Site", sub: "Freeport · Miramar · FWB" },
    ],
    palette: [
      { name: "Street Red", hex: "#E63946" },
      { name: "Bone", hex: "#F5F0EA" },
      { name: "Charcoal", hex: "#141414" },
      { name: "Gold Fry", hex: "#E9A319" },
    ],
    liveUrl: "https://riverosstreet.com",
    fullpage: "/work/riveros-street-fullpage.webp",
  },
  "angie-auto-sales": {
    num: "06",
    title: "Angie",
    titleLine2: "Auto Sales",
    category: "Commercial Van Dealer · Client Work",
    year: "2026",
    heroGradient: "linear-gradient(150deg, #050B1A 0%, #0A142E 45%, #04070F 100%)",
    accent: "#1D4ED8",
    lede: "A dealer site that works like the business does — direct, trustworthy, and in both languages.",
    direction:
      "Prime One Auto Sales moves commercial vans to working buyers who research in English and Spanish. The site had to present inventory clearly and build trust fast, without dealership clutter.",
    approach:
      "A clean bilingual build focused on the vans themselves: clear inventory presentation, direct contact paths, and local SEO so buyers searching in either language find Angie first.",
    services: ["Web Design & Dev", "Inventory Layout", "Bilingual EN/ES", "Local SEO"],
    highlights: [
      { stat: "EN/ES", label: "Bilingual", sub: "Both markets, one site" },
      { stat: "Vans", label: "Inventory First", sub: "Clear, honest presentation" },
      { stat: "Local", label: "SEO", sub: "Found in both languages" },
    ],
    palette: [
      { name: "Fleet Blue", hex: "#1D4ED8" },
      { name: "Steel", hex: "#64748B" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Ink", hex: "#0B0F19" },
    ],
    liveUrl: "https://angieautosales.com",
    fullpage: "/work/angie-auto-sales-fullpage.webp",
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
            {p.num} / {String(Object.keys(PROJECTS).length).padStart(2, "0")}
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

      {/* ── Live site (client work) ──────────────────────── */}
      {p.liveUrl && (
        <LiveSiteFrame url={p.liveUrl} fullpage={p.fullpage} accent={p.accent} title={p.title} />
      )}

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
          <div className="flex items-center gap-4">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold tracking-wide flex items-center gap-2 transition-colors"
                style={{ color: p.accent }}
              >
                Visit live site ↗
              </a>
            )}
            <a
              href="/start"
              className="cta-btn font-semibold px-8 py-3.5 rounded-full text-sm flex items-center gap-2"
            >
              Start a Project <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer t={t} />
    </main>
  );
}
