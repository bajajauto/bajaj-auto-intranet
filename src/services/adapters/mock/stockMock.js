// Single-company ticker: Bajaj Auto's live quote followed by its monthly
// sales snapshot. The real service will pull the quote from a live feed and
// the sales figures from the dispatch report in Phase 2.
// Sales figures are internally consistent: Domestic + Exports = Total,
// 2W + Commercial = Total. changePercent is year-on-year.
const TICKER = [
  {
    type: 'quote',
    symbol: 'BAJAJ-AUTO',
    exchange: 'NSE',
    price: 8542.3,
    changePercent: 1.42,
  },
  { type: 'stat', label: 'Total Sales', value: '3,96,420', unit: 'units', changePercent: 8.4 },
  { type: 'stat', label: 'Domestic', value: '2,18,540', unit: 'units', changePercent: 5.2 },
  { type: 'stat', label: 'Exports', value: '1,77,880', unit: 'units', changePercent: 12.6 },
  { type: 'stat', label: 'Motorcycles', value: '3,45,210', unit: 'units', changePercent: 7.1 },
  { type: 'stat', label: 'Commercial Vehicles', value: '51,210', unit: 'units', changePercent: -1.4 },
]

export const stockMock = {
  getAll() {
    return TICKER
  },
}
