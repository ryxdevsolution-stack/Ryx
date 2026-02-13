"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function AnimatedCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const moveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { damping: 50, stiffness: 800, mass: 0.1 })
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 800, mass: 0.1 })
  const circleX = useSpring(mouseX, { damping: 30, stiffness: 400, mass: 0.2 })
  const circleY = useSpring(mouseY, { damping: 30, stiffness: 400, mass: 0.2 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
      setIsMoving(true)

      if (moveTimeout.current) clearTimeout(moveTimeout.current)
      moveTimeout.current = setTimeout(() => setIsMoving(false), 150)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          !!target.closest("a") ||
          !!target.closest("button")
      )
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      if (moveTimeout.current) clearTimeout(moveTimeout.current)
    }
  }, [mouseX, mouseY, isVisible])

  const circleSize = isHovering ? 48 : 32
  const circleOffset = -(circleSize / 2)

  return (
    <>
      {/* Pin dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="rounded-full bg-violet-600"
          style={{ width: 6, height: 6, marginLeft: -3, marginTop: -3 }}
        />
      </motion.div>

      {/* Following circle with idle breathing */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-[1.5px]"
        style={{ x: circleX, y: circleY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: circleSize,
          height: circleSize,
          marginLeft: circleOffset,
          marginTop: circleOffset,
          borderColor: isHovering
            ? "rgba(139, 92, 246, 0.6)"
            : "rgba(139, 92, 246, 0.3)",
          scale: isMoving ? 1 : [1, 1.15, 1],
        }}
        transition={{
          duration: 0.2,
          scale: isMoving
            ? { duration: 0.2 }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </>
  )
}
