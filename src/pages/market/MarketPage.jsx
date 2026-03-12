import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MarketTabBar from '../../components/organisms/MarketTabBar'
import { ASSETS } from '../../mock-data/assets'
import { formatIDR } from '../../utils/formatters'
import AssetIcon from '../../components/atoms/AssetIcon'

const CLASS_LABEL = { crypto: 'Kripto', us: 'US Stock', commodities: 'Komoditas', hk: 'HK', cn: 'CN' }

export default function MarketPage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const results = query.trim().length > 0
    ? ASSETS.filter(a =>
        a.ticker.toLowerCase().includes(query.toLowerCase()) ||
        a.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 20)
    : []

  const openSearch = () => {
    setSearchOpen(true)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
  }

  const handleSelect = (ticker) => {
    closeSearch()
    navigate(`/market/asset/${ticker}`)
  }

  // Close on Escape
  useEffect(() => {
    if (!searchOpen) return
    const handler = (e) => { if (e.key === 'Escape') closeSearch() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [searchOpen])

  return (
    <div className="flex flex-col">
      {/* Sticky: title + search + tab bar */}
      <div className="sticky top-0 z-20 bg-white">
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          <h1 className="text-xl font-extrabold text-gray-900 flex-1">Market</h1>
          <button
            onClick={openSearch}
            className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors"
            aria-label="Cari aset"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        </div>
        <MarketTabBar />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>

      {/* Universal Search Overlay */}
      {searchOpen && (
        <div className="absolute inset-0 z-50 bg-[#F5F5F5] flex flex-col"
          style={{ animation: 'slideUpFull 0.28s cubic-bezier(0.32,0.72,0,1)' }}>

          {/* Search Header */}
          <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-2xl px-3 h-11">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari saham, kripto, komoditas..."
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                autoComplete="off"
                autoFocus
              />
              {query.length > 0 && (
                <button onClick={() => setQuery('')} className="text-gray-400 p-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
            <button onClick={closeSearch} className="text-sm font-semibold text-gray-600 px-1">
              Batal
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {query.trim().length === 0 ? (
              <div className="px-4 pt-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Aset Populer</p>
                <div className="space-y-1">
                  {ASSETS.slice(0, 8).map(asset => (
                    <SearchRow key={asset.ticker} asset={asset} onSelect={handleSelect} />
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="px-4 pt-3">
                <p className="text-xs text-gray-400 mb-2">{results.length} hasil untuk "{query}"</p>
                <div className="space-y-1">
                  {results.map(asset => (
                    <SearchRow key={asset.ticker} asset={asset} onSelect={handleSelect} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-20 px-8 text-center">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
                <p className="text-sm font-bold text-gray-700">Aset tidak ditemukan</p>
                <p className="text-xs text-gray-400 mt-1">Coba kata kunci lain seperti "BTC" atau "Apple"</p>
              </div>
            )}
          </div>

          <style>{`
            @keyframes slideUpFull {
              from { transform: translateY(100%); opacity: 0.6; }
              to   { transform: translateY(0);    opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}

function SearchRow({ asset, onSelect }) {
  const isPositive = asset.change24h >= 0
  return (
    <button
      onClick={() => onSelect(asset.ticker)}
      className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3 active:bg-gray-50 transition-colors"
    >
      <AssetIcon asset={asset} size="sm" />
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm font-bold text-gray-900">{asset.ticker}</p>
        <p className="text-xs text-gray-400 truncate">{asset.name}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-semibold text-gray-900 tabular-nums">{formatIDR(asset.price)}</p>
        <p className={`text-xs font-semibold tabular-nums ${isPositive ? 'text-positive' : 'text-negative'}`}>
          {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
        </p>
      </div>
      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${
        asset.class === 'crypto' ? 'bg-orange-50 text-orange-600' :
        asset.class === 'us' ? 'bg-blue-50 text-blue-600' :
        'bg-gray-100 text-gray-500'
      }`}>
        {CLASS_LABEL[asset.class] || asset.class}
      </span>
    </button>
  )
}
