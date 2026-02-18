"use client"

import { NavbarMinimal } from "@/components/layout/navbar-minimal"
import { FooterMinimal } from "@/components/layout/footer-minimal"
import { AnimatedCursor } from "@/components/ui/animated-cursor"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Sparkles, Clock, Globe, MessageCircle, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { RAVEN_EVENTS } from "@/components/ui/chat-widget"

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
  "Under \u20b950,000",
  "\u20b950,000 - \u20b92,00,000",
  "\u20b92,00,000 - \u20b95,00,000",
  "\u20b95,00,000 - \u20b910,00,000",
  "\u20b910,00,000+",
]

const timelines = [
  "ASAP",
  "1 - 2 weeks",
  "1 month",
  "2 - 3 months",
  "3+ months",
  "Not sure yet",
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
      <AnimatedCursor />
      <NavbarMinimal />

      <main className="relative z-10 bg-white rounded-b-[2rem] shadow-[0_4px_40px_rgba(0,0,0,0.06)]">
        {/* ━━━━ HERO ━━━━ */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 bg-gradient-to-b from-gray-50 via-gray-50/50 to-white overflow-hidden">
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
                Get In Touch
              </span>

              <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 mb-6">
                Let&apos;s Build Something{" "}
                <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                  Together
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Whether you need a billing solution, a website, or a custom CRM — reach out and we&apos;ll get back to you within 2 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ━━━━ CONTACT INFO CARDS ━━━━ */}
        <section className="py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Mail, label: "Email", value: "ryxdevsolutions@gmail.com", gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/20" },
                { icon: Phone, label: "Phone / WhatsApp", value: "+91 6374853277", gradient: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" },
                { icon: Clock, label: "Hours", value: "Mon-Sat, 9am-6pm IST", gradient: "from-pink-500 to-rose-500", shadow: "shadow-pink-500/20" },
                { icon: MapPin, label: "Location", value: "Coimbatore, Tamil Nadu, India", gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-200/60 p-5 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-3 shadow-lg ${item.shadow}`}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━ FORM SECTION ━━━━ */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left Column - Info */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Project Details
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    Fill in the details below and our team will reach out with a tailored solution. The more information you provide, the better we can help.
                  </p>

                  {/* RAVEN callout */}
                  <div className="bg-gray-950 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">RAVEN AI</h3>
                        <p className="text-[11px] text-gray-400">Smart form assistant</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Don&apos;t want to fill forms? Chat with RAVEN — our AI assistant in the bottom right. Describe your project and RAVEN will fill this form for you.
                    </p>
                  </div>

                  {/* Process steps */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">What happens next?</h3>
                    {[
                      { step: "01", text: "We review your project requirements" },
                      { step: "02", text: "Schedule a free discovery call" },
                      { step: "03", text: "Deliver a detailed proposal & timeline" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-4">
                        <span className="text-xs font-bold text-violet-600 bg-violet-50 w-8 h-8 rounded-lg flex items-center justify-center border border-violet-100">
                          {item.step}
                        </span>
                        <p className="text-sm text-gray-600">{item.text}</p>
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
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-2xl border border-gray-200/60 p-6 md:p-8 space-y-5"
                >
                  {/* RAVEN fill indicator */}
                  {filledByRaven && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3"
                    >
                      <Zap className="w-4 h-4 text-violet-600" />
                      <p className="text-sm text-violet-700 font-medium">RAVEN filled your details. Review and submit!</p>
                    </motion.div>
                  )}

                  {/* Name + Email row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  {/* Phone + Company row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Needed *</label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => updateField("service", formData.service === service ? "" : service)}
                          className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-all duration-200 ${
                            formData.service === service
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget + Timeline row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => updateField("budget", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all appearance-none"
                      >
                        <option value="">Select budget</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Timeline</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => updateField("timeline", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all appearance-none"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Description *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all resize-none"
                      placeholder="Tell us about your project — goals, features, target audience, tech preferences..."
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Project Inquiry
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </motion.button>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <p className="text-sm text-emerald-700 font-medium">Sent! We&apos;ll get back to you within 2 hours.</p>
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
      </main>

      {/* ━━━━ CTA — behind page ━━━━ */}
      <section className="sticky bottom-0 z-0 py-20 md:py-28 bg-gray-950 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prefer a quick chat?
          </h2>
          <p className="text-gray-400 mb-6">
            Reach us directly on WhatsApp or email. No ticket systems, no waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/916374853277" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors text-sm">
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <a href="mailto:ryxdevsolutions@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm">
              <Mail className="w-4 h-4" />
              Email Us
            </a>
            <a href="tel:+916374853277" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-gray-500 hover:text-white transition-colors text-sm">
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </div>
      </section>

      <FooterMinimal />
    </>
  )
}
