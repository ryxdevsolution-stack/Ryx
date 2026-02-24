"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "../section-label";
import { ScriptText } from "../script-text";
import { StarRating } from "../star-rating";

interface ReviewBadgeProps {
  rating: number;
  reviewCount: number;
  source: string;
}

function ReviewBadge({ rating, reviewCount, source }: ReviewBadgeProps) {
  return (
    <motion.div
      className="ig-card-light px-5 py-4 flex items-center gap-4 min-w-[200px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <p className="text-2xl font-semibold tracking-tight">{rating}</p>
        <StarRating variant="yellow" rating={rating} className="mt-1" />
      </div>
      <div className="border-l border-ig-border-light pl-4">
        <p className="text-xs text-ig-text-muted font-medium uppercase tracking-wider">
          {source}
        </p>
        <p className="text-xs text-ig-text-muted mt-0.5">
          {reviewCount} reviews
        </p>
      </div>
    </motion.div>
  );
}

function DiscussCard() {
  return (
    <Link href="/contact" className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8">
      <motion.div
        className="bg-white rounded-2xl shadow-xl px-5 py-4 max-w-[220px] cursor-pointer group"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        whileHover={{ y: -3 }}
      >
        <p className="text-sm font-medium leading-snug text-black">
          Discuss your projects
        </p>
        <p className="text-xs text-ig-text-muted mt-1">
          Speak with the team lead
        </p>
        <div className="mt-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
          <ArrowUpRight size={14} />
        </div>
      </motion.div>
    </Link>
  );
}

export function AboutStudioSection() {
  return (
    <section className="relative ig-section-light overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 ig-texture" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label row */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel text="Inside the Studio" variant="light" />
          <span className="text-xs text-ig-text-muted tracking-wider hidden sm:block">
            (&copy;23-25)
          </span>
          <span className="text-xs text-ig-text-muted tracking-wider hidden sm:block">
            11.0168&deg; N, 76.9558&deg; E
          </span>
        </motion.div>

        {/* Large tagline */}
        <motion.h2
          className="ig-heading-1 max-w-5xl mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          Driven by <ScriptText>Strategy,</ScriptText> fueled by imagination.
          We craft design-first solutions that help{" "}
          <ScriptText>Brands</ScriptText> stand out and thrive in the digital
          age.
        </motion.h2>

        {/* Review badges */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-14 sm:mb-20">
          <ReviewBadge rating={4.9} reviewCount={250} source="Clutch" />
          <ReviewBadge rating={4.0} reviewCount={186} source="DesignRush" />
        </div>

        {/* Team photo with overlay card */}
        <motion.div
          className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-ig-light"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src="/images/team-studio.jpg"
            alt="RYX team working together"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <DiscussCard />
        </motion.div>
      </div>
    </section>
  );
}
