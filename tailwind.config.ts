import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Keep these in sync with siteConfig.theme ──────────────
      colors: {
        primary:  "#0F0F0F",
        accent:   "#3e0085",
        "accent-hover": "#2e0063",
        surface:  "#1A1A1A",
        muted:    "#A0A0A0",
        border:   "#2A2A2A",
      },
      // ── Fonts ─────────────────────────────────────────────────
      // After adding fonts to layout.tsx, reference them here:
      fontFamily: {
        sans:    ["var(--font-sans)",    "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      // ── Animations ────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        moveHorizontal: {
          "0%":   { transform: "translateX(-50%) translateY(-10%)" },
          "50%":  { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%":   { transform: "rotate(0deg)" },
          "50%":  { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%":   { transform: "translateY(-50%)" },
          "50%":  { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        "fade-in": "fade-in 0.4s ease forwards",
        first:  "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third:  "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth:  "moveInCircle 20s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
