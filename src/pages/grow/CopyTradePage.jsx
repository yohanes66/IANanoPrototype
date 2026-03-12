import { useState } from 'react'
import DetailPage from '../../components/templates/DetailPage'
import Avatar from '../../components/atoms/Avatar'
import { GROW_DATA } from '../../mock-data/grow'

export default function CopyTradePage() {
  const { copyTrades } = GROW_DATA.automate
  const [following, setFollowing] = useState([])

  const toggleFollow = (id) => {
    setFollowing(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <DetailPage title="Copy Trade">
      <div className="px-4 py-4 space-y-4 pb-8">

        {/* Hero description */}
        <div className="bg-surface-dark rounded-card p-4 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                <path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold">Copy Trade</p>
              <p className="text-xs text-gray-400">Ikuti strategi trader terbaik secara otomatis</p>
            </div>
          </div>
          <div className="flex gap-4 pt-2 border-t border-white/10">
            <div>
              <p className="text-xs text-gray-400">Trader Aktif</p>
              <p className="text-base font-extrabold tabular-nums">{copyTrades.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Avg. Return 30H</p>
              <p className="text-base font-extrabold text-positive tabular-nums">
                +{(copyTrades.reduce((s, t) => s + t.return30d, 0) / copyTrades.length).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Biaya</p>
              <p className="text-base font-extrabold tabular-nums">10%</p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-card shadow-card p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Cara Kerja</p>
          <div className="space-y-3">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-surface-dark text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trader list */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Pilih Trader</p>
          <div className="space-y-3">
            {copyTrades.map(trader => {
              const isFollowing = following.includes(trader.id)
              return (
                <div key={trader.id} className="bg-white rounded-card shadow-card p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar name={trader.trader} size="lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">{trader.trader}</p>
                      <p className="text-xs text-gray-400">{trader.handle} · {trader.followers.toLocaleString('id-ID')} followers</p>
                    </div>
                    <button
                      onClick={() => toggleFollow(trader.id)}
                      className={`px-4 py-2 rounded-pill text-xs font-bold transition-all active:scale-95 ${
                        isFollowing
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-surface-dark text-white'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-0 divide-x divide-gray-100 bg-gray-50 rounded-xl overflow-hidden">
                    <div className="flex-1 px-3 py-2 text-center">
                      <p className="text-xs text-gray-400">Return 30H</p>
                      <p className="text-sm font-extrabold text-positive tabular-nums">+{trader.return30d}%</p>
                    </div>
                    <div className="flex-1 px-3 py-2 text-center">
                      <p className="text-xs text-gray-400">Followers</p>
                      <p className="text-sm font-extrabold text-gray-900 tabular-nums">{trader.followers.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex-1 px-3 py-2 text-center">
                      <p className="text-xs text-gray-400">Fee</p>
                      <p className="text-sm font-extrabold text-gray-900 tabular-nums">{trader.fee}%</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center leading-relaxed px-2">
          Copy trade tidak menjamin keuntungan. Hasil masa lalu bukan indikator hasil masa depan.
        </p>
      </div>
    </DetailPage>
  )
}

const HOW_IT_WORKS = [
  { title: 'Pilih Trader', desc: 'Temukan trader dengan track record terbaik sesuai preferensi risiko Anda.' },
  { title: 'Tentukan Modal', desc: 'Atur berapa modal yang ingin Anda alokasikan untuk mengikuti trader.' },
  { title: 'Berjalan Otomatis', desc: 'Setiap transaksi trader secara otomatis direplikasi ke portofolio Anda.' },
]
