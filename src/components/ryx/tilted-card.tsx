'use client';

import type { SpringOptions } from 'framer-motion';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING_CONFIG: SpringOptions = { stiffness: 300, damping: 30, mass: 0.5 };

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  scaleOnHover?: number;
  rotateAmplitude?: number;
}

export function TiltedCard({
  children,
  className = '',
  onClick,
  scaleOnHover = 1.03,
  rotateAmplitude = 12,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const scale = useMotionValue(1);

  const rotateX = useSpring(rawY, SPRING_CONFIG);
  const rotateY = useSpring(rawX, SPRING_CONFIG);
  const animScale = useSpring(scale, SPRING_CONFIG);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rawX.set(dx * rotateAmplitude);
    rawY.set(-dy * rotateAmplitude);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      className={`relative cursor-pointer ${className}`}
      style={{
        perspective: 800,
        rotateX,
        rotateY,
        scale: animScale,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
