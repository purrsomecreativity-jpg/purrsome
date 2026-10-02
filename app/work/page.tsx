"use client";
import { T, Nav, Footer, useReveal, useLang } from "../components/shared";
import CircularSplitRoll, { type SplitRollItem } from "../components/ui/circular-split-roll";
import AnimatedGradientBackground from "../components/ui/animated-gradient-background";

function Intro({ t }: { t: typeof T.en }) {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="relative z-10 flex h-screen w-full items-center justify-center">
      <div className={`mx-auto max-w-3xl px-6 text-center transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <span className="text-[11px] tracking-[0.3em] uppercase text-amber-400/80 font-medium">{t.work.casesTag}</span>
        <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.02] tracking-tight">{t.work.casesTitle}</h1>
        <p className="mx-auto mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/35">{t.work.casesSub}</p>
      </div>
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">{t.work.keepScrolling}</span>
        <svg className="h-5 w-5 animate-bounce text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

export default function WorkPage() {
  const [lang, setLang] = useLang();
  const t = T[lang];

  const items: SplitRollItem[] = [
    ...t.work.cases.map((c) => ({
      slug: c.slug,
      title: c.title,
      image: c.image,
      cat: c.cat,
      accent: c.accent,
    })),
    ...t.work.items
      .filter((m) => m.title === "Angel Mechanic Expert")
      .map((m) => ({
        slug: "ame",
        title: m.title,
        image: (m as { image?: string }).image ?? "",
        cat: m.cat,
        accent: m.accent,
      })),
  ];

  return (
    <main className="relative bg-[#050507] text-white overflow-x-clip min-h-screen">
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
      <Intro t={t} />
      <CircularSplitRoll items={items} radius={500} cardWidth={320} cardHeight={250} sectionHeight={100} />
      <Footer t={t} />
    </main>
  );
}
