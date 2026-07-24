import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import VehicleTurntable from './VehicleTurntable'

const MODAL_TRANSITION_MS = 300

export default function VehicleSpinModal({ vehicles, vehicle, onSelect, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.getElementById('root')?.classList.add('modal-open')
    setVisible(true)
    return () => {
      document.body.style.overflow = ''
      document.getElementById('root')?.classList.remove('modal-open')
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, MODAL_TRANSITION_MS)
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  })

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${vehicle.name} 360° viewer`}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors duration-300 ${
        visible ? 'bg-black/60' : 'bg-transparent pointer-events-none'
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`relative max-h-[92vh] w-full max-w-5xl overflow-y-auto overflow-x-hidden rounded-2xl bg-gradient-to-br from-[#0E4E87] via-brand-dark to-[#062A55] shadow-2xl transition-all duration-300 ease-out ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-7 sm:pt-6">
          <div>
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${vehicle.accent}`}
            >
              {vehicle.category}
            </p>
            <h2 className="mt-0.5 text-xl font-bold leading-tight text-white sm:text-2xl">
              {vehicle.name}
            </h2>
            <p className="text-xs font-medium text-white/55">{vehicle.tagline}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close 360° viewer"
            className="flex-shrink-0 rounded-lg p-2 text-white/70 transition-all duration-300 hover:rotate-90 hover:bg-white/15 hover:text-white focus-ring"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-4 px-5 py-5 sm:px-7 sm:py-6 md:grid-cols-[1.6fr_1fr] md:gap-7">
          <VehicleTurntable key={vehicle.id} vehicle={vehicle} />

          <dl className="self-center divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.04] px-4 backdrop-blur-sm">
            {vehicle.specs.map((spec) => (
              <div key={spec.label} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-[11px] font-medium uppercase tracking-wide text-white/45">
                  {spec.label}
                </dt>
                <dd className="text-right text-xs font-semibold text-white">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Range switcher — browsing the line-up shouldn't mean closing and
            hunting for the next vehicle in the banner. Pinned to the bottom of
            the panel so a short viewport can never bury it. */}
        <div className="sticky bottom-0 flex gap-2 overflow-x-auto border-t border-white/10 bg-brand-dark/85 px-5 py-3 backdrop-blur-md scrollbar-none sm:px-7">
          {vehicles.map((option) => {
            const isActive = option.id === vehicle.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option)}
                aria-current={isActive ? 'true' : undefined}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors duration-200 focus-ring ${
                  isActive
                    ? 'border-white/70 bg-white/15 text-white'
                    : 'border-white/15 text-white/55 hover:border-white/35 hover:text-white/85'
                }`}
              >
                {option.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>,
    document.body
  )
}
