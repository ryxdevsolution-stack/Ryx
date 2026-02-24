"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "../section-label";
import { ScriptText } from "../script-text";
import { StarRating } from "../star-rating";

const CARD_ANIM = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
};

export function CaseStudiesSection() {
  return (
    <section className="relative ig-section-white overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 ig-texture" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel text="Proof in every project" variant="light" />
          <motion.h2
            className="mt-5 ig-heading-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            Proof that <ScriptText>Speaks</ScriptText> volumes
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1 - Large left card */}
          <motion.div
            className="ig-card-light p-6 sm:p-8 lg:row-span-2 flex flex-col justify-between"
            {...CARD_ANIM}
          >
            <div>
              <h3 className="ig-heading-3 mb-4 max-w-sm">
                Revamping Brand &amp; Web presence for Studio Mellow
              </h3>
              <p className="text-ig-text-muted text-sm leading-relaxed max-w-md mb-6">
                &ldquo;RYX completely transformed how our audience perceives us.
                Their strategic approach blended creativity with data to deliver
                a brand experience that truly resonates.&rdquo;
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-ig-light rounded-xl px-4 py-3">
                  <p className="text-2xl font-bold">60%</p>
                  <p className="text-xs text-ig-text-muted mt-0.5">
                    User engagement
                  </p>
                </div>
                <div className="bg-ig-light rounded-xl px-4 py-3">
                  <p className="text-2xl font-bold">45%</p>
                  <p className="text-xs text-ig-text-muted mt-0.5">
                    Online sales
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ig-light overflow-hidden">
                  <Image
                    src="/images/case-1.jpg"
                    alt="Client avatar"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Arjun Menon</p>
                  <p className="text-xs text-ig-text-muted">
                    Founder, Studio Mellow
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Top right: Happy clients + announcement */}
          <motion.div
            className="ig-card-light p-6 sm:p-8"
            {...CARD_ANIM}
            transition={{ ...CARD_ANIM.transition, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-4xl font-bold tracking-tight">72+</p>
                <p className="text-sm text-ig-text-muted mt-1">
                  Happy clients
                </p>
              </div>
              <StarRating count={5} />
            </div>

            <div className="border-t border-ig-border-light pt-4 mt-4">
              <p className="text-xs text-ig-text-muted uppercase tracking-wider mb-2">
                Coming Soon
              </p>
              <p className="text-sm font-medium mb-4">
                A Brand Transformation
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ig-dark text-white text-xs font-medium hover:bg-ig-dark/90 transition-colors"
              >
                Showreel
              </button>
            </div>
          </motion.div>

          {/* Bottom row - two cards side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 3 - Image card */}
            <motion.div
              className="ig-card-light overflow-hidden relative group"
              {...CARD_ANIM}
              transition={{ ...CARD_ANIM.transition, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/case-2.jpg"
                  alt="Digital campaign case study"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-medium text-white">
                    Digital campaign that converts
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 4 - Funding card */}
            <motion.div
              className="ig-card-light p-6 flex flex-col justify-between"
              {...CARD_ANIM}
              transition={{ ...CARD_ANIM.transition, delay: 0.3 }}
            >
              <div>
                <h4 className="font-medium text-base mb-2">
                  UX/UI that helped secure funding
                </h4>
                <p className="text-ig-text-muted text-sm leading-relaxed">
                  A pitch-ready product experience that won investor confidence.
                </p>
              </div>

              <div className="mt-6">
                <p className="text-2xl font-bold">10K+</p>
                <p className="text-xs text-ig-text-muted mt-0.5">
                  Raised in seed funding
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-ig-light">
                    <Image
                      src="/images/case-3.jpg"
                      alt="Brand logo"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-ig-text-muted">
                    NovaByte Labs
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
