import { useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react'
import { useYoutubeVideos } from '@/hooks/useYoutubeVideos'
import VideoCard from './VideoCard'
import VideoLightboxModal from './VideoLightboxModal'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'md-meetings', label: 'Events' },
  { id: 'interviews', label: 'Interviews' },
  { id: 'stories', label: 'Stories' },
]

export default function YouTubeSection() {
  const videos = useYoutubeVideos()
  const [activeCategory, setActiveCategory] = useState('all')
  const [playingVideo, setPlayingVideo] = useState(null)
  const carouselRef = useRef(null)

  const visibleVideos = useMemo(() => {
    if (activeCategory === 'all') return videos
    return videos.filter((v) => v.category === activeCategory)
  }, [videos, activeCategory])

  function scrollByPage(direction) {
    const scrollAmount = carouselRef.current?.clientWidth ?? 720
    carouselRef.current?.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    })
  }

  function handleVideoPlay(video) {
    if (video.externalUrl) {
      window.open(video.externalUrl, '_blank', 'noopener,noreferrer')
      return
    }
    setPlayingVideo(video)
  }

  if (videos.length === 0) {
    return (
      <div className="px-5 py-10 sm:px-14">
        <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-gray-200 bg-bg-alt px-6 py-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-primary">
            <PlayCircle size={22} />
          </span>
          <p className="mt-4 text-sm font-semibold text-text-primary">Watch library coming soon</p>
          <p className="mt-1 max-w-sm text-xs text-text-secondary">
            MD meetings, leadership interviews and Bajaj Auto stories will land here.
          </p>
        </div>
      </div>
    )
  }

  const hasCarouselControls = visibleVideos.length > 1

  return (
    <div className="space-y-5 py-6">
      <div
        role="tablist"
        aria-label="Video category"
        className="flex flex-wrap gap-2 px-5 sm:px-14"
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory
          return (
            <button
              key={cat.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat.id)}
              className={
                'rounded-full border px-3 py-1 text-xs font-semibold transition-all focus-ring ' +
                (isActive
                  ? 'border-brand-primary bg-brand-primary text-white'
                  : 'border-gray-200 bg-white text-text-secondary hover:border-brand-primary/40 hover:text-brand-primary')
              }
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {visibleVideos.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-text-secondary sm:px-14">
          No videos in this category yet.
        </p>
      ) : (
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
                  aria-label="Previous videos"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByPage(1)}
                  className="pointer-events-auto p-2 rounded-full bg-white/90 border border-gray-200 text-text-secondary shadow-card hover:text-brand-primary hover:border-brand-primary/30 hover:bg-brand-light focus-ring transition-all"
                  aria-label="Next videos"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </>
          )}

          <div
            ref={carouselRef}
            className="scrollbar-none grid auto-cols-[minmax(18rem,1fr)] grid-flow-col gap-6 overflow-x-auto px-5 pb-2 snap-x snap-mandatory scroll-smooth sm:px-14 lg:auto-cols-[calc((100%-3rem)/3)]"
            aria-label="Bajaj Bytes watch carousel"
          >
            {visibleVideos.map((video) => (
              <div key={video.id} className="snap-start">
                <VideoCard video={video} onPlay={() => handleVideoPlay(video)} />
              </div>
            ))}
          </div>
        </div>
      )}

      <VideoLightboxModal video={playingVideo} onClose={() => setPlayingVideo(null)} />
    </div>
  )
}
