import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import holidayCalendarImage from '@/assets/holiday calendar.jpg'
import teamDirectoryArt from '@/assets/icons/pitstop/team-directory.png'
import leaveAttendanceArt from '@/assets/icons/pitstop/leave-attendance.png'
import holidayCalendarArt from '@/assets/icons/pitstop/holiday-calendar.png'
import travelArt from '@/assets/icons/pitstop/travel.png'
import policiesArt from '@/assets/icons/pitstop/policies.png'
import compensationArt from '@/assets/icons/pitstop/compensation.png'
import benefitsArt from '@/assets/icons/pitstop/benefits.png'
import documentsArt from '@/assets/icons/pitstop/documents-forms.png'
import mediclaimArt from '@/assets/icons/pitstop/mediclaim-card.png'
import healthWellnessArt from '@/assets/icons/pitstop/health-wellness.png'
import gemArt from '@/assets/icons/pitstop/gem.png'
import ideaHubArt from '@/assets/icons/pitstop/idea-hub.png'
import boltArt from '@/assets/icons/pitstop/bolt.png'
import performanceArt from '@/assets/icons/pitstop/performance.png'
import itSummitArt from '@/assets/icons/pitstop/it-summit.png'
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

/*
 * One tone per errand group, assigned in ServiceGrid. Each tone is a pastel
 * pedestal the artwork stands on, a glow of the same hue beneath it, and three
 * paint-splash dots around it: a large one in the pedestal's tint, a small one
 * in a complementary colour, a tiny one in the tone's strong shade.
 *
 * Written out in full because Tailwind only generates class strings that exist
 * literally in the source.
 */
const TONES = {
  blue: {
    splashLarge: 'bg-[#C9DDFB]',
    splashSmall: 'bg-[#F7A35C]',
    splashTiny: 'bg-[#5B9BF5]',
    base: 'from-[#F1F6FE] to-[#D7E6FA] shadow-[inset_0_2px_0_rgba(255,255,255,0.95),inset_0_-4px_8px_rgba(11,79,168,0.10),0_12px_18px_-10px_rgba(11,79,168,0.45)]',
  },
  green: {
    splashLarge: 'bg-[#BDEBD5]',
    splashSmall: 'bg-[#F5C542]',
    splashTiny: 'bg-[#34C189]',
    base: 'from-[#F0FAF5] to-[#D3EFE1] shadow-[inset_0_2px_0_rgba(255,255,255,0.95),inset_0_-4px_8px_rgba(11,110,68,0.10),0_12px_18px_-10px_rgba(11,110,68,0.45)]',
  },
  amber: {
    splashLarge: 'bg-[#FCDDB0]',
    splashSmall: 'bg-[#5B9BF5]',
    splashTiny: 'bg-[#F29A1F]',
    base: 'from-[#FFF7EC] to-[#FBE2C2] shadow-[inset_0_2px_0_rgba(255,255,255,0.95),inset_0_-4px_8px_rgba(196,98,10,0.10),0_12px_18px_-10px_rgba(196,98,10,0.45)]',
  },
}

const DEFAULT_TONE = 'blue'

// The overshoot easing gives the hover its bounce: the artwork hops up, tilts
// and grows, the pedestal widens under it, and the splashes swell.
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

function TileArt({ id, icon, tone }) {
  const palette = TONES[tone] ?? TONES[DEFAULT_TONE]
  const art = ARTWORK[id]
  const Icon = iconMap[icon] ?? iconMap.ExternalLink

  return (
    <span className="relative block h-[88px] w-[100px]" aria-hidden="true">
      <span
        className={`absolute right-0 top-0.5 h-[22px] w-[22px] rounded-full transition-transform duration-[450ms] ${SPRING} group-hover:scale-125 ${palette.splashLarge}`}
      />
      <span
        className={`absolute bottom-1.5 left-0 h-2.5 w-2.5 rounded-full transition-transform duration-[450ms] ${SPRING} group-hover:scale-125 ${palette.splashSmall}`}
      />
      <span
        className={`absolute left-1 top-[22px] h-1.5 w-1.5 rounded-full transition-transform duration-[450ms] ${SPRING} group-hover:scale-125 ${palette.splashTiny}`}
      />
      <span
        className={`absolute inset-x-3.5 bottom-0 h-14 rounded-[22px] bg-gradient-to-b transition-transform duration-500 ${SPRING} group-hover:scale-x-[1.06] ${palette.base}`}
      />
      {art ? (
        <img
          src={art}
          alt=""
          className={`absolute -top-3.5 left-2.5 h-20 w-20 object-contain drop-shadow-[0_10px_10px_rgba(15,22,32,0.18)] transition-[transform,filter] duration-500 ${SPRING} group-hover:-translate-y-2 group-hover:-rotate-[5deg] group-hover:scale-110 group-hover:drop-shadow-[0_16px_14px_rgba(15,22,32,0.22)]`}
        />
      ) : (
        <Icon
          size={40}
          strokeWidth={1.8}
          className={`absolute left-[30px] top-3 text-brand-primary transition-transform duration-500 ${SPRING} group-hover:-translate-y-2 group-hover:scale-110`}
        />
      )}
    </span>
  )
}

export default function ServiceTile({ id, label, icon, redirectUrl, tone }) {
  const [isHolidayCalendarOpen, setHolidayCalendarOpen] = useState(false)
  const [isPoliciesOpen, setPoliciesOpen] = useState(false)
  const [isDocumentsOpen, setDocumentsOpen] = useState(false)
  const isClickable = redirectUrl && redirectUrl !== '#'

  const className =
    'group flex w-[120px] flex-col items-center gap-3.5 rounded-2xl px-1 pb-2 pt-7 text-center text-ink focus-ring'
  const content = (
    <>
      <TileArt id={id} icon={icon} tone={tone} />
      <span className="text-sm font-semibold leading-tight">{label}</span>
    </>
  )

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

  // No destination yet (Team Directory, Performance, IT Summit). Disabled and
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
