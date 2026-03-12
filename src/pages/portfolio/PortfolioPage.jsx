import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DonutChart from '../../components/organisms/DonutChart'
import SectionHeader from '../../components/molecules/SectionHeader'
import StatRow from '../../components/molecules/StatRow'
import TabPill from '../../components/molecules/TabPill'
import PercentageBadge from '../../components/atoms/PercentageBadge'
import { usePortfolio } from '../../context/PortfolioContext'
import { useMarket } from '../../context/MarketContext'
import { formatIDR, formatPct } from '../../utils/formatters'

const HOLDING_TABS = [
  { id: 'crypto', label: 'Crypto' },
  { id: 'us', label: 'US' },
  { id: 'hk', label: 'HK' },
  { id: 'cn', label: 'CN' },
  { id: 'gold', label: 'Gold' },
]

export default function PortfolioPage() {
  const navigate = useNavigate()
  const { portfolio } = usePortfolio()
  const { assetMap } = useMarket()
  const [holdingTab, setHoldingTab] = useState('crypto')
  const { summary, allocation, holdings } = portfolio

  const allocationDonut = [
    { name: 'Crypto', value: allocation.assets.total * (allocation.assetsBreakdown.Crypto / 100), pct: allocation.assetsBreakdown.Crypto },
    { name: 'US', value: allocation.assets.total * (allocation.assetsBreakdown.US / 100), pct: allocation.assetsBreakdown.US },
    { name: 'HK', value: allocation.assets.total * (allocation.assetsBreakdown.HK / 100), pct: allocation.assetsBreakdown.HK },
    { name: 'CN', value: allocation.assets.total * (allocation.assetsBreakdown.CN / 100), pct: allocation.assetsBreakdown.CN },
    { name: 'Gold', value: allocation.assets.total * (allocation.assetsBreakdown.Gold / 100), pct: allocation.assetsBreakdown.Gold },
  ]

  const holdingsForTab = (holdings[holdingTab] || []).map(h => ({
    ...h,
    asset: assetMap[h.ticker],
  })).filter(h => h.asset)

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-extrabold text-gray-900">Portfolio</h1>
          <button
            onClick={() => navigate('/portfolio/insights')}
            className="flex items-center gap-1.5 bg-brand-light text-brand text-xs font-bold px-3 py-2 rounded-pill active:opacity-80 transition-opacity"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
            AI Insights
          </button>
        </div>

        {/* Balance */}
        <div className="bg-surface-dark rounded-card p-5 text-white shadow-dark">
          <p className="text-xs text-gray-400 mb-1">Total Portofolio</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-1">{formatIDR(summary.totalAUM)}</h2>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-gray-400">Unrealized P&L</p>
              <p className={`text-sm font-bold ${summary.unrealizedPnL >= 0 ? 'text-positive' : 'text-negative'}`}>
                {summary.unrealizedPnL >= 0 ? '+' : ''}{formatIDR(summary.unrealizedPnL, true)} ({formatPct(summary.unrealizedPnLPct)})
              </p>
            </div>
            <div className="ml-4">
              <p className="text-xs text-gray-400">Realized P&L</p>
              <p className={`text-sm font-bold ${summary.realizedPnL >= 0 ? 'text-positive' : 'text-negative'}`}>
                {summary.realizedPnL >= 0 ? '+' : ''}{formatIDR(summary.realizedPnL, true)} ({formatPct(summary.realizedPnLPct)})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Allocation Overview */}
      <div className="px-4 py-4 bg-white mt-2">
        <DonutChart data={allocationDonut} title="Alokasi Aset" />
        <div className="mt-3 space-y-0">
          <StatRow
            label="Cash"
            value={`${formatIDR(allocation.cash.total, true)} (${allocation.cash.pct}%)`}
          />
          <StatRow
            label="Aset"
            value={`${formatIDR(allocation.assets.total, true)} (${allocation.assets.pct}%)`}
          />
          <StatRow
            label="Grow"
            value={`${formatIDR(allocation.grow.total, true)} (${allocation.grow.pct}%)`}
          />
        </div>
      </div>

      {/* Holdings */}
      <div className="px-4 py-4 bg-white mt-2">
        <SectionHeader title="Kepemilikan" />
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 mb-4">
          <TabPill tabs={HOLDING_TABS} activeTab={holdingTab} onSelect={setHoldingTab} size="sm" />
        </div>

        {holdingsForTab.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-400 text-sm">Belum ada kepemilikan di {holdingTab.toUpperCase()}</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {holdingsForTab.map(({ asset, qty, valueIDR, unrealizedPnLPct }) => (
              <div key={asset.ticker} className="flex items-center gap-3 py-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: asset.iconBg }}>
                  {asset.iconText}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-gray-900">{asset.ticker}</span>
                    <span className="text-sm font-semibold text-gray-900">{formatIDR(valueIDR, true)}</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-xs text-gray-400">{qty} {asset.ticker}</span>
                    <PercentageBadge value={unrealizedPnLPct} size="xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
