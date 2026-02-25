"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  text: string;
  variant?: "dark" | "light";
  className?: string;
}

export function SectionLabel({
  text,
  variant = "light",
  className = "",
}: SectionLabelProps) {
  const colorClasses = {
    dark: "text-ig-text-light-muted",
    light: "text-ig-text-muted",
  };

  return (
    <motion.div
      className={`ig-section-label ${colorClasses[variant]} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Green dot + short rule — clean agency style */}
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-ig-green flex-shrink-0" />
        <span className="w-5 h-px bg-current opacity-30 flex-shrink-0" />
      </span>
      <span>{text}</span>
    </motion.div>
  );
}
