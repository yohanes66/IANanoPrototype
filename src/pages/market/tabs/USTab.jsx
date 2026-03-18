import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MarketPulseCard from '../../../components/molecules/MarketPulseCard'
import AssetListItem from '../../../components/molecules/AssetListItem'
import SectionHeader from '../../../components/molecules/SectionHeader'
import Chip from '../../../components/atoms/Chip'
import { MARKET_DATA } from '../../../mock-data/market'
import { ASSETS, TRENDING } from '../../../mock-data/assets'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import { useDesignVariant } from '../../../context/DesignVariantContext'

const MOVERS_TABS = ['Gainers', 'Losers', 'Top Vol']
const CATEGORIES = ['Semua', 'Technology', 'Healthcare', 'Financials', 'Consumer', 'Energy']

const usAssets = ASSETS.filter(a => a.class === 'us')
const GAINERS = [...usAssets].filter(a => a.change24h > 0).sort((a, b) => b.change24h - a.change24h)
const LOSERS = [...usAssets].filter(a => a.change24h < 0).sort((a, b) => a.change24h - b.change24h)
const TOP_VOL = [...usAssets].sort((a, b) => b.volume24h - a.volume24h)

export default function USTab() {
  const navigate = useNavigate()
  const { variant } = useDesignVariant()
  const [moversTab, setMoversTab] = useState('Gainers')
  const [activeCategory, setActiveCategory] = useState('Semua')

  const trendingUS = TRENDING.us.map(t => ASSETS.find(a => a.ticker === t)).filter(Boolean)
  const segments = MARKET_DATA.industrySegments.us
  const moversData = moversTab === 'Gainers' ? GAINERS : moversTab === 'Losers' ? LOSERS : TOP_VOL

  const filtered = activeCategory === 'Semua'
    ? usAssets
    : usAssets.filter(a => a.category?.includes(activeCategory))

  return (
    <div className="px-4 py-4 space-y-4 pb-20">
      {/* Option 2: US market dashboard */}
      {variant === 'option2' && <USMarketDashboard />}
      {/* AI Market Pulse */}
      <MarketPulseCard data={MARKET_DATA.marketPulse.us} />

      {/* Movers */}
      <div className="bg-white rounded-card shadow-card p-4">
        <p className="text-sm font-bold text-gray-900 mb-2">US Stocks & ETF Movers</p>
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

      {/* Industry Segmentation */}
      <div className="bg-white rounded-card shadow-card p-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Segmentasi Industri S&P 500</p>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={segments} layout="vertical" margin={{ left: 0, right: 30 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} width={72} />
              <Tooltip
                contentStyle={{ fontSize: 10, borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(v) => [`${v}%`, '']}
              />
              <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                {segments.map((s, i) => (
                  <Cell key={i} fill={i === 0 ? '#F7931A' : '#E5E7EB'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analyst Ratings */}
      <div className="bg-white rounded-card shadow-card p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-900">Analyst Ratings</p>
          <button className="text-xs font-bold text-brand">See All →</button>
        </div>
        <div className="space-y-2">
          {(MARKET_DATA.analystRatings || []).slice(0, 3).map((r, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-gray-600">{r.ticker?.slice(0,2)}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-900">{r.ticker}</p>
                <p className="text-[10px] text-gray-400">{r.analyst}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.rating === 'Buy' ? 'bg-green-100 text-green-700' : r.rating === 'Sell' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {r.rating}
              </span>
            </div>
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
        <SectionHeader title={`US Stocks${activeCategory !== 'Semua' ? ` · ${activeCategory}` : ''}`} />
        <div className="divide-y divide-gray-50">
          {(filtered.length > 0 ? filtered : usAssets).map(asset => (
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

function USMarketDashboard() {
  const now = new Date()
  // NYSE: open 09:30–16:00 EST = WIB 21:30–04:00
  const wibHour = (now.getUTCHours() + 7) % 24
  const isOpen = wibHour >= 21 || wibHour < 4
  const CALENDAR = [
    { date: '18 Mar', event: 'Fed Meeting Minutes', impact: 'High', color: 'text-red-600 bg-red-50' },
    { date: '20 Mar', event: 'Initial Jobless Claims', impact: 'Medium', color: 'text-yellow-600 bg-yellow-50' },
    { date: '21 Mar', event: 'US PMI Flash', impact: 'High', color: 'text-red-600 bg-red-50' },
    { date: '28 Mar', event: 'PCE Price Index', impact: 'High', color: 'text-red-600 bg-red-50' },
  ]
  return (
    <div className="space-y-3">
      {/* Market Hours */}
      <div className="bg-white rounded-card shadow-card p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-gray-900">NYSE / NASDAQ</p>
          <p className="text-xs text-gray-400 mt-0.5">Jam buka: 21:30 – 04:00 WIB</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isOpen ? 'bg-green-100' : 'bg-gray-100'}`}>
          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className={`text-xs font-bold ${isOpen ? 'text-green-700' : 'text-gray-500'}`}>{isOpen ? 'Open' : 'Closed'}</span>
        </div>
      </div>
      {/* Economic Calendar */}
      <div className="bg-white rounded-card shadow-card p-4">
        <p className="text-xs font-bold text-gray-900 mb-3">Economic Calendar</p>
        <div className="space-y-2">
          {CALENDAR.map(ev => (
            <div key={ev.event} className="flex items-center gap-3">
              <div className="w-10 shrink-0">
                <p className="text-[9px] font-bold text-gray-500 leading-tight">{ev.date}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-800 font-medium">{ev.event}</p>
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${ev.color}`}>{ev.impact}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Asset Signals */}
      <div className="bg-white rounded-card shadow-card p-4">
        <p className="text-xs font-bold text-gray-900 mb-2">Asset Signals</p>
        {[{t:'AAPL',s:'Neutral',v:50},{t:'NVDA',s:'Bullish',v:88},{t:'TSLA',s:'Bearish',v:34},{t:'MSFT',s:'Bullish',v:72}].map(item => (
          <div key={item.t} className="flex items-center gap-2 py-1.5">
            <span className="text-xs font-bold text-gray-700 w-12">{item.t}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${item.s==='Bullish'?'bg-green-500':item.s==='Bearish'?'bg-red-400':'bg-gray-400'}`} style={{width:`${item.v}%`}} />
            </div>
            <span className={`text-[10px] font-bold w-14 text-right ${item.s==='Bullish'?'text-green-600':item.s==='Bearish'?'text-red-500':'text-gray-500'}`}>{item.s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EcoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  )
}
