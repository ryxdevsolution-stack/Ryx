/**
 * Shared Framer Motion constants for the Ignitex design system.
 * Import these instead of repeating the easing array in every section.
 */

/** Material Design standard easing — use for most transitions */
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

/** Viewport options shared across whileInView animations */
export const VIEWPORT_ONCE = { once: true } as const;
export const VIEWPORT_ONCE_80 = { once: true, margin: "-80px" } as const;
export const VIEWPORT_ONCE_60 = { once: true, margin: "-60px" } as const;

/** Reusable fade-up animation props for motion elements */
export const fadeInUp = (delay = 0, y = 20) =>
  ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: { duration: 0.5, delay, ease: EASE_STANDARD },
  }) as const;
