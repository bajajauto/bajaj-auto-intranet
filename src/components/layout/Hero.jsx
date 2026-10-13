import { useState } from 'react'
import { ArrowUpRight, CornerDownLeft } from 'lucide-react'
import jarvisAvatar from '@/assets/jarvis-blue.png'
import { useUser } from '@/context/UserContext'
import { useSiteSearch } from '@/hooks/useSiteSearch'
import { services } from '@/config/services.config'
import { popularSearches } from '@/config/search.config'
import { CONTAINER, SITE_SEARCH_ID } from '@/lib/layout'
import { openJarvis } from '@/lib/jarvis'
import { scrollToSection } from '@/utils/scrollToSection'

function greetingFor(date) {
  const hour = date.getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function resolveChip(chip) {
  if (chip.sectionId) return { sectionId: chip.sectionId }
  const service = services.find((s) => s.id === chip.serviceId)
  return { href: service?.redirectUrl }
}

// Opens a destination the way it wants to be opened: a link in a new tab, a
// section by scrolling to it.
function go(destination) {
  if (destination.href) {
    window.open(destination.href, '_blank', 'noopener,noreferrer')
  } else if (destination.sectionId) {
    scrollToSection(destination.sectionId)
  }
}

export default function Hero() {
  const user = useUser()
  const [query, setQuery] = useState('')
  const results = useSiteSearch(query)
  const today = new Date()
  const firstName = user.name.split(/\s+/)[0]
  const showResults = query.trim().length > 0

  function pick(destination) {
    setQuery('')
    go(destination)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (results[0]) pick(results[0])
  }

  return (
    <section id="top" aria-labelledby="hero-heading" className={`${CONTAINER} scroll-mt-28 pt-4`}>
      <p className="mb-1 text-[15px] font-semibold tracking-[0.02em] text-accent-orange">
        {today.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
      </p>
      <h1
        id="hero-heading"
        className="font-display text-[22px] font-semibold leading-tight tracking-[-0.015em] text-ink"
      >
        {greetingFor(today)}, {firstName}.
      </h1>

      <form role="search" onSubmit={handleSubmit} className="relative mt-4">
        <label htmlFor={SITE_SEARCH_ID} className="sr-only">
          Search the intranet
        </label>
        <div className="flex h-14 items-center gap-3 rounded-full bg-surface pl-5 pr-2 shadow-search ring-1 ring-line/[0.04] focus-within:ring-2 focus-within:ring-brand-primary/40">
          <button
            type="button"
            onClick={openJarvis}
            title="Ask Jarvis"
            aria-label="Ask Jarvis"
            className="-ml-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-transform hover:scale-110 focus-ring"
          >
            <img src={jarvisAvatar} alt="" className="h-9 w-9 rounded-full object-cover" />
          </button>
          <input
            id={SITE_SEARCH_ID}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
            placeholder="Search services, help, places…"
            autoComplete="off"
            aria-controls="site-search-results"
            aria-expanded={showResults}
            className="h-full min-w-0 flex-1 border-0 bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            className="h-11 flex-shrink-0 rounded-full bg-brand-primary px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark focus-ring"
          >
            Search
          </button>
        </div>

        {showResults && (
          <div
            id="site-search-results"
            className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-3xl bg-surface p-2 shadow-lifted ring-1 ring-line/[0.06]"
          >
            {results.length > 0 ? (
              <ul aria-label="Search results">
                {results.map((result, index) => (
                  <li key={result.id}>
                    <button
                      type="button"
                      onClick={() => pick(result)}
                      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-chip focus-ring"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-semibold text-ink">
                          {result.label}
                        </span>
                        <span className="block text-[13px] text-muted">{result.hint}</span>
                      </span>
                      {result.href ? (
                        <ArrowUpRight size={18} className="flex-shrink-0 text-muted" />
                      ) : (
                        index === 0 && (
                          <CornerDownLeft size={16} className="flex-shrink-0 text-muted" />
                        )
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <p className="text-[15px] text-muted">
                  Nothing on the intranet matches “{query.trim()}”.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    openJarvis()
                  }}
                  className="rounded-full bg-chip px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-primary hover:text-white focus-ring"
                >
                  Ask Jarvis instead
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="mr-1 text-muted">Popular:</span>
          {popularSearches.map((chip) => {
            const destination = resolveChip(chip)
            return (
              <a
                key={chip.label}
                href={destination.href ?? `#${destination.sectionId}`}
                target={destination.href ? '_blank' : undefined}
                rel={destination.href ? 'noreferrer' : undefined}
                onClick={
                  destination.sectionId
                    ? (e) => {
                        e.preventDefault()
                        scrollToSection(destination.sectionId)
                      }
                    : undefined
                }
                className="rounded-full bg-chip px-3.5 py-1.5 text-ink transition-colors hover:bg-brand-primary hover:text-white focus-ring"
              >
                {chip.label}
              </a>
            )
          })}
        </div>
      </form>
    </section>
  )
}
