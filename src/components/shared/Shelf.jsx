import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SHELF_GUTTER } from '@/lib/layout'

/*
 * A row that scrolls sideways and snaps card by card. It runs the full width
 * of the window, but pads itself so its first card lines up with the page
 * column above it, and the last one can scroll in to the same line.
 *
 * Touch and trackpad users swipe. A mouse has no sideways wheel, so from md up
 * a pair of arrows sits on the row's edges; each is disabled once the row
 * cannot go further that way, so it never looks like it did nothing.
 */
export default function Shelf({ label, children, gap = 'gap-5', className = '' }) {
  const rowRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  const measure = useCallback(() => {
    const row = rowRef.current
    if (!row) return
    setEdges({
      start: row.scrollLeft <= 2,
      end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 2,
    })
  }, [])

  useEffect(() => {
    const row = rowRef.current
    if (!row) return undefined
    measure()
    row.addEventListener('scroll', measure, { passive: true })
    const observer = new ResizeObserver(measure)
    observer.observe(row)
    return () => {
      row.removeEventListener('scroll', measure)
      observer.disconnect()
    }
  }, [measure])

  function page(direction) {
    const row = rowRef.current
    if (!row) return
    row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: 'smooth' })
  }

  const arrow =
    'pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink shadow-lifted transition-all hover:scale-105 focus-ring disabled:pointer-events-none disabled:opacity-0'

  return (
    <div className={`group/shelf relative ${className}`}>
      <div
        ref={rowRef}
        role="list"
        aria-label={label}
        className={`scrollbar-none flex snap-x snap-mandatory overflow-x-auto ${gap} ${SHELF_GUTTER}`}
      >
        {children}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-3 md:flex">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={edges.start}
          className={arrow}
          aria-label={`Scroll ${label} back`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={edges.end}
          className={arrow}
          aria-label={`Scroll ${label} forward`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
