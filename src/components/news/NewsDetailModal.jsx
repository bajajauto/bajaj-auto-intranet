import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import ImagePlaceholder from '@/components/shared/ImagePlaceholder'

const TAG_COLORS = {
  Leadership: 'bg-purple-100 text-purple-700',
  Product: 'bg-green-100 text-green-700',
  Facilities: 'bg-orange-100 text-orange-700',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function NewsDetailModal({ article, onClose }) {
  const closeBtnRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    closeBtnRef.current?.focus()
    document.body.style.overflow = 'hidden'

    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!article) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Sheet on mobile, centred card on desktop */}
      <div className="relative bg-white w-full rounded-t-[16px] sm:rounded-modal sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-modal">

        {/* Hero image + floating close */}
        <div className="relative flex-shrink-0">
          <ImagePlaceholder width="100%" height={200} label="Article Image" className="sm:h-56" />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-text-secondary hover:bg-white hover:text-text-primary shadow-card focus-ring transition-colors"
            aria-label="Close article"
          >
            <X size={16} />
          </button>
          {/* Drag handle hint on mobile */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/60 sm:hidden" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 space-y-4">
          {/* Meta row */}
          <div className="flex items-center gap-3">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[article.sourceTag] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {article.sourceTag}
            </span>
            <span className="text-xs text-text-secondary">{formatDate(article.date)}</span>
          </div>

          {/* Headline — Lora serif for editorial weight */}
          <h2
            id="news-modal-title"
            className="font-serif text-xl sm:text-2xl font-bold text-text-primary leading-snug"
          >
            {article.headline}
          </h2>

          {/* Body paragraphs */}
          <div className="space-y-3 pb-2">
            {article.body.map((para, i) => (
              <p key={i} className="text-sm text-text-secondary leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
