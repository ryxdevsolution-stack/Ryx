"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import { SectionLabel } from "../section-label";
import { PillButton } from "../pill-button";
import { makeStaggerParent, FADE_UP_CHILD, SLIDE_UP_CHILD } from "../motion";
import { CinematicHeading } from "../cinematic-heading";
import { SectionReveal } from "../section-reveal";

const PROJECTS = [
  {
    title: "Valoryx",
    category: "Billing SaaS",
    description: "Offline-first billing & inventory system for Indian retailers. GST billing, multi-branch stock management, thermal printing, Electron desktop app with automatic cloud sync.",
    tags: ["Next.js", "Flask", "SQLite", "PostgreSQL", "Electron", "Razorpay"],
    href: "https://mj-billing.vercel.app/landing",
    external: true,
  },
  {
    title: "BigTeam",
    category: "Community Platform",
    description: "Full-stack engagement platform with team management, commission tracking, content feeds, Zoom meeting scheduling, ad management, and admin dashboard with analytics.",
    tags: ["React", "Flask", "PostgreSQL", "Supabase", "Redux", "Highcharts"],
    href: "/portfolio",
    external: false,
  },
  {
    title: "Chendur & Co",
    category: "Tax Consultancy Website",
    description: "Lead generation website for a tax consulting firm. WhatsApp-integrated contact forms, local business SEO, animated UI, and multi-contact quick actions.",
    tags: ["HTML5", "Tailwind CSS", "JavaScript", "AOS"],
    href: "/portfolio",
    external: false,
  },
  {
    title: "Boutique",
    category: "Fashion Landing Page",
    description: "Luxury fashion showcase with product catalog, event listings, customer testimonials, and brand storytelling. Responsive mobile-first design.",
    tags: ["HTML5", "Tailwind CSS", "JavaScript"],
    href: "/portfolio",
    external: false,
  },
] as const;

const headerParent = makeStaggerParent(0.1, 0);
const cardParent = makeStaggerParent(0.15, 0.2);

export function PortfolioTeaserSection() {
  return (
    <ParallaxBanner className="ig-section-dark">
      {/* Background layer — dark texture drifts */}
      <ParallaxBannerLayer
        translateY={[-20, 20]}
        scale={[1.08, 1]}
        shouldAlwaysCompleteAnimation
        className="ig-texture-dark"
      />

      {/* Content drives the banner height */}
      <div className="relative z-10 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionReveal
            variants={headerParent}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14"
            amount={0.2}
          >
            <div>
              <motion.div variants={FADE_UP_CHILD}>
                <SectionLabel text="Selected work" variant="dark" />
              </motion.div>
              <motion.div variants={FADE_UP_CHILD} className="mt-5">
                <CinematicHeading className="ig-heading-1 text-white" variant="dark" delay={0}>
                  Work that Speaks
                </CinematicHeading>
              </motion.div>
            </div>
            <motion.div variants={FADE_UP_CHILD}>
              <PillButton label="View all projects" href="/portfolio" variant="dark" size="md" />
            </motion.div>
          </SectionReveal>

          <SectionReveal
            variants={cardParent}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            amount={0.1}
          >
            {PROJECTS.map((p) => (
              <motion.div
                key={p.title}
                variants={SLIDE_UP_CHILD}
                className="ig-card-dark overflow-hidden group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-1 w-full bg-ig-green" />
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs text-ig-text-light-muted mb-1">{p.category}</p>
                      <h3 className="text-2xl font-semibold text-white">{p.title}</h3>
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
          </SectionReveal>

        </div>
      </div>
    </ParallaxBanner>
  );
}
