export const MARKET_DATA = {
  marketPulse: {
    crypto: {
      sentiment: 'bullish', score: 72,
      summary: 'Bitcoin menembus resistensi $39K dengan volume tinggi. Altcoin season berpotensi dimulai. Fear & Greed Index menunjukkan keserakahan (72).',
    },
    us: {
      sentiment: 'neutral', score: 54,
      summary: 'Pasar saham AS mixed jelang keputusan suku bunga Fed. Sektor teknologi outperform, energi tertekan akibat penurunan harga minyak.',
    },
    commodities: {
      sentiment: 'bullish', score: 68,
      summary: 'Emas menguat dipicu ketidakpastian geopolitik. Permintaan fisik dari bank sentral Asia meningkat signifikan QoQ.',
    },
    hk: {
      sentiment: 'bearish', score: 38,
      summary: 'Pasar Hong Kong tertekan oleh kekhawatiran pertumbuhan ekonomi Tiongkok. Hang Seng turun 1.2% secara mingguan.',
    },
    cn: {
      sentiment: 'neutral', score: 51,
      summary: 'Stimulus fiskal Tiongkok mendukung sektor konsumer dan manufaktur. Data PMI Maret sedikit di atas ekspektasi.',
    },
  },
  industrySegments: {
    us: [
      { name: 'Technology', pct: 28.5, change: +1.2 },
      { name: 'Healthcare', pct: 13.2, change: -0.4 },
      { name: 'Financials', pct: 13.0, change: +0.3 },
      { name: 'Consumer', pct: 10.8, change: +0.8 },
      { name: 'Industrials', pct: 8.9, change: -0.1 },
      { name: 'Energy', pct: 4.2, change: -1.8 },
    ],
    hk: [
      { name: 'Finance', pct: 32.1, change: -0.9 },
      { name: 'Real Estate', pct: 18.4, change: -1.2 },
      { name: 'Technology', pct: 22.7, change: +0.6 },
      { name: 'Consumer', pct: 14.3, change: +0.2 },
      { name: 'Industrial', pct: 12.5, change: -0.3 },
    ],
    cn: [
      { name: 'Consumer', pct: 29.3, change: +1.1 },
      { name: 'Finance', pct: 21.5, change: -0.2 },
      { name: 'Industrial', pct: 18.7, change: +0.4 },
      { name: 'Technology', pct: 17.8, change: +0.7 },
      { name: 'Healthcare', pct: 12.7, change: -0.5 },
    ],
  },
  economicCalendar: [
    { date: '2026-03-15', event: 'Keputusan Suku Bunga Fed', impact: 'high', region: 'US' },
    { date: '2026-03-18', event: 'CPI Inflation AS (Feb)', impact: 'high', region: 'US' },
    { date: '2026-03-20', event: 'PMI Manufaktur Tiongkok', impact: 'medium', region: 'CN' },
    { date: '2026-03-22', event: 'GDP Inggris Q4 Final', impact: 'medium', region: 'HK' },
    { date: '2026-03-25', event: 'Penjualan Ritel AS', impact: 'medium', region: 'US' },
  ],
  dividends: [
    { ticker: 'AAPL', exDate: '2026-03-20', amount: 0.25, currency: 'USD', yieldPct: 0.55 },
    { ticker: 'MSFT', exDate: '2026-03-22', amount: 0.75, currency: 'USD', yieldPct: 0.75 },
    { ticker: 'AMZN', exDate: '2026-04-01', amount: null, currency: 'USD', yieldPct: null },
    { ticker: 'QQQ', exDate: '2026-03-28', amount: 0.54, currency: 'USD', yieldPct: 0.49 },
  ],
  analystRatings: [
    { ticker: 'NVDA', rating: 'Strong Buy', targetPrice: 950, upside: +8.3 },
    { ticker: 'AAPL', rating: 'Buy', targetPrice: 210, upside: +15.7 },
    { ticker: 'TSLA', rating: 'Hold', targetPrice: 215, upside: -2.3 },
    { ticker: 'MSFT', rating: 'Buy', targetPrice: 450, upside: +12.7 },
  ],
}
