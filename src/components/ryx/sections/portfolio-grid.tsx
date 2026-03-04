'use client';

import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ryx/section-label';
import { PillButton } from '@/components/ryx/pill-button';
import { CodeCard } from '@/components/ryx/cards/code-card';
import { DashboardCard } from '@/components/ryx/cards/dashboard-card';
import { EASE_STANDARD } from '@/components/ryx/motion';
import type { ProjectCard } from '@/lib/github';

interface PortfolioGridSectionProps {
  projects: ProjectCard[];
  onSelectProject: (project: ProjectCard) => void;
}

export function PortfolioGridSection({ projects, onSelectProject }: PortfolioGridSectionProps) {
  return (
    <section className="ig-section-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel text="Featured projects" variant="light" />

        <div className="flex items-end justify-between mt-6 mb-12">
          <motion.h2
            className="ig-heading-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Selected Work
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={i % 2 === 1 ? 'sm:mt-16' : ''}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE_STANDARD }}
            >
              {project.cardStyle === 'dashboard' ? (
                <DashboardCard project={project} onClick={() => onSelectProject(project)} />
              ) : (
                <CodeCard project={project} onClick={() => onSelectProject(project)} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Coming soon strip */}
        <motion.div
          className="mt-14 border-2 border-dashed border-neutral-200 rounded-2xl py-8 flex items-center justify-between px-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE_STANDARD }}
        >
          <div>
            <p className="text-sm font-semibold text-neutral-400">More projects coming soon</p>
            <p className="text-xs text-neutral-400 mt-0.5">We&apos;re always shipping new products.</p>
          </div>
          <PillButton label="Start your project" href="/contact" variant="light" size="sm" />
        </motion.div>
      </div>
    </section>
  );
}
