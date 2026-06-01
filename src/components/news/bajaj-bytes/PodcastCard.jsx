import { BookOpen, Pause, Play } from 'lucide-react'

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatPublishedOn(iso) {
  const date = new Date(iso)
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PodcastCard({ episode, sourceVolume, isActive, isPlaying, onSelect }) {
  return (
    <div
      className={
        'site-surface group overflow-hidden rounded-card border transition-all hover:-translate-y-1 hover:shadow-card ' +
        (isActive ? 'ring-2 ring-brand-primary/40' : '')
      }
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={isActive}
        aria-label={`${isActive && isPlaying ? 'Pause' : 'Play'} ${episode.title}`}
        className="block w-full text-left focus-ring"
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

        <div className="p-3 pb-1">
          <p className="text-sm font-semibold text-text-primary">{episode.title}</p>
          <p className="mt-0.5 text-xs text-text-secondary">
            {formatPublishedOn(episode.publishedOn)}
          </p>
          <p className="mt-2 line-clamp-2 text-xs text-text-secondary">{episode.summary}</p>
        </div>
      </button>

      {sourceVolume && (
        <div className="border-t border-gray-100 px-3 py-2">
          <a
            href={sourceVolume.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline focus-ring"
          >
            <BookOpen size={12} />
            Read {sourceVolume.label} newsletter
          </a>
        </div>
      )}
    </div>
  )
}
