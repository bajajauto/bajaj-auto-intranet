import { useMemo, useState } from 'react'
import { PlayCircle } from 'lucide-react'
import { useYoutubeVideos } from '@/hooks/useYoutubeVideos'
import VideoCard from './VideoCard'
import VideoLightboxModal from './VideoLightboxModal'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'md-meetings', label: 'MD Meetings' },
  { id: 'interviews', label: 'Interviews' },
  { id: 'stories', label: 'Stories' },
]

export default function YouTubeSection() {
  const videos = useYoutubeVideos()
  const [activeCategory, setActiveCategory] = useState('all')
  const [playingVideo, setPlayingVideo] = useState(null)

  const visibleVideos = useMemo(() => {
    if (activeCategory === 'all') return videos
    return videos.filter((v) => v.category === activeCategory)
  }, [videos, activeCategory])

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

  return (
    <div className="space-y-5 px-5 py-6 sm:px-14">
      <div
        role="tablist"
        aria-label="Video category"
        className="flex flex-wrap gap-2"
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
        <p className="py-8 text-center text-sm text-text-secondary">
          No videos in this category yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleVideos.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={() => setPlayingVideo(video)} />
          ))}
        </div>
      )}

      <VideoLightboxModal video={playingVideo} onClose={() => setPlayingVideo(null)} />
    </div>
  )
}
