"use client";

import { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/registry/magicui/animated-beam";

/* ── Inline SVG icons — no external icon library ── */
function IconWebsite({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconBilling({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.565 4.136 1.543 5.869L0 24l6.337-1.5A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.018-1.374l-.36-.214-3.721.88.938-3.619-.235-.372A9.818 9.818 0 1 1 12 21.818z" />
    </svg>
  );
}

function IconWebApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="m9 8 2 2-2 2M13 12h2" />
    </svg>
  );
}

function IconDatabase({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function IconDesign({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

/* ── Reusable node circle ── */
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string }
>(({ className, children, label }, ref) => (
  <div className="flex flex-col items-center gap-2.5">
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-20 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 p-4 shadow-[0_0_32px_-4px_rgba(12,255,124,0.35)] backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/20",
        className
      )}
    >
      {children}
    </div>
    {label && (
      <span className="text-[12px] font-semibold tracking-wider uppercase text-white/50 text-center leading-tight">
        {label}
      </span>
    )}
  </div>
));
Circle.displayName = "Circle";

/* ── Main exported component — fills full parent height ── */
export function BlogBeamHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const websiteRef  = useRef<HTMLDivElement>(null);
  const billingRef  = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLDivElement>(null);
  const webappRef   = useRef<HTMLDivElement>(null);
  const databaseRef = useRef<HTMLDivElement>(null);
  const designRef   = useRef<HTMLDivElement>(null);
  const ryxRef      = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full h-full items-center justify-center overflow-hidden"
    >
      {/* Subtle glow behind the centre */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-ig-green/8 blur-3xl" />
      </div>

      {/* ── Satellite nodes — positions relative to this half-width container ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Top-left of container */}
        <div style={{ position: 'absolute', left: '8%', top: '15%', transform: 'translate(-50%, -50%)' }}>
          <Circle ref={websiteRef} label="Website">
            <IconWebsite className="h-9 w-9 text-white/80" />
          </Circle>
        </div>
        {/* Mid-left */}
        <div style={{ position: 'absolute', left: '8%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <Circle ref={databaseRef} label="Database">
            <IconDatabase className="h-9 w-9 text-white/80" />
          </Circle>
        </div>
        {/* Bottom-left */}
        <div style={{ position: 'absolute', left: '8%', top: '85%', transform: 'translate(-50%, -50%)' }}>
          <Circle ref={billingRef} label="GST Billing">
            <IconBilling className="h-9 w-9 text-white/80" />
          </Circle>
        </div>
        {/* Top-right */}
        <div style={{ position: 'absolute', right: '8%', top: '15%', transform: 'translate(50%, -50%)' }}>
          <Circle ref={webappRef} label="Web App">
            <IconWebApp className="h-9 w-9 text-white/80" />
          </Circle>
        </div>
        {/* Mid-right */}
        <div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translate(50%, -50%)' }}>
          <Circle ref={designRef} label="Design">
            <IconDesign className="h-9 w-9 text-white/80" />
          </Circle>
        </div>
        {/* Bottom-right */}
        <div style={{ position: 'absolute', right: '8%', top: '85%', transform: 'translate(50%, -50%)' }}>
          <Circle ref={whatsappRef} label="WhatsApp">
            <IconWhatsApp className="h-9 w-9 text-green-400" />
          </Circle>
        </div>
      </div>

      {/* ── Centre — direct flex child so it gets centered ── */}
      <Circle
        ref={ryxRef}
        className="size-28 border-[#0cff7c]/60 bg-[#0cff7c]/10 shadow-[0_0_60px_-4px_rgba(12,255,124,0.7)]"
      >
        <svg viewBox="0 0 60 28" className="w-16 h-8" fill="none">
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#0cff7c" fontSize="22" fontWeight="800" fontFamily="system-ui,sans-serif">
            RYX
          </text>
        </svg>
      </Circle>

      {/* ── Beams from every node to the RYX centre ── */}
      <AnimatedBeam containerRef={containerRef} fromRef={websiteRef}  toRef={ryxRef} curvature={-50} gradientStartColor="#0cff7c" gradientStopColor="#00aaff" delay={0}   duration={5} />
      <AnimatedBeam containerRef={containerRef} fromRef={databaseRef} toRef={ryxRef} curvature={0}   gradientStartColor="#0cff7c" gradientStopColor="#ff6b6b" delay={0.4} duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={billingRef}  toRef={ryxRef} curvature={50}  gradientStartColor="#ffaa40" gradientStopColor="#0cff7c" delay={0.8} duration={6} />
      <AnimatedBeam containerRef={containerRef} fromRef={webappRef}   toRef={ryxRef} curvature={50}  gradientStartColor="#0cff7c" gradientStopColor="#aa44ff" delay={0.2} duration={5} />
      <AnimatedBeam containerRef={containerRef} fromRef={designRef}   toRef={ryxRef} curvature={0}   gradientStartColor="#aa44ff" gradientStopColor="#0cff7c" delay={0.6} duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={whatsappRef} toRef={ryxRef} curvature={-50} gradientStartColor="#25d366" gradientStopColor="#0cff7c" delay={1.0} duration={6} />
    </div>
  );
}
