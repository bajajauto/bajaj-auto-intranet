import { useStockTicker } from '@/hooks/useStockTicker'

function formatPrice(price) {
  return price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function ChangeBadge({ changePercent }) {
  const isDown = changePercent < 0
  const changeColor = isDown ? 'text-red-400' : 'text-emerald-400'
  return (
    <span className={`inline-flex items-center gap-0.5 text-[13px] font-semibold ${changeColor}`}>
      <span aria-hidden="true" className="text-[10px] leading-none">
        {isDown ? '▼' : '▲'}
      </span>
      {Math.abs(changePercent).toFixed(2)}%
    </span>
  )
}

function QuoteEntry({ item }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className="text-[13px] font-bold tracking-wide text-amber-300">{item.symbol}</span>
      <span className="text-[13px] font-medium text-white/95">{formatPrice(item.price)}</span>
      <ChangeBadge changePercent={item.changePercent} />
    </span>
  )
}

function StatEntry({ item }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className="text-[13px] font-semibold uppercase tracking-wide text-white/60">
        {item.label}
      </span>
      <span className="text-[13px] font-bold text-white/95">{item.value}</span>
      {item.unit && <span className="text-[11px] font-medium text-white/45">{item.unit}</span>}
      <ChangeBadge changePercent={item.changePercent} />
    </span>
  )
}

function TickerEntry({ item }) {
  return item.type === 'stat' ? <StatEntry item={item} /> : <QuoteEntry item={item} />
}

export default function StockTickerTape() {
  const items = useStockTicker()

  if (items.length === 0) return null

  return (
    <div
      className="relative overflow-hidden bg-slate-900/95 backdrop-blur-sm"
      role="region"
      aria-label="Bajaj Auto stock price and sales"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-slate-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-slate-900 to-transparent" />

      <div className="ticker-tape-viewport flex items-center py-2">
        <div className="ticker-tape-track flex flex-shrink-0 items-center gap-10 pr-10">
          {items.map((item) => (
            <TickerEntry key={`a-${item.symbol ?? item.label}`} item={item} />
          ))}
        </div>
        <div
          className="ticker-tape-track flex flex-shrink-0 items-center gap-10 pr-10"
          aria-hidden="true"
        >
          {items.map((item) => (
            <TickerEntry key={`b-${item.symbol ?? item.label}`} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-tape-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        .ticker-tape-track {
          animation: ticker-tape-scroll 60s linear infinite;
          will-change: transform;
        }
        .ticker-tape-viewport:hover .ticker-tape-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-tape-track {
            animation-duration: 180s;
          }
        }
      `}</style>
    </div>
  )
}
