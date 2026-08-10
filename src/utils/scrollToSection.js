/*
 * Scrolling to a section is done from three places now — the sidebar rail, the
 * header's Bajaj Bytes link, and anything else that grows a jump link — so the
 * offset lives here rather than being re-derived at each call site.
 *
 * TopBanner 36px + Header 80px on desktop + 8px breathing room.
 */
export const SCROLL_TOP_OFFSET = 124

export function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_TOP_OFFSET
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}
