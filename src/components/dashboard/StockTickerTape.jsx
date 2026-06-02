import { useStockTicker } from '@/hooks/useStockTicker'

function formatPrice(price) {
  return price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function TickerEntry({ stock }) {
  const isDown = stock.changePercent < 0
  const changeColor = isDown ? 'text-red-400' : 'text-emerald-400'
  const symbolClass = stock.isPrimary
    ? 'text-amber-300'
    : 'text-white'

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className={`text-[13px] font-bold tracking-wide ${symbolClass}`}>{stock.symbol}</span>
      <span className="text-[13px] font-medium text-white/95">{formatPrice(stock.price)}</span>
      <span className={`inline-flex items-center gap-0.5 text-[13px] font-semibold ${changeColor}`}>
        <span aria-hidden="true" className="text-[10px] leading-none">
          {isDown ? '▼' : '▲'}
        </span>
        {Math.abs(stock.changePercent).toFixed(2)}%
      </span>
    </span>
  )
}

export default function StockTickerTape() {
  const stocks = useStockTicker()

  if (stocks.length === 0) return null

  return (
    <div
      className="relative overflow-hidden bg-slate-900/90 backdrop-blur-sm"
      role="region"
      aria-label="Live stock prices"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-slate-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-slate-900 to-transparent" />

      <div className="ticker-tape-viewport flex py-2">
        <div className="ticker-tape-track flex flex-shrink-0 items-center gap-10 pr-10">
          {stocks.map((stock) => (
            <TickerEntry key={`a-${stock.symbol}`} stock={stock} />
          ))}
        </div>
        <div
          className="ticker-tape-track flex flex-shrink-0 items-center gap-10 pr-10"
          aria-hidden="true"
        >
          {stocks.map((stock) => (
            <TickerEntry key={`b-${stock.symbol}`} stock={stock} />
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
