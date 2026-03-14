import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts, type BlogPostMeta } from "@/lib/blog";
import { Navbar } from "@/components/ryx/navbar";
import { Footer } from "@/components/ryx/sections/footer";
import { BlogBeamHeroWrapper } from "@/components/ryx/blog-beam-hero-wrapper";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Blog — Web Development & Business Insights | RYX Tech",
  description:
    "Articles on web development, GST billing software, custom software, and growing your business online. By RYX Tech, Coimbatore.",
  alternates: { canonical: "https://ryxtech.in/blog" },
  openGraph: {
    title: "Blog — Web Development & Business Insights | RYX Tech",
    description: "Articles on web development, GST billing software, custom software, and growing your business online. By RYX Tech, Coimbatore.",
    url: "https://ryxtech.in/blog",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RYX Tech Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Web Development & Business Insights | RYX Tech",
    description: "Articles on web development, GST billing software, custom software, and growing your business online.",
    images: ["/og-image.jpg"],
  },
};

const CATEGORY_COLORS: Record<string, { pill: string; bar: string }> = {
  "Web Dev":       { pill: "bg-blue-100 text-blue-700",       bar: "from-blue-500" },
  Business:        { pill: "bg-emerald-100 text-emerald-700", bar: "from-emerald-500" },
  "GST & Billing": { pill: "bg-orange-100 text-orange-700",   bar: "from-orange-500" },
  "Case Study":    { pill: "bg-violet-100 text-violet-700",   bar: "from-violet-500" },
  AI:              { pill: "bg-cyan-100 text-cyan-700",        bar: "from-cyan-500" },
  Python:          { pill: "bg-yellow-100 text-yellow-700",    bar: "from-yellow-500" },
  "ERP & CRM":     { pill: "bg-rose-100 text-rose-700",        bar: "from-rose-500" },
  Design:          { pill: "bg-pink-100 text-pink-700",        bar: "from-pink-500" },
};

/* size variant controls height/text density */
type CardSize = "hero" | "tall" | "wide" | "square" | "compact";

function PostCard({ post, size = "compact" }: { post: BlogPostMeta; size?: CardSize }) {
  const colors = CATEGORY_COLORS[post.category] ?? {
    pill: "bg-neutral-100 text-neutral-600", bar: "from-neutral-400",
  };

  const base = "group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300";

  /* hero — full-width dark card, spans 2 cols */
  if (size === "hero") {
    return (
      <Link href={`/blog/${post.slug}`} className={`${base} col-span-full lg:col-span-2 min-h-[420px] bg-neutral-950 border-white/10 hover:border-white/25 justify-end`}>
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/60 via-neutral-950 to-black" />
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.bar} to-transparent`} />
        <div className="relative z-10 p-8 sm:p-10 flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 font-semibold">{post.category}</span>
            <span className="text-xs text-white/35">{post.date}</span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-white/35">{post.readTime}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight max-w-xl group-hover:text-white/90 transition-colors">{post.title}</h2>
          <p className="text-base text-white/55 leading-relaxed max-w-lg line-clamp-2">{post.excerpt}</p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-200">
            Read article <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </span>
        </div>
      </Link>
    );
  }

  /* tall — single col, very tall, text heavy */
  if (size === "tall") {
    return (
      <Link href={`/blog/${post.slug}`} className={`${base} min-h-[480px]`}>
        <div className={`h-[3px] w-full bg-gradient-to-r ${colors.bar} to-transparent`} />
        <div className="flex-1 p-7 flex flex-col gap-4">
          <span className={`self-start text-xs px-3 py-1 rounded-full font-semibold ${colors.pill}`}>{post.category}</span>
          <h2 className="text-2xl font-bold text-black leading-snug group-hover:text-neutral-700 transition-colors">{post.title}</h2>
          <p className="text-sm text-neutral-500 leading-relaxed flex-1">{post.excerpt}</p>
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <span className="text-xs text-neutral-400">{post.date} · {post.readTime}</span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-black group-hover:gap-2 transition-all duration-200">
              Read <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  /* wide — spans 2 cols, shorter, horizontal feel */
  if (size === "wide") {
    return (
      <Link href={`/blog/${post.slug}`} className={`${base} md:col-span-2 min-h-[240px] justify-between`}>
        <div className={`h-[2px] w-full bg-gradient-to-r ${colors.bar} to-transparent`} />
        <div className="p-7 flex flex-col sm:flex-row gap-6 flex-1">
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${colors.pill}`}>{post.category}</span>
              <span className="text-xs text-neutral-400">{post.date} · {post.readTime}</span>
            </div>
            <h2 className="text-xl font-bold text-black leading-snug group-hover:text-neutral-700 transition-colors">{post.title}</h2>
          </div>
          <div className="flex-1 flex flex-col justify-between gap-3">
            <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-black group-hover:gap-2.5 transition-all duration-200">
              Read article <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  /* square — equal width/height feel */
  if (size === "square") {
    return (
      <Link href={`/blog/${post.slug}`} className={`${base} min-h-[340px]`}>
        <div className={`h-[2px] w-full bg-gradient-to-r ${colors.bar} to-transparent`} />
        <div className="flex-1 p-6 flex flex-col gap-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${colors.pill}`}>{post.category}</span>
            <span className="text-xs text-neutral-400">{post.date}</span>
          </div>
          <h2 className="text-xl font-bold text-black leading-snug group-hover:text-neutral-700 transition-colors line-clamp-3">{post.title}</h2>
          <p className="text-sm text-neutral-500 leading-relaxed flex-1 line-clamp-4">{post.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-black mt-auto group-hover:gap-2.5 transition-all duration-200">
            Read article <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </span>
        </div>
      </Link>
    );
  }

  /* compact — smaller, 3-col grid filler */
  return (
    <Link href={`/blog/${post.slug}`} className={`${base} min-h-[260px]`}>
      <div className={`h-[2px] w-full bg-gradient-to-r ${colors.bar} to-transparent`} />
      <div className="flex-1 p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${colors.pill}`}>{post.category}</span>
          <span className="text-[11px] text-neutral-400">{post.readTime}</span>
        </div>
        <h2 className="text-base font-bold text-black leading-snug group-hover:text-neutral-700 transition-colors line-clamp-3">{post.title}</h2>
        <p className="text-xs text-neutral-500 leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-black mt-auto group-hover:gap-1.5 transition-all duration-200">
          Read <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </span>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://ryxtech.in" },
        { name: "Blog", url: "https://ryxtech.in/blog" },
      ]} />
      <Navbar />
      <main>
        {/* ── Hero — full screen, dark ── */}
        <section
          data-no-ribbon
          className="ig-section-dark relative min-h-screen overflow-hidden flex items-center isolate"
        >
          <div className="absolute inset-0 ig-texture-dark opacity-40 pointer-events-none" />

          {/* Beam fills the right half of the section absolutely — desktop only */}
          <div className="max-lg:hidden" style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%' }}>
            <BlogBeamHeroWrapper />
          </div>

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-32 pb-20 lg:pt-0 lg:pb-0 lg:min-h-screen">

              {/* Left — copy */}
              <div className="flex flex-col gap-7">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-ig-green flex items-center gap-3">
                  <span className="w-6 h-px bg-ig-green" />
                  Insights &amp; Articles
                </p>

                <h1 className="ig-heading-1 text-white">
                  Ideas<br />
                  <span className="text-ig-green">worth</span><br />
                  reading
                </h1>

                <p className="text-lg text-white/50 leading-relaxed max-w-md">
                  Practical guides on web development, GST billing, and growing your business online. Written by the engineers at RYX.
                </p>

                <div className="flex items-center gap-6 text-sm text-white/25">
                  <span>{posts.length} articles</span>
                  <span>·</span>
                  <span>New posts monthly</span>
                </div>
              </div>

              {/* Right — spacer so grid layout is preserved */}
              <div className="hidden lg:block" />
            </div>
          </div>
        </section>

        {/* ── Posts grid ── */}
        <section className="bg-neutral-50 py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <p className="text-neutral-400 text-center py-20">
                No articles yet. Check back soon.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:grid-flow-dense">
                {featured && <PostCard post={featured} size="hero" />}
                {rest.map((post, i) => {
                  const sizes: CardSize[] = [
                    "tall",                        // i=0  — beside hero (row 1: 2+1=3)
                    "tall", "tall", "square",      // i=1,2,3 — row 2: 1+1+1=3
                    "wide", "square",              // i=4,5   — row 3: 2+1=3
                    "square", "square", "square",  // i=6,7,8 — row 4: 1+1+1=3
                    "wide", "compact",             // i=9,10  — row 5: 2+1=3
                    "compact", "compact",          // i=11,12 — row 6: fills out
                  ];
                  return <PostCard key={post.slug} post={post} size={sizes[i] ?? "compact"} />;
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
