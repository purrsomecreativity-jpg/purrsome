"use client";
import { useState, useEffect, useRef } from "react";
import { T, Nav, Footer, useReveal, useLang } from "./components/shared";
import { MeshGradientBackground } from "./components/ui/hero-section-with-smooth-bg-shader";
import { WavyBackground } from "./components/ui/wavy-background";
import { GradientBackground } from "./components/ui/gradient-background";

/* ── Hero ────────────────────────────────────────────────── */
function Hero({ t }: { t: typeof T.en }) {
  const [ref, vis] = useReveal(0.05);
  return (
    <section ref={ref} className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-center mt-8">

        <h1 className={`mb-2 text-white hover:text-[#050507] font-bold text-[clamp(2rem,4vw,4.5rem)] leading-none tracking-tight transition-all duration-700 hover:duration-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "150ms" }}>
          {t.hero.h1[0]}
        </h1>

        <p className={`text-base md:text-lg text-white/25 hover:text-[#050507] max-w-md mb-10 tracking-[0.04em] leading-none mx-auto transition-all duration-700 hover:duration-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "600ms" }}>
          {t.hero.sub}
        </p>

        <div className={`flex flex-wrap justify-center gap-4 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "750ms" }}>
          <a href="/pricing" className="group cta-btn font-semibold px-10 py-4 rounded-full text-sm flex items-center gap-2.5">
            {t.hero.cta1} <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
          <a href="/start" className="liquid-glass-btn font-medium px-10 py-4 rounded-full text-sm text-white/60">
            {t.hero.cta2}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Marquee ─────────────────────────────────────────────── */
function Marquee({ text }: { text: string }) {
  const words = text.split("·").map(w => w.trim()).filter(Boolean);
  return (
    <div className="relative py-5 overflow-hidden border-y border-white/[0.03]">
      <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #050507, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #050507, transparent)" }} />
      <div className="marquee-track flex whitespace-nowrap items-center">
        {[0, 1, 2, 3].map(i => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            {words.map((w, j) => (
              <span key={j} className="inline-flex items-center">
                <span className="text-[13px] tracking-[0.35em] uppercase text-white/[0.04] font-bold px-4">{w}</span>
                <img src="/stocks/purrsome-isotipo.png" alt="" className="w-4 h-4 opacity-[0.07] object-contain flex-shrink-0" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Testimonials ────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    accent: "#F59E0B",
    name: "María González",
    role: { en: "Owner · Bella Cucina Restaurant", es: "Dueña · Bella Cucina Restaurant" },
    quote: {
      en: "Purrsome completely transformed our online presence. In less than 3 months we went from being invisible on Google to having reservations every weekend.",
      es: "Purrsome transformó nuestra presencia online completamente. En menos de 3 meses pasamos de ser invisibles en Google a tener reservaciones todos los fines de semana.",
    },
  },
  {
    accent: "#14B8A6",
    name: "James Whitfield",
    role: { en: "Owner · ProFix Plumbing", es: "Dueño · ProFix Plumbing" },
    quote: {
      en: "I was skeptical about investing in a website, but Purrsome made it easy. Now I get more calls in a week than I used to get in a month.",
      es: "Era escéptico sobre invertir en un sitio web, pero Purrsome lo hizo fácil. Ahora recibo más llamadas en una semana que antes en un mes.",
    },
  },
  {
    accent: "#EC4899",
    name: "Sofia Reyes",
    role: { en: "Founder · Luma Skin Studio", es: "Fundadora · Luma Skin Studio" },
    quote: {
      en: "Finally an agency that gets what my brand needed. They captured exactly the vibe I wanted — luxurious but approachable. My clients always compliment the website.",
      es: "Por fin una agencia que entendió lo que mi marca necesitaba. Capturaron exactamente el ambiente que quería — lujoso pero accesible.",
    },
  },
  {
    accent: "#9333EA",
    name: "Daniel Park",
    role: { en: "Co-founder · Verdant Market", es: "Co-fundador · Verdant Market" },
    quote: {
      en: "Our weekend foot traffic tripled after the campaign they ran for us. Best investment we've made for the business this year.",
      es: "El tráfico de los fines de semana se triplicó después de la campaña que hicieron. La mejor inversión del año para el negocio.",
    },
  },
];

function Testimonials({ lang }: { lang: "en" | "es" }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVis, setHeaderVis] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState([false, false, false, false]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderVis(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(prev => { const next = [...prev]; next[i] = true; return next; });
            obs.unobserve(el);
          }
        },
        { threshold: 0.08 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <section className="relative z-10 py-24 bg-[#050507]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div
          ref={headerRef}
          className="mb-16 transition-all duration-700 flex items-center justify-between gap-8"
          style={{ opacity: headerVis ? 1 : 0, transform: `translateY(${headerVis ? 0 : 20}px)` }}
        >
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/25 font-medium block mb-4">
              {lang === "en" ? "What Clients Say" : "Lo Que Dicen los Clientes"}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.02] tracking-tight mb-3">
              {lang === "en" ? "Results they didn't expect." : "Resultados que no esperaban."}
            </h2>
            <p className="text-white/30 text-lg">
              {lang === "en" ? "Real businesses. Real growth." : "Negocios reales. Crecimiento real."}
            </p>
          </div>
          <img
            src="/stocks/purrsome-isotipo.png"
            alt="Purrsome"
            className="hidden md:block w-36 lg:w-48 h-auto object-contain flex-shrink-0 -mt-16"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {TESTIMONIALS.map((card, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/[0.18] transition-colors duration-300"
              style={{
                opacity: revealed[i] ? 1 : 0,
                transform: `translateY(${revealed[i] ? 0 : 30}px)`,
                transition: `opacity 0.7s ease ${i * 150}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 150}ms, background-color 0.3s, border-color 0.3s`,
              }}
            >
              <span className="text-6xl font-bold leading-none block mb-3 select-none" style={{ color: card.accent, opacity: 0.8 }}>"</span>
              <p className="text-white text-lg leading-relaxed">{card.quote[lang]}</p>
              <div className="border-t border-white/10 mt-5 pt-5">
                <div className="font-bold text-white text-sm">{card.name}</div>
                <div className="text-sm text-white/45 mt-0.5">{card.role[lang]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Horizontal Scroll Nav Cards ─────────────────────────── */
const NAV_CARDS = [
  { key: "services", href: "/services", gradient: "from-teal-950 via-indigo-950 to-pink-950",   accent: "#14B8A6", num: "01", waves: ["#14B8A6", "#4F46E5", "#EC4899", "#0F766E"], bgFill: "#071A1F" },
  { key: "pricing",  href: "/pricing",  gradient: "from-purple-950 via-pink-950 to-amber-950",  accent: "#9333EA", num: "02", waves: ["#9333EA", "#EC4899", "#F59E0B", "#7C3AED"], bgFill: "#0E0620" },
  { key: "about",    href: "/about",    gradient: "from-indigo-950 via-teal-950 to-orange-950", accent: "#4F46E5", num: "03", waves: ["#4F46E5", "#14B8A6", "#DC4A0A", "#0EA5E9"], bgFill: "#07101E" },
] as const;

const CARD_DESC: Record<string, { en: string; es: string }> = {
  services: { en: "Design, SEO, ads & branding.", es: "Diseño, SEO, anuncios y branding." },
  pricing:  { en: "Clear packages, no surprises.", es: "Paquetes claros, sin sorpresas." },
  about:    { en: "Who we are and how we think.", es: "Quiénes somos y cómo pensamos." },
};

function StackedNavCards({ t, lang }: { t: typeof T.en; lang: "en" | "es" }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [depths, setDepths] = useState<number[]>([0, 0, 0]);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const NAV_TOP = 82;
    const update = () => {
      const stuck = refs.current.map(el =>
        el ? el.getBoundingClientRect().top <= NAV_TOP : false
      );
      setDepths(stuck.map((s, i) =>
        s ? stuck.slice(i + 1).filter(Boolean).length : 0
      ));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(prev => { const next = [...prev]; next[i] = true; return next; });
            obs.unobserve(el);
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <section className="relative z-10 pt-24">
      {NAV_CARDS.map((card, i) => (
        <div
          key={card.key}
          ref={el => { refs.current[i] = el; }}
          style={{ position: "sticky", top: 80, zIndex: i + 1, height: "44vh" }}
          className="px-5 pb-3 flex justify-center"
        >
          <div
            className="w-full max-w-lg h-full"
            style={{
              opacity: revealed[i] ? 1 : 0,
              transform: `translateY(${revealed[i] ? 0 : 40}px)`,
              transition: `opacity 0.7s ease ${i * 150}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 150}ms`,
            }}
          >
            <a
              href={card.href}
              className={`group block w-full h-full rounded-2xl overflow-hidden relative`}
              style={{
                transform: `scale(${1 - depths[i] * 0.03})`,
                transformOrigin: "top center",
                transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <WavyBackground
                containerClassName="absolute inset-0"
                colors={[...card.waves]}
                backgroundFill={card.bgFill}
                blur={8}
                speed="slow"
                waveOpacity={0.55}
                waveWidth={45}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse 80% 60% at 30% 70%, ${card.accent}22, transparent)` }}
              />
              <div className="relative z-10 h-full p-8 lg:p-10 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-white/15">{card.num}</span>
                  <span className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-xl">↗</span>
                </div>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase mb-4 font-bold text-white/50">
                    {CARD_DESC[card.key][lang]}
                  </p>
                  <h3 className="text-4xl lg:text-5xl font-extrabold text-white/80 group-hover:text-white transition-colors duration-300 tracking-tight leading-[0.9]">
                    {t.nav[card.key]}
                  </h3>
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${card.accent}80, transparent)` }}
              />
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function PurrsomePage() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  return (
    <main className="relative text-white overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-[115vh] -z-10 pointer-events-none overflow-hidden bg-black">
        <MeshGradientBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[#050507]" />
      </div>
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <Marquee text={t.marquee} />
      <div className="relative">
        <GradientBackground
          gradients={[
            "linear-gradient(135deg, #0C0A2E 0%, #120838 50%, #1a0533 100%)",
            "linear-gradient(135deg, #0d0a30 0%, #2d1b69 50%, #11998e 100%)",
            "linear-gradient(135deg, #160530 0%, #8e2de2 50%, #4a00e0 100%)",
            "linear-gradient(135deg, #0a1535 0%, #0f3460 50%, #e94560 100%)",
            "linear-gradient(135deg, #0d0a30 0%, #4a00e0 50%, #ec4899 100%)",
            "linear-gradient(135deg, #0C0A2E 0%, #120838 50%, #1a0533 100%)",
          ]}
          animationDuration={10}
          animationDelay={0}
          overlay={true}
          overlayOpacity={0.25}
          className="absolute inset-0 !min-h-0"
        />
        <StackedNavCards t={t} lang={lang} />
      </div>
      <Testimonials lang={lang} />
      <Footer t={t} />
    </main>
  );
}
