"use client";

import * as React from "react";
import { Sparkle } from "lucide-react";
import { createRoot } from "react-dom/client";
import { cn } from "@/lib/utils";

interface Point { x: number; y: number; }

const MagicCursor = React.forwardRef<HTMLDivElement>((_, __) => {
  const config = React.useRef({
    starAnimationDuration: 1200,
    minimumTimeBetweenStars: 280,
    minimumDistanceBetweenStars: 80,
    glowDuration: 60,
    maximumGlowPointSpacing: 10,
    /* amber · teal · pink — Purrsome palette */
    colors: ["245 158 11", "20 184 166", "236 72 153"],
    sizes: ["1.2rem", "0.9rem", "0.6rem"],
    animations: ["fall-1", "fall-2", "fall-3"],
  });

  const last = React.useRef({
    starTimestamp: Date.now(),
    starPosition: { x: 0, y: 0 },
    mousePosition: { x: 0, y: 0 },
  });

  let count = 0;

  const icon = <Sparkle className="h-full w-full" />;

  const createStar = React.useCallback((pos: Point) => {
    const { colors, sizes, animations, starAnimationDuration } = config.current;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size  = sizes[Math.floor(Math.random() * sizes.length)];

    const el = document.createElement("div");
    el.className = cn("mouse-sparkles-star");
    el.style.cssText = `left:${pos.x}px;top:${pos.y}px;font-size:${size};color:rgb(${color});text-shadow:0 0 1.5rem rgb(${color}/0.5);animation-name:${animations[count++ % 3]};animation-duration:${starAnimationDuration}ms`;
    document.body.appendChild(el);

    const root = createRoot(el);
    root.render(icon);
    setTimeout(() => { root.unmount(); document.body.removeChild(el); }, starAnimationDuration);
  }, [icon]);

  const createGlowPoint = React.useCallback((pos: Point) => {
    const el = document.createElement("div");
    el.className = "mouse-sparkles-glow-point";
    el.style.cssText = `left:${pos.x}px;top:${pos.y}px`;
    document.body.appendChild(el);
    setTimeout(() => document.body.removeChild(el), config.current.glowDuration);
  }, []);

  const createGlow = React.useCallback((a: Point, b: Point) => {
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const qty  = Math.max(Math.floor(dist / config.current.maximumGlowPointSpacing), 1);
    const dx = (b.x - a.x) / qty;
    const dy = (b.y - a.y) / qty;
    Array.from({ length: qty }).forEach((_, i) =>
      createGlowPoint({ x: a.x + dx * i, y: a.y + dy * i })
    );
  }, [createGlowPoint]);

  const handleMove = React.useCallback((clientX: number, clientY: number) => {
    const pos = { x: clientX, y: clientY };
    if (!last.current.mousePosition.x && !last.current.mousePosition.y)
      last.current.mousePosition = pos;

    const now = Date.now();
    const dist = Math.hypot(pos.x - last.current.starPosition.x, pos.y - last.current.starPosition.y);
    if (dist >= config.current.minimumDistanceBetweenStars ||
        now - last.current.starTimestamp > config.current.minimumTimeBetweenStars) {
      createStar(pos);
      last.current.starTimestamp = now;
      last.current.starPosition  = pos;
    }

    createGlow(last.current.mousePosition, pos);
    last.current.mousePosition = pos;
  }, [createStar, createGlow]);

  React.useEffect(() => {
    const onMove  = (e: MouseEvent)      => handleMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent)      => handleMove(e.touches[0].clientX, e.touches[0].clientY);
    const onLeave = ()                   => { last.current.mousePosition = { x: 0, y: 0 }; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch);
    document.body.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, [handleMove]);

  return null;
});

MagicCursor.displayName = "MagicCursor";
export { MagicCursor };
