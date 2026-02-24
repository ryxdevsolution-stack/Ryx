"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Palette,
  Cpu,
  Smartphone,
  Globe,
  Users,
  BarChart,
  Shield,
  Rocket,
  CheckCircle,
} from "lucide-react";

import { Navbar } from "@/components/ignitex/navbar";
import { SectionLabel } from "@/components/ignitex/section-label";
import { ScriptText } from "@/components/ignitex/script-text";
import { EASE_STANDARD } from "@/components/ignitex/motion";
import { SITE_CONFIG } from "@/lib/site-config";

const ContactCTASection = dynamic(
  () => import("@/components/ignitex/sections/contact-cta").then((m) => ({ default: m.ContactCTASection })),
  { loading: () => <div className="min-h-[50vh] bg-ig-dark" /> }
);
const Footer = dynamic(
  () => import("@/components/ignitex/sections/footer").then((m) => ({ default: m.Footer })),
  { loading: () => <div className="min-h-[40vh] bg-ig-dark" /> }
);

const SERVICES = [
  {
    icon: Code,
    title: "Billing & Invoicing Software",
    description: "Valoryx — our GST-compliant billing software that works offline with SQLite and syncs to cloud via Supabase.",
    features: [
      "GST billing with CGST, SGST, IGST & HSN codes",
      "Real-time inventory with low-stock alerts",
      "Offline mode with auto-sync when back online",
      "Thermal printer support — no driver needed",
    ],
  },
  {
    icon: Database,
    title: "Websites & Web Applications",
    description: "Fast, SEO-optimized websites using Next.js and React. Landing pages, dashboards, and full web applications.",
    features: [
      "Next.js / React based development",
      "Mobile-responsive from day one",
      "SEO-optimized structure and performance",
      "Supabase / MySQL backend integration",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform Android and iOS apps built with React Native. One codebase, two platforms.",
    features: [
      "React Native for Android & iOS",
      "Push notifications & real-time updates",
      "App Store & Play Store deployment",
      "Offline-capable architecture",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Clean, functional designs that your users can navigate without a manual.",
    features: [
      "Figma-based design workflow",
      "Mobile-first responsive layouts",
      "Conversion-focused UI patterns",
      "Consistent design systems",
    ],
  },
  {
    icon: Cpu,
    title: "CRM & Custom Business Software",
    description: "Custom CRMs, ERPs, and internal tools tailored to how your business actually works.",
    features: [
      "Role-based access with audit logging",
      "Custom dashboards and analytics",
      "Bulk import/export with Excel support",
      "Multi-tenant SaaS architecture",
    ],
  },
  {
    icon: Globe,
    title: "SEO & Digital Presence",
    description: "We structure every website for Google from the ground up.",
    features: [
      "On-page SEO setup",
      "Google Search Console integration",
      "Core Web Vitals optimization",
      "Structured data / Schema markup",
    ],
  },
] as const;

const PROCESS = [
  { step: "01", title: "Discovery", description: "Understanding your vision, goals, and requirements", icon: Users },
  { step: "02", title: "Strategy", description: "Creating a detailed roadmap and project timeline", icon: BarChart },
  { step: "03", title: "Design", description: "Crafting beautiful, user-centered designs in Figma", icon: Palette },
  { step: "04", title: "Development", description: "Building your solution with clean, scalable code", icon: Code },
  { step: "05", title: "Testing", description: "Rigorous testing to ensure quality and performance", icon: Shield },
  { step: "06", title: "Launch", description: "Deploying your project and providing ongoing support", icon: Rocket },
] as const;

const VIEWPORT = { once: true, margin: "-80px" } as const;
const ENTER = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } } as const;

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero — ig-section-dark ── */}
        <section className="ig-section-dark relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 ig-texture-dark" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionLabel text="What we build" variant="dark" />
                <motion.h1
                  className="ig-heading-1 text-white mt-5 mb-6"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: EASE_STANDARD }}
                >
                  Solutions that <ScriptText>Transform</ScriptText> Business
                </motion.h1>
                <motion.p
                  className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: EASE_STANDARD }}
                >
                  From GST-compliant billing software to custom CRMs — we build tools that run your business smoother, day after day.
                </motion.p>
              </div>

              <motion.div
                className="hidden lg:flex justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.35, ease: EASE_STANDARD }}
              >
                <Image
                  src="/illustrations/services.svg"
                  alt=""
                  width={480}
                  height={400}
                  priority
                  className="w-full max-w-md h-auto"
                  aria-hidden
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Services Grid — ig-section-white ── */}
        <section className="ig-section-white py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="Services" variant="light" />
            <motion.h2
              className="ig-heading-2 mt-4 mb-3"
              {...ENTER} viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_STANDARD }}
            >
              What We Offer
            </motion.h2>
            <motion.p
              className="text-neutral-500 max-w-2xl mb-12"
              {...ENTER} viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_STANDARD }}
            >
              Comprehensive digital services tailored to your business goals.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.title}
                  className="ig-card-light p-7 flex flex-col gap-5"
                  {...ENTER} viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE_STANDARD }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                    <service.icon size={18} className="text-white" />
                  </div>
                  <h3 className="ig-heading-4">{service.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mt-auto">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs text-neutral-500">
                        <CheckCircle size={14} className="text-ig-green mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process — ig-section-light ── */}
        <section className="ig-section-light py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="How we work" variant="light" />
            <motion.h2
              className="ig-heading-2 mt-4 mb-3"
              {...ENTER} viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_STANDARD }}
            >
              Our <ScriptText>Process</ScriptText>
            </motion.h2>
            <motion.p
              className="text-neutral-500 max-w-2xl mb-12"
              {...ENTER} viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_STANDARD }}
            >
              A proven, six-step methodology that keeps every project on track and on time.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.step}
                  className="ig-card-light p-7"
                  {...ENTER} viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE_STANDARD }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-3xl font-bold text-black/10 leading-none">{step.step}</span>
                    <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      <step.icon size={16} className="text-white" />
                    </div>
                  </div>
                  <h3 className="ig-heading-4 mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats — ig-section-dark ── */}
        <section className="ig-section-dark py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {SITE_CONFIG.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  {...ENTER} viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE_STANDARD }}
                >
                  <p className="text-4xl sm:text-5xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-ig-text-light-muted mt-2">{stat.label}</p>
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
