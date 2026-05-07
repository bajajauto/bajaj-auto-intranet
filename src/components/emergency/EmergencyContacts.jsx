import { iconMap } from '@/components/shared/iconMap'
import { emergencyContacts } from '@/config/contacts.config'

function ContactCard({ label, phone, icon, colorClass }) {
  const Icon = iconMap[icon] ?? iconMap.Phone

  return (
    <div className={`bg-white rounded-card shadow-card border border-gray-100 border-l-4 ${colorClass} p-4 flex min-w-0 items-center gap-3 transition-all duration-200 hover:shadow-modal hover:-translate-y-1 cursor-pointer min-h-[100px]`}>
      <div className="w-10 h-10 rounded-full bg-bg-alt flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-text-secondary" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-snug text-text-primary">{label}</p>
        <a
          href={`tel:${phone}`}
          className="mt-1 block break-words text-sm leading-snug text-brand-primary hover:underline focus-ring rounded"
          aria-label={`Call ${label}: ${phone}`}
        >
          {phone}
        </a>
      </div>
    </div>
  )
}

export default function EmergencyContacts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {emergencyContacts.map((contact) => (
        <ContactCard key={contact.id} {...contact} />
      ))}
    </div>
  )
}
