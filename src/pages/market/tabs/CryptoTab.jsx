import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MarketPulseCard from '../../../components/molecules/MarketPulseCard'
import AssetListItem from '../../../components/molecules/AssetListItem'
import SectionHeader from '../../../components/molecules/SectionHeader'
import GainersLosersTable from '../../../components/organisms/GainersLosersTable'
import Chip from '../../../components/atoms/Chip'
import { MARKET_DATA } from '../../../mock-data/market'
import { ASSETS, TRENDING } from '../../../mock-data/assets'
import { useDesignVariant } from '../../../context/DesignVariantContext'

const CATEGORIES = ['Semua', 'L1', 'DeFi', 'Web3', 'Meme', 'Exchange']
const MOVERS_TABS = ['Gainers', 'Losers', 'Top Vol']

const cryptoAssets = ASSETS.filter(a => a.class === 'crypto')
const web3Assets = cryptoAssets.filter(a => a.category?.includes('Web3'))
const GAINERS = [...cryptoAssets].filter(a => a.change24h > 0).sort((a, b) => b.change24h - a.change24h)
const LOSERS = [...cryptoAssets].filter(a => a.change24h < 0).sort((a, b) => a.change24h - b.change24h)
const TOP_VOL = [...cryptoAssets].sort((a, b) => b.volume24h - a.volume24h)
const W3_GAINERS = [...web3Assets].filter(a => a.change24h > 0).sort((a, b) => b.change24h - a.change24h)
const W3_LOSERS = [...web3Assets].filter(a => a.change24h < 0).sort((a, b) => a.change24h - b.change24h)
const W3_TOP_VOL = [...web3Assets].sort((a, b) => b.volume24h - a.volume24h)

export default function CryptoTab() {
  const navigate = useNavigate()
  const { variant } = useDesignVariant()
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [moversTab, setMoversTab] = useState('Gainers')
  const [web3MoversTab, setWeb3MoversTab] = useState('Gainers')

  const filtered = activeCategory === 'Semua'
    ? cryptoAssets
    : cryptoAssets.filter(a => a.category.includes(activeCategory))

  const moversData = moversTab === 'Gainers' ? GAINERS : moversTab === 'Losers' ? LOSERS : TOP_VOL
  const web3MoversData = web3MoversTab === 'Gainers' ? W3_GAINERS : web3MoversTab === 'Losers' ? W3_LOSERS : W3_TOP_VOL

  return (
    <div className="px-4 py-4 space-y-4 pb-20">
      {/* Option 2: Rainbow chart dashboard */}
      {variant === 'option2' && <CryptoDashboard />}
      {/* AI Market Pulse */}
      <MarketPulseCard data={MARKET_DATA.marketPulse.crypto} />

      {/* Movers */}
      <div className="bg-white rounded-card shadow-card p-4">
        <p className="text-sm font-bold text-gray-900 mb-2">Crypto Spot Movers</p>
        <div className="flex gap-1 mb-3">
          {MOVERS_TABS.map(t => (
            <button
              key={t}
              onClick={() => setMoversTab(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${moversTab === t ? 'bg-surface-dark text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="divide-y divide-gray-50">
          {moversData.slice(0, 5).map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
      </div>

      {/* Web3 Movers */}
      <div className="bg-white rounded-card shadow-card p-4">
        <p className="text-sm font-bold text-gray-900 mb-2">Web3 Movers</p>
        <div className="flex gap-1 mb-3">
          {MOVERS_TABS.map(t => (
            <button
              key={t}
              onClick={() => setWeb3MoversTab(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${web3MoversTab === t ? 'bg-surface-dark text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="divide-y divide-gray-50">
          {(web3MoversData.length > 0 ? web3MoversData : cryptoAssets).slice(0, 5).map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
      </div>

      {/* Tools */}
      <div>
        <p className="text-sm font-bold text-gray-900 mb-3">Tools</p>
        <div className="grid grid-cols-2 gap-3">
          <ToolCard
            icon={<GadaiIcon />}
            title="Gadai Digital"
            subtitle="Pinjam IDR, Hold Kripto"
            color="from-purple-50 to-purple-100"
            onClick={() => navigate('/grow/gadai')}
          />
          <ToolCard
            icon={<SwapIcon />}
            title="NBT Xchange"
            subtitle="Swap token instan"
            color="from-blue-50 to-blue-100"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="text-sm font-bold text-gray-900 mb-3">Kategori</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {CATEGORIES.map(cat => (
            <Chip key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
          ))}
        </div>
      </div>

      {/* Asset list */}
      <div className="bg-white rounded-card shadow-card p-4">
        <SectionHeader title={`Crypto${activeCategory !== 'Semua' ? ` · ${activeCategory}` : ''}`} />
        <div className="divide-y divide-gray-50">
          {filtered.map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ToolCard({ icon, title, subtitle, color, onClick }) {
  return (
    <div
      className={`bg-gradient-to-br ${color} rounded-2xl p-4 cursor-pointer active:opacity-80`}
      onClick={onClick}
    >
      {icon}
      <p className="text-sm font-bold text-gray-900 mt-2">{title}</p>
      <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
    </div>
  )
}

function CryptoDashboard() {
  // Rainbow chart: visual price zone bands (mock BTC cycle indicator)
  const zones = [
    { label: 'Fire Sale', color: '#1D4ED8', pct: 8 },
    { label: 'Buy',       color: '#2563EB', pct: 10 },
    { label: 'Accumulate',color: '#059669', pct: 14 },
    { label: 'Hold',      color: '#10B981', pct: 16 },
    { label: 'Still Cheap',color:'#84CC16', pct: 14 },
    { label: 'HODL',      color: '#EAB308', pct: 12 },
    { label: 'Is It Bubble?',color:'#F97316', pct: 10 },
    { label: 'FOMO',      color: '#EF4444', pct: 9 },
    { label: 'Maximum Bubble',color:'#7C3AED',pct:7 },
  ]
  // Current price pointer at ~55% (Hold zone)
  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-gray-900">BTC Rainbow Chart</p>
        <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">HODL Zone</span>
      </div>
      <p className="text-[10px] text-gray-400 mb-3">Logarithmic regression — ciclic market indicator</p>
      <div className="rounded-xl overflow-hidden flex flex-col-reverse h-28">
        {zones.map(z => (
          <div key={z.label} className="flex items-center px-2 transition-all" style={{ height: `${z.pct}%`, backgroundColor: z.color }}>
            <span className="text-[8px] font-bold text-white/80 truncate">{z.label}</span>
          </div>
        ))}
      </div>
      {/* Price marker */}
      <div className="mt-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-900" />
        <span className="text-xs font-bold text-gray-900">Saat ini: HODL Zone</span>
        <span className="text-xs text-gray-400 ml-auto">Update: live</span>
      </div>
    </div>
  )
}

function GadaiIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}

function SwapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16V4m0 0L3 8m4-4 4 4"/><path d="M17 8v12m0 0 4-4m-4 4-4-4"/>
    </svg>
  )
}
