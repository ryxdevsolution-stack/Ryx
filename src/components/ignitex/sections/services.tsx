"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Clock } from "lucide-react";
import { ScriptText } from "../script-text";
import { SectionLabel } from "../section-label";
import { PillButton } from "../pill-button";

interface ServiceItem {
  num: string;
  title: string;
  description: string;
  tags: string[];
  timeline: string;
  image: string;
}

const SERVICES: ServiceItem[] = [
  {
    num: "01",
    title: "Custom Software Development",
    description:
      "We build robust, scalable software solutions tailored to your business needs.",
    tags: ["SaaS platforms", "API development", "Database design", "Cloud infrastructure", "Automation"],
    timeline: "4-8 weeks",
    image: "/images/service-1.jpg",
  },
  {
    num: "02",
    title: "Web & Mobile Applications",
    description:
      "Full-stack web and mobile apps that deliver seamless user experiences.",
    tags: ["React/Next.js", "React Native", "Progressive Web Apps", "E-commerce", "Dashboards"],
    timeline: "3-6 weeks",
    image: "/images/service-2.jpg",
  },
  {
    num: "03",
    title: "UI/UX Strategy",
    description:
      "User-centered design that drives engagement and conversion.",
    tags: ["User research", "Wireframing", "Prototyping", "Design systems", "Usability testing"],
    timeline: "2-4 weeks",
    image: "/images/service-3.jpg",
  },
  {
    num: "04",
    title: "Billing & CRM Solutions",
    description:
      "GST-compliant billing and customer management systems.",
    tags: ["Valoryx billing", "Invoice management", "Customer tracking", "Analytics", "Reporting"],
    timeline: "3-5 weeks",
    image: "/images/service-4.jpg",
  },
];

const detailVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto" as const,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="ig-section-dark relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 ig-texture-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel text="What we craft" variant="dark" />
          <motion.h2
            className="mt-5 ig-heading-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            Solutions that <ScriptText className="text-ig-text-light-muted">Drive</ScriptText> results
          </motion.h2>
        </div>

        {/* Service list */}
        <motion.div
          className="divide-y divide-ig-white-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {SERVICES.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <div key={service.num}>
                <button
                  onClick={() => setActiveIndex(index)}
                  className="w-full flex items-center justify-between gap-4 py-5 sm:py-7 group text-left cursor-pointer"
                  aria-expanded={isActive}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="ig-script text-ig-text-light-muted text-sm">
                      ({service.num})
                    </span>
                    <span
                      className={`text-lg sm:text-xl md:text-2xl font-medium transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/60 group-hover:text-white/90"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  <motion.span
                    className="shrink-0 text-white/40 group-hover:text-white/70 transition-colors"
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      variants={detailVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="overflow-hidden"
                    >
                      <div className="pb-8 sm:pb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <div className="space-y-6">
                          <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-md">
                            {service.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ig-white-5 border border-ig-white-10 text-xs text-white/70"
                              >
                                <span className="w-1 h-1 rounded-full bg-ig-green" />
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 text-ig-text-light-muted text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{service.timeline}</span>
                          </div>
                        </div>

                        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[240px] rounded-2xl overflow-hidden bg-ig-dark-card border border-ig-white-10">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-ig-white-5 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <PillButton label="See pricing" href="#pricing" variant="dark" size="md" />
        </motion.div>
      </div>
    </section>
  );
}
