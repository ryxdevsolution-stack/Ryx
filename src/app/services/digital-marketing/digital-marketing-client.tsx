"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp, Target, BarChart2, Mail, Instagram,
  CheckCircle, ArrowRight, Users, Megaphone, Globe,
} from "lucide-react";
import { Navbar } from "@/components/ryx/navbar";
import { SectionLabel } from "@/components/ryx/section-label";
import { ScriptText } from "@/components/ryx/script-text";
import { PillButton } from "@/components/ryx/pill-button";
import { EASE_STANDARD } from "@/components/ryx/motion";
import { SITE_CONFIG } from "@/lib/site-config";

const ContactCTASection = dynamic(
  () => import("@/components/ryx/sections/contact-cta").then((m) => ({ default: m.ContactCTASection })),
  { loading: () => <div className="min-h-[50vh] bg-ig-dark" /> }
);
const FaqSection = dynamic(
  () => import("@/components/ryx/sections/faq").then((m) => ({ default: m.FaqSection })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const Footer = dynamic(
  () => import("@/components/ryx/sections/footer").then((m) => ({ default: m.Footer })),
  { loading: () => <div className="min-h-[40vh] bg-ig-dark" /> }
);

const VIEWPORT = { once: true, margin: "-80px" } as const;
const ENTER = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } } as const;

const CHANNELS = [
  {
    icon: Target,
    title: "Google Ads",
    description:
      "Search, Display, and Performance Max campaigns. We target buyers already searching for your product — not random eyeballs.",
    features: ["Keyword research & negative lists", "Ad copywriting & A/B testing", "Conversion tracking setup", "Weekly performance reports"],
  },
  {
    icon: Instagram,
    title: "Meta Ads",
    description:
      "Facebook and Instagram ad campaigns built around your audience — not just demographics, but behaviours and intent signals.",
    features: ["Audience research & lookalike targeting", "Creative design included", "Retargeting campaigns", "ROAS-focused optimisation"],
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    description:
      "Consistent presence on Instagram, LinkedIn, and Facebook — content that builds trust and keeps your brand visible.",
    features: ["Content calendar & scheduling", "Caption writing & design", "Community engagement", "Monthly analytics report"],
  },
  {
    icon: Mail,
    title: "WhatsApp & Email Campaigns",
    description:
      "Direct marketing to warm leads and existing customers. Higher open rates than any other channel for Indian audiences.",
    features: ["WhatsApp broadcast campaigns", "Email newsletter setup", "Segmentation & personalisation", "Click-through tracking"],
  },
  {
    icon: Globe,
    title: "Content & SEO Strategy",
    description:
      "Blog articles, landing pages, and content clusters that rank on Google and bring in traffic month after month.",
    features: ["Keyword-targeted blog posts", "Internal linking strategy", "On-page SEO optimisation", "Google Search Console management"],
  },
  {
    icon: BarChart2,
    title: "Analytics & Reporting",
    description:
      "Clear dashboards showing exactly what's working — leads generated, cost per lead, and revenue attribution.",
    features: ["Google Analytics 4 setup", "Custom conversion tracking", "Monthly strategy review", "Transparent cost breakdowns"],
  },
] as const;

const WHY = [
  {
    stat: "1 team",
    label: "We build your website and run your marketing — no handoff gaps",
  },
  {
    stat: "Direct",
    label: "WhatsApp access to the person actually running your campaigns",
  },
  {
    stat: "India-first",
    label: "Strategies built for Indian buyer behaviour, not copy-pasted from Western playbooks",
  },
  {
    stat: "Honest",
    label: "Transparent pricing, no hidden management fees, no vanity metrics",
  },
] as const;

const PROCESS = [
  { step: "01", title: "Audit", description: "We review your current presence — website, social, and any existing ad spend" },
  { step: "02", title: "Strategy", description: "Channel selection, budget allocation, target audience definition, and 90-day roadmap" },
  { step: "03", title: "Launch", description: "Campaigns go live, creatives deployed, tracking verified end-to-end" },
  { step: "04", title: "Optimise", description: "Weekly reviews, A/B tests, budget shifts toward what converts" },
] as const;

export default function DigitalMarketingClient() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="ig-section-dark relative overflow-hidden min-h-screen flex items-center" data-no-ribbon>
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_STANDARD }}
              >
                <SectionLabel text="Digital Marketing" variant="dark" />
              </motion.div>

              <motion.h1
                className="ig-heading-1 text-white mt-6 mb-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE_STANDARD }}
              >
                Marketing that <ScriptText>Converts</ScriptText>,<br />not just Impressions
              </motion.h1>

              <motion.p
                className="text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: EASE_STANDARD }}
              >
                Google Ads, Meta Ads, social media, and content — managed by the same team that built your website.
                No agency silos. No missed signals. Just growth.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE_STANDARD }}
              >
                <PillButton
                  label="Start a campaign"
                  href={SITE_CONFIG.company.whatsapp}
                  variant="light"
                  size="md"
                />
                <PillButton
                  label="See our services"
                  href="/services"
                  variant="dark"
                  size="md"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Why RYX for Marketing ── */}
        <section className="ig-section-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHY.map((item, i) => (
                <motion.div
                  key={item.stat}
                  className="ig-card-light p-7 flex flex-col gap-3"
                  {...ENTER} viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_STANDARD }}
                >
                  <span className="text-3xl font-bold text-black leading-none">{item.stat}</span>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Channels Grid ── */}
        <section className="ig-section-light py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="What we manage" variant="light" />
            <motion.h2
              className="ig-heading-2 mt-4 mb-3"
              {...ENTER} viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_STANDARD }}
            >
              Every channel, <ScriptText>one team</ScriptText>
            </motion.h2>
            <motion.p
              className="text-neutral-500 max-w-2xl mb-12"
              {...ENTER} viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_STANDARD }}
            >
              We manage the channels that actually drive business in India — not every platform, just the right ones for your audience.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CHANNELS.map((channel, i) => (
                <motion.div
                  key={channel.title}
                  className="ig-card-light p-7 flex flex-col gap-5"
                  {...ENTER} viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE_STANDARD }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                    <channel.icon size={18} className="text-white" />
                  </div>
                  <h3 className="ig-heading-4">{channel.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{channel.description}</p>
                  <ul className="space-y-2 mt-auto">
                    {channel.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-neutral-500">
                        <CheckCircle size={14} className="text-ig-green mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="ig-section-dark py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="How it works" variant="dark" />
            <motion.h2
              className="ig-heading-2 text-white mt-4 mb-12"
              {...ENTER} viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_STANDARD }}
            >
              From audit to <ScriptText>results</ScriptText>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.step}
                  className="ig-card-dark p-7"
                  {...ENTER} viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE_STANDARD }}
                >
                  <span className="text-4xl font-bold text-white/10 leading-none block mb-5">{step.step}</span>
                  <h3 className="ig-heading-4 text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Advantage block — build + market together ── */}
        <section className="ig-section-white py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <SectionLabel text="The RYX advantage" variant="light" />
              <motion.h2
                className="ig-heading-2 mt-4 mb-6"
                {...ENTER} viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE_STANDARD }}
              >
                We build the website <em>and</em> run the ads
              </motion.h2>
              <motion.p
                className="text-neutral-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
                {...ENTER} viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE_STANDARD }}
              >
                Most businesses hire a web agency and a separate marketing agency. The result is slow landing pages
                that eat ad budgets, and marketers who blame the developers. At RYX, one team handles both —
                so your ads land on pages built to convert.
              </motion.p>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
                {...ENTER} viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE_STANDARD }}
              >
                {[
                  { icon: Users, label: "One team, full ownership" },
                  { icon: TrendingUp, label: "Pages built for ad conversion" },
                  { icon: BarChart2, label: "Unified analytics — site + campaigns" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="ig-card-light p-5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-neutral-700">{label}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center gap-4"
                {...ENTER} viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE_STANDARD }}
              >
                <PillButton label="Talk to us on WhatsApp" href={SITE_CONFIG.company.whatsapp} variant="dark" size="md" />
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black transition-colors duration-200"
                >
                  See all services <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <FaqSection />
        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
