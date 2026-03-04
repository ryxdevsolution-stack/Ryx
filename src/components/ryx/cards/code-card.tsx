'use client';

import { TiltedCard } from '@/components/ryx/tilted-card';
import type { ProjectCard } from '@/lib/github';

interface CodeCardProps {
  project: ProjectCard;
  onClick: () => void;
}

const TOKEN = {
  comment: '#6a9955',
  key: '#9cdcfe',
  string: '#ce9178',
  number: '#b5cea8',
  keyword: '#c586c0',
  bracket: '#ffd700',
  fn: '#dcdcaa',
  muted: '#6b7280',
  dot_red: '#ff5f56',
  dot_yellow: '#ffbd2e',
  dot_green: '#27c93f',
} as const;

function SyntaxBody({ project }: { project: ProjectCard }) {
  const raw = project.description.trim();
  const words = raw ? raw.split(' ') : ['No description available'];
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += 6) {
    lines.push(words.slice(i, i + 6).join(' '));
  }
  const techList = project.topics.length > 0
    ? project.topics.slice(0, 4).map(t => `"${t}"`).join(', ')
    : '"web", "typescript"';

  return (
    <pre className="text-[11.5px] leading-[1.9] overflow-hidden font-mono select-none">
      {/* import line */}
      <span style={{ color: TOKEN.keyword }}>{'import '}</span>
      <span style={{ color: TOKEN.bracket }}>{'{ '}</span>
      <span style={{ color: TOKEN.fn }}>{'project'}</span>
      <span style={{ color: TOKEN.bracket }}>{' }'}</span>
      <span style={{ color: TOKEN.keyword }}>{' from '}</span>
      <span style={{ color: TOKEN.string }}>{`"@ryx/portfolio"`}</span>
      {'\n\n'}
      {/* const declaration */}
      <span style={{ color: TOKEN.keyword }}>{'const '}</span>
      <span style={{ color: TOKEN.key }}>{project.name.replace(/\s+/g, '_').toLowerCase()}</span>
      <span style={{ color: TOKEN.muted }}>{' = {'}</span>
      {'\n'}
      {/* category */}
      <span style={{ color: TOKEN.muted }}>{'  '}</span>
      <span style={{ color: TOKEN.key }}>{'category'}</span>
      <span style={{ color: TOKEN.muted }}>{': '}</span>
      <span style={{ color: TOKEN.string }}>{`"${project.category}"`}</span>
      <span style={{ color: TOKEN.muted }}>{','}</span>
      {'\n'}
      {/* stack */}
      <span style={{ color: TOKEN.muted }}>{'  '}</span>
      <span style={{ color: TOKEN.key }}>{'stack'}</span>
      <span style={{ color: TOKEN.muted }}>{': ['}</span>
      <span style={{ color: TOKEN.string }}>{techList}</span>
      <span style={{ color: TOKEN.muted }}>{'],'}</span>
      {'\n'}
      {/* description as comments */}
      <span style={{ color: TOKEN.muted }}>{'  '}</span>
      <span style={{ color: TOKEN.key }}>{'description'}</span>
      <span style={{ color: TOKEN.muted }}>{':'}</span>
      {'\n'}
      {lines.map((line, i) => (
        <span key={i}>
          <span style={{ color: TOKEN.muted }}>{'    '}</span>
          <span style={{ color: TOKEN.comment }}>{`// ${line}`}</span>
          {'\n'}
        </span>
      ))}
      <span style={{ color: TOKEN.muted }}>{'};'}</span>
      {'\n\n'}
      {/* export line */}
      <span style={{ color: TOKEN.keyword }}>{'export default '}</span>
      <span style={{ color: TOKEN.key }}>{project.name.replace(/\s+/g, '_').toLowerCase()}</span>
      <span style={{ color: TOKEN.muted }}>{';'}</span>
    </pre>
  );
}

export function CodeCard({ project, onClick }: CodeCardProps) {
  const filename = `${project.name.replace(/\s+/g, '-').toLowerCase()}.config.ts`;

  return (
    <TiltedCard rotateAmplitude={8} scaleOnHover={1.015} onClick={onClick} className="h-full">
      <div
        className="rounded-3xl overflow-hidden flex flex-col cursor-pointer min-h-[440px]"
        style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-3 px-5 py-3.5 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#111111' }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: TOKEN.dot_red }} />
            <span className="w-3 h-3 rounded-full" style={{ background: TOKEN.dot_yellow }} />
            <span className="w-3 h-3 rounded-full" style={{ background: TOKEN.dot_green }} />
          </div>
          {/* tab */}
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-md"
            style={{ background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span style={{ color: TOKEN.dot_yellow, fontSize: 9 }}>●</span>
            <span className="font-mono text-[10px]" style={{ color: TOKEN.muted }}>{filename}</span>
          </div>
        </div>

        {/* Line numbers + code */}
        <div className="flex flex-1 overflow-hidden">
          {/* Line numbers gutter */}
          <div
            className="flex flex-col pt-5 pb-5 px-3 select-none flex-shrink-0"
            style={{ borderRight: '1px solid rgba(255,255,255,0.04)', background: '#0a0a0a' }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="font-mono text-[10px] leading-[1.9] text-right"
                style={{ color: 'rgba(255,255,255,0.12)', minWidth: 20 }}
              >
                {i + 1}
              </span>
            ))}
          </div>

          {/* Code content */}
          <div className="flex-1 p-5 overflow-hidden">
            <SyntaxBody project={project} />
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-5 py-4 flex items-center justify-between flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0a0a0a' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: TOKEN.comment }}>
              {project.category}
            </span>
          </div>
          <div className="flex gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-[10px] transition-opacity hover:opacity-60 flex items-center gap-1"
              style={{ color: TOKEN.key }}
            >
              github →
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.name} live site`}
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[10px] transition-opacity hover:opacity-60"
                style={{ color: TOKEN.string }}
              >
                live →
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltedCard>
  );
}
