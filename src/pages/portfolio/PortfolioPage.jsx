import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DonutChart from '../../components/organisms/DonutChart'
import SectionHeader from '../../components/molecules/SectionHeader'
import TabPill from '../../components/molecules/TabPill'
import PercentageBadge from '../../components/atoms/PercentageBadge'
import TransactionRow from '../../components/molecules/TransactionRow'
import { usePortfolio } from '../../context/PortfolioContext'
import { useMarket } from '../../context/MarketContext'
import { useWallet } from '../../context/WalletContext'
import { useDesignVariant } from '../../context/DesignVariantContext'
import { formatIDR } from '../../utils/formatters'

// Must match COLORS order in DonutChart.jsx
const DONUT_COLORS = ['#F7931A', '#3B82F6', '#22C55E', '#A855F7', '#EF4444']

const HOLDING_TABS = [
  { id: 'crypto', label: 'Crypto' },
  { id: 'us', label: 'US' },
  { id: 'hk', label: 'HK' },
  { id: 'cn', label: 'CN' },
  { id: 'gold', label: 'Gold' },
]

const HISTORY_TABS = [
  { id: 'all', label: 'Semua' },
  { id: 'asset', label: 'Asset' },
  { id: 'cash', label: 'Cash' },
]

const ASSET_TX_TYPES = ['buy', 'sell', 'cetak_emas', 'earn']
const CASH_TX_TYPES = ['topup', 'fx_transfer', 'withdraw']

// Locked products mock
const LOCKED_ITEMS = [
  { id: 'l001', name: 'IDDR Earn', type: 'Earn', rate: '7.5% p.a.', valueIDR: 14875000, yieldIDR: 93000 },
  { id: 'l002', name: 'ASDD Earn', type: 'Earn', rate: '5.5% p.a.', valueIDR: 5000000, yieldIDR: 22900 },
  { id: 'l003', name: 'ETH Stake', type: 'Stake', rate: '2% p.a.', valueIDR: 7500000, yieldIDR: 12500 },
  { id: 'l004', name: 'NBT Staking', type: 'Stake', rate: '10% p.a.', valueIDR: 2375000, yieldIDR: 19800 },
  { id: 'l005', name: 'Gadai Digital', type: 'Gadai', rate: '0.5%/bln', valueIDR: 5000000, yieldIDR: -25000 },
  { id: 'l006', name: 'IDDB-USD001', type: 'Bonds', rate: '4.49% p.a.', valueIDR: 15000000, yieldIDR: 56100 },
]

const TYPE_BADGE = {
  Earn: 'bg-green-100 text-green-700',
  Stake: 'bg-blue-100 text-blue-700',
  Gadai: 'bg-purple-100 text-purple-700',
  Bonds: 'bg-teal-100 text-teal-700',
}

// Class key mapping holdings → allocationDonut labels
const CLASS_KEYS = { Crypto: 'crypto', US: 'us', HK: 'hk', CN: 'cn', Gold: 'gold' }

export default function PortfolioPage() {
  const navigate = useNavigate()
  const { portfolio } = usePortfolio()
  const { assetMap } = useMarket()
  const { wallet } = useWallet()
  const { variant } = useDesignVariant()
  const transactions = wallet?.transactions || []
  const [pageTab, setPageTab] = useState('overview')
  const [holdingTab, setHoldingTab] = useState('crypto')
  const [historyTab, setHistoryTab] = useState('all')
  const { summary, allocation, holdings } = portfolio

  // Option 2: 5-tab nav
  const V2_TABS = ['Overview', 'Tradable', 'Cash', 'Grow', 'Borrow']
  const [v2Tab, setV2Tab] = useState('Overview')

  // Compute weighted unrealized P&L % per asset class from holdings
  const classPnL = Object.fromEntries(
    Object.entries(CLASS_KEYS).map(([label, key]) => {
      const items = holdings[key] || []
      const totalVal = items.reduce((s, h) => s + h.valueIDR, 0)
      const weighted = totalVal > 0
        ? items.reduce((s, h) => s + h.valueIDR * (h.unrealizedPnLPct / 100), 0) / totalVal * 100
        : 0
      return [label, weighted]
    })
  )

  const allocationDonut = [
    { name: 'Crypto', value: allocation.assets.total * (allocation.assetsBreakdown.Crypto / 100), pct: allocation.assetsBreakdown.Crypto, pnlPct: classPnL.Crypto },
    { name: 'US', value: allocation.assets.total * (allocation.assetsBreakdown.US / 100), pct: allocation.assetsBreakdown.US, pnlPct: classPnL.US },
    { name: 'HK', value: allocation.assets.total * (allocation.assetsBreakdown.HK / 100), pct: allocation.assetsBreakdown.HK, pnlPct: classPnL.HK },
    { name: 'CN', value: allocation.assets.total * (allocation.assetsBreakdown.CN / 100), pct: allocation.assetsBreakdown.CN, pnlPct: classPnL.CN },
    { name: 'Gold', value: allocation.assets.total * (allocation.assetsBreakdown.Gold / 100), pct: allocation.assetsBreakdown.Gold, pnlPct: classPnL.Gold },
  ]

  const holdingsForTab = (holdings[holdingTab] || []).map(h => ({
    ...h,
    asset: assetMap[h.ticker],
  })).filter(h => h.asset)

  const filteredTx = (transactions || []).filter(tx => {
    if (historyTab === 'all') return true
    if (historyTab === 'asset') return ASSET_TX_TYPES.includes(tx.type)
    if (historyTab === 'cash') return CASH_TX_TYPES.includes(tx.type)
    return true
  })

  if (variant === 'option2') {
    return <PortfolioV2 portfolio={portfolio} navigate={navigate} v2Tab={v2Tab} setV2Tab={setV2Tab} V2_TABS={V2_TABS} holdingTab={holdingTab} setHoldingTab={setHoldingTab} allocationDonut={allocationDonut} holdingsForTab={holdingsForTab} />
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-3 sticky top-0 z-20 border-b border-gray-100">
        {pageTab === 'overview' ? (
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-extrabold text-gray-900">Portfolio</h1>
            <div className="flex items-center gap-2">
              {/* History entry point */}
              <button
                onClick={() => setPageTab('history')}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
                aria-label="Riwayat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </button>
              {/* AI Insights */}
              <button
                onClick={() => navigate('/portfolio/insights')}
                className="flex items-center gap-1.5 bg-orange-50 text-brand text-xs font-bold px-3 py-2 rounded-pill active:opacity-80"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
                AI
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPageTab('overview')}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
              aria-label="Kembali"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <h1 className="text-xl font-extrabold text-gray-900">Riwayat</h1>
          </div>
        )}
      </div>

      {pageTab === 'overview' && (
        <>
          {/* Balance Hero */}
          <div className="bg-white px-4 pt-4 pb-4">
            <div className="bg-surface-dark rounded-card p-5 text-white shadow-dark">
              <p className="text-xs text-gray-400 mb-1">Total Portofolio</p>
              <h2 className="text-3xl font-extrabold tracking-tight mb-2">{formatIDR(summary.totalAUM)}</h2>
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-gray-400">Unrealized P&L</p>
                  <p className={`text-sm font-bold ${summary.unrealizedPnL >= 0 ? 'text-positive' : 'text-negative'}`}>
                    {summary.unrealizedPnL >= 0 ? '+' : ''}{formatIDR(summary.unrealizedPnL, true)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Realized P&L</p>
                  <p className={`text-sm font-bold ${summary.realizedPnL >= 0 ? 'text-positive' : 'text-negative'}`}>
                    {summary.realizedPnL >= 0 ? '+' : ''}{formatIDR(summary.realizedPnL, true)}
                  </p>
                </div>
              </div>
              {/* Quick breakdown */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                <div className="flex-1 text-center min-w-0">
                  <p className="text-[10px] text-gray-400">Tradable</p>
                  <p className="text-[11px] font-bold text-white tabular-nums truncate">{formatIDR(allocation.assets.total, true)}</p>
                </div>
                <div className="w-px bg-white/10 flex-shrink-0" />
                <div className="flex-1 text-center min-w-0">
                  <p className="text-[10px] text-gray-400">Locked</p>
                  <p className="text-[11px] font-bold text-white tabular-nums truncate">{formatIDR(allocation.grow.total, true)}</p>
                </div>
                <div className="w-px bg-white/10 flex-shrink-0" />
                <div className="flex-1 text-center min-w-0">
                  <p className="text-[10px] text-gray-400">Cash</p>
                  <p className="text-[11px] font-bold text-white tabular-nums truncate">{formatIDR(allocation.cash.total, true)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tradable Allocation */}
          <div className="px-4 py-4 bg-white mt-2">
            <p className="text-sm font-bold text-gray-900 mb-3">Tradable Asset Allocation</p>
            <DonutChart data={allocationDonut} title="" />
            <div className="mt-3 space-y-2">
              {allocationDonut.map((item, i) => (
                <div key={item.name} className="py-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-600 w-12">{item.name}</span>
                      <div className="h-1.5 bg-gray-100 rounded-full w-20">
                        <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: DONUT_COLORS[i] }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900 tabular-nums">{formatIDR(item.value, true)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pl-14">
                    <span className="text-xs text-gray-400 tabular-nums">{item.pct}% portofolio</span>
                    <span className={`text-xs font-semibold tabular-nums ${item.pnlPct >= 0 ? 'text-positive' : 'text-negative'}`}>
                      {item.pnlPct >= 0 ? '+' : ''}{item.pnlPct.toFixed(1)}% P&L
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Locked Allocation */}
          <div className="px-4 py-4 bg-white mt-2">
            <p className="text-sm font-bold text-gray-900 mb-3">Locked Asset Allocation</p>
            <div className="space-y-2">
              {LOCKED_ITEMS.map(item => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{item.name}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${TYPE_BADGE[item.type]}`}>{item.type}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{item.rate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 tabular-nums">{formatIDR(item.valueIDR, true)}</p>
                    <p className={`text-xs font-semibold tabular-nums ${item.yieldIDR >= 0 ? 'text-positive' : 'text-negative'}`}>
                      {item.yieldIDR >= 0 ? '+' : ''}{formatIDR(item.yieldIDR, true)}/bln
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
              <p className="text-xs font-semibold text-gray-500">Total Locked</p>
              <p className="text-sm font-bold text-gray-900 tabular-nums">{formatIDR(LOCKED_ITEMS.reduce((s, i) => s + i.valueIDR, 0), true)}</p>
            </div>
          </div>

          {/* Tradable Breakdown */}
          <div className="px-4 py-4 bg-white mt-2">
            <SectionHeader title="Tradable Breakdown" />
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
                  <div
                    key={asset.ticker}
                    className="flex items-center gap-3 py-3 cursor-pointer active:bg-gray-50"
                    onClick={() => navigate(`/market/asset/${asset.ticker}`)}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: asset.iconBg }}>
                      {asset.iconText}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <span className="text-sm font-bold text-gray-900">{asset.ticker}</span>
                        <span className="text-sm font-semibold text-gray-900 tabular-nums">{formatIDR(valueIDR, true)}</span>
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
        </>
      )}

      {pageTab === 'history' && (
        <div className="bg-white mt-2">
          {/* History sub-tabs */}
          <div className="px-4 pt-4 pb-2">
            <div className="flex gap-2">
              {HISTORY_TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setHistoryTab(t.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${historyTab === t.id ? 'bg-surface-dark text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 pb-20 space-y-2 pt-2">
            {filteredTx.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-400">Belum ada transaksi</p>
              </div>
            ) : (
              filteredTx.map(tx => (
                <TransactionRow key={tx.id} tx={tx} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Option 2: 5-tab Portfolio ────────────────────────────────────────────────
function PortfolioV2({ portfolio, navigate, v2Tab, setV2Tab, V2_TABS, holdingTab, setHoldingTab, allocationDonut, holdingsForTab }) {
  const { summary, allocation } = portfolio

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <h1 className="text-xl font-extrabold text-gray-900">Portfolio</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/portfolio/insights')}
              className="flex items-center gap-1.5 bg-orange-50 text-brand text-xs font-bold px-3 py-2 rounded-pill active:opacity-80"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
              </svg>
              AI
            </button>
          </div>
        </div>
        {/* 5-tab bar */}
        <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-100 px-4">
          {V2_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setV2Tab(tab)}
              className={`flex-shrink-0 px-3 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${v2Tab === tab ? 'text-gray-900 border-surface-dark' : 'text-gray-400 border-transparent'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Overview: full portfolio hero + allocation chart ── */}
      {v2Tab === 'Overview' && (
        <>
          <div className="bg-white px-4 pt-4 pb-4">
            <div className="bg-surface-dark rounded-card p-5 text-white shadow-dark">
              <p className="text-xs text-gray-400 mb-1">Total Portofolio</p>
              <h2 className="text-3xl font-extrabold tracking-tight mb-3">{formatIDR(summary.totalAUM)}</h2>
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-gray-400">Unrealized P&L</p>
                  <p className={`text-sm font-bold ${summary.unrealizedPnL >= 0 ? 'text-positive' : 'text-negative'}`}>
                    {summary.unrealizedPnL >= 0 ? '+' : ''}{formatIDR(summary.unrealizedPnL, true)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Realized P&L</p>
                  <p className={`text-sm font-bold ${summary.realizedPnL >= 0 ? 'text-positive' : 'text-negative'}`}>
                    {summary.realizedPnL >= 0 ? '+' : ''}{formatIDR(summary.realizedPnL, true)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 bg-white mt-2">
            <p className="text-sm font-bold text-gray-900 mb-3">Alokasi Aset</p>
            <DonutChart data={allocationDonut} title="" />
            <div className="mt-3 space-y-2">
              {allocationDonut.map((item, i) => (
                <div key={item.name} className="py-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-600 w-12">{item.name}</span>
                      <div className="h-1.5 bg-gray-100 rounded-full w-20">
                        <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: DONUT_COLORS[i] }} />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 tabular-nums">{formatIDR(item.value, true)}</span>
                  </div>
                  <div className="flex items-center justify-between pl-14">
                    <span className="text-xs text-gray-400 tabular-nums">{item.pct}% portofolio</span>
                    <span className={`text-xs font-semibold tabular-nums ${item.pnlPct >= 0 ? 'text-positive' : 'text-negative'}`}>
                      {item.pnlPct >= 0 ? '+' : ''}{item.pnlPct.toFixed(1)}% P&L
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Tradable: mini-hero + holdings ── */}
      {v2Tab === 'Tradable' && (
        <div className="space-y-2">
          {/* Mini hero — full value, no truncation */}
          <div className="bg-white px-4 pt-4 pb-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-xs text-gray-400">Total Tradable</p>
                <p className="text-2xl font-extrabold text-gray-900 tabular-nums">{formatIDR(allocation.assets.total)}</p>
              </div>
              <button className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200" aria-label="Riwayat Trade">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </button>
            </div>
            <div className="flex gap-5 mt-2">
              <div>
                <p className="text-xs text-gray-400">Unrealized P&L</p>
                <p className={`text-sm font-bold ${summary.unrealizedPnL >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {summary.unrealizedPnL >= 0 ? '+' : ''}{formatIDR(summary.unrealizedPnL, true)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Realized P&L</p>
                <p className={`text-sm font-bold ${summary.realizedPnL >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {summary.realizedPnL >= 0 ? '+' : ''}{formatIDR(summary.realizedPnL, true)}
                </p>
              </div>
            </div>
          </div>
          {/* Pending orders banner */}
          <div className="bg-white px-4 py-3">
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-amber-800">2 Pending Orders</p>
                <p className="text-[10px] text-amber-600">BTC Limit Buy · NVDA Limit Sell</p>
              </div>
              <button className="text-xs font-bold text-amber-700 active:opacity-70">Lihat →</button>
            </div>
          </div>
          {/* Holdings per asset class */}
          <div className="bg-white px-4 pt-3 pb-4">
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
                  <div
                    key={asset.ticker}
                    className="flex items-center gap-3 py-3 cursor-pointer active:bg-gray-50"
                    onClick={() => navigate(`/market/asset/${asset.ticker}`)}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: asset.iconBg }}>
                      {asset.iconText}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <span className="text-sm font-bold text-gray-900">{asset.ticker}</span>
                        <span className="text-sm font-semibold text-gray-900 tabular-nums">{formatIDR(valueIDR, true)}</span>
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
      )}

      {/* ── Cash: mini-hero + currency breakdown ── */}
      {v2Tab === 'Cash' && (
        <div className="space-y-2">
          <div className="bg-white px-4 pt-4 pb-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-xs text-gray-400">Total Cash</p>
                <p className="text-2xl font-extrabold text-gray-900 tabular-nums">{formatIDR(allocation.cash.total)}</p>
                <p className="text-xs text-gray-400 mt-1">Di semua mata uang · setara IDR</p>
              </div>
              <button
                onClick={() => navigate('/wallet')}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
                aria-label="Lihat Wallet"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </button>
            </div>
            <button
              onClick={() => navigate('/wallet')}
              className="mt-3 w-full h-11 bg-surface-dark text-white text-sm font-bold rounded-pill flex items-center justify-center gap-2 active:opacity-80"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 4v16M4 12h16"/></svg>
              Add Cash
            </button>
          </div>
          <div className="bg-white px-4 py-4 space-y-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Rincian</p>
            {[
              { label: 'Nanovest Cash (IDR)', amount: allocation.cash.total * 0.6,  sub: 'Dapat ditransfer ke user lain',  color: 'bg-green-50 border-green-100' },
              { label: 'Crypto Cash (IDR)',   amount: allocation.cash.total * 0.25, sub: 'Khusus trading crypto',           color: 'bg-blue-50 border-blue-100' },
              { label: 'Nanopoints',          amount: allocation.cash.total * 0.05, sub: '2.450 poin · tukar di Rewards',  color: 'bg-orange-50 border-orange-100' },
              { label: 'USD',                 amount: allocation.cash.total * 0.07, sub: '≈ USD 12.40',                    color: 'bg-gray-50 border-gray-100' },
              { label: 'HKD',                 amount: allocation.cash.total * 0.03, sub: '≈ HKD 145.00',                  color: 'bg-gray-50 border-gray-100' },
            ].map(item => (
              <div key={item.label} className={`border rounded-xl p-3 flex items-center justify-between ${item.color}`}>
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                </div>
                <p className="text-sm font-bold text-gray-900 tabular-nums">{formatIDR(item.amount, true)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Grow: mini-hero + locked items ── */}
      {v2Tab === 'Grow' && (
        <div className="space-y-2">
          <div className="bg-white px-4 pt-4 pb-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-xs text-gray-400">Total Grow (Locked)</p>
                <p className="text-2xl font-extrabold text-gray-900 tabular-nums">{formatIDR(allocation.grow.total)}</p>
              </div>
              <button className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200" aria-label="Riwayat Grow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </button>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-400">Estimasi yield/bulan</p>
              <p className="text-sm font-bold text-positive">
                +{formatIDR(LOCKED_ITEMS.filter(i => i.type !== 'Gadai' && i.yieldIDR > 0).reduce((s, i) => s + i.yieldIDR, 0), true)}
              </p>
            </div>
          </div>
          <div className="bg-white px-4 py-4 space-y-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Posisi Aktif</p>
            {LOCKED_ITEMS.filter(i => i.type !== 'Gadai').map(item => (
              <div key={item.id} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-900">{item.name}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${TYPE_BADGE[item.type]}`}>{item.type}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{item.rate}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-900 tabular-nums">{formatIDR(item.valueIDR, true)}</p>
                  <p className={`text-xs font-semibold tabular-nums ${item.yieldIDR >= 0 ? 'text-positive' : 'text-negative'}`}>
                    {item.yieldIDR >= 0 ? '+' : ''}{formatIDR(item.yieldIDR, true)}/bln
                  </p>
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/grow')} className="w-full h-11 border border-gray-200 text-gray-700 text-xs font-bold rounded-pill active:bg-gray-50 transition-colors mt-2">
              + Tambah Produk Grow →
            </button>
          </div>
        </div>
      )}

      {/* ── Borrow: mini-hero + active loans ── */}
      {v2Tab === 'Borrow' && (
        <div className="space-y-2">
          <div className="bg-white px-4 pt-4 pb-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-xs text-gray-400">Total Pinjaman Aktif</p>
                <p className="text-2xl font-extrabold text-gray-900 tabular-nums">{formatIDR(5420000)}</p>
              </div>
              <button className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200" aria-label="Riwayat Borrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </button>
            </div>
            <div className="flex gap-5 mt-2">
              <div>
                <p className="text-xs text-gray-400">Bunga total/bln</p>
                <p className="text-sm font-bold text-negative">{formatIDR(25000 + 420000, true)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Posisi aktif</p>
                <p className="text-sm font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-4 space-y-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Posisi Aktif</p>
            {/* Gadai Aset */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Gadai Aset</p>
                  <p className="text-xs text-gray-500 mt-0.5">Kolateral: 0.05 BTC</p>
                </div>
                <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Aktif</span>
              </div>
              <div className="mt-3 pt-3 border-t border-purple-100 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[10px] text-gray-400">Pinjaman</p>
                  <p className="text-sm font-bold text-gray-900">{formatIDR(5000000, true)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Bunga/bln</p>
                  <p className="text-sm font-bold text-gray-900">0.5%</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">LTV saat ini</p>
                  <p className="text-sm font-bold text-red-500">54%</p>
                </div>
              </div>
              <button onClick={() => navigate('/grow/gadai')} className="mt-3 w-full h-9 bg-purple-600 text-white text-xs font-bold rounded-pill active:opacity-80">
                Kelola Gadai
              </button>
            </div>
            {/* Cicil Aset */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Cicil Aset — Emas 5g</p>
                  <p className="text-xs text-gray-500 mt-0.5">Cicilan ke-3 dari 12</p>
                </div>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Aktif</span>
              </div>
              <div className="mt-3 pt-3 border-t border-amber-100 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[10px] text-gray-400">Cicilan/bln</p>
                  <p className="text-sm font-bold text-gray-900">{formatIDR(420000, true)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Sisa</p>
                  <p className="text-sm font-bold text-gray-900">9 bulan</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Jatuh tempo</p>
                  <p className="text-sm font-bold text-gray-900">Mar 2027</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1.5">
                  <span>Progress pembayaran</span><span>25%</span>
                </div>
                <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
            <button onClick={() => navigate('/grow')} className="w-full h-11 border border-gray-200 text-gray-700 text-xs font-bold rounded-pill active:bg-gray-50 transition-colors">
              + Ajukan Pinjaman Baru →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
