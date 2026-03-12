import { useNavigate, useLocation } from 'react-router-dom'

const TABS = [
  { id: 'watchlist', label: 'Watchlist', path: '/market', icon: StarIcon },
  { id: 'crypto', label: 'Crypto', path: '/market/crypto', icon: null },
  { id: 'us', label: 'US', path: '/market/us', icon: null },
  { id: 'commodities', label: 'Komoditas', path: '/market/commodities', icon: null },
  { id: 'hk', label: 'HK', path: '/market/hk', icon: null },
  { id: 'cn', label: 'CN', path: '/market/cn', icon: null },
]

export default function MarketTabBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (tab) => {
    if (tab.path === '/market') return location.pathname === '/market'
    return location.pathname === tab.path
  }

  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-hide px-4 py-2 bg-white border-b border-gray-100">
      {TABS.map(tab => {
        const active = isActive(tab)
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill text-xs font-semibold transition-all ${
              active
                ? 'bg-surface-dark text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {Icon && <Icon active={active} />}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

function StarIcon({ active }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke={active ? 'white' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}
