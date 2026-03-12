import { useNavigate } from 'react-router-dom'
import MarketPulseCard from '../../../components/molecules/MarketPulseCard'
import AssetListItem from '../../../components/molecules/AssetListItem'
import SectionHeader from '../../../components/molecules/SectionHeader'
import { MARKET_DATA } from '../../../mock-data/market'
import { ASSETS } from '../../../mock-data/assets'
import { useUI } from '../../../context/UIContext'
import { formatIDR } from '../../../utils/formatters'

export default function CommoditiesTab() {
  const navigate = useNavigate()
  const { openSheet } = useUI()

  const gold = ASSETS.find(a => a.ticker === 'GOLD')
  const silver = ASSETS.find(a => a.ticker === 'SILVER')
  const oil = ASSETS.find(a => a.ticker === 'OIL')

  return (
    <div className="px-4 py-4 space-y-4">
      {/* AI Market Pulse */}
      <MarketPulseCard data={MARKET_DATA.marketPulse.commodities} />

      {/* Gold Section - Featured */}
      {gold && (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-100 rounded-card p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-xl font-bold text-white shadow-orange">
                Au
              </div>
              <div>
                <p className="text-base font-bold text-gray-900">Emas</p>
                <p className="text-xs text-gray-500">per gram · Antam</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-extrabold text-gray-900">{formatIDR(gold.price)}</p>
              <span className={`text-xs font-semibold ${gold.change24h >= 0 ? 'text-positive' : 'text-negative'}`}>
                {gold.change24h > 0 ? '▲' : '▼'} {Math.abs(gold.change24h).toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Cetak Emas Feature */}
          <div className="mt-4 bg-white rounded-2xl p-3 border border-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">🏅 Cetak Emas</p>
                <p className="text-xs text-gray-500">Ubah emas digital ke fisik</p>
                <p className="text-xs text-gray-400 mt-0.5">Denominasi 1g–100g · Antam</p>
              </div>
              <button
                onClick={() => openSheet('cetak_emas')}
                className="bg-surface-dark text-white text-xs font-bold px-4 py-2 rounded-pill active:opacity-80"
              >
                Cetak
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => navigate('/market/asset/GOLD')}
              className="flex-1 border border-yellow-200 bg-white rounded-pill py-2 text-xs font-semibold text-gray-700 active:bg-gray-50"
            >
              Lihat Detail
            </button>
            <button
              onClick={() => openSheet('buy', { ticker: 'GOLD' })}
              className="flex-1 bg-surface-dark text-white rounded-pill py-2 text-xs font-bold active:opacity-80"
            >
              Beli Emas
            </button>
          </div>
        </div>
      )}

      {/* Other Commodities */}
      <div className="bg-white rounded-card shadow-card p-4">
        <SectionHeader title="Komoditas Lainnya" />
        <div className="divide-y divide-gray-50">
          {[silver, oil].filter(Boolean).map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  )
}
