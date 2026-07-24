import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const STORY_BACKDROPS = {
  livelihoods: 'from-emerald-500 via-teal-600 to-brand-dark',
  'skill-development': 'from-amber-400 via-sky-600 to-brand-dark',
  'disaster-response': 'from-violet-500 via-blue-700 to-brand-dark',
  health: 'from-rose-400 via-brand-primary to-brand-dark',
}

function formatDate(iso) {
  const date = new Date(iso)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function CsrStoryCard({ story }) {
  const [imageFailed, setImageFailed] = useState(false)
  const backdrop = STORY_BACKDROPS[story.program] ?? 'from-brand-primary via-blue-700 to-brand-dark'

  return (
    <button
      type="button"
      aria-label={`Read impact story: ${story.headline}`}
      className="site-surface-interactive group flex h-full w-full flex-col overflow-hidden rounded-card border text-left transition-all hover:-translate-y-1 hover:shadow-card focus-ring"
    >
      <div className={`relative h-28 overflow-hidden bg-gradient-to-br ${backdrop}`}>
        {!imageFailed && story.image ? (
          <img
            src={story.image}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
            <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/18" />
            <div className="absolute bottom-3 left-5 h-16 w-16 rounded-full border border-white/20" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <span className="absolute bottom-2 left-3 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
          Impact story
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="line-clamp-2 text-sm font-semibold text-text-primary">{story.headline}</p>
        <p className="mt-1 line-clamp-2 text-xs text-text-secondary">{story.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-[11px] text-text-secondary">
          <span>{formatDate(story.publishedOn)}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
            Read
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </button>
  )
}
