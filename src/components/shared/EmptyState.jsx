import { Inbox } from 'lucide-react'

/*
 * Shown when a query succeeds and returns nothing.
 *
 * Distinct from ErrorState on purpose: "there are no notices today" is good
 * news, and showing a failure message for it trains people to ignore failures.
 */
export default function EmptyState({ message = 'Nothing here yet', compact = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 text-center ${
        compact ? 'px-4 py-6' : 'px-6 py-10'
      }`}
    >
      <Inbox size={compact ? 18 : 22} className="text-text-secondary" aria-hidden="true" />
      <p className="text-xs text-text-secondary">{message}</p>
    </div>
  )
}
