"use client";
import { T, Nav, Footer, useLang } from "../components/shared";
import { ServicesShowcase } from "../components/ServicesShowcase";
import AnimatedGradientBackground from "../components/ui/animated-gradient-background";

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
      <ServicesShowcase t={t} />
      <Footer t={t} />
    </main>
  );
}
