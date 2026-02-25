"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "../section-label";
import { StarRating } from "../star-rating";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  color: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "From strategy to execution, they nailed every detail. Communication was clear and the outcome blew us away.",
    name: "Sarah Lim",
    role: "Marketing Director",
    company: "NovaTech Labs",
    color: "#7C3AED",
  },
  {
    quote:
      "RYX transformed our billing system from chaos to clarity. Valoryx is a game-changer for our business.",
    name: "Rahul Menon",
    role: "CEO",
    company: "TradeFlow India",
    color: "#0EA5E9",
  },
  {
    quote:
      "The website they built for us doubled our conversion rate. Exceptional work.",
    name: "Priya Sharma",
    role: "Founder",
    company: "UrbanCraft Studio",
    color: "#EC4899",
  },
  {
    quote:
      "Their UI/UX strategy completely changed how our customers interact with our platform.",
    name: "David Chen",
    role: "CTO",
    company: "SkyBridge Analytics",
    color: "#16DD47",
  },
  {
    quote:
      "Best development team we've worked with. They deliver on time and exceed expectations.",
    name: "Amara Okafor",
    role: "Operations Lead",
    company: "GreenLeaf Global",
    color: "#F59E0B",
  },
  {
    quote:
      "Professional, creative, and incredibly responsive. Highly recommend RYX.",
    name: "James Wilson",
    role: "Director",
    company: "Atlas Ventures",
    color: "#EF4444",
  },
];

function AvatarIllustration({ name, color }: { name: string; color: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase();
  return (
    <div
      className="w-full h-full rounded-full flex items-center justify-center text-sm font-bold select-none"
      style={{
        background: `${color}25`,
        border: `1.5px solid ${color}60`,
        color,
      }}
    >
      {initials}
    </div>
  );
}

const quoteVariants = {
  enter: { opacity: 0, y: 20 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="ig-section-dark relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 ig-texture-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <SectionLabel
          text="The proof is in their words"
          variant="dark"
          className="mb-12 sm:mb-16"
        />

        {/* Avatar row */}
        <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-14">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActiveIndex(i)}
              className="relative shrink-0 focus:outline-none group"
              aria-label={`View testimonial from ${t.name}`}
            >
              <motion.div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden transition-all duration-300 ${
                  i === activeIndex
                    ? "ring-2 ring-white"
                    : "ring-1 ring-white/20 group-hover:ring-white/50"
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <AvatarIllustration name={t.name} color={t.color} />
              </motion.div>
              {i === activeIndex && (
                <motion.div
                  className="absolute -bottom-1.5 left-1/2 w-1.5 h-1.5 rounded-full bg-white"
                  layoutId="avatar-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Active testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            variants={quoteVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="max-w-3xl"
          >
            {/* Star rating */}
            <StarRating variant="yellow" className="gap-1 mb-6" />

            {/* Quote */}
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-medium italic leading-snug text-white mb-8">
              &ldquo;{active.quote}&rdquo;
            </blockquote>

            {/* Person */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                style={{ background: `${active.color}25`, border: `1.5px solid ${active.color}60`, color: active.color }}
              >
                {active.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
              </div>
              <div>
                <p className="text-base font-semibold text-white">{active.name}</p>
                <p className="text-sm text-white/50 mt-0.5">
                  {active.role}, {active.company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
