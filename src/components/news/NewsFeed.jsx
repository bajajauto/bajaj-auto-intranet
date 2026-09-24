import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNews } from '@/hooks/useNews'
import Skeleton from '@/components/shared/Skeleton'
import SkeletonText from '@/components/shared/SkeletonText'
import QueryBoundary from '@/components/shared/QueryBoundary'
import NewsCard from './NewsCard'
import NewsDetailModal from './NewsDetailModal'

/* Mirrors the card grid so the carousel does not resize when articles land. */
function NewsFeedSkeleton() {
  return (
    <div className="grid auto-cols-[minmax(17rem,1fr)] grid-flow-col gap-6 overflow-hidden px-5 py-6 sm:px-14 lg:auto-cols-[calc((100%-3rem)/3)]">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-40 w-full" rounded="rounded-card" />
          <Skeleton className="h-4 w-3/4" />
          <SkeletonText lines={2} />
        </div>
      ))}
    </div>
  )
}

export default function NewsFeed({ title }) {
  const newsQuery = useNews()
  const articles = newsQuery.data
  const carouselRef = useRef(null)
  const [selectedArticle, setSelectedArticle] = useState(null)

  function scrollByCard(direction) {
    const scrollAmount = carouselRef.current?.clientWidth ?? 960
    carouselRef.current?.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div className="site-surface-tint tint-blush relative rounded-card border overflow-hidden">
        {title && (
          <div className="px-5 pt-5 sm:px-14">
            <h2 className="text-lg font-semibold text-brand-primary">{title}</h2>
          </div>
        )}
        {articles.length > 0 && (
          <>
            <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 z-10 w-16 surface-fade-l" />
            <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 z-10 w-16 surface-fade-r" />

            <div className="hidden sm:flex pointer-events-none absolute inset-y-0 left-0 right-0 z-20 items-center justify-between px-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                className="pointer-events-auto p-2 rounded-full bg-white/90 border border-gray-200 text-text-secondary shadow-card hover:text-brand-primary hover:border-brand-primary/30 hover:bg-brand-light focus-ring transition-all"
                aria-label="Previous news"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                className="pointer-events-auto p-2 rounded-full bg-white/90 border border-gray-200 text-text-secondary shadow-card hover:text-brand-primary hover:border-brand-primary/30 hover:bg-brand-light focus-ring transition-all"
                aria-label="Next news"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}

        <QueryBoundary
          query={newsQuery}
          skeleton={<NewsFeedSkeleton />}
          label="company news"
          emptyMessage="No news published yet."
        >
          {(items) => (
            <div
              ref={carouselRef}
              className="grid auto-cols-[minmax(17rem,1fr)] grid-flow-col gap-6 overflow-x-auto px-5 py-6 snap-x snap-mandatory scroll-smooth sm:px-14 lg:auto-cols-[calc((100%-3rem)/3)]"
              aria-label="Company news carousel"
            >
              {items.map((article) => (
                <div key={article.id} className="snap-start">
                  <NewsCard {...article} onClick={() => setSelectedArticle(article)} />
                </div>
              ))}
            </div>
          )}
        </QueryBoundary>
      </div>

      {selectedArticle && (
        <NewsDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </>
  )
}
