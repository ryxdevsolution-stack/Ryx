"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "../section-label";
import { ScriptText } from "../script-text";
import { PillButton } from "../pill-button";
import { StarRating } from "../star-rating";
import {
  Target,
  Gem,
  Clock,
  Eye,
  HeadphonesIcon,
  Sparkles,

  Pause,
} from "lucide-react";
import Image from "next/image";

const FEATURES = [
  { icon: Target, label: "Tailored strategy" },
  { icon: Gem, label: "High-Quality output" },
  { icon: Clock, label: "Timely delivery" },
  { icon: Eye, label: "Transparent process" },
  { icon: HeadphonesIcon, label: "Post-Launch support" },
];

const TOOLS = [
  "React", "Next.js", "TypeScript",
  "Node.js", "Supabase", "Figma", "Tailwind",
];

export function WhyUsSection() {
  return (
    <section className="relative bg-white text-black overflow-hidden">
      <div className="absolute inset-0 ig-texture" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <SectionLabel
            text="Why brands trust us"
            variant="light"
            className="justify-center mb-6"
          />
          <motion.h2
            className="ig-heading-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Your brand <ScriptText>Deserves</ScriptText>
            <br />
            better
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Card 1 - Cost effective */}
          <motion.div
            className="ig-card-light p-6 sm:p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="ig-heading-3 mb-2">Cost-Effective plans</h3>
            <p className="text-ig-text-muted text-sm mb-8">
              Get premium services without premium pricing.
            </p>

            <div className="relative h-48 sm:h-56 flex items-end">
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-ig-text-muted">
                <Pause size={12} />
                <Sparkles size={12} />
                <span>Pause & cancel anytime</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Happy clients */}
          <motion.div
            className="ig-card-light p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <StarRating variant="black" />
                <span className="text-sm text-ig-text-muted">
                  10+ Happy clients worldwide
                </span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-3xl font-bold">4.9</span>
                <span className="text-sm text-ig-text-muted">/5.0</span>
              </div>
            </div>

            {/* Avatar grid */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-full bg-ig-light overflow-hidden"
                >
                  <Image
                    src={`/images/avatar-${i + 1}.jpg`}
                    alt="Client"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Brand mark */}
            <div className="mt-8 text-2xl font-bold tracking-widest text-center opacity-20">
              RYX™
            </div>
          </motion.div>
        </div>

        {/* Second row - 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {/* Built with the best */}
          <motion.div
            className="ig-card-light p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="font-semibold text-lg mb-1">Built with the best</h3>
            <p className="text-ig-text-muted text-sm mb-4">
              Access the latest tools, fully integrated and ready to go.
            </p>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="w-10 h-10 rounded-full bg-ig-dark text-white flex items-center justify-center text-[10px] font-bold"
                >
                  {tool.slice(0, 2).toUpperCase()}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Reliable */}
          <motion.div
            className="ig-card-light p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative z-10">
              <h3 className="font-semibold text-lg">Reliable &</h3>
              <h3 className="ig-script text-2xl">Future-ready</h3>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-ig-light to-white" />
          </motion.div>

          {/* 24/7 support */}
          <motion.div
            className="ig-card-light p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h3 className="text-4xl font-bold mb-1">24/7</h3>
            <p className="text-ig-text-muted text-sm mb-4">
              Always-On support
            </p>
            <div className="space-y-2">
              <div className="inline-block bg-ig-light rounded-2xl rounded-bl-sm px-3 py-1.5 text-xs">
                Hey there!
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-ig-dark text-white rounded-2xl rounded-br-sm px-3 py-1.5 text-xs">
                  How can I help you?
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Strategic solutions banner */}
        <motion.div
          className="bg-ig-dark text-white rounded-2xl p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex-1">
            <h3 className="ig-heading-3 mb-6">
              Strategic solutions for lasting impact
            </h3>
            <div className="space-y-3 mb-8">
              {FEATURES.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <feature.icon size={14} className="text-white/70" />
                  </div>
                  <span className="text-sm text-white/80">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
            <PillButton
              label="Get started"
              href="/contact"
              variant="dark"
              size="md"
            />
          </div>

          <div className="text-xs text-white/30 self-end">
            &copy; {new Date().getFullYear()} RYX Dev Solutions
          </div>
        </motion.div>
      </div>
    </section>
  );
}
