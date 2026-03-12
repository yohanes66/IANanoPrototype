import { useNavigate } from 'react-router-dom'
import EarnProgramCard from '../../components/molecules/EarnProgramCard'
import SectionHeader from '../../components/molecules/SectionHeader'
import { GROW_DATA } from '../../mock-data/grow'
import { formatIDR } from '../../utils/formatters'

export default function GrowPage() {
  const navigate = useNavigate()

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-4">
        <h1 className="text-xl font-extrabold text-gray-900 mb-1">Grow</h1>
        <p className="text-sm text-gray-500">Kembangkan aset Anda dengan berbagai produk investasi</p>
      </div>

      {/* Earn */}
      <div className="px-4 py-4 bg-white mt-2">
        <SectionHeader title="Earn Program" seeAllPath="/grow/earn/iddr-earn" />
        <div className="space-y-3">
          {GROW_DATA.earn.map(p => <EarnProgramCard key={p.id} program={p} type="earn" />)}
        </div>
      </div>

      {/* Staking */}
      <div className="px-4 py-4 bg-white mt-2">
        <SectionHeader title="Staking" />
        <div className="space-y-3">
          {GROW_DATA.staking.map(p => <EarnProgramCard key={p.id} program={p} type="staking" />)}
        </div>
      </div>

      {/* Bonds */}
      <div className="px-4 py-4 bg-white mt-2">
        <SectionHeader title="Obligasi Ritel" seeAllPath="/grow/bonds" />
        <div className="space-y-2">
          {GROW_DATA.bonds.map(bond => (
            <div
              key={bond.id}
              className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-center justify-between cursor-pointer active:opacity-80 transition-opacity"
              onClick={() => navigate('/grow/bonds')}
            >
              <div>
                <p className="text-sm font-bold text-gray-900">{bond.name}</p>
                <p className="text-xs text-gray-500">Jatuh tempo: {bond.maturity}</p>
                <p className="text-xs text-green-600 font-semibold tabular-nums">Min. {formatIDR(bond.minAmount, true)}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-green-600 tabular-nums">{bond.coupon}%</p>
                <p className="text-xs text-gray-400">kupon/tahun</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gadai Digital */}
      <div className="px-4 py-4 bg-white mt-2">
        <div
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-card p-4 cursor-pointer active:opacity-90 transition-opacity"
          onClick={() => navigate('/grow/gadai')}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-200 flex items-center justify-center flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">Gadai Digital</p>
              <p className="text-xs text-gray-500">Pinjam IDR, aset tetap jadi milik Anda</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="text-xs text-gray-400">LTV</p>
              <p className="text-sm font-bold text-purple-700 tabular-nums">60%</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Bunga</p>
              <p className="text-sm font-bold text-purple-700 tabular-nums">0.5%/bulan</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Aset</p>
              <p className="text-sm font-bold text-purple-700">BTC, ETH, BNB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Automate */}
      <div className="px-4 py-4 bg-white mt-2">
        <SectionHeader title="Automate" seeAllPath="/grow/automate" />
        <div className="grid grid-cols-3 gap-3">
          {AUTOMATE_ITEMS.map(item => (
            <div
              key={item.title}
              className="bg-gray-50 rounded-2xl p-3 text-center cursor-pointer active:bg-gray-100 transition-colors"
              onClick={() => navigate(item.path)}
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-card flex items-center justify-center mx-auto mb-2">
                {item.icon}
              </div>
              <p className="text-xs font-bold text-gray-900">{item.title}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const AUTOMATE_ITEMS = [
  {
    title: 'Copy Trade',
    desc: 'Ikuti trader terbaik',
    path: '/grow/automate/copy-trade',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
  },
  {
    title: 'DCA Otomatis',
    desc: 'Beli rutin terjadwal',
    path: '/grow/automate/dca',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Bundle',
    desc: 'Paket aset siap pakai',
    path: '/grow/automate/bundle',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/>
        <line x1="10" y1="12" x2="14" y2="12"/>
      </svg>
    ),
  },
]
