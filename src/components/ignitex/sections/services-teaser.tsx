"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Palette, Receipt } from "lucide-react";
import { SectionLabel } from "../section-label";
import { ScriptText } from "../script-text";
import { PillButton } from "../pill-button";
import { EASE_STANDARD } from "../motion";

const SERVICES = [
  {
    icon: Receipt,
    title: "Billing & CRM Software",
    desc: "GST-compliant Valoryx billing — works offline, syncs to cloud.",
  },
  {
    icon: Code2,
    title: "Web Applications",
    desc: "Next.js & React apps. Fast, SEO-optimized, production-ready.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "React Native for Android & iOS. One codebase, two platforms.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Figma-first design. Clean interfaces that convert visitors.",
  },
];

export function ServicesTeaserSection() {
  return (
    <section className="ig-section-white relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 ig-texture opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel text="What we do" variant="light" />
            <motion.h2
              className="mt-5 ig-heading-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE_STANDARD }}
            >
              Services that <ScriptText>Scale</ScriptText>
            </motion.h2>
          </div>
          <PillButton label="See all services" href="/services" variant="dark" size="md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="ig-card-light p-6 flex flex-col gap-4 group hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_STANDARD }}
              whileHover={{ y: -4 }}
            >
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                <s.icon size={18} className="text-white" />
              </div>
              <h3 className="text-base font-semibold leading-snug">{s.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
