"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* ─── TRANSLATIONS ─── */
export const T = {
  en: {
    nav: { work: "Work", services: "Services", about: "About", contact: "Contact", cta: "Let's Talk" },
    hero: {
      tagline: "We see what others don't.",
      h1: ["Built to be seen.", "Designed to convert."],
      sub: "Branding, web design, campaigns, SEO & ads. Everything a business needs to stop being invisible.",
      cta1: "Start a Project",
      cta2: "See Our Work"
    },
    marquee: "Design · Strategy · Code · SEO · Ads · Branding · ",
    services: {
      tag: "Services",
      title: "Every brand deserves to be seen.",
      sub: "We combine striking design with sharp strategy to make your business impossible to ignore.",
      items: [
        { num: "01", title: "Web Design & Dev", desc: "Custom-coded websites built with Next.js. Fast, beautiful, and engineered to convert. No templates, no compromises.", icon: "✦" },
        { num: "02", title: "Search Engine Optimization", desc: "We make Google notice you. Technical SEO, content strategy, and local optimization that puts you on the map.", icon: "◉" },
        { num: "03", title: "Paid Advertising", desc: "Meta Ads and Google Ads that bring the right people to your door. Strategy, creative, and optimization — all handled.", icon: "◈" },
        { num: "04", title: "Brand Identity", desc: "Logo, color palette, typography, and brand guidelines that capture who you are and make you unforgettable.", icon: "❋" },
        { num: "05", title: "Landing Pages + Member Portals", desc: "A landing page that sells, plus a private members area — user accounts, exclusive content, and paid subscriptions handled for you. Built for coaches, trainers, and nutritionists.", icon: "⬡" }
      ]
    },
    work: {
      tag: "Concept Mockups",
      title: "Selected Design Mockups.",
      casesTag: "Client Work",
      casesTitle: "Real projects, real results.",
      cases: [
        { slug: "claudia-garcia", title: "Claudia García", cat: "Fitness Coach · Branding + Web + Member Portal", year: "2026", accent: "#FF4D2E", desc: "Complete 'Tropical Heat' brand identity, a fully bilingual website, and a members-only portal with workout routines, an admin panel, and paid memberships — for a 5.0★ fitness coach in Charlotte, NC.", image: "/work/claudia-garcia.png" },
        { slug: "riveros-street", title: "Rivero's Street", cat: "Food Truck & Restaurant · Website + Online Ordering", year: "2026", accent: "#E63946", desc: "A fast, bilingual site for a Florida food-truck family with three locations — live menus, catering requests, and online ordering built on Square.", image: "/work/riveros-street.png" },
        { slug: "angie-auto-sales", title: "Angie Auto Sales", cat: "Commercial Van Dealer · Bilingual Website", year: "2026", accent: "#1D4ED8", desc: "Bilingual site for Prime One Auto Sales — commercial van inventory presented clearly, built to turn browsers into buyers in a market that speaks two languages.", image: "/work/angie-auto-sales.png" },
      ],
      items: [
        { title: "Magic Pets", cat: "Grooming Studio · Concept Mockup", year: "2026", accent: "#EC4899", desc: "Concept design for a premium pet grooming studio — bilingual layout, drag-to-discover hero, and a playful character-driven visual system.", image: "/work/magic-pets.png" },
        { title: "Lumière Studio", cat: "Beauty Atelier · Concept Mockup", year: "2026", accent: "#B08060", desc: "Concept design for a Miami beauty atelier — editorial serif typography, slow considered pacing, and a listening-first experience that reads premium without being cold.", image: "/work/lumiere-studio.png" },
        { title: "Angel Mechanic Expert", cat: "Automotive · Concept Mockup", year: "2026", accent: "#E85102", desc: "Concept design for an independent auto shop — bold persimmon accent, trust-first layout with 36+ years of experience front and center, and a bilingual service flow.", image: "/work/ame.png" },
      ],
      cta: "View All Work →"
    },
    faq: {
      tag: "FAQ",
      title: "Questions, answered.",
      items: [
        { q: "How long does a project take?", a: "Most websites go live in 2–4 weeks once we have your content. Larger builds — like member portals or online ordering — run on a custom timeline we agree on upfront." },
        { q: "What does the process look like?", a: "A free discovery call, then a proposal. Once approved: design and build with your real content, two rounds of revisions, and launch. You approve every step." },
        { q: "How much does it cost?", a: "Every business is different, so we quote each project individually. Book a free call, tell us what you need, and you'll get a clear, fixed proposal — no surprises." },
        { q: "Do you work in English and Spanish?", a: "Both, always. Every site we build is fully bilingual by default, because your customers don't all speak the same language." },
        { q: "What happens after launch?", a: "You own everything. We hand over access, a visual guide, and training — and if you want us to keep maintaining and growing the site, we offer monthly support." },
        { q: "I don't have professional photos or copy. Is that a problem?", a: "Not at all. We work with what you have, direct the visuals, and write the copy with you. That's part of the job." },
      ]
    },
    about: {
      tag: "About",
      title: "We started Purrsome because every business deserves to look like itself.",
      p1: "Purrsome was founded by Andrea Villafañe — artist, designer, and developer — who grew up obsessed with color, form, and the way visuals make you feel before you even read a word.",
      p2: "The idea was simple: small businesses deserve the same level of intentional, artistic brand identity that big companies pay millions for. Not templates. Not generic. Something that actually represents who they are.",
      p3: "So we built Purrsome for the businesses that have a story worth telling — and needed someone to help them tell it visually.",
      mission: "Our mission is to give every small business a visual identity so strong, so specific, so unmistakably theirs — that blending in stops being an option.",
      catTitle: "Why the cat?",
      catWhy: "Cats see what others don't. In low light, in the margins, in the details everyone else walks past. That's exactly how we approach every project — looking for the angle, the color, the idea that makes your business impossible to ignore. That's why our tagline is: We see what others don't.",
      values: [
        { title: "Precise", desc: "Every detail matters" },
        { title: "Curious", desc: "We dig deeper than anyone" },
        { title: "Bold", desc: "Safe is boring" },
        { title: "Relentless", desc: "We don't stop at good enough" }
      ]
    },
    stats: [
      { num: "100%", label: "Bilingual Builds" },
      { num: "100/100", label: "Lighthouse SEO" },
      { num: "−97%", label: "Site Weight Optimized" },
      { num: "2–4wk", label: "Typical Delivery" }
    ],
    contact: {
      tag: "Contact",
      title: "Let's create something remarkable.",
      sub: "Book a free 30-minute consultation. No pressure — just a conversation about where you want to go.",
      form: { name: "Name", email: "Email", biz: "Business", msg: "Tell us about your vision...", send: "Send Message", sent: "Message Sent ✓" },
      info: { email: "purrsome@purrsomecrete.com", phone: "+1 (407) 693-8364", loc: "Remote · Worldwide" }
    },
    footer: { copy: "© 2026 Purrsome™", tagline: "Refuse to Blend In." }
  },
  es: {
    nav: { work: "Trabajo", services: "Servicios", about: "Nosotros", contact: "Contacto", cta: "Hablemos" },
    hero: {
      tagline: "Vemos lo que otros no.",
      h1: ["Hecho para ser visto.", "Diseñado para convertir."],
      sub: "Branding, diseño web, campañas, SEO y anuncios. Todo lo que un negocio necesita para dejar de ser invisible.",
      cta1: "Iniciar Proyecto",
      cta2: "Ver Trabajo"
    },
    marquee: "Diseño · Estrategia · Código · SEO · Ads · Branding · ",
    services: {
      tag: "Servicios",
      title: "Toda marca merece ser vista.",
      sub: "Combinamos diseño impactante con estrategia afilada para hacer tu negocio imposible de ignorar.",
      items: [
        { num: "01", title: "Diseño & Desarrollo Web", desc: "Sitios web custom con Next.js. Rápidos, hermosos, e ingeniados para convertir. Sin templates, sin compromisos.", icon: "✦" },
        { num: "02", title: "Optimización SEO", desc: "Hacemos que Google te note. SEO técnico, estrategia de contenido y optimización local que te pone en el mapa.", icon: "◉" },
        { num: "03", title: "Publicidad Digital", desc: "Meta Ads y Google Ads que traen a las personas correctas. Estrategia, creativos y optimización — todo incluido.", icon: "◈" },
        { num: "04", title: "Identidad de Marca", desc: "Logo, paleta de color, tipografía y guías de marca que capturan quién eres y te hacen inolvidable.", icon: "❋" },
        { num: "05", title: "Landing + Portal de Miembros", desc: "Una landing que vende, más un área privada de miembros — cuentas, contenido exclusivo y suscripciones pagas sin que muevas un dedo. Hecho para coaches, entrenadores y nutricionistas.", icon: "⬡" }
      ]
    },
    work: {
      tag: "Mockups Conceptuales",
      title: "Mockups de Diseño.",
      casesTag: "Casos Reales",
      casesTitle: "Proyectos reales, resultados reales.",
      cases: [
        { slug: "claudia-garcia", title: "Claudia García", cat: "Coach de Fitness · Branding + Web + Portal de Miembros", year: "2026", accent: "#FF4D2E", desc: "Identidad de marca 'Tropical Heat' completa, sitio 100% bilingüe y portal privado de miembros con rutinas, panel de administración y membresías pagas — para una coach de fitness 5.0★ en Charlotte, NC.", image: "/work/claudia-garcia.png" },
        { slug: "riveros-street", title: "Rivero's Street", cat: "Food Truck & Restaurante · Web + Pedidos Online", year: "2026", accent: "#E63946", desc: "Sitio rápido y bilingüe para una familia de food trucks en Florida con tres locaciones — menús, solicitudes de catering y pedidos online con Square.", image: "/work/riveros-street.png" },
        { slug: "angie-auto-sales", title: "Angie Auto Sales", cat: "Concesionario de Vans · Sitio Bilingüe", year: "2026", accent: "#1D4ED8", desc: "Sitio bilingüe para Prime One Auto Sales — inventario de vans comerciales presentado con claridad, hecho para convertir visitas en compradores en un mercado que habla dos idiomas.", image: "/work/angie-auto-sales.png" },
      ],
      items: [
        { title: "Magic Pets", cat: "Estudio de Grooming · Mockup", year: "2026", accent: "#EC4899", desc: "Mockup conceptual para un estudio premium de grooming canino — diseño bilingüe, hero interactivo tipo drag y un sistema visual juguetón.", image: "/work/magic-pets.png" },
        { title: "Lumière Studio", cat: "Atelier de Belleza · Mockup", year: "2026", accent: "#B08060", desc: "Mockup conceptual para un atelier de belleza en Miami — tipografía serif editorial, ritmo pausado y una experiencia que escucha primero, premium sin ser fría.", image: "/work/lumiere-studio.png" },
        { title: "Angel Mechanic Expert", cat: "Automotriz · Mockup", year: "2026", accent: "#E85102", desc: "Mockup conceptual para un taller mecánico independiente — acento persimmon, layout enfocado en confianza con 36+ años de experiencia al frente, y flujo de servicios bilingüe.", image: "/work/ame.png" },
      ],
      cta: "Ver Todo el Trabajo →"
    },
    faq: {
      tag: "FAQ",
      title: "Preguntas, respondidas.",
      items: [
        { q: "¿Cuánto tarda un proyecto?", a: "La mayoría de los sitios salen en vivo en 2–4 semanas desde que tenemos tu contenido. Proyectos grandes — como portales de miembros o pedidos online — llevan un timeline a medida que acordamos desde el inicio." },
        { q: "¿Cómo es el proceso?", a: "Una llamada gratuita de descubrimiento y luego una propuesta. Aprobada: diseño y desarrollo con tu contenido real, dos rondas de revisiones y lanzamiento. Tú apruebas cada paso." },
        { q: "¿Cuánto cuesta?", a: "Cada negocio es distinto, así que cotizamos cada proyecto individualmente. Agenda una llamada gratis, cuéntanos qué necesitas y recibes una propuesta clara y fija — sin sorpresas." },
        { q: "¿Trabajan en inglés y español?", a: "Siempre los dos. Cada sitio que construimos es 100% bilingüe por defecto, porque tus clientes no hablan todos el mismo idioma." },
        { q: "¿Qué pasa después del lanzamiento?", a: "Todo es tuyo. Entregamos accesos, guía visual y capacitación — y si quieres que sigamos manteniendo y creciendo el sitio, ofrecemos soporte mensual." },
        { q: "No tengo fotos profesionales ni textos. ¿Es problema?", a: "Para nada. Trabajamos con lo que tengas, dirigimos los visuales y escribimos los textos contigo. Es parte del trabajo." },
      ]
    },
    about: {
      tag: "Nosotros",
      title: "Fundamos Purrsome porque cada negocio merece verse como él mismo.",
      p1: "Purrsome fue fundado por Andrea Villafañe — artista, diseñadora y desarrolladora — que creció obsesionada con el color, la forma y la manera en que los visuales te hacen sentir antes de leer una sola palabra.",
      p2: "La idea era simple: los pequeños negocios merecen el mismo nivel de identidad de marca intencional y artística que las grandes empresas pagan millones por tener. Sin templates. Sin lo genérico. Algo que realmente los represente.",
      p3: "Por eso construimos Purrsome para los negocios que tienen una historia que vale la pena contar — y necesitaban a alguien que les ayudara a contarla visualmente.",
      mission: "Nuestra misión es darle a cada pequeño negocio una identidad visual tan poderosa, tan específica, tan inconfundiblemente suya — que mezclarse con el resto deje de ser una opción.",
      catTitle: "¿Por qué el gato?",
      catWhy: "Los gatos ven lo que otros no ven. En la penumbra, en los márgenes, en los detalles que todos los demás pasan por alto. Así es exactamente como abordamos cada proyecto — buscando el ángulo, el color, la idea que hace a tu negocio imposible de ignorar. Por eso nuestro tagline es: We see what others don't.",
      values: [
        { title: "Precisos", desc: "Cada detalle importa" },
        { title: "Curiosos", desc: "Investigamos más que nadie" },
        { title: "Audaces", desc: "Lo seguro es aburrido" },
        { title: "Imparables", desc: "No nos detenemos en suficiente" }
      ]
    },
    stats: [
      { num: "100%", label: "Sitios Bilingües" },
      { num: "100/100", label: "SEO Lighthouse" },
      { num: "−97%", label: "Peso Optimizado" },
      { num: "2–4sem", label: "Entrega Típica" }
    ],
    contact: {
      tag: "Contacto",
      title: "Creemos algo extraordinario.",
      sub: "Agenda una consulta gratuita de 30 minutos. Sin presión — solo una conversación sobre tus metas.",
      form: { name: "Nombre", email: "Email", biz: "Negocio", msg: "Cuéntanos sobre tu visión...", send: "Enviar Mensaje", sent: "Enviado ✓" },
      info: { email: "purrsome@purrsomecrete.com", phone: "+1 (407) 693-8364", loc: "Remoto · Mundial" }
    },
    footer: { copy: "© 2026 Purrsome™", tagline: "Refuse to Blend In." }
  }
};

export type Lang = keyof typeof T;

/* ─── HOOKS ─── */
export function useReveal(th = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      setV(true);
      return;
    }

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.unobserve(el); }
    }, { threshold: th });
    obs.observe(el);
    return () => obs.disconnect();
  }, [th]);
  return [ref, v] as const;
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "es") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };
  return [lang, setLang];
}

/* ─── NAV ─── */
export function Nav({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: typeof T.en }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "nav-glass" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 grid grid-cols-3 items-center">
        {/* Col 1 — always visible: hamburger (mobile) + home icon + nav links (desktop) */}
        <div className="flex items-center gap-0">
          <button onClick={() => setOpen(!open)} className="md:hidden text-white/50 hover:text-white">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="14" y2="17" /></>}
            </svg>
          </button>
          <a
            href="/"
            className={`hidden md:flex items-center justify-center px-3 transition-all duration-300 ${
              isActive("/") ? "opacity-100" : "opacity-40 hover:opacity-100"
            }`}
            aria-label="Home"
          >
            <img
              src="/stocks/purrsome-isotipo.png"
              alt="Home"
              width={40}
              height={40}
              className="object-contain"
            />
          </a>
          {(["work", "services", "about"] as const).map(k => (
            <a
              key={k}
              href={`/${k}`}
              className={`hidden md:flex text-[12px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isActive(`/${k}`)
                  ? "text-white bg-white/[0.13] backdrop-blur-md border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.2)]"
                  : "text-white/40 border-transparent hover:text-[#050507] hover:bg-white hover:border-white/0"
              }`}
            >
              {t.nav[k]}
            </a>
          ))}
        </div>

        {/* Col 2 — always visible: logo (always centered, always 2nd grid child) */}
        <a href="/" className="flex justify-center group">
          <div className="relative">
            <div
              className="bg-white group-hover:bg-[#050507] transition-colors duration-300"
              style={{
                height: "36px",
                width: "180px",
                WebkitMaskImage: "url(/stocks/PURRSOME-logo-oficial.svg)",
                maskImage: "url(/stocks/PURRSOME-logo-oficial.svg)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "left center",
                maskPosition: "left center",
              }}
            />
          </div>
        </a>

        {/* Col 3 — always visible: right nav (desktop) / empty spacer (mobile) */}
        <div className="flex items-center gap-1 justify-end">
          <a href="/about#contact" className="hidden md:flex text-[12px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 rounded-full border border-transparent text-white/40 hover:text-[#050507] hover:bg-white hover:border-white/0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">{t.nav.contact}</a>
          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="hidden md:flex text-[11px] tracking-[0.2em] font-medium px-3 py-1.5 rounded-full border border-transparent text-white/40 hover:text-[#050507] hover:bg-white hover:border-white/0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            {lang === "en" ? "ES" : "EN"}
          </button>
          <a href="/start" className="hidden md:flex text-[12px] tracking-[0.12em] uppercase font-semibold px-4 py-1.5 rounded-full border text-white bg-white/[0.13] backdrop-blur-md border-white/25 hover:bg-white hover:text-[#050507] hover:border-white/0 hover:shadow-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">{t.nav.cta}</a>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#050507]/95 backdrop-blur-2xl border-t border-white/[0.04] px-6 py-10 flex flex-col gap-6 animate-fadeSlide">
          {(["work", "services", "about"] as const).map(k => (
            <a key={k} href={`/${k}`} onClick={() => setOpen(false)} className="text-lg text-white/50 hover:text-white tracking-wide">{t.nav[k]}</a>
          ))}
          <a href="/about#contact" onClick={() => setOpen(false)} className="text-lg text-white/50 hover:text-white tracking-wide">{t.nav.contact}</a>
          <div className="flex gap-3 pt-4">
            <button onClick={() => { setLang(lang === "en" ? "es" : "en"); setOpen(false); }} className="text-sm text-white/25 border border-white/[0.08] rounded-full px-5 py-2">
              {lang === "en" ? "Español" : "English"}
            </button>
            <a href="/start" onClick={() => setOpen(false)} className="cta-btn text-sm font-semibold px-6 py-2 rounded-full">{t.nav.cta}</a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── FOOTER ─── */
export function Footer({ t }: { t: typeof T.en }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const textColorClass = isHome ? "text-white" : "text-black";
  return (
    <footer className="relative border-t border-white/[0.03] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <div className="relative inline-block">
              <div
                style={{
                  height: "28px",
                  width: "160px",
                  background: "#ffffff",
                  WebkitMaskImage: "url(/stocks/PURRSOME-logo-oficial.svg)",
                  maskImage: "url(/stocks/PURRSOME-logo-oficial.svg)",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "left center",
                  maskPosition: "left center",
                }}
              />
            </div>
            <p className={`text-[10px] tracking-[0.15em] ${textColorClass}`}>{t.footer.tagline}</p>
          </div>
          <p className={`text-[11px] tracking-[0.15em] ${textColorClass}`}>{t.footer.copy}</p>
        </div>
      </div>
    </footer>
  );
}
