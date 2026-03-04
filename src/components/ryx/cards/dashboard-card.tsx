'use client';

import { TiltedCard } from '@/components/ryx/tilted-card';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import type { ProjectCard } from '@/lib/github';

interface DashboardCardProps {
  project: ProjectCard;
  onClick: () => void;
}

function generateBars(seed: number, count: number): number[] {
  return Array.from({ length: count }, (_, i) =>
    20 + ((Math.sin(i * 1.3 + (seed % 100) * 0.4) + 1) / 2) * 60
  );
}

function generateSparkline(seed: number): string {
  const points = Array.from({ length: 10 }, (_, i) => {
    const y = 2 + ((Math.sin(i * 0.9 + (seed % 100) * 0.3) + 1) / 2) * 36;
    return `${i * 12},${y.toFixed(1)}`;
  });
  return `M ${points.join(' L ')}`;
}

/** Inline SVG dashboard UI — shown as the card background */
function DashboardBg({ seed }: { seed: number }) {
  const bars = generateBars(seed, 8);
  const maxBar = Math.max(...bars);
  const sparkPath = generateSparkline(seed);

  return (
    <svg
      viewBox="0 0 360 220"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* App background */}
      <rect width="360" height="220" fill="#f8fafc" />

      {/* Left sidebar */}
      <rect width="52" height="220" fill="#0f172a" />
      {/* Sidebar nav icons (circles) */}
      {[30, 60, 90, 120, 150].map((y, i) => (
        <circle key={i} cx="26" cy={y} r="7" fill={i === 0 ? '#22c55e' : 'rgba(255,255,255,0.12)'} />
      ))}

      {/* Top header bar */}
      <rect x="52" y="0" width="308" height="28" fill="#ffffff" />
      <rect x="52" y="27" width="308" height="1" fill="#e2e8f0" />
      {/* Header search bar */}
      <rect x="70" y="7" width="120" height="14" rx="7" fill="#f1f5f9" />
      {/* Header avatar */}
      <circle cx="342" cy="14" r="9" fill="#e2e8f0" />
      {/* Header dots */}
      <circle cx="310" cy="14" r="4" fill="#f1f5f9" />
      <circle cx="322" cy="14" r="4" fill="#f1f5f9" />

      {/* Stat cards row */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${62 + i * 98}, 36)`}>
          <rect width="88" height="40" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="8" y="10" width="28" height="5" rx="2.5" fill="#cbd5e1" />
          <rect x="8" y="22" width="40" height="8" rx="3" fill={i === 0 ? '#22c55e' : '#0f172a'} opacity={i === 0 ? 1 : 0.7} />
        </g>
      ))}

      {/* Main chart area */}
      <rect x="62" y="86" width="182" height="122" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      {/* Chart label */}
      <rect x="74" y="96" width="60" height="5" rx="2.5" fill="#cbd5e1" />
      {/* Bar chart */}
      {bars.map((h, i) => {
        const bh = (h / maxBar) * 60;
        return (
          <rect
            key={i}
            x={74 + i * 20}
            y={162 - bh}
            width="13"
            height={bh}
            rx="3"
            fill={i === bars.length - 1 ? '#22c55e' : i === bars.length - 2 ? '#86efac' : '#e2e8f0'}
          />
        );
      })}
      {/* X axis */}
      <rect x="74" y="163" width="158" height="1" fill="#e2e8f0" />

      {/* Right panel */}
      <rect x="254" y="86" width="106" height="58" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="264" y="96" width="50" height="4" rx="2" fill="#cbd5e1" />
      {/* Sparkline in right panel */}
      <svg x="264" y="104" width="86" height="32" viewBox="0 0 108 40">
        <path d={sparkPath} stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Activity list */}
      <rect x="254" y="153" width="106" height="55" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="264" y="162" width="40" height="4" rx="2" fill="#cbd5e1" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(264, ${172 + i * 11})`}>
          <circle cx="4" cy="4" r="4" fill={i === 0 ? '#22c55e' : '#e2e8f0'} />
          <rect x="12" y="1" width={30 + i * 8} height="5" rx="2.5" fill="#f1f5f9" />
        </g>
      ))}

      {/* Gradient overlay — fades bottom so text is readable */}
      <defs>
        <linearGradient id={`fade-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="360" height="220" fill={`url(#fade-${seed})`} />
    </svg>
  );
}

export function DashboardCard({ project, onClick }: DashboardCardProps) {
  const sparkPath = generateSparkline(project.id);

  return (
    <TiltedCard rotateAmplitude={5} scaleOnHover={1.015} onClick={onClick} className="h-full">
      <div className="rounded-3xl overflow-hidden flex flex-col cursor-pointer bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-500 min-h-[440px]">

        {/* Window chrome */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50 border-b border-neutral-100 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[11px] text-neutral-400 font-mono tracking-wider uppercase">{project.name}</span>
          <div className="w-16" />
        </div>

        {/* Dashboard preview as background */}
        <div className="relative flex-1 flex flex-col">
          {/* SVG dashboard fills the background */}
          <div className="absolute inset-0">
            <DashboardBg seed={project.id} />
          </div>

          {/* Content overlay on top */}
          <div className="relative z-10 flex flex-col justify-between h-full p-6 pt-8">
            {/* Top: category + title + arrow */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-[0.15em] font-medium">{project.category}</span>
                <h3 className="text-xl font-semibold text-neutral-900 mt-1 leading-tight">{project.name}</h3>
              </div>
              <div className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ArrowUpRight size={15} className="text-white" />
              </div>
            </div>

            {/* Bottom: description + sparkline + date */}
            <div className="flex flex-col gap-3">
              <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2">
                {project.description}
              </p>
              <div className="flex items-end justify-between gap-4 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2">
                <div>
                  <p className="text-[9px] text-neutral-400 uppercase tracking-widest mb-1">Growth trend</p>
                  <svg width="80" height="24" viewBox="0 0 108 40" fill="none">
                    <path d={sparkPath} stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-neutral-400 uppercase tracking-widest mb-1">Updated</p>
                  <p className="text-xs text-neutral-600 font-mono">
                    {project.updatedAt
                      ? new Date(project.updatedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
                      : 'Active'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer — URL bar */}
        {project.liveUrl && (
          <div className="px-5 py-3.5 border-t border-neutral-100 bg-neutral-50/60 flex items-center gap-2 flex-shrink-0">
            <div className="flex-1 flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-3.5 py-1.5">
              <span className="text-[10px]">🔒</span>
              <span className="text-[10px] text-neutral-500 font-mono truncate">{project.liveUrl.replace('https://', '')}</span>
            </div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Visit ${project.name} live site`}
              className="w-7 h-7 rounded-full bg-neutral-900 hover:bg-neutral-700 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <ExternalLink size={11} className="text-white" />
            </a>
          </div>
        )}
      </div>
    </TiltedCard>
  );
}
