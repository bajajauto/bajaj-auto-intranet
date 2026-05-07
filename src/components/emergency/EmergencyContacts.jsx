import { iconMap } from '@/components/shared/iconMap'
import { emergencyContacts } from '@/config/contacts.config'

function ContactCard({ label, phone, icon, colorClass }) {
  const Icon = iconMap[icon] ?? iconMap.Phone

  return (
    <div className={`bg-white rounded-card shadow-card border border-gray-100 border-l-4 ${colorClass} p-4 flex flex-col justify-center gap-2 transition-all duration-200 hover:shadow-modal hover:-translate-y-1 cursor-pointer min-h-[100px]`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-bg-alt flex items-center justify-center flex-shrink-0">
          <Icon size={20} className="text-text-secondary" />
        </div>
        <p className="text-sm font-semibold text-text-primary">{label}</p>
      </div>
      <a
        href={`tel:${phone}`}
        className="text-sm text-brand-primary hover:underline focus-ring rounded pl-13"
        aria-label={`Call ${label}: ${phone}`}
      >
        {phone}
      </a>
    </div>
  )
}

export default function EmergencyContacts() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
      {emergencyContacts.map((contact) => (
        <ContactCard key={contact.id} {...contact} />
      ))}
    </div>
  )
}
