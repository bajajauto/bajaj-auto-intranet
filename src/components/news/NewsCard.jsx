import ImagePlaceholder from '@/components/shared/ImagePlaceholder'

const TAG_COLORS = {
  Leadership: 'bg-purple-100 text-purple-700',
  Product: 'bg-green-100 text-green-700',
  Facilities: 'bg-orange-100 text-orange-700',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function NewsCard({ headline, excerpt, date, sourceTag, image }) {
  return (
    <button className="w-full rounded-card border border-gray-100 shadow-card bg-white text-left hover:shadow-modal transition-shadow focus-ring overflow-hidden">
      <ImagePlaceholder width="100%" height={140} label="News Image" />
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[sourceTag] ?? 'bg-gray-100 text-gray-600'}`}>
            {sourceTag}
          </span>
          <span className="text-[10px] text-text-secondary">{formatDate(date)}</span>
        </div>
        <p className="text-sm font-semibold text-text-primary leading-tight line-clamp-2">{headline}</p>
        <p className="text-xs text-text-secondary line-clamp-2">{excerpt}</p>
      </div>
    </button>
  )
}
