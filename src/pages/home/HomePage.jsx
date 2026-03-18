import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BalanceCard from '../../components/molecules/BalanceCard'
import GlobalSearchOverlay from '../../components/organisms/GlobalSearchOverlay'
import BottomSheet from '../../components/organisms/BottomSheet'
import SectionHeader from '../../components/molecules/SectionHeader'
import AssetListItem from '../../components/molecules/AssetListItem'
import Avatar from '../../components/atoms/Avatar'
import { usePortfolio } from '../../context/PortfolioContext'
import { useDesignVariant } from '../../context/DesignVariantContext'
import { formatIDR } from '../../utils/formatters'
import { ASSETS, TRENDING } from '../../mock-data/assets'

const ASSET_TABS = [
  { id: 'crypto', label: 'Crypto', class: 'crypto' },
  { id: 'us', label: 'US', class: 'us' },
  { id: 'hk', label: 'HK', class: 'hk' },
  { id: 'cn', label: 'CN', class: 'cn' },
  { id: 'gold', label: 'Gold', class: 'gold' },
]

const SUB_TABS = ['Watchlist', 'Gainers', 'Losers', 'Top Vol']

// Option 2 home banner data
const BANNER_TABS = ['Events', 'Promotions', 'Announcements']
const BANNER_ITEMS = {
  Events: [
    { id: 'ev1', title: 'Trading Challenge Maret 2026', desc: 'Hadiah total Rp 50 juta! Trader return tertinggi menang.', badge: 'Live', color: 'from-brand to-orange-400' },
    { id: 'ev2', title: 'Webinar: Strategi Emas 2026', desc: 'Bergabung dengan analis senior Nano, 5 April 2026.', badge: 'Upcoming', color: 'from-yellow-500 to-amber-400' },
  ],
  Promotions: [
    { id: 'pr1', title: 'Bonus Top Up 0.5%', desc: 'Top up minimum Rp 5 juta, dapat bonus cash langsung.', badge: 'Promo', color: 'from-blue-500 to-blue-400' },
    { id: 'pr2', title: 'Referral: Ajak Teman, Dapat Rp 100.000', desc: 'Setiap teman yang daftar via kode Anda, dua pihak dapat bonus.', badge: 'Promo', color: 'from-green-500 to-emerald-400' },
  ],
  Announcements: [
    { id: 'an1', title: 'Fitur Baru: Futures Perpetuals', desc: 'Kini tersedia trading Futures dengan leverage hingga 10x.', badge: 'New', color: 'from-purple-500 to-purple-400' },
    { id: 'an2', title: 'Update Kebijakan Withdraw', desc: 'Batas minimum penarikan IDR turun menjadi Rp 50.000.', badge: 'Info', color: 'from-gray-600 to-gray-500' },
  ],
}

// Option 2: Watchlist & Trending data
const watchlistAssets = ASSETS.filter(a => ['BTC','ETH','AAPL','NVDA'].includes(a.ticker))
const trendingAssets = ASSETS.filter(a => TRENDING?.crypto?.includes(a.ticker) || TRENDING?.us?.includes(a.ticker)).slice(0, 6)

// Build per-class asset lists
function getAssetsByClass(cls) {
  return ASSETS.filter(a => a.class === cls)
}

function getSubList(cls, sub) {
  const all = getAssetsByClass(cls)
  if (sub === 'Watchlist') return all.slice(0, 15)
  if (sub === 'Gainers') return [...all].filter(a => a.change24h > 0).sort((a, b) => b.change24h - a.change24h).slice(0, 15)
  if (sub === 'Losers') return [...all].filter(a => a.change24h < 0).sort((a, b) => a.change24h - b.change24h).slice(0, 15)
  if (sub === 'Top Vol') return [...all].sort((a, b) => b.volume24h - a.volume24h).slice(0, 15)
  return all
}

const AI_INSIGHT = {
  summary: 'Saham AS tertekan 1.8% akibat inflasi tinggi; BTC menguat +3.2% sebagai hedge. Sentimen pasar bergeser ke kripto.',
  rec: 'Akumulasi BTC bertahap untuk diversifikasi portofolio.',
  cta: { label: 'Lihat BTC', path: '/market/asset/BTC' },
}

export default function HomePage() {
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [activeAssetTab, setActiveAssetTab] = useState('crypto')
  const [activeSubTab, setActiveSubTab] = useState('Watchlist')
  const { portfolio } = usePortfolio()
  const { summary, allocation, user } = portfolio
  const { variant, setVariant } = useDesignVariant()

  const currentTab = ASSET_TABS.find(t => t.id === activeAssetTab)
  const assets = getSubList(currentTab.class, activeSubTab)
  const preview = assets.slice(0, 5)

  const handleTabChange = (id) => {
    setActiveAssetTab(id)
    setActiveSubTab('Watchlist')
  }

  return (
    <div className="pb-20">
      <GlobalSearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <VariantPickerSheet isOpen={pickerOpen} onClose={() => setPickerOpen(false)} variant={variant} setVariant={setVariant} />

      {/* Header */}
      <div className="bg-white px-4 pt-2 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setPickerOpen(true)} className="rounded-full active:opacity-70">
              <Avatar name={user.name} size="md" />
            </button>
            <div>
              <p className="text-xs text-gray-400">Selamat datang,</p>
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors"
              aria-label="Cari"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            <button
              className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors relative"
              aria-label="Notifikasi"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full" />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <BalanceCard
          totalAUM={summary.totalAUM}
          unrealizedPnL={summary.unrealizedPnL}
          unrealizedPnLPct={summary.unrealizedPnLPct}
          onTotalClick={() => navigate('/portfolio')}
        >
          {variant === 'option1' ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400">Cash</span>
                <span className="text-sm font-bold text-white tabular-nums">{formatIDR(allocation?.cash?.total ?? 0, true)}</span>
              </div>
              <button
                onClick={() => navigate('/wallet')}
                className="w-full bg-white/15 active:bg-white/10 text-white text-sm font-semibold rounded-pill h-11 flex items-center justify-center gap-2 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 4v16M4 12h16"/></svg>
                Add Cash
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400">Cash</span>
                <span className="text-sm font-bold text-white tabular-nums">{formatIDR(allocation?.cash?.total ?? 0, true)}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/wallet')}
                  className="flex-1 bg-white/15 active:bg-white/10 text-white text-sm font-semibold rounded-pill h-11 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 4v16M4 12h16"/></svg>
                  Add Cash
                </button>
                <button
                  onClick={() => {}}
                  className="flex-1 bg-white/15 active:bg-white/10 text-white text-sm font-semibold rounded-pill h-11 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                  QRIS
                </button>
              </div>
            </>
          )}
        </BalanceCard>
      </div>

      {/* AI Insight */}
      <div className="mt-2 bg-white px-4 py-4">
        {variant === 'option1' ? (
          <AIInsightCard insight={AI_INSIGHT} onCta={(path) => navigate(path)} onSeeAll={() => navigate('/portfolio/insights')} />
        ) : (
          <AIInsightCardV2 insight={AI_INSIGHT} onCta={(path) => navigate(path)} onSeeAll={() => navigate('/portfolio/insights')} />
        )}
      </div>

      {/* Banner section */}
      {variant === 'option1' ? (
        <div className="mt-2 bg-white px-4 py-4">
          <div
            className="bg-gradient-to-r from-surface-dark to-gray-800 rounded-card p-4 flex items-center gap-3 cursor-pointer active:opacity-90"
            onClick={() => navigate('/inspiration')}
          >
            <div className="w-10 h-10 bg-brand/20 rounded-xl flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F7931A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white">Trading Challenge Maret 2026</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Hadiah total Rp 50 juta! Daftar sekarang di Inspiration.</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      ) : (
        <SegmentedBannerSection navigate={navigate} />
      )}

      {/* Asset section */}
      {variant === 'option1' ? (
        <div className="mt-2 bg-white">
          <div className="px-4 pt-4 pb-0">
            <SectionHeader title="Eksplorasi Aset" />
          </div>
          <div className="flex gap-0 overflow-x-auto scrollbar-hide px-4 mt-1">
            {ASSET_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`shrink-0 px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeAssetTab === tab.id ? 'text-surface-dark border-surface-dark' : 'text-gray-400 border-transparent'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
            {SUB_TABS.map(sub => (
              <button
                key={sub}
                onClick={() => setActiveSubTab(sub)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${activeSubTab === sub ? 'bg-surface-dark text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                {sub}
              </button>
            ))}
          </div>
          <div className="divide-y divide-gray-50 px-4">
            {preview.length > 0 ? (
              preview.map(asset => (
                <AssetListItem key={asset.ticker} asset={asset} />
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-400">Belum ada data</p>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate(`/market/${currentTab.id === 'gold' ? 'commodities' : currentTab.id}`)}
            className="w-full h-12 text-sm font-bold text-brand border-t border-gray-100 active:bg-gray-50 transition-colors"
          >
            {assets.length > 5 ? `Lihat Semua ${assets.length} →` : 'Lihat di Trade →'}
          </button>
        </div>
      ) : (
        <WatchlistTrendingSection navigate={navigate} />
      )}
    </div>
  )
}

// Option 2 — segmented banner (Events / Promotions / Announcements) with horizontal carousel
function SegmentedBannerSection({ navigate }) {
  const [bannerTab, setBannerTab] = useState('Events')
  const [activeIdx, setActiveIdx] = useState(0)
  const items = BANNER_ITEMS[bannerTab]

  const handleTabChange = (t) => {
    setBannerTab(t)
    setActiveIdx(0)
  }

  return (
    <div className="mt-2 bg-white">
      <div className="flex border-b border-gray-100 px-4">
        {BANNER_TABS.map(t => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={`flex-1 py-2.5 text-xs font-bold transition-colors border-b-2 ${bannerTab === t ? 'text-gray-900 border-surface-dark' : 'text-gray-400 border-transparent'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Horizontal carousel — one card per slide */}
      <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-0 px-4 py-3">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`snap-center flex-shrink-0 w-full bg-gradient-to-r ${item.color} rounded-card p-4 cursor-pointer active:opacity-90 mr-3 last:mr-0`}
            style={{ width: 'calc(100% - 32px)' }}
            onClick={() => navigate('/inspiration')}
          >
            <span className="text-[10px] font-bold bg-white/25 text-white px-2 py-0.5 rounded-full">{item.badge}</span>
            <p className="text-sm font-bold text-white mt-2 leading-snug">{item.title}</p>
            <p className="text-xs text-white/80 mt-1 leading-relaxed">{item.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-1">
                {items.map((_, i) => (
                  <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-white' : 'bg-white/30'}`} />
                ))}
              </div>
              <span className="text-[10px] text-white/60">
                {idx + 1} / {items.length}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Option 2 — Pasar section (same structure as Option 1 Eksplorasi Aset)
function WatchlistTrendingSection({ navigate }) {
  const [activeAssetTab, setActiveAssetTab] = useState('crypto')
  const [activeSubTab, setActiveSubTab] = useState('Watchlist')

  const currentTab = ASSET_TABS.find(t => t.id === activeAssetTab)
  const assets = getSubList(currentTab.class, activeSubTab)
  const preview = assets.slice(0, 5)

  const handleTabChange = (id) => {
    setActiveAssetTab(id)
    setActiveSubTab('Watchlist')
  }

  return (
    <div className="mt-2 bg-white">
      <div className="px-4 pt-4 pb-0">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-gray-900">Pasar</h2>
          <button onClick={() => navigate('/market')} className="text-xs font-semibold text-brand">Lihat Semua →</button>
        </div>
      </div>
      {/* Asset class tabs */}
      <div className="flex gap-0 overflow-x-auto scrollbar-hide px-4 mt-1">
        {ASSET_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`shrink-0 px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeAssetTab === tab.id ? 'text-surface-dark border-surface-dark' : 'text-gray-400 border-transparent'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Sub-tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
        {SUB_TABS.map(sub => (
          <button
            key={sub}
            onClick={() => setActiveSubTab(sub)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${activeSubTab === sub ? 'bg-surface-dark text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            {sub}
          </button>
        ))}
      </div>
      <div className="divide-y divide-gray-50 px-4">
        {preview.length > 0 ? (
          preview.map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-gray-400">Belum ada data</p>
          </div>
        )}
      </div>
    </div>
  )
}

function AIInsightCardV2({ insight, onCta, onSeeAll }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="border border-orange-100 rounded-card bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 active:opacity-80"
      >
        <div className="flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F7931A" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
          </svg>
          <span className="text-xs font-bold text-gray-900">AI Market Insight</span>
          {!expanded && (
            <span className="text-xs text-gray-400 truncate max-w-[160px]">· {insight.summary.split(';')[0]}</span>
          )}
        </div>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round"
          className={`flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-orange-100">
          <p className="text-xs text-gray-600 leading-relaxed mt-3">{insight.summary}</p>
          <div className="mt-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Rekomendasi</p>
            <p className="text-xs text-gray-700">{insight.rec}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onCta(insight.cta.path)}
                className="flex-1 bg-surface-dark text-white text-xs font-bold rounded-pill h-11 flex items-center justify-center gap-1.5 active:opacity-80"
              >
                {insight.cta.label} →
              </button>
              <button
                onClick={onSeeAll}
                className="flex-1 border border-orange-200 text-gray-700 text-xs font-bold rounded-pill h-11 flex items-center justify-center active:bg-orange-50"
              >
                Semua Insights →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function VariantPickerSheet({ isOpen, onClose, variant, setVariant }) {
  const OPTIONS = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
  ]

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Pilih Tampilan">
      <div className="space-y-3 pb-2">
        {OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => { setVariant(opt.id); onClose() }}
            className="w-full flex items-start gap-3 p-3 rounded-xl active:bg-gray-50 transition-colors text-left"
          >
            <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              variant === opt.id ? 'border-surface-dark' : 'border-gray-300'
            }`}>
              {variant === opt.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-surface-dark" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">{opt.label}</p>
            </div>
          </button>
        ))}
      </div>
    </BottomSheet>
  )
}

function AIInsightCard({ insight, onCta, onSeeAll }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="border border-orange-100 rounded-card bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
      {/* Header row — always visible, tap to toggle */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 active:opacity-80"
      >
        <div className="flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F7931A" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
          </svg>
          <span className="text-xs font-bold text-gray-900">AI Market Insight</span>
          {!expanded && (
            <span className="text-xs text-gray-400 truncate max-w-[160px]">· {insight.summary.split(';')[0]}</span>
          )}
        </div>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round"
          className={`flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-orange-100">
          <p className="text-xs text-gray-600 leading-relaxed mt-3">{insight.summary}</p>
          <div className="mt-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Rekomendasi</p>
            <p className="text-xs text-gray-700">{insight.rec}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onCta(insight.cta.path)}
                className="flex-1 bg-surface-dark text-white text-xs font-bold rounded-pill h-11 flex items-center justify-center gap-1.5 active:opacity-80"
              >
                {insight.cta.label} →
              </button>
              <button
                onClick={onSeeAll}
                className="flex-1 border border-orange-200 text-gray-700 text-xs font-bold rounded-pill h-11 flex items-center justify-center active:bg-orange-50"
              >
                Semua Insights →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

