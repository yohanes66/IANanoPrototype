import { useNavigate, useLocation } from 'react-router-dom'
import { useDesignVariant } from '../../context/DesignVariantContext'

const NAV_ITEMS = [
  { id: 'home',        label1: 'Home',        label2: 'Home',        path: '/',            icon: HomeIcon },
  { id: 'market',      label1: 'Trade',        label2: 'Trade',       path: '/market',      icon: MarketIcon },
  { id: 'grow',        label1: 'Grow',         label2: 'Grow',        path: '/grow',        icon: GrowIcon },
  { id: 'inspiration', label1: 'Inspiration',  label2: 'Engage',      path: '/inspiration', icon: InspirationIcon },
  { id: 'portfolio',   label1: 'Portfolio',    label2: 'Portfolio',   path: '/portfolio',   icon: PortfolioIcon },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { variant } = useDesignVariant()

  const getActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 shadow-bottom z-40">
      <div className="flex items-center justify-around h-16 px-1">
        {NAV_ITEMS.map(item => {
          const active = getActive(item.path)
          const Icon = item.icon
          const label = variant === 'option2' ? item.label2 : item.label1
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative"
              aria-label={label}
            >
              {/* Active indicator — top pill */}
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand rounded-b-full" />
              )}
              <Icon active={active} />
              <span className={`text-[10px] font-semibold ${active ? 'text-brand' : 'text-gray-400'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function HomeIcon({ active }) {
  const c = active ? '#F7931A' : '#9CA3AF'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? c : 'none'} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
      <path d="M9 21V12h6v9" stroke={c}/>
    </svg>
  )
}

function MarketIcon({ active }) {
  const c = active ? '#F7931A' : '#9CA3AF'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>
  )
}

function GrowIcon({ active }) {
  const c = active ? '#F7931A' : '#9CA3AF'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/>
      <path d="M12 12C12 8 15 5 19 5c0 4-3 7-7 7z"/>
      <path d="M12 12C12 8 9 5 5 5c0 4 3 7 7 7z"/>
      <path d="M5 19h14"/>
    </svg>
  )
}

function InspirationIcon({ active }) {
  const c = active ? '#F7931A' : '#9CA3AF'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  )
}

function PortfolioIcon({ active }) {
  const c = active ? '#F7931A' : '#9CA3AF'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  )
}
