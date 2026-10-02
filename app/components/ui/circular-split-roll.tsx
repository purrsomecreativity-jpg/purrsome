"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);
  return prefersReducedMotion;
}

const DESKTOP_WIDTH = 1200;
const TABLET_MIN_WIDTH = 768;
const DEPTH_MIN = -1;
const DEPTH_MAX = 1;
const Z_INDEX_MIN = 1;

export interface SplitRollItem {
  slug: string;
  title: string;
  image: string;
  alt?: string;
  cat?: string;
  accent?: string;
}

function wrapProgress(value: number) {
  let wrapped = value % 1;
  if (wrapped < 0) wrapped += 1;
  return wrapped;
}

function getCircularPosition(progress: number, radiusX: number, radiusY: number, angleOffset = 0) {
  const angle = progress * Math.PI * 2 + angleOffset;
  return {
    x: Math.sin(angle) * radiusX,
    y: Math.cos(angle) * radiusY,
    horizontalDepth: Math.sin(angle),
  };
}

function getStrength(value: number) {
  return gsap.utils.clamp(0, 1, gsap.utils.mapRange(DEPTH_MIN, DEPTH_MAX, 0, 1, value));
}

function shapeFocus(strength: number, start = 0.42, power = 2.8) {
  const normalized = gsap.utils.clamp(0, 1, (strength - start) / (1 - start));
  return Math.pow(normalized, power);
}

interface CircularSplitRollProps {
  items: SplitRollItem[];
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  sectionHeight?: number;
  scrub?: number;
  titleColor?: string;
  header?: React.ReactNode;
}

export default function CircularSplitRoll({
  items,
  radius = 500,
  cardWidth = 300,
  cardHeight = 200,
  sectionHeight = 100,
  scrub = 1.2,
  titleColor = "#FFFFFF",
  header,
}: CircularSplitRollProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const [dims, setDims] = useState({ card: { w: cardWidth, h: cardHeight } });
  const reducedMotion = usePrefersReducedMotion();

  const safeItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        alt: item.alt ?? item.title,
        id: `${item.slug}-${index}`,
      })),
    [items]
  );

  useEffect(() => {
    if (!rootRef.current || !stickyRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1026px)", () => {
      const ctx = gsap.context(() => {
        const leftNodes = gsap.utils.toArray(".csr-left-item") as HTMLElement[];
        const rightNodes = gsap.utils.toArray(".csr-right-item") as HTMLElement[];
        const total = safeItems.length;
        if (!total) return;

        gsap.set([...leftNodes, ...rightNodes], { opacity: 1 });

        const render = (scrollProgress: number) => {
          progressRef.current = scrollProgress;
          const width = typeof window !== "undefined" ? window.innerWidth : DESKTOP_WIDTH;
          let factor = 1;
          if (width < DESKTOP_WIDTH && width >= TABLET_MIN_WIDTH) factor = width / DESKTOP_WIDTH;

          const rX = radius * factor;
          const rY = radius * factor;
          setDims({ card: { w: cardWidth * factor, h: cardHeight * factor } });

          leftNodes.forEach((node, index) => {
            const local = wrapProgress(index / total - scrollProgress + 0.75);
            const pos = getCircularPosition(local, rX, rY, Math.PI);
            const focus = shapeFocus(getStrength(pos.horizontalDepth), 0.42, 2.6);
            gsap.set(node, {
              x: pos.x,
              y: pos.y,
              scale: gsap.utils.interpolate(0.68, 1, focus),
              opacity: gsap.utils.interpolate(0, 1, focus),
              zIndex: Math.round(gsap.utils.interpolate(Z_INDEX_MIN, 30, focus)),
              transformOrigin: "50% 50%",
            });
          });

          rightNodes.forEach((node, index) => {
            const local = wrapProgress(index / total - scrollProgress + 0.75);
            const pos = getCircularPosition(local, rX, rY, 0);
            const focus = shapeFocus(getStrength(-pos.horizontalDepth), 0.45, 3.2);
            gsap.set(node, {
              x: pos.x,
              y: pos.y,
              scale: gsap.utils.interpolate(0.58, 1, focus),
              opacity: gsap.utils.interpolate(0, 1, focus),
              zIndex: Math.round(gsap.utils.interpolate(Z_INDEX_MIN, 40, focus)),
              transformOrigin: "50% 50%",
            });
          });
        };

        render(0);

        const st = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: `+=${sectionHeight * safeItems.length}%`,
          pin: stickyRef.current,
          scrub,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => render(self.progress),
        });

        const onResize = () => {
          render(progressRef.current);
          st.refresh();
        };
        window.addEventListener("resize", onResize);
        return () => {
          window.removeEventListener("resize", onResize);
          st.kill();
        };
      }, rootRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [safeItems, radius, cardWidth, cardHeight, sectionHeight, scrub]);

  return (
    <section ref={rootRef} className="relative w-full overflow-clip" style={{ color: titleColor }}>
      {/* Desktop: rueda circular con scroll */}
      <div
        ref={stickyRef}
        className={`relative h-screen w-full overflow-hidden ${reducedMotion ? "hidden" : "hidden min-[1026px]:block"}`}
      >
        {header && <div className="pointer-events-none absolute inset-x-0 top-0 z-50">{header}</div>}
        <div className="relative mx-auto flex h-full w-full">
          <div
            className="relative flex h-full w-[50vw] items-center justify-center"
            style={{ transform: "translateX(calc(5vw - 500px))" }}
          >
            <div className="relative h-[78vh]">
              {safeItems.map((item) => (
                <a
                  key={item.id}
                  href={`/work/${item.slug}`}
                  className="csr-left-item absolute left-1/2 top-1/2 origin-center whitespace-nowrap text-center font-extrabold leading-none tracking-[-0.04em] opacity-0 transition-colors duration-300 will-change-[transform,opacity] hover:iri-text"
                  style={{
                    width: "44vw",
                    marginLeft: "-22vw",
                    fontSize:
                      item.title.length > 16
                        ? "clamp(20px, 2.1vw, 40px)"
                        : "clamp(28px, 3vw, 56px)",
                  }}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          <div
            className="relative flex h-full w-[50vw] items-center justify-center"
            style={{ transform: "translateX(calc(500px - 5vw))" }}
          >
            <div className="relative h-[78vh]">
              {safeItems.map((item) => (
                <a
                  key={item.id}
                  href={`/work/${item.slug}`}
                  className="csr-right-item group absolute left-1/2 top-1/2 block origin-center opacity-0 will-change-[transform,opacity]"
                  style={{
                    width: dims.card.w,
                    height: dims.card.h,
                    marginLeft: dims.card.w * -0.5,
                    marginTop: dims.card.h * -0.5,
                  }}
                >
                  <div className="flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0A0A0C] shadow-[0_30px_60px_rgba(0,0,0,0.5),0_8px_20px_rgba(0,0,0,0.3)]">
                    {item.cat && (
                      <div className="flex shrink-0 items-center justify-center bg-[#E9ECF1] px-4 py-2.5">
                        <span
                          className="text-center text-[12px] font-bold leading-snug text-[#0A0A0C]"
                          style={{ fontFamily: "var(--font-syne), sans-serif" }}
                        >
                          {item.cat}
                        </span>
                      </div>
                    )}
                    <div className="relative min-h-0 flex-1 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="pointer-events-none absolute inset-0 block h-full w-full select-none object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        draggable="false"
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Movil / reduced-motion: grilla clickeable */}
      <div className={`w-full px-5 py-10 max-md:px-4 max-md:py-8 ${reducedMotion ? "block" : "min-[1026px]:hidden"}`}>
        {header}
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-6">
          {safeItems.map((item) => (
            <a key={item.id} href={`/work/${item.slug}`} className="block w-full">
              <div className="w-full overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0A0A0C] shadow-[0_18px_38px_rgba(0,0,0,0.4)] max-md:rounded-[14px]">
                {item.cat && (
                  <div className="flex items-center justify-center bg-[#E9ECF1] px-4 py-2.5">
                    <span
                      className="text-center text-[12px] font-bold leading-snug text-[#0A0A0C]"
                      style={{ fontFamily: "var(--font-syne), sans-serif" }}
                    >
                      {item.cat}
                    </span>
                  </div>
                )}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="absolute inset-0 block h-full w-full object-cover object-top"
                    draggable="false"
                  />
                </div>
              </div>
              <h3 className="mt-1 text-center text-[clamp(18px,4vw,30px)] font-extrabold leading-none tracking-[-0.04em]">
                {item.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
