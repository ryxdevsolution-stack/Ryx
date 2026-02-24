"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "../section-label";
import { ScriptText } from "../script-text";
import { PillButton } from "../pill-button";
import { EASE_STANDARD } from "../motion";

const PROJECTS = [
  {
    title: "Valoryx",
    category: "Billing SaaS",
    description:
      "GST-compliant billing software for Indian retailers. Offline + cloud sync. Thermal printer support. Built with Next.js and Supabase.",
    tags: ["Next.js", "Supabase", "SQLite", "TypeScript"],
    href: "https://mj-billing.vercel.app/landing",
    external: true,
  },
  {
    title: "RYX Website",
    category: "Web Development",
    description:
      "Company landing page with scroll animations, AI chatbot (RAVEN), and full SEO setup. Designed and built in-house.",
    tags: ["Next.js", "Framer Motion", "Three.js", "Tailwind CSS"],
    href: "/portfolio",
    external: false,
  },
];

export function PortfolioTeaserSection() {
  return (
    <section className="ig-section-dark relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 ig-texture-dark" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel text="Selected work" variant="dark" />
            <motion.h2
              className="mt-5 ig-heading-1 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE_STANDARD }}
            >
              Work that <ScriptText>Speaks</ScriptText>
            </motion.h2>
          </div>
          <PillButton
            label="View all projects"
            href="/portfolio"
            variant="dark"
            size="md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              className="ig-card-dark overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_STANDARD }}
              whileHover={{ y: -4 }}
            >
              {/* Green accent bar */}
              <div className="h-1 w-full bg-ig-green" />
              <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-ig-text-light-muted mb-1">
                      {p.category}
                    </p>
                    <h3 className="text-2xl font-semibold text-white">
                      {p.title}
                    </h3>
                  </div>
                  <Link
                    href={p.href}
                    target={p.external ? "_blank" : undefined}
                    rel={p.external ? "noopener noreferrer" : undefined}
                    className="w-9 h-9 rounded-full bg-ig-white-10 hover:bg-white hover:text-black flex items-center justify-center text-white transition-colors duration-300 flex-shrink-0"
                    aria-label={`Open ${p.title}`}
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
                <p className="text-sm text-ig-text-light-muted leading-relaxed mb-5">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-ig-white-10 text-ig-text-light-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
