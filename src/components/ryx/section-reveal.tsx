"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants, HTMLMotionProps } from "framer-motion";

interface SectionRevealProps extends Omit<HTMLMotionProps<"div">, "animate" | "initial"> {
  variants: Variants;
  /** how much of the element must be visible to trigger (0–1) */
  amount?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Wraps children in a motion.div that only animates to "show"
 * after a genuine IntersectionObserver event post-mount.
 * Fixes the issue where whileInView fires immediately on lazy-loaded sections.
 */
export function SectionReveal({
  variants,
  amount = 0.15,
  className,
  children,
  ...rest
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
