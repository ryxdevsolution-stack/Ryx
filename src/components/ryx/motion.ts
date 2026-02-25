/**
 * Shared Framer Motion constants for the RYX design system.
 * Import these instead of repeating the easing array in every section.
 */
import type { Variants } from "framer-motion";

/** Material Design standard easing — use for most transitions */
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

/** Snappy spring for cards and badges */
export const EASE_SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

/** Viewport options shared across whileInView animations */
export const VIEWPORT_ONCE = { once: true } as const;
export const VIEWPORT_ONCE_80 = { once: true, margin: "-80px" } as const;
export const VIEWPORT_ONCE_60 = { once: true, margin: "-60px" } as const;

// ---------------------------------------------------------------------------
// Parallel wave stagger — Sadewa-style orchestration
// ---------------------------------------------------------------------------

/**
 * Parent container variant.
 * Set staggerChildren & delayChildren here; children just use FADE_UP_CHILD.
 */
export const makeStaggerParent = (
  stagger = 0.08,
  delay = 0
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

/** Child that fades up from below — use inside a stagger parent */
export const FADE_UP_CHILD: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_STANDARD },
  },
};

/** Child that fades up gently (no blur) — for cards & rows */
export const SLIDE_UP_CHILD: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_STANDARD },
  },
};

/** Child that pops in with scale — for badges, pills */
export const POP_CHILD: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_STANDARD },
  },
};

/** Slide from left */
export const SLIDE_LEFT_CHILD: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_STANDARD },
  },
};

/** Slide from right */
export const SLIDE_RIGHT_CHILD: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_STANDARD },
  },
};

/** Reusable fade-up animation props for standalone motion elements */
export const fadeInUp = (delay = 0, y = 20) =>
  ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: { duration: 0.5, delay, ease: EASE_STANDARD },
  }) as const;
