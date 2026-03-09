"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export default function Hero() {
  const { hero } = siteConfig;
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center section-padding overflow-hidden"
    >
      {/* ── Animated blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob-1 absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="blob-2 absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[100px]" />
        <div className="blob-3 absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-[80px]" />
      </div>

      {/* ── Isotipo parallax background ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-end"
        style={{ transform: `translateY(${scrollY * 0.35}px)` }}
      >
        <div
          className="relative w-[620px] h-[620px] opacity-[0.06] mr-[-80px]"
          style={{ transform: `rotate(${scrollY * 0.04}deg)` }}
        >
          <Image
            src="/stocks/isotipo purrsome test.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* ── Secondary smaller isotipo ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div
          className="absolute top-16 right-[38%] w-[180px] h-[180px] opacity-[0.04]"
          style={{ transform: `rotate(${-scrollY * 0.06}deg)` }}
        >
          <Image
            src="/stocks/isotipo purrsome test.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Content (parallax upward) ── */}
      <div
        className="container-wide relative z-10 w-full"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        {/* Eyebrow */}
        <div
          className={`inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-border text-sm text-muted transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Creative Design Agency
        </div>

        {/* Heading */}
        <h1
          className={`heading-xl mb-8 max-w-5xl transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {hero.heading.split("\n").map((line, i) => (
            <span key={i} className={i === 1 ? "gradient-text" : ""}>
              {line}
              <br />
            </span>
          ))}
        </h1>

        {/* Subheading */}
        <p
          className={`text-lg md:text-xl text-muted mb-12 max-w-lg leading-relaxed transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {hero.subheading}
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-wrap gap-4 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <a
            href={hero.cta.href}
            className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-sm"
          >
            {hero.cta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="border border-border hover:border-white/50 hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-sm"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
