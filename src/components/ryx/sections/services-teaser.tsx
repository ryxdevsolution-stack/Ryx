"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Palette, Receipt } from "lucide-react";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import { SectionLabel } from "../section-label";
import { PillButton } from "../pill-button";
import { makeStaggerParent, FADE_UP_CHILD, SLIDE_UP_CHILD } from "../motion";
import { CinematicHeading } from "../cinematic-heading";
import { SectionReveal } from "../section-reveal";

const SERVICES = [
  {
    icon: Receipt,
    title: "Billing & Inventory Software",
    desc: "Valoryx — offline-first billing with GST, multi-branch inventory, thermal printing, and Razorpay payments.",
  },
  {
    icon: Code2,
    title: "Web Applications",
    desc: "Full-stack platforms with React, Flask, and PostgreSQL. Admin dashboards, analytics, and role-based access.",
  },
  {
    icon: Globe,
    title: "Business Websites",
    desc: "SEO-optimized landing pages and lead-gen sites. WhatsApp integration, responsive design, fast load times.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Clean, modern interfaces designed in-house — from Valoryx dashboards to Boutique's luxury aesthetic.",
  },
] as const;

const headerParent = makeStaggerParent(0.1, 0);
const cardParent = makeStaggerParent(0.1, 0.2);

export function ServicesTeaserSection() {
  return (
    <ParallaxBanner className="ig-section-white">
      {/* Background layer — texture drifts at 2× content speed */}
      <ParallaxBannerLayer
        translateY={[-20, 20]}
        scale={[1.08, 1]}
        shouldAlwaysCompleteAnimation
        className="ig-texture opacity-40"
      />

      {/* Content — regular child so it drives the banner height */}
      <div className="relative z-10 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionReveal
            variants={headerParent}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14"
            amount={0.2}
          >
            <div>
              <motion.div variants={FADE_UP_CHILD}>
                <SectionLabel text="What we do" variant="light" />
              </motion.div>
              <motion.div variants={FADE_UP_CHILD} className="mt-5">
                <CinematicHeading className="ig-heading-1" variant="light" delay={0}>
                  Services that Scale
                </CinematicHeading>
              </motion.div>
            </div>
            <motion.div variants={FADE_UP_CHILD}>
              <PillButton label="See all services" href="/services" variant="dark" size="md" />
            </motion.div>
          </SectionReveal>

          <SectionReveal
            variants={cardParent}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            amount={0.1}
          >
            {SERVICES.map((s) => (
              <motion.div
                key={s.title}
                variants={SLIDE_UP_CHILD}
                className="ig-card-light p-6 flex flex-col gap-4 group hover:shadow-md transition-shadow duration-300"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                  <s.icon size={18} className="text-white" />
                </div>
                <h3 className="text-base font-semibold leading-snug">{s.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </SectionReveal>

        </div>
      </div>
    </ParallaxBanner>
  );
}
