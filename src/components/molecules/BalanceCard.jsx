import { formatIDR, formatPct } from '../../utils/formatters'

export default function BalanceCard({ totalAUM, unrealizedPnL, unrealizedPnLPct, children }) {
  const isPositive = unrealizedPnL >= 0

  return (
    <div className="bg-surface-dark rounded-card p-5 text-white shadow-dark">
      <p className="text-xs text-gray-400 mb-1">Total Aset</p>
      <h2 className="text-3xl font-extrabold tracking-tight mb-1">{formatIDR(totalAUM)}</h2>
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-sm font-semibold ${isPositive ? 'text-positive' : 'text-negative'}`}>
          {isPositive ? '▲' : '▼'} {formatIDR(Math.abs(unrealizedPnL), true)} ({formatPct(unrealizedPnLPct)})
        </span>
        <span className="text-xs text-gray-500">total P&L</span>
      </div>
      {children}
    </div>
  )
}
