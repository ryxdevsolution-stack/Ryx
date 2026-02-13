'use client';

import { useRef, useEffect } from 'react';
import { HexocetEngine } from './hexocet-engine';

interface HexocetProps {
  className?: string;
}

export function Hexocet({ className = '' }: HexocetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<HexocetEngine | null>(null);
  const pendingBirthRef = useRef<{ x: number; y: number } | null>(null);
  const cachedRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const cssWidth = container.clientWidth;
    const cssHeight = container.clientHeight;

    // Set backing-store dimensions (React component owns this)
    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Engine works in CSS-pixel coordinates
    const engine = new HexocetEngine(canvas, cssWidth, cssHeight);
    engineRef.current = engine;
    cachedRectRef.current = container.getBoundingClientRect();

    // Consume pending mouse births once per animation frame (throttles mousemove)
    let frameId = 0;
    const birthLoop = () => {
      if (pendingBirthRef.current && engineRef.current) {
        engineRef.current.birth(pendingBirthRef.current.x, pendingBirthRef.current.y);
        pendingBirthRef.current = null;
      }
      frameId = requestAnimationFrame(birthLoop);
    };
    frameId = requestAnimationFrame(birthLoop);

    // Resize observer - debounced
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            const newDpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = width * newDpr;
            canvas.height = height * newDpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            const resizeCtx = canvas.getContext('2d');
            if (resizeCtx) {
              resizeCtx.setTransform(newDpr, 0, 0, newDpr, 0, 0);
            }

            // Engine receives CSS dimensions
            engine.resize(width, height);
            cachedRectRef.current = container.getBoundingClientRect();
          }
        }
      }, 100);
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

    // Mouse interaction - throttled via pendingBirth (consumed once per rAF)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cachedRectRef.current;
      if (!rect) return;

      if (
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom
      ) {
        return;
      }

      pendingBirthRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

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
    </div>
  );
}
