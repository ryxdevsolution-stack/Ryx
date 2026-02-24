"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  ArrowUpRight,
  Send,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const SOCIAL_ICONS = {
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  github: Github,
} as const;

const SOCIAL_LABELS = {
  facebook: "Facebook",
  linkedin: "LinkedIn",
  twitter: "Twitter / X",
  instagram: "Instagram",
  github: "GitHub",
} as const;

type SocialKey = keyof typeof SOCIAL_ICONS;

const SOCIAL_ENTRIES = (Object.keys(SITE_CONFIG.social) as SocialKey[]).map(
  (key) => ({
    name: SOCIAL_LABELS[key],
    icon: SOCIAL_ICONS[key],
    href: SITE_CONFIG.social[key],
  })
);

const FOOTER_NAV = [
  ...SITE_CONFIG.nav,
  { label: "Terms & Privacy", href: "/terms" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer
      aria-label="Site footer"
      className="relative bg-ig-dark text-white overflow-hidden"
    >
      <div className="absolute inset-0 ig-texture-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large brand text */}
        <motion.div
          className="pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="block text-[80px] sm:text-[120px] lg:text-[160px] xl:text-[200px] font-bold tracking-widest leading-none text-white/5 select-none">
            RYX
          </span>
        </motion.div>

        {/* Social links row */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-b border-ig-white-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {SOCIAL_ENTRIES.map((social, idx) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between gap-3 px-5 py-4 group transition-colors hover:bg-ig-white-5 ${
                idx < SOCIAL_ENTRIES.length - 1
                  ? "lg:border-r border-b lg:border-b-0 border-ig-white-10"
                  : "border-b lg:border-b-0"
              }`}
            >
              <div className="flex items-center gap-3">
                <social.icon
                  size={16}
                  className="text-white/40 group-hover:text-white transition-colors"
                />
                <span className="text-sm font-medium">{social.name}</span>
              </div>
              <ArrowUpRight
                size={14}
                className="text-white/30 group-hover:text-white transition-colors group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300"
              />
            </a>
          ))}
        </motion.div>

        {/* Newsletter + links grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 py-14 sm:py-20">
          {/* Stay connected — newsletter */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="ig-heading-4 mb-3">Stay connected</h3>
            <p className="text-sm text-ig-text-light-muted mb-6 max-w-sm">
              Get updates on our latest projects, insights, and announcements
              delivered straight to your inbox.
            </p>
            <form
              onSubmit={handleNewsletter}
              className="flex items-center gap-2 max-w-md"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address for newsletter"
                className="flex-1 bg-ig-white-5 border border-ig-white-10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-ig-green mt-3">
                ✓ You&apos;re subscribed!
              </p>
            )}
          </motion.div>

          {/* Main links */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xs text-ig-text-light-muted uppercase tracking-wider mb-5">
              Main links
            </h4>
            <ul className="space-y-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Get in touch */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-xs text-ig-text-light-muted uppercase tracking-wider mb-5">
              Get in touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.company.phone.replace(/\s/g, "")}`}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {SITE_CONFIG.company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.company.email}`}
                  className="text-sm text-white/70 hover:text-white transition-colors break-all"
                >
                  {SITE_CONFIG.company.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-ig-green transition-colors"
                >
                  WhatsApp us
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Offline */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-xs text-ig-text-light-muted uppercase tracking-wider mb-5">
              Offline
            </h4>
            <address className="not-italic space-y-1 text-sm text-white/70 leading-relaxed">
              <p className="font-medium text-white/90">
                {SITE_CONFIG.company.name}
              </p>
              <p>
                {SITE_CONFIG.company.city}, {SITE_CONFIG.company.state}
              </p>
              <p>{SITE_CONFIG.company.country}</p>
              <p className="text-white/40 text-xs mt-2">
                Est. {SITE_CONFIG.company.founded}
              </p>
            </address>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ig-white-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ig-text-light-muted">
            Designed & built by RYX, powered by Next.js
          </p>
          <div className="flex items-center gap-4 text-xs text-ig-text-light-muted">
            <span>
              &copy; {new Date().getFullYear()} RYX. All rights reserved
            </span>
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms & Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
