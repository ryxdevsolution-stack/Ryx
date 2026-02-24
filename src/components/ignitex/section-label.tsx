"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
      <Sparkles className="w-3.5 h-3.5" />
      <span>{text}</span>
    </motion.div>
  );
}
