"use client";
import { useState } from "react";
import { BLOQUES, META, TOTAL, type Opcion } from "./preguntas";

/* ─── COMPONENTES (mismo lenguaje visual que /start) ─── */
function Select({ texto, nota, opciones, value, onChange }: {
  texto: string; nota?: string; opciones: Opcion[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="mb-8">
      <label className="block text-white/80 font-semibold text-base mb-1.5">{texto}</label>
      {nota && <p className="text-white/25 text-sm mb-4">{nota}</p>}
      <div className="grid gap-2.5">
        {opciones.map((o) => (
          <button key={o.value} type="button" onClick={() => onChange(o.value)}
            className={`text-left px-5 py-4 rounded-xl liquid-glass-btn text-sm flex items-center gap-3 ${
              value === o.value
                ? "!border-amber-500/40 !bg-white/[0.10] text-white shadow-[0_0_24px_rgba(245,158,11,0.08)]"
                : "text-white/50"
            }`}>
            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${value === o.value ? "border-amber-500 bg-amber-500/40" : "border-white/15"}`} />
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Multi({ texto, nota, opciones, values, onChange }: {
  texto: string; nota?: string; opciones: Opcion[]; values: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (v: string) => onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
  return (
    <div className="mb-8">
      <label className="block text-white/80 font-semibold text-base mb-1.5">{texto}</label>
      <p className="text-white/25 text-sm mb-4">{nota ?? "Marca todas las que apliquen"}</p>
      <div className="grid gap-2.5">
        {opciones.map((o) => {
          const sel = values.includes(o.value);
          return (
            <button key={o.value} type="button" onClick={() => toggle(o.value)}
              className={`text-left px-5 py-4 rounded-xl liquid-glass-btn text-sm flex items-center gap-3 ${
                sel ? "!border-amber-500/40 !bg-white/[0.10] text-white shadow-[0_0_24px_rgba(245,158,11,0.08)]" : "text-white/50"
              }`}>
              <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${sel ? "border-amber-500 bg-amber-500/20" : "border-white/15"}`}>
                {sel && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Texto({ texto, nota, placeholder, value, onChange, multiline = false, type = "text" }: {
  texto: string; nota?: string; placeholder?: string; value: string;
  onChange: (v: string) => void; multiline?: boolean; type?: string;
}) {
  const cls = "w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-amber-500/25 focus:bg-white/[0.03] focus:shadow-[0_0_25px_rgba(245,158,11,0.04)] transition-all duration-300";
  return (
    <div className="mb-8">
      <label className="block text-white/80 font-semibold text-base mb-1.5">{texto}</label>
      {nota && <p className="text-white/25 text-sm mb-3">{nota}</p>}
      {!nota && <div className="mb-3" />}
      {multiline
        ? <textarea rows={4} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={`${cls} resize-none`} />
        : <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />}
    </div>
  );
}

/* ─── PÁGINA ─── */
export default function Cuestionario() {
  const [r, setR] = useState<Record<string, string>>({});
  const [m, setM] = useState<Record<string, string[]>>({});
  const [contacto, setContacto] = useState({ empresa: "", nombre: "", email: "", whatsapp: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const set = (id: string, v: string) => setR((p) => ({ ...p, [id]: v }));
  const setMulti = (id: string, v: string[]) => setM((p) => ({ ...p, [id]: v }));

  const respondidas =
    Object.values(r).filter((v) => v.trim()).length +
    Object.values(m).filter((v) => v.length).length;
  const progreso = Math.min(100, Math.round((respondidas / TOTAL) * 100));
  const listo = contacto.nombre.trim() && contacto.email.trim() && contacto.empresa.trim();

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError("");
    try {
      const res = await fetch("/api/cuestionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cuestionario: META.slug, contacto, respuestas: r, multiples: m }),
      });
      if (res.ok) {
        setEnviado(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const j = await res.json().catch(() => ({}));
        setError(j.error ?? "Algo salió mal. Intenta de nuevo o escríbenos por WhatsApp.");
      }
    } catch {
      setError("Error de red. Revisa tu conexión e intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <img src="/stocks/cat2.jpg" alt="" className="w-40 h-40 object-cover rounded-2xl mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{META.gracias.titulo}</h1>
          <p className="text-white/40 mb-10 leading-relaxed">{META.gracias.sub}</p>
          <a href="/" className="text-sm text-amber-400/80 hover:text-amber-400 transition-colors">← Volver a Purrsome</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] -top-32 -right-32 animate-drift" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[100px] bottom-0 -left-32 animate-drift" style={{ animationDelay: "3s" }} />
      </div>

      <nav className="sticky top-0 z-50 bg-[#050507]/80 backdrop-blur-xl border-b border-white/[0.03]">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-sm text-white/30 hover:text-white/60 transition-colors">← Purrsome</a>
          <div style={{ height: "24px", width: "120px", background: "#fff", WebkitMaskImage: "url(/stocks/PURRSOME-logo-oficial.svg)", maskImage: "url(/stocks/PURRSOME-logo-oficial.svg)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
          <span className="text-[11px] text-white/20 tracking-widest">ES</span>
        </div>
      </nav>

      <div className="sticky top-16 z-40 bg-[#050507]/60 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-4">
          <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${progreso}%`, background: "linear-gradient(90deg, #F59E0B, #DC4A0A, #9333EA, #14B8A6)", backgroundSize: "200% 100%", animation: "iri 4s ease-in-out infinite" }} />
          </div>
          <span className="text-[11px] text-white/20 tracking-widest tabular-nums">{progreso}%</span>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-10">
        <span className="text-[11px] tracking-[0.3em] uppercase text-amber-400/70 font-medium">{META.tag}</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4 leading-[1.08] tracking-tight">{META.titulo}</h1>
        <p className="text-white/30 text-base">{META.sub}</p>
      </div>

      <form onSubmit={enviar} className="relative z-10 max-w-3xl mx-auto px-6 pb-32">
        {/* Datos de contacto primero: si abandona a mitad, igual sabemos quién es */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] tracking-[0.25em] uppercase text-white/15 font-medium">00</span>
            <span className="text-[13px] tracking-[0.15em] uppercase text-white/30 font-semibold">Tus datos</span>
            <div className="flex-1 h-px bg-white/[0.04]" />
          </div>
          <div className="grid sm:grid-cols-2 gap-x-5">
            <Texto texto="Empresa" placeholder="Nombre de la empresa" value={contacto.empresa} onChange={(v) => setContacto({ ...contacto, empresa: v })} />
            <Texto texto="Tu nombre" placeholder="Quién completa esto" value={contacto.nombre} onChange={(v) => setContacto({ ...contacto, nombre: v })} />
            <Texto texto="Correo" type="email" placeholder="tu@empresa.com" value={contacto.email} onChange={(v) => setContacto({ ...contacto, email: v })} />
            <Texto texto="WhatsApp" placeholder="+58 …" value={contacto.whatsapp} onChange={(v) => setContacto({ ...contacto, whatsapp: v })} />
          </div>
        </div>

        {BLOQUES.map((b, i) => (
          <div key={b.letra} className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-[11px] tracking-[0.25em] uppercase text-white/15 font-medium">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[13px] tracking-[0.15em] uppercase text-white/30 font-semibold">{b.titulo}</span>
              <div className="flex-1 h-px bg-white/[0.04]" />
            </div>
            {b.intro && <p className="text-white/25 text-sm mb-8 leading-relaxed">{b.intro}</p>}
            {!b.intro && <div className="mb-8" />}
            {b.preguntas.map((q) => {
              if (q.tipo === "select") return <Select key={q.id} texto={q.texto} nota={q.nota} opciones={q.opciones!} value={r[q.id] ?? ""} onChange={(v) => set(q.id, v)} />;
              if (q.tipo === "multi") return <Multi key={q.id} texto={q.texto} nota={q.nota} opciones={q.opciones!} values={m[q.id] ?? []} onChange={(v) => setMulti(q.id, v)} />;
              return <Texto key={q.id} texto={q.texto} nota={q.nota} placeholder={q.placeholder} value={r[q.id] ?? ""} onChange={(v) => set(q.id, v)} multiline={q.tipo === "textarea"} />;
            })}
          </div>
        ))}

        <button type="submit" disabled={!listo || enviando}
          className={`w-full py-5 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-500 ${
            listo && !enviando
              ? "liquid-glass-btn cursor-pointer hover:shadow-[0_0_40px_rgba(245,158,11,0.12)]"
              : "bg-white/[0.03] text-white/15 border border-white/[0.04] cursor-not-allowed"
          }`}>
          {enviando ? "Enviando…" : "Enviar cuestionario"}
        </button>
        {!listo && <p className="text-center text-white/15 text-xs mt-3">Completa empresa, nombre y correo para enviar</p>}
        {error && <p className="text-center text-red-400/80 text-sm mt-4">{error}</p>}
      </form>
    </div>
  );
}
