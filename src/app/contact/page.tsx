"use client"

import dynamic from "next/dynamic"
import { Navbar } from "@/components/ignitex/navbar"
import { SectionLabel } from "@/components/ignitex/section-label"
import { ScriptText } from "@/components/ignitex/script-text"
import { SITE_CONFIG } from "@/lib/site-config"
import { EASE_STANDARD } from "@/components/ignitex/motion"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { RAVEN_EVENTS } from "@/components/ui/chat-widget"

const Footer = dynamic(
  () => import("@/components/ignitex/sections/footer").then((m) => ({ default: m.Footer })),
  { loading: () => <div className="min-h-[40vh] bg-ig-dark" /> }
)

const services = [
  "Billing Software",
  "Website",
  "Mobile App",
  "CRM",
  "UI/UX Design",
  "SEO",
  "Other",
]

const budgetRanges = [
  "Under ₹50,000",
  "₹50,000 - ₹2,00,000",
  "₹2,00,000 - ₹5,00,000",
  "₹5,00,000 - ₹10,00,000",
  "₹10,00,000+",
]

const timelines = [
  "ASAP",
  "1 - 2 weeks",
  "1 month",
  "2 - 3 months",
  "3+ months",
  "Not sure yet",
]

const INFO_CARDS = [
  { icon: Mail, label: "Email", value: SITE_CONFIG.company.email },
  { icon: Phone, label: "Phone / WhatsApp", value: SITE_CONFIG.company.phone },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 9am–6pm IST" },
  { icon: MapPin, label: "Location", value: SITE_CONFIG.company.location },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [filledByRaven, setFilledByRaven] = useState(false)

  // Listen for RAVEN auto-fill events
  useEffect(() => {
    const handleRavenFill = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail) {
        setFormData((prev) => ({
          ...prev,
          name: detail.name || prev.name,
          email: detail.email || prev.email,
          message: detail.message || prev.message,
        }))
        setFilledByRaven(true)
        setTimeout(() => setFilledByRaven(false), 4000)
      }
    }

    window.addEventListener(RAVEN_EVENTS.FILL_CONTACT, handleRavenFill)
    return () => window.removeEventListener(RAVEN_EVENTS.FILL_CONTACT, handleRavenFill)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", company: "", service: "", budget: "", timeline: "", message: "" })
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        setSubmitStatus("error")
        setTimeout(() => setSubmitStatus("idle"), 5000)
      }
    } catch {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero — dark ── */}
        <section className="ig-section-dark relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="absolute inset-0 ig-texture-dark" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="Get in touch" variant="dark" />
            <motion.h1
              className="ig-heading-1 text-white mt-5"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_STANDARD }}
            >
              Let&apos;s Build Something <ScriptText>Together</ScriptText>
            </motion.h1>
            <motion.p
              className="text-white/70 text-base sm:text-lg max-w-xl mt-4 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE_STANDARD }}
            >
              Whether you need a billing solution, a website, or a custom CRM — reach out and we&apos;ll get back to you within 2 hours.
            </motion.p>

            {/* Info cards */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE_STANDARD }}
            >
              {INFO_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="ig-card-dark p-4 flex flex-col gap-2"
                >
                  <card.icon size={16} className="text-ig-green" />
                  <p className="text-xs text-ig-text-light-muted">{card.label}</p>
                  <p className="text-sm font-medium text-white">{card.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Form Section — white ── */}
        <section className="ig-section-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left Column - Info */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE_STANDARD }}
                >
                  <h2 className="ig-heading-3 mb-4">Project Details</h2>
                  <p className="text-neutral-500 leading-relaxed mb-8 text-sm">
                    Fill in the details below and our team will reach out with a tailored solution. The more information you provide, the better we can help.
                  </p>

                  {/* RAVEN callout */}
                  <div className="ig-card-dark p-6 mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-ig-green/20 rounded-xl flex items-center justify-center">
                        <Zap size={16} className="text-ig-green" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">RAVEN AI</h3>
                        <p className="text-[11px] text-ig-text-light-muted">Smart form assistant</p>
                      </div>
                    </div>
                    <p className="text-sm text-ig-text-light-muted leading-relaxed">
                      Don&apos;t want to fill forms? Chat with RAVEN — our AI assistant in the bottom right. Describe your project and RAVEN will fill this form for you.
                    </p>
                  </div>

                  {/* Process steps */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">What happens next?</h3>
                    {[
                      { step: "01", text: "We review your project requirements" },
                      { step: "02", text: "Schedule a free discovery call" },
                      { step: "03", text: "Deliver a detailed proposal & timeline" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-4">
                        <span className="text-xs font-bold text-white bg-black w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.step}
                        </span>
                        <p className="text-sm text-neutral-600">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Form */}
              <div className="lg:col-span-3">
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE_STANDARD }}
                  className="ig-card-light p-6 sm:p-8 space-y-5"
                >
                  {/* RAVEN fill indicator */}
                  {filledByRaven && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-ig-green/10 border border-ig-green/30 rounded-xl px-4 py-3"
                    >
                      <Zap size={14} className="text-ig-green" />
                      <p className="text-sm text-ig-green font-medium">RAVEN filled your details. Review and submit!</p>
                    </motion.div>
                  )}

                  {/* Name + Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  {/* Phone + Company */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Service Needed *</label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => updateField("service", formData.service === service ? "" : service)}
                          className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-all duration-200 ${
                            formData.service === service
                              ? "bg-black text-white border-black"
                              : "bg-white text-neutral-600 border-neutral-200 hover:border-black"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget + Timeline */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => updateField("budget", e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select budget</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Timeline</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => updateField("timeline", e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Project Description *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none"
                      placeholder="Tell us about your project — goals, features, target audience, tech preferences..."
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-black text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? "Sending..." : (
                      <>
                        Send Project Inquiry
                        <Send size={16} />
                      </>
                    )}
                  </motion.button>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-ig-green/10 border border-ig-green/30 rounded-xl px-4 py-3"
                    >
                      <MessageCircle size={14} className="text-ig-green" />
                      <p className="text-sm text-ig-green font-medium">Sent! We&apos;ll get back to you within 2 hours.</p>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                    >
                      <p className="text-sm text-red-700 font-medium">Something went wrong. Please try again or email us directly.</p>
                    </motion.div>
                  )}
                </motion.form>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quick Contact — dark ── */}
        <section className="ig-section-dark py-16 sm:py-20">
          <div className="absolute inset-0 ig-texture-dark" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="ig-heading-3 text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_STANDARD }}
            >
              Prefer a quick chat?
            </motion.h2>
            <motion.p
              className="text-ig-text-light-muted mb-8 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Reach us directly — no ticket systems, no waiting 48 hours.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE_STANDARD }}
            >
              <a
                href={SITE_CONFIG.company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-ig-green text-black font-semibold rounded-full hover:opacity-90 transition-opacity text-sm"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${SITE_CONFIG.company.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:opacity-90 transition-opacity text-sm"
              >
                <Mail size={16} />
                Email Us
              </a>
              <a
                href={`tel:${SITE_CONFIG.company.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-ig-white-10 text-white font-semibold rounded-full hover:border-white/30 transition-colors text-sm"
              >
                <Phone size={16} />
                Call Us
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
