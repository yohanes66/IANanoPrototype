import { useState } from 'react'

const FUTURES_PAIRS = [
  { pair: 'BTC-PERP',  price: 1562450000, change: +2.34, funding: '+0.01%', volume: '$1.2B', leverage: '10x' },
  { pair: 'ETH-PERP',  price: 56800000,   change: +1.87, funding: '+0.005%',volume: '$480M', leverage: '10x' },
  { pair: 'SOL-PERP',  price: 2340000,    change: -0.54, funding: '-0.003%',volume: '$120M', leverage: '10x' },
  { pair: 'BNB-PERP',  price: 9120000,    change: +0.72, funding: '+0.008%',volume: '$85M',  leverage: '10x' },
  { pair: 'XRP-PERP',  price: 9800,       change: +1.12, funding: '+0.012%',volume: '$210M', leverage: '10x' },
  { pair: 'DOGE-PERP', price: 2650,       change: -1.23, funding: '-0.015%',volume: '$95M',  leverage: '10x' },
]

const LEVERAGE_OPTIONS = ['2x', '3x', '5x', '10x']

function formatIDRShort(val) {
  if (val >= 1_000_000_000) return `Rp ${(val / 1_000_000_000).toFixed(2)}M`
  if (val >= 1_000_000) return `Rp ${(val / 1_000_000).toFixed(2)}jt`
  if (val >= 1_000) return `Rp ${(val / 1_000).toFixed(0)}rb`
  return `Rp ${val}`
}

export default function FuturesTab() {
  const [sortBy, setSortBy] = useState('volume')
  const [selectedLeverage, setSelectedLeverage] = useState('10x')

  const sorted = [...FUTURES_PAIRS].sort((a, b) => {
    if (sortBy === 'volume') return parseFloat(b.volume) - parseFloat(a.volume)
    if (sortBy === 'change') return Math.abs(b.change) - Math.abs(a.change)
    return 0
  })

  return (
    <div className="pb-24 space-y-3 px-4 pt-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-card p-4 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 mb-1">Futures Perpetual</p>
            <p className="text-2xl font-extrabold">$2.1B</p>
            <p className="text-xs text-gray-400 mt-0.5">Open Interest — semua pasangan</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold bg-yellow-500 text-gray-900 px-2 py-0.5 rounded-full">Beta</span>
            <p className="text-xs text-gray-400 mt-2">Maks. leverage</p>
            <p className="text-sm font-extrabold text-white">10x</p>
          </div>
        </div>
        <div className="flex gap-4 mt-3 pt-3 border-t border-white/10">
          <div>
            <p className="text-[10px] text-gray-400">24h Volume</p>
            <p className="text-xs font-bold">$2.19B</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">Pairs Aktif</p>
            <p className="text-xs font-bold">6</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">Liquidations 24h</p>
            <p className="text-xs font-bold text-red-400">$48M</p>
          </div>
        </div>
      </div>

      {/* Leverage selector */}
      <div className="bg-white rounded-card shadow-card p-4">
        <p className="text-xs font-bold text-gray-700 mb-2">Default Leverage</p>
        <div className="flex gap-2">
          {LEVERAGE_OPTIONS.map(lv => (
            <button
              key={lv}
              onClick={() => setSelectedLeverage(lv)}
              className={`flex-1 h-9 rounded-pill text-xs font-bold transition-colors ${selectedLeverage === lv ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              {lv}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-2">⚠ Trading futures berisiko tinggi. Pastikan Anda memahami risikonya.</p>
      </div>

      {/* Sort controls */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-gray-700">Perpetual Pairs</p>
        <div className="flex gap-1">
          {[{ id: 'volume', label: 'Volume' }, { id: 'change', label: '% Change' }].map(s => (
            <button
              key={s.id}
              onClick={() => setSortBy(s.id)}
              className={`text-[10px] font-bold px-2 py-1 rounded-full transition-colors ${sortBy === s.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pairs list */}
      <div className="bg-white rounded-card shadow-card">
        {/* Column headers */}
        <div className="flex items-center px-4 py-2 border-b border-gray-100">
          <span className="flex-1 text-[10px] font-bold text-gray-400">PAIR</span>
          <span className="w-24 text-right text-[10px] font-bold text-gray-400">HARGA</span>
          <span className="w-14 text-right text-[10px] font-bold text-gray-400">24H</span>
        </div>
        <div className="divide-y divide-gray-50">
          {sorted.map(pair => (
            <div key={pair.pair} className="flex items-center px-4 py-3 active:bg-gray-50 cursor-pointer">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{pair.pair}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-gray-400">Funding: <span className={pair.funding.startsWith('+') ? 'text-green-600' : 'text-red-500'}>{pair.funding}</span></span>
                  <span className="text-[10px] text-gray-400">Vol: {pair.volume}</span>
                </div>
              </div>
              <div className="w-24 text-right">
                <p className="text-sm font-semibold text-gray-900 tabular-nums">{formatIDRShort(pair.price)}</p>
              </div>
              <div className="w-14 text-right">
                <p className={`text-sm font-bold tabular-nums ${pair.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {pair.change >= 0 ? '+' : ''}{pair.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
