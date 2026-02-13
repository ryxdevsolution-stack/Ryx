"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "CEO, TechStart India",
    content: "RYX transformed our vision into reality with their exceptional development skills. The team's dedication and innovative approach exceeded our expectations.",
    rating: 5,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Michael Chen",
    role: "Founder, DataFlow Solutions",
    content: "Working with RYX was a game-changer for our business. Their expertise in database management and AI integration helped us scale efficiently.",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Sarah Williams",
    role: "Product Manager, CloudNine",
    content: "The UI/UX design delivered by RYX was stunning. They understood our brand perfectly and created an interface that our users love.",
    rating: 5,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Raj Patel",
    role: "CTO, FinTech Pro",
    content: "RYX's technical expertise is outstanding. They built our complex financial platform with robust security and seamless performance.",
    rating: 5,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Emma Johnson",
    role: "Marketing Director, BrandBoost",
    content: "The digital marketing solutions from RYX significantly improved our online presence. Our conversion rates increased by 200%!",
    rating: 5,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    name: "David Kim",
    role: "CEO, HealthTech Solutions",
    content: "RYX delivered our healthcare platform on time and within budget. Their attention to detail and commitment to quality is remarkable.",
    rating: 5,
    gradient: "from-indigo-500 to-blue-600",
  },
]

export function TestimonialsAnimated() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-violet-600 mb-4">
            Client Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Real feedback from businesses we&apos;ve helped transform.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation */}
          <button
            onClick={handlePrevious}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 hover:shadow-md transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 hover:shadow-md transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid md:grid-cols-2 gap-6"
              >
                {[0, 1].map((offset) => {
                  const index = (currentIndex + offset) % testimonials.length
                  const testimonial = testimonials[index]

                  return (
                    <div
                      key={`${currentIndex}-${offset}`}
                      className={offset === 1 ? "hidden md:block" : ""}
                    >
                      <div className="h-full bg-white rounded-2xl border border-gray-200/60 p-8 flex flex-col hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300">
                        {/* Stars */}
                        <div className="flex gap-0.5 mb-5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>

                        {/* Content */}
                        <p className="text-gray-600 leading-relaxed text-[15px] mb-6 flex-1">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                          <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.gradient} rounded-xl flex items-center justify-center shadow-sm`}>
                            <span className="text-xs font-bold text-white">
                              {testimonial.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">
                              {testimonial.name}
                            </h4>
                            <p className="text-xs text-gray-400">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-violet-600"
                    : "w-1.5 bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
