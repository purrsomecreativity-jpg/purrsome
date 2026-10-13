"use client";
import { useState } from "react";
import { T, Nav, Footer, useLang } from "../components/shared";

const NEON = "#DA1460";

const COPY = {
  en: {
    tag: "Free tool",
    title: "Does your website pass the test?",
    sub: "Drop your URL and in ~30 seconds we'll grade how fast it loads and how healthy its SEO is. The full report lands in your inbox.",
    url: "yourbusiness.com",
    name: "Your name",
    email: "Your email",
    btn: "Check my site",
    loading: "Analyzing your site... (~30 sec)",
    vel: "Speed",
    seo: "SEO",
    lcp: "First content visible in",
    peso: "Page weight",
    probs: "What's holding it back",
    sent: "Full report sent to your inbox.",
    pitch: "Our sites score 100/100 on SEO and weigh up to 97% less. Want yours there?",
    cta: "Start a project",
    again: "Check another site",
    s: "s", mb: "MB",
  },
  es: {
    tag: "Herramienta gratis",
    title: "¿Tu web pasa la prueba?",
    sub: "Pon tu URL y en ~30 segundos te damos la nota de velocidad y SEO de tu sitio. El informe completo llega a tu correo.",
    url: "tunegocio.com",
    name: "Tu nombre",
    email: "Tu correo",
    btn: "Revisar mi sitio",
    loading: "Analizando tu sitio... (~30 seg)",
    vel: "Velocidad",
    seo: "SEO",
    lcp: "Primer contenido visible en",
    peso: "Peso de la página",
    probs: "Lo que lo está frenando",
    sent: "El informe completo llegó a tu correo.",
    pitch: "Nuestros sitios salen 100/100 en SEO y pesan hasta 97% menos. ¿Quieres el tuyo ahí?",
    cta: "Iniciar proyecto",
    again: "Revisar otro sitio",
    s: "s", mb: "MB",
  },
};

type Resultado = { perf: number; seo: number; lcp: number | null; pesoMb: number | null; problemas: string[] };

const scoreColor = (n: number) => (n >= 90 ? "#3FBF7F" : n >= 50 ? "#F5B400" : NEON);

export default function RevisorPage() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  const c = COPY[lang];

  const [form, setForm] = useState({ url: "", nombre: "", email: "" });
  const [estado, setEstado] = useState<"idle" | "cargando" | "listo" | "error">("idle");
  const [error, setError] = useState("");
  const [res, setRes] = useState<Resultado | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("cargando");
    setError("");
    try {
      const r = await fetch("/api/revisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Error");
      setRes(data);
      setEstado("listo");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
      setEstado("error");
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white" style={{ background: "linear-gradient(165deg, #FFFFFF 0%, #FAEFF4 38%, #F2C8DB 72%, #E487AF 100%)" }}>
      <Nav lang={lang} setLang={setLang} t={t} />

      <section className="relative z-10 px-4 pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em]" style={{ color: NEON }}>{c.tag}</span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-tight text-[#140309] md:text-5xl">{c.title}</h1>
            <p className="mx-auto mt-5 max-w-lg text-[#140309]/60">{c.sub}</p>
          </div>

          <div
            className="rounded-3xl border border-white/[0.12] p-6 sm:p-10"
            style={{
              background: "linear-gradient(145deg, rgba(14,14,18,0.9) 0%, rgba(10,10,14,0.85) 100%)",
              backdropFilter: "blur(24px) saturate(1.5)",
              WebkitBackdropFilter: "blur(24px) saturate(1.5)",
              boxShadow: "0 30px 70px rgba(20,3,9,0.35), inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
          >
            {estado !== "listo" && (
              <form onSubmit={submit} className="space-y-4">
                <input type="text" required placeholder={c.url} value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="frm-input-liquid w-full rounded-xl px-5 py-4 text-sm" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input type="text" placeholder={c.name} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="frm-input-liquid w-full rounded-xl px-5 py-4 text-sm" />
                  <input type="email" required placeholder={c.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="frm-input-liquid w-full rounded-xl px-5 py-4 text-sm" />
                </div>
                <button type="submit" disabled={estado === "cargando"} className="w-full rounded-xl bg-[#DA1460] py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(218,20,96,0.35)] disabled:opacity-70">
                  {estado === "cargando" ? c.loading : c.btn}
                </button>
                {estado === "error" && <p className="text-center text-sm text-[#F5B400]">{error}</p>}
              </form>
            )}

            {estado === "listo" && res && (
              <div>
                <div className="grid grid-cols-2 gap-4">
                  {[{ label: c.vel, n: res.perf }, { label: c.seo, n: res.seo }].map((x) => (
                    <div key={x.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                      <div className="text-5xl font-extrabold" style={{ color: scoreColor(x.n) }}>{x.n}</div>
                      <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/45">{x.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-1 text-sm text-white/60">
                  {res.lcp != null && <p>{c.lcp}: <b className="text-white/90">{res.lcp}{c.s}</b></p>}
                  {res.pesoMb != null && <p>{c.peso}: <b className="text-white/90">{res.pesoMb} {c.mb}</b></p>}
                </div>
                {res.problemas.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#F5B400" }}>{c.probs}</p>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-white/60">
                      {res.problemas.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                )}
                <p className="mt-6 text-sm text-white/50">{c.sent}</p>
                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-white/85">{c.pitch}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href="/start" className="rounded-full bg-[#DA1460] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(218,20,96,0.35)]">{c.cta} →</a>
                    <button type="button" onClick={() => { setEstado("idle"); setRes(null); setForm({ url: "", nombre: "", email: "" }); }} className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/70 transition-colors hover:text-white">{c.again}</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="relative bg-[#050507]">
        <Footer t={t} />
      </div>
    </main>
  );
}
