"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ryx/navbar";
import { SectionLabel } from "@/components/ryx/section-label";
import { ScriptText } from "@/components/ryx/script-text";
import { EASE_STANDARD } from "@/components/ryx/motion";
import { Particles } from "@/components/ui/particles";
import { ProjectModal } from "@/components/ryx/project-modal";
import { PortfolioGridSection } from "@/components/ryx/sections/portfolio-grid";
import { DashboardCard } from "@/components/ryx/cards/dashboard-card";
import { CodeCard } from "@/components/ryx/cards/code-card";
import type { ProjectCard } from "@/lib/github";

const ContactCTASection = dynamic(
  () =>
    import("@/components/ryx/sections/contact-cta").then((m) => ({
      default: m.ContactCTASection,
    })),
  { loading: () => <div className="min-h-[50vh] bg-ig-dark" /> }
);

const Footer = dynamic(
  () =>
    import("@/components/ryx/sections/footer").then((m) => ({
      default: m.Footer,
    })),
  { loading: () => <div className="min-h-[40vh] bg-ig-dark" /> }
);

const HERO_STATS = [
  { value: "4", label: "Projects" },
  { value: "2", label: "Live SaaS" },
  { value: "10+", label: "Technologies" },
] as const;

interface PortfolioClientProps {
  projects: ProjectCard[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [activeProject, setActiveProject] = useState<ProjectCard | null>(null);

  return (
    <>
      <Navbar />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <main>
        {/* ── Section 1: Hero ───────────────────────────────────────────── */}
        <section
          className="ig-section-dark relative overflow-hidden min-h-screen flex items-center"
          data-no-ribbon
        >
          <Particles
            quantity={400}
            staticity={20}
            ease={50}
            size={0.6}
            color="#ffffff"
            vx={0}
            vy={0}
          />

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left — text */}
              <div className="pointer-events-none">
                <SectionLabel text="Our work" variant="dark" />

                <motion.h1
                  className="ig-heading-1 mt-6"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE_STANDARD }}
                >
                  Real Projects,{" "}
                  <ScriptText>Real Results</ScriptText>
                </motion.h1>

                <motion.p
                  className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: EASE_STANDARD }}
                >
                  Projects we&apos;ve actually built and shipped — no stock images,
                  no fake metrics. Every project is in production and actively used.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-10 mt-14"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: EASE_STANDARD }}
                >
                  {HERO_STATS.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <span className="text-5xl font-bold text-white leading-none">
                        {stat.value}
                      </span>
                      <span className="text-sm text-ig-text-light-muted uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right — floating project cards */}
              {projects.length >= 2 && (
                <div className="hidden lg:block relative h-[520px] pointer-events-none select-none">
                  {/* Card 1 — top left, slightly rotated */}
                  <motion.div
                    className="absolute top-0 left-0 w-[54%]"
                    initial={{ opacity: 0, y: 40, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, rotate: -3 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: EASE_STANDARD }}
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
                  >
                    {projects[0].cardStyle === 'dashboard'
                      ? <DashboardCard project={projects[0]} onClick={() => {}} />
                      : <CodeCard project={projects[0]} onClick={() => {}} />}
                  </motion.div>

                  {/* Card 2 — bottom right, overlap */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-[54%]"
                    initial={{ opacity: 0, y: 40, rotate: 2 }}
                    animate={{ opacity: 1, y: 0, rotate: 3 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: EASE_STANDARD }}
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
                  >
                    {projects[2]?.cardStyle === 'dashboard'
                      ? <DashboardCard project={projects[2]} onClick={() => {}} />
                      : <CodeCard project={projects[2] ?? projects[1]} onClick={() => {}} />}
                  </motion.div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* ── Section 2: Portfolio Grid ──────────────────────────────────── */}
        <PortfolioGridSection
          projects={projects}
          onSelectProject={setActiveProject}
        />

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
