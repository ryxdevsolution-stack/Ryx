"use client"

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'

const ParticleMolecule = dynamic(() => import('@/components/ui/particle-molecule'), { ssr: false })

export function Hero3D() {
  return (
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

      {/* Particle molecule animation */}
      <ParticleMolecule className="absolute inset-0 z-[1]" />

      {/* Subtle light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-purple-50/30 z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8 bg-white/80 backdrop-blur-md rounded-full border border-violet-200 shadow-lg shadow-violet-100"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
            <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Built in Coimbatore, Serving Globally</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            <span className="inline-block bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              We Build Software
            </span>
            <br />
            <span className="text-gray-900 drop-shadow-sm">That Actually Solves Your Business Problems</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 sm:mb-14 px-4 sm:px-0 font-light leading-relaxed"
          >
            From GST-compliant billing software to custom CRMs and web apps — we don&apos;t just write code, we build tools that run your business smoother.
            <span className="block mt-2 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-semibold">Offline or online, your workflow never stops.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center px-4 sm:px-0"
          >
            <a
              href="https://wa.me/916374853277"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-base sm:text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-violet-300/50 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Talk to Us on WhatsApp</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="https://mj-billing.vercel.app/landing"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-white backdrop-blur-xl border-2 border-violet-200 text-gray-900 text-base sm:text-lg font-bold rounded-2xl hover:bg-violet-50 hover:border-violet-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Try Valoryx Free
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600 group-hover:text-pink-600 transition-colors" />
            </a>
          </motion.div>

          {/* Trust Line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 text-sm text-gray-500 font-medium"
          >
            No credit card needed &bull; 14-day free trial &bull; Made in India
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 sm:w-7 sm:h-12 rounded-full border-2 border-violet-400 flex justify-center bg-white/50 backdrop-blur-sm shadow-lg">
          <motion.div
            className="w-1.5 h-3 sm:h-4 bg-violet-600 rounded-full mt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}