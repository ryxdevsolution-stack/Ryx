"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PillButtonProps {
  label: string;
  href: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
}

// Static lookup maps — defined at module scope to avoid per-render object allocation
const SIZE_CLASSES = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
} as const;

const VARIANT_CLASSES = {
  dark: "bg-ig-dark text-white border-ig-white-10 hover:bg-ig-dark/90",
  light: "bg-white text-black border-ig-border-light hover:bg-ig-light",
} as const;

const ARROW_BG = {
  dark: "bg-white text-black",
  light: "bg-black text-white",
} as const;

const ARROW_SIZE = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
} as const;

const ICON_SIZE = {
  sm: 12,
  md: 14,
  lg: 16,
} as const;

export function PillButton({
  label,
  href,
  variant = "dark",
  size = "md",
  external = false,
  className = "",
}: PillButtonProps) {
  const content = (
    <motion.span
      className={`group inline-flex items-center gap-3 rounded-full border font-medium transition-colors duration-300 ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${className}`}
      whileHover="hover"
      initial="rest"
    >
      {/* Text with slide effect */}
      <span className="relative overflow-hidden">
        <motion.span
          className="block"
          variants={{
            rest: { y: 0 },
            hover: { y: "-100%" },
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {label}
        </motion.span>
        <motion.span
          className="absolute left-0 top-0 block"
          variants={{
            rest: { y: "100%" },
            hover: { y: 0 },
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden
        >
          {label}
        </motion.span>
      </span>

      {/* Arrow circle */}
      <motion.span
        className={`inline-flex items-center justify-center rounded-full ${ARROW_BG[variant]} ${ARROW_SIZE[size]}`}
        variants={{
          rest: { rotate: 0 },
          hover: { rotate: -45 },
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <ArrowRight size={ICON_SIZE[size]} />
      </motion.span>
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}
