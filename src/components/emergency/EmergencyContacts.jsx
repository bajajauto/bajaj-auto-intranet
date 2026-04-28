import * as Icons from 'lucide-react'
import { emergencyContacts } from '@/config/contacts.config'

function ContactCard({ label, phone, icon, colorClass }) {
  const Icon = Icons[icon] ?? Icons.Phone

  return (
    <div className={`bg-white rounded-card shadow-card border border-gray-100 border-l-4 ${colorClass} p-4 flex items-center gap-4`}>
      <div className="w-10 h-10 rounded-full bg-bg-alt flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-text-secondary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary">{label}</p>
        <a
          href={`tel:${phone}`}
          className="text-sm text-brand-primary hover:underline focus-ring rounded"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {emergencyContacts.map((contact) => (
        <ContactCard key={contact.id} {...contact} />
      ))}
    </div>
  )
}
