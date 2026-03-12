import { createContext, useContext, useState } from 'react'
import { PORTFOLIO } from '../mock-data/portfolio'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(JSON.parse(JSON.stringify(PORTFOLIO)))

  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
