"use client";
import { useState, useEffect, useRef } from "react";
import { T, Nav, Footer, useReveal, useLang } from "./components/shared";
import { FAQ } from "./components/FAQ";
import { MeshGradientBackground } from "./components/ui/hero-section-with-smooth-bg-shader";
import AnimatedTestimonials from "./components/ui/animated-testimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      en: "First of all, THANK YOU, Purrsome, for literally reading my mind and creating the website I wanted so badly \ud83d\udc9b Communicating with the team was super easy, fast and effective. Before, during and after the site was ready, they were always making sure everything worked perfectly and that I was happy with the result. I truly can\u2019t recommend working with Purrsome enough. Pure talent and human quality in one project! Thank you so much for making something I dreamed of come true! \ud83d\udc9b",

      es: "Primero que todo, GRACIAS, Purrsome, por literalmente leerme la mente y crear la p\u00e1gina web que tanto quer\u00eda \ud83d\udc9b Comunicarme con el equipo fue s\u00faper f\u00e1cil, r\u00e1pido y efectivo. Antes, durante y despu\u00e9s de tener la p\u00e1gina lista, siempre estuvieron pendientes de que todo funcionara perfectamente y de que yo estuviera feliz con el resultado. De verdad, no puedo recomendar m\u00e1s trabajar con Purrsome. Puro talento y calidad humana en un solo proyecto! Muchas gracias por hacer realidad algo que so\u00f1aba tanto! \ud83d\udc9b",

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
  {
    accent: "#DA1460",
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

  const reviewLabels = {
    en: {
      cta: "Leave a review",
      title: "Tell us how it went",
      name: "Your name",
      business: "Your business (optional)",
      rating: "Your rating",
      message: "Your review...",
      send: "Send review",
      sending: "Sending...",
      thanks: "Thank you! We read every review — yours will appear on the site once we confirm it with you.",
      error: "Something failed — try again",
    },
    es: {
      cta: "Deja tu review",
      title: "Cu\u00e9ntanos c\u00f3mo te fue",
      name: "Tu nombre",
      business: "Tu negocio (opcional)",
      rating: "Tu calificaci\u00f3n",
      message: "Tu review...",
      send: "Enviar review",
      sending: "Enviando...",
      thanks: "\u00a1Gracias! Leemos cada review — la tuya aparecer\u00e1 en el site apenas la confirmemos contigo.",
      error: "Algo fall\u00f3 — intenta de nuevo",
    },
  }[lang];

  return (
    <AnimatedTestimonials
      badgeText={copy.badge}
      title={copy.title}
      subtitle={copy.subtitle}
      reviewLabels={reviewLabels}
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
  const [active, setActive] = useState<boolean[]>(() => NAV_CARDS.map(() => false));

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

  // En movil no hay hover: el folder se abre cuando la card esta bien visible
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          setActive(prev => {
            if (prev[i] === entry.isIntersecting) return prev;
            const next = [...prev];
            next[i] = entry.isIntersecting;
            return next;
          });
        },
        { threshold: 0.55 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <section className="relative z-10 w-full py-10">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="folder-notch" clipPathUnits="objectBoundingBox">
            <path d="M0.045,0.18 L0.49,0.18 Q0.535,0.18 0.535,0.235 L0.535,0.265 Q0.535,0.32 0.58,0.32 L0.955,0.32 Q1,0.32 1,0.375 L1,1 L0,1 L0,0.235 Q0,0.18 0.045,0.18 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 pb-6 sm:grid-cols-2 sm:px-6 lg:px-12 min-[1100px]:grid-cols-4">
      {NAV_CARDS.map((card, i) => (
        <div
          key={card.key}
          ref={el => { refs.current[i] = el; }}
          className="w-full max-sm:w-[78%] max-sm:mx-auto"
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
                className={`pointer-events-none absolute right-[5%] top-[3%] z-[1] h-[48%] w-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out translate-y-[45%] group-hover:translate-y-0 ${active[i] ? "max-lg:translate-y-0" : ""}`}
              />
              {/* Cara del folder (notch recortado con el SVG mask) */}
              <div
                className={`absolute inset-0 z-[2] transition-transform duration-500 ease-out group-hover:translate-y-[14%] ${active[i] ? "max-lg:translate-y-[14%]" : ""}`}
                style={{
                  clipPath: "url(#folder-notch)",
                  background: `linear-gradient(160deg, ${card.accent}3D 0%, ${card.bgFill} 42%, #0B0B10 100%)`,
                }}
              >
                <span className="absolute left-[6%] top-[23%] text-3xl sm:text-5xl font-extrabold tracking-tight text-white">{card.num}</span>
                <span className="absolute right-[5%] top-[36%] text-xl text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/80">↗</span>
                <div className={`absolute bottom-[9%] left-[6%] right-[6%] transition-transform duration-500 ease-out group-hover:-translate-y-14 ${active[i] ? "max-lg:-translate-y-14" : ""}`}>
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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(".home-hero", {
        opacity: 0,
        filter: "blur(16px)",
        ease: "none",
        scrollTrigger: { trigger: ".home-hero", start: "top top", end: "+=45%", pin: true, pinSpacing: true, scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative text-white overflow-x-hidden">
      <Nav lang={lang} setLang={setLang} t={t} />

      {/* Mesh animado fijo detras del hero y las cards */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black">
        <MeshGradientBackground
          colors={["#050507", "#DA1460", "#F5B400", "#050507", "#DA1460", "#ECECEC", "#F5B400", "#050507"]}
        />
      </div>

      {/* Hero: fijo mientras se desvanece con blur */}
      <div className="home-hero relative">
        <Hero t={t} />
      </div>

      {/* Cards folder sobre el mismo fondo animado */}
      <div className="relative flex min-h-screen items-center -mt-[32vh] lg:-mt-[40vh]">
        <StackedNavCards t={t} lang={lang} />
      </div>

      {/* Resto en fondo solido */}
      <div className="relative bg-[#050507]">
        <Testimonials lang={lang} />
        <FAQ t={t} />
        <Footer t={t} />
      </div>
    </main>
  );
}
