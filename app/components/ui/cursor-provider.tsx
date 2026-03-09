"use client";
import { usePathname } from "next/navigation";
import { GradientCursor } from "./gradient-cursor";

const EXCLUDED: string[] = [];

export function CursorProvider() {
  const pathname = usePathname();
  if (EXCLUDED.includes(pathname)) return null;
  return <GradientCursor />;
}
