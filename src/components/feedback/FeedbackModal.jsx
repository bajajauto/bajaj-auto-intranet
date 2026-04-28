import { useState } from 'react'
import Modal from '@/components/shared/Modal'
import Toast from '@/components/shared/Toast'

const CATEGORIES = ['HR', 'IT', 'Facilities', 'Finance', 'Other']

export default function FeedbackModal({ isOpen, onClose, defaultCategory }) {
  const [category, setCategory] = useState(defaultCategory ?? '')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [showToast, setShowToast] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
      onClose()
      setCategory(defaultCategory ?? '')
      setSubject('')
      setDescription('')
    }, 2000)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Submit Feedback / Request">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm rounded-btn border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            >
              <option value="">Select category...</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Brief subject..."
              className="w-full px-3 py-2 text-sm rounded-btn border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Describe your feedback or request..."
              className="w-full px-3 py-2 text-sm rounded-btn border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="attachment">
              Attachment (optional)
            </label>
            <input
              id="attachment"
              type="file"
              className="w-full text-sm text-text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded-btn file:border-0 file:text-xs file:font-medium file:bg-brand-light file:text-brand-primary hover:file:bg-brand-primary hover:file:text-white file:transition-colors"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-btn border border-gray-200 text-text-secondary hover:bg-bg-alt focus-ring transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-btn bg-brand-primary text-white hover:bg-brand-dark focus-ring transition-colors font-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {showToast && (
        <Toast message="Your submission was received. We'll get back to you soon." type="success" />
      )}
    </>
  )
}
