import { useMemo, useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Headphones } from 'lucide-react'
import { useBajajBytesVolumes } from '@/hooks/useBajajBytesVolumes'
import { usePodcastEpisodes } from '@/hooks/usePodcastEpisodes'

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

export default function NewslettersCarousel({ onListenToVolume }) {
  const volumes = useBajajBytesVolumes()
  const episodes = usePodcastEpisodes()
  const carouselRef = useRef(null)
  const hasCarouselControls = volumes.length > 1

  const volumesWithPodcast = useMemo(
    () => new Set(episodes.map((ep) => ep.sourceVolumeId)),
    [episodes],
  )

  function scrollByPage(direction) {
    const scrollAmount = carouselRef.current?.clientWidth ?? 720
    carouselRef.current?.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    })
  }

  function handleListenClick(event, volumeId) {
    if (!onListenToVolume) return
    event.preventDefault()
    event.stopPropagation()
    onListenToVolume(volumeId)
  }

  return (
    <div className="relative">
      {hasCarouselControls && (
        <>
          <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 z-10 w-16 surface-fade-l" />
          <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 z-10 w-16 surface-fade-r" />
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
        className="scrollbar-none grid auto-cols-[minmax(17rem,1fr)] grid-flow-col gap-6 overflow-x-auto px-5 py-6 snap-x snap-mandatory scroll-smooth sm:px-14 lg:auto-cols-[calc((100%-3rem)/3)]"
        aria-label="Bajaj Bytes newsletters carousel"
      >
        {volumes.map((volume) => {
          const hasPodcast = volumesWithPodcast.has(volume.id)
          return (
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
                {hasPodcast && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-brand-primary shadow-card">
                    <Headphones size={11} />
                    Podcast
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 p-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary">{volume.label}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">{volume.month}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-primary">
                    Read
                    <ArrowRight size={13} />
                  </span>
                </div>
                {hasPodcast && (
                  <button
                    type="button"
                    onClick={(e) => handleListenClick(e, volume.id)}
                    className="inline-flex flex-shrink-0 items-center gap-1 rounded-full border border-brand-primary/30 bg-brand-light px-2.5 py-1 text-[11px] font-semibold text-brand-primary transition-all hover:bg-brand-primary hover:text-white focus-ring"
                    aria-label={`Listen to ${volume.label} podcast`}
                  >
                    <Headphones size={12} />
                    Listen
                  </button>
                )}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
