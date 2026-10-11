"use client";
import { T, useReveal } from "./shared";

/**
 * Service cards with two overlapping, tilted screenshots of real client work.
 * The pairs are language-independent, so they live here and not in the T
 * dictionary — index-matched to `t.services.items`.
 */
const SHOTS: { back: string; front: string; accent: string }[] = [
  { back: "/services/web-1.webp", front: "/services/web-2.webp", accent: "#14B8A6" },
  { back: "/services/seo-1.webp", front: "/services/seo-2.webp", accent: "#F59E0B" },
  { back: "/services/ads-1.webp", front: "/services/ads-2.webp", accent: "#EC4899" },
  { back: "/services/brand-1.webp", front: "/services/brand-2.webp", accent: "#DC4A0A" },
  { back: "/services/portal-1.webp", front: "/services/portal-2.webp", accent: "#9333EA" },
  { back: "/services/ai-1.webp", front: "/services/ai-2.webp", accent: "#4F46E5" },
];

export function ServicesShowcase({ t }: { t: typeof T.en }) {
  const [ref, vis] = useReveal();

  return (
    <section ref={ref} className="relative z-10 pt-28 md:pt-40 pb-20 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div
          className={`max-w-2xl mb-12 md:mb-20 transition-all duration-700 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-teal-400/80 font-medium">
            {t.services.tag}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mt-4 mb-4 md:mb-6 leading-[1.02] tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-white/25 text-base md:text-lg leading-relaxed">{t.services.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {t.services.items.map((s, i) => {
            const shot = SHOTS[i % SHOTS.length];
            return (
              <article
                key={s.num}
                className={`group relative flex flex-col rounded-3xl border border-white/[0.07] bg-[#0B0B0E]/85 backdrop-blur-xl p-6 md:p-7 transition-all duration-700 hover:border-white/[0.14] hover:bg-[#101014]/90 ${
                  vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${160 + i * 110}ms` }}
              >
                {/* Stacked, tilted screenshots */}
                <div className="relative flex h-52 md:h-60 items-center justify-center">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute h-32 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60 motion-reduce:transition-none"
                    style={{ background: shot.accent }}
                  />
                  <img
                    src={shot.back}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="shot absolute w-40 sm:w-48 h-auto rounded-xl border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.55)] -translate-x-9 -translate-y-5 -rotate-6 transition-transform duration-500 ease-out group-hover:-translate-x-12 group-hover:-translate-y-7 group-hover:-rotate-[10deg] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <img
                    src={shot.front}
                    alt={`${s.title} — Purrsome client work`}
                    loading="lazy"
                    decoding="async"
                    className="shot absolute w-44 sm:w-52 h-auto rounded-xl border border-white/10 shadow-[0_26px_60px_rgba(0,0,0,0.65)] translate-x-6 translate-y-4 rotate-3 transition-transform duration-500 ease-out group-hover:translate-x-9 group-hover:translate-y-6 group-hover:rotate-[6deg] group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>

                <div className="mt-6 flex items-start justify-between gap-4">
                  <h3 className="text-lg lg:text-xl font-bold text-white/85 transition-colors duration-500 group-hover:text-white">
                    {s.title}
                  </h3>
                  <span className="shrink-0 pt-1 text-[11px] font-mono tracking-[0.2em] text-white/15">
                    {s.num}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-[1.7] text-white/30 transition-colors duration-500 group-hover:text-white/45">
                  {s.desc}
                </p>

                <span
                  aria-hidden
                  className="absolute bottom-0 left-8 right-8 h-px opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${shot.accent}55, transparent)` }}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesShowcase;
