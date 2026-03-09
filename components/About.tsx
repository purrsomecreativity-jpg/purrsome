"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { siteConfig } from "@/config/site.config";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState("0");
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;

    const numMatch = value.match(/\d+/);
    if (!numMatch) {
      setDisplayed(value);
      return;
    }

    const target = parseInt(numMatch[0]);
    const suffix = value.replace(numMatch[0], "");
    const duration = 1200;
    const steps = 40;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(target / steps);
      if (current >= target) {
        setDisplayed(`${target}${suffix}`);
        clearInterval(timer);
      } else {
        setDisplayed(`${current}${suffix}`);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [triggered, value]);

  return (
    <div ref={ref} className="p-6 rounded-2xl bg-primary border border-border">
      <p className="text-4xl md:text-5xl font-bold text-accent mb-1 tabular-nums">
        {displayed}
      </p>
      <p className="text-muted text-sm">{label}</p>
    </div>
  );
}

export default function About() {
  const { about } = siteConfig;
  const { ref: contentRef, inView: contentIn } = useInView();
  const { ref: imageRef, inView: imageIn } = useInView();

  return (
    <section id="about" className="section-padding bg-primary">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className={`relative h-[400px] md:h-[560px] rounded-3xl overflow-hidden border border-border order-2 lg:order-1 fade-up ${
              imageIn ? "in-view" : ""
            }`}
          >
            {about.image ? (
              <Image
                src={about.image}
                alt="About our studio"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-surface to-primary flex items-center justify-center">
                <span className="text-9xl text-accent/10">✦</span>
              </div>
            )}
            <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-full bg-accent/20 blur-2xl" />
          </div>

          {/* Content */}
          <div
            ref={contentRef as React.RefObject<HTMLDivElement>}
            className={`order-1 lg:order-2 fade-up ${contentIn ? "in-view" : ""}`}
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
              About
            </p>
            <h2 className="heading-lg mb-8">{about.heading}</h2>

            <div className="space-y-4 mb-12">
              {about.paragraphs.map((para, i) => (
                <p key={i} className="text-muted leading-relaxed text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 gap-4">
              {about.stats.map((stat, i) => (
                <AnimatedStat key={i} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
