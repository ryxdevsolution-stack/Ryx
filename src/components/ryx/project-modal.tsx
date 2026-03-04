"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, GitFork, ExternalLink, Github } from "lucide-react";
import type { ProjectCard } from "@/lib/github";
import { EASE_STANDARD } from "@/components/ryx/motion";

interface ProjectModalProps {
  project: ProjectCard | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.28, ease: EASE_STANDARD }}
            >
              {/* Green accent bar */}
              <div className="h-1.5 w-full bg-ig-green" />

              <div className="p-8">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>

                {/* Category label */}
                <span className="text-xs text-neutral-400 uppercase tracking-widest mb-2 block">
                  {project.category}
                </span>

                {/* Title */}
                <h2 className="ig-heading-3 mb-4 pr-10">{project.name}</h2>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-sm text-neutral-400 mb-5">
                  <span className="flex items-center gap-1">
                    <Star size={13} />
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={13} />
                    {project.forks}
                  </span>
                  <span>
                    Updated{" "}
                    {new Date(project.updatedAt).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Action links */}
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    <Github size={14} />
                    View on GitHub
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 text-neutral-700 text-sm font-medium hover:border-neutral-400 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live site
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
