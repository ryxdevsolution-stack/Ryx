"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "../section-label";
import { Compass, Code, Rocket, Sparkles } from "lucide-react";

const STEPS = [
  {
    title: "Discover & Define",
    description:
      "We dive deep into your goals, audience, and brand to uncover insights and define a clear direction.",
    icon: Compass,
    icons: [Sparkles, Sparkles, Sparkles],
  },
  {
    title: "Design & Build",
    description:
      "With strategy in place, we craft stunning visuals and high-performing digital solutions tailored to your needs.",
    icon: Code,
    icons: [Sparkles, Sparkles, Sparkles],
  },
  {
    title: "Launch & Grow",
    description:
      "We bring your vision to life, optimize for performance, and support your ongoing success post-launch.",
    icon: Rocket,
    icons: [Sparkles, Sparkles, Sparkles],
  },
];

export function ProcessSection() {
  return (
    <section className="relative bg-white text-black overflow-hidden">
      <div className="absolute inset-0 ig-texture" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        {/* Section header */}
        <div className="text-center mb-16">
          <SectionLabel text="From concept to launch" variant="light" className="justify-center mb-6" />
          <motion.h2
            className="ig-heading-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Your ideas transform into
            <br />
            brand stories
          </motion.h2>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="ig-card-light p-6 sm:p-8 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Star decorations */}
              <div className="flex items-center gap-1 mb-4">
                {step.icons.map((Icon, j) => (
                  <Icon
                    key={j}
                    size={j === 0 ? 16 : j === 1 ? 20 : 14}
                    className={j === 2 ? "text-ig-text-muted/40" : "text-ig-text-muted"}
                  />
                ))}
              </div>

              {/* Title */}
              <h3 className="ig-heading-3 mb-6">{step.title}</h3>

              {/* Icon illustration */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mb-6">
                <step.icon
                  size={64}
                  strokeWidth={1}
                  className="text-black/80"
                />
              </div>

              {/* Description */}
              <p className="text-ig-text-muted text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
