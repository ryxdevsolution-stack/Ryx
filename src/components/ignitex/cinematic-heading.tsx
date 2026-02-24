"use client";

import { motion } from "framer-motion";
import { EASE_STANDARD } from "./motion";

interface CinematicHeadingProps {
  children: string;
  className?: string;
  /** "dark" sections get a white glow, "light" sections get a dark glow */
  variant?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  delay?: number;
}

/**
 * Splits text into words and animates each one on scroll entry.
 * Each word fades up + gains a subtle glow shadow for a cinematic effect.
 */
export function CinematicHeading({
  children,
  className = "",
  variant = "light",
  as: Tag = "h2",
  delay = 0,
}: CinematicHeadingProps) {
  const words = children.split(" ");
  const glowColor =
    variant === "dark"
      ? "0px 0px 30px rgba(255,255,255,0.25)"
      : "0px 0px 30px rgba(0,0,0,0.15)";

  return (
    <Tag className={`${className} flex flex-wrap gap-x-[0.25em] gap-y-0`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.07,
            ease: EASE_STANDARD,
          }}
          whileHover={{
            textShadow: glowColor,
            transition: { duration: 0.2 },
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
