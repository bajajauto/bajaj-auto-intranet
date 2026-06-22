import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import Modal from '@/components/shared/Modal'
import EmergencyContacts from '@/components/emergency/EmergencyContacts'

export default function TopBanner() {
  const [isSosOpen, setIsSosOpen] = useState(false)

  const links = [
    { label: 'About Us', href: '#' },
    { label: 'Vision & Mission', href: '#' },
    { label: 'Integrity Matters – Ethics Helpline', href: '#' },
    { label: 'POSH Information', href: '#' },
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-9 bg-brand-light dark:bg-[#111a2e] border-b border-brand-primary/20 dark:border-white/10 flex items-center justify-between px-4 overflow-x-auto">
        <nav className="flex items-center gap-6 whitespace-nowrap min-w-max" aria-label="Policy links">
          {links.map((link, i) => (
            <span key={link.label} className="flex items-center gap-6">
              <a
                href={link.href}
                className="text-xs text-brand-primary dark:text-blue-300 hover:underline focus-ring rounded"
              >
                {link.label}
              </a>
              {i < links.length - 1 && (
                <span className="text-brand-primary/40 dark:text-white/30 text-xs select-none">|</span>
              )}
            </span>
          ))}
        </nav>
        <button
          onClick={() => setIsSosOpen(true)}
          className="ml-auto flex-shrink-0 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs font-semibold flex items-center gap-1 focus-ring"
          aria-label="Open SOS emergency contacts"
        >
          <AlertTriangle size={14} />
          SOS
        </button>
      </div>

      <Modal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        maxWidth="max-w-3xl"
        title="Emergency SOS – Contacts & Help"
      >
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Access emergency contact information below. Call the relevant department in case of urgent assistance needed.
          </p>
          <EmergencyContacts />
        </div>
      </Modal>
    </>
  )
}
