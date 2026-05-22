import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { newsService } from '@/services/newsService'
import NewsCard from './NewsCard'
import NewsDetailModal from './NewsDetailModal'

export default function NewsFeed({ title }) {
  const articles = newsService.getAll()
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
      <div className="site-surface relative rounded-card border overflow-hidden">
        {title && (
          <div className="px-5 pt-5 sm:px-14">
            <h2 className="text-lg font-semibold text-brand-primary">{title}</h2>
          </div>
        )}
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent" />

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

        <div
          ref={carouselRef}
          className="grid auto-cols-[minmax(17rem,1fr)] grid-flow-col gap-6 overflow-x-auto px-5 py-6 snap-x snap-mandatory scroll-smooth sm:px-14 lg:auto-cols-[calc((100%-3rem)/3)]"
          aria-label="Company news carousel"
        >
          {articles.map((article) => (
            <div key={article.id} className="snap-start">
              <NewsCard {...article} onClick={() => setSelectedArticle(article)} />
            </div>
          ))}
        </div>
      </div>

      {selectedArticle && (
        <NewsDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </>
  )
}
