export function getParticleCount(): number {
  if (typeof window === 'undefined') return 10000;
  return window.innerWidth < 768 ? 3000 : 10000;
}

export const PARTICLE_SIZE = 0.09;

export const CAMERA_POSITION = { x: 0, y: 0, z: 20 } as const;
export const CAMERA_FOV = 50;

export const SPRING_STIFFNESS = 0.05;
export const SPRING_DAMPING = 0.82;

export const ROTATION_NORMAL = 0.001;
export const ROTATION_MORPH = 0.012;
export const ROTATION_SETTLE_DURATION = 2.5;

export const MOUSE_REPULSION_RADIUS = 4;
export const MOUSE_REPULSION_FORCE = 0.35;
export const MOUSE_OFF_SCREEN = 9999;

export const NOISE_SCALE = 0.004;
export const NOISE_AMPLITUDE = 0.015;

export const COLOR_LERP_SPEED = 0.04;
export const ROTATION_LERP_SPEED = 0.02;

// Each service has TWO gradient colors for rich particle coloring
export const SERVICE_GRADIENT_PAIRS = [
  ['#7c3aed', '#a855f7'], // Web Dev - violet to purple
  ['#0e7490', '#06b6d4'], // Database - dark cyan to cyan
  ['#be123c', '#f43f5e'], // Mobile - dark rose to rose
  ['#c2410c', '#f97316'], // UI/UX - dark orange to orange
  ['#047857', '#10b981'], // AI - dark emerald to emerald
  ['#4338ca', '#818cf8'], // Marketing - dark indigo to indigo
] as const;

export const DEFAULT_GRADIENT_PAIR = ['#7c3aed', '#c084fc'] as const; // violet
