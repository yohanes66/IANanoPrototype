import { useState } from 'react'
import DetailPage from '../../components/templates/DetailPage'
import { GROW_DATA } from '../../mock-data/grow'
import { formatIDR } from '../../utils/formatters'

const FREQ_OPTIONS = [
  { id: 'daily', label: 'Harian' },
  { id: 'weekly', label: 'Mingguan' },
  { id: 'monthly', label: 'Bulanan' },
]

const ASSET_OPTIONS = ['BTC', 'ETH', 'BNB', 'NVDA', 'AAPL', 'MSFT']

export default function DCAPage() {
  const { recurringBuys } = GROW_DATA.automate
  const [selectedAsset, setSelectedAsset] = useState('BTC')
  const [selectedFreq, setSelectedFreq] = useState('weekly')
  const [amount, setAmount] = useState('500000')

  return (
    <DetailPage title="DCA Otomatis">
      <div className="px-4 py-4 space-y-4 pb-8">

        {/* Hero */}
        <div className="bg-surface-dark rounded-card p-4 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold">DCA Otomatis</p>
              <p className="text-xs text-gray-400">Beli aset secara rutin, tanpa harus memantau pasar</p>
            </div>
          </div>
          <div className="flex gap-4 pt-2 border-t border-white/10">
            <div>
              <p className="text-xs text-gray-400">Strategi Aktif</p>
              <p className="text-base font-extrabold tabular-nums">{recurringBuys.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Min. Amount</p>
              <p className="text-base font-extrabold tabular-nums">Rp50.000</p>
            </div>
          </div>
        </div>

        {/* Buat Strategi Baru */}
        <div className="bg-white rounded-card shadow-card p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Buat Strategi Baru</p>

          {/* Pilih Aset */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Aset</p>
            <div className="flex gap-2 flex-wrap">
              {ASSET_OPTIONS.map(asset => (
                <button
                  key={asset}
                  onClick={() => setSelectedAsset(asset)}
                  className={`px-3 py-1.5 rounded-pill text-xs font-bold transition-all ${
                    selectedAsset === asset
                      ? 'bg-surface-dark text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {asset}
                </button>
              ))}
            </div>
          </div>

          {/* Frekuensi */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Frekuensi</p>
            <div className="flex gap-2">
              {FREQ_OPTIONS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFreq(f.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedFreq === f.id
                      ? 'bg-surface-dark text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Jumlah */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-700 mb-2">Jumlah per Pembelian</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">Rp</span>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full h-12 bg-gray-50 rounded-xl pl-10 pr-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-surface-dark tabular-nums"
                placeholder="500000"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              ≈ {formatIDR(Number(amount) || 0)} per pembelian
            </p>
          </div>

          <button className="w-full h-12 bg-surface-dark text-white rounded-pill font-bold text-sm active:opacity-80 transition-opacity">
            Aktifkan DCA
          </button>
        </div>

        {/* Strategi Aktif */}
        {recurringBuys.length > 0 && (
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Strategi Aktif</p>
            <div className="space-y-2">
              {recurringBuys.map(rb => (
                <div key={rb.id} className="bg-white rounded-card shadow-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs font-extrabold text-gray-700">{rb.ticker}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{rb.ticker} · {rb.frequency === 'weekly' ? 'Mingguan' : 'Bulanan'}</p>
                      <p className="text-xs text-gray-400">Berikutnya: {rb.nextDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 tabular-nums">{formatIDR(rb.amount)}</p>
                    <span className={`text-xs font-semibold ${rb.active ? 'text-positive' : 'text-gray-400'}`}>
                      {rb.active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 rounded-card p-4">
          <p className="text-xs font-bold text-blue-700 mb-1">Mengapa DCA?</p>
          <p className="text-xs text-blue-600 leading-relaxed">
            Dollar Cost Averaging mengurangi risiko beli di puncak harga. Dengan membeli rutin, rata-rata harga beli Anda menjadi lebih stabil jangka panjang.
          </p>
        </div>
      </div>
    </DetailPage>
  )
}
