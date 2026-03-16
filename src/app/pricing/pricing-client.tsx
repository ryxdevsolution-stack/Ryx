"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  MessageCircle,
  CheckCircle,
  Code2,
  Headphones,
  FileText,
  Clock,
  ShieldCheck,
  Search,
  FileCheck,
  Send,
} from "lucide-react";
import { Navbar } from "@/components/ryx/navbar";
import { SectionLabel } from "@/components/ryx/section-label";
import { ScriptText } from "@/components/ryx/script-text";
import { PillButton } from "@/components/ryx/pill-button";
import { EASE_STANDARD } from "@/components/ryx/motion";
import { SITE_CONFIG } from "@/lib/site-config";

const Beams = dynamic(() => import("@/components/ui/beams"), { ssr: false, loading: () => null });

const ContactCTASection = dynamic(
  () => import("@/components/ryx/sections/contact-cta").then((m) => ({ default: m.ContactCTASection })),
  { loading: () => <div className="min-h-[50vh] bg-ig-dark" /> }
);
const Footer = dynamic(
  () => import("@/components/ryx/sections/footer").then((m) => ({ default: m.Footer })),
  { loading: () => <div className="min-h-[40vh] bg-ig-dark" /> }
);

const VIEWPORT = { once: true, margin: "-80px" } as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.55, delay, ease: EASE_STANDARD },
  } as const;
}

const PROCESS_STEPS = [
  {
    step: "01",
    icon: MessageCircle,
    title: "Tell us your idea",
    description:
      "WhatsApp us or fill the contact form. Even a rough idea is enough — we ask the right questions.",
  },
  {
    step: "02",
    icon: Search,
    title: "Free scoping call",
    description:
      "We map out exactly what needs to be built, the timeline, and what success looks like for your business.",
  },
  {
    step: "03",
    icon: FileCheck,
    title: "Transparent quote",
    description:
      "You get a fixed-price quote with full scope and milestones. No surprises, no hidden charges.",
  },
];

const ALWAYS_INCLUDED = [
  { icon: Code2, label: "Source code handover" },
  { icon: Headphones, label: "Direct developer access" },
  { icon: MessageCircle, label: "WhatsApp support" },
  { icon: FileText, label: "GST invoice provided" },
  { icon: Clock, label: "Post-launch support window" },
  { icon: ShieldCheck, label: "Fixed quote upfront" },
];

const SERVICES = [
  {
    icon: FileText,
    title: "Business Website",
    description:
      "Professional, SEO-optimised websites for small businesses, consultants, and service providers.",
    features: [
      "Custom responsive design",
      "On-page SEO included",
      "WhatsApp & contact integration",
      "1 month post-launch support",
    ],
  },
  {
    icon: Code2,
    title: "Full-Stack Web Application",
    description:
      "Custom platforms with dashboards, user roles, payments, and backend logic for Indian businesses.",
    features: [
      "UI/UX design included",
      "Frontend + backend development",
      "Database & API layer",
      "Deployment & handover",
    ],
  },
  {
    icon: ShieldCheck,
    title: "GST Billing & Inventory",
    description:
      "Valoryx — offline-first billing software, GST-compliant with thermal print and multi-branch support.",
    features: [
      "Valoryx licence & setup",
      "Data migration",
      "Staff training",
      "E-invoice compliance",
    ],
  },
  {
    icon: Send,
    title: "Digital Marketing",
    description:
      "Google Ads, Meta Ads, and organic SEO. Strategy, creative, and monthly reporting included.",
    features: [
      "Platform setup & audit",
      "Ad creative & copy",
      "Targeting strategy",
      "Monthly performance reports",
    ],
  },
];

const FAQS = [
  {
    q: "Why no prices on the website?",
    a: "Every project is different. A 3-page website costs differently from a 20-page platform with admin panels and payment integration. We scope your requirements first and give you a fixed quote — so you pay for exactly what you need.",
  },
  {
    q: "How quickly can I get a quote?",
    a: "Within 24 hours. WhatsApp is the fastest channel — we reply the same day.",
  },
  {
    q: "Is the initial consultation free?",
    a: "Yes, completely free. You only pay after you approve the quote and we agree on scope.",
  },
  {
    q: "Can I pay in installments?",
    a: "Yes — milestone-based payments. Typically 40% upfront, 40% mid-delivery, 20% on handover. Exact split is agreed in the project contract.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Yes. We adapt scope to your budget. Start small, scale later — many clients begin with a website and expand to a full platform.",
  },
  {
    q: "What if my requirements change mid-project?",
    a: "We handle scope changes transparently. If new requirements come in, we discuss the impact on timeline and cost before implementing — no surprise invoices.",
  },
];

export default function PricingClient() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden min-h-screen flex items-center bg-black"
          data-no-ribbon
        >
          {/* Beams WebGL background — SSR-safe dynamic import */}
          <div className="absolute inset-0 z-0">
            <Beams
              beamWidth={3}
              beamHeight={30}
              beamNumber={20}
              lightColor="#ffffff"
              speed={2}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={30}
            />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 pointer-events-none">
            <div className="max-w-3xl">
              <SectionLabel text="Pricing" variant="dark" />
              <motion.h1
                className="ig-heading-1 text-white mt-6 mb-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE_STANDARD }}
              >
                Pricing that fits your{" "}
                <ScriptText>project</ScriptText>
              </motion.h1>
              <motion.p
                className="text-white/60 text-lg sm:text-xl max-w-xl leading-relaxed mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: EASE_STANDARD }}
              >
                We don&apos;t use fixed price lists because your requirements are
                unique. Tell us what you need — we&apos;ll scope it and give you
                a clear, fixed quote. No hidden charges.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4 pointer-events-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE_STANDARD }}
              >
                <PillButton
                  label="WhatsApp us"
                  href={SITE_CONFIG.company.whatsapp}
                  variant="dark"
                  size="md"
                  external
                />
                <PillButton
                  label="Contact form"
                  href="/contact"
                  variant="dark"
                  size="md"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="ig-section-light py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="How it works" variant="light" />
            <motion.h2
              className="ig-heading-2 mt-4 mb-3"
              {...fadeUp()} viewport={VIEWPORT}
            >
              From idea to quote in{" "}
              <ScriptText>24 hours</ScriptText>
            </motion.h2>
            <motion.p
              className="text-neutral-500 max-w-2xl mb-12"
              {...fadeUp(0.1)} viewport={VIEWPORT}
            >
              Three steps. No commitment until you approve the quote.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.step}
                  className="ig-card-light p-7"
                  {...fadeUp(i * 0.08)} viewport={VIEWPORT}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-3xl font-bold text-black/10 leading-none select-none">
                      {step.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      <step.icon size={16} className="text-white" />
                    </div>
                  </div>
                  <h3 className="ig-heading-4 mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Always included ── */}
        <section className="ig-section-dark py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="Every project" variant="dark" />
            <motion.h2
              className="ig-heading-2 text-white mt-4 mb-3"
              {...fadeUp()} viewport={VIEWPORT}
            >
              What&apos;s always{" "}
              <ScriptText>included</ScriptText>
            </motion.h2>
            <motion.p
              className="text-ig-text-light-muted max-w-2xl mb-12"
              {...fadeUp(0.1)} viewport={VIEWPORT}
            >
              Regardless of project size, these come standard.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ALWAYS_INCLUDED.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  className="ig-card-dark p-5 flex items-center gap-4"
                  {...fadeUp(i * 0.07)} viewport={VIEWPORT}
                  whileHover={{ y: -3 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-ig-green/10 border border-ig-green/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-ig-green" />
                  </div>
                  <span className="text-sm font-medium text-white">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="ig-section-white py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="What we build" variant="light" />
            <motion.h2
              className="ig-heading-2 mt-4 mb-3"
              {...fadeUp()} viewport={VIEWPORT}
            >
              Services we{" "}
              <ScriptText>quote for</ScriptText>
            </motion.h2>
            <motion.p
              className="text-neutral-500 max-w-2xl mb-12"
              {...fadeUp(0.1)} viewport={VIEWPORT}
            >
              Every quote includes full scope, timeline, and milestones. No surprises.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.title}
                  className="ig-card-light p-7 flex flex-col gap-5"
                  {...fadeUp(i * 0.08)} viewport={VIEWPORT}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                    <service.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="ig-heading-4 mb-2">{service.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <ul className="space-y-2 mt-auto">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs text-neutral-500"
                      >
                        <CheckCircle
                          size={13}
                          className="text-ig-green flex-shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-neutral-100">
                    <PillButton
                      label="Get a quote"
                      href={SITE_CONFIG.company.whatsapp}
                      variant="light"
                      size="sm"
                      external
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="ig-section-light py-20 sm:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="FAQ" variant="light" />
            <motion.h2
              className="ig-heading-2 mt-4 mb-12"
              {...fadeUp()} viewport={VIEWPORT}
            >
              Common questions
            </motion.h2>
            <div className="divide-y divide-neutral-200">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  className="py-6"
                  {...fadeUp(i * 0.06)} viewport={VIEWPORT}
                >
                  <h3 className="ig-heading-4 mb-2">{faq.q}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTASection />

      </main>
      <Footer />
    </>
  );
}
