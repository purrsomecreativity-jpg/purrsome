"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { T, Nav, Footer, useReveal, useLang } from "../components/shared";
import { EvervaultCard } from "../components/ui/evervault-card";
import { SocialLinks } from "../components/ui/social-links";
import { MeshGradientBackground } from "../components/ui/hero-section-with-smooth-bg-shader";

gsap.registerPlugin(ScrollTrigger);


const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function StoryParallax({ t, lang }: { t: typeof T.en; lang: "en" | "es" }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ap-word").forEach((w, i) => {
        gsap.fromTo(w, { yPercent: 120 }, { yPercent: 0, duration: 0.8, ease: "power3.out", delay: 0.1 + i * 0.035 });
      });
      gsap.to(".ap-hero", {
        yPercent: -14,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: ".ap-hero", start: "top top", end: "bottom top", scrub: true },
      });

      // Ruleta de cartas: una a la vez
      const cards = gsap.utils.toArray<HTMLElement>(".ap-card");
      if (cards.length > 1) {
        const tilts = [-2, 2, -1.5, 1.5];
        cards.forEach((card, i) => {
          gsap.set(card, i === 0 ? { yPercent: 0, rotation: tilts[0], autoAlpha: 1 } : { yPercent: 130, rotation: 12, autoAlpha: 0 });
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".ap-deck",
            start: "top top",
            end: () => `+=${(cards.length - 1) * window.innerHeight}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          tl.to(card, { yPercent: -130, rotation: -12, autoAlpha: 0, ease: "power1.in", duration: 1 }, i);
          tl.fromTo(
            cards[i + 1],
            { yPercent: 130, rotation: 12, autoAlpha: 0 },
            { yPercent: 0, rotation: tilts[(i + 1) % tilts.length], autoAlpha: 1, ease: "power1.out", duration: 1 },
            i + 0.15
          );
        });
      }
    }, root);
    return () => ctx.revert();
  }, [lang]);

  const cards = [
    { num: "01", head: lang === "es" ? "El origen" : "The origin", body: t.about.p1, accent: "#DA1460" },
    { num: "02", head: lang === "es" ? "La idea" : "The idea", body: t.about.p2, accent: "#F5B400" },
    { num: "03", head: lang === "es" ? "Para qui\u00e9n" : "Who it\u2019s for", body: t.about.p3, accent: "#DA1460" },
    { num: "04", head: lang === "es" ? "La misi\u00f3n" : "The mission", body: t.about.mission, accent: "#F5B400" },
  ];

  return (
    <div ref={rootRef}>
      {/* Hero */}
      <div className="ap-hero mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-12">
        <span className="text-[11px] tracking-[0.3em] uppercase font-medium" style={{ color: "#F5B400" }}>{t.about.tag}</span>
        <h1 className="mt-5 max-w-5xl text-3xl font-extrabold leading-[1.06] tracking-tight text-white md:text-5xl lg:text-7xl">
          {t.about.title.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-top">
              <span className="ap-word inline-block">{w}&nbsp;</span>
            </span>
          ))}
        </h1>
        <div className="mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
          <span>{lang === "es" ? "Baja para conocernos" : "Scroll to meet us"}</span>
          <svg className="h-4 w-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Ruleta de cartas */}
      <div className="ap-deck relative flex h-screen items-center justify-center overflow-hidden px-4">
        {cards.map((c) => (
          <div
            key={c.num}
            className="ap-card absolute w-full max-w-2xl rounded-2xl border border-white/40 p-8 md:p-12 will-change-transform"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,246,236,0.94) 0%, rgba(250,240,226,0.88) 55%, rgba(244,231,212,0.92) 100%)",
              backdropFilter: "blur(22px) saturate(1.6)",
              WebkitBackdropFilter: "blur(22px) saturate(1.6)",
              boxShadow:
                "0 30px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.75), inset 0 -1px 0 rgba(120,90,60,0.12)",
            }}
          >
            <span className="font-mono text-xs tracking-[0.3em]" style={{ color: c.accent }}>{c.num}</span>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-[#1A1208] md:text-4xl">{c.head}</h3>
            <p className="mt-5 text-base leading-[1.8] text-[#1A1208]/70 md:text-lg">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function About({ t, lang }: { t: typeof T.en; lang: "en" | "es" }) {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="relative z-10 pt-20 md:pt-24 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        <StoryParallax t={t} lang={lang} />

        {/* Why the cat */}
        <div className={`relative left-1/2 w-screen -translate-x-1/2 bg-[#070709] py-16 md:py-24 transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="block mb-5 text-2xl md:text-4xl font-bold tracking-tight" style={{ color: "#DA1460", fontFamily: "var(--font-syne), sans-serif" }}>{t.about.catTitle}</span>
                <p className="text-white/45 text-base md:text-lg leading-[1.85]">{t.about.catWhy}</p>
              </div>
              <div className="flex justify-center">
                <img src="/stocks/purrsome-isotipo.png" alt="Purrsome" className="w-32 sm:w-48 lg:w-64 object-contain" />
              </div>
            </div>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 md:mt-14 transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {t.about.values.map((v, i) => {
              const valAccents: [string, string][] = [
                ["#f59e0b", "#ef4444"],
                ["#14b8a6", "#3b82f6"],
                ["#9333ea", "#ec4899"],
                ["#f97316", "#f59e0b"],
              ];
              return (
              <div key={i} className="group relative border border-white/60 rounded-xl p-4 sm:p-6 transition-all duration-500 bg-white hover:bg-[#F7F3EC] overflow-hidden">
                <EvervaultCard accentFrom={valAccents[i][0]} accentTo={valAccents[i][1]} />
                <h4 className="relative z-10 text-lg font-bold text-[#0A0A0C] mb-1.5">{v.title}</h4>
                <p className="relative z-10 text-[13px] text-[#0A0A0C]/55">{v.desc}</p>
              </div>
              );
            })}
          </div>
          </div>
        </div>

      </div>
    </section>
  );
}

const FORMSPREE_ID = "YOUR_FORM_ID"; // ← reemplaza con tu ID de Formspree

function Contact({ t }: { t: typeof T.en }) {
  const [ref, vis] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", biz: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business: form.biz,
          message: form.msg,
        }),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", biz: "", msg: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative z-10 pt-12 md:pt-16 pb-20 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div
          className="mx-auto max-w-6xl rounded-3xl border border-white/15 p-6 sm:p-10 md:p-14"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(26px) saturate(1.5)",
            WebkitBackdropFilter: "blur(26px) saturate(1.5)",
            boxShadow: "0 30px 70px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.22)",
          }}
        >
        <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[11px] tracking-[0.3em] uppercase font-medium" style={{ color: "#F5B400" }}>{t.contact.tag}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-6 leading-[1.08] tracking-tight">{t.contact.title}</h2>
          <p className="text-white/50">{t.contact.sub}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <form onSubmit={submit} className={`lg:col-span-3 space-y-4 transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" required placeholder={t.contact.form.name} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="frm-input frm-input-liquid" />
              <input type="email" required placeholder={t.contact.form.email} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="frm-input frm-input-liquid" />
            </div>
            <input type="text" placeholder={t.contact.form.biz} value={form.biz} onChange={e => setForm({ ...form, biz: e.target.value })} className="frm-input frm-input-liquid" />
            <textarea rows={5} placeholder={t.contact.form.msg} value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} className="frm-input frm-input-liquid resize-none" />
            <button type="submit" disabled={loading} className="w-full cta-btn font-semibold py-4 rounded-xl text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "..." : sent ? t.contact.form.sent : error ? "Error, intenta de nuevo" : t.contact.form.send}
            </button>
          </form>

          <div className={`lg:col-span-2 space-y-4 lg:pt-2 transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {[
              { label: "Email", value: t.contact.info.email, href: `mailto:${t.contact.info.email}` },
              { label: "WhatsApp", value: t.contact.info.phone, href: `https://wa.me/${t.contact.info.phone.replace(/[^0-9]/g, "")}` },
              { label: "Location", value: t.contact.info.loc, href: undefined }
            ].map((item, i) => (
              <div key={i} className="liquid-bar-dark">
                <div className="relative z-10 text-[10px] tracking-[0.3em] uppercase text-white/40 mb-1.5 font-medium">{item.label}</div>
                {item.href
                  ? <a href={item.href} className="relative z-10 text-white/80 text-sm font-medium">{item.value}</a>
                  : <p className="relative z-10 text-white/80 text-sm font-medium">{item.value}</p>}
              </div>
            ))}
            <SocialLinks
              className="-ml-5 pt-2"
              socials={[
                {
                  name: "Instagram",
                  image: "/stocks/Instagram_logo_2022.svg-2.png",
                  href: "https://www.instagram.com/purrrrsome/?utm_source=ig_web_button_share_sheet",
                },
                {
                  name: "LinkedIn",
                  image: "/stocks/LinkedIn_logo_initials.png",
                  href: "https://www.linkedin.com/in/andrea-villafa%C3%B1e-260263404",
                },
              ]}
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  return (
    <main className="relative text-white overflow-x-hidden min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0">
          <MeshGradientBackground
            colors={["#050507", "#DA1460", "#F5B400", "#050507", "#DA1460", "#ECECEC", "#F5B400", "#050507"]}
          />
        </div>
        <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      </div>
      <Nav lang={lang} setLang={setLang} t={t} />
      <About t={t} lang={lang} />
      <Contact t={t} />
      <Footer t={t} />
    </main>
  );
}
