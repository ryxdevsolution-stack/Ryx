interface WaveDividerProps {
  colorFrom?: string
  colorTo?: string
  flip?: boolean
  className?: string
  variant?: "wave" | "curve" | "slant"
}

let idCounter = 0

// 3-layer flowing wave paths (2880 wide for seamless loop at 1440 visible)
const WAVE_LAYERS = [
  // Back layer — gentle, long swells
  "M0,50 C120,70 240,30 360,50 C480,70 600,30 720,50 C840,70 960,30 1080,50 C1200,70 1320,30 1440,50 C1560,70 1680,30 1800,50 C1920,70 2040,30 2160,50 C2280,70 2400,30 2520,50 C2640,70 2760,30 2880,50 L2880,150 L0,150 Z",
  // Mid layer — moderate chop
  "M0,60 C90,40 180,75 360,55 C540,35 630,80 720,60 C810,40 900,75 1080,55 C1260,35 1350,80 1440,60 C1530,40 1620,75 1800,55 C1980,35 2070,80 2160,60 C2250,40 2340,75 2520,55 C2700,35 2790,80 2880,60 L2880,150 L0,150 Z",
  // Front layer — sharper ripples
  "M0,68 C60,55 120,80 240,65 C360,50 420,85 540,70 C660,55 720,85 840,68 C960,50 1020,85 1140,70 C1260,55 1320,80 1440,68 C1560,55 1620,80 1740,65 C1860,50 1920,85 2040,70 C2160,55 2220,85 2340,68 C2460,50 2520,85 2640,70 C2760,55 2820,80 2880,68 L2880,150 L0,150 Z",
]

// CSS class names that map to keyframes in tailwind.config.ts
const LAYER_CLASSES = [
  "animate-wave-slow",   // 12s
  "animate-wave-mid",    // 8s
  "animate-wave-fast",   // 6s
]

const LAYER_OPACITIES = [0.4, 0.6, 1]

export function WaveDivider({
  colorFrom = "#f5f3ff",
  colorTo = "#fdf2f8",
  flip = false,
  className = "",
  variant = "wave",
}: WaveDividerProps) {
  const transform = flip ? "rotate(180deg)" : undefined
  const base = ++idCounter

  if (variant === "curve") {
    const uid = `wd-curve-${base}`
    return (
      <div className={`relative w-full overflow-hidden leading-[0] ${className}`} style={{ transform }}>
        <svg viewBox="0 0 2880 120" fill="none" className="w-[200%] h-auto animate-wave-slow" preserveAspectRatio="none">
          <defs>
            <linearGradient id={uid} x1="0" y1="0" x2="0.5" y2="0">
              <stop offset="0%" stopColor={colorFrom} />
              <stop offset="50%" stopColor={colorTo} />
              <stop offset="100%" stopColor={colorFrom} />
            </linearGradient>
          </defs>
          <path
            d="M0,50 C360,100 720,0 1080,50 C1440,100 1800,0 2160,50 C2520,100 2880,0 2880,50 L2880,120 L0,120 Z"
            fill={`url(#${uid})`}
          />
        </svg>
      </div>
    )
  }

  if (variant === "slant") {
    const uid = `wd-slant-${base}`
    return (
      <div className={`relative w-full overflow-hidden leading-[0] ${className}`} style={{ transform }}>
        <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
          <defs>
            <linearGradient id={uid} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={colorFrom} />
              <stop offset="100%" stopColor={colorTo} />
            </linearGradient>
          </defs>
          <path d="M0,80 L1440,0 L1440,80 Z" fill={`url(#${uid})`} />
        </svg>
      </div>
    )
  }

  // Default: multi-layer animated ocean wave
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${className}`}
      style={{ transform, height: "100px" }}
    >
      {WAVE_LAYERS.map((path, i) => {
        const uid = `wd-wave-${base}-${i}`
        return (
          <svg
            key={i}
            viewBox="0 0 2880 150"
            fill="none"
            className={`absolute top-0 left-0 w-[200%] h-full ${LAYER_CLASSES[i]}`}
            preserveAspectRatio="none"
            style={{ opacity: LAYER_OPACITIES[i] }}
          >
            <defs>
              <linearGradient id={uid} x1="0" y1="0" x2="0.5" y2="0">
                <stop offset="0%" stopColor={colorFrom} />
                <stop offset="25%" stopColor={colorTo} />
                <stop offset="50%" stopColor={colorFrom} />
                <stop offset="75%" stopColor={colorTo} />
                <stop offset="100%" stopColor={colorFrom} />
              </linearGradient>
            </defs>
            <path d={path} fill={`url(#${uid})`} />
          </svg>
        )
      })}
    </div>
  )
}
