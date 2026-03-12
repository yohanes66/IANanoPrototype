import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BalanceCard from '../../components/molecules/BalanceCard'
import GlobalSearchOverlay from '../../components/organisms/GlobalSearchOverlay'
import SectionHeader from '../../components/molecules/SectionHeader'
import AssetListItem from '../../components/molecules/AssetListItem'
import InsightCard from '../../components/molecules/InsightCard'
import SocialPostCard from '../../components/molecules/SocialPostCard'
import TierBadge from '../../components/molecules/TierBadge'
import Avatar from '../../components/atoms/Avatar'
import { usePortfolio } from '../../context/PortfolioContext'
import { useMarket } from '../../context/MarketContext'
import { INSIGHTS_DATA } from '../../mock-data/insights'
import { SOCIAL_DATA } from '../../mock-data/social'
import { REWARDS_DATA } from '../../mock-data/rewards'
import { ASSET_MAP, TRENDING } from '../../mock-data/assets'

export default function HomePage() {
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const { portfolio } = usePortfolio()
  const { watchlistAssets } = useMarket()
  const { summary, user } = portfolio

  const trendingCrypto = TRENDING.crypto.map(t => ASSET_MAP[t]).filter(Boolean)

  return (
    <div className="pb-4">
      <GlobalSearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Header */}
      <div className="bg-white px-4 pt-2 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar name={user.name} size="md" />
            <div>
              <p className="text-xs text-gray-400">Selamat datang,</p>
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Global Search — 44px touch target */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors"
              aria-label="Cari"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            {/* Notification — 44px touch target */}
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
        >
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/wallet/topup')}
              className="flex-1 bg-white/15 hover:bg-white/20 active:bg-white/10 text-white text-sm font-semibold rounded-pill h-11 flex items-center justify-center gap-2 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 4v16M4 12h16"/></svg>
              Top Up
            </button>
            <button
              onClick={() => navigate('/wallet/fx-transfer')}
              className="flex-1 bg-white/15 hover:bg-white/20 active:bg-white/10 text-white text-sm font-semibold rounded-pill h-11 flex items-center justify-center gap-2 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
              Transfer
            </button>
          </div>
        </BalanceCard>
      </div>

      {/* Quick Access */}
      <div className="px-4 py-3 bg-white mt-2">
        <div className="flex items-center justify-between">
          <QuickAccessItem icon={<PortfolioSvg />} label="Portfolio" onClick={() => navigate('/portfolio')} />
          <QuickAccessItem icon={<GrowSvg />} label="Grow" onClick={() => navigate('/grow')} />
          <QuickAccessItem icon={<WalletSvg />} label="Wallet" onClick={() => navigate('/wallet')} />
          <QuickAccessItem icon={<RewardsSvg />} label="Rewards" onClick={() => navigate('/rewards')} />
          <QuickAccessItem icon={<SocialSvg />} label="Social" onClick={() => navigate('/social')} />
        </div>
      </div>

      {/* Explore Assets - Trending */}
      <div className="px-4 pt-4 pb-2 bg-white mt-2">
        <SectionHeader title="Explore Aset" seeAllPath="/market" />
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
          {trendingCrypto.map(asset => (
            <div
              key={asset.ticker}
              className="flex-shrink-0 bg-gray-50 rounded-2xl p-3 w-28 cursor-pointer active:bg-gray-100 transition-colors"
              onClick={() => navigate(`/market/asset/${asset.ticker}`)}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mb-2 mx-auto" style={{ backgroundColor: asset.iconBg }}>
                {asset.iconText}
              </div>
              <p className="text-xs font-bold text-gray-900 text-center">{asset.ticker}</p>
              <p className={`text-xs font-semibold text-center mt-0.5 tabular-nums ${asset.change24h >= 0 ? 'text-positive' : 'text-negative'}`}>
                {asset.change24h > 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Watchlist */}
      <div className="px-4 py-3 bg-white mt-2">
        <SectionHeader title="Watchlist" seeAllPath="/market" />
        <div className="divide-y divide-gray-50">
          {watchlistAssets.slice(0, 4).map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
      </div>

      {/* Nano Insights */}
      <div className="py-3 mt-2 bg-white">
        <div className="px-4">
          <SectionHeader title="Nano Insights" seeAllPath="/insights" />
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
          {INSIGHTS_DATA.articles.slice(0, 4).map(article => (
            <InsightCard key={article.id} article={article} compact />
          ))}
        </div>
      </div>

      {/* Social Highlights */}
      <div className="px-4 py-3 bg-white mt-2">
        <SectionHeader title="Social Highlights" seeAllPath="/social" />
        <div className="space-y-3">
          {SOCIAL_DATA.posts.slice(0, 2).map(post => (
            <SocialPostCard key={post.id} post={post} compact />
          ))}
        </div>
      </div>

      {/* Rewards Hub */}
      <div className="px-4 py-3 bg-white mt-2">
        <SectionHeader title="Rewards Hub" seeAllPath="/rewards" />
        <div
          className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-card border border-yellow-100 p-4 cursor-pointer active:opacity-90 transition-opacity"
          onClick={() => navigate('/rewards')}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TierBadge tier={REWARDS_DATA.userTier} size="md" />
              </div>
              <p className="text-xs text-gray-500 tabular-nums">{REWARDS_DATA.points.toLocaleString('id-ID')} poin</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Menuju Platinum</p>
              <p className="text-sm font-bold text-gray-900 tabular-nums">{REWARDS_DATA.nextTierPoints.toLocaleString('id-ID')} poin</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="bg-white rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-brand rounded-full"
              style={{ width: `${(REWARDS_DATA.points / REWARDS_DATA.nextTierPoints) * 100}%` }}
            />
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
            {REWARDS_DATA.missions.filter(m => !m.completed).slice(0, 2).map(mission => (
              <div key={mission.id} className="flex-shrink-0 bg-white rounded-xl p-2.5 border border-gray-100 min-w-0">
                <p className="text-xs font-semibold text-gray-900">{mission.title}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="h-full bg-brand rounded-full" style={{ width: `${(mission.progress / mission.total) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-400 tabular-nums flex-shrink-0">{mission.progress}/{mission.total}</span>
                </div>
                <p className="text-xs text-brand font-semibold mt-1 tabular-nums">+{mission.points} poin</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickAccessItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform min-w-0"
      aria-label={label}
    >
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[11px] font-semibold text-gray-600">{label}</span>
    </button>
  )
}

/* ---- SVG Icon Components ---- */
function PortfolioSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  )
}

function GrowSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/>
      <path d="M12 12C12 8 15 5 19 5c0 4-3 7-7 7z"/>
      <path d="M12 12C12 8 9 5 5 5c0 4 3 7 7 7z"/>
      <path d="M5 19h14"/>
    </svg>
  )
}

function WalletSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12V8H6a2 2 0 0 1 0-4h14v4"/>
      <path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/>
      <circle cx="17" cy="16" r="1" fill="#374151"/>
    </svg>
  )
}

function RewardsSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12"/>
      <rect x="2" y="7" width="20" height="5"/>
      <line x1="12" y1="22" x2="12" y2="7"/>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
    </svg>
  )
}

function SocialSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}
