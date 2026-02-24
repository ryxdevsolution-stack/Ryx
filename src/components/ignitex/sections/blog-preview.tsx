"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "../section-label";
import { ScriptText } from "../script-text";
import { PillButton } from "../pill-button";

interface BlogPost {
  image: string;
  date: string;
  readTime: string;
  title: string;
  slug: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    image: "/images/blog-1.jpg",
    date: "Jul 8, 2025",
    readTime: "2 min read",
    title: "Design that converts: What really works in 2025",
    slug: "design-that-converts",
  },
  {
    image: "/images/blog-2.jpg",
    date: "Jul 2, 2025",
    readTime: "5 min read",
    title: "Why Next.js is the future of web development",
    slug: "nextjs-future-web-development",
  },
  {
    image: "/images/blog-3.jpg",
    date: "Jun 21, 2025",
    readTime: "2 min read",
    title: "Branding mistakes you didn't know you were making",
    slug: "branding-mistakes",
  },
];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        {/* Image */}
        <motion.div
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ig-light mb-4"
          whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        </motion.div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-ig-text-muted mb-2">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-ig-text-muted/40" />
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-medium leading-snug group-hover:text-ig-text-muted transition-colors duration-300">
          {post.title}
        </h3>
      </Link>
    </motion.div>
  );
}

export function BlogPreviewSection() {
  return (
    <section className="relative ig-section-white overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 ig-texture" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <SectionLabel text="Insights & Inspiration" variant="light" />
            <motion.h2
              className="mt-5 ig-heading-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              Explore our <ScriptText>Latest</ScriptText> journal
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PillButton
              label="View all blogs"
              href="/blog"
              variant="dark"
              size="md"
            />
          </motion.div>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
