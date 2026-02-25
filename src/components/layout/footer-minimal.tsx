"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Mail, MessageCircle,
} from "lucide-react"

const footerLinks = {
  services: [
    { name: "Billing Software", href: "/services" },
    { name: "Web Development", href: "/services" },
    { name: "Mobile Apps", href: "/services" },
    { name: "CRM Solutions", href: "/services" },
  ],
  products: [
    { name: "Valoryx Billing", href: "https://mj-billing.vercel.app/landing" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ],
}


export function FooterMinimal() {
  return (
    <footer className="relative bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 text-gray-900 overflow-hidden">
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
                Software that solves real business problems. Based in Coimbatore, serving globally.
              </p>
              {/* Contact Info */}
              <div className="space-y-2">
                <a href="mailto:ryxdevsolutions@gmail.com" className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  <span>ryxdevsolutions@gmail.com</span>
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

            {/* Products & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-sm font-semibold mb-4 text-gray-900">
                Products
              </h4>
              <ul className="space-y-2 mb-6">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-violet-600 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <motion.a
                href="https://wa.me/916374853277"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </motion.a>
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