"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Eye, Heart } from 'lucide-react'

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Modern shopping experience with AI recommendations",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    gradient: "from-violet-600 to-purple-600",
    stats: { views: "12K", likes: "3.4K" }
  },
  {
    title: "SaaS Dashboard",
    category: "UI/UX Design",
    description: "Analytics dashboard with real-time data",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    gradient: "from-blue-600 to-cyan-600",
    stats: { views: "8K", likes: "2.1K" }
  },
  {
    title: "Mobile Banking App",
    category: "Mobile Development",
    description: "Secure banking with biometric authentication",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop",
    gradient: "from-pink-600 to-rose-600",
    stats: { views: "15K", likes: "4.8K" }
  },
  {
    title: "AI Content Platform",
    category: "AI/ML",
    description: "Automated content generation with GPT-4",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    gradient: "from-green-600 to-teal-600",
    stats: { views: "20K", likes: "6.2K" }
  },
  {
    title: "Social Media Tool",
    category: "Full Stack",
    description: "Complete social media management solution",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    gradient: "from-orange-600 to-amber-600",
    stats: { views: "10K", likes: "3.5K" }
  },
  {
    title: "Healthcare Platform",
    category: "Healthcare Tech",
    description: "Telemedicine and patient management system",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    gradient: "from-indigo-600 to-purple-600",
    stats: { views: "18K", likes: "5.7K" }
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
            Showcasing our best work across various industries
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-violet-200/50 transition-all border border-violet-100"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-40`} />

                {/* Category Badge */}
                <span className="absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-black/50 backdrop-blur text-white text-[10px] sm:text-xs font-semibold rounded-full">
                  {project.category}
                </span>

                {/* Stats */}
                <div className="absolute bottom-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <Eye className="w-4 h-4" />
                    {project.stats.views}
                  </div>
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <Heart className="w-4 h-4" />
                    {project.stats.likes}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">{project.description}</p>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1 text-violet-600 hover:text-pink-600 transition-colors text-sm font-semibold"
                >
                  View Project
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
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
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-300/50 transition-all hover:scale-105"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}