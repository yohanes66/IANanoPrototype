import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AssetListItem from '../../../components/molecules/AssetListItem'
import { ASSETS } from '../../../mock-data/assets'
import { formatIDR } from '../../../utils/formatters'

const web3Assets = ASSETS.filter(a => a.class === 'crypto' && a.category?.includes('Web3'))
const allCrypto = ASSETS.filter(a => a.class === 'crypto')
// Fallback if no Web3 category — use DeFi-ish assets
const displayAssets = web3Assets.length > 0 ? web3Assets : allCrypto.slice(0, 8)

const FILTER_TABS = ['Semua', 'DeFi', 'NFT', 'Gaming', 'Infra']

const WEB3_PROTOCOLS = [
  { name: 'Uniswap', ticker: 'UNI', tvl: 'TVL $4.2B', category: 'DeFi', change: +3.4 },
  { name: 'Aave',    ticker: 'AAVE', tvl: 'TVL $6.1B', category: 'DeFi', change: +1.8 },
  { name: 'Axie',    ticker: 'AXS',  tvl: 'MCap $0.8B', category: 'Gaming', change: -0.9 },
  { name: 'Filecoin',ticker: 'FIL',  tvl: 'Storage 1.2EB', category: 'Infra', change: +2.1 },
]

export default function Web3Tab() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('Semua')

  return (
    <div className="pb-24 space-y-3 px-4 pt-4">
      {/* Header card */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-card p-4 text-white">
        <p className="text-xs font-bold text-purple-200 mb-1">Web3 Ecosystem</p>
        <p className="text-2xl font-extrabold">$48.2B</p>
        <p className="text-xs text-purple-200 mt-0.5">Total Value Locked (TVL) — semua protokol</p>
        <div className="flex gap-4 mt-3 pt-3 border-t border-white/10">
          <div>
            <p className="text-[10px] text-purple-200">Protokol Aktif</p>
            <p className="text-sm font-bold">1,240+</p>
          </div>
          <div>
            <p className="text-[10px] text-purple-200">24h Volume</p>
            <p className="text-sm font-bold">$3.1B</p>
          </div>
          <div>
            <p className="text-[10px] text-purple-200">Pengguna Aktif</p>
            <p className="text-sm font-bold">2.4M</p>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
        {FILTER_TABS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${activeFilter === f ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Top Protocols */}
      <div className="bg-white rounded-card shadow-card p-4">
        <p className="text-xs font-bold text-gray-900 mb-3">Top Protokol</p>
        <div className="space-y-3">
          {WEB3_PROTOCOLS
            .filter(p => activeFilter === 'Semua' || p.category === activeFilter)
            .map(p => (
              <div key={p.ticker} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-extrabold text-purple-700">{p.ticker.slice(0, 2)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.tvl} · {p.category}</p>
                </div>
                <p className={`text-sm font-bold tabular-nums ${p.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {p.change >= 0 ? '+' : ''}{p.change}%
                </p>
              </div>
            ))}
          {WEB3_PROTOCOLS.filter(p => activeFilter === 'Semua' || p.category === activeFilter).length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">Belum ada data untuk kategori ini</p>
          )}
        </div>
      </div>

      {/* Tradable Web3 assets */}
      <div className="bg-white rounded-card shadow-card">
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs font-bold text-gray-900">Aset Web3 Tersedia</p>
        </div>
        <div className="divide-y divide-gray-50 px-4">
          {displayAssets.slice(0, 6).map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
        <button
          onClick={() => navigate('/market/crypto')}
          className="w-full h-12 text-sm font-bold text-purple-600 border-t border-gray-100 active:bg-gray-50"
        >
          Lihat Semua di Crypto →
        </button>
      </div>
    </div>
  )
}
