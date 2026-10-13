import { useState } from 'react'
import { CheckCircle, MessageSquare } from 'lucide-react'

const RATINGS = [
  { value: 1, emoji: '😞', label: 'Very unhappy' },
  { value: 2, emoji: '🙁', label: 'Unhappy' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 4, emoji: '🙂', label: 'Happy' },
  { value: 5, emoji: '😍', label: 'Love it' },
]

/*
 * A one-tap rating, then an optional note. The text box stays folded away
 * until asked for, so rating alone is a complete answer. Nothing is sent
 * anywhere yet — there is no feedback service behind this — so submitting
 * only thanks the reader.
 */
export default function FeedbackSection() {
  const [rating, setRating] = useState(null)
  const [isWriting, setWriting] = useState(false)
  const [note, setNote] = useState('')
  const [isSent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  function reset() {
    setRating(null)
    setWriting(false)
    setNote('')
    setSent(false)
  }

  return (
    <div className="mx-auto max-w-xl text-center text-ink">
      <div>
        <p className="mb-1 text-[11px] font-bold tracking-[0.08em] text-accent-orange">FEEDBACK</p>
        <h2
          id="feedback-heading"
          className="font-display text-[22px] font-semibold leading-tight tracking-[-0.015em]"
        >
          How is your experience?
        </h2>

        {isSent ? (
          <div role="status" className="mt-4 flex flex-col items-center gap-2">
            <CheckCircle size={28} className="text-accent-green" />
            <p className="text-sm text-muted">Thank you — your feedback was received.</p>
            <button
              type="button"
              onClick={reset}
              className="rounded text-sm font-semibold text-brand-primary hover:text-brand-dark focus-ring dark:text-[#8fb5ec]"
            >
              Send more feedback
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              role="radiogroup"
              aria-label="Rate your experience"
              className="mt-3 flex justify-center gap-2"
            >
              {RATINGS.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  role="radio"
                  aria-checked={rating === r.value}
                  aria-label={r.label}
                  title={r.label}
                  onClick={() => setRating(r.value)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-[22px] transition-all focus-ring sm:h-11 sm:w-11 sm:text-[24px] ${
                    rating === r.value
                      ? 'scale-110 bg-surface shadow-lifted ring-2 ring-brand-primary/40'
                      : rating
                        ? 'bg-chip opacity-50 hover:opacity-100'
                        : 'bg-chip hover:scale-110 hover:bg-surface hover:shadow-soft'
                  }`}
                >
                  <span aria-hidden="true">{r.emoji}</span>
                </button>
              ))}
            </div>

            {isWriting ? (
              <div className="mt-4 text-left">
                <label htmlFor="feedback-note" className="mb-2 block text-sm font-semibold">
                  Tell us what you would like us to improve
                </label>
                <textarea
                  id="feedback-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  autoFocus
                  placeholder="Something missing, broken or slow?"
                  className="w-full resize-none rounded-2xl border-0 bg-surface px-4 py-2.5 text-sm text-ink shadow-soft outline-none ring-1 ring-line/[0.08] placeholder:text-muted focus:ring-2 focus:ring-brand-primary/40"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setWriting(true)}
                className="mt-3 inline-flex items-center gap-2 rounded text-sm font-semibold text-muted underline decoration-muted/40 underline-offset-4 hover:text-ink focus-ring"
              >
                <MessageSquare size={14} />
                Tell us what you would like us to improve
              </button>
            )}

            {(rating || isWriting) && (
              <div className="mt-3 flex justify-center">
                <button
                  type="submit"
                  disabled={!rating && !note.trim()}
                  className="inline-flex h-9 items-center rounded-full bg-brand-primary px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.03] focus-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
