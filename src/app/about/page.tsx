"use client"

import { NavbarMinimal } from "@/components/layout/navbar-minimal"
import { FooterMinimal } from "@/components/layout/footer-minimal"
import { AnimatedCursor } from "@/components/ui/animated-cursor"
import { motion } from "framer-motion"
import { Target, Heart, Rocket, Users, TrendingUp, ArrowRight, Sparkles, MessageSquare, Code, Shield } from "lucide-react"

const stats = [
  { icon: Rocket, value: "5+", label: "Projects Delivered", gradient: "from-violet-500 to-purple-600" },
  { icon: Code, value: "1", label: "Live SaaS Product", gradient: "from-blue-500 to-cyan-500" },
  { icon: TrendingUp, value: "10+", label: "Technologies We Use", gradient: "from-pink-500 to-rose-500" },
  { icon: MessageSquare, value: "WhatsApp", label: "Direct Founder Support", gradient: "from-emerald-500 to-teal-500" },
]

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description: "We embrace cutting-edge technologies to deliver future-ready solutions that keep you ahead of the curve.",
    gradient: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
  },
  {
    icon: Heart,
    title: "Client Success",
    description: "Your success is our priority. We go above and beyond to exceed expectations at every step.",
    gradient: "from-pink-500 to-rose-500",
    bgLight: "bg-pink-50",
  },
  {
    icon: Rocket,
    title: "Agile Delivery",
    description: "Fast, efficient, and flexible development process that adapts seamlessly to your evolving needs.",
    gradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50",
  },
]

export default function AboutPage() {
  return (
    <>
      <AnimatedCursor />
      <NavbarMinimal />

      {/* ── Page Container ── */}
      <main className="relative z-10 bg-white rounded-b-[2rem] shadow-[0_4px_40px_rgba(0,0,0,0.06)]">

        {/* ━━━━ HERO ━━━━ */}
        <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 bg-gradient-to-b from-gray-50 via-gray-50/50 to-white overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl" />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-violet-600 mb-6 bg-violet-50 px-4 py-2 rounded-full border border-violet-100">
                <Sparkles className="w-3.5 h-3.5" />
                About RYX
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-gray-900 mb-8">
                We build digital products{" "}
                <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                  that matter
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Founded in 2023, RYX is a software development company based in Coimbatore, India. We build billing software, websites, mobile apps, and custom CRMs for businesses locally and globally.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ━━━━ STATS ━━━━ */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl border border-gray-200/60 p-6 md:p-8 text-center hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300/80 transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/10`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━ MISSION & VISION ━━━━ */}
        <section className="py-24 md:py-32 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-violet-600 mb-4">
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Mission & Vision
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                The foundations that guide our work and define our purpose.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-2xl border border-gray-200/60 p-8 md:p-10 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  To build software that actually solves real business problems — not just flashy demos, but tools that business owners use every day. We started with Valoryx because we needed better billing software ourselves.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group bg-white rounded-2xl border border-gray-200/60 p-8 md:p-10 hover:shadow-lg hover:shadow-pink-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  To become the go-to software partner for small and medium businesses in India and worldwide. We want every business owner to have access to the same quality tools that large enterprises use, at a price they can afford.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ━━━━ CORE VALUES ━━━━ */}
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-violet-600 mb-4">
                What We Stand For
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                The principles that guide everything we do, from first meeting to final launch.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl border border-gray-200/60 p-8 md:p-10 h-full hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300/80 transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-gray-900/10`}>
                      <value.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-[15px]">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━ WHY CHOOSE US ━━━━ */}
        <section className="py-24 md:py-32 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-violet-600 mb-4">
                Why Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Businesses Choose Us
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: "Direct Developer Access",
                  description: "We\u2019re not a 500-person agency. When you work with us, you work directly with the developers who build your product.",
                  gradient: "from-violet-500 to-purple-600",
                },
                {
                  icon: Shield,
                  title: "We Use Our Own Software",
                  description: "We use our own software daily \u2014 Valoryx is built because we needed it first. That\u2019s how you know it works.",
                  gradient: "from-pink-500 to-rose-500",
                },
                {
                  icon: MessageSquare,
                  title: "WhatsApp Support",
                  description: "Based in Coimbatore, available on WhatsApp. No ticket systems, no waiting 48 hours for a reply.",
                  gradient: "from-blue-500 to-cyan-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl border border-gray-200/60 p-8 md:p-10 h-full hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300/80 transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-gray-900/10`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-[15px]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ━━━━ CTA — revealed behind the page ━━━━ */}
      <section className="sticky bottom-0 z-0 py-24 md:py-32 bg-gray-950 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
              Start Your Project
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to bring your{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                ideas to life
              </span>
              ?
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
              Let&apos;s work together to transform your vision into reality.
            </p>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-violet-500/25"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <FooterMinimal />
    </>
  )
}
