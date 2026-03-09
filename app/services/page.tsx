"use client";
import { T, Nav, Footer, useReveal, useLang } from "../components/shared";
import AnimatedGradientBackground from "../components/ui/animated-gradient-background";

function Services({ t }: { t: typeof T.en }) {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="relative z-10 pt-28 md:pt-40 pb-20 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className={`max-w-2xl mb-12 md:mb-20 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[11px] tracking-[0.3em] uppercase text-teal-400/80 font-medium">{t.services.tag}</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mt-4 mb-4 md:mb-6 leading-[1.02] tracking-tight">{t.services.title}</h2>
          <p className="text-white/25 text-base md:text-lg leading-relaxed">{t.services.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {t.services.items.map((s, i) => {
            return (
            <div
              key={i}
              className={`liquid-glass-btn group relative rounded-2xl p-6 md:p-8 lg:p-10 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div className="flex items-start justify-between mb-8">
                <img src="/stocks/purrsome-isotipo.png" alt="Purrsome" className="w-10 h-10 object-contain opacity-40 group-hover:opacity-90 transition-opacity duration-500" />
                <span className="text-[11px] text-white/10 font-mono tracking-[0.2em]">{s.num}</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white/85 mb-4 group-hover:text-white transition-all duration-500">{s.title}</h3>
              <p className="text-white/25 text-sm leading-[1.7] group-hover:text-white/40 transition-colors duration-500">{s.desc}</p>
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-transparent group-hover:via-amber-500/20 to-transparent transition-all duration-700" />
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  return (
    <main className="relative bg-[#050507] text-white overflow-x-hidden min-h-screen">
      <AnimatedGradientBackground
        gradientColors={["#050507", "#4F46E5", "#EC4899", "#DC4A0A", "#F59E0B", "#14B8A6", "#9333EA"]}
        gradientStops={[35, 50, 60, 70, 80, 90, 100]}
        startingGap={125}
        Breathing={true}
        breathingRange={5}
        animationSpeed={0.02}
        topOffset={0}
      />
      <Nav lang={lang} setLang={setLang} t={t} />
      <Services t={t} />
      <Footer t={t} />
    </main>
  );
}
