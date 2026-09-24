import { RefreshCw, WifiOff } from 'lucide-react'

/*
 * Shown when a query fails.
 *
 * Says what did not load and offers the one action that can help, rather than
 * an apology or a stack trace. The panel keeps its frame so a failure in one
 * card never collapses the page around it.
 */
export default function ErrorState({ label = 'this section', onRetry, compact = false }) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center gap-2 text-center ${
        compact ? 'px-4 py-6' : 'px-6 py-10'
      }`}
    >
      <WifiOff size={compact ? 18 : 22} className="text-text-secondary" aria-hidden="true" />
      <p className="text-sm font-medium text-text-primary">Couldn&apos;t load {label}</p>
      <p className="max-w-xs text-xs text-text-secondary">
        The connection dropped or the service is busy. Everything else on the page still works.
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-1.5 rounded-btn border border-brand-primary/30 bg-brand-light px-3 py-1.5 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white focus-ring"
        >
          <RefreshCw size={13} aria-hidden="true" />
          Try again
        </button>
      )}
    </div>
  )
}
