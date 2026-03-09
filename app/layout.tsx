import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "./components/ui/cursor-provider";

const articulat = localFont({
  src: "../public/stocks/articulat-cf-font-family-1757351375-0/Fontspring-DEMO-articulatcf-extrabold-BF64a38d8b06d4e.otf",
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Purrsome™ — We see what others don't.",
  description: "Creative agency for businesses that refuse to blend in. Web design, SEO & paid advertising.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${articulat.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
        <CursorProvider />
        {children}
      </body>
    </html>
  );
}
