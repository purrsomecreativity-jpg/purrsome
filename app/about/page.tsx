"use client";
import { useState } from "react";
import { T, Nav, Footer, useReveal, useLang } from "../components/shared";
import { EvervaultCard } from "../components/ui/evervault-card";
import { SocialLinks } from "../components/ui/social-links";

function About({ t }: { t: typeof T.en }) {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="relative z-10 pt-28 md:pt-40 pb-20 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className={`max-w-4xl mb-12 md:mb-20 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[11px] tracking-[0.3em] uppercase text-teal-400/80 font-medium">{t.about.tag}</span>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-white mt-4 mb-0 leading-[1.06] tracking-tight">{t.about.title}</h2>
        </div>

        {/* Story — 3 columns */}
        <div className={`grid md:grid-cols-3 gap-5 md:gap-8 mb-12 md:mb-20 transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-white/35 text-base leading-[1.85]">{t.about.p1}</p>
          <p className="text-white/35 text-base leading-[1.85]">{t.about.p2}</p>
          <p className="text-white/35 text-base leading-[1.85]">{t.about.p3}</p>
        </div>

        {/* Mission */}
        <div className={`border-l-2 border-amber-500/40 pl-6 md:pl-8 mb-12 md:mb-20 transition-all duration-700 delay-150 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-white/70 text-lg md:text-2xl leading-[1.6] font-medium max-w-3xl">{t.about.mission}</p>
        </div>

        {/* Why the cat */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[11px] tracking-[0.3em] uppercase text-pink-400/70 font-medium block mb-4">{t.about.catTitle}</span>
              <p className="text-white/35 text-base leading-[1.85]">{t.about.catWhy}</p>
            </div>
            <div className="flex justify-center md:justify-end">
              <img src="/stocks/purrsome-isotipo.png" alt="Purrsome" className="w-32 sm:w-48 lg:w-64 opacity-[0.08] object-contain" />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 md:mb-20 transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {t.about.values.map((v, i) => {
            const valAccents: [string, string][] = [
              ["#f59e0b", "#ef4444"],
              ["#14b8a6", "#3b82f6"],
              ["#9333ea", "#ec4899"],
              ["#f97316", "#f59e0b"],
            ];
            return (
            <div key={i} className="group relative border border-white/[0.05] rounded-xl p-4 sm:p-6 hover:border-amber-500/15 transition-all duration-500 bg-white/[0.01] hover:bg-white/[0.02] overflow-hidden">
              <EvervaultCard accentFrom={valAccents[i][0]} accentTo={valAccents[i][1]} />
              <h4 className="relative z-10 text-lg font-bold text-white/75 mb-1.5 group-hover:iri-text transition-all duration-500">{v.title}</h4>
              <p className="relative z-10 text-[13px] text-white/20">{v.desc}</p>
            </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pt-12 md:pt-16 border-t border-white/[0.04] transition-all duration-700 delay-400 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {t.stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl md:text-5xl font-extrabold iri-text">{s.num}</div>
              <div className="text-sm text-white/20 mt-1.5 tracking-wide">{s.label}</div>
            </div>
          ))}
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
    <section id="contact" ref={ref} className="relative z-10 py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[11px] tracking-[0.3em] uppercase text-teal-600 font-medium">{t.contact.tag}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#050507] mt-4 mb-6 leading-[1.08] tracking-tight">{t.contact.title}</h2>
          <p className="text-[#050507]/55">{t.contact.sub}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <form onSubmit={submit} className={`lg:col-span-3 space-y-4 transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" required placeholder={t.contact.form.name} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="frm-input frm-input-dark" />
              <input type="email" required placeholder={t.contact.form.email} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="frm-input frm-input-dark" />
            </div>
            <input type="text" placeholder={t.contact.form.biz} value={form.biz} onChange={e => setForm({ ...form, biz: e.target.value })} className="frm-input frm-input-dark" />
            <textarea rows={5} placeholder={t.contact.form.msg} value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} className="frm-input frm-input-dark resize-none" />
            <button type="submit" disabled={loading} className="w-full cta-btn font-semibold py-4 rounded-xl text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "..." : sent ? t.contact.form.sent : error ? "Error — intenta de nuevo" : t.contact.form.send}
            </button>
          </form>

          <div className={`lg:col-span-2 space-y-4 lg:pt-2 transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {[
              { label: "Email", value: t.contact.info.email, href: `mailto:${t.contact.info.email}` },
              { label: "Phone", value: t.contact.info.phone, href: `tel:${t.contact.info.phone}` },
              { label: "Location", value: t.contact.info.loc, href: undefined }
            ].map((item, i) => (
              <div key={i} className="liquid-bar">
                <div className="relative z-10 text-[10px] tracking-[0.3em] uppercase text-[#050507]/40 mb-1.5 font-medium">{item.label}</div>
                {item.href
                  ? <a href={item.href} className="relative z-10 text-[#050507]/75 text-sm font-medium">{item.value}</a>
                  : <p className="relative z-10 text-[#050507]/75 text-sm font-medium">{item.value}</p>}
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
                  href: "https://www.linkedin.com/company/purrsomecreative",
                },
              ]}
            />
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img src="/stocks/gradient-1.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <Nav lang={lang} setLang={setLang} t={t} />
      <About t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </main>
  );
}
