import { Pause, Play } from 'lucide-react'

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatPublishedOn(iso) {
  const date = new Date(iso)
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PodcastCard({ episode, isActive, isPlaying, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={
        'site-surface-interactive group overflow-hidden rounded-card border text-left transition-all hover:-translate-y-1 hover:shadow-card focus-ring snap-start ' +
        (isActive ? 'ring-2 ring-brand-primary/40' : '')
      }
    >
      <div className="relative h-28 min-h-28 overflow-hidden bg-brand-light">
        <span className="absolute inset-0" style={{ background: episode.coverGradient }}>
          <span className="absolute -left-10 top-5 h-36 w-36 rounded-full border border-white/15 transition-transform duration-500 group-hover:scale-110" />
          <span
            className="absolute right-6 top-10 h-16 w-16 rounded-full transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
            style={{ backgroundColor: episode.coverAccent }}
          />
          <span className="absolute bottom-0 right-4 h-32 w-32 rotate-45 rounded-[24px] bg-white/10 transition-transform duration-500 group-hover:rotate-[50deg]" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm font-bold leading-none">Podcast</p>
          <p className="mt-1 text-[10px] font-semibold text-white/80">
            {formatDuration(episode.durationSec)}
          </p>
        </div>
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-brand-primary shadow-card transition-transform group-hover:scale-110">
          {isActive && isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </span>
      </div>

      <div className="p-3">
        <p className="text-sm font-semibold text-text-primary">{episode.title}</p>
        <p className="mt-0.5 text-xs text-text-secondary">{formatPublishedOn(episode.publishedOn)}</p>
        <p className="mt-2 line-clamp-2 text-xs text-text-secondary">{episode.summary}</p>
      </div>
    </button>
  )
}
