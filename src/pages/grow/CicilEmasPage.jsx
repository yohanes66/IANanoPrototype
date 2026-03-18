import DetailPage from '../../components/templates/DetailPage'

const PLANS = [
  { gram: 1, price: 1600000, monthly: 72000, tenor: '24 bulan' },
  { gram: 2, price: 3200000, monthly: 140000, tenor: '24 bulan' },
  { gram: 5, price: 8000000, monthly: 345000, tenor: '24 bulan' },
  { gram: 10, price: 16000000, monthly: 680000, tenor: '24 bulan' },
]

export default function CicilEmasPage() {
  return (
    <DetailPage title="Cicil Emas">
      <div className="px-4 py-4 pb-20 space-y-4">
        {/* Hero */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-card p-5">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
            Au
          </div>
          <h2 className="text-lg font-extrabold text-gray-900">Cicil Emas Fisik</h2>
          <p className="text-sm text-gray-600 mt-1">Mulai miliki emas Antam bersertifikat dengan cicilan ringan. Tanpa bunga, tanpa biaya tambahan.</p>
          <div className="flex gap-4 mt-4">
            <div>
              <p className="text-xs text-gray-500">Mulai dari</p>
              <p className="text-base font-extrabold text-gray-900">1 gram</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Cicilan</p>
              <p className="text-base font-extrabold text-gray-900">0% bunga</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tenor</p>
              <p className="text-base font-extrabold text-gray-900">6–24 bulan</p>
            </div>
          </div>
        </div>

        {/* Plans */}
        <p className="text-sm font-bold text-gray-900">Pilih Paket</p>
        <div className="space-y-3">
          {PLANS.map(plan => (
            <div key={plan.gram} className="bg-white rounded-card shadow-card p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">{plan.gram} gram Antam</p>
                <p className="text-xs text-gray-400">Harga: Rp {plan.price.toLocaleString('id-ID')}</p>
                <p className="text-xs text-gray-400">Tenor: {plan.tenor}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Cicilan/bulan</p>
                <p className="text-base font-extrabold text-gray-900">Rp {plan.monthly.toLocaleString('id-ID')}</p>
                <button className="mt-2 text-xs font-bold bg-surface-dark text-white px-3 py-1.5 rounded-pill active:opacity-80">
                  Pilih
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DetailPage>
  )
}
