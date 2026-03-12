import { useState } from 'react'
import DetailPage from '../../components/templates/DetailPage'
import { GROW_DATA } from '../../mock-data/grow'
import { useUI } from '../../context/UIContext'

const RISK_COLOR = {
  'Low': 'text-positive',
  'Low-Medium': 'text-blue-500',
  'Medium': 'text-brand',
  'High': 'text-negative',
}

const RISK_BG = {
  'Low': 'bg-green-50 border-green-100',
  'Low-Medium': 'bg-blue-50 border-blue-100',
  'Medium': 'bg-orange-50 border-orange-100',
  'High': 'bg-red-50 border-red-100',
}

export default function BundlePage() {
  const { bundles } = GROW_DATA.automate
  const { openSheet } = useUI()
  const [selected, setSelected] = useState(null)

  return (
    <DetailPage title="Bundle">
      <div className="px-4 py-4 space-y-4 pb-8">

        {/* Hero */}
        <div className="bg-surface-dark rounded-card p-4 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/>
                <line x1="10" y1="12" x2="14" y2="12"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold">Bundle Aset</p>
              <p className="text-xs text-gray-400">Paket portofolio siap pakai, diversifikasi instan</p>
            </div>
          </div>
          <div className="flex gap-4 pt-2 border-t border-white/10">
            <div>
              <p className="text-xs text-gray-400">Bundle Tersedia</p>
              <p className="text-base font-extrabold tabular-nums">{bundles.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Rebalance</p>
              <p className="text-base font-extrabold">Otomatis</p>
            </div>
          </div>
        </div>

        {/* Bundle list */}
        <div className="space-y-4">
          {bundles.map(bundle => {
            const isSelected = selected === bundle.id
            const riskColor = RISK_COLOR[bundle.riskLevel] || 'text-gray-500'
            const riskBg = RISK_BG[bundle.riskLevel] || 'bg-gray-50 border-gray-100'

            return (
              <div
                key={bundle.id}
                className={`bg-white rounded-card shadow-card overflow-hidden transition-all ${
                  isSelected ? 'ring-2 ring-surface-dark' : ''
                }`}
              >
                {/* Header */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-gray-900">{bundle.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-pill border ${riskBg} ${riskColor}`}>
                          {bundle.riskLevel}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">{bundle.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-extrabold text-positive tabular-nums">+{bundle.return30d}%</p>
                      <p className="text-xs text-gray-400">30 hari</p>
                    </div>
                  </div>

                  {/* Asset allocation */}
                  <div className="flex gap-2 mb-3">
                    {bundle.assets.map(a => (
                      <div key={a.ticker} className="flex-1 bg-gray-50 rounded-xl p-2.5 text-center">
                        <p className="text-xs font-extrabold text-gray-900">{a.ticker}</p>
                        <p className="text-xs text-gray-500 tabular-nums mt-0.5">{a.allocation}%</p>
                      </div>
                    ))}
                  </div>

                  {/* Allocation bar */}
                  <div className="flex rounded-full overflow-hidden h-2 gap-0.5">
                    {bundle.assets.map((a, i) => (
                      <div
                        key={a.ticker}
                        style={{ width: `${a.allocation}%`, backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {bundle.assets.map((a, i) => (
                      <div key={a.ticker} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }} />
                        <span className="text-[10px] text-gray-400">{a.ticker}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="px-4 pb-4">
                  <button
                    onClick={() => {
                      setSelected(bundle.id)
                      openSheet('buy', { ticker: bundle.assets[0].ticker })
                    }}
                    className="w-full h-12 bg-surface-dark text-white rounded-pill font-bold text-sm active:opacity-80 transition-opacity"
                  >
                    Beli Bundle
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-card p-4">
          <p className="text-xs font-bold text-blue-700 mb-1">Tentang Bundle</p>
          <p className="text-xs text-blue-600 leading-relaxed">
            Bundle otomatis merebalance alokasi sesuai target. Ideal untuk investor yang ingin diversifikasi tanpa perlu memilih aset satu per satu.
          </p>
        </div>
      </div>
    </DetailPage>
  )
}

const BAR_COLORS = ['#111111', '#F7931A', '#6B7280', '#22C55E', '#3B82F6']
