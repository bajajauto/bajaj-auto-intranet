import { useState } from 'react'
import { MessageSquare, ClipboardList, Vote } from 'lucide-react'
import FeedbackModal from './FeedbackModal'

export default function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [defaultCategory, setDefaultCategory] = useState('')

  function openModal(category) {
    setDefaultCategory(category)
    setModalOpen(true)
  }

  return (
    <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => openModal('')}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-btn bg-brand-primary text-white text-sm font-medium hover:bg-brand-dark focus-ring transition-colors"
        >
          <MessageSquare size={18} />
          Submit Feedback
        </button>

        <button
          onClick={() => openModal('IT')}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-btn border-2 border-brand-primary text-brand-primary text-sm font-medium hover:bg-brand-light focus-ring transition-colors"
        >
          <ClipboardList size={18} />
          Raise Request
        </button>

        <button
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-btn border border-gray-200 text-text-secondary text-sm font-medium hover:bg-bg-alt focus-ring transition-colors"
          aria-label="Take a poll – coming soon"
        >
          <Vote size={18} />
          Take a Poll
        </button>
      </div>

      <FeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCategory={defaultCategory}
      />
    </div>
  )
}
