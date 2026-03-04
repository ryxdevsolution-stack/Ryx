"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import { SectionLabel } from "../section-label";
import { PillButton } from "../pill-button";
import { CinematicHeading } from "../cinematic-heading";
import { SectionReveal } from "../section-reveal";
import { makeStaggerParent, FADE_UP_CHILD, SLIDE_UP_CHILD } from "../motion";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogTeaserSectionProps {
  posts: BlogPostMeta[];
}

const headerParent = makeStaggerParent(0.1, 0);
const cardsParent = makeStaggerParent(0.12, 0.2);

export function BlogTeaserSection({ posts }: BlogTeaserSectionProps) {
  return (
    <ParallaxBanner className="ig-section-white">
      {/* Background texture */}
      <ParallaxBannerLayer
        translateY={[-16, 16]}
        scale={[1.06, 1]}
        shouldAlwaysCompleteAnimation
        className="ig-texture opacity-40"
      />

      {/* Content */}
      <div className="relative z-10 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <SectionReveal
            variants={headerParent}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14"
            amount={0.2}
          >
            <div>
              <motion.div variants={FADE_UP_CHILD}>
                <SectionLabel text="Insights & articles" variant="light" />
              </motion.div>
              <motion.div variants={FADE_UP_CHILD} className="mt-5">
                <CinematicHeading className="ig-heading-1" variant="light" delay={0}>
                  Ideas worth Reading
                </CinematicHeading>
              </motion.div>
            </div>
            <motion.div variants={FADE_UP_CHILD}>
              <PillButton label="View all articles" href="/blog" variant="dark" size="md" />
            </motion.div>
          </SectionReveal>

          {/* Cards */}
          <SectionReveal
            variants={cardsParent}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            amount={0.1}
          >
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                variants={SLIDE_UP_CHILD}
                className="group flex flex-col border border-neutral-200 rounded-2xl overflow-hidden bg-white hover:border-neutral-400 transition-colors duration-300"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {/* Colour accent bar — subtle offset per card */}
                <div
                  className="h-1 w-full"
                  style={{
                    background: `linear-gradient(to right, hsl(${140 + i * 20}, 70%, 45%), transparent)`,
                  }}
                />

                <div className="flex-1 p-7 flex flex-col gap-4">
                  {/* Meta */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-500 font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-neutral-400">{post.date}</span>
                    <span className="text-neutral-200">·</span>
                    <span className="text-xs text-neutral-400">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-black leading-snug group-hover:text-neutral-700 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-neutral-500 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {/* CTA */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-black hover:gap-2.5 transition-all duration-200"
                    aria-label={`Read ${post.title}`}
                  >
                    Read article
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </SectionReveal>

        </div>
      </div>
    </ParallaxBanner>
  );
}
