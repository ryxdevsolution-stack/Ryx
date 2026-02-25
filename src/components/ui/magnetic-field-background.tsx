"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface MagneticFieldBackgroundProps {
  className?: string
  children?: React.ReactNode
  particleCount?: number
  poleCount?: number
  particleColor?: string
  lineLength?: number
  lineWidth?: number
  opacity?: number
  cursorStrength?: number
  cursorPolarity?: number
  showFieldLines?: boolean
  fieldLineColor?: string
}

interface Pole {
  x: number
  y: number
  strength: number
  polarity: number
}

interface Particle {
  x: number
  y: number
}

export function MagneticFieldBackground({
  className,
  children,
  particleCount = 1500,
  poleCount = 4,
  particleColor = "rgba(220, 220, 255, 0.75)",
  lineLength = 12,
  lineWidth = 1.5,
  opacity = 1,
  cursorStrength = 2,
  cursorPolarity = 1,
  showFieldLines = false,
  fieldLineColor = "rgba(100, 140, 255, 0.15)",
}: MagneticFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    let width = rect.width
    let height = rect.height
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    let animationId: number
    let mouseX = -10000
    let mouseY = -10000

    // Fixed magnetic poles
    const poles: Pole[] = []
    for (let i = 0; i < poleCount; i++) {
      const angle = (i / poleCount) * Math.PI * 2
      const radius = Math.min(width, height) * 0.3
      poles.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        strength: 1 + Math.random() * 0.5,
        polarity: i % 2 === 0 ? 1 : -1,
      })
    }

    // Iron filing particles
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
      })
    }

    const getFieldVector = (x: number, y: number): [number, number] => {
      let bx = 0
      let by = 0

      for (const pole of poles) {
        const dx = x - pole.x
        const dy = y - pole.y
        const dist = Math.sqrt(dx * dx + dy * dy) + 1
        const strength = (pole.strength * pole.polarity) / (dist * dist)
        bx += (dx / dist) * strength
        by += (dy / dist) * strength
      }

      if (mouseX > -1000 && mouseY > -1000) {
        const dx = x - mouseX
        const dy = y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy) + 1
        const strength = (cursorStrength * cursorPolarity) / (dist * dist)
        bx += (dx / dist) * strength
        by += (dy / dist) * strength
      }

      const mag = Math.sqrt(bx * bx + by * by) + 0.001
      return [bx / mag, by / mag]
    }

    // Listen on the parent section so events over content (pointer-events-none content div)
    // still drive the cursor effect — compute coords relative to the canvas container
    const sectionEl = container.closest('section') ?? container.parentElement ?? container

    const handleMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      mouseX = e.clientX - r.left
      mouseY = e.clientY - r.top
    }
    const handleMouseLeave = () => {
      mouseX = -10000
      mouseY = -10000
    }

    sectionEl.addEventListener("mousemove", handleMouseMove)
    sectionEl.addEventListener("mouseleave", handleMouseLeave)

    const handleResize = () => {
      const r = container.getBoundingClientRect()
      width = r.width
      height = r.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      for (let i = 0; i < poles.length; i++) {
        const angle = (i / poles.length) * Math.PI * 2
        const radius = Math.min(width, height) * 0.3
        poles[i].x = width / 2 + Math.cos(angle) * radius
        poles[i].y = height / 2 + Math.sin(angle) * radius
      }
      for (const p of particles) {
        p.x = Math.random() * width
        p.y = Math.random() * height
      }
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    const drawFieldLines = () => {
      if (!showFieldLines) return
      ctx.strokeStyle = fieldLineColor
      ctx.lineWidth = 1

      for (const pole of poles) {
        const lineCount = 12
        for (let i = 0; i < lineCount; i++) {
          const startAngle = (i / lineCount) * Math.PI * 2
          let x = pole.x + Math.cos(startAngle) * 20
          let y = pole.y + Math.sin(startAngle) * 20

          ctx.beginPath()
          ctx.moveTo(x, y)

          const direction = pole.polarity
          for (let step = 0; step < 100; step++) {
            const [fx, fy] = getFieldVector(x, y)
            x += fx * 5 * direction
            y += fy * 5 * direction

            if (x < 0 || x > width || y < 0 || y > height) break
            let nearPole = false
            for (const p of poles) {
              const dx = x - p.x
              const dy = y - p.y
              if (dx * dx + dy * dy < 400) { nearPole = true; break }
            }
            if (nearPole) break
            ctx.lineTo(x, y)
          }
          ctx.stroke()
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = opacity

      drawFieldLines()

      ctx.strokeStyle = particleColor
      ctx.lineWidth = lineWidth
      ctx.lineCap = "round"

      for (const particle of particles) {
        const [fx, fy] = getFieldVector(particle.x, particle.y)
        const halfLen = lineLength / 2
        ctx.beginPath()
        ctx.moveTo(particle.x - fx * halfLen, particle.y - fy * halfLen)
        ctx.lineTo(particle.x + fx * halfLen, particle.y + fy * halfLen)
        ctx.stroke()
      }

      // Subtle pole glows
      for (const pole of poles) {
        const gradient = ctx.createRadialGradient(pole.x, pole.y, 0, pole.x, pole.y, 60)
        const color = pole.polarity > 0 ? "255, 120, 100" : "100, 130, 255"
        gradient.addColorStop(0, `rgba(${color}, 0.12)`)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(pole.x, pole.y, 60, 0, Math.PI * 2)
        ctx.fill()
      }

      // Cursor glow
      if (mouseX > -1000 && mouseY > -1000) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 80)
        const color = cursorPolarity > 0 ? "255, 150, 100" : "100, 150, 255"
        gradient.addColorStop(0, `rgba(${color}, 0.18)`)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 80, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      sectionEl.removeEventListener("mousemove", handleMouseMove)
      sectionEl.removeEventListener("mouseleave", handleMouseLeave)
      ro.disconnect()
    }
  }, [particleCount, poleCount, particleColor, lineLength, lineWidth, opacity, cursorStrength, cursorPolarity, showFieldLines, fieldLineColor])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 w-full h-full overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Vignette — keeps edges dark so content is readable */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 35%, rgba(5,5,10,0.92) 100%)",
        }}
      />

      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}
