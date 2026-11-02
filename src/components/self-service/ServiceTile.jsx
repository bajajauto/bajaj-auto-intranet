import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import holidayCalendarImage from '@/assets/holiday calendar.jpg'
import teamDirectoryArt from '@/assets/icons/ocean/team-directory.webp'
import leaveAttendanceArt from '@/assets/icons/ocean/leave-attendance.webp'
import holidayCalendarArt from '@/assets/icons/ocean/holiday-calendar.webp'
import travelArt from '@/assets/icons/ocean/travel.webp'
import policiesArt from '@/assets/icons/ocean/policies.webp'
import compensationArt from '@/assets/icons/ocean/compensation.webp'
import benefitsArt from '@/assets/icons/ocean/benefits.webp'
import documentsArt from '@/assets/icons/ocean/documents.webp'
import mediclaimArt from '@/assets/icons/ocean/mediclaim.webp'
import healthWellnessArt from '@/assets/icons/ocean/health-wellness.webp'
import gemArt from '@/assets/icons/pitstop/gem.png'
import ideaHubArt from '@/assets/icons/pitstop/idea-hub.png'
import boltArt from '@/assets/icons/pitstop/bolt.png'
import performanceArt from '@/assets/icons/pitstop/performance.png'
import itSummitArt from '@/assets/icons/pitstop/it-summit.png'
import Modal from '@/components/shared/Modal'
import PoliciesBenefitsModal from './PoliciesBenefitsModal'
import LettersModal from './letters/LettersModal'

const MODAL_TRANSITION_MS = 500

// The 3D artwork each service stands on. A service missing from here falls
// back to its line icon from iconMap, so adding a service never breaks the row.
const ARTWORK = {
  'team-directory': teamDirectoryArt,
  'leave-attendance': leaveAttendanceArt,
  'holiday-calendar': holidayCalendarArt,
  travel: travelArt,
  policies: policiesArt,
  compensation: compensationArt,
  benefits: benefitsArt,
  documents: documentsArt,
  mediclaim: mediclaimArt,
  'health-wellness': healthWellnessArt,
  'recognition-gem': gemArt,
  'idea-hub': ideaHubArt,
  'bolt-learning': boltArt,
  'performance-management': performanceArt,
  'it-summit': itSummitArt,
}

// The overshoot easing gives the hover its hop: the artwork lifts and grows.
const SPRING = 'ease-[cubic-bezier(.34,1.56,.64,1)]'

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
        className={`relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-surface shadow-2xl transition-all duration-500 ease-out ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-navy px-5 py-4 text-white sm:px-6">
          <h2 id={titleId} className="font-display text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 transition-all duration-300 hover:rotate-90 hover:bg-white/15 focus-ring"
            aria-label={`Close ${title}`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 justify-center overflow-auto bg-canvas p-3 sm:p-4">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

function TileArt({ id, icon }) {
  const art = ARTWORK[id]
  const Icon = iconMap[icon] ?? iconMap.ExternalLink

  return (
    <span className="flex h-[48px] w-full items-end justify-center" aria-hidden="true">
      {art ? (
        <img
          src={art}
          alt=""
          className={`max-h-[48px] max-w-[64px] origin-[50%_90%] object-contain transition-[transform,filter] duration-[350ms] ${SPRING} group-hover:-translate-y-1.5 group-hover:scale-[1.08] group-hover:drop-shadow-[0_12px_9px_rgba(15,50,80,0.28)] group-focus-visible:-translate-y-1.5`}
        />
      ) : (
        <Icon
          size={36}
          strokeWidth={1.6}
          className={`text-ocean-700 transition-transform duration-[350ms] ${SPRING} group-hover:-translate-y-1.5`}
        />
      )}
    </span>
  )
}

// A service made of several applications: the tile opens a short list of them.
function AppChooser({ label, apps, content, className }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-haspopup="dialog">
        {content}
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={label}>
        <ul className="space-y-2">
          {apps.map((app) => (
            <li key={app.id}>
              <a
                href={app.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-ocean-line bg-ocean-50 px-4 py-3 transition-colors hover:bg-ocean-100 focus-ring"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-ocean-ink">{app.label}</span>
                  <span className="block text-[12px] text-ocean-sub">{app.description}</span>
                </span>
                <ArrowUpRight size={18} className="flex-none text-ocean-700" />
              </a>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  )
}

export default function ServiceTile({ id, label, icon, redirectUrl, apps }) {
  const [isHolidayCalendarOpen, setHolidayCalendarOpen] = useState(false)
  const [isPoliciesOpen, setPoliciesOpen] = useState(false)
  const [isDocumentsOpen, setDocumentsOpen] = useState(false)
  const isClickable = redirectUrl && redirectUrl !== '#'

  const className =
    'group flex w-full flex-col items-center gap-1 rounded-2xl px-1 pb-1 pt-1.5 text-center text-ocean-ink focus-ring'
  const content = (
    <>
      <TileArt id={id} icon={icon} />
      <span className="text-[12.5px] font-semibold leading-tight">{label}</span>
    </>
  )

  if (apps?.length) {
    return <AppChooser label={label} apps={apps} content={content} className={className} />
  }

  if (isClickable) {
    return (
      <a href={redirectUrl} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    )
  }

  if (id === 'holiday-calendar') {
    return (
      <>
        <button type="button" onClick={() => setHolidayCalendarOpen(true)} className={className}>
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
              className="h-auto max-h-[calc(88vh-6rem)] w-auto max-w-full rounded-2xl object-contain shadow-soft"
            />
          </ServiceDocumentModal>
        )}
      </>
    )
  }

  if (id === 'policies') {
    return (
      <>
        <button type="button" onClick={() => setPoliciesOpen(true)} className={className}>
          {content}
        </button>

        {isPoliciesOpen && <PoliciesBenefitsModal onClose={() => setPoliciesOpen(false)} />}
      </>
    )
  }

  if (id === 'documents') {
    return (
      <>
        <button type="button" onClick={() => setDocumentsOpen(true)} className={className}>
          {content}
        </button>

        {isDocumentsOpen && <LettersModal onClose={() => setDocumentsOpen(false)} />}
      </>
    )
  }

  // No destination yet (Team Directory, IT Summit). Disabled and
  // labelled as such, rather than a button that silently does nothing.
  return (
    <button
      type="button"
      disabled
      title="Coming soon"
      aria-label={`${label} (coming soon)`}
      className={`${className} cursor-default`}
    >
      {content}
    </button>
  )
}
