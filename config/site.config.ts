// ============================================================
//  SITE CONFIGURATION — edit everything here to customize your site
// ============================================================

export const siteConfig = {

  // ── Brand ────────────────────────────────────────────────
  name: "Purrsome",
  tagline: "We design experiences that move people.",
  description:
    "A creative design agency crafting bold identities, digital products, and unforgettable experiences.",

  // ── Theme ────────────────────────────────────────────────
  // Change these hex values to match your brand palette.
  // Then update tailwind.config.ts > theme.extend.colors to match.
  theme: {
    primary: "#0F0F0F",      // background / dark base
    accent: "#3e0085",       // brand accent (buttons, highlights)
    accentHover: "#2e0063",
    surface: "#1A1A1A",      // card backgrounds
    text: "#FFFFFF",
    muted: "#A0A0A0",        // secondary text
    border: "#2A2A2A",
  },

  // ── Navigation ───────────────────────────────────────────
  nav: {
    logo: "Purrsome",     // text logo (or swap for an <Image> in Navbar.tsx)
    links: [
      { label: "Work",       href: "#work" },
      { label: "Services",   href: "#services" },
      { label: "About",      href: "#about" },
      { label: "Contact",    href: "#contact" },
    ],
    cta: { label: "Let's Talk", href: "#contact" },
  },

  // ── Hero ─────────────────────────────────────────────────
  hero: {
    heading: "We design experiences\nthat move people.",
    subheading:
      "Brand identity · Web design · Motion · Product design",
    cta: { label: "See Our Work", href: "#work" },
    secondaryCta: { label: "Get in Touch", href: "#contact" },
    // Optional: path to a background image inside /public
    backgroundImage: "",
  },

  // ── Services ─────────────────────────────────────────────
  services: {
    heading: "What We Do",
    subheading: "From strategy to pixel-perfect execution.",
    items: [
      {
        icon: "✦",
        title: "Brand Identity",
        description:
          "Logo design, brand guidelines, typography, and color systems that tell your story.",
      },
      {
        icon: "◈",
        title: "Web Design & Development",
        description:
          "Fast, responsive, and beautiful websites built to convert and impress.",
      },
      {
        icon: "▶",
        title: "Motion & Animation",
        description:
          "Scroll animations, explainer videos, and micro-interactions that bring brands to life.",
      },
      {
        icon: "⬡",
        title: "Product Design (UI/UX)",
        description:
          "User-centered interfaces for apps and SaaS products that are delightful to use.",
      },
      {
        icon: "◉",
        title: "Art Direction",
        description:
          "Visual strategy and creative direction for campaigns, shoots, and content.",
      },
      {
        icon: "⊞",
        title: "Print & Packaging",
        description:
          "Tactile brand touchpoints — packaging, stationery, and editorial design.",
      },
    ],
  },

  // ── Portfolio / Work ─────────────────────────────────────
  work: {
    heading: "Selected Work",
    subheading: "A few projects we're proud of.",
    items: [
      {
        id: 1,
        title: "Forma Studio",
        category: "Brand Identity",
        image: "/images/project-1.jpg",  // add your image to /public/images/
        href: "#",
      },
      {
        id: 2,
        title: "Lune App",
        category: "Product Design",
        image: "/images/project-2.jpg",
        href: "#",
      },
      {
        id: 3,
        title: "Drift Coffee",
        category: "Packaging & Brand",
        image: "/images/project-3.jpg",
        href: "#",
      },
      {
        id: 4,
        title: "Parallax Magazine",
        category: "Art Direction",
        image: "/images/project-4.jpg",
        href: "#",
      },
    ],
  },

  // ── About ────────────────────────────────────────────────
  about: {
    heading: "About Us",
    paragraphs: [
      "Purrsome is an independent creative studio founded in 2020. We partner with forward-thinking brands and startups to create visual identities, digital experiences, and everything in between.",
      "Our team blends strategy, design, and technology — because great design solves real problems.",
    ],
    stats: [
      { value: "80+", label: "Projects Delivered" },
      { value: "40+", label: "Happy Clients" },
      { value: "6",   label: "Years of Experience" },
      { value: "12",  label: "Awards" },
    ],
    image: "/images/about.jpg",  // add your image to /public/images/
  },

  // ── Testimonials ─────────────────────────────────────────
  testimonials: {
    heading: "What Clients Say",
    items: [
      {
        quote:
          "Purrsome transformed our brand from generic to iconic. The attention to detail was outstanding.",
        author: "Sarah K.",
        role: "Founder, Forma Studio",
      },
      {
        quote:
          "Working with them felt effortless. They understood our vision from day one and delivered beyond our expectations.",
        author: "Marco L.",
        role: "CPO, Lune App",
      },
      {
        quote:
          "Our packaging redesign increased shelf pickup by 34%. The ROI speaks for itself.",
        author: "Jenna M.",
        role: "Marketing Director, Drift Coffee",
      },
    ],
  },

  // ── Contact ──────────────────────────────────────────────
  contact: {
    heading: "Let's Work Together",
    subheading:
      "Tell us about your project and we'll get back to you within 24 hours.",
    email: "hello@studionova.com",
    phone: "+1 (555) 000-0000",
    location: "New York, NY",
    formspreeEndpoint: "", // optional: add your Formspree endpoint to enable the form
  },

  // ── Footer ───────────────────────────────────────────────
  footer: {
    tagline: "Designing tomorrow, today.",
    socials: [
      { label: "Instagram", href: "https://instagram.com/" },
      { label: "Dribbble",  href: "https://dribbble.com/" },
      { label: "LinkedIn",  href: "https://linkedin.com/" },
      { label: "Twitter",   href: "https://twitter.com/" },
    ],
    copyright: "© 2025 Purrsome. All rights reserved.",
  },
};

export type SiteConfig = typeof siteConfig;
