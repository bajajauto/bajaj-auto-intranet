import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ExternalLink, FileText, Send, X } from 'lucide-react'
import jarvisImage from '@/assets/jarvis-blue.png'
import { JARVIS_OPEN_EVENT } from '@/lib/jarvis'
import { SCROLL_TOP_OFFSET } from '@/lib/layout'
import { runShellAction } from '@/lib/shellActions'
import { answer, SUGGESTIONS } from '@/lib/jarvisBot/engine'
import { useJarvisKnowledge } from '@/hooks/useJarvisKnowledge'
import { scrollToSection } from '@/utils/scrollToSection'

function JarvisIcon({ size = 32, className = '' }) {
  return (
    <img
      src={jarvisImage}
      alt=""
      width={size}
      height={size}
      className={className}
      draggable="false"
      aria-hidden="true"
    />
  )
}

const WELCOME =
  "Hi! I'm Jarvis, your Bajaj Auto assistant. Ask me about HR policies, holidays, letters and forms, or any intranet service."

// One answer button. Links open in a new tab, sections scroll, shell actions
// open the Header's modals, and `ask` sends its text as the next question.
function ActionChip({ action, onAsk }) {
  const Icon = action.href ? (action.kind === 'document' ? FileText : ExternalLink) : ArrowRight
  function run() {
    if (action.href) window.open(action.href, '_blank', 'noopener,noreferrer')
    else if (action.sectionId) scrollToSection(action.sectionId)
    else if (action.action) runShellAction(action.action)
    else if (action.ask) onAsk(action.ask)
  }
  return (
    <button
      type="button"
      onClick={run}
      className={`inline-flex min-w-0 max-w-full items-center gap-1 overflow-hidden rounded-full border px-2.5 py-1 text-left text-[11px] font-medium transition-all focus-ring ${
        action.related
          ? 'border-brand-primary/10 bg-white text-text-secondary hover:border-brand-primary/30 hover:text-brand-primary'
          : 'border-brand-primary/20 bg-brand-light text-brand-primary hover:bg-brand-primary hover:text-white'
      }`}
    >
      <Icon size={12} className="flex-shrink-0" aria-hidden="true" />
      <span className="min-w-0 truncate">{action.label}</span>
    </button>
  )
}

export default function FloatingSupportButton() {
  const [hideForFeedback, setHideForFeedback] = useState(false)
  const [isPromptDismissed, setPromptDismissed] = useState(false)
  const [isPromptClosing, setPromptClosing] = useState(false)
  const [hasPassedEss, setHasPassedEss] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [messages, setMessages] = useState([{ id: 1, from: 'bot', text: WELCOME, actions: [] }])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const knowledge = useJarvisKnowledge({ enabled: hasOpened })
  // Read when the reply is composed, not when the question was sent, so an
  // answer given just after the policy library lands already knows it.
  const knowledgeRef = useRef(knowledge)
  knowledgeRef.current = knowledge

  useEffect(() => {
    if (isOpen) setHasOpened(true)
  }, [isOpen])

  useEffect(() => {
    const feedback = document.getElementById('feedback')
    if (!feedback) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setHideForFeedback(entry.isIntersecting),
      {
        threshold: 0.12,
      }
    )
    observer.observe(feedback)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const selfService = document.getElementById('self-service')
    if (!selfService) return undefined
    function update() {
      setHasPassedEss(selfService.getBoundingClientRect().bottom <= SCROLL_TOP_OFFSET)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Other parts of the page (the hero's "Ask Jarvis", search with no match)
  // open the chat through this event rather than reaching into its state.
  useEffect(() => {
    function open() {
      setIsOpen(true)
    }
    window.addEventListener(JARVIS_OPEN_EVENT, open)
    return () => window.removeEventListener(JARVIS_OPEN_EVENT, open)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { id: Date.now(), from: 'user', text: trimmed }])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      const { data, isPending } = knowledgeRef.current
      const reply = answer(trimmed, data)
      const text =
        reply.fallback && isPending
          ? "I'm still loading the policy library. Please ask again in a moment."
          : reply.text
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: 'bot', text, actions: reply.actions ?? [] },
      ])
    }, 500)
  }

  const showPrompt = !isOpen && !isPromptDismissed && !hasPassedEss
  const renderPrompt = showPrompt || isPromptClosing
  const showQuickActions = messages.length === 1 && !isTyping

  function dismissPrompt(event) {
    event.stopPropagation()
    if (isPromptClosing) return
    setPromptClosing(true)
    window.setTimeout(() => {
      setPromptDismissed(true)
      setPromptClosing(false)
    }, 220)
  }

  return (
    <div
      className={`fixed bottom-20 right-4 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-end transition-all sm:right-6 md:bottom-8 md:right-8 ${
        hideForFeedback ? 'pointer-events-none translate-y-3 opacity-0' : 'opacity-100'
      }`}
    >
      {/* ── Chat panel ─────────────────────────────────────── */}
      {isOpen && (
        <div className="mb-2 flex w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-brand-primary/10 bg-white shadow-[0_8px_40px_rgba(26,86,168,0.18)] animate-in slide-in-from-bottom-4 duration-300 sm:w-[22rem]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-brand-primary to-brand-dark px-4 py-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#202020] ring-2 ring-white/20">
              <JarvisIcon size={40} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">Jarvis</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <p className="text-[11px] text-white/65">Bajaj Auto assistant · Online</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/15 hover:text-white focus-ring"
              aria-label="Close Jarvis chat"
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex max-h-[min(24rem,55vh)] min-h-[10rem] flex-col gap-3 overflow-y-auto bg-slate-50/70 p-3.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-primary/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {msg.from === 'bot' && (
                  <div className="mb-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#202020]">
                    <JarvisIcon size={28} />
                  </div>
                )}
                <div
                  className={`flex min-w-0 max-w-[85%] flex-col gap-1.5 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`whitespace-pre-line break-words rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.from === 'user'
                        ? 'rounded-br-sm bg-brand-primary text-white'
                        : 'rounded-bl-sm border border-brand-primary/8 bg-white text-text-primary shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.actions?.length > 0 && (
                    <div className="flex max-w-full flex-wrap gap-1.5">
                      {msg.actions.map((action) => (
                        <ActionChip
                          key={`${action.label}-${action.href ?? action.ask ?? action.action ?? action.sectionId}`}
                          action={action}
                          onAsk={sendMessage}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="mb-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#202020]">
                  <JarvisIcon size={28} />
                </div>
                <div className="flex gap-1.5 rounded-2xl rounded-bl-sm border border-brand-primary/8 bg-white px-4 py-3.5 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-primary/50 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-primary/50 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-primary/50 [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-action chips (only on welcome screen) */}
          {showQuickActions && (
            <div className="flex flex-wrap gap-1.5 border-t border-brand-primary/8 bg-white px-3.5 py-2.5">
              {SUGGESTIONS.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => sendMessage(label)}
                  className="rounded-full border border-brand-primary/20 bg-brand-light px-2.5 py-1.5 text-[11px] font-medium text-brand-primary transition-all hover:bg-brand-primary hover:text-white focus-ring"
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-brand-primary/8 bg-white px-3 py-2.5">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask Jarvis anything…"
              className="flex-1 rounded-full border border-brand-primary/15 bg-bg-alt px-4 py-2 text-[13px] text-text-primary placeholder:text-text-secondary/50 focus:border-brand-primary/35 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            />
            <button
              type="button"
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-white transition-all hover:bg-brand-dark focus-ring disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Pill trigger button ─────────────────────────────── */}
      <div className="flex max-w-full items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="group flex h-[52px] items-center gap-2.5 rounded-full bg-navy pl-2.5 pr-[22px] text-white shadow-[0_10px_30px_rgba(14,27,46,0.3)] ring-1 ring-white/10 transition-all hover:-translate-y-0.5 focus-ring"
          aria-label={isOpen ? 'Close Jarvis chat' : 'Open Jarvis chat'}
          aria-expanded={isOpen}
          title="Jarvis"
        >
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#202020] ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105">
            <JarvisIcon size={36} />
          </span>
          <span className="text-[15px] font-semibold">Ask Jarvis</span>
        </button>

        {renderPrompt && (
          <div
            className={`hidden origin-left items-center gap-2 rounded-full border border-brand-primary/15 bg-white/95 py-2 pl-3 pr-1.5 text-sm font-semibold text-brand-dark shadow-card backdrop-blur-md sm:flex ${
              isPromptClosing ? 'jarvis-prompt-exit' : 'jarvis-prompt-enter'
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.75)]" />
            <span className="whitespace-nowrap">Need help with anything?</span>
            <button
              type="button"
              onClick={dismissPrompt}
              className="rounded-full p-1 text-text-secondary transition-colors hover:bg-brand-light hover:text-brand-primary focus-ring"
              aria-label="Close Jarvis message"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
