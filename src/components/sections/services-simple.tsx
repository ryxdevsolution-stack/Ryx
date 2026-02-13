"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Database, Smartphone, Palette, Cpu, Globe, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const SectionParticles = dynamic(
  () => import('@/components/ui/section-particles').then(mod => ({ default: mod.SectionParticles })),
  { ssr: false }
)

const SERVICES_PARTICLE_COLORS = [
  { r: 147, g: 51, b: 234 },   // violet-600
  { r: 236, g: 72, b: 153 },   // pink-500
  { r: 251, g: 146, b: 60 },   // orange-400
  { r: 168, g: 85, b: 247 },   // purple-500
  { r: 244, g: 114, b: 182 },  // pink-400
]

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies",
    features: ["React/Next.js", "Responsive Design", "SEO Optimization"],
    gradient: "from-violet-600 to-purple-600"
  },
  {
    icon: Database,
    title: "Database Solutions",
    description: "Scalable database architecture and management",
    features: ["PostgreSQL", "MongoDB", "Performance Optimization"],
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications",
    features: ["React Native", "iOS/Android", "App Store Deployment"],
    gradient: "from-pink-600 to-rose-600"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that enhance user experience",
    features: ["User Research", "Prototyping", "Design Systems"],
    gradient: "from-orange-600 to-amber-600"
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description: "Intelligent solutions powered by machine learning",
    features: ["ChatGPT Integration", "Custom ML Models", "NLP Solutions"],
    gradient: "from-green-600 to-teal-600"
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    description: "Strategic marketing to grow your online presence",
    features: ["SEO Strategy", "Content Marketing", "Analytics"],
    gradient: "from-indigo-600 to-purple-600"
  }
]

function getCardStyle(position: number) {
  // position: -2, -1, 0, 1, 2 (0 = center/front)
  switch (position) {
    case 0:
      return {
        x: 0,
        scale: 1,
        zIndex: 30,
        opacity: 1,
        rotateY: 0,
        filter: 'blur(0px)',
      }
    case -1:
      return {
        x: '-65%',
        scale: 0.85,
        zIndex: 20,
        opacity: 0.7,
        rotateY: 15,
        filter: 'blur(1px)',
      }
    case 1:
      return {
        x: '65%',
        scale: 0.85,
        zIndex: 20,
        opacity: 0.7,
        rotateY: -15,
        filter: 'blur(1px)',
      }
    case -2:
      return {
        x: '-110%',
        scale: 0.7,
        zIndex: 10,
        opacity: 0.4,
        rotateY: 25,
        filter: 'blur(2px)',
      }
    case 2:
      return {
        x: '110%',
        scale: 0.7,
        zIndex: 10,
        opacity: 0.4,
        rotateY: -25,
        filter: 'blur(2px)',
      }
    default:
      return {
        x: position < 0 ? '-140%' : '140%',
        scale: 0.5,
        zIndex: 0,
        opacity: 0,
        rotateY: position < 0 ? 30 : -30,
        filter: 'blur(4px)',
      }
  }
}

export function ServicesSimple() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % services.length)
  }, [])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
  }, [])

  const getPosition = (index: number) => {
    let diff = index - activeIndex
    // Wrap around for circular carousel
    if (diff > services.length / 2) diff -= services.length
    if (diff < -services.length / 2) diff += services.length
    return diff
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-300 to-purple-400 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <SectionParticles
        className="z-[1]"
        particleCount={350}
        colors={SERVICES_PARTICLE_COLORS}
        connectionDistance={110}
        speed={0.8}
        opacity={0.6}
        maxLineAlpha={0.12}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2.5 mb-6 text-sm font-bold bg-white border-2 border-violet-300 rounded-full shadow-lg shadow-violet-100 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent"
          >
            What We Offer
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Premium Services
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto px-4 sm:px-0 font-light">
            Transform your business with cutting-edge digital solutions
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative" style={{ perspective: '1200px' }}>
          {/* Cards Container */}
          <div className="relative h-[420px] sm:h-[400px] flex items-center justify-center">
            {services.map((service, index) => {
              const position = getPosition(index)
              const style = getCardStyle(position)

              return (
                <motion.div
                  key={service.title}
                  className="absolute w-[85%] sm:w-[380px] md:w-[360px]"
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    opacity: style.opacity,
                    rotateY: style.rotateY,
                    filter: style.filter,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 30,
                    mass: 0.8,
                  }}
                  style={{
                    zIndex: style.zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => position !== 0 && setActiveIndex(index)}
                  role={position !== 0 ? 'button' : undefined}
                  tabIndex={position !== 0 ? 0 : undefined}
                >
                  <div
                    className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-2 transition-all duration-300 h-[380px] flex flex-col ${
                      position === 0
                        ? 'border-violet-300 shadow-2xl shadow-violet-200/50'
                        : 'border-violet-100 shadow-lg cursor-pointer'
                    }`}
                  >
                    {/* Gradient background overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl ${position === 0 ? 'opacity-[0.04]' : 'opacity-[0.02]'}`} />

                    {/* Icon */}
                    <div className="relative mb-5">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`relative text-xl sm:text-2xl font-bold mb-3 ${
                      position === 0
                        ? 'bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent'
                        : 'text-gray-900'
                    }`}>
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="relative text-base text-gray-600 mb-5 font-normal leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="relative space-y-2.5 mt-auto">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Decorative corner */}
                    {position === 0 && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-200/40 to-transparent rounded-bl-full" />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              onClick={goPrev}
              className="w-12 h-12 bg-white/90 backdrop-blur border-2 border-violet-200 rounded-full flex items-center justify-center text-violet-600 hover:bg-violet-50 hover:border-violet-400 shadow-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous service"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 h-2.5 bg-gradient-to-r from-violet-600 to-pink-600'
                      : 'w-2.5 h-2.5 bg-violet-300 hover:bg-violet-400'
                  }`}
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={goNext}
              className="w-12 h-12 bg-white/90 backdrop-blur border-2 border-violet-200 rounded-full flex items-center justify-center text-violet-600 hover:bg-violet-50 hover:border-violet-400 shadow-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next service"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16 sm:mt-20"
        >
          <Link
            href="/services"
            className="group relative inline-flex items-center justify-center gap-3 px-10 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-lg sm:text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-violet-300/50 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">Explore All Services</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
