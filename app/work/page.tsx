"use client";
import { T, Nav, Footer, useReveal, useLang } from "../components/shared";
import { EvervaultCard } from "../components/ui/evervault-card";

function Work({ t }: { t: typeof T.en }) {
  const [ref, vis] = useReveal();
  const slugs = ["bella-cucina", "profix-plumbing", "luma-skin-studio", "verdant-market"];
  const grads = [
    "from-amber-900/40 via-orange-900/25 to-purple-900/35",
    "from-teal-900/40 via-indigo-900/25 to-pink-900/30",
    "from-purple-900/40 via-pink-900/25 to-amber-900/30",
    "from-indigo-900/40 via-teal-900/25 to-orange-900/30"
  ];
  const accents: [string, string][] = [
    ["#f59e0b", "#7c3aed"],
    ["#14b8a6", "#ec4899"],
    ["#9333ea", "#f59e0b"],
    ["#4f46e5", "#f97316"],
  ];

  return (
    <section ref={ref} className="relative z-10 pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-teal-400/80 font-medium">{t.work.tag}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-4 leading-[1.02] tracking-tight">{t.work.title}</h2>
          </div>
          <a href="#" className="hidden md:inline-flex text-sm text-white/25 hover:text-white/50 transition-colors tracking-wide">{t.work.cta}</a>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {t.work.items.map((p, i) => (
            <a
              key={i}
              href={`/work/${slugs[i]}`}
              className={`group block rounded-2xl overflow-hidden transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className={`aspect-[16/10] bg-gradient-to-br ${grads[i]} relative overflow-hidden`}>
                <EvervaultCard accentFrom={accents[i][0]} accentTo={accents[i][1]} />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 group-hover:via-white/[0.07] transition-all duration-700" />
                <span className="absolute top-5 right-7 text-[5rem] font-extrabold text-white/[0.025] group-hover:text-white/[0.06] transition-all duration-700 leading-none">0{i + 1}</span>
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-all duration-700 ${i % 2 === 0 ? "bg-amber-500" : "bg-teal-500"}`} />
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-white/20 font-medium">{p.cat}</span>
                    <span className="text-[10px] text-white/10">{p.year}</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white/85 group-hover:iri-text transition-all duration-500">{p.title}</h3>
                  <p className="text-sm text-white/50 mt-2 leading-snug line-clamp-2">{p.desc}</p>
                  <div className="mt-3">
                    <span className="text-sm flex items-center gap-2 transition-all duration-300" style={{ color: p.accent }}>View <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <a href="#" className="md:hidden block text-center text-sm text-white/25 mt-8">{t.work.cta}</a>
      </div>
    </section>
  );
}

export default function WorkPage() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  return (
    <main className="relative bg-[#050507] text-white overflow-x-hidden min-h-screen">
      <Nav lang={lang} setLang={setLang} t={t} />
      <Work t={t} />
      <Footer t={t} />
    </main>
  );
}
