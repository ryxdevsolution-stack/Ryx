'use client'

import { useEffect, useRef, useCallback } from 'react'

// ============================================
// SIMPLEX NOISE IMPLEMENTATION
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
// PARTICLE TYPES & CONSTANTS
// ============================================
interface MorphParticle {
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
  size: number
  baseAlpha: number
  color: { r: number; g: number; b: number }
  phase: number
  depthFactor: number
  spriteKey: string
  noiseOffsetX: number
  noiseOffsetY: number
  role: 'shape' | 'ambient'
  colorKey: string
  fillStyle: string
}

type AnimState = 'forming' | 'holding' | 'shattering' | 'floating'

interface StateMachine {
  state: AnimState
  stateTime: number
  shapeIndex: number
  springK: number
  damping: number
}

// Warm palette: violet → purple → magenta → rose → gold
const WARM_COLORS = [
  { r: 147, g: 51, b: 234 },   // violet-600
  { r: 139, g: 92, b: 246 },   // violet-400
  { r: 168, g: 85, b: 247 },   // purple-500
  { r: 192, g: 132, b: 252 },  // purple-300
  { r: 236, g: 72, b: 153 },   // pink-500
  { r: 244, g: 114, b: 182 },  // pink-400
  { r: 251, g: 146, b: 60 },   // orange-400
  { r: 234, g: 179, b: 8 },    // yellow-500 (gold)
  { r: 217, g: 70, b: 239 },   // fuchsia-500
  { r: 232, g: 121, b: 249 },  // fuchsia-400
]

// Cool palette: cyan → teal → blue → indigo → sky
const COOL_COLORS = [
  { r: 6, g: 182, b: 212 },    // cyan-500
  { r: 20, g: 184, b: 166 },   // teal-500
  { r: 34, g: 211, b: 238 },   // cyan-400
  { r: 45, g: 212, b: 191 },   // teal-400
  { r: 56, g: 189, b: 248 },   // sky-400
  { r: 14, g: 165, b: 233 },   // sky-500
  { r: 99, g: 102, b: 241 },   // indigo-500
  { r: 129, g: 140, b: 248 },  // indigo-400
  { r: 59, g: 130, b: 246 },   // blue-500
  { r: 96, g: 165, b: 250 },   // blue-400
]

// Counts — denser for richer formations
const MOBILE_BREAKPOINT = 768
const COUNT_DESKTOP = 3500
const COUNT_MOBILE = 1400
const SHAPE_COUNT_DESKTOP = 2200
const SHAPE_COUNT_MOBILE = 900

// Physics
const SPRING_K_MAX = 0.08
const DAMPING_FORMING = 0.92
const DAMPING_HOLDING = 0.95
const DAMPING_FREE = 0.98
const MAX_VELOCITY = 8
const MAX_VELOCITY_SQ = MAX_VELOCITY * MAX_VELOCITY
const MOUSE_RADIUS = 220
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS
const MOUSE_FORCE = 0.18
const NOISE_SCALE = 0.002
const NOISE_DRIFT_STRONG = 0.3
const NOISE_DRIFT_SUBTLE = 0.06
const CONTAINMENT_MARGIN = 50
const CONTAINMENT_FORCE = 0.05

// Timing (seconds)
const FORMING_DURATION = 2.0
const HOLDING_DURATION = 4.0
const SHATTERING_DURATION = 0.3
const FLOATING_DURATION = 1.5

// Visual — softer glow, wider pulse, denser connections
const GLOW_RADIUS_MULT = 5
const CORE_ALPHA_MULT = 1.6
const MAX_CORE_ALPHA = 0.9
const PULSE_FREQUENCY = 1.2
const PULSE_AMPLITUDE = 0.2
const CONNECTION_DISTANCE = 48
const CONNECTION_DIST_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE
const MAX_LINE_ALPHA = 0.08
const ALPHA_BUCKETS = 6
const MAX_DT = 0.05

// ============================================
// SPRITE CACHE - Pre-rendered glow textures
// ============================================
const spriteCache = new Map<string, HTMLCanvasElement>()

function getGlowSprite(r: number, g: number, b: number, radius: number): HTMLCanvasElement {
  const roundedRadius = Math.max(Math.round(radius), 1)
  const key = `${r},${g},${b},${roundedRadius}`
  const cached = spriteCache.get(key)
  if (cached) return cached

  const size = roundedRadius * 2
  const off = document.createElement('canvas')
  off.width = size
  off.height = size
  const octx = off.getContext('2d')!
  const grad = octx.createRadialGradient(roundedRadius, roundedRadius, 0, roundedRadius, roundedRadius, roundedRadius)
  // More realistic multi-stop glow: hot core fading to soft halo
  grad.addColorStop(0, `rgba(${Math.min(r + 60, 255)},${Math.min(g + 60, 255)},${Math.min(b + 60, 255)},1)`)
  grad.addColorStop(0.15, `rgba(${r},${g},${b},0.85)`)
  grad.addColorStop(0.35, `rgba(${r},${g},${b},0.45)`)
  grad.addColorStop(0.6, `rgba(${r},${g},${b},0.15)`)
  grad.addColorStop(0.85, `rgba(${r},${g},${b},0.04)`)
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
  octx.fillStyle = grad
  octx.fillRect(0, 0, size, size)
  return (spriteCache.set(key, off), off)
}

// ============================================
// SPATIAL GRID
// ============================================
function buildSpatialGrid(particles: MorphParticle[], cellSize: number) {
  const grid = new Map<string, MorphParticle[]>()
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    if (p.role !== 'shape') continue
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
// SHAPE GENERATORS (normalized 0-1 space)
// ============================================
function generateMonitorPoints(count: number): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = []
  const sL = 0.2, sR = 0.8, sT = 0.15, sB = 0.62
  const sw = sR - sL, sh = sB - sT

  // Screen outline (35%)
  const outlineN = Math.floor(count * 0.35)
  const perimeter = 2 * sw + 2 * sh
  for (let i = 0; i < outlineN; i++) {
    let t = (i / outlineN) * perimeter
    let x: number, y: number
    if (t < sw) { x = sL + t; y = sT }
    else if (t < sw + sh) { x = sR; y = sT + (t - sw) }
    else if (t < 2 * sw + sh) { x = sR - (t - sw - sh); y = sB }
    else { x = sL; y = sB - (t - 2 * sw - sh) }
    points.push({ x: x + (Math.random() - 0.5) * 0.005, y: y + (Math.random() - 0.5) * 0.005 })
  }

  // Screen fill (40%)
  const fillN = Math.floor(count * 0.4)
  for (let i = 0; i < fillN; i++) {
    points.push({ x: sL + Math.random() * sw, y: sT + Math.random() * sh })
  }

  // Stand (12%)
  const standN = Math.floor(count * 0.12)
  for (let i = 0; i < standN; i++) {
    points.push({ x: 0.45 + Math.random() * 0.1, y: 0.62 + Math.random() * 0.1 })
  }

  // Base (13%)
  const baseN = count - outlineN - fillN - standN
  for (let i = 0; i < baseN; i++) {
    points.push({ x: 0.35 + Math.random() * 0.3, y: 0.72 + Math.random() * 0.03 })
  }

  return points
}

function generateKeyboardPoints(count: number): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = []
  const bL = 0.15, bR = 0.85, bT = 0.35, bB = 0.65

  // Outline (25%)
  const outlineN = Math.floor(count * 0.25)
  const perimeter = 2 * (bR - bL) + 2 * (bB - bT)
  for (let i = 0; i < outlineN; i++) {
    const t = (i / outlineN) * perimeter
    let x: number, y: number
    const w2 = bR - bL, h2 = bB - bT
    if (t < w2) { x = bL + t; y = bT }
    else if (t < w2 + h2) { x = bR; y = bT + (t - w2) }
    else if (t < 2 * w2 + h2) { x = bR - (t - w2 - h2); y = bB }
    else { x = bL; y = bB - (t - 2 * w2 - h2) }
    points.push({ x: x + (Math.random() - 0.5) * 0.004, y: y + (Math.random() - 0.5) * 0.004 })
  }

  // Key rows (60%)
  const keyN = Math.floor(count * 0.6)
  const rows = 5
  const perRow = Math.floor(keyN / rows)
  for (let row = 0; row < rows; row++) {
    const rowY = bT + 0.03 + (row / rows) * (bB - bT - 0.06)
    const indent = row === 1 ? 0.02 : row === 2 ? 0.03 : row === 3 ? 0.04 : 0
    const rowL = bL + 0.02 + indent
    const rowR = bR - 0.02
    for (let k = 0; k < perRow; k++) {
      const kx = rowL + (k / perRow) * (rowR - rowL)
      points.push({ x: kx + (Math.random() - 0.5) * 0.008, y: rowY + (Math.random() - 0.5) * 0.015 })
    }
  }

  // Spacebar (15%)
  const spaceN = count - outlineN - perRow * rows
  for (let i = 0; i < spaceN; i++) {
    points.push({ x: 0.32 + Math.random() * 0.36, y: bB - 0.05 + Math.random() * 0.02 })
  }

  return points
}

function generateMousePoints(count: number): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = []
  const cx = 0.5, cy = 0.5, rx = 0.12, ry = 0.22

  // Outline (30%)
  const outlineN = Math.floor(count * 0.3)
  for (let i = 0; i < outlineN; i++) {
    const angle = (i / outlineN) * Math.PI * 2
    const rY = angle > Math.PI ? ry * 1.05 : ry * 0.95
    points.push({
      x: cx + Math.cos(angle) * rx + (Math.random() - 0.5) * 0.004,
      y: cy + Math.sin(angle) * rY + (Math.random() - 0.5) * 0.004,
    })
  }

  // Interior fill (50%)
  const fillN = Math.floor(count * 0.5)
  for (let i = 0; i < fillN; i++) {
    let px: number, py: number
    do {
      px = (Math.random() - 0.5) * 2
      py = (Math.random() - 0.5) * 2
    } while (px * px + py * py > 1)
    points.push({ x: cx + px * rx * 0.9, y: cy + py * ry * 0.9 })
  }

  // Center divider line (10%)
  const lineN = Math.floor(count * 0.1)
  for (let i = 0; i < lineN; i++) {
    points.push({
      x: cx + (Math.random() - 0.5) * 0.005,
      y: cy - ry * 0.6 + (i / lineN) * ry * 0.5,
    })
  }

  // Scroll wheel (10%)
  const wheelN = count - outlineN - fillN - lineN
  for (let i = 0; i < wheelN; i++) {
    const angle = (i / wheelN) * Math.PI * 2
    points.push({
      x: cx + Math.cos(angle) * 0.015 + (Math.random() - 0.5) * 0.008,
      y: cy - ry * 0.4 + Math.sin(angle) * 0.03 + (Math.random() - 0.5) * 0.008,
    })
  }

  return points
}

function generatePhonePoints(count: number): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = []
  const left = 0.38, right = 0.62, top = 0.12, bottom = 0.88
  const hw = (right - left) / 2, hh = (bottom - top) / 2
  const pcx = (left + right) / 2, pcy = (top + bottom) / 2

  // Rounded-rect outline via superellipse (30%)
  const outlineN = Math.floor(count * 0.3)
  for (let i = 0; i < outlineN; i++) {
    const angle = (i / outlineN) * Math.PI * 2
    const cosA = Math.cos(angle), sinA = Math.sin(angle)
    const n = 6
    const r = Math.pow(
      Math.pow(Math.abs(cosA / hw), n) + Math.pow(Math.abs(sinA / hh), n),
      -1 / n
    )
    points.push({
      x: pcx + r * cosA + (Math.random() - 0.5) * 0.003,
      y: pcy + r * sinA + (Math.random() - 0.5) * 0.003,
    })
  }

  // Interior fill (55%)
  const fillN = Math.floor(count * 0.55)
  for (let i = 0; i < fillN; i++) {
    points.push({
      x: left + 0.02 + Math.random() * (right - left - 0.04),
      y: top + 0.03 + Math.random() * (bottom - top - 0.06),
    })
  }

  // Notch at top (5%)
  const notchN = Math.floor(count * 0.05)
  for (let i = 0; i < notchN; i++) {
    points.push({ x: 0.46 + Math.random() * 0.08, y: top + 0.02 + Math.random() * 0.015 })
  }

  // Home bar at bottom (10%)
  const homeN = count - outlineN - fillN - notchN
  for (let i = 0; i < homeN; i++) {
    points.push({ x: 0.44 + Math.random() * 0.12, y: bottom - 0.04 + Math.random() * 0.008 })
  }

  return points
}

// ============================================
// SHAPE UTILITIES
// ============================================
type ShapeGenerator = (count: number) => Array<{ x: number; y: number }>
const SHAPE_GENERATORS: ShapeGenerator[] = [
  generateMonitorPoints,
  generateKeyboardPoints,
  generateMousePoints,
  generatePhonePoints,
]

function scaleShapeToViewport(
  pts: Array<{ x: number; y: number }>,
  vw: number, vh: number
): Array<{ x: number; y: number }> {
  const scale = Math.min(vw, vh) * 0.6
  const ox = (vw - scale) / 2
  const oy = (vh - scale) / 2
  return pts.map(p => ({ x: p.x * scale + ox, y: p.y * scale + oy }))
}

function shuffleArray<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp
  }
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// ============================================
// STATE MACHINE
// ============================================
function createStateMachine(): StateMachine {
  return { state: 'forming', stateTime: 0, shapeIndex: 0, springK: 0, damping: DAMPING_FORMING }
}

function updateStateMachine(
  sm: StateMachine,
  particles: MorphParticle[],
  shapes: Array<Array<{ x: number; y: number }>>,
  dt: number,
  w: number, h: number
) {
  sm.stateTime += dt

  switch (sm.state) {
    case 'forming':
      sm.springK = easeOutCubic(Math.min(sm.stateTime / FORMING_DURATION, 1)) * SPRING_K_MAX
      sm.damping = DAMPING_FORMING
      if (sm.stateTime >= FORMING_DURATION) {
        sm.state = 'holding'
        sm.stateTime = 0
      }
      break

    case 'holding':
      sm.springK = SPRING_K_MAX
      sm.damping = DAMPING_HOLDING
      if (sm.stateTime >= HOLDING_DURATION) {
        sm.state = 'shattering'
        sm.stateTime = 0
        applyShatterForce(particles, w / 2, h / 2)
      }
      break

    case 'shattering':
      sm.springK = 0
      sm.damping = DAMPING_FREE
      if (sm.stateTime >= SHATTERING_DURATION) {
        sm.state = 'floating'
        sm.stateTime = 0
      }
      break

    case 'floating':
      sm.springK = 0
      sm.damping = DAMPING_FREE
      if (sm.stateTime >= FLOATING_DURATION) {
        sm.shapeIndex = (sm.shapeIndex + 1) % shapes.length
        assignShapeTargets(particles, shapes[sm.shapeIndex], w, h)
        sm.state = 'forming'
        sm.stateTime = 0
      }
      break
  }
}

// ============================================
// PHYSICS
// ============================================
function updatePhysics(
  particles: MorphParticle[],
  sm: StateMachine,
  mx: number, my: number, mouseActive: boolean,
  noise: SimplexNoise, time: number,
  vw: number, vh: number
) {
  const { springK, damping } = sm
  const isFormed = sm.state === 'forming' || sm.state === 'holding'
  const noiseMult = isFormed ? NOISE_DRIFT_SUBTLE : NOISE_DRIFT_STRONG

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    let ax = 0, ay = 0

    // Spring toward target
    if (p.role === 'shape' && springK > 0) {
      ax += (p.targetX - p.x) * springK
      ay += (p.targetY - p.y) * springK
    }

    // Mouse attraction
    if (mouseActive) {
      const mdx = mx - p.x
      const mdy = my - p.y
      const distSq = mdx * mdx + mdy * mdy
      if (distSq < MOUSE_RADIUS_SQ && distSq > 1) {
        const dist = Math.sqrt(distSq)
        const strength = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE
        ax += (mdx / dist) * strength
        ay += (mdy / dist) * strength
      }
    }

    // Simplex noise drift
    const nx = noise.noise(p.x * NOISE_SCALE + p.noiseOffsetX, p.y * NOISE_SCALE + p.noiseOffsetY, time * 0.5)
    const ny = noise.noise(p.y * NOISE_SCALE + p.noiseOffsetY, p.x * NOISE_SCALE + p.noiseOffsetX, time * 0.5 + 100)
    ax += nx * noiseMult
    ay += ny * noiseMult

    // Edge containment
    if (p.x < CONTAINMENT_MARGIN) ax += CONTAINMENT_FORCE * (1 - p.x / CONTAINMENT_MARGIN)
    else if (p.x > vw - CONTAINMENT_MARGIN) ax -= CONTAINMENT_FORCE * (1 - (vw - p.x) / CONTAINMENT_MARGIN)
    if (p.y < CONTAINMENT_MARGIN) ay += CONTAINMENT_FORCE * (1 - p.y / CONTAINMENT_MARGIN)
    else if (p.y > vh - CONTAINMENT_MARGIN) ay -= CONTAINMENT_FORCE * (1 - (vh - p.y) / CONTAINMENT_MARGIN)

    p.vx = (p.vx + ax) * damping
    p.vy = (p.vy + ay) * damping

    // Clamp velocity (squared comparison avoids sqrt in common case)
    const velSq = p.vx * p.vx + p.vy * p.vy
    if (velSq > MAX_VELOCITY_SQ) {
      const scale = MAX_VELOCITY / Math.sqrt(velSq)
      p.vx *= scale
      p.vy *= scale
    }

    p.x += p.vx
    p.y += p.vy
  }
}

// ============================================
// SHATTER & TARGET ASSIGNMENT
// ============================================
function applyShatterForce(particles: MorphParticle[], cx: number, cy: number) {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    const dx = p.x - cx
    const dy = p.y - cy
    const dist = Math.sqrt(dx * dx + dy * dy) || 1
    const force = p.role === 'shape' ? 2 + Math.random() * 3 : 0.5 + Math.random() * 1
    p.vx += (dx / dist) * force + (Math.random() - 0.5) * 2
    p.vy += (dy / dist) * force + (Math.random() - 0.5) * 2
  }
}

function assignShapeTargets(
  particles: MorphParticle[],
  shapeNormalized: Array<{ x: number; y: number }>,
  w: number, h: number
) {
  const scaledPts = scaleShapeToViewport(shapeNormalized, w, h)
  shuffleArray(scaledPts)

  let si = 0
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    if (p.role === 'shape') {
      if (si < scaledPts.length) {
        p.targetX = scaledPts[si].x
        p.targetY = scaledPts[si].y
        si++
      } else {
        const ri = Math.floor(Math.random() * scaledPts.length)
        p.targetX = scaledPts[ri].x + (Math.random() - 0.5) * 10
        p.targetY = scaledPts[ri].y + (Math.random() - 0.5) * 10
      }
    } else {
      p.targetX = Math.random() * w
      p.targetY = Math.random() * h
    }
  }
}

// ============================================
// COMPONENT
// ============================================
export default function ParticleMolecule({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<MorphParticle[]>([])
  const frameRef = useRef<number>(0)
  const noiseRef = useRef<SimplexNoise>(new SimplexNoise(42))
  const timeRef = useRef(0)
  const isRunningRef = useRef(true)
  const smRef = useRef<StateMachine>(createStateMachine())
  const shapesRef = useRef<Array<Array<{ x: number; y: number }>>>([])
  const lastFrameRef = useRef(0)

  const createParticles = useCallback((w: number, h: number) => {
    const isMobile = w < MOBILE_BREAKPOINT
    const totalCount = isMobile ? COUNT_MOBILE : COUNT_DESKTOP
    const shapeCount = isMobile ? SHAPE_COUNT_MOBILE : SHAPE_COUNT_DESKTOP
    const ambientCount = totalCount - shapeCount
    const particles: MorphParticle[] = []

    const purpleShapeN = Math.floor(shapeCount * 0.6)
    const cyanShapeN = shapeCount - purpleShapeN
    const purpleAmbientN = Math.floor(ambientCount * 0.5)
    const cyanAmbientN = ambientCount - purpleAmbientN

    const makeParticle = (pw: number, ph: number, role: 'shape' | 'ambient', group: 'warm' | 'cool'): MorphParticle => {
      const palette = group === 'warm' ? WARM_COLORS : COOL_COLORS
      const color = palette[Math.floor(Math.random() * palette.length)]
      const x = Math.random() * pw
      const y = Math.random() * ph
      const depthFactor = Math.random() * 0.6 + 0.4
      // Varied sizes: tiny background dust (0.5) to prominent foreground particles (3.5)
      const sizeBase = role === 'ambient' ? Math.random() * 1.8 + 0.5 : Math.random() * 2.5 + 1.0
      const size = sizeBase * (0.6 + depthFactor * 0.4)
      const glowR = size * depthFactor * GLOW_RADIUS_MULT
      return {
        x, y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        targetX: x,
        targetY: y,
        size,
        baseAlpha: role === 'shape'
          ? Math.random() * 0.35 + 0.45   // shape: 0.45–0.8 (brighter, prominent)
          : Math.random() * 0.3 + 0.15,   // ambient: 0.15–0.45 (softer background dust)
        color,
        phase: Math.random() * Math.PI * 2,
        depthFactor,
        spriteKey: `${color.r},${color.g},${color.b},${Math.max(Math.round(glowR), 1)}`,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
        role,
        colorKey: `${color.r},${color.g},${color.b}`,
        fillStyle: `rgb(${color.r},${color.g},${color.b})`,
      }
    }

    for (let i = 0; i < purpleShapeN; i++) particles.push(makeParticle(w, h, 'shape', 'warm'))
    for (let i = 0; i < cyanShapeN; i++) particles.push(makeParticle(w, h, 'shape', 'cool'))
    for (let i = 0; i < purpleAmbientN; i++) particles.push(makeParticle(w, h, 'ambient', 'warm'))
    for (let i = 0; i < cyanAmbientN; i++) particles.push(makeParticle(w, h, 'ambient', 'cool'))

    // Pre-warm sprite cache
    const seenKeys = new Set<string>()
    for (const p of particles) {
      if (!seenKeys.has(p.spriteKey)) {
        seenKeys.add(p.spriteKey)
        getGlowSprite(p.color.r, p.color.g, p.color.b, p.size * p.depthFactor * GLOW_RADIUS_MULT)
      }
    }

    return particles
  }, [])

  useEffect(() => {
    const cvs = canvasRef.current
    if (!cvs) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = cvs.getContext('2d', { alpha: true })
    if (!ctx) return

    const canvas = cvs
    const context = ctx
    let w = 0
    let h = 0
    let prevMobile = false
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    let cachedRect = canvas.getBoundingClientRect()

    // Pre-generate all shapes
    function generateShapes() {
      const isMobile = w < MOBILE_BREAKPOINT
      const shapeCount = isMobile ? SHAPE_COUNT_MOBILE : SHAPE_COUNT_DESKTOP
      shapesRef.current = SHAPE_GENERATORS.map(gen => gen(shapeCount))
    }

    function applySize(isInit = false) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cachedRect = canvas.getBoundingClientRect()
      const oldW = w, oldH = h
      w = cachedRect.width
      h = cachedRect.height
      const isMobile = w < MOBILE_BREAKPOINT
      const crossedBreakpoint = isMobile !== prevMobile
      prevMobile = isMobile

      canvas.width = w * dpr
      canvas.height = h * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (particlesRef.current.length === 0 || crossedBreakpoint) {
        generateShapes()
        particlesRef.current = createParticles(w, h)
        smRef.current = createStateMachine()
        assignShapeTargets(particlesRef.current, shapesRef.current[0], w, h)
      } else if (!isInit && oldW > 0 && oldH > 0) {
        // Proportionally rescale particle positions for non-breakpoint resize
        const sx = w / oldW, sy = h / oldH
        for (const p of particlesRef.current) {
          p.x *= sx; p.y *= sy
        }
        generateShapes()
        assignShapeTargets(particlesRef.current, shapesRef.current[smRef.current.shapeIndex], w, h)
        smRef.current.state = 'forming'
        smRef.current.stateTime = 0
      }
    }

    function handleResize() {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => applySize(), 150)
    }

    applySize(true)
    isRunningRef.current = true
    timeRef.current = 0
    lastFrameRef.current = performance.now()

    // Mouse tracking
    const mouseState = { x: 0, y: 0, active: false }
    function handleMouseMove(e: MouseEvent) {
      mouseState.x = e.clientX - cachedRect.left
      mouseState.y = e.clientY - cachedRect.top
      mouseState.active = true
    }
    function handleMouseLeave() {
      mouseState.active = false
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        isRunningRef.current = false
        cancelAnimationFrame(frameRef.current)
      } else {
        isRunningRef.current = true
        lastFrameRef.current = performance.now()
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    // Pre-compute line styles
    const allColors = [...WARM_COLORS, ...COOL_COLORS]
    const lineStyles = new Map<string, string[]>()
    for (const c of allColors) {
      const cKey = `${c.r},${c.g},${c.b}`
      const styles: string[] = []
      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        const alpha = ((b + 1) / ALPHA_BUCKETS) * MAX_LINE_ALPHA
        styles.push(`rgba(${c.r},${c.g},${c.b},${alpha.toFixed(4)})`)
      }
      lineStyles.set(cKey, styles)
    }

    type LineSeg = { x1: number; y1: number; x2: number; y2: number }
    const lineBatches = new Map<string, LineSeg[]>()

    function animate(now: number) {
      if (!isRunningRef.current) return

      const dt = Math.min((now - lastFrameRef.current) / 1000, MAX_DT)
      lastFrameRef.current = now
      timeRef.current += dt

      const particles = particlesRef.current
      const sm = smRef.current
      const shapes = shapesRef.current

      // Update state machine
      updateStateMachine(sm, particles, shapes, dt, w, h)

      // Update physics
      updatePhysics(particles, sm, mouseState.x, mouseState.y, mouseState.active, noiseRef.current, timeRef.current, w, h)

      // Clear
      context.clearRect(0, 0, w, h)

      // Draw connection lines (only during forming/holding)
      if (sm.state === 'forming' || sm.state === 'holding') {
        const formAlpha = sm.state === 'forming'
          ? easeOutCubic(Math.min(sm.stateTime / FORMING_DURATION, 1))
          : 1.0

        const grid = buildSpatialGrid(particles, CONNECTION_DISTANCE)

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
                  if (distSq < CONNECTION_DIST_SQ) {
                    const ratio = distSq / CONNECTION_DIST_SQ
                    const alphaVal = (1 - ratio) * MAX_LINE_ALPHA * formAlpha
                    const bucketIdx = Math.min(Math.floor((alphaVal / MAX_LINE_ALPHA) * ALPHA_BUCKETS), ALPHA_BUCKETS - 1)
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

        for (const [batchKey, segments] of lineBatches) {
          if (segments.length === 0) continue
          const lastColon = batchKey.lastIndexOf(':')
          const cKey = batchKey.substring(0, lastColon)
          const bucketIdx = parseInt(batchKey.substring(lastColon + 1), 10)
          const styles = lineStyles.get(cKey)
          if (!styles) continue
          context.strokeStyle = styles[bucketIdx]
          // Closer particles (higher bucket) get slightly thicker lines
          context.lineWidth = 0.3 + (bucketIdx / ALPHA_BUCKETS) * 0.4
          context.beginPath()
          for (let s = 0; s < segments.length; s++) {
            const seg = segments[s]
            context.moveTo(seg.x1, seg.y1)
            context.lineTo(seg.x2, seg.y2)
          }
          context.stroke()
        }
      }

      // Draw particles
      const time = timeRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const pulse = Math.sin(time * PULSE_FREQUENCY + p.phase) * PULSE_AMPLITUDE + 1
        const finalSize = p.size * p.depthFactor
        const finalAlpha = p.baseAlpha * pulse * p.depthFactor

        const glowRadius = finalSize * GLOW_RADIUS_MULT
        const sprite = spriteCache.get(p.spriteKey)
        if (sprite) {
          context.globalAlpha = finalAlpha
          context.drawImage(sprite, p.x - glowRadius, p.y - glowRadius, glowRadius * 2, glowRadius * 2)
        }

        context.globalAlpha = Math.min(finalAlpha * CORE_ALPHA_MULT, MAX_CORE_ALPHA)
        context.fillStyle = p.fillStyle
        context.beginPath()
        context.arc(p.x, p.y, finalSize, 0, Math.PI * 2)
        context.fill()
      }

      context.globalAlpha = 1
      frameRef.current = requestAnimationFrame(animate)
    }

    if (w > 0 && h > 0) {
      frameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      isRunningRef.current = false
      cancelAnimationFrame(frameRef.current)
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      spriteCache.clear()
    }
  }, [createParticles])

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
