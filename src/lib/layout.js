/*
 * The page's measure. Everything that is not a shelf sits inside CONTAINER;
 * shelves run edge to edge but pad themselves so their first card lines up
 * with it — SHELF_GUTTER is the same 1200px column expressed as padding.
 */
export const CONTAINER = 'mx-auto w-full max-w-[1248px] px-4 sm:px-6'

export const SHELF_GUTTER =
  'px-4 scroll-px-4 sm:px-[max(24px,calc((100%-1200px)/2))] sm:scroll-px-[max(24px,calc((100%-1200px)/2))]'

// Pinned navy strip (40px) + header (56px) plus a little air — where a
// jumped-to section should land.
export const SCROLL_TOP_OFFSET = 112

// The hero's search field. The header's search button is a shortcut to it
// rather than a second, competing box.
export const SITE_SEARCH_ID = 'site-search'
