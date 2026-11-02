import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import navNews from '@/assets/icons/ocean/nav-news.webp'
import { useNews } from '@/hooks/useNews'
import { useBajajBytesVolumes } from '@/hooks/useBajajBytesVolumes'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Panel from '@/components/shared/Panel'
import PanelTitle from '@/components/shared/PanelTitle'
import ErrorState from '@/components/shared/ErrorState'
import Skeleton from '@/components/shared/Skeleton'
import NewsDetailModal from './NewsDetailModal'

const ROTATE_MS = 5000

const TABS = [
  { id: 'news', label: 'News' },
  { id: 'bytes', label: 'Bajaj Bytes' },
]

const formatDate = (iso, opts = { day: '2-digit', month: 'short', year: 'numeric' }) =>
  new Date(iso).toLocaleDateString('en-IN', opts)

const CARD =
  'group flex w-[240px] flex-none snap-start flex-col overflow-hidden rounded-xl border border-ocean-line bg-white text-left shadow-ocean-sm transition-transform hover:-translate-y-0.5 focus-ring'

function NewsCard({ article, onOpen }) {
  return (
    <button type="button" onClick={onOpen} className={CARD}>
      <span className="relative block h-[120px] w-full bg-ocean-200">
        {article.image && <img src={article.image} alt="" className="h-full w-full object-cover" />}
        <span className="absolute left-2.5 top-2.5 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-ocean-900">
          {article.sourceTag}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-3">
        <span className="line-clamp-2 text-[13.5px] font-semibold leading-snug text-ocean-ink">
          {article.headline}
        </span>
        <span className="mt-auto pt-2 text-[11px] text-ocean-sub">{formatDate(article.date)}</span>
      </span>
    </button>
  )
}

// Editions step down the ocean scale, newest deepest.
const BYTES_TONES = [
  'from-[#09344b] via-[#1d6885] to-[#2188a9]',
  'from-[#223b50] via-[#3e7089] to-[#4893b5]',
  'from-[#3b5f78] via-[#5684a5] to-[#7fadc5]',
]

function BytesCard({ volume, tone, latest }) {
  return (
    <a href={volume.href} target="_blank" rel="noreferrer" className={CARD}>
      <span className={`flex h-[120px] w-full flex-col justify-between bg-gradient-to-br p-3 text-white ${tone}`}>
        <span className="self-start rounded-md bg-white/25 px-2 py-0.5 text-[11px] font-semibold">
          {latest ? 'Latest edition' : 'Bajaj Bytes'}
        </span>
        <span className="text-[24px] font-bold tracking-[-0.01em]">{volume.label}</span>
      </span>
      <span className="flex flex-1 flex-col p-3">
        <span className="text-[13.5px] font-semibold leading-snug text-ocean-ink">{volume.month} issue</span>
        <span className="mt-auto pt-2 text-[11px] text-ocean-sub group-hover:text-ocean-700">Read the edition →</span>
      </span>
    </a>
  )
}

/*
 * The page's news and Bajaj Bytes editions, one at a time behind a switch.
 * The strip scrolls itself a card at a time and wraps; hover or focus pauses
 * it, reduced motion stops it, and it can always be scrolled by hand. A story
 * opens in the article modal; an edition opens in a new tab.
 */
export default function NewsBytes() {
  const news = useNews()
  const bytes = useBajajBytesVolumes()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const stripRef = useRef(null)

  const [tab, setTab] = useState('news')
  const [paused, setPaused] = useState(false)
  const [article, setArticle] = useState(null)

  const query = tab === 'news' ? news : bytes
  const count = query.data?.length ?? 0

  function step(direction) {
    const strip = stripRef.current
    if (!strip) return
    const card = strip.firstElementChild
    const width = card ? card.getBoundingClientRect().width + 12 : 252
    const atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4
    const atStart = strip.scrollLeft <= 4
    if (direction > 0 && atEnd) strip.scrollTo({ left: 0, behavior: 'smooth' })
    else if (direction < 0 && atStart) strip.scrollTo({ left: strip.scrollWidth, behavior: 'smooth' })
    else strip.scrollBy({ left: direction * width, behavior: 'smooth' })
  }

  useEffect(() => {
    stripRef.current?.scrollTo({ left: 0 })
  }, [tab])

  useEffect(() => {
    if (reduceMotion || paused || count < 2) return undefined
    const timer = setInterval(() => step(1), ROTATE_MS)
    return () => clearInterval(timer)
  }, [reduceMotion, paused, count, tab])

  return (
    <Panel
      as="section"
      id="news"
      aria-labelledby="news-heading"
      className="flex min-w-0 scroll-mt-20 flex-col p-5 sm:px-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <PanelTitle id="news-heading" icon={navNews} title="News & Bajaj Bytes" />
        </div>
        <div
          role="tablist"
          aria-label="Show news or Bajaj Bytes"
          className="flex flex-none gap-0.5 rounded-[9px] border border-[#c4d6e2] bg-[#fdfeff] p-0.5"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`h-[28px] rounded-[7px] px-3.5 text-[12.5px] font-semibold transition-colors focus-ring ${
                tab === t.id ? 'bg-gradient-to-r from-ocean-800 to-ocean-600 text-white' : 'text-[#011010] hover:bg-ocean-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="relative mt-4 flex-1"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
      >
        {query.isPending && count === 0 ? (
          <div className="flex gap-3 overflow-hidden" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-[200px] w-[240px] flex-none" rounded="rounded-xl" />
            ))}
          </div>
        ) : query.isError && count === 0 ? (
          <ErrorState label={tab === 'news' ? 'the news' : 'Bajaj Bytes'} onRetry={query.refetch} />
        ) : count === 0 ? (
          <p className="py-10 text-center text-[13px] text-ocean-sub">
            {tab === 'news' ? 'No news yet.' : 'No editions yet.'}
          </p>
        ) : (
          <>
            <div
              ref={stripRef}
              role="tabpanel"
              aria-label={tab === 'news' ? 'News' : 'Bajaj Bytes'}
              className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1"
            >
              {tab === 'news'
                ? news.data.map((a) => <NewsCard key={a.id} article={a} onOpen={() => setArticle(a)} />)
                : bytes.data.map((v, i) => (
                    <BytesCard key={v.id} volume={v} tone={BYTES_TONES[i % BYTES_TONES.length]} latest={i === 0} />
                  ))}
            </div>
            {count > 1 && (
              <div className="mt-3 flex justify-end gap-1">
                {[
                  [-1, ChevronLeft, 'Scroll back'],
                  [1, ChevronRight, 'Scroll forward'],
                ].map(([delta, Icon, label]) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    onClick={() => step(delta)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-ocean-100 text-ocean-700 hover:bg-ocean-200 focus-ring"
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {article && <NewsDetailModal article={article} onClose={() => setArticle(null)} />}
    </Panel>
  )
}
