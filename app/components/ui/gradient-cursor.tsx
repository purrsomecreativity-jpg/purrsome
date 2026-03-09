"use client";

import { useEffect, useRef } from "react";

/* Purrsome brand palette for the gradient blobs */
const BRAND_COLORS: [number, number, number][] = [
  [245, 158,  11],  // amber
  [ 20, 184, 166],  // teal
  [236,  72, 153],  // pink
  [147,  51, 234],  // purple
  [249, 115,  22],  // orange
];

function pickColor(): [number, number, number] {
  return BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
}

export function GradientCursor({
  radius = 55,
  opacityDecay = 0.022,
}: {
  radius?: number;
  opacityDecay?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse    = useRef({ x: -999, y: -999 });
  const circs    = useRef<{ col: [number,number,number]; x: number; y: number; grd: CanvasGradient; alpha: number }[]>([]);
  const raf      = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      /* spawn a new blob at mouse position */
      const grd = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, radius,
      );
      circs.current.push({ col: pickColor(), x: mouse.current.x, y: mouse.current.y, grd, alpha: 1 });

      /* draw & decay existing blobs */
      const dead: number[] = [];
      circs.current.forEach((c, i) => {
        const [r, g, b] = c.col;
        c.grd.addColorStop(0,   `rgba(${r},${g},${b},0.55)`);
        c.grd.addColorStop(0.25,`rgba(${r},${g},${b},0.25)`);
        c.grd.addColorStop(0.6, `rgba(${r},${g},${b},0.08)`);
        c.grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.fillStyle  = c.grd;
        ctx.globalAlpha = c.alpha;
        ctx.arc(c.x, c.y, radius, 0, Math.PI * 2);
        ctx.fill();

        c.alpha -= opacityDecay;
        if (c.alpha <= 0) dead.push(i);
      });
      for (let i = dead.length - 1; i >= 0; i--) circs.current.splice(dead[i], 1);

      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => { mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize",    resize);
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize",    resize);
    };
  }, [radius, opacityDecay]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, mixBlendMode: "screen" }}
    />
  );
}
