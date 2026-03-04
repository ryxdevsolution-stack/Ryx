"use client";

import dynamic from "next/dynamic";

const BlogBeamHero = dynamic(
  () => import("./blog-beam-hero").then((m) => ({ default: m.BlogBeamHero })),
  { ssr: false, loading: () => null }
);

export function BlogBeamHeroWrapper() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <BlogBeamHero />
    </div>
  );
}
