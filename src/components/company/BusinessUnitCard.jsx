import { ChevronDown } from 'lucide-react'
import ImagePlaceholder from '@/components/shared/ImagePlaceholder'

export default function BusinessUnitCard({ bu, isOpen, onToggle }) {
  return (
    <div className="rounded-card border border-gray-100 shadow-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-bg-alt transition-colors focus-ring"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-text-primary">{bu.name}</span>
        <ChevronDown
          size={20}
          className={`text-text-secondary transition-transform duration-accordion ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-accordion ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-5 pb-5 pt-3 bg-white border-t border-gray-50">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-shrink-0">
              <ImagePlaceholder width={80} height={80} label={bu.leader} className="rounded-full" />
              <p className="text-xs text-text-secondary mt-2 text-center">{bu.leader}</p>
              <p className="text-xs text-text-secondary text-center">BU Leader</p>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-sm text-text-secondary">{bu.description}</p>
              <div>
                <p className="text-xs font-semibold text-text-primary mb-1">Key Teams</p>
                <div className="flex flex-wrap gap-1.5">
                  {bu.teams.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-brand-light text-brand-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-primary mb-1">Key Products</p>
                <div className="flex flex-wrap gap-1.5">
                  {bu.products.map((p) => (
                    <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-bg-alt text-text-secondary border border-gray-200">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
