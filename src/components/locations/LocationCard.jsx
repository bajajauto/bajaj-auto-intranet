import { useState } from 'react'
import { ChevronDown, MapPin } from 'lucide-react'
import ImagePlaceholder from '@/components/shared/ImagePlaceholder'

export default function LocationCard({ name, subLocations }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="w-full rounded-card border border-gray-100 shadow-card bg-white overflow-hidden">
      <ImagePlaceholder width="100%" height={120} label={name} />
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={14} className="text-brand-primary flex-shrink-0" />
          <p className="text-sm font-semibold text-text-primary">{name}</p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs text-brand-primary hover:underline flex items-center gap-1 focus-ring rounded"
          aria-expanded={expanded}
        >
          {expanded ? 'View Less' : 'View More'}
          <ChevronDown size={12} className={`transition-transform duration-accordion ${expanded ? 'rotate-180' : ''}`} />
        </button>
        {expanded && (
          <ul className="mt-2 space-y-1">
            {subLocations.map((sub) => (
              <li key={sub} className="text-xs text-text-secondary flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-brand-primary/40 flex-shrink-0" />
                {sub}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
