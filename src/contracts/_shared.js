import { z } from 'zod'

/*
 * Primitives every contract reuses.
 *
 * These exist so a format decision gets made once. `isoDate` is the single
 * definition of "how this codebase writes a date" — if SharePoint hands back
 * `2026-04-20T00:00:00Z` where the mock had `2026-04-20`, exactly one schema
 * fails and it names the field.
 */

export const nonEmpty = z.string().min(1)

/** Calendar date with no time component — `2026-04-20`. */
export const isoDate = nonEmpty.regex(
  /^\d{4}-\d{2}-\d{2}$/,
  'expected a YYYY-MM-DD date',
)

/*
 * Local timestamp with no zone suffix — `2026-04-28T09:00:00`.
 * Deliberately not `z.string().datetime()`, which requires a `Z` the mocks
 * do not carry. Whoever adds a zone has to change this line and think about it.
 */
export const isoDateTime = nonEmpty.regex(
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
  'expected a YYYY-MM-DDTHH:MM:SS timestamp',
)

/** A lucide-react export name, e.g. `Bell`. Resolved to a component at render. */
export const iconName = nonEmpty.regex(
  /^[A-Z][A-Za-z0-9]*$/,
  'expected a PascalCase lucide icon name',
)

/** Absolute http(s) URL — external links, CDN assets, audio. */
export const absoluteUrl = nonEmpty.url()

/*
 * Any src the browser can resolve: an absolute URL, a root-relative path, or
 * the fingerprinted string Vite produces for a bundled `import`. Deliberately
 * loose — this is the field that changes character in step 5, when bundled
 * imports become remote CMS URLs.
 */
export const assetRef = nonEmpty

/** Raw CSS the component drops into a style attribute. */
export const cssValue = nonEmpty

/** A slug used as a stable identifier — `vol-7`, `skill-development`. */
export const slug = nonEmpty

/** Fraction of a container's width or height, 0–1. */
export const fraction = z.number().min(0).max(1)
