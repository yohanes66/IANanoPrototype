export const PORTFOLIO = {
  user: {
    id: 'u001',
    name: 'Yohanes Nico',
    avatar: null,
    tier: 'gold',
    rewardPoints: 12450,
  },
  summary: {
    totalAUM: 284750000,
    unrealizedPnL: 12340000,
    unrealizedPnLPct: 4.53,
    realizedPnL: 3200000,
    realizedPnLPct: 1.18,
  },
  allocation: {
    cash: { total: 45000000, pct: 15.8 },
    assets: { total: 210000000, pct: 73.7 },
    grow: { total: 29750000, pct: 10.5 },
    cashBreakdown: { IDR: 20000000, USD: 1500, HKD: 8000, RMB: 5000, SGD: 500 },
    assetsBreakdown: { Crypto: 40, US: 25, HK: 15, CN: 10, Gold: 10 },
    growBreakdown: { Earn: 50, Staking: 30, Bonds: 20 },
  },
  holdings: {
    crypto: [
      { ticker: 'BTC', qty: 0.0432, avgBuyPrice: 571000000, valueIDR: 26784000, unrealizedPnLPct: 8.6 },
      { ticker: 'ETH', qty: 0.85, avgBuyPrice: 44000000, valueIDR: 40630000, unrealizedPnLPct: 8.6 },
      { ticker: 'BNB', qty: 2.5, avgBuyPrice: 9100000, valueIDR: 23625000, unrealizedPnLPct: 3.8 },
      { ticker: 'SOL', qty: 12, avgBuyPrice: 2600000, valueIDR: 35400000, unrealizedPnLPct: 13.5 },
    ],
    us: [
      { ticker: 'AAPL', qty: 5, avgBuyPrice: 2720000, valueIDR: 14350000, unrealizedPnLPct: 5.5 },
      { ticker: 'NVDA', qty: 2, avgBuyPrice: 12400000, valueIDR: 27720000, unrealizedPnLPct: 11.8 },
      { ticker: 'TSLA', qty: 3, avgBuyPrice: 3800000, valueIDR: 10440000, unrealizedPnLPct: -8.4 },
      { ticker: 'QQQ', qty: 4, avgBuyPrice: 6500000, valueIDR: 27880000, unrealizedPnLPct: 7.2 },
    ],
    hk: [
      { ticker: '0700.HK', qty: 100, avgBuyPrice: 5200, valueIDR: 545000, unrealizedPnLPct: 4.8 },
      { ticker: '9988.HK', qty: 200, avgBuyPrice: 1450, valueIDR: 276000, unrealizedPnLPct: -4.8 },
    ],
    cn: [
      { ticker: '600519.SS', qty: 1, avgBuyPrice: 26000, valueIDR: 27200, unrealizedPnLPct: 4.6 },
    ],
    sg: [],
    gold: [
      { ticker: 'GOLD', qty: 5, avgBuyPrice: 1580000, valueIDR: 8100000, unrealizedPnLPct: 2.5 },
    ],
  },
}
