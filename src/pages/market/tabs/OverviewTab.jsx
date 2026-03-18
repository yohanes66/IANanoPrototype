import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ASSETS } from '../../../mock-data/assets'
import { formatIDR } from '../../../utils/formatters'
import { useDesignVariant } from '../../../context/DesignVariantContext'

// Index mock data for Overview tab
const INDICES = [
  {
    section: 'Crypto',
    path: '/market/crypto',
    color: 'bg-orange-50',
    dotColor: 'bg-orange-500',
    items: [
      { label: 'Bitcoin', ticker: 'BTC', change: +2.34 },
      { label: 'Ethereum', ticker: 'ETH', change: +1.87 },
    ],
  },
  {
    section: 'US Market',
    path: '/market/us',
    color: 'bg-blue-50',
    dotColor: 'bg-blue-500',
    items: [
      { label: 'S&P 500', ticker: 'SPX', price: 5217, change: +0.52 },
      { label: 'Dow Jones', ticker: 'DJIA', price: 39312, change: +0.24 },
      { label: 'NASDAQ', ticker: 'NDQ', price: 16421, change: +0.87 },
    ],
  },
  {
    section: 'HK Market',
    path: '/market/hk',
    color: 'bg-red-50',
    dotColor: 'bg-red-500',
    items: [
      { label: 'Hang Seng Index', ticker: 'HSI', price: 17234, change: -1.21 },
      { label: 'HSCEI', ticker: 'HSCEI', price: 6128, change: -0.87 },
      { label: 'HSTECH', ticker: 'HSTECH', price: 3845, change: -0.43 },
    ],
  },
  {
    section: 'CN Market',
    path: '/market/cn',
    color: 'bg-yellow-50',
    dotColor: 'bg-yellow-500',
    items: [
      { label: 'SSE Composite', ticker: 'SSE', price: 3078, change: +0.41 },
      { label: 'SZSE', ticker: 'SZSE', price: 9823, change: +0.22 },
      { label: 'CSI 300', ticker: 'CSI300', price: 3541, change: +0.35 },
    ],
  },
  {
    section: 'Commodities',
    path: '/market/commodities',
    color: 'bg-yellow-50',
    dotColor: 'bg-yellow-600',
    items: [
      { label: 'Gold', ticker: 'GOLD', change: +0.76 },
      { label: 'Silver', ticker: 'SILVER', change: +1.12 },
      { label: 'Crude Oil', ticker: 'OIL', price: 82.4, change: -0.54 },
    ],
  },
]

const ASSET_MAP = Object.fromEntries(ASSETS.map(a => [a.ticker, a]))

const MOST_TRADED = ['BTC', 'AAPL', 'ETH', 'NVDA', 'TSLA']
const ASSET_SIGNALS = [
  { ticker: 'BTC',  signal: 'Bullish', strength: 82, color: 'text-green-600 bg-green-50' },
  { ticker: 'ETH',  signal: 'Bullish', strength: 71, color: 'text-green-600 bg-green-50' },
  { ticker: 'AAPL', signal: 'Neutral', strength: 50, color: 'text-gray-600 bg-gray-100' },
  { ticker: 'NVDA', signal: 'Bullish', strength: 88, color: 'text-green-600 bg-green-50' },
  { ticker: 'GOLD', signal: 'Bullish', strength: 65, color: 'text-green-600 bg-green-50' },
  { ticker: 'TSLA', signal: 'Bearish', strength: 34, color: 'text-red-600 bg-red-50' },
]
const NANOVEST_PICKS = [
  { ticker: 'NVDA', reason: 'AI chip demand at record high', upside: '+18%' },
  { ticker: 'BTC',  reason: 'ETF inflow momentum strong',   upside: '+24%' },
  { ticker: 'GOLD', reason: 'Hedge vs rate uncertainty',     upside: '+9%' },
]
const AUTOTRADES = [
  { id: 'at1', title: 'Grid Trading', desc: 'Profit di pasar ranging dengan order grid otomatis', path: '/grow/automate', icon: '⚡' },
  { id: 'at2', title: 'Bundle', desc: 'Diversifikasi instan dengan paket aset terkurasi', path: '/grow/automate/bundle', icon: '📦' },
  { id: 'at3', title: 'Recurring Buy', desc: 'DCA otomatis sesuai jadwal yang kamu tentukan', path: '/grow/automate/dca', icon: '🔄' },
  { id: 'at4', title: 'Follow Politicians', desc: 'Salin portofolio politisi AS yang wajib disclose', path: '/grow/automate/copy-trade', icon: '🏛️' },
]

export default function OverviewTab() {
  const navigate = useNavigate()
  const { variant } = useDesignVariant()

  if (variant === 'option2') return <OverviewV2 navigate={navigate} />
  return <OverviewV1 navigate={navigate} />
}

function OverviewV2({ navigate }) {
  const [signalFilter, setSignalFilter] = useState('Semua')

  const bullPct = 62
  const bearPct = 38

  const mostTradedAssets = MOST_TRADED.map(t => ASSET_MAP[t]).filter(Boolean)
  const filteredSignals = signalFilter === 'Semua'
    ? ASSET_SIGNALS
    : ASSET_SIGNALS.filter(s => s.signal === signalFilter)

  return (
    <div className="pb-24 space-y-2">
      {/* AI Market Summary */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F7931A" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
          <span className="text-xs font-bold text-gray-900">AI Market Summary</span>
          <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full ml-auto">Live</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">Pasar crypto menguat dipimpin BTC (+3.2%) setelah CPI AS lebih rendah dari ekspektasi. Saham AS beragam: tech outperform (+1.4%), energi tertekan (-0.8%). Sentimen investor bergeser ke risk-on.</p>
        {/* Bullish/Bearish indicator */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-700">Sentimen Pasar</span>
            <span className="text-xs text-gray-400">{bullPct}% Bullish · {bearPct}% Bearish</span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden flex">
            <div className="bg-green-500 h-full rounded-l-full transition-all" style={{ width: `${bullPct}%` }} />
            <div className="bg-red-400 h-full rounded-r-full transition-all" style={{ width: `${bearPct}%` }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] font-bold text-green-600">🐂 Bullish</span>
            <span className="text-[10px] font-bold text-red-500">🐻 Bearish</span>
          </div>
        </div>
      </div>

      {/* Most Traded in Nano */}
      <div className="bg-white px-4 py-4">
        <p className="text-xs font-bold text-gray-900 mb-3">Most Traded in Nano</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {mostTradedAssets.map((asset, i) => (
            <button
              key={asset.ticker}
              onClick={() => navigate(`/market/asset/${asset.ticker}`)}
              className="flex-shrink-0 bg-gray-50 rounded-xl p-3 w-28 text-left active:bg-gray-100"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-extrabold" style={{ backgroundColor: asset.iconBg }}>
                  {asset.iconText}
                </div>
                <span className="text-xs font-bold text-gray-900">{asset.ticker}</span>
              </div>
              <p className="text-xs font-semibold text-gray-900 tabular-nums">{formatIDR(asset.price, true)}</p>
              <p className={`text-[10px] font-bold tabular-nums ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Asset Signals */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-gray-900">Asset Signals</p>
          <div className="flex gap-1">
            {['Semua', 'Bullish', 'Bearish', 'Neutral'].map(f => (
              <button
                key={f}
                onClick={() => setSignalFilter(f)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${signalFilter === f ? 'bg-surface-dark text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {filteredSignals.map(s => {
            const asset = ASSET_MAP[s.ticker]
            return (
              <div key={s.ticker} className="flex items-center gap-3 py-1.5">
                {asset && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-extrabold flex-shrink-0" style={{ backgroundColor: asset.iconBg }}>
                    {asset.iconText}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">{s.ticker}</p>
                  <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden w-full">
                    <div
                      className={`h-full rounded-full ${s.signal === 'Bullish' ? 'bg-green-500' : s.signal === 'Bearish' ? 'bg-red-400' : 'bg-gray-400'}`}
                      style={{ width: `${s.strength}%` }}
                    />
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.color}`}>{s.signal}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Nanovest Picks */}
      <div className="bg-white px-4 py-4">
        <p className="text-xs font-bold text-gray-900 mb-3">Nanovest Picks</p>
        <div className="space-y-2">
          {NANOVEST_PICKS.map(pick => {
            const asset = ASSET_MAP[pick.ticker]
            return (
              <button
                key={pick.ticker}
                onClick={() => navigate(`/market/asset/${pick.ticker}`)}
                className="w-full flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl p-3 text-left active:opacity-80"
              >
                {asset && (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0" style={{ backgroundColor: asset.iconBg }}>
                    {asset.iconText}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">{pick.ticker}</p>
                  <p className="text-[10px] text-gray-500">{pick.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-green-600">{pick.upside}</p>
                  <p className="text-[10px] text-gray-400">target</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Industry Heatmap */}
      <div className="bg-white px-4 py-4">
        <p className="text-xs font-bold text-gray-900 mb-3">Industry Heatmap</p>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { name: 'Technology', pct: +1.4, size: 'col-span-2' },
            { name: 'Healthcare', pct: +0.3, size: '' },
            { name: 'Financials', pct: -0.2, size: '' },
            { name: 'Consumer', pct: +0.7, size: '' },
            { name: 'Energy', pct: -0.8, size: '' },
            { name: 'Crypto', pct: +3.2, size: '' },
            { name: 'Real Estate', pct: -0.1, size: '' },
            { name: 'Utilities', pct: +0.2, size: '' },
          ].map(item => (
            <div
              key={item.name}
              className={`${item.size} rounded-xl p-2.5 text-center ${item.pct >= 0 ? 'bg-green-500' : 'bg-red-400'}`}
              style={{ opacity: 0.5 + Math.abs(item.pct) / 8 }}
            >
              <p className="text-[9px] font-bold text-white leading-tight">{item.name}</p>
              <p className="text-xs font-extrabold text-white">{item.pct >= 0 ? '+' : ''}{item.pct}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* AutoTrades */}
      <div className="bg-white px-4 py-4">
        <p className="text-xs font-bold text-gray-900 mb-3">AutoTrades</p>
        <div className="grid grid-cols-2 gap-2">
          {AUTOTRADES.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="bg-gray-50 rounded-xl p-3 text-left active:bg-gray-100 transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <p className="text-xs font-bold text-gray-900 mt-1">{item.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function OverviewV1({ navigate }) {

  const getChange = (item) => {
    if (ASSET_MAP[item.ticker]) return ASSET_MAP[item.ticker].change24h
    return item.change || 0
  }

  const getPrice = (item) => {
    if (ASSET_MAP[item.ticker]) return formatIDR(ASSET_MAP[item.ticker].price)
    if (item.price) return item.price.toLocaleString('id-ID')
    return '—'
  }

  return (
    <div className="px-4 py-4 space-y-3 pb-20">
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Market Overview</p>

      {INDICES.map(group => (
        <div
          key={group.section}
          className="bg-white rounded-card shadow-card overflow-hidden"
        >
          <button
            onClick={() => navigate(group.path)}
            className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-50 active:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${group.dotColor}`} />
              <span className="text-sm font-bold text-gray-900">{group.section}</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div className="divide-y divide-gray-50">
            {group.items.map(item => {
              const change = getChange(item)
              const isPositive = change >= 0
              return (
                <div
                  key={item.ticker}
                  className="flex items-center px-4 py-3 active:bg-gray-50 cursor-pointer"
                  onClick={() => ASSET_MAP[item.ticker] && navigate(`/market/asset/${item.ticker}`)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.ticker}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 tabular-nums">{getPrice(item)}</p>
                    <p className={`text-xs font-bold tabular-nums ${isPositive ? 'text-positive' : 'text-negative'}`}>
                      {isPositive ? '+' : ''}{change.toFixed(2)}%
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
