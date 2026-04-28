import { newsService } from '@/services/newsService'
import NewsCard from './NewsCard'

export default function NewsFeed() {
  const articles = newsService.getAll()

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
      {articles.map((article) => (
        <div key={article.id} className="snap-start">
          <NewsCard {...article} />
        </div>
      ))}
    </div>
  )
}
