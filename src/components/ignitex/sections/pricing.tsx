"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "../section-label";
import { ScriptText } from "../script-text";
import { PillButton } from "../pill-button";
import { Copy, Check, Mail } from "lucide-react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";

const MONTHLY_FEATURES = [
  "Ongoing design support",
  "Custom development",
  "Clear timelines & milestones",
  "Flexible monthly scope",
  "Weekly updates from the project manager",
  "Fast turnaround on key tasks",
];

const PROJECT_FEATURES = [
  "Full project scoping & planning",
  "Custom end-to-end development",
  "Design + development included",
  "Dedicated project manager",
  "Post-launch support (30 days)",
  "Source code handoff",
];

export function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [copied, setCopied] = useState(false);

  const features = isMonthly ? MONTHLY_FEATURES : PROJECT_FEATURES;
  const price = isMonthly ? "1200" : "5000";
  const period = isMonthly ? "/month" : "/project";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.company.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (non-HTTPS or denied)
    }
  };

  return (
    <section className="relative bg-ig-dark text-white overflow-hidden">
      <div className="absolute inset-0 ig-texture-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-12">
          <div className="lg:w-1/2">
            <SectionLabel
              text="No hidden fees"
              variant="dark"
              className="mb-6"
            />
            <motion.h2
              className="ig-heading-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Clear <ScriptText>Pricing,</ScriptText>
              <br />
              clear results
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pricing card */}
          <motion.div
            className="ig-card-dark p-6 sm:p-8 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Title + toggle */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h3 className="ig-heading-4 mb-1">
                  Design & Dev support plan
                </h3>
                <p className="text-ig-text-light-muted text-sm">
                  Ideal for brands needing ongoing design and dev support.
                </p>
              </div>

              {/* Toggle */}
              <div className="flex items-center bg-ig-white-5 rounded-full p-1 flex-shrink-0">
                <button
                  onClick={() => setIsMonthly(true)}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
                    isMonthly
                      ? "bg-white text-black font-medium"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsMonthly(false)}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
                    !isMonthly
                      ? "bg-white text-black font-medium"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Project based
                </button>
              </div>
            </div>

            <div className="border-t border-ig-white-10" />

            {/* Features */}
            <div>
              <p className="text-ig-text-light-muted text-sm mb-3">
                What&apos;s included
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-ig-white-5 rounded-xl p-5">
              <div className="flex items-baseline gap-1">
                <span className="ig-script text-lg">$</span>
                <span className="text-4xl sm:text-5xl font-bold">
                  {price}
                </span>
                <span className="text-ig-text-light-muted text-sm ml-1">
                  {period}
                </span>
              </div>
              <PillButton
                label="Start your retainer"
                href="/contact"
                variant="dark"
                size="sm"
              />
            </div>
          </motion.div>

          {/* Right column - Discovery call + email */}
          <div className="space-y-6">
            {/* Discovery call */}
            <motion.div
              className="ig-card-dark p-6 sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-ig-white-10 overflow-hidden">
                  <Image
                    src="/images/avatar-lead.jpg"
                    alt="Team lead"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-ig-green" />
                  <span className="text-sm text-ig-text-light-muted">
                    3 Spots Available
                  </span>
                </div>
              </div>

              <h3 className="ig-heading-4 mb-2">Schedule a discovery call</h3>
              <p className="text-ig-text-light-muted text-sm mb-5">
                Let&apos;s connect and see how we can bring your vision to
                life.
              </p>

              <PillButton
                label="Book a call"
                href="/contact"
                variant="dark"
                size="md"
              />
            </motion.div>

            {/* Email card */}
            <motion.div
              className="ig-card-dark p-5 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-10 h-10 rounded-full bg-ig-white-10 flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-white/60" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-ig-text-light-muted mb-0.5">
                  Do you prefer email?
                </p>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-2 text-sm font-medium hover:text-white/80 transition-colors cursor-pointer"
                >
                  <span>{SITE_CONFIG.company.email}</span>
                  {copied ? (
                    <Check size={14} className="text-ig-green" />
                  ) : (
                    <Copy size={14} className="text-white/40" />
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
