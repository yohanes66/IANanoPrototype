import { useNavigate } from 'react-router-dom'
import DetailPage from '../../components/templates/DetailPage'

const AUTOMATE_FEATURES = [
  {
    path: '/grow/automate/copy-trade',
    title: 'Copy Trade',
    desc: 'Ikuti strategi trader terbaik secara otomatis. Setiap transaksi trader direplikasi ke portofolio Anda.',
    stat: { label: 'Top Return 30H', value: '+24.1%', color: 'text-positive' },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    bg: 'from-blue-50 to-indigo-50',
    iconBg: 'bg-blue-100 text-blue-600',
    badge: '2 Trader Tersedia',
  },
  {
    path: '/grow/automate/dca',
    title: 'DCA Otomatis',
    desc: 'Beli aset secara berkala dengan jumlah tetap. Kurangi risiko volatilitas harga jangka pendek.',
    stat: { label: 'Min. Pembelian', value: 'Rp50.000', color: 'text-gray-900' },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    bg: 'from-green-50 to-emerald-50',
    iconBg: 'bg-green-100 text-green-600',
    badge: '1 Strategi Aktif',
  },
  {
    path: '/grow/automate/bundle',
    title: 'Bundle',
    desc: 'Beli paket aset yang sudah dikurasi. Diversifikasi otomatis dengan satu klik.',
    stat: { label: 'Top Bundle 30H', value: '+12.4%', color: 'text-positive' },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/>
        <line x1="10" y1="12" x2="14" y2="12"/>
      </svg>
    ),
    bg: 'from-orange-50 to-amber-50',
    iconBg: 'bg-orange-100 text-orange-600',
    badge: '2 Bundle Tersedia',
  },
]

export default function AutomatePage() {
  const navigate = useNavigate()

  return (
    <DetailPage title="Automate">
      <div className="px-4 py-4 pb-8 space-y-4">

        {/* Intro */}
        <p className="text-sm text-gray-500">
          Otomatisasi strategi investasi Anda. Pilih fitur di bawah sesuai gaya trading Anda.
        </p>

        {/* Feature cards */}
        {AUTOMATE_FEATURES.map(feature => (
          <button
            key={feature.path}
            onClick={() => navigate(feature.path)}
            className={`w-full text-left bg-gradient-to-r ${feature.bg} rounded-card border border-gray-100 p-4 active:opacity-80 transition-opacity`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center flex-shrink-0`}>
                {feature.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-base font-extrabold text-gray-900">{feature.title}</p>
                  <span className="text-[10px] bg-white/80 text-gray-600 font-semibold px-2 py-0.5 rounded-pill border border-gray-200 flex-shrink-0">
                    {feature.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{feature.desc}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400">{feature.stat.label}</p>
                    <p className={`text-sm font-bold tabular-nums ${feature.stat.color}`}>{feature.stat.value}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <span className="text-xs font-semibold">Lihat Detail</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </DetailPage>
  )
}
