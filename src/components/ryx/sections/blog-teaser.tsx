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

const POSTS = [
  {
    date: "Jan 2025",
    readTime: "5 min read",
    tag: "Web Dev",
    title: "Why Next.js App Router is the future of React",
    excerpt:
      "Server components, streaming, and nested layouts — here's why the App Router model changes how we think about performance.",
    href: "/blog",
  },
  {
    date: "Dec 2024",
    readTime: "4 min read",
    tag: "Design",
    title: "Designing for clarity: lessons from 15+ client projects",
    excerpt:
      "After shipping dozens of products, these are the UX principles that actually move the needle — no fluff, just patterns that convert.",
    href: "/blog",
  },
  {
    date: "Nov 2024",
    readTime: "6 min read",
    tag: "Business",
    title: "The real cost of a bad website for your small business",
    excerpt:
      "First impressions happen in 50ms. We break down exactly how a low-quality web presence is hurting your bottom line.",
    href: "/blog",
  },
];

const headerParent = makeStaggerParent(0.1, 0);
const cardsParent = makeStaggerParent(0.12, 0.2);

export function BlogTeaserSection() {
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
            {POSTS.map((post, i) => (
              <motion.article
                key={post.title}
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
                      {post.tag}
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
                    href={post.href}
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
