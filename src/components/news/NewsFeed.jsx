import { newsService } from '@/services/newsService'
import NewsCard from './NewsCard'

export default function NewsFeed() {
  const articles = newsService.getAll()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => <NewsCard key={article.id} {...article} />)}
    </div>
  )
}
