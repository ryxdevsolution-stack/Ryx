"use client";

import { motion } from "framer-motion";
import { PillButton } from "../pill-button";

export function AboutDetailSection() {
  return (
    <section className="relative ig-section-light overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 ig-texture" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.p
            className="ig-heading-3 text-ig-text-muted leading-relaxed mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            We&apos;re not just designers or developers &mdash; we&apos;re{" "}
            <strong className="text-black font-semibold">storytellers</strong>,
            problem-solvers, and{" "}
            <strong className="text-black font-semibold">brand builders</strong>.
            Blending bold creativity with strategy, we craft experiences that
            connect, convert, and stand out in a{" "}
            <strong className="text-black font-semibold">crowded digital</strong>{" "}
            world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <PillButton
              label="View our work"
              href="/portfolio"
              variant="dark"
              size="lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
