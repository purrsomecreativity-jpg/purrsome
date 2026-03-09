"use client";

import { useInView } from "@/hooks/useInView";
import { siteConfig } from "@/config/site.config";

export default function Services() {
  const { services } = siteConfig;
  const { ref: headerRef, inView: headerIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView();

  return (
    <section id="services" className="section-padding bg-surface">
      <div className="container-wide">
        {/* Section header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`mb-20 fade-up ${headerIn ? "in-view" : ""}`}
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
            Services
          </p>
          <h2 className="heading-lg max-w-xl">{services.heading}</h2>
          <p className="text-muted mt-4 max-w-lg">{services.subheading}</p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden"
        >
          {services.items.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-surface hover:bg-primary/80 p-10 transition-all duration-500 fade-up ${
                gridIn ? "in-view" : ""
              }`}
              style={{ transitionDelay: gridIn ? `${index * 80}ms` : "0ms" }}
            >
              {/* Number */}
              <span className="block text-xs font-mono text-muted/40 mb-8 tracking-widest">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <span className="text-2xl text-accent mb-5 block transition-transform duration-300 group-hover:scale-110 origin-left">
                {service.icon}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
