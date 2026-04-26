"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GradientCursor } from "./gradient-cursor";

const EXCLUDED: string[] = [];

export function CursorProvider() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!enabled || EXCLUDED.includes(pathname)) return null;
  return <GradientCursor />;
}
