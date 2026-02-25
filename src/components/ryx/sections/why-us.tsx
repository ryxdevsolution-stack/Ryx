"use client";

import { motion } from "framer-motion";
import { DollarSign, Clock, Wrench, Target } from "lucide-react";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import { SectionLabel } from "../section-label";
import { CinematicHeading } from "../cinematic-heading";
import { SectionReveal } from "../section-reveal";
import { makeStaggerParent, FADE_UP_CHILD, SLIDE_UP_CHILD, POP_CHILD } from "../motion";


const HIGHLIGHT_STATS = [
  { value: "15+", label: "Projects shipped" },
  { value: "98%", label: "Satisfied clients" },
  { value: "3×", label: "Faster delivery" },
];

const headerParent = makeStaggerParent(0.1, 0);
const bentoParent = makeStaggerParent(0.1, 0.15);
const statsParent = makeStaggerParent(0.08, 0.35);

export function WhyUsSection() {
  return (
    <ParallaxBanner className="ig-section-white">
      {/* Background texture */}
      <ParallaxBannerLayer
        translateY={[-18, 18]}
        scale={[1.07, 1]}
        shouldAlwaysCompleteAnimation
        className="ig-texture opacity-50"
      />

      {/* Content */}
      <div className="relative z-10 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <SectionReveal
            variants={headerParent}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14"
            amount={0.2}
          >
            <div>
              <motion.div variants={FADE_UP_CHILD}>
                <SectionLabel text="Why teams choose RYX" variant="light" />
              </motion.div>
              <motion.div variants={FADE_UP_CHILD} className="mt-5">
                <CinematicHeading className="ig-heading-1" variant="light" delay={0}>
                  Your brand Deserves better
                </CinematicHeading>
              </motion.div>
            </div>
            <motion.div variants={FADE_UP_CHILD}>
              <p className="text-sm text-neutral-400 max-w-xs leading-relaxed text-right hidden sm:block">
                We built RYX because great digital products shouldn&apos;t require a Fortune 500 budget.
              </p>
            </motion.div>
          </SectionReveal>

          {/* Bento grid */}
          <SectionReveal
            variants={bentoParent}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
            amount={0.1}
          >
            {/* Cost Effective — tall left card */}
            <motion.div
              variants={SLIDE_UP_CHILD}
              className="lg:col-span-2 lg:row-span-2 bg-black text-white rounded-2xl p-8 flex flex-col justify-between min-h-[280px] group relative overflow-hidden"
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ig-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-ig-green/20 flex items-center justify-center mb-6">
                  <DollarSign size={18} className="text-ig-green" />
                </div>
                <p className="text-xs text-ig-green font-mono mb-3">/ cost-effective</p>
                <h3 className="text-2xl sm:text-3xl font-semibold leading-snug mb-4">
                  Premium quality without<br />the agency price tag.
                </h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-sm">
                  We keep our team lean and our processes tight so every rupee you invest goes into your product — not overhead.
                </p>
              </div>
              <div className="relative z-10 mt-8 h-px w-full bg-gradient-to-r from-ig-green/50 to-transparent" />
            </motion.div>

            {/* Always-on Support */}
            <motion.div
              variants={SLIDE_UP_CHILD}
              className="bg-neutral-50 border border-neutral-200 rounded-2xl p-7 flex flex-col gap-4 group relative overflow-hidden"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center">
                <Clock size={16} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono mb-2">/ always-on</p>
                <h3 className="text-lg font-semibold text-black leading-snug">We&apos;re in your timezone.</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mt-2">
                  Real humans, fast replies. No ticketing queues or 48-hour SLAs.
                </p>
              </div>
            </motion.div>

            {/* Best-in-class Tools */}
            <motion.div
              variants={SLIDE_UP_CHILD}
              className="bg-neutral-50 border border-neutral-200 rounded-2xl p-7 flex flex-col gap-4 group relative overflow-hidden"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center">
                <Wrench size={16} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono mb-2">/ best tools</p>
                <h3 className="text-lg font-semibold text-black leading-snug">Modern stack, no legacy baggage.</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mt-2">
                  Next.js, Supabase, Tailwind — the same tools powering the fastest-growing products today.
                </p>
              </div>
            </motion.div>

            {/* Strategic Focus — wide bottom card */}
            <motion.div
              variants={SLIDE_UP_CHILD}
              className="lg:col-span-2 bg-neutral-900 text-white rounded-2xl p-7 flex flex-col sm:flex-row items-start gap-6 group relative overflow-hidden"
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Target size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-mono mb-2">/ strategy-first</p>
                <h3 className="text-xl font-semibold leading-snug mb-2">We think before we build.</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Discovery → wireframe → build. We validate your idea before writing a single line of production code.
                </p>
              </div>
            </motion.div>
          </SectionReveal>

          {/* Inline stat strip */}
          <SectionReveal
            variants={statsParent}
            className="flex flex-wrap justify-center gap-8 sm:gap-16 pt-4 border-t border-neutral-100"
            amount={0.2}
          >
            {HIGHLIGHT_STATS.map((s) => (
              <motion.div key={s.label} variants={POP_CHILD} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-black">{s.value}</p>
                <p className="text-xs text-neutral-400 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </SectionReveal>

        </div>
      </div>
    </ParallaxBanner>
  );
}
