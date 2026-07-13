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
      <div className="app-topbar-chrome fixed top-0 left-0 right-0 z-50 flex h-8 md:h-9 items-center gap-2 md:gap-3 px-2 sm:px-4">
        <nav
          className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto whitespace-nowrap [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
          aria-label="Policy links"
        >
          {links.map((link, i) => (
            <span key={link.label} className="flex items-center gap-4 sm:gap-6">
              <a
                href={link.href}
                className="rounded text-[10px] font-semibold text-brand-primary dark:text-[#a9bdd8] hover:underline focus-ring sm:text-xs"
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
          className="flex flex-shrink-0 items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-bold text-red-700 shadow-sm transition-colors hover:bg-red-100 focus-ring sm:text-xs"
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
