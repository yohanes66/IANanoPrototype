import { createContext, useContext, useState } from 'react'
import { ASSETS, ASSET_MAP } from '../mock-data/assets'

const MarketContext = createContext(null)

export function MarketProvider({ children }) {
  const [watchlist, setWatchlist] = useState(['BTC', 'ETH', 'AAPL', 'GOLD'])
  const [activeTab, setActiveTab] = useState('watchlist')

  const toggleWatchlist = (ticker) => {
    setWatchlist(w => w.includes(ticker) ? w.filter(t => t !== ticker) : [...w, ticker])
  }

  const watchlistAssets = watchlist.map(t => ASSET_MAP[t]).filter(Boolean)

  return (
    <MarketContext.Provider value={{ assets: ASSETS, assetMap: ASSET_MAP, watchlist, watchlistAssets, toggleWatchlist, activeTab, setActiveTab }}>
      {children}
    </MarketContext.Provider>
  )
}

export function useMarket() {
  const ctx = useContext(MarketContext)
  if (!ctx) throw new Error('useMarket must be used within MarketProvider')
  return ctx
}
