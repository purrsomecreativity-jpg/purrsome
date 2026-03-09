"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { siteConfig } from "@/config/site.config";

export default function Work() {
  const { work } = siteConfig;
  const { ref: headerRef, inView: headerIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView();

  return (
    <section id="work" className="section-padding bg-primary">
      <div className="container-wide">
        {/* Section header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6 fade-up ${
            headerIn ? "in-view" : ""
          }`}
        >
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Portfolio
            </p>
            <h2 className="heading-lg">{work.heading}</h2>
            <p className="text-muted mt-4">{work.subheading}</p>
          </div>
          <a
            href="#contact"
            className="self-start md:self-auto border border-border hover:border-accent text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:bg-accent/10 whitespace-nowrap"
          >
            Start a Project →
          </a>
        </div>

        {/* Grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {work.items.map((project, index) => (
            <a
              key={project.id}
              href={project.href}
              className={`group relative overflow-hidden rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all duration-500 fade-up ${
                gridIn ? "in-view" : ""
              } ${index === 0 ? "md:row-span-2" : ""}`}
              style={{ transitionDelay: gridIn ? `${index * 100}ms` : "0ms" }}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "h-[500px] md:h-full min-h-[400px]" : "h-64"
                }`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-surface via-border to-primary flex items-center justify-center">
                    <span className="text-4xl text-accent opacity-20">✦</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">
                  {project.category}
                </p>
                <h3 className="text-white font-bold text-xl">{project.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
