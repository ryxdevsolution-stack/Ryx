"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import {
  Mail, Phone,
  Twitter, Linkedin, Github, Instagram,
} from "lucide-react"

const Hexocet = dynamic(
  () => import("@/components/canvas/hexocet").then((mod) => ({ default: mod.Hexocet })),
  { ssr: false }
)

const footerLinks = {
  services: [
    { name: "Web Development", href: "/services" },
    { name: "UI/UX Design", href: "/services" },
    { name: "AI Solutions", href: "/services" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ],
}

const socialLinks = [
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Github, href: "https://github.com", label: "GitHub" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
]

export function FooterMinimal() {
  return (
    <footer className="relative bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 text-gray-900 overflow-hidden">
      {/* Hexocet particle background */}
      <div className="absolute inset-0 pointer-events-none">
        <Hexocet className="opacity-50" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="inline-block mb-4">
                <motion.div
                  className="text-3xl font-bold"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                    RYX
                  </span>
                </motion.div>
              </Link>
              <p className="text-gray-600 mb-4 text-sm">
                Transforming ideas into digital reality.
              </p>
              {/* Contact Info */}
              <div className="space-y-2">
                <a href="mailto:ryxdevsolution@gmail.com" className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  <span>ryxdevsolution@gmail.com</span>
                </a>
                <a href="tel:+918667258008" className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+91 86672 58008</span>
                </a>
                <a href="tel:+916374853277" className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+91 63748 53277</span>
                </a>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-sm font-semibold mb-4 text-gray-900">
                Services
              </h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-violet-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-sm font-semibold mb-4 text-gray-900">
                Company
              </h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-violet-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-sm font-semibold mb-4 text-gray-900">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-600 hover:text-violet-600 hover:bg-white shadow-sm border border-violet-100 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-violet-200">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <p className="text-xs md:text-sm text-gray-600">
                © {new Date().getFullYear()} RYX. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  className="text-xs md:text-sm text-gray-600 hover:text-violet-600 transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-xs md:text-sm text-gray-600 hover:text-violet-600 transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}