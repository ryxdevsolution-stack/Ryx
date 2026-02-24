"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Mail, Send } from "lucide-react";
import Image from "next/image";
import { SectionLabel } from "../section-label";
import { PillButton } from "../pill-button";
import { SITE_CONFIG } from "@/lib/site-config";
import { CinematicHeading } from "../cinematic-heading";

const CONNECT_POINTS = [
  "We reply within 24 hours",
  "Direct access to our team — no bots.",
  "We ask smart questions fast.",
];

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const VALID_FIELDS = new Set<string>(["name", "email", "message"]);

export function ContactCTASection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name;
    if (!VALID_FIELDS.has(field)) return;
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.company.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (non-HTTPS or denied)
    }
  };

  return (
    <section className="relative ig-section-dark overflow-hidden">
      <div className="absolute inset-0 ig-texture-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-ig-dark via-ig-dark-card/60 to-ig-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        {/* Header */}
        <SectionLabel text="Start the conversation today" variant="dark" className="mb-6" />

        <CinematicHeading className="ig-heading-1 max-w-3xl mb-14 sm:mb-20" variant="dark" delay={0.1}>
          Start your Project today
        </CinematicHeading>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="cta-name" className="block text-xs text-ig-text-light-muted mb-1.5">
                  Full name *
                </label>
                <input
                  id="cta-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-ig-white-5 border border-ig-white-10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="cta-email" className="block text-xs text-ig-text-light-muted mb-1.5">
                  Email address *
                </label>
                <input
                  id="cta-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-ig-white-5 border border-ig-white-10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="cta-message" className="block text-xs text-ig-text-light-muted mb-1.5">
                  Message
                </label>
                <textarea
                  id="cta-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-ig-white-5 border border-ig-white-10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {status === "success" ? (
                <div className="inline-flex items-center gap-2.5 rounded-full bg-ig-green/20 text-ig-green px-6 py-3 text-sm font-medium">
                  <Check size={14} />
                  <span>Message sent!</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white text-black px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <span>Sending…</span>
                      <Send size={14} className="animate-pulse" />
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              )}
              {status === "error" && (
                <p className="mt-2 text-xs text-red-400">Something went wrong. Please try again or email us directly.</p>
              )}
            </form>

            {/* Email copy row */}
            <div className="mt-8 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-ig-white-10 flex items-center justify-center flex-shrink-0">
                <Mail size={14} className="text-white/60" />
              </div>
              <div>
                <p className="text-xs text-ig-text-light-muted">Do you prefer email?</p>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-2 text-sm font-medium hover:text-white/80 transition-colors cursor-pointer"
                >
                  <span>{SITE_CONFIG.company.email}</span>
                  {copied ? (
                    <Check size={14} className="text-ig-green" />
                  ) : (
                    <Copy size={14} className="text-white/40" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right — How we connect */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            <div>
              <h3 className="ig-heading-4 mb-5">How do we connect?</h3>
              <ul className="space-y-3">
                {CONNECT_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-ig-green flex-shrink-0" />
                    <span className="text-sm text-white/70 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Team lead card */}
            <div className="ig-card-dark p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ig-white-10 overflow-hidden flex-shrink-0">
                <Image
                  src="/images/avatar-lead.jpg"
                  alt="Team Lead"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Team Leader</p>
                <p className="text-xs text-ig-text-light-muted">Project Lead</p>
              </div>
              <span className="ml-auto w-2 h-2 rounded-full bg-ig-green" />
            </div>

            {/* Discovery call button */}
            <PillButton label="Book a discovery call" href="/contact" variant="dark" size="md" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
