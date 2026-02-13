'use client'

import { useEffect, useRef, useCallback } from 'react'

// ============================================
// SIMPLEX NOISE (copied from particle-molecule.tsx)
// ============================================
class SimplexNoise {
  private grad3 = [
    [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
  ]
  private p: number[] = []
  private perm: number[] = []

  constructor(seed = 0) {
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(this.seededRandom(seed + i) * 256)
    }
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255]
    }
  }

  private seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  private dot(g: number[], x: number, y: number, z: number): number {
    return g[0] * x + g[1] * y + g[2] * z
  }

  noise(x: number, y: number, z: number): number {
    const F3 = 1.0 / 3.0
    const G3 = 1.0 / 6.0

    const s = (x + y + z) * F3
    const i = Math.floor(x + s)
    const j = Math.floor(y + s)
    const k = Math.floor(z + s)

    const t = (i + j + k) * G3
    const x0 = x - (i - t)
    const y0 = y - (j - t)
    const z0 = z - (k - t)

    let i1: number, j1: number, k1: number
    let i2: number, j2: number, k2: number

    if (x0 >= y0) {
      if (y0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0 }
      else if (x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1 }
      else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1 }
    } else {
      if (y0 < z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1 }
      else if (x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1 }
      else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0 }
    }

    const x1 = x0 - i1 + G3
    const y1 = y0 - j1 + G3
    const z1 = z0 - k1 + G3
    const x2 = x0 - i2 + 2.0 * G3
    const y2 = y0 - j2 + 2.0 * G3
    const z2 = z0 - k2 + 2.0 * G3
    const x3 = x0 - 1.0 + 3.0 * G3
    const y3 = y0 - 1.0 + 3.0 * G3
    const z3 = z0 - 1.0 + 3.0 * G3

    const ii = i & 255
    const jj = j & 255
    const kk = k & 255

    const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12
    const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12
    const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12

    let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0
    const n0 = t0 < 0 ? 0 : (t0 *= t0, t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0))

    let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1
    const n1 = t1 < 0 ? 0 : (t1 *= t1, t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1))

    let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2
    const n2 = t2 < 0 ? 0 : (t2 *= t2, t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2))

    let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3
    const n3 = t3 < 0 ? 0 : (t3 *= t3, t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3))

    return 32.0 * (n0 + n1 + n2 + n3)
  }
}

// ============================================
// TYPES & CONSTANTS
// ============================================
interface SectionParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseAlpha: number
  color: { r: number; g: number; b: number }
  colorKey: string
  fillStyle: string
  spriteKey: string
  phase: number
  noiseOffsetX: number
  noiseOffsetY: number
}

interface SectionParticlesProps {
  particleCount?: number
  colors?: Array<{ r: number; g: number; b: number }>
  connectionDistance?: number
  speed?: number
  opacity?: number
  mouseRadius?: number
  mouseForce?: number
  sizeRange?: [number, number]
  maxLineAlpha?: number
  className?: string
}

const MOBILE_BREAKPOINT = 768
const MAX_DT = 0.05
const TWO_PI = Math.PI * 2

// Physics
const NOISE_SCALE = 0.0015
const NOISE_DRIFT = 0.15
const DAMPING = 0.96
const MAX_VELOCITY = 3
const MAX_VELOCITY_SQ = MAX_VELOCITY * MAX_VELOCITY
const CONTAINMENT_MARGIN = 30
const CONTAINMENT_FORCE = 0.03

// Visual
const ALPHA_BUCKETS = 4
const PULSE_FREQUENCY = 0.8
const PULSE_AMPLITUDE = 0.15
const GLOW_RADIUS_MULT = 3

// Default colors (violet + cyan mix)
const DEFAULT_COLORS = [
  { r: 147, g: 51, b: 234 },
  { r: 139, g: 92, b: 246 },
  { r: 34, g: 211, b: 238 },
  { r: 99, g: 102, b: 241 },
  { r: 236, g: 72, b: 153 },
]

// ============================================
// SPRITE CACHE (per-instance via closure)
// ============================================
function createGlowSprite(r: number, g: number, b: number, radius: number): HTMLCanvasElement {
  const size = radius * 2
  const off = document.createElement('canvas')
  off.width = size
  off.height = size
  const octx = off.getContext('2d')!
  const grad = octx.createRadialGradient(radius, radius, 0, radius, radius, radius)
  grad.addColorStop(0, `rgba(${Math.min(r + 40, 255)},${Math.min(g + 40, 255)},${Math.min(b + 40, 255)},0.9)`)
  grad.addColorStop(0.25, `rgba(${r},${g},${b},0.5)`)
  grad.addColorStop(0.6, `rgba(${r},${g},${b},0.12)`)
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
  octx.fillStyle = grad
  octx.fillRect(0, 0, size, size)
  return off
}

// ============================================
// SPATIAL GRID
// ============================================
function buildSpatialGrid(particles: SectionParticle[], cellSize: number) {
  const grid = new Map<string, SectionParticle[]>()
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    const cx = Math.floor(p.x / cellSize)
    const cy = Math.floor(p.y / cellSize)
    const key = `${cx}:${cy}`
    let bucket = grid.get(key)
    if (!bucket) {
      bucket = []
      grid.set(key, bucket)
    }
    bucket.push(p)
  }
  return grid
}

// ============================================
// COMPONENT
// ============================================
export function SectionParticles({
  particleCount = 300,
  colors = DEFAULT_COLORS,
  connectionDistance = 100,
  speed = 1.0,
  opacity = 1.0,
  mouseRadius = 150,
  mouseForce = 0.08,
  sizeRange = [0.8, 2.5],
  maxLineAlpha = 0.15,
  className,
}: SectionParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<SectionParticle[]>([])
  const frameRef = useRef<number>(0)
  const noiseRef = useRef<SimplexNoise>(new SimplexNoise(Math.random() * 1000))
  const timeRef = useRef(0)
  const isVisibleRef = useRef(false)
  const isRunningRef = useRef(true)
  const lastFrameRef = useRef(0)

  const createParticles = useCallback((w: number, h: number, count: number): SectionParticle[] => {
    const particles: SectionParticle[] = []
    const [minSize, maxSize] = sizeRange
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = Math.random() * (maxSize - minSize) + minSize
      const glowR = size * GLOW_RADIUS_MULT
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size,
        baseAlpha: Math.random() * 0.4 + 0.2,
        color,
        colorKey: `${color.r},${color.g},${color.b}`,
        fillStyle: `rgb(${color.r},${color.g},${color.b})`,
        spriteKey: `${color.r},${color.g},${color.b},${Math.max(Math.round(glowR), 1)}`,
        phase: Math.random() * TWO_PI,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
      })
    }
    return particles
  }, [colors, sizeRange])

  useEffect(() => {
    // Respect reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const cvs = canvasRef.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    if (!ctx) return

    const canvas = cvs
    const context = ctx
    let w = 0
    let h = 0
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    let cachedRect = canvas.getBoundingClientRect()

    const connectionDistSq = connectionDistance * connectionDistance
    const mouseRadiusSq = mouseRadius * mouseRadius

    // Sprite cache (per-instance)
    const spriteCache = new Map<string, HTMLCanvasElement>()

    function getSprite(r: number, g: number, b: number, radius: number): HTMLCanvasElement {
      const roundedR = Math.max(Math.round(radius), 1)
      const key = `${r},${g},${b},${roundedR}`
      const cached = spriteCache.get(key)
      if (cached) return cached
      const sprite = createGlowSprite(r, g, b, roundedR)
      spriteCache.set(key, sprite)
      return sprite
    }

    // Pre-compute line styles for batched drawing
    const lineStyles = new Map<string, string[]>()
    for (const c of colors) {
      const cKey = `${c.r},${c.g},${c.b}`
      const styles: string[] = []
      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        const alpha = ((b + 1) / ALPHA_BUCKETS) * maxLineAlpha * opacity
        styles.push(`rgba(${c.r},${c.g},${c.b},${alpha.toFixed(4)})`)
      }
      lineStyles.set(cKey, styles)
    }

    const lineBatches = new Map<string, Array<{ x1: number; y1: number; x2: number; y2: number }>>()

    function applySize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cachedRect = canvas.getBoundingClientRect()
      w = cachedRect.width
      h = cachedRect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const isMobile = w < MOBILE_BREAKPOINT
      const count = isMobile ? Math.floor(particleCount * 0.5) : particleCount
      particlesRef.current = createParticles(w, h, count)

      // Pre-warm sprite cache
      const seenKeys = new Set<string>()
      for (const p of particlesRef.current) {
        const glowR = p.size * GLOW_RADIUS_MULT
        const spriteKey = `${p.color.r},${p.color.g},${p.color.b},${Math.max(Math.round(glowR), 1)}`
        if (!seenKeys.has(spriteKey)) {
          seenKeys.add(spriteKey)
          getSprite(p.color.r, p.color.g, p.color.b, glowR)
        }
      }
    }

    function handleResize() {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => applySize(), 150)
    }

    applySize()
    isRunningRef.current = true
    timeRef.current = 0
    lastFrameRef.current = performance.now()

    // Mouse tracking
    const mouseState = { x: 0, y: 0, active: false }
    function handleMouseMove(e: MouseEvent) {
      cachedRect = canvas.getBoundingClientRect()
      mouseState.x = e.clientX - cachedRect.left
      mouseState.y = e.clientY - cachedRect.top
      mouseState.active = true
    }
    function handleMouseLeave() {
      mouseState.active = false
    }

    // IntersectionObserver for visibility-based pause
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisibleRef.current = entry.isIntersecting
          if (entry.isIntersecting && isRunningRef.current) {
            lastFrameRef.current = performance.now()
            cancelAnimationFrame(frameRef.current)
            frameRef.current = requestAnimationFrame(animate)
          }
        }
      },
      { threshold: 0, rootMargin: '100px' }
    )
    observer.observe(canvas)

    function animate(now: number) {
      if (!isRunningRef.current || !isVisibleRef.current) return

      const dt = Math.min((now - lastFrameRef.current) / 1000, MAX_DT)
      lastFrameRef.current = now
      timeRef.current += dt
      const dtFactor = dt * 60 // Normalize to ~1.0 at 60fps for frame-rate independence

      const particles = particlesRef.current
      const noise = noiseRef.current
      const time = timeRef.current

      // Physics update
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        let ax = 0
        let ay = 0

        // Noise drift
        const nx = noise.noise(p.x * NOISE_SCALE + p.noiseOffsetX, p.y * NOISE_SCALE + p.noiseOffsetY, time * 0.3)
        const ny = noise.noise(p.y * NOISE_SCALE + p.noiseOffsetY, p.x * NOISE_SCALE + p.noiseOffsetX, time * 0.3 + 100)
        ax += nx * NOISE_DRIFT * speed
        ay += ny * NOISE_DRIFT * speed

        // Mouse repulsion
        if (mouseState.active && mouseRadius > 0) {
          const dx = p.x - mouseState.x
          const dy = p.y - mouseState.y
          const distSq = dx * dx + dy * dy
          if (distSq < mouseRadiusSq && distSq > 1) {
            const dist = Math.sqrt(distSq)
            const strength = (1 - dist / mouseRadius) * mouseForce
            ax += (dx / dist) * strength
            ay += (dy / dist) * strength
          }
        }

        // Edge containment
        if (p.x < CONTAINMENT_MARGIN) ax += CONTAINMENT_FORCE * (1 - p.x / CONTAINMENT_MARGIN)
        if (p.x > w - CONTAINMENT_MARGIN) ax -= CONTAINMENT_FORCE * (1 - (w - p.x) / CONTAINMENT_MARGIN)
        if (p.y < CONTAINMENT_MARGIN) ay += CONTAINMENT_FORCE * (1 - p.y / CONTAINMENT_MARGIN)
        if (p.y > h - CONTAINMENT_MARGIN) ay -= CONTAINMENT_FORCE * (1 - (h - p.y) / CONTAINMENT_MARGIN)

        // Velocity integration + damping (frame-rate independent)
        p.vx = (p.vx + ax * dtFactor) * DAMPING
        p.vy = (p.vy + ay * dtFactor) * DAMPING

        // Clamp velocity
        const vSq = p.vx * p.vx + p.vy * p.vy
        if (vSq > MAX_VELOCITY_SQ) {
          const scale = MAX_VELOCITY / Math.sqrt(vSq)
          p.vx *= scale
          p.vy *= scale
        }

        p.x += p.vx * dtFactor
        p.y += p.vy * dtFactor

        // Hard wrap for escaped particles
        if (p.x < -50) p.x = w + 40
        else if (p.x > w + 50) p.x = -40
        if (p.y < -50) p.y = h + 40
        else if (p.y > h + 50) p.y = -40
      }

      // Clear
      context.clearRect(0, 0, w, h)

      // Draw molecular connection lines
      const grid = buildSpatialGrid(particles, connectionDistance)

      for (const batch of lineBatches.values()) batch.length = 0

      for (const [key, bucket] of grid) {
        const sep = key.indexOf(':')
        const cx = parseInt(key.substring(0, sep), 10)
        const cy = parseInt(key.substring(sep + 1), 10)

        for (let dcx = 0; dcx <= 1; dcx++) {
          for (let dcy = -1; dcy <= 1; dcy++) {
            if (dcx === 0 && dcy < 0) continue
            const nKey = `${cx + dcx}:${cy + dcy}`
            const nBucket = dcx === 0 && dcy === 0 ? bucket : grid.get(nKey)
            if (!nBucket) continue

            const isSame = dcx === 0 && dcy === 0
            for (let i = 0; i < bucket.length; i++) {
              const a = bucket[i]
              const jStart = isSame ? i + 1 : 0
              for (let j = jStart; j < nBucket.length; j++) {
                const b = nBucket[j]
                const ddx = a.x - b.x
                const ddy = a.y - b.y
                const distSq = ddx * ddx + ddy * ddy
                if (distSq < connectionDistSq) {
                  const ratio = distSq / connectionDistSq
                  const alphaVal = (1 - ratio) * maxLineAlpha * opacity
                  const bucketIdx = Math.min(Math.floor((alphaVal / (maxLineAlpha * opacity)) * ALPHA_BUCKETS), ALPHA_BUCKETS - 1)
                  const cKey = a.colorKey
                  const batchKey = `${cKey}:${bucketIdx}`
                  let batch = lineBatches.get(batchKey)
                  if (!batch) { batch = []; lineBatches.set(batchKey, batch) }
                  batch.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y })
                }
              }
            }
          }
        }
      }

      // Render batched connection lines
      context.lineWidth = 0.5
      for (const [batchKey, segments] of lineBatches) {
        if (segments.length === 0) continue
        const lastColon = batchKey.lastIndexOf(':')
        const cKey = batchKey.substring(0, lastColon)
        const bucketIdx = parseInt(batchKey.substring(lastColon + 1), 10)
        const styles = lineStyles.get(cKey)
        if (!styles) continue
        context.strokeStyle = styles[bucketIdx]
        context.beginPath()
        for (let s = 0; s < segments.length; s++) {
          const seg = segments[s]
          context.moveTo(seg.x1, seg.y1)
          context.lineTo(seg.x2, seg.y2)
        }
        context.stroke()
      }

      // Draw particles with glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const pulse = Math.sin(time * PULSE_FREQUENCY + p.phase) * PULSE_AMPLITUDE + 1
        const finalAlpha = p.baseAlpha * pulse * opacity

        // Glow sprite
        const glowR = p.size * GLOW_RADIUS_MULT
        const sprite = spriteCache.get(p.spriteKey)
        if (sprite) {
          context.globalAlpha = finalAlpha * 0.6
          context.drawImage(sprite, p.x - glowR, p.y - glowR, glowR * 2, glowR * 2)
        }

        // Core dot
        context.globalAlpha = Math.min(finalAlpha * 1.5, 0.9)
        context.fillStyle = p.fillStyle
        context.beginPath()
        context.arc(p.x, p.y, p.size, 0, TWO_PI)
        context.fill()
      }

      context.globalAlpha = 1
      frameRef.current = requestAnimationFrame(animate)
    }

    // Start animation only if visible
    if (isVisibleRef.current) {
      frameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      isRunningRef.current = false
      cancelAnimationFrame(frameRef.current)
      if (resizeTimer) clearTimeout(resizeTimer)
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      spriteCache.clear()
    }
  }, [createParticles, particleCount, connectionDistance, speed, opacity, mouseRadius, mouseForce, maxLineAlpha, colors])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
