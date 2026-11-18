"use client";
import { useState } from "react";
import { T as SHARED_T } from "../components/shared";
import { FAQ } from "../components/FAQ";
import { MeshGradientBackground } from "../components/ui/hero-section-with-smooth-bg-shader";

type Lang = "en" | "es";

const T = {
  en: {
    back: "← Back",
    tag: "Start a Project",
    title: "What are you looking for?",
    sub: "Pick one and answer a few quick questions. Your answers land straight in our inbox.",
    options: [
      { href: "/encuesta-branding", title: "Branding", desc: "Logo, identity and a brand people remember.", cta: "Start the branding survey" },
      { href: "/encuesta-web", title: "Web Design", desc: "A site that looks great and brings you clients.", cta: "Start the web survey" },
      { href: "/encuesta-general", title: "Something else", desc: "Ads, SEO, content, apps or an idea we haven't named yet.", cta: "Tell us your idea" },
    ],
    note: "The surveys are in Spanish. Prefer English? Write us at info@purrsomecreate.com.",
  },
  es: {
    back: "← Volver",
    tag: "Iniciar Proyecto",
    title: "¿Qué estás buscando?",
    sub: "Elige una opción y responde unas preguntas rápidas. Tus respuestas llegan directo a nuestro correo.",
    options: [
      { href: "/encuesta-branding", title: "Branding", desc: "Logo, identidad y una marca que la gente recuerde.", cta: "Empezar encuesta de branding" },
      { href: "/encuesta-web", title: "Diseño Web", desc: "Una web que se ve increíble y te trae clientes.", cta: "Empezar encuesta de web" },
      { href: "/encuesta-general", title: "Otra cosa", desc: "Anuncios, SEO, contenido, apps o una idea que aún no tiene nombre.", cta: "Cuéntanos tu idea" },
    ],
    note: "",
  },
};

export default function StartProject() {
  const [lang, setLang] = useState<Lang>("es");
  const t = T[lang];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none z-0 bg-black overflow-hidden">
        <MeshGradientBackground
          colors={["#050507", "#DA1460", "#F5B400", "#050507", "#DA1460", "#ECECEC", "#F5B400", "#050507"]}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-sm text-white/45 hover:text-white/70 transition-colors">{t.back}</a>
          <div style={{ height: "24px", width: "120px", background: "#FFFFFF", WebkitMaskImage: "url(/stocks/PURRSOME-logo-oficial.svg)", maskImage: "url(/stocks/PURRSOME-logo-oficial.svg)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "left center", maskPosition: "left center" }} />
          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="text-[11px] text-white/40 hover:text-white/70 border border-white/10 rounded-full px-3 py-1 tracking-widest transition-all">
            {lang === "en" ? "ES" : "EN"}
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-10">
        <span style={{ fontFamily: "'articulat-safe', var(--font-sans), sans-serif" }} className="block text-[13px] tracking-[0.02em] uppercase text-amber-400 font-black">{t.tag}</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mt-6 mb-5 leading-[1.12] tracking-normal">{t.title}</h1>
        <p className="text-white/60 text-base font-medium">{t.sub}</p>
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
        <div className="grid gap-4">
          {t.options.map((o) => (
            <a key={o.href} href={o.href}
              className="group rounded-3xl px-7 py-7 md:px-9 md:py-8 flex items-center gap-6 bg-black/75 backdrop-blur-xl border border-white/10 hover:bg-black/90 hover:border-amber-400/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.12)] transition-all duration-500">
              <span aria-hidden className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12" style={{ background: "#FFFFFF", WebkitMaskImage: "url(/stocks/purrsome-isotipo.png)", maskImage: "url(/stocks/purrsome-isotipo.png)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
              <span className="flex-1">
                <span style={{ fontFamily: "'articulat-safe', var(--font-sans), sans-serif" }} className="block text-2xl md:text-3xl font-black text-white tracking-normal">{o.title}</span>
                <span className="block text-white/60 text-sm md:text-base font-medium mt-2">{o.desc}</span>
                <span style={{ fontFamily: "'articulat-safe', var(--font-sans), sans-serif" }} className="block text-amber-400 text-[13px] tracking-[0.02em] uppercase font-black mt-5">{o.cta}</span>
              </span>
              <span className="text-2xl text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">→</span>
            </a>
          ))}
        </div>
        {t.note && <p className="text-white/25 text-xs mt-6">{t.note}</p>}
      </main>

      <FAQ t={SHARED_T[lang]} />
    </div>
  );
}
