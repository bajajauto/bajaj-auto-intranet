import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import FeedbackModal from './FeedbackModal'

const HEADING = 'Help us improve your experience'

export default function FeedbackSection({ title }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [defaultCategory, setDefaultCategory] = useState('')

  function openModal(category) {
    setDefaultCategory(category)
    setModalOpen(true)
  }

  return (
    <>
      <style>{`
        @keyframes letter-glow {
          0%, 100% {
            color: #1A56A8;
            text-shadow: none;
          }
          50% {
            color: #2563EB;
            text-shadow:
              0 0 4px rgba(37,99,235,0.35),
              0 0 8px rgba(37,99,235,0.15);
          }
        }
      `}</style>

      <div className="site-surface rounded-card border p-4">
        {title && (
          <h2 className="mb-3 text-lg font-semibold text-brand-primary">{title}</h2>
        )}
      <div className="flex items-center justify-center gap-4 py-4 flex-wrap">
        <h3 className="text-lg font-bold leading-snug select-none sm:text-xl">
          {HEADING.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                animation: 'letter-glow 4s ease-in-out infinite',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </h3>

        <button
          onClick={() => openModal('')}
          className="flex items-center justify-center gap-2 rounded-btn border border-brand-primary/20 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/35 hover:bg-brand-light focus-ring"
        >
          <MessageSquare size={16} />
          Submit Feedback
        </button>
      </div>
      </div>

      <FeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCategory={defaultCategory}
      />
    </>
  )
}
