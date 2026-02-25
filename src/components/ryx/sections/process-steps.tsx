"use client";

import { motion } from "framer-motion";
import { Search, Layers, Rocket } from "lucide-react";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import { SectionLabel } from "../section-label";
import { CinematicHeading } from "../cinematic-heading";
import { SectionReveal } from "../section-reveal";
import { makeStaggerParent, FADE_UP_CHILD, SLIDE_UP_CHILD } from "../motion";

const STEPS = [
  {
    number: "01",
    title: "Discover & Define",
    description:
      "We dive deep into your goals, audience, and market to uncover insights and define a clear direction for your project.",
    icons: [Search, Layers, Rocket],
  },
  {
    number: "02",
    title: "Design & Build",
    description:
      "With strategy in place, we craft stunning visuals and high-performing digital solutions tailored precisely to your needs.",
    icons: [Layers, Search, Rocket],
  },
  {
    number: "03",
    title: "Launch & Grow",
    description:
      "We bring your vision to life, optimise for performance, and support your ongoing success every step post-launch.",
    icons: [Rocket, Layers, Search],
  },
];

const headerParent = makeStaggerParent(0.1, 0);
const stepsParent = makeStaggerParent(0.15, 0.2);

export function ProcessStepsSection() {
  return (
    <ParallaxBanner className="ig-section-dark">
      <ParallaxBannerLayer
        translateY={[-18, 18]}
        scale={[1.07, 1]}
        shouldAlwaysCompleteAnimation
        className="ig-texture-dark"
      />

      <div className="relative z-10 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <SectionReveal
            variants={headerParent}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16"
            amount={0.2}
          >
            <div>
              <motion.div variants={FADE_UP_CHILD}>
                <SectionLabel text="From concept to launch" variant="dark" />
              </motion.div>
              <motion.div variants={FADE_UP_CHILD} className="mt-5">
                <CinematicHeading className="ig-heading-1 text-white" variant="dark" delay={0}>
                  Your ideas into Reality
                </CinematicHeading>
              </motion.div>
            </div>
            <motion.div variants={FADE_UP_CHILD}>
              <p className="text-sm text-white/50 max-w-xs leading-relaxed text-right hidden sm:block">
                transform stories
              </p>
            </motion.div>
          </SectionReveal>

          {/* Steps grid */}
          <SectionReveal
            variants={stepsParent}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            amount={0.1}
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                variants={SLIDE_UP_CHILD}
                className="ig-card-dark p-7 flex flex-col gap-6 group relative overflow-hidden"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {/* Step number — large ghost background */}
                <span className="absolute -top-4 -right-2 text-[7rem] font-black text-white/[0.04] leading-none select-none pointer-events-none">
                  {step.number}
                </span>

                {/* Icon cluster */}
                <div className="flex items-center gap-2">
                  {step.icons.map((Icon, j) => (
                    <div
                      key={Icon.displayName ?? Icon.name ?? j}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        j === 0
                          ? "bg-ig-green/20 text-ig-green"
                          : "bg-ig-white-5 text-white/40"
                      }`}
                    >
                      <Icon size={14} />
                    </div>
                  ))}
                  {/* Connector line for non-last cards */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 w-6 h-px bg-ig-white-10 z-10" />
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <p className="text-xs text-ig-green font-mono">({step.number})</p>
                  <h3 className="text-xl font-semibold text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="h-px w-full bg-gradient-to-r from-ig-green/40 to-transparent" />
              </motion.div>
            ))}
          </SectionReveal>

        </div>
      </div>
    </ParallaxBanner>
  );
}
