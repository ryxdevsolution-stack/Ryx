"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import dynamic from 'next/dynamic'

const SectionParticles = dynamic(
  () => import('@/components/ui/section-particles').then(mod => ({ default: mod.SectionParticles })),
  { ssr: false }
)

const CONTACT_PARTICLE_COLORS = [
  { r: 236, g: 72, b: 153 },   // pink-500
  { r: 168, g: 85, b: 247 },   // purple-500
  { r: 99, g: 102, b: 241 },   // indigo-500
  { r: 59, g: 130, b: 246 },   // blue-500
  { r: 192, g: 132, b: 252 },  // purple-300
]

export function ContactMinimal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.botcheck) {
      return;
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New message from ${formData.name}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true)
        toast.success("Message sent successfully!");
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: '', email: '', message: '', botcheck: '' })
        }, 3000)
      } else {
        throw new Error(result.message || 'Failed to send');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
      {/* Gradient Orbs Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-300 to-violet-300 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full blur-3xl" />
      </div>

      <SectionParticles
        className="z-[1]"
        particleCount={220}
        colors={CONTACT_PARTICLE_COLORS}
        connectionDistance={90}
        speed={0.7}
        opacity={0.45}
        maxLineAlpha={0.10}
        mouseRadius={120}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs sm:text-sm font-light text-violet-600 mb-3 sm:mb-4 tracking-wide uppercase">
              Get in Touch
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              Let's start a
              <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent"> conversation</span>
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-900">Email</h4>
                <p className="text-sm sm:text-base text-gray-600 break-all">ryxdevsolutions@gmail.com</p>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-900">Phone</h4>
                <p className="text-sm sm:text-base text-gray-600">+91 63748 53277 / +91 86672 58008 / +91 90035 23067</p>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-900">Location</h4>
                <p className="text-sm sm:text-base text-gray-600">Coimbatore, Tamil Nadu, India</p>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-900">Working Hours</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-violet-100">
                <CheckCircle className="w-16 h-16 text-violet-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
                <p className="text-gray-600">
                  Your message has been sent. We'll get back to you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-violet-100">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-0 py-2 sm:py-3 bg-transparent border-0 border-b border-violet-200 focus:border-violet-600 focus:outline-none transition-colors text-sm sm:text-base text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-0 py-2 sm:py-3 bg-transparent border-0 border-b border-violet-200 focus:border-violet-600 focus:outline-none transition-colors text-sm sm:text-base text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={5}
                    required
                    className="w-full px-0 py-2 sm:py-3 bg-transparent border-0 border-b border-violet-200 focus:border-violet-600 focus:outline-none transition-colors resize-none text-sm sm:text-base text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="botcheck"
                  value={formData.botcheck}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-300/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}