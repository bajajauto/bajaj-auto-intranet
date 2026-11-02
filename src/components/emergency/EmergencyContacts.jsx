import { Phone } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import { emergencyContacts } from '@/config/contacts.config'

const TONES = {
  red: 'bg-[#FDE7E7] text-[#B91C1C] dark:bg-red-500/15 dark:text-red-300',
  green: 'bg-[#E1F3EA] text-accent-green dark:bg-emerald-400/15 dark:text-emerald-300',
  blue: 'bg-[#E4EDFA] text-brand-primary dark:bg-sky-400/15 dark:text-sky-300',
  amber: 'bg-[#FCEEDB] text-[#A0520A] dark:bg-amber-400/15 dark:text-amber-300',
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
 */
export default function EmergencyContacts() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
      {emergencyContacts.map((contact) => (
        <ContactCard key={contact.id} {...contact} />
      ))}
    </div>
  )
}
