import { useNavigate } from 'react-router-dom'
import MarketPulseCard from '../../../components/molecules/MarketPulseCard'
import AssetListItem from '../../../components/molecules/AssetListItem'
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
    <div className="px-4 py-4 space-y-4 pb-20">
      {/* AI Market Pulse */}
      <MarketPulseCard data={MARKET_DATA.marketPulse.commodities} />

      {/* ─── Gold Assets ─────────────────────────────────── */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Gold Assets</p>
        {gold && (
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-100 rounded-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-base font-bold text-white shadow-orange">
                  Au
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">Emas Digital</p>
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

            {/* Cetak Emas */}
            <div className="mt-4 bg-white rounded-2xl p-3 border border-yellow-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Cetak Emas</p>
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

        {/* Gold ETF & Crypto placeholders */}
        <div className="mt-2 bg-white rounded-xl shadow-card p-3 flex items-center justify-between opacity-60">
          <div>
            <p className="text-sm font-bold text-gray-700">Gold ETF</p>
            <p className="text-xs text-gray-400">Reksadana berbasis emas</p>
          </div>
          <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Segera Hadir</span>
        </div>
        <div className="mt-2 bg-white rounded-xl shadow-card p-3 flex items-center justify-between opacity-60">
          <div>
            <p className="text-sm font-bold text-gray-700">Gold-backed Crypto</p>
            <p className="text-xs text-gray-400">Token yang didukung emas fisik</p>
          </div>
          <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Segera Hadir</span>
        </div>
      </div>

      {/* ─── Silver Assets ───────────────────────────────── */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Silver Assets</p>
        {silver ? (
          <div className="bg-white rounded-card shadow-card p-4">
            <AssetListItem asset={silver} />
          </div>
        ) : null}
        <div className="mt-2 bg-white rounded-xl shadow-card p-3 flex items-center justify-between opacity-60">
          <div>
            <p className="text-sm font-bold text-gray-700">Silver ETF</p>
            <p className="text-xs text-gray-400">Reksadana berbasis perak</p>
          </div>
          <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Segera Hadir</span>
        </div>
      </div>

      {/* ─── Oil & Natural Resources ─────────────────────── */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Oil & Natural Resources</p>
        {oil ? (
          <div className="bg-white rounded-card shadow-card p-4">
            <AssetListItem asset={oil} />
          </div>
        ) : null}
        <div className="mt-2 bg-white rounded-xl shadow-card p-3 flex items-center justify-between opacity-60">
          <div>
            <p className="text-sm font-bold text-gray-700">Energy ETF</p>
            <p className="text-xs text-gray-400">ETF energi & sumber daya alam</p>
          </div>
          <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Segera Hadir</span>
        </div>
      </div>
    </div>
  )
}
