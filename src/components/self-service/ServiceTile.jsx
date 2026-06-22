import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, FileText, ExternalLink, ChevronRight } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import holidayCalendarImage from '@/assets/holiday calendar.jpg'
import { documentForms } from '@/config/documents.config'
import PoliciesBenefitsModal from './PoliciesBenefitsModal'

const MODAL_TRANSITION_MS = 500

// Pitstop colour system — one colour per category, so like things read alike.
// Each badge gets a gradient plus a category-matched glow that fires on hover.
const categoryStyles = {
  people: {
    badge: 'from-[#2563C9] to-[#123A78]',
    glow: 'group-hover:shadow-[0_8px_20px_-6px_rgba(37,99,201,0.6)]',
  },
  pay: {
    badge: 'from-[#3D52B5] to-[#1E2A66]',
    glow: 'group-hover:shadow-[0_8px_20px_-6px_rgba(61,82,181,0.6)]',
  },
  time: {
    badge: 'from-[#0E96B0] to-[#075E72]',
    glow: 'group-hover:shadow-[0_8px_20px_-6px_rgba(14,150,176,0.6)]',
  },
  admin: {
    badge: 'from-[#52668A] to-[#2C3A56]',
    glow: 'group-hover:shadow-[0_8px_20px_-6px_rgba(82,102,138,0.6)]',
  },
  growth: {
    badge: 'from-[#D6890C] to-[#945905]',
    glow: 'group-hover:shadow-[0_8px_20px_-6px_rgba(214,137,12,0.6)]',
  },
  health: {
    badge: 'from-[#D9536E] to-[#9B2C46]',
    glow: 'group-hover:shadow-[0_8px_20px_-6px_rgba(217,83,110,0.6)]',
  },
  it: {
    badge: 'from-[#6B4FC4] to-[#3C2A7A]',
    glow: 'group-hover:shadow-[0_8px_20px_-6px_rgba(107,79,196,0.6)]',
  },
}

// Access-frequency tiers — the grid's pecking order, read left-to-right.
// hot = daily drivers (prominent: deeper shadow, bright ring, bold label),
// warm = neutral, cool = occasional (quiet: flatter, desaturated, recedes).
const tierStyles = {
  hot: { ring: 'ring-white/30', extra: '', shadow: 'shadow-lg', label: 'text-gray-700' },
  warm: { ring: 'ring-white/20', extra: '', shadow: 'shadow-md', label: 'text-gray-500' },
  cool: { ring: 'ring-white/10', extra: 'opacity-90 saturate-[0.8]', shadow: 'shadow-sm', label: 'text-gray-400' },
}

const serviceTier = {
  'team-directory': 'hot',
  'leave-attendance': 'hot',
  'holiday-calendar': 'hot',
  compensation: 'warm',
  benefits: 'warm',
  'recognition-gem': 'warm',
  'idea-hub': 'warm',
  'bolt-learning': 'warm',
  travel: 'warm',
  policies: 'warm',
  'health-wellness': 'warm',
  mediclaim: 'cool',
  documents: 'cool',
  'form-16': 'cool',
  'it-summit': 'cool',
}

const serviceCategory = {
  'team-directory': 'people',
  benefits: 'pay',
  compensation: 'pay',
  'form-16': 'pay',
  'leave-attendance': 'time',
  travel: 'time',
  'holiday-calendar': 'time',
  policies: 'admin',
  documents: 'admin',
  'idea-hub': 'growth',
  'bolt-learning': 'growth',
  'recognition-gem': 'growth',
  'health-wellness': 'health',
  mediclaim: 'health',
  'it-summit': 'it',
}

const DEFAULT_STYLE = categoryStyles.people

function ServiceDocumentModal({ title, titleId, onClose, children }) {
  const [visible, setVisible] = useState(false)

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, MODAL_TRANSITION_MS)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.getElementById('root')?.classList.add('modal-open')
    setVisible(true)

    function handleKeyDown(e) {
      if (e.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.getElementById('root')?.classList.remove('modal-open')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClose])

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 sm:p-6 ${
        visible ? 'bg-black/25' : 'pointer-events-none bg-transparent'
      }`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby={titleId}
    >
      <div
        className={`relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 ease-out ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-gradient-to-br from-brand-primary to-brand-dark px-5 py-4 text-white sm:px-6">
          <h2 id={titleId} className="text-base font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:rotate-90 hover:bg-white/20 focus-ring"
            aria-label={`Close ${title}`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 justify-center overflow-auto bg-bg-alt p-3 sm:p-4">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default function ServiceTile({ id, label, icon, redirectUrl }) {
  const [isHolidayCalendarOpen, setHolidayCalendarOpen] = useState(false)
  const [isPoliciesOpen, setPoliciesOpen] = useState(false)
  const [isDocumentsOpen, setDocumentsOpen] = useState(false)
  const Icon = iconMap[icon] ?? iconMap.ExternalLink
  const { badge, glow } = categoryStyles[serviceCategory[id]] ?? DEFAULT_STYLE
  const tier = tierStyles[serviceTier[id]] ?? tierStyles.warm
  const isClickable = redirectUrl && redirectUrl !== '#'
  const opensHolidayCalendar = id === 'holiday-calendar'
  const opensPolicies = id === 'policies'
  const opensDocuments = id === 'documents'

  const className =
    'group flex flex-col items-center justify-center gap-1.5 w-full py-1 px-1 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-ring'
  const content = (
    <>
      <span className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${badge} ${tier.extra} ${tier.shadow} ring-1 ring-inset ${tier.ring} transition-all duration-300 group-hover:scale-110 ${glow}`}>
        {/* convex gloss — the glossy app-icon highlight */}
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_85%_at_28%_12%,rgba(255,255,255,0.5),rgba(255,255,255,0)_55%)]" />
        {/* rim light + inner shadow — gives the tile a rounded, 3D body */}
        <span className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_-6px_10px_-5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.45)]" />
        {/* Pitstop speed-sweep — a racing shine that streaks across on hover */}
        <span className="pointer-events-none absolute inset-y-0 left-[-60%] w-2/3 skew-x-[-20deg] bg-white/30 blur-[2px] transition-all duration-500 ease-out group-hover:left-[140%]" />
        <Icon size={26} strokeWidth={2} className="relative z-10 text-white drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.3)]" />
      </span>

      <span className={`relative z-10 line-clamp-2 px-1 text-center text-[9px] font-semibold uppercase leading-tight tracking-wide ${tier.label}`}>
        {label}
      </span>
    </>
  )

  if (isClickable) {
    return (
      <a
        href={redirectUrl}
        target="_blank"
        rel="noreferrer"
        className={className}
        aria-label={label}
      >
        {content}
      </a>
    )
  }

  if (opensHolidayCalendar) {
    return (
      <>
        <button
          type="button"
          onClick={() => setHolidayCalendarOpen(true)}
          className={className}
          aria-label={label}
        >
          {content}
        </button>

        {isHolidayCalendarOpen && (
          <ServiceDocumentModal
            title="Holiday Calendar"
            titleId="holiday-calendar-title"
            onClose={() => setHolidayCalendarOpen(false)}
          >
            <img
              src={holidayCalendarImage}
              alt="Holiday Calendar"
              className="h-auto max-h-[calc(88vh-6rem)] w-auto max-w-full rounded-card object-contain shadow-card"
            />
          </ServiceDocumentModal>
        )}
      </>
    )
  }

  if (opensPolicies) {
    return (
      <>
        <button
          type="button"
          onClick={() => setPoliciesOpen(true)}
          className={className}
          aria-label={label}
        >
          {content}
        </button>

        {isPoliciesOpen && <PoliciesBenefitsModal onClose={() => setPoliciesOpen(false)} />}
      </>
    )
  }

  if (opensDocuments) {
    return (
      <>
        <button
          type="button"
          onClick={() => setDocumentsOpen(true)}
          className={className}
          aria-label={label}
        >
          {content}
        </button>

        {isDocumentsOpen && (
          <ServiceDocumentModal
            title="Documents / Forms"
            titleId="documents-forms-title"
            onClose={() => setDocumentsOpen(false)}
          >
            <ul className="w-full max-w-xl space-y-2.5 self-start">
              {documentForms.map((doc) => (
                <li key={doc.id}>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-card focus-ring"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#334460] to-[#192838] text-white">
                      <FileText size={18} strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-text-primary group-hover:text-brand-primary">
                        {doc.label}
                      </span>
                      {doc.description && (
                        <span className="mt-0.5 block text-xs text-text-secondary">{doc.description}</span>
                      )}
                    </span>
                    <ExternalLink
                      size={15}
                      className="flex-shrink-0 text-text-secondary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                    <ChevronRight
                      size={16}
                      className="flex-shrink-0 text-text-secondary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-primary"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </ServiceDocumentModal>
        )}
      </>
    )
  }

  return (
    <button type="button" className={className} aria-label={label}>
      {content}
    </button>
  )
}
