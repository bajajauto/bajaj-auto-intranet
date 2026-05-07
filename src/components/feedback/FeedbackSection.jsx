import { useState } from 'react'
import { MessageSquare, ClipboardList } from 'lucide-react'
import FeedbackModal from './FeedbackModal'

export default function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [defaultCategory, setDefaultCategory] = useState('')

  function openModal(category) {
    setDefaultCategory(category)
    setModalOpen(true)
  }

  return (
    <div className="bg-white rounded-card shadow-card border border-gray-100 p-6 transition-all duration-200 hover:shadow-modal">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => openModal('')}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-btn bg-brand-primary text-white text-sm font-medium hover:bg-brand-dark focus-ring transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        >
          <MessageSquare size={18} />
          Submit Feedback
        </button>

        <button
          onClick={() => openModal('IT')}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-btn border-2 border-brand-primary text-brand-primary text-sm font-medium hover:bg-brand-light focus-ring transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        >
          <ClipboardList size={18} />
          Raise Request
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
