import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import Modal from '@/components/shared/Modal'
import EmergencyContacts from '@/components/emergency/EmergencyContacts'

export default function TopBanner() {
  const links = [
    { label: 'Integrity Matters – Ethics Helpline', href: '#' },
    { label: 'POSH Information', href: '#' },
    { label: 'Vision & Mission', href: '#' },
  ]

  const [sosOpen, setSosOpen] = useState(false)

  return (
    <div className="relative h-9 bg-brand-light border-b border-brand-primary/20 flex items-center justify-center px-4">
      <nav className="flex items-center gap-6" aria-label="Policy links">
        {links.map((link, i) => (
          <span key={link.label} className="flex items-center gap-6">
            <a
              href={link.href}
              className="text-xs text-brand-primary hover:underline focus-ring rounded"
            >
              {link.label}
            </a>
            {i < links.length - 1 && (
              <span className="text-brand-primary/40 text-xs select-none">|</span>
            )}
          </span>
        ))}
      </nav>

      <div className="absolute right-4 flex items-center">
        <button
          onClick={() => setSosOpen(true)}
          className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-card hover:bg-red-700 focus-ring"
          aria-label="SOS - Emergency contacts"
          title="SOS - Emergency contacts"
        >
          <AlertTriangle size={18} />
        </button>
      </div>

      <Modal
        isOpen={sosOpen}
        onClose={() => setSosOpen(false)}
        title="SOS - Emergency Contacts"
      >
        <EmergencyContacts />
      </Modal>
    </div>
  )
}
