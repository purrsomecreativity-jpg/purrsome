"use client";
import { useEffect, useRef } from "react";

/**
 * Gato de Purrsome sin fondo, con la cola ondulando (movimiento wavy).
 * Imagen: /stocks/cat-wavy.png (900x662, blanca con transparencia, ojos y nariz transparentes).
 * El cuerpo queda quieto; la cola se desplaza en tiras horizontales,
 * con amplitud 0 en la base y máxima en la punta.
 */
const W = 900;
const H = 662;
const X_CUT = 600; // desde esta x (en la imagen) empieza la cola
const Y_BASE = 415; // por debajo de esto es cuerpo, sin movimiento
const AMP = 28; // desplazamiento máximo de la punta, en px de la imagen
const STRIP = 3;

export default function CatWavy({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = new Image();
    let raf = 0;
    let alive = true;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      // cuerpo y cabeza (quietos)
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, X_CUT, H);
      ctx.rect(X_CUT, Y_BASE, W - X_CUT, H - Y_BASE);
      ctx.clip();
      ctx.drawImage(img, 0, 0, W, H);
      ctx.restore();
      // cola ondulando
      for (let y = 0; y < Y_BASE; y += STRIP) {
        const w = Math.pow((Y_BASE - y) / Y_BASE, 1.3);
        const dx = reduce ? 0 : AMP * w * Math.sin(t * 0.0021 - y * 0.028);
        ctx.drawImage(img, X_CUT, y, W - X_CUT, STRIP, X_CUT + dx, y, W - X_CUT, STRIP);
      }
    };

    const loop = (t: number) => {
      if (!alive) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    img.onload = () => {
      if (reduce) draw(0);
      else raf = requestAnimationFrame(loop);
    };
    img.src = "/stocks/cat-wavy.png";

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} role="img" aria-label="Gato de Purrsome" className={className} style={{ aspectRatio: `${W} / ${H}` }} />;
}
