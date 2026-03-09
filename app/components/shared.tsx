"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* ─── TRANSLATIONS ─── */
export const T = {
  en: {
    nav: { work: "Work", services: "Services", pricing: "Pricing", about: "About", contact: "Contact", cta: "Let's Talk" },
    hero: {
      tagline: "We see what others don't.",
      h1: ["Built to be seen.", "Designed to convert."],
      sub: "Branding, web design, campaigns, SEO & ads. Everything a business needs to stop being invisible.",
      cta1: "Pricing",
      cta2: "Start a Project"
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
        { num: "04", title: "Brand Identity", desc: "Logo, color palette, typography, and brand guidelines that capture who you are and make you unforgettable.", icon: "❋" }
      ]
    },
    work: {
      tag: "Selected Work",
      title: "Our Projects Gallery.",
      items: [
        { title: "Bella Cucina", cat: "Restaurant · Web Design", year: "2026", accent: "#F59E0B", desc: "Modern restaurant site with online reservations, menu showcase, and local SEO setup that increased foot traffic by 40%." },
        { title: "ProFix Plumbing", cat: "Contractor · Web + SEO", year: "2026", accent: "#14B8A6", desc: "Full website redesign and Google Business optimization for a local plumbing company. Went from invisible to page 1 in 3 months." },
        { title: "Luma Skin Studio", cat: "Medspa · Branding + Web", year: "2026", accent: "#EC4899", desc: "Complete brand identity and bilingual website for a boutique skin studio targeting clients in South Florida." },
        { title: "Verdant Market", cat: "Retail · Full Package", year: "2026", accent: "#9333EA", desc: "Branding, website, and Instagram ad campaign for an organic grocery store. New identity drove 3× more weekend visits." },
      ],
      cta: "View All Projects →"
    },
    pricing: {
      tag: "Pricing",
      title: "Simple, transparent pricing.",
      sub: "No surprises. Pick the package that fits your goals — or let's build something custom.",
      popular: "Most Popular",
      plans: [
        { price: "$1,500", name: "Website Refresh", desc: "Great for businesses with an existing site that needs a modern, professional update.", features: ["Design overhaul", "Mobile optimization", "Speed improvements", "Basic SEO setup", "1 round of revisions"], cta: "Get Started", highlight: false },
        { price: "$3,000+", name: "Online Presence Starter", desc: "Everything you need to get found online and turn visitors into paying customers.", features: ["Custom website up to 6 pages", "Local SEO setup", "Google Business optimization", "Analytics + contact form", "2 rounds of revisions"], cta: "Get Started", highlight: true },
        { price: "$5,000+", name: "Full Branding + Website", desc: "A complete brand identity and website built to make you impossible to forget.", features: ["Logo + full brand identity", "Custom website up to 10 pages", "Full SEO strategy", "Brand guidelines", "30-day post-launch support"], cta: "Get Started", highlight: false },
        { price: "Custom", name: "Custom Package", desc: "Unique needs? Let's build a package tailored exactly to your business and budget.", features: ["Flexible scope", "Mix any services", "Dedicated strategy session", "Priority support", "Custom timeline"], cta: "Let's Talk", highlight: false },
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
      { num: "50+", label: "Projects" },
      { num: "3×", label: "Avg. Traffic Boost" },
      { num: "98%", label: "Satisfaction" },
      { num: "7d", label: "Avg. Delivery" }
    ],
    contact: {
      tag: "Contact",
      title: "Let's create something remarkable.",
      sub: "Book a free 30-minute consultation. No pressure — just a conversation about where you want to go.",
      form: { name: "Name", email: "Email", biz: "Business", msg: "Tell us about your vision...", send: "Send Message", sent: "Message Sent ✓" },
      info: { email: "purrsome@purrsomecrete.com", phone: "+1 (407) 693-8364", loc: "Remote · Worldwide" }
    },
    footer: { copy: "© 2026 Purrsome™", tagline: "We see what others don't." }
  },
  es: {
    nav: { work: "Trabajo", services: "Servicios", pricing: "Precios", about: "Nosotros", contact: "Contacto", cta: "Hablemos" },
    hero: {
      tagline: "Vemos lo que otros no.",
      h1: ["Hecho para ser visto.", "Diseñado para convertir."],
      sub: "Branding, diseño web, campañas, SEO y anuncios. Todo lo que un negocio necesita para dejar de ser invisible.",
      cta1: "Precios",
      cta2: "Iniciar Proyecto"
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
        { num: "04", title: "Identidad de Marca", desc: "Logo, paleta de color, tipografía y guías de marca que capturan quién eres y te hacen inolvidable.", icon: "❋" }
      ]
    },
    work: {
      tag: "Proyectos",
      title: "Our Projects Gallery.",
      items: [
        { title: "Bella Cucina", cat: "Restaurante · Diseño Web", year: "2026", accent: "#F59E0B", desc: "Sitio de restaurante moderno con reservaciones en línea, menú y SEO local que aumentó las visitas un 40%." },
        { title: "ProFix Plumbing", cat: "Contratista · Web + SEO", year: "2026", accent: "#14B8A6", desc: "Rediseño web completo y optimización de Google Business. De invisible a página 1 en 3 meses." },
        { title: "Luma Skin Studio", cat: "Medspa · Branding + Web", year: "2026", accent: "#EC4899", desc: "Identidad de marca completa y sitio bilingüe para un estudio boutique en el sur de Florida." },
        { title: "Verdant Market", cat: "Retail · Paquete Completo", year: "2026", accent: "#9333EA", desc: "Branding, web y campaña de Instagram para tienda orgánica. Nueva identidad que triplicó las visitas de fin de semana." },
      ],
      cta: "Ver Todos →"
    },
    pricing: {
      tag: "Precios",
      title: "Precios claros, sin sorpresas.",
      sub: "Elige el paquete que se adapta a tus metas — o construimos algo completamente a tu medida.",
      popular: "Más Popular",
      plans: [
        { price: "$1,500", name: "Website Refresh", desc: "Ideal para negocios con sitio existente que necesita una actualización moderna y profesional.", features: ["Rediseño completo", "Optimización móvil", "Mejoras de velocidad", "SEO básico", "1 ronda de revisiones"], cta: "Empezar", highlight: false },
        { price: "$3,000+", name: "Online Presence Starter", desc: "Todo lo que necesitas para que te encuentren online y convertir visitas en clientes.", features: ["Sitio web hasta 6 páginas", "SEO local", "Optimización Google Business", "Analytics + formulario de contacto", "2 rondas de revisiones"], cta: "Empezar", highlight: true },
        { price: "$5,000+", name: "Branding Completo + Web", desc: "Identidad de marca completa y sitio web diseñados para hacerte inolvidable.", features: ["Logo + identidad de marca", "Sitio web hasta 10 páginas", "Estrategia SEO completa", "Guías de marca", "Soporte 30 días post-lanzamiento"], cta: "Empezar", highlight: false },
        { price: "Custom", name: "Paquete Personalizado", desc: "Necesidades únicas? Construimos un paquete hecho exactamente para tu negocio y presupuesto.", features: ["Alcance flexible", "Combina cualquier servicio", "Sesión de estrategia dedicada", "Soporte prioritario", "Timeline personalizado"], cta: "Hablemos", highlight: false },
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
      { num: "50+", label: "Proyectos" },
      { num: "3×", label: "Más Tráfico" },
      { num: "98%", label: "Satisfacción" },
      { num: "7d", label: "Entrega Promedio" }
    ],
    contact: {
      tag: "Contacto",
      title: "Creemos algo extraordinario.",
      sub: "Agenda una consulta gratuita de 30 minutos. Sin presión — solo una conversación sobre tus metas.",
      form: { name: "Nombre", email: "Email", biz: "Negocio", msg: "Cuéntanos sobre tu visión...", send: "Enviar Mensaje", sent: "Enviado ✓" },
      info: { email: "purrsome@purrsomecrete.com", phone: "+1 (407) 693-8364", loc: "Remoto · Mundial" }
    },
    footer: { copy: "© 2026 Purrsome™", tagline: "Vemos lo que otros no." }
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
        {/* Left — home icon + nav links */}
        <div className="hidden md:flex items-center gap-0">
          <a
            href="/"
            className={`transition-all duration-300 ${
              isActive("/") ? "text-white" : "text-white/35 hover:text-white"
            }`}
            aria-label="Home"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </a>
          {(["services", "pricing", "about"] as const).map(k => (
            <a
              key={k}
              href={`/${k}`}
              className={`text-[12px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isActive(`/${k}`)
                  ? "text-white bg-white/[0.13] backdrop-blur-md border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.2)]"
                  : "text-white/40 border-transparent hover:text-[#050507] hover:bg-white hover:border-white/0"
              }`}
            >
              {t.nav[k]}
            </a>
          ))}
        </div>

        {/* Center — logo */}
        <a href="/" className="col-start-2 flex justify-center group">
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

        {/* Right — lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-1 justify-end">
          <a href="/about#contact" className="text-[12px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 rounded-full border border-transparent text-white/40 hover:text-[#050507] hover:bg-white hover:border-white/0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">{t.nav.contact}</a>
          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="text-[11px] tracking-[0.2em] font-medium px-3 py-1.5 rounded-full border border-transparent text-white/40 hover:text-[#050507] hover:bg-white hover:border-white/0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            {lang === "en" ? "ES" : "EN"}
          </button>
          <a href="/start" className="text-[12px] tracking-[0.12em] uppercase font-semibold px-4 py-1.5 rounded-full border text-white bg-white/[0.13] backdrop-blur-md border-white/25 hover:bg-white hover:text-[#050507] hover:border-white/0 hover:shadow-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">{t.nav.cta}</a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white/50 hover:text-white col-start-1 justify-self-start">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="14" y2="17" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#050507]/95 backdrop-blur-2xl border-t border-white/[0.04] px-6 py-10 flex flex-col gap-6 animate-fadeSlide">
          {(["services", "pricing", "about"] as const).map(k => (
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
            <p className="text-[10px] text-white/10 tracking-[0.15em]">{t.footer.tagline}</p>
          </div>
          <p className="text-[11px] text-white/10 tracking-[0.15em]">{t.footer.copy}</p>
        </div>
      </div>
    </footer>
  );
}
