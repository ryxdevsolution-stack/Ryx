"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, User, ArrowRight } from "lucide-react"
import Image from "next/image"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatAction {
  type: "fill_contact" | "navigate"
  data: Record<string, string>
}

// Global event for contact form auto-fill
export const RAVEN_EVENTS = {
  FILL_CONTACT: "raven:fill-contact",
} as const

export function ChatWidget() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I'm RAVEN, RYX's AI assistant. I can help you explore our services, discuss your project, or connect you with the team. What brings you here?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      setShowPulse(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleAction = useCallback(
    (action: ChatAction) => {
      if (action.type === "navigate") {
        router.push(action.data.path)
      }

      if (action.type === "fill_contact") {
        // Navigate to contact if not already there
        if (pathname !== "/contact") {
          router.push("/contact")
        }
        // Dispatch event after a short delay for page load
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent(RAVEN_EVENTS.FILL_CONTACT, {
              detail: action.data,
            })
          )
        }, pathname === "/contact" ? 100 : 1500)
      }
    },
    [router, pathname]
  )

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = { role: "user", content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Something went wrong." },
        ])
        return
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ])

      // Handle actions (navigate, fill contact)
      if (data.action) {
        handleAction(data.action)
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickActions = [
    { label: "Our Services", msg: "What services does RYX offer?" },
    { label: "Start a Project", msg: "I want to discuss a project with RYX" },
    { label: "View Portfolio", msg: "Show me your portfolio" },
  ]

  const handleQuickAction = (msg: string) => {
    setInput(msg)
    setTimeout(() => {
      setInput(msg)
      const fakeInput = { trim: () => msg } as unknown
      void fakeInput
      // Directly send
      const userMessage: Message = { role: "user", content: msg }
      const updatedMessages = [...messages, userMessage]
      setMessages(updatedMessages)
      setIsLoading(true)

      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.message || data.error },
          ])
          if (data.action) handleAction(data.action)
        })
        .catch(() => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Network error. Please try again." },
          ])
        })
        .finally(() => {
          setIsLoading(false)
          setInput("")
        })
    }, 50)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-[4.5rem] right-0 w-[380px] max-h-[560px] bg-white rounded-2xl shadow-2xl shadow-gray-900/15 border border-gray-200/60 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gray-950">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden shadow-lg shadow-violet-500/30">
                  <Image src="/RYX_Logo.png" alt="RYX" width={36} height={36} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">RAVEN</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-[11px] text-gray-400">Online • GPT-4o-mini</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white/20 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[300px] max-h-[380px] bg-gray-50/50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden ${
                      msg.role === "user"
                        ? "bg-gray-900"
                        : ""
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Image src="/chatbot.png" alt="RAVEN" width={28} height={28} className="w-full h-full object-cover rounded-lg" />
                    )}
                  </div>
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gray-900 text-white rounded-2xl rounded-br-md"
                        : "bg-white text-gray-700 border border-gray-200/80 rounded-2xl rounded-bl-md shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Quick Actions - show only after first assistant message */}
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action.msg)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full hover:bg-violet-100 transition-colors"
                    >
                      {action.label}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="shrink-0 w-7 h-7 rounded-lg overflow-hidden">
                    <Image src="/chatbot.png" alt="RAVEN" width={28} height={28} className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white border border-gray-200/80 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask RAVEN anything..."
                  disabled={isLoading}
                  className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                RAVEN by RYX • Powered by AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div className="relative">
        {/* Pulse ring */}
        {showPulse && (
          <span className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping" />
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close RAVEN" : "Open RAVEN"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 bg-gray-950 rounded-full flex items-center justify-center text-white shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:shadow-gray-900/30 transition-shadow"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden"
              >
                <Image src="/chatbot.png" alt="RAVEN" width={32} height={32} className="w-full h-full object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}
