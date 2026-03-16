"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const ChatWidget = dynamic(
  () => import("@/components/ui/chat-widget").then((m) => ({ default: m.ChatWidget })),
  { ssr: false }
)

export function ChatWidgetLoader() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Load after 3 seconds idle or on first scroll
    const timer = setTimeout(() => setShouldLoad(true), 3000)
    const onScroll = () => {
      setShouldLoad(true)
      window.removeEventListener("scroll", onScroll)
    }
    window.addEventListener("scroll", onScroll, { once: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  if (!shouldLoad) return null
  return <ChatWidget />
}
