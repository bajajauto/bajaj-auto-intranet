import { Phone } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import { emergencyContacts } from '@/config/contacts.config'

const TONES = {
  red: 'bg-[#FDE7E7] text-[#B91C1C] dark:bg-red-500/15 dark:text-red-300',
  green: 'bg-[#E1F3EA] text-accent-green dark:bg-emerald-400/15 dark:text-emerald-300',
  blue: 'bg-[#E4EDFA] text-brand-primary dark:bg-sky-400/15 dark:text-sky-300',
  amber: 'bg-[#FCEEDB] text-[#A0520A] dark:bg-amber-400/15 dark:text-amber-300',
}

// The bare variant drops the tile, so the icon carries the tone on its own.
const ICON_TONES = {
  red: 'text-[#DC2626] dark:text-red-300',
  green: 'text-accent-green dark:text-emerald-300',
  blue: 'text-brand-primary dark:text-sky-300',
  amber: 'text-[#D97706] dark:text-amber-300',
}

// Same lent depth as the Workplace icons: an extruded edge, lift, and an oval
// on the floor, with the Pitstop's overshoot hop on hover.
const DEPTH =
  '[filter:drop-shadow(0_1px_0_rgba(15,23,42,0.22))_drop-shadow(0_2px_0_rgba(15,23,42,0.12))_drop-shadow(0_8px_8px_rgba(15,23,42,0.18))]'
const SPRING = 'ease-[cubic-bezier(.34,1.56,.64,1)]'

function BareContact({ label, phone, icon, tone }) {
  const Icon = iconMap[icon] ?? iconMap.Phone

  return (
    <div className="group flex flex-col items-center gap-3 p-2 text-center">
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span
          aria-hidden
          className={`absolute -bottom-1 left-1/2 h-2.5 w-11 -translate-x-1/2 rounded-[50%] bg-slate-900/15 blur-[3px] transition-all duration-500 group-hover:w-9 group-hover:bg-slate-900/10 dark:bg-black/50 ${SPRING}`}
        />
        <span
          className={`relative transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:-rotate-6 group-hover:scale-110 ${DEPTH} ${SPRING} ${
            ICON_TONES[tone] ?? ICON_TONES.blue
          }`}
        >
          <Icon size={44} strokeWidth={1.9} />
        </span>
      </span>
      <div>
        <p className="text-sm font-semibold leading-tight text-ink">{label}</p>
        <p className="mt-1 text-xs text-muted">{phone}</p>
      </div>
      <a
        href={`tel:${phone}`}
        aria-label={`Call ${label}: ${phone}`}
        className="inline-flex h-8 items-center gap-1.5 rounded-full bg-chip px-3.5 text-xs font-semibold text-ink transition-colors hover:bg-brand-primary hover:text-white focus-ring"
      >
        <Phone size={14} strokeWidth={1.8} />
        Call
      </a>
    </div>
  )
}

function ContactCard({ label, phone, icon, tone }) {
  const Icon = iconMap[icon] ?? iconMap.Phone

  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-surface p-7 shadow-soft">
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${TONES[tone] ?? TONES.blue}`}
      >
        <Icon size={24} strokeWidth={1.7} />
      </span>
      <div>
        <p className="text-lg font-semibold text-ink">{label}</p>
        <p className="mt-1 text-[15px] text-muted">{phone}</p>
      </div>
      <a
        href={`tel:${phone}`}
        aria-label={`Call ${label}: ${phone}`}
        className="inline-flex h-11 items-center gap-2 self-start rounded-full bg-chip px-[18px] text-sm font-semibold text-ink transition-colors hover:bg-brand-primary hover:text-white focus-ring"
      >
        <Phone size={16} strokeWidth={1.8} />
        Call
      </a>
    </div>
  )
}

/*
 * The four numbers to call when something is wrong. Rendered both in the Help
 * section and inside the SOS modal, so it carries no heading of its own.
 * `bare` (the Help section) shows icons without cards; the modal keeps cards.
 */
export default function EmergencyContacts({ bare = false }) {
  const Card = bare ? BareContact : ContactCard
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
      {emergencyContacts.map((contact) => (
        <Card key={contact.id} {...contact} />
      ))}
    </div>
  )
}
