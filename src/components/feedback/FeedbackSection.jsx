import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import veryGood from '@/assets/icons/ocean/face-very-good.webp'
import good from '@/assets/icons/ocean/face-good.webp'
import neutral from '@/assets/icons/ocean/face-neutral.webp'
import bad from '@/assets/icons/ocean/face-bad.webp'
import veryBad from '@/assets/icons/ocean/face-very-bad.webp'
import { productBrand } from '@/config/brand.config'
import Panel from '@/components/shared/Panel'

const RATINGS = [
  { value: 5, face: veryGood, label: 'Very good' },
  { value: 4, face: good, label: 'Good' },
  { value: 3, face: neutral, label: 'Neutral' },
  { value: 2, face: bad, label: 'Bad' },
  { value: 1, face: veryBad, label: 'Very bad' },
]

/*
 * A one-tap rating, then an optional note. Rating alone is a complete answer.
 * Nothing is sent anywhere yet — there is no feedback service behind this —
 * so submitting only thanks the reader.
 */
export default function FeedbackSection() {
  const [rating, setRating] = useState(null)
  const [note, setNote] = useState('')
  const [isSent, setSent] = useState(false)

  function reset() {
    setRating(null)
    setNote('')
    setSent(false)
  }

  return (
    <Panel
      as="section"
      id="feedback"
      aria-labelledby="feedback-heading"
      surface="bg-gradient-to-r from-white via-[#c8d9e6] to-[#fcfdff]"
      className="scroll-mt-20 rounded-[14px] px-5 py-5 sm:px-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <h2 id="feedback-heading" className="text-[22px] font-bold tracking-[-0.02em] text-black">
            Help us make {productBrand.name} better.
          </h2>
          <p className="mt-1 text-[13px] text-black">How was your portal experience today?</p>
        </div>

        {isSent ? (
          <div role="status" className="flex items-center gap-3 text-[14px] text-ocean-ink">
            <CheckCircle size={22} className="text-ocean-700" />
            Thank you — your feedback was received.
            <button
              type="button"
              onClick={reset}
              className="rounded text-[13px] font-semibold text-ocean-700 hover:underline focus-ring"
            >
              Send more
            </button>
          </div>
        ) : (
          <div role="radiogroup" aria-label="Rate your experience" className="flex gap-3 sm:gap-5">
            {RATINGS.map((r) => (
              <button
                key={r.value}
                type="button"
                role="radio"
                aria-checked={rating === r.value}
                onClick={() => setRating(r.value)}
                className={`group flex w-14 flex-col items-center gap-1 rounded-xl focus-ring ${
                  rating && rating !== r.value ? 'opacity-50 hover:opacity-100' : ''
                }`}
              >
                <img
                  src={r.face}
                  alt=""
                  className={`h-[42px] w-[42px] object-contain transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:scale-110 ${
                    rating === r.value ? 'scale-[1.15]' : ''
                  }`}
                />
                <span className={`text-[11px] text-[#355987] ${rating === r.value ? 'font-bold' : 'font-semibold'}`}>
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {rating && !isSent && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
          className="mt-4 flex flex-wrap items-end gap-3"
        >
          <label htmlFor="feedback-note" className="sr-only">
            Tell us what you would like us to improve
          </label>
          <textarea
            id="feedback-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="Anything we should improve? (optional)"
            className="min-w-0 flex-1 resize-none rounded-xl border border-ocean-line bg-white px-4 py-2.5 text-[13px] text-ocean-ink outline-none placeholder:text-ocean-sub focus:ring-2 focus:ring-ocean-600/40"
          />
          <button
            type="submit"
            className="h-10 rounded-[10px] bg-gradient-to-r from-[#0a344a] to-[#2289aa] px-6 text-[13px] font-semibold text-white hover:brightness-110 focus-ring"
          >
            Submit
          </button>
        </form>
      )}
    </Panel>
  )
}
