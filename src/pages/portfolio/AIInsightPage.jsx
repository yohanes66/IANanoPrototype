import DetailPage from '../../components/templates/DetailPage'
import { usePortfolio } from '../../context/PortfolioContext'
import { formatPct } from '../../utils/formatters'

const AI_INSIGHTS = [
  {
    type: 'warning',
    icon: '⚠️',
    title: 'Konsentrasi Crypto Tinggi',
    description: 'Alokasi kripto Anda 40% melebihi rekomendasi 30% untuk profil risiko moderat. Pertimbangkan diversifikasi ke saham US atau obligasi.',
    action: 'Lihat Grow',
    actionPath: '/grow',
  },
  {
    type: 'positive',
    icon: '🚀',
    title: 'NVDA Outperform',
    description: 'Posisi NVDA Anda +11.8% dalam 30 hari terakhir, jauh di atas rata-rata sektor teknologi (+3.2%). Pertahankan posisi ini.',
    action: null,
  },
  {
    type: 'info',
    icon: '💡',
    title: 'Optimalkan Return dengan Earn',
    description: 'Saldo IDR Rp20jt tidak menghasilkan return. Dengan IDDR Earn 8.5% APY, Anda bisa mendapat ~Rp142rb/bulan pasif.',
    action: 'IDDR Earn',
    actionPath: '/grow/earn/iddr-earn',
  },
  {
    type: 'warning',
    icon: '📉',
    title: 'TSLA dalam Tren Negatif',
    description: 'Posisi TSLA Anda -8.4%. Analis konsensus merekomendasikan Hold dengan target $215. Pantau terus perkembangan fundamental.',
    action: null,
  },
  {
    type: 'positive',
    icon: '🎯',
    title: 'Portfolio Terdiversifikasi dengan Baik',
    description: 'Anda memiliki eksposur di 5 kelas aset berbeda (Crypto, US, HK, CN, Gold). Ini memberi perlindungan yang baik terhadap volatilitas.',
    action: null,
  },
]

const CONFIG = {
  warning: { bg: 'bg-orange-50', border: 'border-orange-100', btn: 'bg-orange-100 text-orange-700' },
  positive: { bg: 'bg-green-50', border: 'border-green-100', btn: 'bg-green-100 text-green-700' },
  info: { bg: 'bg-blue-50', border: 'border-blue-100', btn: 'bg-blue-100 text-blue-700' },
}

export default function AIInsightPage() {
  return (
    <DetailPage title="AI Portfolio Insights">
      <div className="px-4 py-4">
        {/* AI Banner */}
        <div className="bg-surface-dark rounded-card p-4 mb-5 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center text-xl">🤖</div>
            <div>
              <p className="text-sm font-bold">AI Portfolio Advisor</p>
              <p className="text-xs text-gray-400">Diperbarui hari ini, 06:00</p>
            </div>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Berdasarkan analisis portofolio Anda, saya mendeteksi 5 insight penting. Secara keseluruhan, portofolio Anda cukup baik namun ada beberapa optimasi yang bisa dilakukan.
          </p>
        </div>

        <div className="space-y-3">
          {AI_INSIGHTS.map((insight, i) => {
            const config = CONFIG[insight.type]
            return (
              <div key={i} className={`${config.bg} border ${config.border} rounded-card p-4`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{insight.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 mb-1">{insight.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{insight.description}</p>
                    {insight.action && (
                      <button className={`mt-2 text-xs font-semibold px-3 py-1.5 rounded-pill ${config.btn} active:opacity-80`}>
                        {insight.action} →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DetailPage>
  )
}
