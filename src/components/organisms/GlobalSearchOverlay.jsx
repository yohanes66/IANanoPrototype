/**
 * GlobalSearchOverlay — full-page search accessible from Home.
 * Scope: Assets (all classes) + Insights/Articles.
 * Market search remains asset-only and contextually scoped.
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ASSETS } from '../../mock-data/assets'
import { INSIGHTS_DATA } from '../../mock-data/insights'
import { formatIDR } from '../../utils/formatters'
import AssetIcon from '../atoms/AssetIcon'

const TRENDING_TICKERS = ['BTC', 'NVDA', 'AAPL', 'ETH', 'Gold', 'TSLA']
const TRENDING_ASSETS = TRENDING_TICKERS.map(t => ASSETS.find(a => a.ticker === t)).filter(Boolean)

const CLASS_LABEL = {
  crypto: 'Kripto',
  us: 'US Stock',
  commodities: 'Komoditas',
  hk: 'HK',
  cn: 'CN',
}

const CLASS_COLOR = {
  crypto: 'bg-orange-50 text-orange-600',
  us: 'bg-blue-50 text-blue-600',
  commodities: 'bg-yellow-50 text-yellow-700',
  hk: 'bg-red-50 text-red-600',
  cn: 'bg-red-50 text-red-600',
}

export default function GlobalSearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  // Split results: assets & articles
  const q = query.trim().toLowerCase()
  const assetResults = q.length > 0
    ? ASSETS.filter(a =>
        a.ticker.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q)
      ).slice(0, 10)
    : []

  const articleResults = q.length > 0
    ? INSIGHTS_DATA.articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.tags?.some(t => t.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q)
      ).slice(0, 4)
    : []

  const hasResults = assetResults.length > 0 || articleResults.length > 0
  const noResults = q.length > 0 && !hasResults

  useEffect(() => {
    if (isOpen) setQuery('')
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleAsset = (ticker) => {
    onClose()
    navigate(`/market/asset/${ticker}`)
  }

  const handleArticle = (id) => {
    onClose()
    navigate(`/insights/${id}`)
  }

  return (
    <div
      className="absolute inset-0 z-50 bg-[#F5F5F5] flex flex-col"
      style={{ animation: 'gsOverlayIn 0.26s cubic-bezier(0.32,0.72,0,1)' }}
    >
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <div className="flex-1 flex items-center gap-2.5 bg-gray-100 rounded-2xl px-3 h-11">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari aset, artikel, kripto..."
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            autoComplete="off"
            autoFocus
          />
          {query.length > 0 && (
            <button
              onClick={() => setQuery('')}
              className="w-5 h-5 flex items-center justify-center text-gray-400 active:text-gray-600"
              aria-label="Hapus"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-sm font-semibold text-gray-600 px-1 py-2"
          aria-label="Batal"
        >
          Batal
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">

        {/* — Pre-query: trending — */}
        {q.length === 0 && (
          <div className="px-4 pt-5 pb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Trending Sekarang</p>
            <div className="space-y-1">
              {TRENDING_ASSETS.map(asset => (
                <AssetRow key={asset.ticker} asset={asset} onSelect={handleAsset} />
              ))}
            </div>
          </div>
        )}

        {/* — Post-query: categorized results — */}
        {q.length > 0 && hasResults && (
          <div className="px-4 pt-4 pb-6 space-y-5">

            {/* Aset */}
            {assetResults.length > 0 && (
              <section>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                  Aset <span className="font-normal normal-case">({assetResults.length})</span>
                </p>
                <div className="space-y-1">
                  {assetResults.map(asset => (
                    <AssetRow key={asset.ticker} asset={asset} onSelect={handleAsset} />
                  ))}
                </div>
              </section>
            )}

            {/* Artikel */}
            {articleResults.length > 0 && (
              <section>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                  Artikel <span className="font-normal normal-case">({articleResults.length})</span>
                </p>
                <div className="space-y-2">
                  {articleResults.map(article => (
                    <button
                      key={article.id}
                      onClick={() => handleArticle(article.id)}
                      className="w-full bg-white rounded-2xl px-4 py-3 text-left active:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{article.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-semibold text-brand bg-orange-50 px-1.5 py-0.5 rounded-full">{article.category}</span>
                            <span className="text-[10px] text-gray-400">{article.readTime} mnt baca</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* — No results — */}
        {noResults && (
          <div className="flex flex-col items-center justify-center pt-20 px-8 text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <p className="text-sm font-bold text-gray-700">Tidak ditemukan</p>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Coba kata kunci lain seperti <span className="font-semibold text-gray-500">"BTC"</span>, <span className="font-semibold text-gray-500">"Apple"</span>, atau <span className="font-semibold text-gray-500">"crypto"</span>
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes gsOverlayIn {
          from { transform: translateY(100%); opacity: 0.7; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function AssetRow({ asset, onSelect }) {
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
      <div className="text-right flex-shrink-0 mr-2">
        <p className="text-sm font-semibold text-gray-900 tabular-nums">{formatIDR(asset.price)}</p>
        <p className={`text-xs font-semibold tabular-nums ${isPositive ? 'text-positive' : 'text-negative'}`}>
          {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
        </p>
      </div>
      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${CLASS_COLOR[asset.class] || 'bg-gray-100 text-gray-500'}`}>
        {CLASS_LABEL[asset.class] || asset.class}
      </span>
    </button>
  )
}
