"use client"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useRef, useState } from "react"
import { Lightbulb, Code2, Rocket, Users, Globe, Zap } from "lucide-react"

const milestones = [
  {
    year: "2023",
    quarter: "Q1",
    title: "The Spark",
    description: "Founded with a vision to make cutting-edge technology accessible to businesses of all sizes.",
    icon: Lightbulb,
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
  {
    year: "2023",
    quarter: "Q3",
    title: "First Launch",
    description: "Delivered our first 10 projects spanning web development, mobile apps, and UI/UX design.",
    icon: Code2,
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20",
  },
  {
    year: "2024",
    quarter: "Q1",
    title: "Rapid Growth",
    description: "Scaled the team to 15+ specialists and expanded into AI integration and cloud solutions.",
    icon: Rocket,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
  },
  {
    year: "2024",
    quarter: "Q3",
    title: "100+ Clients",
    description: "Reached the milestone of serving over 100 clients across India and internationally.",
    icon: Users,
    gradient: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/20",
  },
  {
    year: "2025",
    quarter: "Q1",
    title: "Global Reach",
    description: "Expanded operations with clients across 5+ countries, delivering world-class solutions.",
    icon: Globe,
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    year: "2025",
    quarter: "Now",
    title: "Innovating Forward",
    description: "Pioneering AI-powered development workflows and next-gen user experiences.",
    icon: Zap,
    gradient: "from-indigo-500 to-violet-600",
    shadow: "shadow-indigo-500/20",
  },
]

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  })

  const [progress, setProgress] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(Math.min(Math.max(v, 0), 1))
  })

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-gray-50 relative"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-violet-600 mb-4">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Building the Future
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            From a bold idea to a team trusted by businesses worldwide.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px" />

          {/* Progress fill */}
          <div
            className="absolute left-6 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-violet-500 to-pink-500 md:-translate-x-px origin-top rounded-full"
            style={{ height: `${progress * 100}%`, transition: "height 0.3s ease-out" }}
          />

          {/* Milestone items */}
          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, i) => {
              const reached = progress > (i + 0.3) / milestones.length
              const isEven = i % 2 === 0

              return (
                <motion.div
                  key={`${milestone.year}-${milestone.quarter}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on line */}
                  <div className="absolute left-6 md:left-1/2 top-1 w-3.5 h-3.5 -translate-x-[7px] md:-translate-x-[7px] z-10">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-all duration-500 ${
                        reached ? "bg-violet-500 shadow-md shadow-violet-500/30" : "bg-gray-300"
                      }`}
                    />
                  </div>

                  {/* Spacer for mobile line */}
                  <div className="w-12 shrink-0 md:hidden" />

                  {/* Card */}
                  <div className={`flex-1 md:w-[calc(50%-2rem)] ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                    <div
                      className={`bg-white rounded-2xl border p-6 transition-all duration-300 ${
                        reached ? "border-gray-200/60 shadow-sm hover:shadow-lg hover:shadow-gray-200/50" : "border-gray-100 opacity-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-500 ${
                            reached ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {milestone.year} {milestone.quarter}
                        </span>
                        {i === milestones.length - 1 && (
                          <span className="text-[10px] font-bold text-violet-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
                            NOW
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-3">
                        <div
                          className={`shrink-0 w-10 h-10 bg-gradient-to-br ${milestone.gradient} rounded-xl flex items-center justify-center shadow-lg ${reached ? milestone.shadow : ""} transition-all duration-500`}
                        >
                          <milestone.icon
                            className="w-4.5 h-4.5 text-white"
                          />
                        </div>
                        <div>
                          <h3
                            className={`text-base font-bold mb-1 transition-colors duration-500 ${
                              reached ? "text-gray-900" : "text-gray-400"
                            }`}
                          >
                            {milestone.title}
                          </h3>
                          <p
                            className={`text-sm leading-relaxed transition-colors duration-500 ${
                              reached ? "text-gray-500" : "text-gray-300"
                            }`}
                          >
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for opposite side on desktop */}
                  <div className="hidden md:block flex-1 md:w-[calc(50%-2rem)]" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
