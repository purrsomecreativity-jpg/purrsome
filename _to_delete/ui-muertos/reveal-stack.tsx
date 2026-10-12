"use client";

import React, { Children, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pila de secciones a pantalla completa: al scrollear, la seccion actual
 * se desliza hacia arriba (cortina) y revela la siguiente debajo, cuyo
 * contenido sube con un leve paralaje. Desktop only; en movil las
 * secciones fluyen normal.
 */
export default function RevealStack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const stage = root.querySelector<HTMLElement>(".rs-stage");
      if (!stage) return;
      const panels = Array.from(stage.querySelectorAll<HTMLElement>(":scope > .rs-panel"));
      if (panels.length < 2) return;
      const inners = panels.map((p) => p.querySelector<HTMLElement>(":scope > .rs-inner"));

      panels.forEach((p, i) => gsap.set(p, { zIndex: panels.length - i }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${(panels.length - 1) * 100}%`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return;
        // cortina: la seccion actual sube, se desenfoca y desaparece
        tl.to(panel, { yPercent: -100, filter: "blur(16px)", ease: "none", duration: 1 }, i);
        // paralaje: el contenido de la siguiente sube a su lugar
        const nextInner = inners[i + 1];
        if (nextInner) {
          tl.fromTo(
            nextInner,
            { yPercent: 16, scale: 0.96, autoAlpha: 0.5 },
            { yPercent: 0, scale: 1, autoAlpha: 1, ease: "none", duration: 1 },
            i
          );
        }
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={ref}>
      {/* Desktop: escenario apilado */}
      <div className="rs-stage relative hidden h-screen overflow-hidden lg:block">
        {items.map((child, i) => (
          <div key={i} className="rs-panel absolute inset-0 overflow-hidden bg-[#050507]">
            <div className="rs-inner h-full w-full">{child}</div>
          </div>
        ))}
      </div>
      {/* Movil / reduced motion: flujo normal */}
      <div className="lg:hidden">{items}</div>
    </div>
  );
}
