import ImagePlaceholder from '@/components/shared/ImagePlaceholder'

const TAG_COLORS = {
  Leadership: 'bg-purple-100 text-purple-700',
  Product: 'bg-green-100 text-green-700',
  Facilities: 'bg-orange-100 text-orange-700',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function NewsCard({ headline, excerpt, date, sourceTag, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex-shrink-0 w-[18rem] sm:w-80 rounded-card border border-gray-100 shadow-card bg-white text-left hover:shadow-modal hover:-translate-y-1 hover:scale-[1.025] transition-all duration-200 ease-out focus-ring overflow-hidden"
      aria-label={`Read full article: ${headline}`}
      aria-haspopup="dialog"
    >
      <div className="overflow-hidden bg-brand-light">
        <ImagePlaceholder
          width="100%"
          height={156}
          label="News Image"
          className="transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[sourceTag] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {sourceTag}
          </span>
          <span className="text-[10px] text-text-secondary">{formatDate(date)}</span>
        </div>
        <p className="text-sm font-semibold text-text-primary leading-tight line-clamp-2 group-hover:text-brand-primary transition-colors">
          {headline}
        </p>
        <p className="text-xs text-text-secondary line-clamp-2">{excerpt}</p>
      </div>
    </button>
  )
}
