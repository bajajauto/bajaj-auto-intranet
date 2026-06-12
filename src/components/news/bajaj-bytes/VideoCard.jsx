import { Play } from 'lucide-react'

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatPublishedOn(iso) {
  const date = new Date(iso)
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function VideoCard({ video, onPlay }) {
  const thumbnailUrl = video.thumbnailUrl ?? (
    video.youtubeId ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : null
  )

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`${video.externalUrl ? 'Open' : 'Play'} ${video.title}`}
      className="site-surface-interactive group overflow-hidden rounded-card border text-left transition-all hover:-translate-y-1 hover:shadow-card focus-ring"
    >
      <div className="relative aspect-video overflow-hidden bg-bg-alt">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#eaf3ff_0%,#dbeafe_45%,#bfdbfe_100%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-brand-primary shadow-modal transition-transform group-hover:scale-110">
            <Play size={20} className="ml-0.5" />
          </span>
        </span>
        {video.durationSec && (
          <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white">
            {formatDuration(video.durationSec)}
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="line-clamp-2 text-sm font-semibold text-text-primary">{video.title}</p>
        <p className="mt-0.5 text-xs text-text-secondary">{formatPublishedOn(video.publishedOn)}</p>
      </div>
    </button>
  )
}
