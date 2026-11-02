import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCalendarEvents } from '@/hooks/useCalendarEvents'
import { useBajajBytesVolumes } from '@/hooks/useBajajBytesVolumes'
import { useNews } from '@/hooks/useNews'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { outlookEventLink, toDateKey } from '@/utils/calendarLinks'
import Panel from '@/components/shared/Panel'
import Skeleton from '@/components/shared/Skeleton'
import NewsDetailModal from '@/components/news/NewsDetailModal'

const ROTATE_MS = 6000

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

const PILL =
  'inline-block self-start rounded-md border border-white/40 bg-white/20 px-2.5 py-0.5 text-[11.5px] font-semibold tracking-[0.04em] backdrop-blur-sm'
const CTA = 'mt-auto self-start rounded pt-2 text-[13px] font-medium hover:underline focus-ring'

/*
 * The slides, in the order they rotate: the next two company events, the
 * latest Bajaj Bytes edition, then the two newest stories. A feed that is
 * still loading or empty simply contributes nothing.
 */
function buildSlides({ events, volume, news }) {
  const todayKey = toDateKey(new Date())
  const upcoming = events
    .filter((e) => e.type === 'event' && e.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2)

  return [
    ...upcoming.map((event) => ({ kind: 'event', key: `event-${event.date}-${event.label}`, event })),
    ...(volume ? [{ kind: 'bytes', key: `bytes-${volume.id}`, volume }] : []),
    ...news.slice(0, 2).map((article) => ({ kind: 'news', key: `news-${article.id}`, article })),
  ]
}

function Slide({ slide, onOpenArticle }) {
  if (slide.kind === 'event') {
    const { event } = slide
    const date = new Date(event.date)
    return (
      <div className="flex h-full flex-col bg-gradient-to-br from-[#09344b] via-[#1d6885] to-[#2188a9] px-5 py-4 text-white">
        <span className={PILL}>Upcoming event</span>
        <div className="mt-3 flex items-center gap-3">
          <span className="flex h-[46px] w-[46px] flex-none flex-col items-center justify-center rounded-[10px] bg-white/25 leading-none">
            <span className="text-[17px] font-semibold">{date.getDate()}</span>
            <span className="mt-0.5 text-[9.5px] font-medium uppercase">
              {date.toLocaleDateString('en-IN', { month: 'short' })}
            </span>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[17px] font-semibold">{event.label}</span>
            <span className="block truncate text-[12.5px] text-white/90">
              {event.time} · {event.location}
            </span>
          </span>
        </div>
        <a href={outlookEventLink(event)} target="_blank" rel="noreferrer" className={CTA}>
          Add to Outlook →
        </a>
      </div>
    )
  }

  if (slide.kind === 'bytes') {
    const { volume } = slide
    return (
      <div className="flex h-full flex-col bg-gradient-to-br from-[#223b50] via-[#3e7089] to-[#4893b5] px-5 py-4 text-white">
        <span className={PILL}>Bajaj Bytes · Latest edition</span>
        <h3 className="mt-2 text-[20px] font-semibold leading-tight tracking-[-0.01em]">{volume.label}</h3>
        <p className="mt-1 truncate text-[12.5px] text-white/95">
          The {volume.month} issue: stories and quick reads.
        </p>
        <a href={volume.href} target="_blank" rel="noreferrer" className={CTA}>
          Read the edition →
        </a>
      </div>
    )
  }

  const { article } = slide
  return (
    <div className="relative flex h-full flex-col px-5 py-4 text-white">
      {article.image && (
        <img src={article.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
      <span
        className="absolute inset-0 bg-gradient-to-t from-[#03122b]/95 via-[#09344b]/75 to-[#09344b]/40"
        aria-hidden="true"
      />
      <span className={`relative ${PILL}`}>
        News · {article.sourceTag}
      </span>
      <h3 className="relative mt-2 line-clamp-2 text-[15px] font-semibold leading-snug">{article.headline}</h3>
      <span className="relative mt-1 text-[11px] text-white/85">{formatDate(article.date)}</span>
      <button type="button" onClick={() => onOpenArticle(article)} className={`relative ${CTA}`}>
        Read story →
      </button>
    </div>
  )
}

/*
 * Beside Pitstop: one card that rotates through what is new — events, the
 * latest Bajaj Bytes and the latest news. It pauses while the pointer or
 * keyboard focus is on it, and does not move at all for reduced motion.
 */
export default function Highlights() {
  const calendar = useCalendarEvents()
  const bytes = useBajajBytesVolumes()
  const news = useNews()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [article, setArticle] = useState(null)

  const slides = buildSlides({ events: calendar.data, volume: bytes.data?.[0], news: news.data })
  const count = slides.length
  const current = count ? index % count : 0
  const loading = count === 0 && (calendar.isPending || bytes.isPending || news.isPending)

  useEffect(() => {
    if (reduceMotion || paused || count < 2) return undefined
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS)
    return () => clearInterval(timer)
  }, [reduceMotion, paused, count])

  const go = (delta) => setIndex((current + delta + count) % count)

  return (
    <Panel
      as="section"
      id="highlights"
      aria-roledescription="carousel"
      aria-label="Events, Bajaj Bytes and news"
      className="scroll-mt-20 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
    >
      <div className="relative h-[150px]">
        {loading ? (
          <Skeleton className="h-full w-full" rounded="rounded-none" />
        ) : count === 0 ? (
          <p className="flex h-full items-center justify-center text-[13px] text-ocean-sub">
            Nothing new right now.
          </p>
        ) : (
          slides.map((slide, i) => (
            <div
              key={slide.key}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== current}
              inert={i !== current ? '' : undefined}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === current ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <Slide slide={slide} onOpenArticle={setArticle} />
            </div>
          ))
        )}
      </div>

      {count > 1 && (
        <div className="flex items-center justify-between px-4 py-1.5">
          <div className="flex gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === current}
                className={`h-2 rounded-full transition-all focus-ring ${
                  i === current ? 'w-5 bg-ocean-700' : 'w-2 bg-ocean-200 hover:bg-ocean-300'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            {[
              [-1, ChevronLeft, 'Previous slide'],
              [1, ChevronRight, 'Next slide'],
            ].map(([delta, Icon, label]) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() => go(delta)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-ocean-100 text-ocean-700 hover:bg-ocean-200 focus-ring"
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      )}

      {article && <NewsDetailModal article={article} onClose={() => setArticle(null)} />}
    </Panel>
  )
}
