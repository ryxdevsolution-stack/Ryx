"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "../section-label";
import { PillButton } from "../pill-button";
import { SITE_CONFIG } from "@/lib/site-config";
import { CinematicHeading } from "../cinematic-heading";

// Parse "15+" → {value: 15, suffix: "+"}  |  "98%" → {value: 98, suffix: "%"}
function parseStat(raw: string): { value: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { value: 0, suffix: raw };
  return { value: parseInt(match[1], 10), suffix: match[2] };
}

const STAT_DESCRIPTIONS: Record<string, string> = {
  "Projects Delivered": "Projects delivered with bold strategy and sharp precision.",
  "Client Satisfaction": "Clients stay for our unmatched quality and proven results.",
  "Core Team Members": "Dedicated experts who own every project from start to launch.",
  "Founded": "Building impactful software since our founding year.",
};

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const startTime = performance.now();
    let frameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
    >
      {count}
      <span className="text-3xl sm:text-4xl font-normal text-ig-text-muted">
        {suffix}
      </span>
    </div>
  );
}

export function MetricsSection() {
  return (
    <section className="relative bg-white text-black overflow-hidden">
      <div className="absolute inset-0 ig-texture" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - heading */}
          <div>
            <SectionLabel
              text="Our track record"
              variant="light"
              className="mb-6"
            />
            <CinematicHeading className="ig-heading-1 mb-8" variant="light" delay={0.1}>
              Metrics that Prove value
            </CinematicHeading>
            <PillButton
              label="Know more about us"
              href="/about"
              variant="dark"
              size="md"
            />
          </div>

          {/* Right - metric grid */}
          <div className="grid grid-cols-1 gap-8">
            {SITE_CONFIG.stats.map((stat, i) => {
              const { value, suffix } = parseStat(stat.value);
              const description =
                STAT_DESCRIPTIONS[stat.label] ?? `${stat.label} — measured by real results.`;
              return (
                <motion.div
                  key={`${stat.value}-${stat.label}`}
                  className="flex items-start gap-6 pb-8 border-b border-ig-border-light last:border-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <AnimatedCounter value={value} suffix={suffix} />
                  <p className="text-ig-text-muted text-sm sm:text-base leading-relaxed pt-2 max-w-xs">
                    {description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
