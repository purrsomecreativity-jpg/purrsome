"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { nav } = siteConfig;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/90 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container-wide px-6 md:px-12 lg:px-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/stocks/purrsome logo test.png"
            alt={nav.logo}
            width={140}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted hover:text-white link-underline transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href={nav.cta.href}
            className="bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            {nav.cta.label}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border px-6 py-6 flex flex-col gap-4">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base text-white hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            onClick={() => setMenuOpen(false)}
            className="bg-accent text-white text-sm font-semibold px-5 py-3 rounded-full text-center transition-colors"
          >
            {nav.cta.label}
          </a>
        </div>
      )}
    </header>
  );
}
