import { PhoneCall } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import { emergencyContacts } from '@/config/contacts.config'

function ContactCard({ label, phone, icon, colorClass }) {
  const Icon = iconMap[icon] ?? iconMap.Phone

  return (
    <a
      href={`tel:${phone}`}
      aria-label={`Call ${label}: ${phone}`}
      className={`site-surface-interactive group flex min-h-[76px] min-w-0 items-center gap-3 rounded-card border border-l-4 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/50 hover:bg-[#C8DDF5] hover:shadow-modal ${colorClass}`}
    >
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-bg-alt transition-colors duration-200 group-hover:bg-white">
        <Icon size={18} className="text-text-secondary transition-colors duration-200 group-hover:text-brand-primary" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold leading-snug text-text-primary transition-colors duration-200 group-hover:text-brand-dark">{label}</p>
        <p className="mt-0.5 break-words text-xs leading-snug text-brand-primary">{phone}</p>
      </div>

      <PhoneCall
        size={16}
        className="flex-shrink-0 text-brand-primary opacity-30 transition-opacity duration-150 group-hover:opacity-70"
      />
    </a>
  )
}

export default function EmergencyContacts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {emergencyContacts.map((contact) => (
        <ContactCard key={contact.id} {...contact} />
      ))}
    </div>
  )
}
