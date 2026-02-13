'use client';

import { useRef, useEffect, useCallback } from 'react';
import { MorphEngine } from './morph-engine';
import { MOUSE_OFF_SCREEN } from './constants';

interface ParticleMorphProps {
  activeShape: number | null;
  className?: string;
}

export function ParticleMorph({ activeShape, className = '' }: ParticleMorphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<MorphEngine | null>(null);

  // Track the previous shape to avoid redundant morphTo calls
  const prevShapeRef = useRef<number | null | undefined>(undefined);

  // Window-level mouse tracking so repulsion works even over overlaid cards
  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!containerRef.current || !engineRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Check if mouse is within the container bounds
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top || e.clientY > rect.bottom
    ) {
      engineRef.current.updateMouse(MOUSE_OFF_SCREEN, MOUSE_OFF_SCREEN);
      return;
    }

    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    engineRef.current.updateMouse(x, y);
  }, []);

  // Initialize engine
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Size canvas to container
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const engine = new MorphEngine(canvas);
    engineRef.current = engine;

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          engine.resize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // Intersection observer - pause when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            engine.start();
          } else {
            engine.stop();
          }
        });
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // Mouse events on window (not container) so repulsion works through overlaid elements
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      engine.dispose();
      engineRef.current = null;
    };
  }, [handlePointerMove]);

  // Handle shape changes
  useEffect(() => {
    if (!engineRef.current) return;
    if (prevShapeRef.current === activeShape) return;
    prevShapeRef.current = activeShape;
    engineRef.current.morphTo(activeShape);
  }, [activeShape]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ touchAction: 'none' }}
      />
      {/* Soft glow behind particles */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.04) 0%, transparent 60%)' }}
      />
    </div>
  );
}
