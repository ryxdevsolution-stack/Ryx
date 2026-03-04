"use client";

import { motion } from "framer-motion";

const CARDS = [
  { category: "Business",      title: "Why your business needs a website in 2025",    color: "from-emerald-500/20 to-transparent", dot: "bg-emerald-400" },
  { category: "GST & Billing", title: "GST billing software for small businesses",     color: "from-orange-500/20 to-transparent",  dot: "bg-orange-400" },
  { category: "Web Dev",       title: "Next.js vs WordPress for business websites",    color: "from-blue-500/20 to-transparent",    dot: "bg-blue-400"   },
  { category: "Case Study",    title: "How we built Valoryx: offline-first billing",   color: "from-violet-500/20 to-transparent",  dot: "bg-violet-400" },
];

export function BlogHeroVisual() {
  return (
    <div className="relative flex flex-col gap-4 w-full max-w-sm">
      {/* Glow blob behind cards */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-br from-ig-green via-transparent to-blue-500 rounded-full" />

      {CARDS.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ x: -6, transition: { duration: 0.2 } }}
          className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4 cursor-default"
        >
          {/* Accent bar */}
          <div className={`mt-1 h-8 w-1 rounded-full bg-gradient-to-b ${card.color} shrink-0`} />

          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${card.dot} shrink-0`} />
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white/40">
                {card.category}
              </span>
            </div>
            <p className="text-sm font-medium text-white/80 leading-snug line-clamp-2 group-hover:text-white transition-colors">
              {card.title}
            </p>
          </div>

          {/* Animated reading indicator */}
          <motion.div
            className="shrink-0 mt-1 w-2 h-2 rounded-full bg-ig-green/60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        </motion.div>
      ))}

      {/* "More articles" hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex items-center gap-3 px-5 py-3"
      >
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-white/25 font-medium tracking-wide">+ {6 - CARDS.length} more articles</span>
        <div className="flex-1 h-px bg-white/10" />
      </motion.div>
    </div>
  );
}
