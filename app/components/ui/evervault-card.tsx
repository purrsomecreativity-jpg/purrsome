"use client";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import React from "react";

function CardPattern({ mouseX, mouseY, accentFrom, accentTo }: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  accentFrom: string;
  accentTo: string;
}) {
  const maskImage = useMotionTemplate`radial-gradient(140px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover/ec:opacity-100 transition duration-500"
        style={{ ...style, background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
      />
    </div>
  );
}

export function EvervaultCard({
  className = "",
  accentFrom = "#10b981",
  accentTo = "#3b82f6",
}: {
  className?: string;
  accentFrom?: string;
  accentTo?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className={`group/ec absolute inset-0 rounded-2xl overflow-hidden ${className}`}
    >
      <CardPattern
        mouseX={mouseX}
        mouseY={mouseY}
        accentFrom={accentFrom}
        accentTo={accentTo}
      />
    </div>
  );
}
