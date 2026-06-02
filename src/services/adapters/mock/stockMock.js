// Sample NSE prices; the real service will pull from a live feed in Phase 2.
// Bajaj Auto is flagged as the primary ticker so the component can highlight it.
const TICKER = [
  { symbol: 'BAJAJ-AUTO', price: 8542.3, changePercent: 1.42, isPrimary: true },
  { symbol: 'BAJFINANCE', price: 6889.05, changePercent: -2.11 },
  { symbol: 'BAJAJFINSV', price: 1612.4, changePercent: 0.84 },
  { symbol: 'RELIANCE', price: 2891.6, changePercent: 0.62 },
  { symbol: 'TCS', price: 4148.7, changePercent: -0.35 },
  { symbol: 'INFY', price: 1842.15, changePercent: 1.05 },
  { symbol: 'HDFCBANK', price: 1742.7, changePercent: -0.25 },
  { symbol: 'ICICIBANK', price: 1240.55, changePercent: 0.74 },
  { symbol: 'SBIN', price: 812.4, changePercent: -1.18 },
  { symbol: 'TATAMOTORS', price: 745.9, changePercent: 2.06 },
  { symbol: 'MARUTI', price: 12810.2, changePercent: -0.42 },
  { symbol: 'M&M', price: 2945.8, changePercent: 0.91 },
  { symbol: 'HEROMOTOCO', price: 5320.45, changePercent: -0.66 },
  { symbol: 'BHARTIARTL', price: 1810.6, changePercent: -1.01 },
  { symbol: 'HINDUNILVR', price: 2384.3, changePercent: -3.21 },
  { symbol: 'NIFTY 50', price: 24812.55, changePercent: 0.18 },
  { symbol: 'SENSEX', price: 81465.7, changePercent: 0.22 },
]

export const stockMock = {
  getAll() {
    return TICKER
  },
}
