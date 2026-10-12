"use client";

import { Star, X } from "lucide-react";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  accent?: string;
  avatar?: string;
}

export interface ReviewFormLabels {
  cta: string;
  title: string;
  name: string;
  business: string;
  rating: string;
  message: string;
  send: string;
  sending: string;
  thanks: string;
  error: string;
}

export interface AnimatedTestimonialsProps {
  title: string;
  subtitle: string;
  badgeText?: string;
  testimonials: Testimonial[];
  autoRotateInterval?: number;
  className?: string;
  reviewLabels?: ReviewFormLabels;
}

const NEON = "#DA1460";
const STREET = "#F5B400";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function AnimatedTestimonials({
  title,
  subtitle,
  badgeText,
  testimonials,
  autoRotateInterval = 7000,
  className,
  reviewLabels,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [review, setReview] = useState({ name: "", business: "", rating: 5, message: "" });
  const [reviewState, setReviewState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewState("sending");
    try {
      const res = await fetch("https://formspree.io/f/mvzbyopz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ form: "review", _subject: "Nueva review para purrsomecreate.com", ...review }),
      });
      setReviewState(res.ok ? "sent" : "error");
    } catch {
      setReviewState("error");
    }
  };

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoRotateInterval);
    return () => clearInterval(interval);
  }, [autoRotateInterval, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section ref={sectionRef} id="testimonials" className={`relative z-10 overflow-hidden py-20 md:py-28 ${className || ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 lg:gap-24"
        >
          {/* Izquierda: titulo y navegacion */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-6">
              {badgeText && (
                <div
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
                  style={{ background: `${NEON}1A`, color: NEON }}
                >
                  <Star className="mr-1 h-3.5 w-3.5" style={{ fill: NEON }} />
                  <span>{badgeText}</span>
                </div>
              )}

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h2>

              <p className="max-w-[600px] text-white/35 md:text-xl/relaxed">{subtitle}</p>

              <div className="flex items-center gap-3 pt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: activeIndex === index ? 40 : 10,
                      background: activeIndex === index ? NEON : "rgba(255,255,255,0.15)",
                    }}
                    aria-label={`Ver testimonio ${index + 1}`}
                  />
                ))}
              </div>

              {reviewLabels && (
                <button
                  type="button"
                  onClick={() => { setReviewOpen(true); setReviewState("idle"); }}
                  className="mt-2 w-fit rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-[#DA1460]/60 hover:text-white hover:shadow-[0_0_24px_rgba(218,20,96,0.2)]"
                >
                  {reviewLabels.cta}
                </button>
              )}
            </div>
          </motion.div>

          {/* Derecha: cards */}
          <motion.div variants={itemVariants} className="relative mr-0 h-full min-h-[380px] md:mr-10 md:min-h-[430px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  scale: activeIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ zIndex: activeIndex === index ? 10 : 0, pointerEvents: activeIndex === index ? "auto" : "none" }}
              >
                <div
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/40 p-6 md:p-8"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,246,236,0.92) 0%, rgba(250,240,226,0.85) 55%, rgba(244,231,212,0.9) 100%)",
                    backdropFilter: "blur(22px) saturate(1.6)",
                    WebkitBackdropFilter: "blur(22px) saturate(1.6)",
                    boxShadow:
                      "0 26px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.75), inset 0 -1px 0 rgba(120,90,60,0.12)",
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 28%, transparent 55%)" }}
                  />
                  <div className="relative mb-5 flex gap-2">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-5 w-5" style={{ fill: STREET, color: STREET }} />
                      ))}
                  </div>

                  <div className="relative z-10 mb-5 flex-1 overflow-y-auto">
                    <p className="relative z-10 text-[15px] font-medium leading-relaxed text-[#1A1208]/85 md:text-base">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </div>

                  <div className="relative my-4 h-px w-full shrink-0 bg-[#1A1208]/10" />

                  <div className="relative flex shrink-0 items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/60 text-base font-bold text-white shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
                      style={{ background: testimonial.accent ?? NEON }}
                    >
                      {testimonial.avatar ? (
                        <img src={testimonial.avatar} alt={testimonial.name} className="h-full w-full object-cover" />
                      ) : (
                        testimonial.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A1208]">{testimonial.name}</h3>
                      <p className="text-sm text-[#1A1208]/50">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

          </motion.div>
        </motion.div>
      </div>

      {/* Modal: deja tu review */}
      {reviewLabels && reviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4 backdrop-blur-sm" onClick={() => setReviewOpen(false)}>
          <div
            className="relative w-full max-w-lg rounded-3xl border border-white/[0.12] p-6 sm:p-8"
            style={{
              background: "linear-gradient(145deg, rgba(14,14,18,0.95) 0%, rgba(10,10,14,0.92) 100%)",
              backdropFilter: "blur(24px) saturate(1.5)",
              WebkitBackdropFilter: "blur(24px) saturate(1.5)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" onClick={() => setReviewOpen(false)} className="absolute right-4 top-4 text-white/40 transition-colors hover:text-white" aria-label="Cerrar">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-extrabold text-white">{reviewLabels.title}</h3>

            {reviewState === "sent" ? (
              <p className="mt-6 text-white/70">{reviewLabels.thanks}</p>
            ) : (
              <form onSubmit={submitReview} className="mt-6 space-y-4">
                <input type="text" required placeholder={reviewLabels.name} value={review.name} onChange={(e) => setReview({ ...review, name: e.target.value })} className="frm-input-liquid w-full rounded-xl px-5 py-4 text-sm" />
                <input type="text" placeholder={reviewLabels.business} value={review.business} onChange={(e) => setReview({ ...review, business: e.target.value })} className="frm-input-liquid w-full rounded-xl px-5 py-4 text-sm" />
                <div>
                  <span className="mb-2 block text-sm text-white/50">{reviewLabels.rating}</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setReview({ ...review, rating: n })} aria-label={`${n} estrellas`}>
                        <Star
                          className="h-7 w-7 transition-transform hover:scale-110"
                          style={{ fill: n <= review.rating ? STREET : "transparent", color: n <= review.rating ? STREET : "rgba(255,255,255,0.25)" }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea required rows={4} placeholder={reviewLabels.message} value={review.message} onChange={(e) => setReview({ ...review, message: e.target.value })} className="frm-input-liquid w-full resize-none rounded-xl px-5 py-4 text-sm" />
                <button
                  type="submit"
                  disabled={reviewState === "sending"}
                  className="w-full rounded-xl bg-[#DA1460] py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(218,20,96,0.35)] disabled:opacity-60"
                >
                  {reviewState === "sending" ? reviewLabels.sending : reviewState === "error" ? reviewLabels.error : reviewLabels.send}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default AnimatedTestimonials;
