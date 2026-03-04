"use client";

import { motion } from "framer-motion";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import { SectionLabel } from "../section-label";
import { PillButton } from "../pill-button";
import { CinematicHeading } from "../cinematic-heading";
import { SectionReveal } from "../section-reveal";
import { makeStaggerParent, FADE_UP_CHILD, SLIDE_UP_CHILD } from "../motion";

const STORY_STATS = [
  {
    id: "founded",
    value: "2025",
    label: "The year we stopped waiting and started building",
  },
  {
    id: "products",
    value: "4 Products",
    label: "Each one harder and more ambitious than the last",
  },
  {
    id: "goal",
    value: "∞",
    label: "What we're aiming for — products used by millions",
  },
] as const;

const leftParent = makeStaggerParent(0.12, 0);
const rightParent = makeStaggerParent(0.14, 0.25);

export function ManifestoSection() {
  return (
    <ParallaxBanner className="ig-section-dark">
      {/* Ambient green glow — top-left */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(0,255,100,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Background texture */}
      <ParallaxBannerLayer
        translateY={[-20, 20]}
        scale={[1.08, 1]}
        shouldAlwaysCompleteAnimation
        className="ig-texture-dark"
      />

      {/* Content */}
      <div className="relative z-10 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* LEFT — Pull quote */}
            <SectionReveal variants={leftParent} amount={0.2}>
              <motion.div variants={FADE_UP_CHILD}>
                <SectionLabel text="Our story" variant="dark" className="mb-6" />
              </motion.div>

              {/* Green accent line */}
              <motion.div
                variants={FADE_UP_CHILD}
                className="h-px bg-ig-green mb-8"
                style={{ transformOrigin: "left" }}
              />

              <motion.div variants={FADE_UP_CHILD} className="mb-8">
                <CinematicHeading
                  className="ig-heading-1 text-white"
                  variant="dark"
                  delay={0}
                >
                  We started small. We&apos;re building something that lasts.
                </CinematicHeading>
              </motion.div>

              <motion.p
                variants={FADE_UP_CHILD}
                className="text-ig-text-light-muted text-base sm:text-lg leading-relaxed mb-10 max-w-md"
              >
                Three developers. One obsession. Build products that actually work.
              </motion.p>

              <motion.div variants={FADE_UP_CHILD}>
                <PillButton
                  label="Our story"
                  href="/about"
                  variant="dark"
                  size="md"
                />
              </motion.div>
            </SectionReveal>

            {/* RIGHT — Narrative stats */}
            <SectionReveal
              variants={rightParent}
              className="flex flex-col gap-0"
              amount={0.15}
            >
              {STORY_STATS.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  variants={SLIDE_UP_CHILD}
                  className={`flex items-start gap-6 py-8 ${
                    i < STORY_STATS.length - 1
                      ? "border-b border-ig-white-10"
                      : ""
                  }`}
                >
                  {/* Value */}
                  <div className="min-w-[100px] sm:min-w-[120px]">
                    <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      {stat.value}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-px self-stretch bg-ig-green opacity-50 flex-shrink-0" />

                  {/* Label */}
                  <p className="text-sm sm:text-base text-ig-text-light-muted leading-relaxed pt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </SectionReveal>

          </div>
        </div>
      </div>
    </ParallaxBanner>
  );
}
