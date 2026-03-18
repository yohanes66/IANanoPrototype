import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SocialPostCard from '../../components/molecules/SocialPostCard'
import InsightCard from '../../components/molecules/InsightCard'
import Chip from '../../components/atoms/Chip'
import TierBadge from '../../components/molecules/TierBadge'
import TabPill from '../../components/molecules/TabPill'
import { SOCIAL_DATA } from '../../mock-data/social'
import { INSIGHTS_DATA } from '../../mock-data/insights'
import { REWARDS_DATA } from '../../mock-data/rewards'
import { useUI } from '../../context/UIContext'
import GlobalSearchOverlay from '../../components/organisms/GlobalSearchOverlay'

const MAIN_TABS = [
  { id: 'social', label: 'Nano Social' },
  { id: 'insights', label: 'Nano Insights' },
  { id: 'blog', label: 'Blog' },
  { id: 'events', label: 'Events' },
  { id: 'rewards', label: 'Rewards' },
]

const EVENTS_DATA = [
  {
    id: 'ev001',
    title: 'Trading Challenge: Bulan Maret 2026',
    desc: 'Kompetisi trading berhadiah total Rp 50.000.000. Trader dengan return tertinggi menang!',
    badge: 'Active',
    badgeColor: 'bg-green-100 text-green-700',
    endDate: '31 Mar 2026',
    gradient: 'from-brand to-orange-400',
  },
  {
    id: 'ev002',
    title: 'Promo Top Up: Bonus 0.5% untuk Top Up > Rp 5 Juta',
    desc: 'Top up saldo IDR minimum Rp 5.000.000 dan dapatkan bonus cash 0.5% langsung ke akun Anda.',
    badge: 'Promo',
    badgeColor: 'bg-blue-100 text-blue-700',
    endDate: '25 Mar 2026',
    gradient: 'from-blue-500 to-blue-400',
  },
  {
    id: 'ev003',
    title: 'Webinar: Strategi Investasi Emas 2026',
    desc: 'Bergabung dengan analis senior Nano dalam webinar eksklusif membahas outlook emas tahun ini.',
    badge: 'Upcoming',
    badgeColor: 'bg-purple-100 text-purple-700',
    endDate: '5 Apr 2026',
    gradient: 'from-yellow-500 to-yellow-400',
  },
  {
    id: 'ev004',
    title: 'Referral Bonus: Ajak Teman, Dapat Rp 100.000',
    desc: 'Setiap teman yang berhasil daftar dan verifikasi lewat kode referral Anda, Anda dan teman dapat Rp 100.000.',
    badge: 'Promo',
    badgeColor: 'bg-blue-100 text-blue-700',
    endDate: '30 Apr 2026',
    gradient: 'from-green-500 to-green-400',
  },
]

const REWARD_SECTION_TABS = [
  { id: 'missions', label: 'Misi' },
  { id: 'store', label: 'Reward Store' },
  { id: 'tiers', label: 'Tier' },
]

export default function InspirationPage() {
  const [mainTab, setMainTab] = useState('social')
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <div className="bg-white px-4 pt-3 pb-0 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-extrabold text-gray-900">Inspiration</h1>
          <button
            onClick={() => setSearchOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </div>
        {/* Main tab bar — scrollable for 5 tabs */}
        <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-100">
          {MAIN_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setMainTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2.5 text-sm font-bold transition-colors whitespace-nowrap ${mainTab === tab.id ? 'text-gray-900 border-b-2 border-surface-dark' : 'text-gray-400'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {mainTab === 'social' && <SocialTab />}
        {mainTab === 'insights' && <InsightsTab />}
        {mainTab === 'blog' && <BlogTab />}
        {mainTab === 'events' && <EventsTab />}
        {mainTab === 'rewards' && <RewardsTab />}
      </div>

      <GlobalSearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}

function SocialTab() {
  const [feedTab, setFeedTab] = useState('Trending')
  const posts = feedTab === 'Trending'
    ? [...SOCIAL_DATA.posts].sort((a, b) => b.likes - a.likes)
    : SOCIAL_DATA.posts.filter(p => p.isFollowing)

  return (
    <div>
      <div className="bg-white px-4 pt-3 pb-0 sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-4">
            {['Trending', 'Following'].map(t => (
              <button
                key={t}
                onClick={() => setFeedTab(t)}
                className={`pb-2 text-sm font-bold border-b-2 transition-colors ${feedTab === t ? 'text-gray-900 border-gray-900' : 'text-gray-400 border-transparent'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="bg-surface-dark text-white text-xs font-bold px-4 h-9 rounded-pill flex items-center">
            + Post
          </button>
        </div>
      </div>
      <div className="px-4 py-3 space-y-3">
        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-400">Belum ada post dari yang Anda ikuti</p>
          </div>
        ) : (
          posts.map(post => <SocialPostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}

function InsightsTab() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const filtered = activeCategory === 'Semua'
    ? INSIGHTS_DATA.articles
    : INSIGHTS_DATA.articles.filter(a => a.category === activeCategory)

  return (
    <div>
      <div className="bg-white px-4 pt-2 pb-3 sticky top-0 z-10">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {INSIGHTS_DATA.categories.map(cat => (
            <Chip key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
          ))}
        </div>
      </div>
      <div className="px-4 py-2 space-y-3">
        {filtered.map(article => (
          <InsightCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

const BLOG_POSTS = [
  { id: 'b001', title: 'Memahami Halving Bitcoin: Apa Dampaknya ke Harga?', author: 'Nano Research', category: 'Crypto', date: '15 Mar 2026', readMin: 5 },
  { id: 'b002', title: 'Panduan Investasi Emas: Digital vs Fisik vs ETF', author: 'Nano Research', category: 'Gold', date: '12 Mar 2026', readMin: 7 },
  { id: 'b003', title: 'Obligasi Ritel vs Deposito: Mana Lebih Menguntungkan?', author: 'Nano Research', category: 'Bonds', date: '10 Mar 2026', readMin: 6 },
  { id: 'b004', title: 'Strategi DCA: Cara Investasi Rutin yang Terbukti Efektif', author: 'Nano Research', category: 'Strategy', date: '8 Mar 2026', readMin: 4 },
  { id: 'b005', title: 'Analisis Saham AS: NVDA dan Prospek Chip AI 2026', author: 'Nano Research', category: 'US Stocks', date: '5 Mar 2026', readMin: 8 },
]

const BLOG_CATEGORY_COLOR = {
  Crypto: 'bg-orange-100 text-orange-700',
  Gold: 'bg-yellow-100 text-yellow-700',
  Bonds: 'bg-green-100 text-green-700',
  Strategy: 'bg-blue-100 text-blue-700',
  'US Stocks': 'bg-purple-100 text-purple-700',
}

function BlogTab() {
  return (
    <div className="px-4 py-4 space-y-3 pb-20">
      {BLOG_POSTS.map(post => (
        <div
          key={post.id}
          className="bg-white rounded-xl p-4 shadow-card cursor-pointer active:opacity-80"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${BLOG_CATEGORY_COLOR[post.category] || 'bg-gray-100 text-gray-600'}`}>
              {post.category}
            </span>
            <span className="text-[10px] text-gray-400">{post.readMin} min baca</span>
          </div>
          <p className="text-sm font-bold text-gray-900 leading-snug mb-2">{post.title}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">{post.author}</p>
            <p className="text-[10px] text-gray-400">{post.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function EventsTab() {
  return (
    <div className="px-4 py-4 space-y-3">
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Event & Promosi Aktif</p>
      {EVENTS_DATA.map(ev => (
        <div key={ev.id} className="bg-white rounded-card shadow-card overflow-hidden active:opacity-90">
          <div className={`bg-gradient-to-r ${ev.gradient} px-4 py-3 flex items-center justify-between`}>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ev.badgeColor} bg-white/90`}>
              {ev.badge}
            </span>
            <span className="text-xs text-white/80 font-medium">s/d {ev.endDate}</span>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm font-bold text-gray-900 mb-1">{ev.title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{ev.desc}</p>
            <button className="mt-3 text-xs font-bold text-brand">Lihat Detail →</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function RewardsTab() {
  const [activeTab, setActiveTab] = useState('missions')
  const { addToast } = useUI()

  const handleRedeem = (item) => {
    if (REWARDS_DATA.points < item.cost) {
      addToast('Poin tidak cukup', 'error')
    } else {
      addToast(`${item.name} berhasil ditukarkan!`, 'success')
    }
  }

  return (
    <div className="pb-20">
      {/* Tier card */}
      <div className="mx-4 mt-4">
        <div className="bg-gradient-to-r from-yellow-400 to-brand rounded-card p-5 shadow-orange text-white">
          <div className="flex items-center justify-between mb-3">
            <TierBadge tier={REWARDS_DATA.userTier} size="md" />
            <div className="text-right">
              <p className="text-2xl font-extrabold">{REWARDS_DATA.points.toLocaleString('id-ID')}</p>
              <p className="text-xs text-yellow-100">poin</p>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-xs text-yellow-100 mb-1">
              <span>Gold</span>
              <span>{REWARDS_DATA.nextTierPoints.toLocaleString()} untuk Platinum</span>
            </div>
            <div className="bg-white/30 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${(REWARDS_DATA.points / REWARDS_DATA.nextTierPoints) * 100}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-yellow-100">
            Butuh {(REWARDS_DATA.nextTierPoints - REWARDS_DATA.points).toLocaleString()} poin lagi untuk Platinum
          </p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="px-4 mt-4 mb-4">
        <TabPill tabs={REWARD_SECTION_TABS} activeTab={activeTab} onSelect={setActiveTab} size="md" />
      </div>

      {activeTab === 'missions' && (
        <div className="px-4 space-y-3">
          {/* Referral banner */}
          <div className="bg-gradient-to-r from-brand to-orange-400 rounded-card p-4 text-white">
            <p className="text-sm font-bold mb-1">Program Referral</p>
            <p className="text-xs text-orange-100 mb-3">Ajak teman, Anda & teman dapat Rp 100.000 masing-masing</p>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
              <span className="text-xs font-mono font-bold flex-1">NANO-YN2026</span>
              <button className="text-xs bg-white text-brand font-bold px-2 py-1 rounded">Salin</button>
            </div>
          </div>
          {/* Missions */}
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-2">Misi Aktif</p>
          {REWARDS_DATA.missions.map(m => (
            <div key={m.id} className="bg-white rounded-card shadow-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{m.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{m.desc}</p>
                  {!m.completed && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{m.progress}/{m.total}</span>
                        <span>{Math.round((m.progress / m.total) * 100)}%</span>
                      </div>
                      <div className="bg-gray-100 rounded-full h-1.5">
                        <div className="h-full bg-brand rounded-full" style={{ width: `${(m.progress / m.total) * 100}%` }} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-brand">+{m.points.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400">poin</p>
                  {m.completed && (
                    <span className="mt-1 inline-block text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Selesai</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* Raffle & Auction */}
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-2">Raffle & Auction</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-card shadow-card p-3 text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12V8H6a2 2 0 0 1 0-4h14v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><circle cx="17" cy="16" r="1" fill="#7C3AED"/>
                </svg>
              </div>
              <p className="text-xs font-bold text-gray-900">Raffle Mingguan</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Hadiah iPhone 16</p>
              <button className="mt-2 text-[10px] font-bold text-brand">Ikuti →</button>
            </div>
            <div className="bg-white rounded-card shadow-card p-3 text-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <p className="text-xs font-bold text-gray-900">Auction Eksklusif</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Bid dengan poin</p>
              <button className="mt-2 text-[10px] font-bold text-brand">Lihat →</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'store' && (
        <div className="px-4 space-y-3">
          {REWARDS_DATA.store.map(item => (
            <div key={item.id} className="bg-white rounded-card shadow-card p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-gray-500">{item.brand.slice(0, 2)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-400">{item.brand}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-brand mb-1">{item.cost.toLocaleString()} poin</p>
                <button
                  onClick={() => handleRedeem(item)}
                  className="text-[10px] font-bold bg-brand text-white px-2 py-1 rounded-lg active:opacity-80"
                >
                  Tukar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'tiers' && (
        <div className="px-4 space-y-3">
          {REWARDS_DATA.tiers.map(tier => (
            <div key={tier.name} className={`bg-white rounded-card shadow-card p-4 flex items-center gap-3 ${REWARDS_DATA.userTier === tier.name ? 'ring-2 ring-brand' : ''}`}>
              <TierBadge tier={tier.name} size="sm" />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{tier.label}</p>
                <p className="text-xs text-gray-400">
                  {tier.minPoints.toLocaleString()} – {tier.maxPoints ? tier.maxPoints.toLocaleString() : '∞'} poin
                </p>
              </div>
              {REWARDS_DATA.userTier === tier.name && (
                <span className="text-[10px] font-bold text-brand bg-orange-50 px-2 py-0.5 rounded-full">Tier Saya</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
