"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/site-config";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Banner Bar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-ig-dark/80 backdrop-blur-md border-b border-ig-white-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12 sm:h-14">
              {/* Logo */}
              <Link href="/" prefetch={true} className="flex-shrink-0 flex items-center gap-2">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/RYX_Logo.png"
                    alt="RYX"
                    fill
                    className="object-cover scale-[1.18]"
                    priority
                  />
                </div>
                <span className="text-white font-semibold text-base sm:text-lg tracking-tight select-none">
                  RYX
                </span>
              </Link>

              {/* Center - Location */}
              <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-white/70">
                <span className="text-white/40">Based in:</span>
                <span className="text-white font-medium">Coimbatore, India</span>
              </div>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="flex flex-col gap-1.5 p-2 cursor-pointer"
                aria-label="Open navigation menu"
              >
                <span className="block w-6 h-[1.5px] bg-white" />
                <span className="block w-6 h-[1.5px] bg-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-ig-dark flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <div className="flex justify-end p-4 sm:p-6 lg:p-8">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-2">
              {SITE_CONFIG.nav.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.07,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    prefetch={true}
                    onClick={() => setIsOpen(false)}
                    className={`block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium transition-colors duration-300 py-2 ${pathname === link.href ? "text-white" : "text-white/40 hover:text-white"}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom info */}
            <div className="flex items-center justify-between px-6 sm:px-8 lg:px-12 pb-8 text-sm text-white/40">
              <span>{SITE_CONFIG.company.email}</span>
              <span>{SITE_CONFIG.company.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
