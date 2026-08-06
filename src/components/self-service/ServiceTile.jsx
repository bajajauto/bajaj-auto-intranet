import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, FileText, ExternalLink, ChevronRight } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import holidayCalendarImage from '@/assets/holiday calendar.jpg'
import { documentForms } from '@/config/documents.config'
import PoliciesBenefitsModal from './PoliciesBenefitsModal'

const MODAL_TRANSITION_MS = 500

// Pitstop colour system — one tone per grid row, assigned in ServiceGrid.
// Each badge gets a gradient plus a tone-matched glow that fires on hover.
//
// Three tones for three rows. Green and amber are the wellness lotus's and the
// idea bulb's own colours, promoted from the artwork onto the badge behind it —
// which only became available once those icons were recoloured to white, since
// a green lotus on green was exactly the clash the old palette was dodging.
//
// Both run darker than their source hex: white icons need the badge to carry
// some depth, and amber is the shallowest of the three even after darkening.
// Each row lightens left to right — 2.6% lightness per column on both gradient
// stops, five steps, so a row spans about 10% end to end. Written out rather
// than computed because Tailwind only sees class strings that exist literally
// in the source.
//
// The ramp runs with the ordering: leftmost is most-used and stays the most
// saturated, so weight falls off the way attention does.
//
// Amber is what caps this. Its white icons sit at 2.01:1 against the light stop
// on the first tile and 1.75:1 on the last; blue and green have far more room
// (5.67 → 3.93 and 3.42 → 2.11). Pushing the ramp further would wash the amber
// row's icons out before either of the others showed strain.
const toneRamps = {
  blue: [
    'from-[#2563C9] to-[#123A78]',
    'from-[#2769D4] to-[#144084]',
    'from-[#3070D9] to-[#15458F]',
    'from-[#3B77DB] to-[#174B9B]',
    'from-[#467FDD] to-[#1950A6]',
  ],
  green: [
    'from-[#1E9E68] to-[#0A5334]',
    'from-[#20A96F] to-[#0B5F3B]',
    'from-[#22B477] to-[#0D6B43]',
    'from-[#24BF7E] to-[#0E774A]',
    'from-[#26CB85] to-[#108252]',
  ],
  amber: [
    'from-[#FCA407] to-[#9A5B02]',
    'from-[#FCA914] to-[#A76302]',
    'from-[#FCAE21] to-[#B46A02]',
    'from-[#FCB22E] to-[#C17203]',
    'from-[#FDB73B] to-[#CE7A03]',
  ],
}

// Glow stays keyed to the row rather than the column: it fires one tile at a
// time on hover, so there is nothing next to it to read a ramp against.
const toneGlows = {
  blue: 'group-hover:shadow-[0_8px_20px_-6px_rgba(37,99,201,0.6)]',
  green: 'group-hover:shadow-[0_8px_20px_-6px_rgba(30,158,104,0.6)]',
  amber: 'group-hover:shadow-[0_8px_20px_-6px_rgba(252,164,7,0.6)]',
}

// Every tile now gets the same weight. The old access-frequency tiers ranked
// tiles hot/warm/cool by how often they get used, which desaturated the cool
// ones and greyed their labels — that reads as three shades inside a row and
// works against a single colour per row. Frequency is no longer what the grid
// is sorted by either, so the tiers had nothing left to signal.
const BADGE_BASE = 'shadow-md ring-white/20'
const LABEL_BASE = 'font-medium text-text-primary'

// Services whose icon is supplied artwork rather than a glyph drawn for this
// grid, mapped to the scale that squares them with their neighbours: the
// artwork carries its own padding inside its canvas where the glyphs run edge
// to edge, so at the shared size it sits noticeably smaller in the badge.
//
// Artwork also brings its own palette, which the badge gradient behind it can
// work against. Compensation, health & wellness and idea hub are recoloured to
// currentColor + INK inside ServiceIcons so they read as white on the badge;
// holiday calendar still carries its own cyan.
const artworkServices = {
  compensation: 1.4,
  'holiday-calendar': 1.35,
  'idea-hub': 1.35,
  'health-wellness': 1.4,
}

const ICON_SIZE = 26

const DEFAULT_TONE = 'blue'

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

export default function ServiceTile({ id, label, icon, redirectUrl, tone, step = 0 }) {
  const [isHolidayCalendarOpen, setHolidayCalendarOpen] = useState(false)
  const [isPoliciesOpen, setPoliciesOpen] = useState(false)
  const [isDocumentsOpen, setDocumentsOpen] = useState(false)
  const Icon = iconMap[icon] ?? iconMap.ExternalLink
  const artworkScale = artworkServices[id]
  const ramp = toneRamps[tone] ?? toneRamps[DEFAULT_TONE]
  // clamp rather than wrap: a sixth tile in a row should sit at the ramp's end,
  // not snap back to the darkest and break the run.
  const badge = ramp[Math.min(step, ramp.length - 1)]
  const glow = toneGlows[tone] ?? toneGlows[DEFAULT_TONE]
  const isClickable = redirectUrl && redirectUrl !== '#'
  const opensHolidayCalendar = id === 'holiday-calendar'
  const opensPolicies = id === 'policies'
  const opensDocuments = id === 'documents'

  const className =
    'group flex flex-col items-center justify-center gap-1.5 w-full py-1 px-1 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-ring'
  const content = (
    <>
      <span className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${badge} ${BADGE_BASE} ring-1 ring-inset transition-all duration-300 group-hover:scale-110 ${glow}`}>
        {/* convex gloss — the glossy app-icon highlight */}
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_85%_at_28%_12%,rgba(255,255,255,0.5),rgba(255,255,255,0)_55%)]" />
        {/* rim light + inner shadow — gives the tile a rounded, 3D body */}
        <span className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_-6px_10px_-5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.45)]" />
        {/* Pitstop speed-sweep — a racing shine that streaks across on hover */}
        <span className="pointer-events-none absolute inset-y-0 left-[-60%] w-2/3 skew-x-[-20deg] bg-white/30 blur-[2px] transition-all duration-500 ease-out group-hover:left-[140%]" />
        <Icon
          size={Math.round(ICON_SIZE * (artworkScale ?? 1))}
          strokeWidth={2}
          className="relative z-10 text-white drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.3)]"
        />
      </span>

      {/* min-height reserves both lines whether or not this label needs them,
          so a wrapping name does not push its row taller than its neighbours.
          Set in em, so it follows the step up at lg. */}
      <span
        className={`relative z-10 line-clamp-2 min-h-[2.5em] px-1 text-center text-[11px] uppercase leading-tight tracking-wide lg:text-xs ${LABEL_BASE}`}
      >
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
