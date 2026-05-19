import { PhoneCall } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import { emergencyContacts } from '@/config/contacts.config'

function ContactCard({ label, phone, icon }) {
  const Icon = iconMap[icon] ?? iconMap.Phone

  return (
    <a
      href={`tel:${phone}`}
      aria-label={`Call ${label}: ${phone}`}
      className="group flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-4 transition-colors duration-150 hover:border-brand-primary hover:bg-brand-light/40"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand-primary">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary mb-0.5">{label}</p>
        <p className="text-base font-bold text-brand-primary leading-none">{phone}</p>
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
