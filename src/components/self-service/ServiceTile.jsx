import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import holidayCalendarImage from '@/assets/holiday calendar.jpg'

const MODAL_TRANSITION_MS = 500

const tileStyles = {
  // Navy — brand core
  'team-directory':   'from-[#1B5DB8] to-[#0E3368]',
  benefits:           'from-[#1A56A8] to-[#133E82]',
  'health-wellness':  'from-[#1665C0] to-[#0E3E88]',
  compensation:       'from-[#1248A2] to-[#0C2E6A]',
  mediclaim:          'from-[#1A56A8] to-[#133E82]',

  // Slate — admin / docs
  policies:           'from-[#3B4E6A] to-[#1C2D42]',
  documents:          'from-[#334460] to-[#192838]',
  'form-16':          'from-[#334460] to-[#192838]',

  // Teal — time / travel
  travel:             'from-[#0D7E98] to-[#09576C]',
  'leave-attendance': 'from-[#0A8FA8] to-[#076878]',
  'holiday-calendar': 'from-[#0D7E98] to-[#09576C]',

  // Amber — recognition / ideas / learning
  'recognition-gem':  'from-[#1A56A8] to-[#133E82]',
  'bolt-learning':    'from-[#B07008] to-[#6E4302]',
  'idea-hub':         'from-[#BF7C08] to-[#7A4D02]',

  // Teal — IT
  'it-summit':        'from-[#0D7E98] to-[#09576C]',
}

function HolidayCalendarModal({ onClose }) {
  const [visible, setVisible] = useState(false)

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
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, MODAL_TRANSITION_MS)
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 sm:p-6 ${
        visible ? 'bg-black/25' : 'pointer-events-none bg-transparent'
      }`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="holiday-calendar-title"
    >
      <div
        className={`relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 ease-out ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-gradient-to-br from-brand-primary to-brand-dark px-5 py-4 text-white sm:px-6">
          <h2 id="holiday-calendar-title" className="text-base font-semibold">
            Holiday Calendar
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:rotate-90 hover:bg-white/20 focus-ring"
            aria-label="Close Holiday Calendar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 justify-center overflow-auto bg-bg-alt p-3 sm:p-4">
          <img
            src={holidayCalendarImage}
            alt="Holiday Calendar"
            className="h-auto max-h-[calc(88vh-6rem)] w-auto max-w-full rounded-card object-contain shadow-card"
          />
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default function ServiceTile({ id, label, icon, redirectUrl }) {
  const [isHolidayCalendarOpen, setHolidayCalendarOpen] = useState(false)
  const Icon = iconMap[icon] ?? iconMap.ExternalLink
  const badge = tileStyles[id] ?? 'from-brand-primary to-brand-dark'
  const isClickable = redirectUrl && redirectUrl !== '#'
  const opensHolidayCalendar = id === 'holiday-calendar'

  const className =
    'group flex flex-col items-center justify-center gap-1.5 w-full py-1 px-1 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-ring'
  const content = (
    <>
      <span className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${badge} shadow-sm transition-transform duration-200 group-hover:scale-110`}>
        <Icon size={23} strokeWidth={1.65} className="text-white" />
      </span>

      <span className="relative z-10 line-clamp-2 px-1 text-center text-[9px] font-semibold uppercase leading-tight tracking-wide text-gray-500">
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
          <HolidayCalendarModal onClose={() => setHolidayCalendarOpen(false)} />
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
