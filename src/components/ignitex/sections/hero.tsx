"use client";

import { motion } from "framer-motion";
import { ScriptText } from "../script-text";
import { PillButton } from "../pill-button";

const SERVICES = [
  { num: "01", label: "Custom software development" },
  { num: "02", label: "Web & mobile applications" },
  { num: "03", label: "UI/UX strategy" },
  { num: "04", label: "Billing & CRM solutions" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-neutral-300 via-neutral-200 to-neutral-400 overflow-hidden">
      {/* Diagonal texture overlay */}
      <div className="absolute inset-0 ig-texture opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 min-h-screen flex flex-col justify-between">
        {/* Main heading */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-0">
            <motion.h1
              className="text-[clamp(3rem,12vw,12rem)] font-medium leading-[0.85] tracking-tight text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              Build
            </motion.h1>
            <motion.div
              className="text-[clamp(3rem,12vw,12rem)] font-medium leading-[0.85] tracking-tight text-white/30"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <ScriptText className="text-white/40">&</ScriptText>
            </motion.div>
            <motion.h1
              className="text-[clamp(3rem,12vw,12rem)] font-medium leading-[0.85] tracking-tight text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              Scale
            </motion.h1>
          </div>
        </div>

        {/* Bottom row - description + services */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-16 mt-8">
          {/* Left - tagline */}
          <motion.div
            className="max-w-sm space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              We turn bold ideas into standout products and scalable software.
              Let&apos;s bring your vision to life.
            </p>
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} RYX Dev Solutions
            </p>
          </motion.div>

          {/* Right - numbered services + CTA */}
          <motion.div
            className="flex flex-col items-start lg:items-end gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="space-y-3">
              {SERVICES.map((service) => (
                <div
                  key={service.num}
                  className="flex items-center gap-3 text-white/80"
                >
                  <span className="ig-script text-white/50 text-sm">
                    ({service.num})
                  </span>
                  <span className="text-base sm:text-lg font-medium">
                    {service.label}
                  </span>
                </div>
              ))}
            </div>

            <PillButton
              label="Let's work together"
              href="/contact"
              variant="dark"
              size="md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
