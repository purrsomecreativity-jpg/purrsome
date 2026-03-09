"use client";
import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

const COLORS: [string, string, string, string, string, string, string, string] = [
  "#050507",
  "#14B8A6",
  "#F59E0B",
  "#DC4A0A",
  "#EC4899",
  "#9333EA",
  "#4F46E5",
  "#050507",
];

export function MeshGradientBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <MeshGradient
        width={dimensions.width}
        height={dimensions.height}
        colors={COLORS}
        distortion={1.4}
        swirl={0.9}
        grainMixer={0}
        grainOverlay={0}
        speed={0.35}
        offsetX={0.06}
      />
      <div className="absolute inset-0 pointer-events-none bg-black/20" />
    </>
  );
}
