"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { ScriptText } from "../script-text";
import { SectionLabel } from "../section-label";
import { PillButton } from "../pill-button";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials: { icon: typeof Facebook; href: string; label: string }[];
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Founder Name",
    role: "Founder & CEO",
    image: "/images/team-1.jpg",
    socials: [
      { icon: Facebook, href: "#", label: "Facebook" },
      { icon: Instagram, href: "#", label: "Instagram" },
      { icon: Twitter, href: "#", label: "X (Twitter)" },
    ],
  },
  {
    name: "Lead Developer",
    role: "Technical Director",
    image: "/images/team-2.jpg",
    socials: [
      { icon: Facebook, href: "#", label: "Facebook" },
      { icon: Instagram, href: "#", label: "Instagram" },
      { icon: Twitter, href: "#", label: "X (Twitter)" },
    ],
  },
];

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      className="relative aspect-[3/4] rounded-2xl overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Social icons - top right */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {member.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors duration-300"
          >
            <social.icon size={14} />
          </a>
        ))}
      </div>

      {/* Name and role - bottom */}
      <div className="absolute bottom-5 left-5">
        <p className="text-lg font-semibold text-white">{member.name}</p>
        <p className="text-sm text-white/60 mt-0.5">{member.role}</p>
      </div>
    </motion.div>
  );
}

export function TeamSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ig-dark via-ig-dark-card to-ig-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: heading + section label */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14 sm:mb-20">
          <div className="max-w-xl">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              We&rsquo;re your <ScriptText>Creative</ScriptText> partners
            </motion.h2>
            <motion.p
              className="text-base text-white/50 mt-5 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              We&rsquo;re a creative team that values purposeful design, open
              collaboration, and work that truly makes an impact.
            </motion.p>
          </div>

          <SectionLabel text="Talent with purpose" variant="dark" />
        </div>

        {/* Action row */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PillButton
            label="Know more about us"
            href="/about"
            variant="dark"
            size="md"
          />
          <Link
            href="/contact"
            className="text-xs text-white/40 hover:text-white/70 transition-colors duration-300 tracking-wider"
          >
            &copy; {new Date().getFullYear()} RYX &mdash; Team up with us
          </Link>
        </motion.div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
