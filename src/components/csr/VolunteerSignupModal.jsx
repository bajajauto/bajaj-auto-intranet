import { useState } from 'react'
import { Calendar, MapPin } from 'lucide-react'
import Modal from '@/components/shared/Modal'
import Toast from '@/components/shared/Toast'
import { useUser } from '@/context/UserContext'

const T_SHIRT_SIZES = ['S', 'M', 'L', 'XL', 'XXL']

function formatDate(iso) {
  const date = new Date(iso)
  return date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
}

export default function VolunteerSignupModal({ opportunity, onClose }) {
  const user = useUser()
  const [tshirtSize, setTshirtSize] = useState('M')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!opportunity) return null

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Modal isOpen={true} onClose={onClose} title="Volunteer signup" maxWidth="max-w-lg">
        <div className="space-y-4">
          <div className="rounded-card border border-emerald-100 bg-emerald-50 px-3 py-3">
            <p className="text-sm font-semibold text-emerald-900">{opportunity.title}</p>
            <ul className="mt-1 space-y-0.5 text-xs text-emerald-800">
              <li className="flex items-center gap-1.5">
                <Calendar size={12} />
                {formatDate(opportunity.date)} · {opportunity.timeRange}
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin size={12} />
                {opportunity.location}
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-text-secondary">Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  readOnly
                  className="mt-1 w-full rounded-btn border border-gray-200 bg-bg-alt px-2.5 py-1.5 text-sm text-text-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  readOnly
                  className="mt-1 w-full rounded-btn border border-gray-200 bg-bg-alt px-2.5 py-1.5 text-sm text-text-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tshirt-size" className="block text-xs font-semibold text-text-secondary">
                T-shirt size
              </label>
              <div id="tshirt-size" className="mt-1 flex gap-1">
                {T_SHIRT_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setTshirtSize(size)}
                    className={
                      'flex h-8 w-9 items-center justify-center rounded-btn border text-xs font-semibold transition-all focus-ring ' +
                      (tshirtSize === size
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-gray-200 text-text-secondary hover:border-emerald-400')
                    }
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="csr-notes" className="block text-xs font-semibold text-text-secondary">
                Anything we should know? <span className="text-text-secondary/60">(optional)</span>
              </label>
              <textarea
                id="csr-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Dietary requirements, accessibility needs, special skills you'd like to contribute…"
                className="mt-1 w-full rounded-btn border border-gray-200 px-2.5 py-1.5 text-sm text-text-primary focus:border-emerald-400 focus-ring"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="rounded-btn px-3 py-1.5 text-sm font-semibold text-text-secondary hover:bg-bg-alt focus-ring"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-btn bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700 focus-ring"
              >
                Confirm signup
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {submitted && (
        <Toast
          message={`You're signed up for ${opportunity.title}. Confirmation email on its way.`}
          type="success"
          onDismiss={onClose}
        />
      )}
    </>
  )
}
