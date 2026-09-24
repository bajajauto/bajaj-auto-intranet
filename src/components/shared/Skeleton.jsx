/*
 * Placeholder block shown while a query is in flight.
 *
 * Sized by the caller so the skeleton occupies the same box the real content
 * will — a skeleton that is the wrong height causes a layout jump on load,
 * which is worse than no skeleton at all.
 *
 * `motion-safe` keeps the pulse off for anyone with reduced motion set.
 */
export default function Skeleton({ className = '', rounded = 'rounded' }) {
  return (
    <div
      className={`${rounded} bg-text-secondary/10 motion-safe:animate-pulse ${className}`}
      aria-hidden="true"
      data-skeleton="true"
    />
  )
}
