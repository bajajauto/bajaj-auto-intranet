import { useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ImagePlaceholder from '@/components/shared/ImagePlaceholder'

export default function BusinessUnitCard({ bu, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const [contentHeight, setContentHeight] = useState(0)

  useLayoutEffect(() => {
    if (!contentRef.current) return undefined

    const updateHeight = () => {
      setContentHeight(contentRef.current.scrollHeight)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [bu])

  return (
    <div className="site-surface rounded-card border overflow-hidden">
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
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ maxHeight: isOpen ? `${contentHeight}px` : '0px' }}
      >
        <div ref={contentRef} className="px-5 pb-5 pt-3 bg-white border-t border-gray-50">
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
