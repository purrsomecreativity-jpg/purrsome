"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { siteConfig } from "@/config/site.config";

export default function Contact() {
  const { contact } = siteConfig;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { ref: leftRef, inView: leftIn } = useInView();
  const { ref: rightRef, inView: rightIn } = useInView();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!contact.formspreeEndpoint) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(contact.formspreeEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const info = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    { label: "Location", value: contact.location, href: undefined },
  ];

  return (
    <section id="contact" className="section-padding bg-primary">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className={`fade-up ${leftIn ? "in-view" : ""}`}
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </p>
            <h2 className="heading-lg mb-6">{contact.heading}</h2>
            <p className="text-muted mb-10 max-w-md leading-relaxed">{contact.subheading}</p>

            <div className="space-y-8">
              {info.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-widest text-muted">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white hover:text-accent transition-colors text-lg font-semibold"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white text-lg font-semibold">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form
            ref={rightRef as React.RefObject<HTMLFormElement>}
            onSubmit={handleSubmit}
            className={`space-y-5 fade-up ${rightIn ? "in-view" : ""}`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-muted mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-muted mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-xs uppercase tracking-widest text-muted mb-2">
                Service
              </label>
              <select
                id="service"
                name="service"
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none"
              >
                <option value="">Select a service</option>
                {siteConfig.services.items.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-widest text-muted mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell us about your project..."
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Message Sent!"
                : "Send Message"}
            </button>

            {status === "error" && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
