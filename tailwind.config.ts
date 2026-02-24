import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Ignitex-inspired palette
        ig: {
          dark: "#05080C",
          "dark-card": "#0d1117",
          light: "#F5F5F5",
          "light-card": "#FFFFFF",
          "text-muted": "#5B5B5B",
          "text-light-muted": "#AAA9AD",
          "border-light": "#DADADB",
          green: "#16DD47",
          "white-10": "rgba(255, 255, 255, 0.1)",
          "white-5": "rgba(255, 255, 255, 0.05)",
          "white-3": "rgba(255, 255, 255, 0.03)",
          "black-20": "rgba(0, 0, 0, 0.2)",
        },
        // Keep existing RYX brand colors for backward compatibility
        ryx: {
          gold: "#CBA135",
          silver: "#B0B0B0",
          navy: "#0B0C22",
          white: "#F4F4F4",
          bronze: "#AD825B",
          "gold-light": "#D4B85C",
          "gold-dark": "#A88A2A",
          "navy-light": "#1A1B2F",
          "navy-dark": "#050510",
          "bronze-light": "#C19A6B",
          "bronze-dark": "#8B6B4A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "wave-flow": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "counter-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "wave-slow": "wave-flow 12s linear infinite",
        "wave-mid": "wave-flow 8s linear infinite",
        "wave-fast": "wave-flow 6s linear infinite",
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "counter-up": "counter-up 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
