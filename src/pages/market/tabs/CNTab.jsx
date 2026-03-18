import { useState } from 'react'
import MarketPulseCard from '../../../components/molecules/MarketPulseCard'
import AssetListItem from '../../../components/molecules/AssetListItem'
import SectionHeader from '../../../components/molecules/SectionHeader'
import Chip from '../../../components/atoms/Chip'
import { MARKET_DATA } from '../../../mock-data/market'
import { ASSETS } from '../../../mock-data/assets'
import { useDesignVariant } from '../../../context/DesignVariantContext'

const MOVERS_TABS = ['Gainers', 'Losers', 'Top Vol']
const CATEGORIES = ['Semua', 'Consumer', 'Finance', 'Industrial', 'Technology', 'Healthcare']

const cnAssets = ASSETS.filter(a => a.class === 'cn')
const GAINERS = [...cnAssets].filter(a => a.change24h > 0).sort((a, b) => b.change24h - a.change24h)
const LOSERS = [...cnAssets].filter(a => a.change24h < 0).sort((a, b) => a.change24h - b.change24h)
const TOP_VOL = [...cnAssets].sort((a, b) => b.volume24h - a.volume24h)

export default function CNTab() {
  const { variant } = useDesignVariant()
  const [moversTab, setMoversTab] = useState('Gainers')
  const [activeCategory, setActiveCategory] = useState('Semua')

  const moversData = moversTab === 'Gainers' ? GAINERS : moversTab === 'Losers' ? LOSERS : TOP_VOL
  const preview = moversData.length > 0 ? moversData : cnAssets

  return (
    <div className="px-4 py-4 space-y-4 pb-20">
      {variant === 'option2' && <CNMarketDashboard />}
      {/* AI Market Pulse */}
      <MarketPulseCard data={MARKET_DATA.marketPulse.cn} />

      {/* Movers */}
      <div className="bg-white rounded-card shadow-card p-4">
        <p className="text-sm font-bold text-gray-900 mb-2">CN Stocks & ETF Movers</p>
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
          {preview.slice(0, 5).map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
      </div>

      {/* Tools */}
      <div>
        <p className="text-sm font-bold text-gray-900 mb-3">Tools</p>
        <div className="grid grid-cols-3 gap-2">
          <ToolCard icon={<CalendarIcon />} title="Earnings Calendar" color="from-blue-50 to-blue-100" />
          <ToolCard icon={<DividendIcon />} title="Dividend Calendar" color="from-green-50 to-green-100" />
          <ToolCard icon={<EcoIcon />} title="Economic Calendar" color="from-purple-50 to-purple-100" />
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
        <SectionHeader title="Saham Tiongkok" />
        <div className="divide-y divide-gray-50">
          {cnAssets.map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ToolCard({ icon, title, color, onClick }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-3 cursor-pointer active:opacity-80`} onClick={onClick}>
      {icon}
      <p className="text-xs font-bold text-gray-900 mt-2 leading-tight">{title}</p>
    </div>
  )
}

function CNMarketDashboard() {
  const now = new Date()
  const wibHour = (now.getUTCHours() + 7) % 24
  const isOpen = wibHour >= 8 && wibHour < 15
  const CALENDAR = [
    { date: '20 Mar', event: 'PBoC Loan Prime Rate', impact: 'High', color: 'text-red-600 bg-red-50' },
    { date: '21 Mar', event: 'China PMI Manufacturing', impact: 'High', color: 'text-red-600 bg-red-50' },
    { date: '26 Mar', event: 'Industrial Profits YoY', impact: 'Medium', color: 'text-yellow-600 bg-yellow-50' },
  ]
  return (
    <div className="space-y-3">
      <div className="bg-white rounded-card shadow-card p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-gray-900">SSE / SZSE</p>
          <p className="text-xs text-gray-400 mt-0.5">Jam buka: 08:30 – 15:00 WIB</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isOpen ? 'bg-green-100' : 'bg-gray-100'}`}>
          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className={`text-xs font-bold ${isOpen ? 'text-green-700' : 'text-gray-500'}`}>{isOpen ? 'Open' : 'Closed'}</span>
        </div>
      </div>
      <div className="bg-white rounded-card shadow-card p-4">
        <p className="text-xs font-bold text-gray-900 mb-3">Economic Calendar</p>
        <div className="space-y-2">
          {CALENDAR.map(ev => (
            <div key={ev.event} className="flex items-center gap-3">
              <div className="w-10 shrink-0"><p className="text-[9px] font-bold text-gray-500">{ev.date}</p></div>
              <div className="flex-1 min-w-0"><p className="text-xs text-gray-800 font-medium">{ev.event}</p></div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${ev.color}`}>{ev.impact}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  )
}

function DividendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  )
}

function EcoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  )
}
