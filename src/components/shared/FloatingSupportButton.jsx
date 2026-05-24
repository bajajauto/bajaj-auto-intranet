import { useEffect, useRef, useState } from 'react'
import { BotMessageSquare, Send, Sparkles, X } from 'lucide-react'

const QUICK_ACTIONS = [
  { id: 'leave', label: 'Leave balance' },
  { id: 'it', label: 'Raise IT ticket' },
  { id: 'policy', label: 'HR policies' },
  { id: 'payslip', label: 'My payslip' },
  { id: 'holiday', label: 'Holiday list' },
]

function getBotResponse(text) {
  const t = text.toLowerCase()
  if (t.includes('leave') || t.includes('vacation') || t.includes('leave balance'))
    return 'You have 12 earned leave days and 6 sick leave days remaining this year. Would you like to apply for leave or see the full breakdown?'
  if (t.includes('it') || t.includes('ticket') || t.includes('laptop') || t.includes('computer') || t.includes('internet'))
    return "I'll help you raise an IT ticket. Please describe your issue briefly and I'll route it to the right team — typically resolved within 4 business hours."
  if (t.includes('policy') || t.includes('policies') || t.includes('hr policy'))
    return 'All HR policies are available in the Self-Service portal. Commonly accessed ones are Leave Policy, Travel Policy, and Code of Conduct. Which one do you need?'
  if (t.includes('payslip') || t.includes('salary') || t.includes('pay slip'))
    return 'Your latest payslip for April 2026 is ready. You can download it from Self-Service → Payroll → Payslips.'
  if (t.includes('holiday') || t.includes('holidays'))
    return 'The next public holiday is Maharashtra Day on 1 May. The full 2026 holiday calendar is available under Self-Service → HR → Holiday List.'
  return "I'm Jarvis in preview mode right now. For urgent queries please contact HR at hr@bajajauto.com or the IT helpdesk at helpdesk@bajajauto.com."
}

export default function FloatingSupportButton() {
  const [hideForFeedback, setHideForFeedback] = useState(false)
  const [isPromptDismissed, setPromptDismissed] = useState(false)
  const [hasPassedEss, setHasPassedEss] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: "Hi! I'm Jarvis, your Bajaj Auto assistant. Ask me anything about HR, IT, payroll, or company policies.",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const feedback = document.getElementById('feedback')
    if (!feedback) return undefined
    const observer = new IntersectionObserver(([entry]) => setHideForFeedback(entry.isIntersecting), {
      threshold: 0.12,
    })
    observer.observe(feedback)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const selfService = document.getElementById('self-service')
    if (!selfService) return undefined
    function update() {
      setHasPassedEss(selfService.getBoundingClientRect().bottom <= 124)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
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
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: 'bot', text: getBotResponse(trimmed) },
      ])
    }, 900)
  }

  const showPrompt = !isOpen && !isPromptDismissed && !hasPassedEss
  const showQuickActions = messages.length === 1 && !isTyping

  return (
    <div
      className={`fixed bottom-20 right-4 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-end transition-all sm:right-6 md:bottom-8 md:right-8 ${
        hideForFeedback ? 'pointer-events-none translate-y-3 opacity-0' : 'opacity-100'
      }`}
    >
      {/* ── Chat panel ─────────────────────────────────────── */}
      {isOpen && (
        <div className="mb-3 flex w-80 flex-col overflow-hidden rounded-2xl border border-brand-primary/10 bg-white shadow-[0_8px_40px_rgba(26,86,168,0.18)] animate-in slide-in-from-bottom-4 duration-300 sm:w-[22rem]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-brand-primary to-brand-dark px-4 py-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/20">
              <BotMessageSquare size={18} className="text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">Jarvis</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <p className="text-[11px] text-white/65">Bajaj Auto AI · Online</p>
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
          <div className="flex h-72 flex-col gap-3 overflow-y-auto bg-slate-50/70 p-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-primary/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {msg.from === 'bot' && (
                  <div className="mb-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary">
                    <Sparkles size={11} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[76%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.from === 'user'
                      ? 'rounded-br-sm bg-brand-primary text-white'
                      : 'rounded-bl-sm border border-brand-primary/8 bg-white text-text-primary shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="mb-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary">
                  <Sparkles size={11} className="text-white" />
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
            <div className="flex flex-wrap gap-1.5 border-t border-brand-primary/8 bg-white px-4 py-3">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => sendMessage(action.label)}
                  className="rounded-full border border-brand-primary/20 bg-brand-light px-3 py-1.5 text-[12px] font-medium text-brand-primary transition-all hover:bg-brand-primary hover:text-white focus-ring"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-brand-primary/8 bg-white px-3 py-3">
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
      <div className="flex max-w-full items-center rounded-full bg-brand-primary text-white shadow-card transition-all hover:bg-brand-dark">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full px-4 py-3 focus-ring"
          aria-label="Open Jarvis chat"
          title="Jarvis"
        >
          <BotMessageSquare size={20} />
          <span className="text-sm font-medium">Jarvis</span>
        </button>

        {showPrompt && (
          <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/12 py-1.5 pl-3.5 pr-1.5 text-sm font-medium text-white shadow-inner backdrop-blur-sm sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
            <span className="whitespace-nowrap">Need anything? I&apos;m here.</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setPromptDismissed(true)
              }}
              className="rounded-full p-1 text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-ring"
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
