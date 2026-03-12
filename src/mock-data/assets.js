// Generate realistic-looking OHLCV data for charts
function genOHLCV(basePrice, count = 30) {
  const data = []
  let price = basePrice
  const now = Date.now()
  for (let i = count; i >= 0; i--) {
    const change = (Math.random() - 0.48) * price * 0.03
    const open = price
    const close = price + change
    const high = Math.max(open, close) * (1 + Math.random() * 0.015)
    const low = Math.min(open, close) * (1 - Math.random() * 0.015)
    const volume = Math.floor(Math.random() * 1000000 + 200000)
    data.push({
      date: new Date(now - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume,
    })
    price = close
  }
  return data
}

function genSparkline(basePrice, count = 7) {
  const data = []
  let price = basePrice
  for (let i = 0; i < count; i++) {
    price = price * (1 + (Math.random() - 0.48) * 0.04)
    data.push(+price.toFixed(2))
  }
  return data
}

export const ASSETS = [
  // CRYPTO
  {
    ticker: 'BTC', name: 'Bitcoin', class: 'crypto',
    price: 620000000, priceUSD: 39200,
    change24h: +2.34, change7d: +8.12,
    volume24h: 28500000000000, marketCap: 769000000000,
    sentiment: 'bullish',
    sparkline: genSparkline(620000000),
    ohlcv: genOHLCV(620000000),
    description: 'Bitcoin adalah mata uang kripto pertama dan terbesar di dunia berdasarkan kapitalisasi pasar.',
    category: ['L1', 'Store of Value'],
    iconBg: '#F7931A', iconText: '₿',
  },
  {
    ticker: 'ETH', name: 'Ethereum', class: 'crypto',
    price: 47800000, priceUSD: 3020,
    change24h: +1.87, change7d: +5.44,
    volume24h: 15200000000000, marketCap: 363000000000,
    sentiment: 'bullish',
    sparkline: genSparkline(47800000),
    ohlcv: genOHLCV(47800000),
    description: 'Ethereum adalah platform blockchain terdesentralisasi dengan smart contract.',
    category: ['L1', 'Smart Contract'],
    iconBg: '#627EEA', iconText: 'Ξ',
  },
  {
    ticker: 'BNB', name: 'BNB', class: 'crypto',
    price: 9450000, priceUSD: 598,
    change24h: -0.52, change7d: +2.1,
    volume24h: 1800000000000, marketCap: 91000000000,
    sentiment: 'neutral',
    sparkline: genSparkline(9450000),
    ohlcv: genOHLCV(9450000),
    description: 'BNB adalah token utilitas dari ekosistem Binance.',
    category: ['L1', 'Exchange Token'],
    iconBg: '#F3BA2F', iconText: 'B',
  },
  {
    ticker: 'SOL', name: 'Solana', class: 'crypto',
    price: 2950000, priceUSD: 186,
    change24h: +4.21, change7d: +12.3,
    volume24h: 3200000000000, marketCap: 84000000000,
    sentiment: 'bullish',
    sparkline: genSparkline(2950000),
    ohlcv: genOHLCV(2950000),
    description: 'Solana adalah blockchain berkecepatan tinggi dengan biaya transaksi rendah.',
    category: ['L1', 'Smart Contract'],
    iconBg: '#9945FF', iconText: 'S',
  },
  {
    ticker: 'DOGE', name: 'Dogecoin', class: 'crypto',
    price: 2800, priceUSD: 0.177,
    change24h: -1.23, change7d: -3.2,
    volume24h: 820000000000, marketCap: 25000000000,
    sentiment: 'neutral',
    sparkline: genSparkline(2800),
    ohlcv: genOHLCV(2800),
    description: 'Dogecoin adalah mata uang kripto berbasis meme yang populer.',
    category: ['Meme'],
    iconBg: '#C2A633', iconText: 'D',
  },
  {
    ticker: 'LINK', name: 'Chainlink', class: 'crypto',
    price: 235000, priceUSD: 14.87,
    change24h: +3.1, change7d: +7.8,
    volume24h: 520000000000, marketCap: 8900000000,
    sentiment: 'bullish',
    sparkline: genSparkline(235000),
    ohlcv: genOHLCV(235000),
    description: 'Chainlink adalah jaringan oracle terdesentralisasi.',
    category: ['DeFi', 'Oracle'],
    iconBg: '#2A5ADA', iconText: '⬡',
  },
  // US STOCKS
  {
    ticker: 'AAPL', name: 'Apple Inc.', class: 'us',
    price: 2870000, priceUSD: 181.5,
    change24h: +0.87, change7d: +2.1,
    volume24h: 65000000, marketCap: 2800000000000,
    sentiment: 'bullish',
    sparkline: genSparkline(2870000),
    ohlcv: genOHLCV(2870000),
    description: 'Apple Inc. adalah perusahaan teknologi multinasional terbesar di dunia.',
    category: ['Technology', 'Large Cap'],
    iconBg: '#555555', iconText: '',
  },
  {
    ticker: 'TSLA', name: 'Tesla Inc.', class: 'us',
    price: 3480000, priceUSD: 220,
    change24h: -2.14, change7d: -5.3,
    volume24h: 112000000, marketCap: 700000000000,
    sentiment: 'bearish',
    sparkline: genSparkline(3480000),
    ohlcv: genOHLCV(3480000),
    description: 'Tesla adalah produsen kendaraan listrik dan energi bersih terkemuka.',
    category: ['Technology', 'EV'],
    iconBg: '#CC0000', iconText: 'T',
  },
  {
    ticker: 'NVDA', name: 'NVIDIA Corp.', class: 'us',
    price: 13860000, priceUSD: 877,
    change24h: +3.45, change7d: +11.2,
    volume24h: 43000000, marketCap: 2160000000000,
    sentiment: 'bullish',
    sparkline: genSparkline(13860000),
    ohlcv: genOHLCV(13860000),
    description: 'NVIDIA adalah pemimpin industri dalam chip GPU dan AI.',
    category: ['Technology', 'Semiconductor'],
    iconBg: '#76B900', iconText: 'N',
  },
  {
    ticker: 'MSFT', name: 'Microsoft', class: 'us',
    price: 6320000, priceUSD: 399.5,
    change24h: +0.45, change7d: +1.8,
    volume24h: 21000000, marketCap: 2970000000000,
    sentiment: 'bullish',
    sparkline: genSparkline(6320000),
    ohlcv: genOHLCV(6320000),
    description: 'Microsoft adalah perusahaan perangkat lunak dan cloud terbesar di dunia.',
    category: ['Technology', 'Cloud'],
    iconBg: '#00A4EF', iconText: 'M',
  },
  {
    ticker: 'AMZN', name: 'Amazon.com', class: 'us',
    price: 2970000, priceUSD: 187.8,
    change24h: +1.23, change7d: +3.4,
    volume24h: 35000000, marketCap: 1960000000000,
    sentiment: 'bullish',
    sparkline: genSparkline(2970000),
    ohlcv: genOHLCV(2970000),
    description: 'Amazon adalah raksasa e-commerce dan cloud computing global.',
    category: ['Technology', 'E-Commerce'],
    iconBg: '#FF9900', iconText: 'A',
  },
  // ETF
  {
    ticker: 'QQQ', name: 'Invesco QQQ ETF', class: 'us',
    price: 6970000, priceUSD: 440.8,
    change24h: +0.92, change7d: +2.7,
    volume24h: 40000000, marketCap: 250000000000,
    sentiment: 'bullish',
    sparkline: genSparkline(6970000),
    ohlcv: genOHLCV(6970000),
    description: 'QQQ melacak indeks Nasdaq-100 yang berisi 100 perusahaan non-keuangan terbesar.',
    category: ['ETF', 'Technology'],
    iconBg: '#0066CC', iconText: 'Q',
  },
  // GOLD / COMMODITIES
  {
    ticker: 'GOLD', name: 'Emas (per gram)', class: 'gold',
    price: 1620000, priceUSD: 102.5,
    change24h: +0.34, change7d: +1.2,
    volume24h: 0, marketCap: 0,
    sentiment: 'bullish',
    sparkline: genSparkline(1620000),
    ohlcv: genOHLCV(1620000),
    description: 'Emas adalah logam mulia yang digunakan sebagai penyimpan nilai.',
    category: ['Commodities', 'Safe Haven'],
    iconBg: '#FFD700', iconText: 'Au',
  },
  {
    ticker: 'SILVER', name: 'Perak (per gram)', class: 'commodities',
    price: 18500, priceUSD: 1.17,
    change24h: +0.54, change7d: +2.1,
    volume24h: 0, marketCap: 0,
    sentiment: 'neutral',
    sparkline: genSparkline(18500),
    ohlcv: genOHLCV(18500),
    description: 'Perak adalah logam mulia industri dan investasi.',
    category: ['Commodities'],
    iconBg: '#C0C0C0', iconText: 'Ag',
  },
  {
    ticker: 'OIL', name: 'Minyak Mentah (bbl)', class: 'commodities',
    price: 1245000, priceUSD: 78.7,
    change24h: -0.87, change7d: -2.4,
    volume24h: 0, marketCap: 0,
    sentiment: 'bearish',
    sparkline: genSparkline(1245000),
    ohlcv: genOHLCV(1245000),
    description: 'Minyak mentah West Texas Intermediate (WTI).',
    category: ['Commodities', 'Energy'],
    iconBg: '#8B4513', iconText: '⛽',
  },
  // HK STOCKS
  {
    ticker: '0700.HK', name: 'Tencent Holdings', class: 'hk',
    price: 5450, priceUSD: 345,
    change24h: +1.24, change7d: +3.8,
    volume24h: 18000000, marketCap: 330000000000,
    sentiment: 'bullish',
    sparkline: genSparkline(5450),
    ohlcv: genOHLCV(5450),
    description: 'Tencent adalah konglomerat teknologi terbesar di Tiongkok.',
    category: ['Technology', 'HK'],
    iconBg: '#1AA3FF', iconText: 'T',
  },
  {
    ticker: '9988.HK', name: 'Alibaba Group', class: 'hk',
    price: 1380, priceUSD: 87.3,
    change24h: -0.42, change7d: +1.2,
    volume24h: 22000000, marketCap: 178000000000,
    sentiment: 'neutral',
    sparkline: genSparkline(1380),
    ohlcv: genOHLCV(1380),
    description: 'Alibaba adalah raksasa e-commerce dan cloud Tiongkok.',
    category: ['Technology', 'E-Commerce', 'HK'],
    iconBg: '#FF6600', iconText: 'A',
  },
  // CN STOCKS
  {
    ticker: '600519.SS', name: 'Kweichow Moutai', class: 'cn',
    price: 27200, priceUSD: 1720,
    change24h: +0.78, change7d: +2.3,
    volume24h: 5000000, marketCap: 342000000000,
    sentiment: 'bullish',
    sparkline: genSparkline(27200),
    ohlcv: genOHLCV(27200),
    description: 'Kweichow Moutai adalah produsen baijiu terbesar di Tiongkok.',
    category: ['Consumer', 'CN'],
    iconBg: '#CC0000', iconText: 'M',
  },
]

export const ASSET_MAP = Object.fromEntries(ASSETS.map(a => [a.ticker, a]))

export const TRENDING = {
  crypto: ['BTC', 'ETH', 'SOL', 'DOGE', 'BNB'],
  web3: ['LINK'],
  us: ['NVDA', 'AAPL', 'TSLA', 'MSFT', 'AMZN'],
  gold: ['GOLD', 'SILVER'],
}

export const GAINERS = [...ASSETS]
  .filter(a => a.change24h > 0)
  .sort((a, b) => b.change24h - a.change24h)
  .slice(0, 5)

export const LOSERS = [...ASSETS]
  .filter(a => a.change24h < 0)
  .sort((a, b) => a.change24h - b.change24h)
  .slice(0, 5)

export const TOP_VOLUME = [...ASSETS]
  .sort((a, b) => b.volume24h - a.volume24h)
  .slice(0, 5)
