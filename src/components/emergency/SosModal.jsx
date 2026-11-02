import { useEffect, useState } from 'react'
import Modal from '@/components/shared/Modal'
import { SOS_OPEN_EVENT } from '@/lib/sos'
import EmergencyContacts from './EmergencyContacts'

/*
 * The emergency sheet, mounted once in the shell and opened by openSos() from
 * the Helpline menu or the footer's Emergency button. In an emergency the
 * numbers come to you rather than you scrolling to them.
 */
export default function SosModal() {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const open = () => setOpen(true)
    window.addEventListener(SOS_OPEN_EVENT, open)
    return () => window.removeEventListener(SOS_OPEN_EVENT, open)
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      maxWidth="max-w-3xl"
      title="Emergency SOS – Contacts & Help"
    >
      <div className="space-y-4">
        <p className="text-sm text-text-secondary">
          Call the relevant department if you need urgent assistance.
        </p>
        <EmergencyContacts />
      </div>
    </Modal>
  )
}
