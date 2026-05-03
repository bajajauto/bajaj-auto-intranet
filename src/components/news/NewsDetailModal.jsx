import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
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

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div className="relative bg-white w-full rounded-t-[16px] sm:rounded-modal sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-modal">
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
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/60 sm:hidden" />
        </div>

        <div className="relative min-h-0 flex-1">
          <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-4 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-8 bg-gradient-to-t from-white to-transparent" />

          <div className="h-full overflow-y-auto overscroll-contain px-5 sm:px-8 py-5 pr-4 sm:pr-6 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-primary/30 hover:[&::-webkit-scrollbar-thumb]:bg-brand-primary/50">
            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  TAG_COLORS[article.sourceTag] ?? 'bg-gray-100 text-gray-600'
                }`}
              >
                {article.sourceTag}
              </span>
              <span className="text-xs text-text-secondary">{formatDate(article.date)}</span>
            </div>

            <h2
              id="news-modal-title"
              className="font-serif text-xl sm:text-2xl font-bold text-text-primary leading-snug"
            >
              {article.headline}
            </h2>

            <div className="space-y-3 pb-5">
              {article.body.map((para) => (
                <p key={para} className="text-sm text-text-secondary leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
