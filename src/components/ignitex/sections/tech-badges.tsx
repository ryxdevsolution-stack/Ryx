"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "../section-label";
import { SITE_CONFIG } from "@/lib/site-config";
import { EASE_STANDARD } from "../motion";

export function TechBadgesSection() {
  const techs = SITE_CONFIG.technologies;

  return (
    <section className="ig-section-white relative py-14 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 ig-texture opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE_STANDARD }}
        >
          <SectionLabel text="Technologies we build with" variant="light" />

          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-5 py-2.5 rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-600 hover:border-black hover:text-black transition-colors duration-300 cursor-default shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: EASE_STANDARD }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <p className="text-sm text-neutral-400 text-center max-w-xs">
            Production-grade tools trusted by teams worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
