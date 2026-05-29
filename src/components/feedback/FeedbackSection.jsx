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
      <div className="px-4 py-3">
        {title && (
          <h2 className="mb-2 text-base font-semibold text-brand-primary">{title}</h2>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          <h3 className="text-base font-bold leading-snug text-brand-primary sm:text-lg">
            {HEADING}
          </h3>

          <button
            onClick={() => openModal('')}
            className="flex items-center justify-center gap-2 rounded-btn border border-brand-primary/20 bg-white/70 px-3 py-1.5 text-xs font-semibold text-brand-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/35 hover:bg-brand-light focus-ring"
          >
            <MessageSquare size={14} />
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
