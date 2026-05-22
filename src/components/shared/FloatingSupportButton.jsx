import { useEffect, useState } from 'react'
import { BotMessageSquare, X } from 'lucide-react'

export default function FloatingSupportButton() {
  const [hideForFeedback, setHideForFeedback] = useState(false)
  const [isPromptDismissed, setPromptDismissed] = useState(false)
  const [hasPassedEss, setHasPassedEss] = useState(false)

  useEffect(() => {
    const feedback = document.getElementById('feedback')
    if (!feedback) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideForFeedback(entry.isIntersecting)
      },
      { threshold: 0.12 }
    )

    observer.observe(feedback)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const selfService = document.getElementById('self-service')
    if (!selfService) return undefined

    function updatePromptVisibility() {
      setHasPassedEss(selfService.getBoundingClientRect().bottom <= 124)
    }

    updatePromptVisibility()
    window.addEventListener('scroll', updatePromptVisibility, { passive: true })
    window.addEventListener('resize', updatePromptVisibility)

    return () => {
      window.removeEventListener('scroll', updatePromptVisibility)
      window.removeEventListener('resize', updatePromptVisibility)
    }
  }, [])

  const showPrompt = !isPromptDismissed && !hasPassedEss

  return (
    <div
      className={`fixed bottom-20 right-6 z-40 transition-all md:bottom-8 md:right-8 ${
        hideForFeedback ? 'pointer-events-none translate-y-3 opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex items-center rounded-full bg-brand-primary text-white shadow-card transition-all hover:bg-brand-dark">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full px-4 py-3 focus-ring"
          aria-label="Jarvis"
          title="Jarvis"
        >
          <BotMessageSquare size={20} />
          <span className="text-sm font-medium">Jarvis</span>
        </button>

        {showPrompt && (
          <div className="flex items-center gap-2 border-l border-white/20 py-3 pl-3 pr-2 text-sm font-medium text-white">
            <span className="whitespace-nowrap">Hey, how can I help you?</span>
            <button
              type="button"
              onClick={() => setPromptDismissed(true)}
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
