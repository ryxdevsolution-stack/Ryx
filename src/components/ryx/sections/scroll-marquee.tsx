"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const CLIENTS = [
  "Valoryx",
  "MJ Billing",
  "Next.js",
  "Supabase",
  "React Native",
  "Figma",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "Vercel",
  "Framer Motion",
  "Radix UI",
];

/** A single infinite-scroll track driven by useAnimationFrame for buttery-smooth 60 fps. */
function MarqueeTrack({
  items,
  speed = 40,
  reverse = false,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
}) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const px = (delta / 1000) * speed * (reverse ? 1 : -1);
    const current = x.get();
    const trackWidth = trackRef.current ? trackRef.current.scrollWidth / 2 : 1;
    let next = current + px;
    if (!reverse && next <= -trackWidth) next += trackWidth;
    if (reverse && next >= 0) next -= trackWidth;
    x.set(next);
  });

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <motion.div ref={trackRef} style={{ x }} className="flex gap-4 w-max">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-ig-white-10 bg-ig-white-5 text-sm font-medium text-white/60 whitespace-nowrap select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ig-green flex-shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollMarqueeSection() {
  return (
    <section className="ig-section-dark py-14 overflow-hidden">
      {/* Top fade mask */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ig-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ig-dark to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col gap-4">
          <MarqueeTrack items={CLIENTS} speed={38} reverse={false} />
          <MarqueeTrack items={[...CLIENTS].reverse()} speed={32} reverse={true} />
        </div>
      </div>

      {/* Label */}
      <p className="text-center text-xs text-white/30 mt-8 tracking-widest uppercase">
        Technologies &amp; clients we work with
      </p>
    </section>
  );
}
