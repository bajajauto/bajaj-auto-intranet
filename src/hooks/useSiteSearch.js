import { useMemo } from 'react'
import { services } from '@/config/services.config'
import { pageDestinations } from '@/config/search.config'

const MAX_RESULTS = 6

// A Pitstop service with a real link opens it; one that opens a modal inside
// its tile ('#') can only be pointed at, so it scrolls to the shelf.
const serviceEntries = services
  .filter((service) => service.enabled)
  .map((service) => {
    const external = service.redirectUrl && service.redirectUrl !== '#'
    return {
      id: `service-${service.id}`,
      label: service.label,
      hint: 'Pitstop',
      href: external ? service.redirectUrl : undefined,
      sectionId: external ? undefined : 'self-service',
      keywords: service.id.split('-'),
    }
  })

const INDEX = [...serviceEntries, ...pageDestinations].map((entry) => ({
  ...entry,
  haystack: [entry.label, entry.hint, ...entry.keywords].join(' ').toLowerCase(),
}))

/*
 * Matches the query against what the page already knows how to reach. Every
 * word typed has to appear somewhere in an entry's label, hint or keywords;
 * entries whose label starts with the query rank first.
 *
 * This is a stand-in for a real search service, not a promise of one: it finds
 * places, not documents or people.
 */
export function useSiteSearch(query) {
  return useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const words = q.split(/\s+/)

    return INDEX.filter((entry) => words.every((word) => entry.haystack.includes(word)))
      .sort((a, b) => {
        const aStarts = a.label.toLowerCase().startsWith(q) ? 0 : 1
        const bStarts = b.label.toLowerCase().startsWith(q) ? 0 : 1
        return aStarts - bStarts
      })
      .slice(0, MAX_RESULTS)
  }, [query])
}
