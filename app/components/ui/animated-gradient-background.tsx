"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useMemo } from "react";

interface AnimatedGradientBackgroundProps {
  startingGap?: number;
  Breathing?: boolean;
  gradientColors?: string[];
  gradientStops?: number[];
  animationSpeed?: number;
  breathingRange?: number;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  topOffset?: number;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  startingGap = 125,
  Breathing = false,
  gradientColors = [
    "#0A0A0A",
    "#2979FF",
    "#FF80AB",
    "#FF6D00",
    "#FFD600",
    "#00E676",
    "#3D5AFE",
  ],
  gradientStops = [35, 50, 60, 70, 80, 90, 100],
  animationSpeed = 0.02,
  breathingRange = 5,
  containerStyle = {},
  topOffset = 0,
  containerClassName = "",
}) => {
  if (gradientColors.length !== gradientStops.length) {
    throw new Error(
      `GradientColors and GradientStops must have the same length. Received gradientColors length: ${gradientColors.length}, gradientStops length: ${gradientStops.length}`
    );
  }

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Memoize the static color stops string — recomputed only when colors/stops change
  const gradientStopsString = useMemo(
    () => gradientStops.map((stop, i) => `${gradientColors[i]} ${stop}%`).join(", "),
    [gradientColors, gradientStops]
  );

  useEffect(() => {
    let animationFrame: number;
    let width = startingGap;
    let directionWidth = Breathing ? 1 : 0;

    const animateGradient = () => {
      if (Breathing) {
        if (width >= startingGap + breathingRange) directionWidth = -1;
        if (width <= startingGap - breathingRange) directionWidth = 1;
        width += directionWidth * animationSpeed;
      }

      if (containerRef.current) {
        containerRef.current.style.background =
          `radial-gradient(${width}% ${width + topOffset}% at 50% 20%, ${gradientStopsString})`;
      }

      animationFrame = requestAnimationFrame(animateGradient);
    };

    animationFrame = requestAnimationFrame(animateGradient);
    return () => cancelAnimationFrame(animationFrame);
  }, [startingGap, Breathing, animationSpeed, breathingRange, topOffset, gradientStopsString]);

  return (
    <motion.div
      key="animated-gradient-background"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
      }}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${containerClassName}`}
    >
      <div
        ref={containerRef}
        style={containerStyle}
        className="absolute inset-0"
      />
    </motion.div>
  );
};

export default AnimatedGradientBackground;
