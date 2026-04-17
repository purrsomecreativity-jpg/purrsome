"use client";

import { useEffect, useRef } from "react";

export function GradientCursor({ size = 78 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (x: number, y: number) => {
      el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
    };
    const onMouse = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => onMove(e.touches[0].clientX, e.touches[0].clientY);

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [size]);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        zIndex: 9999,
        background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0) 75%)",
        mixBlendMode: "difference",
        willChange: "transform",
      }}
    />
  );
}
