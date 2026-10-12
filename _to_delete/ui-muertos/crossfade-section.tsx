"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CrossfadeSectionProps {
  children: React.ReactNode;
  className?: string;
  /** La primera seccion no anima su entrada (ya esta visible al cargar). */
  first?: boolean;
  /** La ultima seccion no anima su salida. */
  last?: boolean;
}

export default function CrossfadeSection({ children, className, first = false, last = false }: CrossfadeSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (!first) {
        gsap.fromTo(
          el,
          { opacity: 0.12, y: 80, scale: 0.985, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 94%", end: "top 48%", scrub: true },
          }
        );
      }
      if (!last) {
        gsap.to(el, {
          opacity: 0.08,
          scale: 1.02,
          filter: "blur(12px)",
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "bottom 40%", end: "bottom 4%", scrub: true },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [first, last]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
