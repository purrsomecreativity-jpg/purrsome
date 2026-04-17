"use client";
import { T, Nav, Footer, useReveal, useLang } from "../components/shared";
import { EvervaultCard } from "../components/ui/evervault-card";

function Work({ t }: { t: typeof T.en }) {
  const [ref, vis] = useReveal();
  const slugs = ["magic-pets", "lumiere-studio", "ame"];
  const accents: [string, string][] = [
    ["#f59e0b", "#7c3aed"],
    ["#14b8a6", "#ec4899"],
    ["#9333ea", "#f59e0b"],
    ["#4f46e5", "#f97316"],
  ];
  const grads = [
    "from-amber-900/40 via-orange-900/25 to-purple-900/35",
    "from-teal-900/40 via-indigo-900/25 to-pink-900/30",
    "from-purple-900/40 via-pink-900/25 to-amber-900/30",
    "from-indigo-900/40 via-teal-900/25 to-orange-900/30"
  ];

  return (
    <section ref={ref} className="relative z-10 pt-28 md:pt-40 pb-20 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-teal-400/80 font-medium">{t.work.tag}</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mt-4 leading-[1.02] tracking-tight">{t.work.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-5 max-w-2xl mx-auto">
          {t.work.items.map((p, i) => (
            <a
              key={i}
              href={`/work/${slugs[i]}`}
              className={`group block rounded-2xl overflow-hidden transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className={`aspect-[16/10] bg-gradient-to-br ${grads[i]} relative overflow-hidden`}>
                {(p as { image?: string }).image ? (
                  <>
                    <img
                      src={(p as { image: string }).image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover object-top blur-sm scale-105 transition-all duration-700 group-hover:blur-none group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  </>
                ) : (
                  <EvervaultCard accentFrom={accents[i][0]} accentTo={accents[i][1]} />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 group-hover:via-white/[0.07] transition-all duration-700" />
                <span className="absolute top-5 right-5 md:right-7 text-[2.5rem] md:text-[5rem] font-extrabold text-white/[0.025] group-hover:text-white/[0.06] transition-all duration-700 leading-none">0{i + 1}</span>
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-all duration-700 ${i % 2 === 0 ? "bg-amber-500" : "bg-teal-500"}`} />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: "#EC4899" }}>{p.cat}</span>
                    <span className="text-[10px]" style={{ color: "#EC4899", opacity: 0.7 }}>{p.year}</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:iri-text transition-all duration-500">{p.title}</h3>
                  <p className="text-sm text-white/85 mt-2 leading-snug line-clamp-2">{p.desc}</p>
                  <div className="mt-3">
                    <span className="text-sm flex items-center gap-2 transition-all duration-300" style={{ color: p.accent }}>View <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
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
