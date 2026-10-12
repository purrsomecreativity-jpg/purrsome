"use client";
import { useState, useEffect, useRef } from "react";
import { T, Nav, Footer, useReveal, useLang } from "./components/shared";
import { FAQ } from "./components/FAQ";
import { MeshGradientBackground } from "./components/ui/hero-section-with-smooth-bg-shader";
import { WavyBackground } from "./components/ui/wavy-background";
import { GradientBackground } from "./components/ui/gradient-background";

/* ── Hero ────────────────────────────────────────────────── */
function Hero({ t }: { t: typeof T.en }) {
  const [ref, vis] = useReveal(0.05);
  return (
    <section ref={ref} className="relative z-10 min-h-svh md:min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-center">

        <h1 className={`mb-2 text-white font-bold text-[clamp(2rem,4vw,4.5rem)] leading-none tracking-tight transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "150ms" }}>
          {t.hero.h1[0]}
        </h1>

        <p className={`text-base md:text-lg text-white/25 max-w-md mb-10 tracking-[0.04em] leading-none mx-auto transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "600ms" }}>
          {t.hero.sub}
        </p>

        <div className={`flex flex-wrap justify-center gap-4 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "750ms" }}>
          <a href="/start" className="group cta-btn font-semibold px-10 py-4 rounded-full text-sm flex items-center gap-2.5">
            {t.hero.cta1} <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
          <a href="/work" className="liquid-glass-btn font-medium px-10 py-4 rounded-full text-sm text-white/60">
            {t.hero.cta2}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-700 ${vis ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1000ms" }}>
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/15 font-medium">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/15">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ── Marquee ─────────────────────────────────────────────── */
function Marquee({ text }: { text: string }) {
  const words = text.split("·").map(w => w.trim()).filter(Boolean);
  return (
    <div className="relative py-5 overflow-hidden border-y border-white/[0.03] bg-[#050507]">
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
/**
 * Testimonios reales de clientas y clientes. El original de cada uno esta en
 * espanol; el campo `es` respeta su voz tal cual (incluidas las vocales
 * alargadas de Jimena, que son parte de como escribe) y el `en` es traduccion.
 * El acento de cada tarjeta es el color de marca de su propio proyecto.
 * No agregar testimonios sin autorizacion escrita de la persona.
 */
const TESTIMONIALS = [
  {
    accent: "#2BBAA6",
    name: "Jimena Mora Padilla",
    role: {
      en: "Sports & Bariatric Nutritionist",
      es: "Nutricionista Deportiva y Bariátrica",
    },
    quote: {
      en: "I always thought what I dreamed of would take forever to become real, but with Andre and Grecia it turned out to be so much more than I dreamed. They got involved in my project and made it their own, and they went waaay beyond my expectations. They're two wonderful human beings who I feel like I've known for yeeears. They've had my back, and they give me the confidence to hand over my tools so they can bring them to life.",
      es: "Siempre creí que lo que soñaba… tardaría mucho en hacerse realidad; pero con Andre y Grecia… todo fue mucho más de lo que soñé, se involucraron en mi proyecto y lo hicieron tan suyo que superaron lejoooos mis expectativas. Son dos seres humanos maravillosos, a quienes siento que conozco de añoooos, me han respaldado y me dan la confianza de entregarles mis herramientas para que ellas las hagan realidad.",
    },
  },
  {
    accent: "#FF4D2E",
    name: "Claudia García",
    role: { en: "Fitness Coach · Charlotte, NC", es: "Coach de Fitness · Charlotte, NC" },
    quote: {
      en: "Purrsome brought my brand to life from scratch, from all the branding to the design of my member portal. They knew exactly how to capture what I wanted and turn it into something that really feels like me and my brand. I loved the result and the whole process. 🤍",
      es: "Purrsome me ayudó a darle vida a mi marca desde cero, desde todo el branding hasta el diseño de mi portal de miembros. Supieron captar exactamente lo que quería y llevarlo a algo que realmente se siente como yo y mi marca. Amé el resultado y todo el proceso. 🤍",
    },
  },
  {
    accent: "#E85102",
    name: "Angel",
    role: { en: "Owner · Angel Mechanic Expert", es: "Dueño · Angel Mechanic Expert" },
    quote: {
      en: "Andrea understood from the start what we needed for Angel Mechanic Expert, and she has helped us enormously to improve our image and the way we present the business on social. What I like most is that she's always on top of the details and makes sure everything looks professional without losing the essence of our business. You can tell she genuinely cares that things work, not just posting something and calling it a day. I recommend her 100%.",
      es: "Andrea entendió desde el principio lo que necesitábamos para Angel Mechanic Expert y nos ha ayudado muchísimo a mejorar nuestra imagen y la manera en que presentamos el negocio en redes. Lo que más me gusta es que siempre está pendiente de los detalles y busca que todo se vea profesional sin perder la esencia de nuestro negocio. Se nota que realmente le importa que las cosas funcionen y no simplemente hacer una publicación y ya. La recomiendo 100%.",
    },
  },
];

function Testimonials({ lang }: { lang: "en" | "es" }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVis, setHeaderVis] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>(() => TESTIMONIALS.map(() => false));

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
    <section className="relative z-10 py-16 md:py-24 bg-[#050507]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          ref={headerRef}
          className="mb-16 transition-all duration-700 flex items-center justify-between gap-8"
          style={{ opacity: headerVis ? 1 : 0, transform: `translateY(${headerVis ? 0 : 20}px)` }}
        >
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/25 font-medium block mb-4">
              {lang === "en" ? "What Clients Say" : "Lo Que Dicen los Clientes"}
            </span>
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.02] tracking-tight mb-3">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-start gap-3 md:gap-4">
          {TESTIMONIALS.map((card, i) => (
            <div
              key={card.name}
              ref={el => { cardRefs.current[i] = el; }}
              className={`bg-white/[0.05] border border-white/[0.08] rounded-2xl p-6 md:p-8 hover:bg-white/[0.08] hover:border-white/[0.18] transition-colors duration-300 ${
                // Con 3 tarjetas, la ultima queda huerfana en la rejilla de 2
                // columnas; se estira para ocupar la fila completa.
                i === TESTIMONIALS.length - 1 && TESTIMONIALS.length % 2 === 1
                  ? "sm:col-span-2 lg:col-span-1"
                  : ""
              }`}
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
  { key: "work",     href: "/work",     gradient: "from-pink-950 via-amber-950 to-purple-950",  accent: "#EC4899", num: "01", waves: ["#EC4899", "#F59E0B", "#9333EA", "#DC4A0A"], bgFill: "#1A0614" },
  { key: "services", href: "/services", gradient: "from-teal-950 via-indigo-950 to-pink-950",   accent: "#14B8A6", num: "02", waves: ["#14B8A6", "#4F46E5", "#EC4899", "#0F766E"], bgFill: "#071A1F" },
  { key: "contact",  href: "/start",    gradient: "from-purple-950 via-pink-950 to-amber-950",  accent: "#9333EA", num: "03", waves: ["#9333EA", "#EC4899", "#F59E0B", "#7C3AED"], bgFill: "#0E0620" },
  { key: "about",    href: "/about",    gradient: "from-indigo-950 via-teal-950 to-orange-950", accent: "#4F46E5", num: "04", waves: ["#4F46E5", "#14B8A6", "#DC4A0A", "#0EA5E9"], bgFill: "#07101E" },
] as const;

const CARD_DESC: Record<string, { en: string; es: string }> = {
  work:     { en: "Real client work & concept mockups.", es: "Casos reales y mockups de diseño." },
  services: { en: "Design, SEO, ads & branding.", es: "Diseño, SEO, anuncios y branding." },
  contact:  { en: "Tell us about your project.", es: "Cuéntanos sobre tu proyecto." },
  about:    { en: "Who we are and how we think.", es: "Quiénes somos y cómo pensamos." },
};

function StackedNavCards({ t, lang }: { t: typeof T.en; lang: "en" | "es" }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [depths, setDepths] = useState<number[]>(() => NAV_CARDS.map(() => 0));
  const [revealed, setRevealed] = useState<boolean[]>(() => NAV_CARDS.map(() => false));

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
          style={{ position: "sticky", top: 80, zIndex: i + 1, height: "clamp(220px, 44vh, 380px)" }}
          className="px-3 sm:px-5 pb-3 flex justify-center"
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
              <div className="relative z-10 h-full p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-white/15">{card.num}</span>
                  <span className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-xl">↗</span>
                </div>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase mb-4 font-bold text-white/50">
                    {CARD_DESC[card.key][lang]}
                  </p>
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white/80 group-hover:text-white transition-colors duration-300 tracking-tight leading-[0.9]">
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
      <FAQ t={t} />
      <Footer t={t} />
    </main>
  );
}
