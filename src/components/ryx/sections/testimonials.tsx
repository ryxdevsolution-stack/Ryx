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
  location: string;
  color: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We were generating GST invoices manually in Excel — it took us 2 hours every evening. Valoryx cut that to under 15 minutes. The thermal print support alone was worth it for our counter billing.",
    name: "Karthik Rajendhiran",
    role: "Proprietor",
    company: "Sri Murugan Textiles",
    location: "Tirupur, TN",
    color: "#7C3AED",
  },
  {
    quote:
      "RYX built our entire clinic appointment and patient records system from scratch. The team understood our workflow on the first call and delivered exactly what we needed. No middlemen, direct access to the developers.",
    name: "Dr. Senthil Kumar",
    role: "Director",
    company: "LifeCare Diagnostics",
    location: "Coimbatore, TN",
    color: "#0EA5E9",
  },
  {
    quote:
      "Our old website had zero enquiries. Within three weeks of the new site going live, we were getting 8–10 WhatsApp leads a day. The SEO work they did actually shows results.",
    name: "Aravind Krishnamoorthy",
    role: "CEO",
    company: "GreenBuild Properties",
    location: "Bengaluru, KA",
    color: "#EC4899",
  },
  {
    quote:
      "I was sceptical about a small team handling our inventory across three branches. They not only built it — they trained our staff and stayed reachable for every small issue. That after-sales support is rare.",
    name: "Deepa Subramaniam",
    role: "Operations Head",
    company: "Spice Route Foods",
    location: "Chennai, TN",
    color: "#16DD47",
  },
  {
    quote:
      "The Meta ads campaign they ran for our Diwali collection brought in ₹3.2L in orders in the first week. ROI was 4.8x. They know what actually works for Indian buyers, not just theory.",
    name: "Lakshmi Chandrasekaran",
    role: "Founder",
    company: "Trendy Threads",
    location: "Chennai, TN",
    color: "#F59E0B",
  },
  {
    quote:
      "We needed e-invoicing compliance before the March deadline. RYX had Valoryx set up and our team trained in four days. That kind of turnaround saved us from a serious penalty situation.",
    name: "Mohan Das",
    role: "Managing Director",
    company: "Precision Parts India",
    location: "Coimbatore, TN",
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
    <section className="ig-section-dark relative py-20 sm:py-28 lg:py-36 overflow-hidden" aria-label="Client testimonials">
      <div className="absolute inset-0 ig-texture-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <SectionLabel
          text="What our clients say"
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
            aria-live="polite"
            aria-atomic="true"
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
                <p className="text-xs text-white/30 mt-0.5">{active.location}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
