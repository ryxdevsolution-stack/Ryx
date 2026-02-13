"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Github } from "lucide-react"

const team = [
  {
    name: "Sowmiya",
    role: "Founder & Lead Designer",
    description: "Creative visionary crafting stunning user experiences and driving the brand's design excellence.",
    initials: "S",
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
  {
    name: "Ramesh",
    role: "Co-Founder & Tech Lead",
    description: "Full-stack architect specializing in scalable systems, cloud infrastructure, and end-to-end development.",
    initials: "R",
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
  {
    name: "Logesh",
    role: "Co-Founder & Tech Lead",
    description: "Full-stack engineer building robust applications and pioneering AI-powered solutions.",
    initials: "L",
    gradient: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/20",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
]

export function TeamAnimated() {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
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
            Meet Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Leadership Team
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Passionate innovators driving digital excellence for every client.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group bg-white rounded-2xl border border-gray-200/60 p-8 h-full hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300/80 transition-all duration-300">
                {/* Avatar */}
                <div className={`w-16 h-16 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg ${member.shadow}`}>
                  <span className="text-xl font-bold text-white">{member.initials}</span>
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-violet-600 font-medium mb-4">{member.role}</p>

                {/* Description */}
                <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                  {member.description}
                </p>

                {/* Social */}
                <div className="flex gap-2">
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s LinkedIn`}
                    className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors duration-200"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s Twitter`}
                    className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s GitHub`}
                    className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
