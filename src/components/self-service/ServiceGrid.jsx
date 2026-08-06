import { Gauge } from 'lucide-react'
import { services } from '@/config/services.config'
import ServiceTile from './ServiceTile'

/*
 * Pitstop rows — each row is one errand, so each row is one colour.
 *
 * Order and colour live together here on purpose: they used to be split across
 * two files (order here, colour keyed by category in ServiceTile), which is why
 * the palette scattered — tiles were ordered by how often they get used, but
 * coloured by what they are, so neither pattern was legible in the grid.
 *
 * Within a row, tiles run most-used on the left to least-used on the right.
 *
 * The row tones now come from the artwork rather than working around it: the
 * pay-and-health row takes the wellness lotus's green, the growth row takes the
 * idea bulb's amber. That was impossible while those icons carried their own
 * colours — a green lotus on a green badge disappears — and became available
 * once they were recoloured to white in ServiceIcons.
 *
 * Holiday calendar is the last icon still carrying its own palette (cyan). It
 * sits in the blue row, which is close enough in hue to read as deliberate;
 * moving it onto amber or green would bring a clash back.
 *
 * Rows resolve exactly at lg and up, where the grid is 5 across. Below that
 * (4 and 3 columns) the groups stay contiguous but wrap mid-row — which also
 * means the per-column lightening ramp wraps with them, so the gradient reads
 * as left-to-right only at lg and up. It stays a subtle shading either way.
 */
const pitstopRows = [
  {
    tone: 'blue',
    label: 'Work and time',
    ids: ['team-directory', 'leave-attendance', 'holiday-calendar', 'travel', 'policies'],
  },
  {
    tone: 'green',
    label: 'Pay, benefits and health',
    ids: ['compensation', 'benefits', 'documents', 'mediclaim', 'health-wellness'],
  },
  {
    tone: 'amber',
    label: 'Growth and recognition',
    ids: ['recognition-gem', 'idea-hub', 'bolt-learning', 'performance-management', 'it-summit'],
  },
]

// Flatten the rows into render order, carrying each tile's row tone with it and
// its position within the row, which ServiceTile uses to pick a step off the
// tone's lightening ramp. The index is taken after filtering so a disabled
// service leaves no gap in the ramp.
function orderServices(enabled) {
  return pitstopRows.flatMap((row) =>
    row.ids
      .map((id) => enabled.find((service) => service.id === id))
      .filter(Boolean)
      .map((service, step) => ({ ...service, tone: row.tone, step })),
  )
}

export default function ServiceGrid({ title }) {
  const enabled = services.filter((s) => s.enabled)
  const orderedServices = orderServices(enabled)

  // First step of the page-wide blush/cream alternation — see the tint palette
  // note in index.css. Pitstop is the odd position, so it takes blush.
  return (
    <div className="site-surface-tint tint-blush rounded-card border p-3 sm:p-4">
      {title && (
        <div className="mb-3 flex items-center gap-2.5 sm:mb-4">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-dark text-white shadow-sm ring-1 ring-inset ring-white/20">
            <Gauge size={18} strokeWidth={2} />
          </span>
          <h2 className="text-lg font-bold leading-none text-brand-primary">{title}</h2>
        </div>
      )}
      <div className="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-4 sm:gap-y-5 lg:grid-cols-5">
        {orderedServices.map((service) => (
          <ServiceTile key={service.id} {...service} />
        ))}
      </div>
    </div>
  )
}
