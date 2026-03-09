"use client";
import { T, Nav, Footer, useReveal, useLang } from "../components/shared";
import { SpotlightCard } from "../components/ui/spotlight-card";
import { GradientBackground } from "../components/ui/gradient-background";

function Pricing({ t }: { t: typeof T.en }) {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="relative z-10 pt-40 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className={`max-w-2xl mb-20 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[11px] tracking-[0.3em] uppercase text-teal-400/80 font-medium">{t.pricing.tag}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-4 mb-6 leading-[1.02] tracking-tight">{t.pricing.title}</h2>
          <p className="text-white/25 text-lg leading-relaxed">{t.pricing.sub}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.pricing.plans.map((plan, i) => (
            <SpotlightCard
              key={i}
              glowColor={plan.highlight ? "orange" : "blue"}
              backupBorder={plan.highlight ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.06)"}
              backdrop={plan.highlight ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.01)"}
              className={`p-8 flex flex-col transition-[opacity,transform] duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${
                plan.highlight ? "shadow-[0_0_50px_rgba(245,158,11,0.07)]" : ""
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              {plan.highlight && (
                <div className="mb-5">
                  <span className="iri-text text-[10px] font-bold tracking-[0.25em] uppercase">{t.pricing.popular}</span>
                </div>
              )}
              <div className="mb-5">
                <div className={`text-3xl lg:text-4xl font-extrabold mb-1 ${plan.highlight ? "iri-text" : "text-white"}`}>{plan.price}</div>
                <div className="text-base font-bold text-white/70 mt-1">{plan.name}</div>
              </div>
              <p className="text-white/30 text-sm leading-relaxed mb-6">{plan.desc}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-sm text-white/45">
                    <span className="text-teal-400/70 mt-0.5 flex-shrink-0 text-xs">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/start"
                className={`text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-400 ${
                  plan.highlight
                    ? "cta-btn"
                    : "border border-white/[0.08] text-white/40 hover:text-white hover:border-white/25 hover:bg-white/[0.03]"
                }`}
              >
                {plan.cta}
              </a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  const gradients = [
    "linear-gradient(135deg, #050507 0%, #1a0533 100%)",
    "linear-gradient(135deg, #0d0220 0%, #2d1b69 50%, #11998e 100%)",
    "linear-gradient(135deg, #0a0118 0%, #8e2de2 60%, #4a00e0 100%)",
    "linear-gradient(135deg, #050507 0%, #0f3460 50%, #e94560 100%)",
    "linear-gradient(135deg, #0d0220 0%, #4a00e0 50%, #ec4899 100%)",
    "linear-gradient(135deg, #050507 0%, #1a0533 100%)",
  ];

  return (
    <GradientBackground
      gradients={gradients}
      animationDuration={10}
      animationDelay={0}
      overlay={true}
      overlayOpacity={0.25}
      className="text-white overflow-x-hidden"
    >
      <div className="w-full">
        <Nav lang={lang} setLang={setLang} t={t} />
        <Pricing t={t} />
        <Footer t={t} />
      </div>
    </GradientBackground>
  );
}
