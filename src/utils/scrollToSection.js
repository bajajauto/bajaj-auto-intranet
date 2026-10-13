import { SCROLL_TOP_OFFSET } from '@/lib/layout'

/*
 * Scrolling to a section is done from several places — the header nav, the
 * utility bar, the hero's quick links — so the offset lives here rather than
 * being re-derived at each call site. The utility bar and the header are both
 * pinned above the page.
 */
export { SCROLL_TOP_OFFSET }

export function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_TOP_OFFSET
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}
