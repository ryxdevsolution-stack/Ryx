// RYX Motion Variants - Luxury Animation Library
import { Variants } from "framer-motion";

// Entrance Animations (used)
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
    filter: "blur(8px)",
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: { 
      type: 'spring', 
      stiffness: 80, 
      damping: 15,
      duration: 0.6,
    } 
  },
};

// Stagger Animations
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Hover Animations (used)

export const hoverButton: Variants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 4px 20px rgba(203, 161, 53, 0.3)",
    transition: { 
      type: 'spring', 
      stiffness: 300,
      damping: 25,
    },
  },
  tap: {
    scale: 0.95,
    transition: { 
      type: 'spring', 
      stiffness: 400,
      damping: 30,
    },
  },
};

// Progress Animations (used)
export const progressMotion = (progress: number): Variants => ({
  initial: { 
    width: 0,
    opacity: 0,
  },
  animate: { 
    width: `${progress}%`, 
    opacity: 1,
    transition: { 
      type: "spring", 
      damping: 20, 
      stiffness: 100,
      duration: 1.2,
    } 
  },
});

export const progressPulse: Variants = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Removed unused variants to keep the design system lean

// List Item Animations
export const listItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
    filter: "blur(4px)",
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.6,
    },
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.98,
  },
};

// Phase Badge Animations
export const phaseBadge: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

// Status Badge Animations
export const statusBadge: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

// Stats Card Animations
export const statsCard: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.9,
    filter: "blur(4px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      duration: 0.8,
    },
  },
  hover: {
    y: -8,
    scale: 1.05,
    rotateX: 5,
    boxShadow: "0 10px 30px rgba(203, 161, 53, 0.2)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    scale: 0.95,
    y: -2,
  },
};

// Enhanced Button Animations
export const enhancedButton: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 25px rgba(203, 161, 53, 0.3)",
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 35,
    },
  },
};

// Control Panel Animation
export const controlPanel: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
      duration: 0.7,
    },
  },
};

// Container with Glass Effect
export const glassContainer: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 1,
    },
  },
  hover: {
    scale: 1.01,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};
