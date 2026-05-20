import { useEffect, useState } from 'react'
import { BotMessageSquare } from 'lucide-react'

export default function FloatingSupportButton() {
  const [hideForFeedback, setHideForFeedback] = useState(false)

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

  return (
    <button
      type="button"
      className={`fixed bottom-20 right-6 z-40 flex items-center gap-2 rounded-full bg-brand-primary px-4 py-3 text-white shadow-card transition-all hover:bg-brand-dark focus-ring md:bottom-8 md:right-8 ${
        hideForFeedback ? 'pointer-events-none translate-y-3 opacity-0' : 'opacity-100'
      }`}
      aria-label="Jarvis"
      title="Jarvis"
    >
      <BotMessageSquare size={20} />
      <span className="text-sm font-medium">Jarvis</span>
    </button>
  )
}
