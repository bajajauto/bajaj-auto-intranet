import { ArrowRight } from 'lucide-react'

function formatDate(iso) {
  const date = new Date(iso)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function CsrStoryCard({ story }) {
  return (
    <a
      href="#"
      className="site-surface-interactive group flex h-full flex-col overflow-hidden rounded-card border transition-all hover:-translate-y-1 hover:shadow-card focus-ring"
    >
      <div className="relative h-28 overflow-hidden bg-bg-alt">
        <img
          src={story.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
    </a>
  )
}
