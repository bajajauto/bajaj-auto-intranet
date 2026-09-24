/*
 * The entity letterhead a generated letter sits on — logo and address block at
 * the top, a watermarked seal behind the body, contact strip at the foot.
 *
 * Held to A4 proportion so what the employee sees on screen is what prints.
 * The page keeps a white background and near-black text in both themes: this is
 * a document, not a surface, and a letter that darkens with the site would
 * print as a black rectangle.
 */

import { entities } from '@/config/letters.config'

/*
 * Stand-in for the pre-applied seal the letters carry. The templates arrive
 * with it flattened into the PDF; here it is drawn so it can sit behind live
 * text and stay legible at any zoom. Low-opacity by design — it has to read as
 * a seal without competing with the body.
 */
function SealWatermark({ entityName }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 200 200" className="h-[55%] w-[55%] text-brand-primary opacity-[0.07]">
        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="6" />
        <text
          x="100"
          y="94"
          textAnchor="middle"
          className="fill-current text-[19px] font-bold tracking-[1px]"
        >
          {entityName}
        </text>
        <text x="100" y="118" textAnchor="middle" className="fill-current text-[13px] tracking-[3px]">
          HR DEPARTMENT
        </text>
      </svg>
    </div>
  )
}

export default function Letterhead({ entity, children, page = 1, pageCount = 1 }) {
  const resolved = typeof entity === 'string' ? entities[entity] : entity
  if (!resolved) return null

  // aspect-[210/297] is A4 portrait — the preview is the print target, so the
  // page is held to the paper's proportion rather than to its content.
  return (
    <article className="document-page relative mx-auto aspect-[210/297] w-full max-w-[794px] shadow-card ring-1 ring-black/5">
      <SealWatermark entityName={resolved.id} />

      <div className="relative flex h-full flex-col px-[8%] py-[6%]">
        {/* ── Masthead ─────────────────────────────────────── */}
        <header className="flex items-start justify-between gap-6 border-b border-[#1A56A8]/25 pb-4">
          <div className="flex min-h-[44px] items-center">
            {resolved.logo ? (
              <img
                src={resolved.logo}
                alt={resolved.name}
                className="h-11 w-auto object-contain object-left"
              />
            ) : (
              /* BAF ships a blank PNG in its logo slot — the wordmark stands in
                 so the letter is still usable, and the missing asset is visible
                 rather than silently rendering an empty box. */
              <span className="text-lg font-bold uppercase tracking-tight text-[#1A56A8]">
                {resolved.name}
              </span>
            )}
          </div>

          <address className="text-right text-[10px] not-italic leading-relaxed text-[#4a4a4a]">
            <span className="block font-semibold text-[#1a1a1a]">{resolved.name}</span>
            {resolved.formerName && (
              <span className="block italic">({resolved.formerName})</span>
            )}
            {resolved.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </header>

        {/* ── Body ─────────────────────────────────────────── */}
        <div className="min-h-0 flex-1 overflow-hidden pt-6">{children}</div>

        {/* ── Contact strip ────────────────────────────────── */}
        <footer className="mt-auto flex items-end justify-between gap-4 border-t border-[#1A56A8]/25 pt-3 text-[9px] leading-relaxed text-[#5a5a5a]">
          <span className="flex flex-wrap gap-x-3">
            {resolved.tel && <span>Tel {resolved.tel}</span>}
            {resolved.fax && <span>Fax {resolved.fax}</span>}
            {resolved.website && <span>{resolved.website}</span>}
          </span>
          {pageCount > 1 && (
            <span className="flex-shrink-0 tabular-nums">
              Page {page} of {pageCount}
            </span>
          )}
        </footer>
      </div>
    </article>
  )
}
