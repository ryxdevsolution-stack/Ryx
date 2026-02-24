"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "../section-label";
import { PillButton } from "../pill-button";

const CLIENT_NAMES = [
  "Norway", "Cactus", "Waveless", "Onyx Labs", "Pulsar", "Verdant",
  "Nimbus", "Helix", "Stratos", "Cobalt", "Ember", "Aether",
];

function LogoCard({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center h-14 px-8 rounded-full border border-ig-white-10 bg-ig-white-3 select-none">
      <span className="text-sm font-medium tracking-wide text-ig-text-light-muted whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({
  direction = "left",
  speed = "normal",
}: {
  direction?: "left" | "right";
  speed?: "normal" | "slow";
}) {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  const durationStyle =
    speed === "slow" ? { animationDuration: "45s" } : undefined;

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-4 w-max ${animationClass}`}
        style={durationStyle}
        aria-hidden
      >
        {[...CLIENT_NAMES, ...CLIENT_NAMES].map((name, i) => (
          <LogoCard key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}

export function ClientLogosSection() {
  return (
    <section className="ig-section-dark relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 ig-texture-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <SectionLabel text="Trusted by the visionaries" variant="dark" />
          <p className="mt-6 ig-heading-3 max-w-3xl text-white leading-relaxed">
            Together, we build impactful experiences,{" "}
            <span className="text-ig-text-light-muted">lasting</span>{" "}
            relationships, and digital solutions that move businesses forward.
          </p>
        </motion.div>

        {/* Marquee rows */}
        <div className="space-y-4 mb-14 sm:mb-20">
          <MarqueeRow direction="left" />
          <MarqueeRow direction="right" speed="slow" />
        </div>

        {/* Bottom: counter + CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="ig-card-dark px-8 py-6 flex items-center gap-5">
            <span className="text-5xl sm:text-6xl font-semibold tracking-tight text-white">
              10+
            </span>
            <span className="text-sm text-ig-text-light-muted leading-tight max-w-[6rem]">
              Trusted clients
            </span>
          </div>

          <PillButton label="Join us now" href="/contact" variant="dark" size="md" />
        </motion.div>
      </div>
    </section>
  );
}
