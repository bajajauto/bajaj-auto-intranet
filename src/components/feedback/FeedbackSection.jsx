import { useState } from 'react'
import { MessageSquare, ClipboardList } from 'lucide-react'
import FeedbackModal from './FeedbackModal'

const HEADING = 'Help us improve your experience'

export default function FeedbackSection() {
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

      <div className="bg-white rounded-card shadow-card border border-gray-100 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Left: text */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold leading-snug mb-1 select-none">
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
            <p className="text-sm text-brand-primary/70 max-w-sm">
              Share feedback, report an issue, or raise an IT request.
            </p>
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => openModal('')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-btn bg-brand-primary text-white text-sm font-semibold shadow-sm hover:bg-brand-dark hover:-translate-y-0.5 focus-ring transition-all duration-200"
            >
              <MessageSquare size={16} />
              Submit Feedback
            </button>
            <button
              onClick={() => openModal('IT')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-btn border-2 border-brand-primary text-brand-primary text-sm font-semibold hover:bg-brand-light hover:-translate-y-0.5 focus-ring transition-all duration-200"
            >
              <ClipboardList size={16} />
              Raise Request
            </button>
          </div>
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
