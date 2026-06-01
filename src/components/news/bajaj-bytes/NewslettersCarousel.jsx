import { useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const VOLUMES = [
  {
    id: 'vol-7',
    label: 'Volume 7',
    month: 'May 2026',
    href: 'https://ting-brochures.netlify.app/bajaj-bytes-vol7-brochure',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 30%, #ec4899 62%, #4c1d95 100%)',
    accent: 'rgba(244, 114, 182, 0.28)',
  },
  {
    id: 'vol-6',
    label: 'Volume 6',
    month: 'April 2026',
    href: 'https://ting-brochures.netlify.app/bajaj-bytes-vol6-brochure',
    gradient: 'linear-gradient(135deg, #0f766e 0%, #115e59 48%, #0f172a 100%)',
    accent: 'rgba(245, 158, 11, 0.28)',
  },
  {
    id: 'vol-5',
    label: 'Volume 5',
    month: 'March 2026',
    href: 'https://ting-brochures.netlify.app/bajaj-bytes-vol6-brochure',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #1f0b37 100%)',
    accent: 'rgba(251, 113, 133, 0.28)',
  },
]

function CoverArt({ volume }) {
  return (
    <span className="absolute inset-0" style={{ background: volume.gradient }}>
      <span className="absolute -left-10 top-5 h-36 w-36 rounded-full border border-white/15 transition-transform duration-500 group-hover:scale-110" />
      <span
        className="absolute right-6 top-10 h-16 w-16 rounded-full transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
        style={{ backgroundColor: volume.accent }}
      />
      <span className="absolute bottom-0 right-4 h-32 w-32 rotate-45 rounded-[24px] bg-white/10 transition-transform duration-500 group-hover:rotate-[50deg]" />
    </span>
  )
}

export default function NewslettersCarousel() {
  const carouselRef = useRef(null)
  const hasCarouselControls = VOLUMES.length > 1

  function scrollByPage(direction) {
    const scrollAmount = carouselRef.current?.clientWidth ?? 720
    carouselRef.current?.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      {hasCarouselControls && (
        <>
          <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent" />
          <div className="hidden sm:flex pointer-events-none absolute inset-y-0 left-0 right-0 z-20 items-center justify-between px-2">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              className="pointer-events-auto p-2 rounded-full bg-white/90 border border-gray-200 text-text-secondary shadow-card hover:text-brand-primary hover:border-brand-primary/30 hover:bg-brand-light focus-ring transition-all"
              aria-label="Previous Bajaj Bytes"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              className="pointer-events-auto p-2 rounded-full bg-white/90 border border-gray-200 text-text-secondary shadow-card hover:text-brand-primary hover:border-brand-primary/30 hover:bg-brand-light focus-ring transition-all"
              aria-label="Next Bajaj Bytes"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </>
      )}

      <div
        ref={carouselRef}
        className="grid auto-cols-[minmax(17rem,1fr)] grid-flow-col gap-6 overflow-x-auto px-5 py-6 snap-x snap-mandatory scroll-smooth sm:px-14 lg:auto-cols-[calc((100%-3rem)/3)]"
        aria-label="Bajaj Bytes newsletters carousel"
      >
        {VOLUMES.map((volume) => (
          <a
            key={volume.id}
            href={volume.href}
            target="_blank"
            rel="noreferrer"
            className="site-surface-interactive group overflow-hidden rounded-card border text-left transition-all hover:-translate-y-1 hover:shadow-card focus-ring snap-start"
          >
            <div className="relative h-28 min-h-28 overflow-hidden bg-brand-light">
              <CoverArt volume={volume} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-bold leading-none">Bajaj Bytes</p>
                <p className="mt-1 text-[10px] font-semibold text-white/80">
                  {volume.label.replace('Volume ', 'Vol. ')}
                </p>
              </div>
            </div>

            <div className="p-3">
              <p className="text-sm font-semibold text-text-primary">{volume.label}</p>
              <p className="mt-0.5 text-xs text-text-secondary">{volume.month}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-primary">
                Read
                <ArrowRight size={13} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
