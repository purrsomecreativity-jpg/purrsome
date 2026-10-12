"use client";
import { useState, useEffect, useRef } from "react";
import { T, Nav, Footer, useReveal, useLang } from "./components/shared";
import { FAQ } from "./components/FAQ";
import { MeshGradientBackground } from "./components/ui/hero-section-with-smooth-bg-shader";
import { GradientBackground } from "./components/ui/gradient-background";
import AnimatedTestimonials from "./components/ui/animated-testimonials";
import RevealStack from "./components/ui/reveal-stack";

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
const TESTIMONIALS = [
  {
    accent: "#DA1460",
    name: "Jimena Mora Padilla",
    role: { en: "Sports & Bariatric Nutritionist", es: "Nutricionista deportiva y bariátrica" },
    quote: {
      en: "I always believed that what I dreamed of would take a long time to become real — but with Andre and Grecia it was so much more than I dreamed. They got involved in my project and made it so much their own that they faaaar exceeded my expectations. They are two wonderful human beings who I feel I've known for yeeeears; they've had my back and give me the confidence to hand them my tools so they can make them real.",
      es: "Siempre creí que lo que soñaba… tardaría mucho en hacerse realidad; pero con Andre y Grecia… todo fue mucho más de lo que soñé, se involucraron en mi proyecto y lo hicieron tan suyo; que superaron lejoooos mis expectativas. Son dos seres humanos maravillosos, a quienes siento que conozco de añoooos, me han respaldado y me dan la confianza de entregarles mis herramientas para que ellas las hagan realidad.",
    },
  },
  {
    accent: "#F5B400",
    name: "Angel",
    role: { en: "Owner · Angel Mechanic Expert", es: "Dueño · Angel Mechanic Expert" },
    quote: {
      en: "Working with Purrsome has been a great experience. Andrea understood from the start what we needed for Angel Mechanic Expert and has helped us tremendously to improve our image and the way we present the business online. What I like most is that she is always on top of the details, brings ideas, and makes sure everything looks professional without losing the essence of our business. You can tell she truly cares that things work — not just posting for the sake of it. I recommend her 100%.",
      es: "Trabajar con Purrsome ha sido una muy buena experiencia. Andrea entendió desde el principio lo que necesitábamos para Angel Mechanic Expert y nos ha ayudado muchísimo a mejorar nuestra imagen y la manera en que presentamos el negocio en redes. Lo que más me gusta es que siempre está pendiente de los detalles, aporta ideas y busca que todo se vea profesional sin perder la esencia de nuestro negocio. Se nota que realmente le importa que las cosas funcionen y no simplemente hacer una publicación y ya. La recomiendo 100%.",
    },
  },
  {
    accent: "#DA1460",
    name: "Claudia Garcia",
    role: { en: "Fitness Coach · claudiavgarcia.com", es: "Coach de Fitness · claudiavgarcia.com" },
    quote: {
      en: "Purrsome helped me bring my brand to life from scratch — from the full branding to the design of my member portal. They captured exactly what I wanted and turned it into something that truly feels like me and my brand. I loved the result and the whole process. 🤍",
      es: "Purrsome me ayudó a darle vida a mi marca desde cero, desde todo el branding hasta el diseño de mi portal de miembros. Supieron captar exactamente lo que quería y llevarlo a algo que realmente se siente como yo y mi marca. Amé el resultado y todo el proceso. 🤍",
    },
  },
  {
    accent: "#F5B400",
    name: "Mariana Delgado",
    role: { en: "Purrsome Client", es: "Cliente de Purrsome" },
    quote: {
      en: "Super happy with Purrsome\u2019s work. From the very start they understood what I had in mind, even when I didn\u2019t quite know how to explain it myself \ud83d\ude02. Communication was great and the result turned out way better than I imagined. I\u2019d definitely work with them again.",
      es: "S\u00faper contento con el trabajo de Purrsome. Desde el principio entendieron lo que ten\u00eda en mente, incluso cuando yo mismo no sab\u00eda muy bien c\u00f3mo explicarlo \ud83d\ude02. La comunicaci\u00f3n fue muy buena y el resultado qued\u00f3 mucho mejor de lo que imaginaba. Definitivamente volver\u00eda a trabajar con ellos.",
    },
  },
];

function Testimonials({ lang }: { lang: "en" | "es" }) {
  const copy = {
    en: {
      badge: "Real clients",
      title: "Our clients say it best.",
      subtitle: "Real projects, real words — from the people we\u2019ve built brands, websites and portals with.",
    },
    es: {
      badge: "Clientes reales",
      title: "Nuestros clientes lo dicen mejor.",
      subtitle: "Proyectos reales, palabras reales — de la gente con la que hemos construido marcas, webs y portales.",
    },
  }[lang];

  return (
    <AnimatedTestimonials
      badgeText={copy.badge}
      title={copy.title}
      subtitle={copy.subtitle}
      testimonials={TESTIMONIALS.map((t, i) => ({
        id: i + 1,
        name: t.name,
        role: t.role[lang],
        content: t.quote[lang],
        rating: 5,
        accent: t.accent,
      }))}
    />
  );
}


/* ── Horizontal Scroll Nav Cards ─────────────────────────── */
const NAV_CARDS = [
  { key: "work",     href: "/work", object: "/images/folder-clientes.webp",     gradient: "from-pink-950 via-amber-950 to-purple-950",  accent: "#EC4899", num: "01", waves: ["#EC4899", "#F59E0B", "#9333EA", "#DC4A0A"], bgFill: "#1A0614" },
  { key: "services", href: "/services", object: "/images/gear-servicios.webp", gradient: "from-teal-950 via-indigo-950 to-pink-950",   accent: "#14B8A6", num: "02", waves: ["#14B8A6", "#4F46E5", "#EC4899", "#0F766E"], bgFill: "#071A1F" },
  { key: "contact",  href: "/start", object: "/images/phone-contacto.webp",    gradient: "from-purple-950 via-pink-950 to-amber-950",  accent: "#9333EA", num: "03", waves: ["#9333EA", "#EC4899", "#F59E0B", "#7C3AED"], bgFill: "#0E0620" },
  { key: "about",    href: "/about", object: "/images/isotipo-neon.webp",    gradient: "from-indigo-950 via-teal-950 to-orange-950", accent: "#4F46E5", num: "04", waves: ["#4F46E5", "#14B8A6", "#DC4A0A", "#0EA5E9"], bgFill: "#07101E" },
] as const;

const CARD_DESC: Record<string, { en: string; es: string }> = {
  work:     { en: "Real projects for real clients.", es: "Proyectos reales para clientes reales." },
  services: { en: "Design, SEO, ads & branding.", es: "Diseño, SEO, anuncios y branding." },
  contact:  { en: "Tell us about your project.", es: "Cuéntanos sobre tu proyecto." },
  about:    { en: "Who we are and how we think.", es: "Quiénes somos y cómo pensamos." },
};

function StackedNavCards({ t, lang }: { t: typeof T.en; lang: "en" | "es" }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>(() => NAV_CARDS.map(() => false));

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
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="folder-notch" clipPathUnits="objectBoundingBox">
            <path d="M0.045,0.18 L0.49,0.18 Q0.535,0.18 0.535,0.235 L0.535,0.265 Q0.535,0.32 0.58,0.32 L0.955,0.32 Q1,0.32 1,0.375 L1,0.945 Q1,1 0.955,1 L0.045,1 Q0,1 0,0.945 L0,0.235 Q0,0.18 0.045,0.18 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 pb-6 sm:grid-cols-2 sm:px-6 lg:px-12 min-[1100px]:grid-cols-4">
      {NAV_CARDS.map((card, i) => (
        <div
          key={card.key}
          ref={el => { refs.current[i] = el; }}
          className="w-full"
          style={{
            opacity: revealed[i] ? 1 : 0,
            transform: `translateY(${revealed[i] ? 0 : 40}px)`,
            transition: `opacity 0.7s ease ${i * 150}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 150}ms`,
          }}
        >
            <a
              href={card.href}
              className={`group block w-full aspect-[3/4] rounded-2xl overflow-hidden relative transition-transform duration-500 hover:-translate-y-1`}
            >
              {/* Capa iridiscente debajo del folder */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, #F1E9DC 0%, #FFFFFF 28%, #FAF6EF 52%, #F4D7E6 78%, #EDBFD8 100%)",
                }}
              />
              {/* Objeto recortado que sube desde atras del folder */}
              <img
                src={card.object}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute right-[5%] top-[3%] z-[1] h-[48%] w-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out translate-y-[45%] group-hover:translate-y-0"
              />
              {/* Cara del folder (notch recortado con el SVG mask) */}
              <div
                className="absolute inset-0 z-[2] transition-transform duration-500 ease-out group-hover:translate-y-[14%]"
                style={{
                  clipPath: "url(#folder-notch)",
                  background: `linear-gradient(160deg, ${card.accent}3D 0%, ${card.bgFill} 42%, #0B0B10 100%)`,
                }}
              >
                <span className="absolute left-[6%] top-[23%] text-3xl sm:text-5xl font-extrabold tracking-tight text-white">{card.num}</span>
                <span className="absolute right-[5%] top-[36%] text-xl text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/80">↗</span>
                <div className="absolute bottom-[9%] left-[6%] right-[6%]">
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white/90 group-hover:text-white transition-colors duration-300 tracking-tight leading-[0.95]">
                    {t.nav[card.key]}
                  </h3>
                  <p className="mt-2 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium text-white/40">
                    {CARD_DESC[card.key][lang]}
                  </p>
                </div>
              </div>
            </a>
        </div>
      ))}
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function PurrsomePage() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  return (
    <main className="relative text-white overflow-x-hidden">
      <Nav lang={lang} setLang={setLang} t={t} />
      <RevealStack>
        <div className="relative h-full min-h-screen overflow-hidden bg-black">
          <div className="pointer-events-none absolute inset-0">
            <MeshGradientBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[#050507]" />
          </div>
          <div className="relative">
            <Hero t={t} />
          </div>
        </div>
        <div className="relative flex h-full min-h-screen flex-col justify-center">
        <GradientBackground
          gradients={[
            "linear-gradient(135deg, #F5B400 0%, #E8A800 55%, #FFD966 100%)",
            "linear-gradient(135deg, #F5B400 0%, #FFE2A0 50%, #FFFFFF 100%)",
            "linear-gradient(135deg, #FFC72E 0%, #F5B400 55%, #FFF3D6 100%)",
            "linear-gradient(135deg, #E8A800 0%, #F5B400 45%, #FFFFFF 100%)",
            "linear-gradient(135deg, #F5B400 0%, #FFD966 50%, #F5B400 100%)",
            "linear-gradient(135deg, #F5B400 0%, #E8A800 55%, #FFD966 100%)",
          ]}
          animationDuration={10}
          animationDelay={0}
          overlay={true}
          overlayOpacity={0.25}
          className="absolute inset-0 !min-h-0"
        />
        <StackedNavCards t={t} lang={lang} />
        </div>
        <div className="flex h-full min-h-screen flex-col justify-center bg-[#050507]">
          <Testimonials lang={lang} />
        </div>
      </RevealStack>
      <FAQ t={t} />
      <Footer t={t} />
    </main>
  );
}
