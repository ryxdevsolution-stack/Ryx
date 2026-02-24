"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PillButton } from "../pill-button";
import Image from "next/image";

interface Project {
  title: string[];
  tags: string[];
  href: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    title: ["Valoryx", "Billing"],
    tags: ["SaaS Platform", "GST Billing"],
    href: "/portfolio",
    image: "/images/project-valoryx.jpg",
  },
  {
    title: ["Client", "Portal"],
    tags: ["Web Application", "Dashboard"],
    href: "/portfolio",
    image: "/images/project-portal.jpg",
  },
  {
    title: ["Mobile", "Commerce"],
    tags: ["React Native", "E-commerce"],
    href: "/portfolio",
    image: "/images/project-mobile.jpg",
  },
  {
    title: ["Brand", "Identity"],
    tags: ["UI/UX Design", "Branding"],
    href: "/portfolio",
    image: "/images/project-brand.jpg",
  },
];

export function ProjectShowcaseSection() {
  const [current, setCurrent] = useState(0);
  const project = PROJECTS[current];

  const goPrev = () =>
    setCurrent((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  const goNext = () =>
    setCurrent((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative bg-ig-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Left - Project info */}
            <div className="flex flex-col justify-between py-4">
              <div className="space-y-6">
                <div>
                  {project.title.map((line, i) => (
                    <h2
                      key={line}
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight"
                    >
                      {i === 1 && (
                        <span className="ig-script text-white/60">
                          {line}
                        </span>
                      )}
                      {i === 0 && line}
                    </h2>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full bg-white/10 text-sm text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <PillButton
                  label="View project"
                  href={project.href}
                  variant="dark"
                  size="md"
                />
              </div>
            </div>

            {/* Right - Project image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ig-dark-card">
              <Image
                src={project.image}
                alt={project.title.join(" ")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls */}
        <div className="flex items-center gap-6 mt-10">
          <button
            onClick={goPrev}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous project"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-white">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/30">
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>

          <button
            onClick={goNext}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
            aria-label="Next project"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
