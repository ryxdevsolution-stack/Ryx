"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "../section-label";
import { ScriptText } from "../script-text";
import { PillButton } from "../pill-button";

interface Metric {
  value: number;
  suffix: string;
  description: string;
}

const METRICS: Metric[] = [
  {
    value: 15,
    suffix: "+",
    description: "Projects delivered with bold strategy and sharp precision.",
  },
  {
    value: 98,
    suffix: "%",
    description:
      "Clients stay for our unmatched quality and proven results.",
  },
  {
    value: 10,
    suffix: "+",
    description: "Building impactful brands that perform globally.",
  },
  {
    value: 10,
    suffix: "+",
    description:
      "Trusted by visionary brands who value design and results.",
  },
];

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
    <div ref={ref} className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
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
            <SectionLabel text="Our track record" variant="light" className="mb-6" />
            <motion.h2
              className="ig-heading-1 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Metrics that
              <br />
              <ScriptText>Prove</ScriptText> value
            </motion.h2>
            <PillButton
              label="Know more about us"
              href="/about"
              variant="dark"
              size="md"
            />
          </div>

          {/* Right - metric grid */}
          <div className="grid grid-cols-1 gap-8">
            {METRICS.map((metric, i) => (
              <motion.div
                key={`${metric.value}-${metric.suffix}`}
                className="flex items-start gap-6 pb-8 border-b border-ig-border-light last:border-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                />
                <p className="text-ig-text-muted text-sm sm:text-base leading-relaxed pt-2 max-w-xs">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
