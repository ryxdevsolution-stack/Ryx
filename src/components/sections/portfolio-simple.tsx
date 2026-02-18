"use client"

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: "Valoryx — GST Billing Software",
    category: "Full Stack Product",
    description: "A complete billing and inventory management system for Indian retail businesses. Works offline with SQLite, syncs to cloud via Supabase.",
    gradient: "from-violet-600 to-purple-600",
    tech: ["Next.js", "Supabase", "SQLite", "Tailwind CSS"],
    link: "https://mj-billing.vercel.app/landing"
  },
  {
    title: "RYX — Company Landing Page",
    category: "Web Development",
    description: "A modern, animated landing page built with Next.js showcasing services, portfolio, and contact information.",
    gradient: "from-pink-600 to-rose-600",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
    link: "/"
  }
]

export function PortfolioSimple() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Gradient Orbs Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-violet-300 to-pink-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4 sm:px-0">
            Real projects we&apos;ve built and shipped
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-violet-200/50 transition-all border border-violet-100"
            >
              {/* Gradient Header */}
              <div className={`relative h-40 sm:h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <span className="absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-black/30 backdrop-blur text-white text-[10px] sm:text-xs font-semibold rounded-full">
                  {project.category}
                </span>
                <span className="text-white/90 text-2xl sm:text-3xl font-bold px-4 text-center">
                  {project.title.split("\u2014")[0].trim()}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-violet-50 text-violet-700 text-[10px] sm:text-xs font-medium rounded-full border border-violet-100">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target={project.link.startsWith("http") ? "_blank" : undefined}
                  rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1 text-violet-600 hover:text-pink-600 transition-colors text-sm font-semibold"
                >
                  View Project
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-300/50 transition-all hover:scale-105"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
