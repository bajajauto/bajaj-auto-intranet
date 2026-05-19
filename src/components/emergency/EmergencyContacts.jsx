import { PhoneCall } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import { emergencyContacts } from '@/config/contacts.config'

const colorTokens = {
  'border-red-500':    { iconText: 'text-red-500',    iconBg: 'bg-red-50',    blob: 'bg-red-100',    ring: 'ring-red-200',    shadow: 'hover:shadow-red-100/60'    },
  'border-green-500':  { iconText: 'text-green-600',  iconBg: 'bg-green-50',  blob: 'bg-green-100',  ring: 'ring-green-200',  shadow: 'hover:shadow-green-100/60'  },
  'border-blue-500':   { iconText: 'text-blue-600',   iconBg: 'bg-blue-50',   blob: 'bg-blue-100',   ring: 'ring-blue-200',   shadow: 'hover:shadow-blue-100/60'   },
  'border-purple-500': { iconText: 'text-purple-600', iconBg: 'bg-purple-50', blob: 'bg-purple-100', ring: 'ring-purple-200', shadow: 'hover:shadow-purple-100/60' },
}

function ContactCard({ label, phone, icon, colorClass }) {
  const Icon = iconMap[icon] ?? iconMap.Phone
  const c = colorTokens[colorClass] ?? colorTokens['border-blue-500']

  return (
    <a
      href={`tel:${phone}`}
      aria-label={`Call ${label}: ${phone}`}
      className={`group relative overflow-hidden flex items-center gap-4 bg-white rounded-card shadow-card border border-gray-100 border-l-4 ${colorClass} p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${c.shadow}`}
    >
      {/* Decorative blob */}
      <span aria-hidden className={`absolute -top-4 -right-4 h-20 w-20 rounded-full ${c.blob} opacity-40 transition-transform duration-300 group-hover:scale-125`} />

      {/* Icon */}
      <div className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${c.iconBg} ring-1 ${c.ring} transition-transform duration-200 group-hover:scale-105`}>
        <Icon size={22} className={c.iconText} />
      </div>

      {/* Text */}
      <div className="relative z-10 min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-0.5">{label}</p>
        <p className={`text-base font-bold ${c.iconText} leading-tight`}>{phone}</p>
        <p className="mt-1 flex items-center gap-1 text-[10px] text-text-secondary">
          <PhoneCall size={10} />
          Tap to call
        </p>
      </div>
    </a>
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
