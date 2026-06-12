import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCsrStories } from '@/hooks/useCsrStories'
import CsrStoryCard from './CsrStoryCard'

export default function CsrStoriesCarousel() {
  const stories = useCsrStories()
  const carouselRef = useRef(null)

  function scrollByPage(direction) {
    const scrollAmount = carouselRef.current?.clientWidth ?? 720
    carouselRef.current?.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }

  if (stories.length === 0) return null

  const hasControls = stories.length > 1

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-base font-semibold text-text-primary">Recent impact stories</h3>
        <span className="text-xs text-text-secondary">{stories.length} stories</span>
      </div>

      <div className="relative">
        {hasControls && (
          <div className="hidden sm:flex pointer-events-none absolute inset-y-0 left-0 right-0 z-20 items-center justify-between">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              className="pointer-events-auto -ml-2 p-1.5 rounded-full bg-white border border-gray-200 text-text-secondary shadow-card hover:text-brand-primary hover:border-brand-primary/30 focus-ring transition-all"
              aria-label="Previous stories"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              className="pointer-events-auto -mr-2 p-1.5 rounded-full bg-white border border-gray-200 text-text-secondary shadow-card hover:text-brand-primary hover:border-brand-primary/30 focus-ring transition-all"
              aria-label="Next stories"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <div
          ref={carouselRef}
          className="scrollbar-none grid auto-cols-[minmax(16rem,1fr)] grid-flow-col gap-4 overflow-x-auto pb-1 snap-x snap-mandatory scroll-smooth lg:auto-cols-[calc((100%-2rem)/3)]"
          aria-label="CSR impact stories carousel"
        >
          {stories.map((story) => (
            <div key={story.id} className="snap-start">
              <CsrStoryCard story={story} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
