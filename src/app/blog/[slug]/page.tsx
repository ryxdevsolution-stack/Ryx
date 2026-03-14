import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { getAllPostSlugs, getPost } from "@/lib/blog";
import { Navbar } from "@/components/ryx/navbar";
import { Footer } from "@/components/ryx/sections/footer";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | RYX Tech Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://ryxtech.in/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ["RYX Tech"],
      url: `https://ryxtech.in/blog/${slug}`,
      images: [{ url: `/api/og?title=${encodeURIComponent(post.title)}`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`/api/og?title=${encodeURIComponent(post.title)}`],
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "Web Dev":       "bg-blue-100 text-blue-700",
  Business:        "bg-emerald-100 text-emerald-700",
  "GST & Billing": "bg-orange-100 text-orange-700",
  "Case Study":    "bg-violet-100 text-violet-700",
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://ryxtech.in/blog/${slug}`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: `https://ryxtech.in/blog/${slug}`,
    inLanguage: "en-IN",
    wordCount: post.content.split(/\s+/).length,
    image: {
      "@type": "ImageObject",
      url: "https://ryxtech.in/og-image.jpg",
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Organization",
      "@id": "https://ryxtech.in/#organization",
      name: "RYX Tech",
      url: "https://ryxtech.in",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://ryxtech.in/#organization",
      name: "RYX Tech",
      logo: {
        "@type": "ImageObject",
        url: "https://ryxtech.in/RYX_Logo.png",
      },
    },
    isPartOf: {
      "@type": "Blog",
      "@id": "https://ryxtech.in/blog",
      name: "RYX Tech Blog",
    },
  };

  const pillColor =
    CATEGORY_COLORS[post.category] ?? "bg-neutral-100 text-neutral-600";

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://ryxtech.in" },
        { name: "Blog", url: "https://ryxtech.in/blog" },
        { name: post.title, url: `https://ryxtech.in/blog/${slug}` },
      ]} />
      {/* Safe: jsonLd is hardcoded structured data from blog content files, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        {/* Article hero */}
        <section className="ig-section-dark pt-36 pb-20 sm:pt-44 sm:pb-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Back button — prominent, at the top */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 mb-10 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              Back to all articles
            </Link>

            {/* Category + meta */}
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${pillColor}`}>
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="ig-heading-1 text-white leading-tight">{post.title}</h1>

            {/* Excerpt */}
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/40 border-t border-white/10 pt-8">
              <span className="flex items-center gap-2">
                <User size={14} />
                RYX Tech
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* HTML from our own static MDX files — no user input */}
            <article
              className="prose prose-neutral prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-black prose-headings:leading-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-neutral-600 prose-p:leading-relaxed
                prose-a:text-black prose-a:font-medium prose-a:underline hover:prose-a:text-neutral-600
                prose-strong:text-black
                prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                prose-pre:bg-neutral-950 prose-pre:text-neutral-100 prose-pre:rounded-2xl prose-pre:p-6
                prose-ul:text-neutral-600 prose-ol:text-neutral-600
                prose-li:leading-relaxed
                prose-hr:border-neutral-200
                prose-table:text-sm prose-th:text-left prose-th:font-semibold"
              dangerouslySetInnerHTML={{ __html: mdToHtml(post.content) }}
            />

            {/* Bottom nav */}
            <div className="mt-20 pt-10 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-neutral-600 transition-colors group"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform duration-200"
                />
                All articles
              </Link>
              <div className="text-sm text-neutral-400">
                Written by{" "}
                <Link href="/about" className="text-black font-medium hover:underline">
                  RYX Tech
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/**
 * Minimal Markdown to HTML converter for our static, author-controlled blog content.
 * Handles: fenced code blocks, inline code, h2-h4, bold, italic, links,
 * tables, unordered lists, ordered lists, hr, and paragraphs.
 */
function mdToHtml(md: string): string {
  return md
    .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(
      /(\|.+\|\n\|[-| :]+\|\n)((?:\|.+\|\n?)+)/g,
      (_, header, rows) => {
        const th = header
          .split("\n")[0]
          .split("|")
          .filter(Boolean)
          .map((c: string) => `<th>${c.trim()}</th>`)
          .join("");
        const trs = rows
          .trim()
          .split("\n")
          .map((row: string) =>
            `<tr>${row
              .split("|")
              .filter(Boolean)
              .map((c: string) => `<td>${c.trim()}</td>`)
              .join("")}</tr>`
          )
          .join("");
        return `<table><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table>`;
      }
    )
    .replace(/((?:^- .+\n?)+)/gm, (block) => {
      const items = block
        .trim()
        .split("\n")
        .map((l) => `<li>${l.replace(/^- /, "")}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    })
    .replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
      const items = block
        .trim()
        .split("\n")
        .map((l) => `<li>${l.replace(/^\d+\. /, "")}</li>`)
        .join("");
      return `<ol>${items}</ol>`;
    })
    .replace(/^---$/gm, "<hr>")
    .replace(/^(?!<[a-z]|$)(.+)$/gm, "<p>$1</p>");
}
