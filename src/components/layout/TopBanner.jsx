import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import Modal from '@/components/shared/Modal'
import EmergencyContacts from '@/components/emergency/EmergencyContacts'
import { helpLinks } from '@/config/contacts.config'
import { CONTAINER } from '@/lib/layout'
import { scrollToSection } from '@/utils/scrollToSection'

// A `sectionId` marks a link that jumps down the page rather than out to a
// destination of its own — the anchor stays real so the hash is copyable, and
// the handler only adds the smooth scroll and the header offset. Vision &
// Mission and Code of Conduct have no destination yet, so they stay placeholders.
const LINKS = [
  { label: 'About Us', sectionId: 'locations' },
  { label: 'Vision & Mission', href: '#' },
  // The Help section no longer carries these, so they go straight to their pages.
  {
    label: 'Integrity Matters – Ethics Helpline',
    href: helpLinks.find((l) => l.id === 'ethics')?.href ?? '#',
  },
  { label: 'POSH Information', href: helpLinks.find((l) => l.id === 'posh')?.href ?? '#' },
  { label: 'Code of Conduct', href: '#' },
]

/*
 * The navy strip above the header. It and the header both stay pinned to the
 * top, the header sticking at top-10 just beneath this strip's 40px. SOS stays a modal rather than a jump: in an emergency the numbers
 * should come to you, not the other way round.
 */
export default function TopBanner() {
  const [isSosOpen, setIsSosOpen] = useState(false)

  return (
    <>
      <div className="sticky top-0 z-50 bg-navy text-[13px] text-[#C9D1DC]">
        <div className={`${CONTAINER} flex h-10 items-center justify-between gap-4`}>
          <nav
            aria-label="Company"
            className="scrollbar-none flex min-w-0 items-center gap-6 overflow-x-auto whitespace-nowrap md:gap-7"
          >
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.sectionId ? `#${link.sectionId}` : link.href}
                onClick={
                  link.sectionId
                    ? (e) => {
                        e.preventDefault()
                        scrollToSection(link.sectionId)
                      }
                    : undefined
                }
                className="rounded transition-colors hover:text-white focus-ring"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsSosOpen(true)}
            className="ml-auto inline-flex h-7 flex-shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-3.5 text-xs font-bold tracking-[0.06em] text-white transition-colors hover:bg-red-700 focus-ring"
            aria-label="Open SOS emergency contacts"
          >
            <AlertTriangle size={14} strokeWidth={2.2} />
            SOS
          </button>
        </div>
      </div>

      <Modal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        maxWidth="max-w-3xl"
        title="Emergency SOS – Contacts & Help"
      >
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Access emergency contact information below. Call the relevant department in case of
            urgent assistance needed.
          </p>
          <EmergencyContacts />
        </div>
      </Modal>
    </>
  )
}
