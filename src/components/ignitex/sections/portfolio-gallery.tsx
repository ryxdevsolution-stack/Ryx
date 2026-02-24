"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ScriptText } from "../script-text";
import { SectionLabel } from "../section-label";

const GALLERY_IMAGES = [
  { src: "/images/gallery-1.jpg", alt: "Portfolio project 1" },
  { src: "/images/gallery-2.jpg", alt: "Portfolio project 2" },
  { src: "/images/gallery-3.jpg", alt: "Portfolio project 3" },
  { src: "/images/gallery-4.jpg", alt: "Portfolio project 4" },
  { src: "/images/gallery-5.jpg", alt: "Portfolio project 5" },
  { src: "/images/gallery-6.jpg", alt: "Portfolio project 6" },
];

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export function PortfolioGallerySection() {
  return (
    <section className="ig-section-white relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 ig-texture opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label - right-aligned */}
        <div className="flex justify-end mb-10 sm:mb-14">
          <SectionLabel text="Our creative collabs" variant="light" />
        </div>

        {/* Main heading */}
        <motion.div
          className="mb-12 sm:mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="flex flex-wrap items-baseline gap-x-4 sm:gap-x-6">
            <motion.span
              className="text-5xl sm:text-7xl lg:text-[100px] xl:text-[140px] font-medium tracking-tight leading-[0.9]"
              custom={0}
              variants={FADE_UP}
            >
              Ideas
            </motion.span>
            <motion.span
              className="text-5xl sm:text-7xl lg:text-[100px] xl:text-[140px]"
              custom={0.1}
              variants={FADE_UP}
            >
              <ScriptText className="text-ig-text-muted">&amp;</ScriptText>
            </motion.span>
            <motion.span
              className="text-5xl sm:text-7xl lg:text-[100px] xl:text-[140px] font-medium tracking-tight leading-[0.9]"
              custom={0.2}
              variants={FADE_UP}
            >
              Execution
            </motion.span>
          </div>
        </motion.div>

        {/* Description + year */}
        <motion.div
          className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex items-start gap-8">
            <span className="text-2xl sm:text-3xl font-medium text-ig-text-muted">
              (@2K25)
            </span>
            <p className="ig-body text-ig-text-muted max-w-lg">
              From brand launches to full-scale web builds, <strong className="text-black font-semibold">every piece of work</strong> we
              create is driven by strategy, <strong className="text-black font-semibold">built with precision</strong>, and designed to
              make an impact.
            </p>
          </div>

          <SectionLabel text="The back catalog" variant="light" />
        </motion.div>

        {/* Gallery strip */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              className="relative aspect-[4/5] rounded-xl overflow-hidden bg-ig-light border border-ig-border-light group"
              custom={i * 0.08}
              variants={FADE_UP}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
