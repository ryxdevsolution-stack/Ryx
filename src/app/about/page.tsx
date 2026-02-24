"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Target, Heart, Rocket, Users, MessageSquare, Shield, Zap } from "lucide-react"
import Image from "next/image"
import { Navbar } from "@/components/ignitex/navbar"
import { SectionLabel } from "@/components/ignitex/section-label"
import { ScriptText } from "@/components/ignitex/script-text"
import { PillButton } from "@/components/ignitex/pill-button"
import { SITE_CONFIG } from "@/lib/site-config"
import { EASE_STANDARD } from "@/components/ignitex/motion"

const ContactCTASection = dynamic(
  () => import("@/components/ignitex/sections/contact-cta").then((m) => ({ default: m.ContactCTASection })),
  { loading: () => <div className="min-h-[50vh] bg-ig-dark" /> }
)
const Footer = dynamic(
  () => import("@/components/ignitex/sections/footer").then((m) => ({ default: m.Footer })),
  { loading: () => <div className="min-h-[40vh] bg-ig-dark" /> }
)

const VALUES = [
  {
    icon: Target,
    title: "Innovation First",
    description: "We embrace cutting-edge technologies to deliver future-ready solutions that keep you ahead of the curve.",
  },
  {
    icon: Heart,
    title: "Client Success",
    description: "Your success is our priority. We go above and beyond to exceed expectations at every step.",
  },
  {
    icon: Zap,
    title: "Agile Delivery",
    description: "Fast, efficient, and flexible development process that adapts seamlessly to your evolving needs.",
  },
] as const

const WHY_US = [
  {
    icon: Users,
    title: "Direct Developer Access",
    description: "We're not a 500-person agency. When you work with us, you work directly with the developers who build your product.",
  },
  {
    icon: Shield,
    title: "We Use Our Own Software",
    description: "We use our own software daily — Valoryx is built because we needed it first. That's how you know it works.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Support",
    description: "Based in Coimbatore, available on WhatsApp. No ticket systems, no waiting 48 hours for a reply.",
  },
] as const

const VIEWPORT = { once: true, margin: "-80px" } as const

function fadeUpCard(i: number) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.55, delay: i * 0.08, ease: EASE_STANDARD },
  } as const
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero — ig-section-dark ── */}
        <section className="ig-section-dark relative overflow-hidden">
          <div className="absolute inset-0 ig-texture-dark" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20 sm:pb-28">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="flex-1 max-w-2xl">
                <SectionLabel text="Our story" variant="dark" className="mb-6" />
                <motion.h1
                  className="ig-heading-1 text-white mb-6"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE_STANDARD }}
                >
                  We build digital products that{" "}
                  <ScriptText>Matter</ScriptText>
                </motion.h1>
                <motion.p
                  className="text-ig-text-light-muted text-base sm:text-lg mb-10 max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: EASE_STANDARD }}
                >
                  Founded in 2023, Coimbatore, India. We build billing software,
                  websites, mobile apps, and custom CRMs for businesses locally and globally.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: EASE_STANDARD }}
                >
                  <PillButton label="Start a project" href="/contact" variant="dark" size="md" />
                </motion.div>
              </div>

              <div className="hidden lg:flex flex-1 items-center justify-center">
                <Image
                  src="/illustrations/about.svg"
                  alt=""
                  width={400}
                  height={300}
                  className="w-full h-auto opacity-80"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats — ig-section-white ── */}
        <section className="ig-section-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {SITE_CONFIG.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  {...fadeUpCard(i)}
                  className="ig-card-light p-6 md:p-8 flex flex-col items-center text-center"
                >
                  <span className="text-4xl font-bold text-black mb-1">{stat.value}</span>
                  <span className="text-sm text-neutral-500">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission & Vision — ig-section-light ── */}
        <section className="ig-section-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <SectionLabel text="What drives us" variant="light" className="mb-6" />
            <motion.h2
              className="ig-heading-2 mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_STANDARD }}
            >
              Mission &amp; <ScriptText>Vision</ScriptText>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div className="ig-card-light p-8 md:p-10" {...fadeUpCard(0)}>
                <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center mb-6">
                  <Target size={18} />
                </div>
                <h3 className="ig-heading-4 mb-3">Our Mission</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  To build software that actually solves real business problems —
                  not just flashy demos, but tools that business owners use every day.
                  We started with Valoryx because we needed better billing software ourselves.
                </p>
              </motion.div>

              <motion.div className="ig-card-light p-8 md:p-10" {...fadeUpCard(1)}>
                <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center mb-6">
                  <Rocket size={18} />
                </div>
                <h3 className="ig-heading-4 mb-3">Our Vision</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  To become the go-to software partner for small and medium businesses
                  in India and worldwide. Every business owner deserves enterprise-grade
                  tools at a price they can afford.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Team — ig-section-dark ── */}
        <section className="ig-section-dark relative">
          <div className="absolute inset-0 ig-texture-dark" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <SectionLabel text="The people" variant="dark" className="mb-6" />
            <motion.h2
              className="ig-heading-2 text-white mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_STANDARD }}
            >
              Meet the <ScriptText>Team</ScriptText>
            </motion.h2>

            <div className="grid sm:grid-cols-3 gap-6">
              {SITE_CONFIG.team.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="ig-card-dark p-6"
                  {...fadeUpCard(i)}
                >
                  <div className="w-16 h-16 rounded-full bg-ig-white-10 flex items-center justify-center text-2xl font-bold text-white mb-5 select-none">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-xs text-ig-green mt-0.5 mb-3">{member.role}</p>
                  <p className="text-sm text-ig-text-light-muted leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Values — ig-section-white ── */}
        <section className="ig-section-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <SectionLabel text="What we stand for" variant="light" className="mb-6" />
            <motion.h2
              className="ig-heading-2 mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_STANDARD }}
            >
              Our Core <ScriptText>Values</ScriptText>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {VALUES.map((value, i) => (
                <motion.div key={value.title} className="ig-card-light p-8" {...fadeUpCard(i)}>
                  <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center mb-6">
                    <value.icon size={18} />
                  </div>
                  <h3 className="ig-heading-4 mb-2">{value.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us — ig-section-light ── */}
        <section className="ig-section-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <SectionLabel text="Why us" variant="light" className="mb-6" />
            <motion.h2
              className="ig-heading-2 mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_STANDARD }}
            >
              Why Businesses <ScriptText>Choose Us</ScriptText>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {WHY_US.map((item, i) => (
                <motion.div key={item.title} className="ig-card-light p-8" {...fadeUpCard(i)}>
                  <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center mb-6">
                    <item.icon size={18} />
                  </div>
                  <h3 className="ig-heading-4 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  )
}
