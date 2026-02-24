"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/ignitex/navbar";
import { SectionLabel } from "@/components/ignitex/section-label";
import { ScriptText } from "@/components/ignitex/script-text";
import { PillButton } from "@/components/ignitex/pill-button";
import { EASE_STANDARD } from "@/components/ignitex/motion";

const ContactCTASection = dynamic(
  () =>
    import("@/components/ignitex/sections/contact-cta").then((m) => ({
      default: m.ContactCTASection,
    })),
  { loading: () => <div className="min-h-[50vh] bg-ig-dark" /> }
);

const Footer = dynamic(
  () =>
    import("@/components/ignitex/sections/footer").then((m) => ({
      default: m.Footer,
    })),
  { loading: () => <div className="min-h-[40vh] bg-ig-dark" /> }
);

interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  features: string[];
  technologies: string[];
  href: string;
  external: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Valoryx",
    subtitle: "GST Billing Software",
    category: "Full Stack SaaS",
    description:
      "A complete billing and inventory management system for Indian retail businesses. Works offline with SQLite, syncs to cloud via Supabase. GST-compliant invoicing, real-time inventory tracking, payment management, audit logs, and thermal printer support — all without an internet connection.",
    features: ["Offline + Cloud sync", "GST Compliant", "Thermal Printer"],
    technologies: ["Next.js", "Supabase", "SQLite", "Tailwind CSS"],
    href: "https://mj-billing.vercel.app/landing",
    external: true,
  },
  {
    id: 2,
    title: "RYX Website",
    subtitle: "Company Landing Page",
    category: "Web Development",
    description:
      "A modern, animated company website built with Next.js. Features scroll animations, an AI chatbot (RAVEN), SEO optimization, and a full inquiry form wired to email. Designed and built entirely in-house.",
    features: ["AI Chatbot", "3D Particles", "SEO Optimized"],
    technologies: ["Next.js", "Framer Motion", "Three.js", "Tailwind CSS"],
    href: "/",
    external: false,
  },
];

const HERO_STATS = [
  { value: "15+", label: "Projects" },
  { value: "1", label: "Live SaaS" },
  { value: "10+", label: "Technologies" },
] as const;

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Section 1: Hero ───────────────────────────────────────────── */}
        <section className="ig-section-dark relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 ig-texture-dark" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="Our work" variant="dark" />

            <motion.h1
              className="ig-heading-1 mt-6 max-w-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_STANDARD }}
            >
              Real Projects,{" "}
              <ScriptText>Real Results</ScriptText>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE_STANDARD }}
            >
              Projects we&apos;ve actually built and shipped — no stock images,
              no fake metrics.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className="flex flex-wrap gap-8 mt-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE_STANDARD }}
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-ig-text-light-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Section 2: Projects grid ────────────────────────────────────── */}
        <section className="ig-section-white py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="Featured projects" variant="light" />

            <motion.h2
              className="ig-heading-2 mt-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE_STANDARD }}
            >
              Selected Work
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project cards */}
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="ig-card-light overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: EASE_STANDARD,
                  }}
                  whileHover={{ y: -4 }}
                >
                  {/* Green accent bar */}
                  <div className="h-1.5 w-full bg-ig-green" />

                  <div className="p-8">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <span className="text-xs text-neutral-400">
                        {project.category}
                      </span>
                      <a
                        href={project.href}
                        target={project.external ? "_blank" : undefined}
                        rel={
                          project.external ? "noopener noreferrer" : undefined
                        }
                        className="w-8 h-8 rounded-full bg-black/5 hover:bg-black flex items-center justify-center text-black hover:text-white transition-colors duration-300 flex-shrink-0"
                        aria-label={`Open ${project.title}`}
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    </div>

                    {/* Title + subtitle */}
                    <h3 className="ig-heading-3 mb-1">{project.title}</h3>
                    <p className="text-sm text-neutral-400 mb-4">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-3 py-1 rounded-full bg-black text-white font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full border border-neutral-200 text-neutral-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Coming soon card */}
              <motion.div
                className="ig-card-light overflow-hidden border-2 border-dashed border-neutral-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: PROJECTS.length * 0.1,
                  ease: EASE_STANDARD,
                }}
              >
                <div className="p-8 h-full flex flex-col items-center justify-center text-center min-h-[300px]">
                  <div className="text-4xl mb-4" aria-hidden>
                    🚀
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-400 mb-2">
                    More projects coming soon
                  </h3>
                  <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
                    We&apos;re shipping more products in 2025. Check back soon
                    or reach out to learn about our in-progress work.
                  </p>
                  <PillButton
                    label="Start your project"
                    href="/contact"
                    variant="light"
                    size="md"
                    className="mt-6"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
