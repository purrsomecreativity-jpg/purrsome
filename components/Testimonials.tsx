"use client";

import { useInView } from "@/hooks/useInView";
import { siteConfig } from "@/config/site.config";

export default function Testimonials() {
  const { testimonials } = siteConfig;
  const { ref: headerRef, inView: headerIn } = useInView();
  const { ref: cardsRef, inView: cardsIn } = useInView();

  return (
    <section className="section-padding bg-surface">
      <div className="container-wide">
        {/* Section header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 fade-up ${headerIn ? "in-view" : ""}`}
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="heading-lg">{testimonials.heading}</h2>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.items.map((item, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl bg-primary border border-border hover:border-accent/30 transition-all duration-500 flex flex-col justify-between fade-up ${
                cardsIn ? "in-view" : ""
              }`}
              style={{ transitionDelay: cardsIn ? `${index * 100}ms` : "0ms" }}
            >
              <span className="text-5xl text-accent/30 leading-none mb-6 block">
                &ldquo;
              </span>

              <p className="text-white/90 leading-relaxed mb-8 flex-1">
                {item.quote}
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                  {item.author[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.author}</p>
                  <p className="text-muted text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
