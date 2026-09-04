"use client";
import { useState } from "react";
import { T, useReveal } from "./shared";

/**
 * Bilingual FAQ accordion. Pulls its copy from T[lang].faq.
 * Used on the home page (before the footer) and on /start.
 */
export function FAQ({ t }: { t: typeof T.en }) {
  const [ref, vis] = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative z-10 py-20 md:py-28 bg-[#050507]">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div
          className={`mb-10 md:mb-14 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-amber-400/80 font-medium">{t.faq.tag}</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 leading-[1.02] tracking-tight">{t.faq.title}</h2>
        </div>

        <div className="flex flex-col">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`border-b border-white/[0.06] transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${100 + i * 80}ms` }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-5 md:py-6 text-left group"
                >
                  <span className={`text-base md:text-lg font-semibold transition-colors duration-300 ${isOpen ? "text-white" : "text-white/60 group-hover:text-white/90"}`}>
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 text-white/30 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm md:text-base text-white/40 leading-relaxed pb-6 pr-10">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
