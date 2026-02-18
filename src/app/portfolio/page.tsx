"use client"

import { NavbarMinimal } from "@/components/layout/navbar-minimal"
import { FooterMinimal } from "@/components/layout/footer-minimal"
import { AnimatedCursor } from "@/components/ui/animated-cursor"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Tilt from "react-parallax-tilt"
import {
  ArrowUpRight, Globe,
  Play, Layers,
  Sparkles, Code
} from "lucide-react"

// Featured projects data
const featuredProjects = [
  {
    id: 1,
    title: "Valoryx — GST Billing Software",
    category: "Full Stack Product",
    description: "A complete billing and inventory management system for Indian retail businesses. Works offline with SQLite, syncs to cloud via Supabase. Features GST-compliant invoicing, real-time inventory tracking, payment management, audit logs, and thermal printer support.",
    technologies: ["Next.js", "Supabase", "SQLite", "Tailwind CSS"],
    results: {
      feature1: "Offline + Online",
      feature2: "GST Compliant",
      feature3: "Thermal Print"
    },
    gradient: "from-violet-600 to-purple-600",
    link: "https://mj-billing.vercel.app/landing",
    live: "https://mj-billing.vercel.app/landing"
  },
  {
    id: 2,
    title: "RYX — Company Landing Page",
    category: "Web Development",
    description: "A modern, animated landing page built with Next.js showcasing our services, portfolio, and contact information. Features smooth animations, responsive design, and SEO optimization.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
    results: {
      feature1: "3D Particles",
      feature2: "AI Chatbot",
      feature3: "SEO Optimized"
    },
    gradient: "from-pink-600 to-rose-600",
    link: "/",
    live: "/"
  }
]

// Project categories
const categories = [
  { name: "All", count: 2, icon: Layers },
  { name: "Full Stack", count: 1, icon: Code },
  { name: "Web Development", count: 1, icon: Globe },
]

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })


  return (
    <>
      <AnimatedCursor />
      <NavbarMinimal />
      <main ref={containerRef} className="min-h-screen">
        {/* Hero Section with Floating Gradient Orbs */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {/* Beautiful floating gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Top left - Blue to Violet */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full opacity-20 blur-3xl animate-float" />

            {/* Top right - Purple to Pink */}
            <div className="absolute top-20 -right-20 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-25 blur-3xl animate-float"
                 style={{ animationDelay: '2s', animationDuration: '25s' }} />

            {/* Center - Violet glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-300 to-fuchsia-400 rounded-full opacity-15 blur-3xl animate-pulse"
                 style={{ animationDuration: '10s' }} />

            {/* Bottom left - Pink to Orange */}
            <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-to-br from-pink-400 to-orange-300 rounded-full opacity-20 blur-3xl animate-float"
                 style={{ animationDelay: '4s', animationDuration: '30s' }} />

            {/* Bottom right - Blue accent */}
            <div className="absolute -bottom-20 -right-10 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-3xl animate-float"
                 style={{ animationDelay: '1s', animationDuration: '22s' }} />
          </div>

          {/* Subtle light overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-purple-50/30 z-10" />

          {/* Hero Content */}
          <div className="container mx-auto px-6 md:px-12 relative z-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/80 backdrop-blur-xl rounded-full border border-violet-100 shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Featured Portfolio</span>
                <Sparkles className="w-4 h-4 text-pink-600" />
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-gray-900"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.span
                  className="inline-block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{
                    backgroundImage: "linear-gradient(90deg, #8B5CF6, #EC4899, #10B981, #8B5CF6)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Our Work
                </motion.span>
                <br />
                <span className="text-5xl md:text-6xl lg:text-7xl">
                  Real Projects, Real Results
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12"
              >
                Projects we've actually built and shipped — no stock images, no fake metrics
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              >
                {[
                  { value: "5+", label: "Projects Delivered" },
                  { value: "1", label: "Live SaaS Product" },
                  { value: "10+", label: "Technologies We Use" }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-900"
                  >
                    <motion.div
                      className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-700">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 rounded-full border-2 border-violet-400 flex justify-center bg-white/50 backdrop-blur-sm shadow-lg">
                <motion.div
                  className="w-1 h-3 bg-violet-600 rounded-full mt-2"
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-20 bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`group relative px-6 py-3 rounded-full font-semibold transition-all border ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white border-transparent shadow-xl shadow-violet-200/50'
                      : 'bg-white/80 backdrop-blur-md text-gray-900 border-violet-100 hover:border-violet-300 hover:bg-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
                    {category.name}
                    <span className="text-xs opacity-60">({category.count})</span>
                  </span>
                  {selectedCategory === category.name && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 opacity-20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Projects Grid */}
        <section className="py-32 bg-gradient-to-br from-pink-50 to-orange-50 relative overflow-hidden">
          {/* Animated particles */}
          <motion.div style={{ y }} className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-violet-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </motion.div>

          <motion.div style={{ opacity }} className="container mx-auto px-6 md:px-12 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Handpicked selection of our best work across various industries
              </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group relative"
                >
                  <Tilt
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    perspective={1000}
                    scale={1.02}
                  >
                    <motion.div
                      className="relative bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-violet-100 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-300"
                      whileHover={{ y: -10 }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Image/Video Container */}
                      <div className="relative h-96 overflow-hidden">
                        <motion.div
                          className="absolute inset-0"
                          animate={hoveredProject === project.id ? { scale: 1.1 } : { scale: 1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                            <span className="text-white/80 text-4xl font-bold">{project.title.split("\u2014")[0].trim()}</span>
                          </div>
                        </motion.div>

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-40`} />

                        {/* Category Badge */}
                        <motion.div
                          className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-violet-100"
                          initial={{ x: -100, opacity: 0 }}
                          animate={hoveredProject === project.id ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">{project.category}</span>
                        </motion.div>

                        {/* Play Button (for video preview) */}
                        <motion.button
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={hoveredProject === project.id ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </motion.button>

                        {/* Tech Stack */}
                        <motion.div
                          className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2"
                          initial={{ y: 100, opacity: 0 }}
                          animate={hoveredProject === project.id ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {project.technologies.map((tech, i) => (
                            <motion.span
                              key={tech}
                              initial={{ scale: 0 }}
                              animate={hoveredProject === project.id ? { scale: 1 } : { scale: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                              className="px-3 py-1 bg-white/20 backdrop-blur-xl text-white text-xs font-semibold rounded-full"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        {/* Title */}
                        <div className="mb-4">
                          <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                            {project.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-6">
                          {project.description}
                        </p>

                        {/* Results */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {Object.entries(project.results).map(([key, value], i) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, y: 20 }}
                              animate={hoveredProject === project.id ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              className="text-center"
                            >
                              <motion.div
                                className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                                animate={hoveredProject === project.id ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 0.5 }}
                              >
                                {value}
                              </motion.div>
                              <div className="text-xs text-gray-700 capitalize">{key}</div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                          <motion.a
                            href={project.link}
                            className={`flex-1 py-3 text-center font-semibold rounded-full bg-gradient-to-r ${project.gradient} text-white shadow-lg hover:shadow-xl transition-all`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Project
                          </motion.a>
                          <motion.a
                            href={project.live}
                            className="p-3 bg-violet-100 hover:bg-violet-200 rounded-full transition-colors border border-violet-200"
                            whileHover={{ scale: 1.1, rotate: -360 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Globe className="w-5 h-5 text-violet-600" />
                          </motion.a>
                        </div>
                      </div>

                      {/* Hover Effects - Floating particles */}
                      {hoveredProject === project.id && (
                        <>
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`absolute w-2 h-2 bg-gradient-to-r ${project.gradient} rounded-full`}
                              initial={{
                                x: Math.random() * 400,
                                y: 500,
                                opacity: 0
                              }}
                              animate={{
                                y: -100,
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                delay: i * 0.1,
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </>
                      )}
                    </motion.div>
                  </Tilt>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
          {/* Floating gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full opacity-20 blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-300 rounded-full opacity-20 blur-3xl animate-float"
                 style={{ animationDelay: '3s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full opacity-15 blur-3xl animate-pulse"
                 style={{ animationDuration: '8s' }} />
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                  Have a Project in Mind?
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12">
                Let's collaborate to bring your vision to life with cutting-edge technology and creative excellence
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-2xl group"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Your Project</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowUpRight className="w-6 h-6" />
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
      <FooterMinimal />
    </>
  )
}