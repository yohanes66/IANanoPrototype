import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EarnProgramCard from '../../components/molecules/EarnProgramCard'
import SectionHeader from '../../components/molecules/SectionHeader'
import { GROW_DATA } from '../../mock-data/grow'
import { formatIDR } from '../../utils/formatters'
import { useDesignVariant } from '../../context/DesignVariantContext'

const GROW_TABS = ['Yield', 'Borrow', 'Utility']

export default function GrowPage() {
  const navigate = useNavigate()
  const { variant } = useDesignVariant()
  const [activeTab, setActiveTab] = useState('Yield')

  return (
    <div className="pb-20">
      {/* Header + Tab Bar */}
      <div className="bg-white sticky top-0 z-20">
        <div className="px-4 pt-3 pb-0">
          <h1 className="text-xl font-extrabold text-gray-900 mb-3">Grow</h1>
        </div>
        <div className="flex px-4 border-b border-gray-100">
          {GROW_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-bold border-b-2 transition-colors ${
                activeTab === tab ? 'text-gray-900 border-surface-dark' : 'text-gray-400 border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ─── YIELD ─────────────────────────────────────────── */}
      {activeTab === 'Yield' && (
        <div className="space-y-2 mt-2">
          {/* Earn Program — both variants */}
          <div className="px-4 py-4 bg-white">
            <SectionHeader title={variant === 'option2' ? 'Earning & Deposito Emas' : 'Earn Program'} seeAllPath="/grow/earn/iddr-earn" />
            <div className="space-y-3">
              {GROW_DATA.earn.map(p => <EarnProgramCard key={p.id} program={p} type="earn" />)}
            </div>
            {/* Option 2: additional Deposito Emas */}
            {variant === 'option2' && (
              <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Deposito Emas</p>
                  <p className="text-xs text-gray-500 mt-0.5">Simpan emas, dapat yield rutin</p>
                  <p className="text-xs font-semibold text-amber-600 mt-0.5">Min. 1 gram</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-amber-600">3.5%</p>
                  <p className="text-xs text-gray-400">p.a.</p>
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-4 bg-white">
            <SectionHeader title="Staking" />
            <div className="space-y-3">
              {GROW_DATA.staking.map(p => <EarnProgramCard key={p.id} program={p} type="staking" />)}
            </div>
          </div>

          <div className="px-4 py-4 bg-white">
            <SectionHeader title={variant === 'option2' ? 'Tokenized Bonds (IDDB)' : 'ID Digital Bonds'} seeAllPath="/grow/bonds" />
            <div className="space-y-2">
              {GROW_DATA.bonds.map(bond => (
                <div
                  key={bond.id}
                  className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-center justify-between cursor-pointer active:opacity-80 transition-opacity"
                  onClick={() => navigate('/grow/bonds')}
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">{variant === 'option2' ? bond.name.replace('IDDB', 'IDDB') : bond.name}</p>
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

          {/* Option 2 only: Reksadana Kripto */}
          {variant === 'option2' && (
            <div className="px-4 py-4 bg-white">
              <SectionHeader title="Reksadana Kripto" />
              <div className="space-y-2">
                {[
                  { name: 'Nano Crypto Balanced', risk: 'Moderat', ret: '+18.4%', ytd: 'YTD' },
                  { name: 'Nano BTC-ETH Fund', risk: 'Tinggi', ret: '+31.2%', ytd: 'YTD' },
                  { name: 'Nano Stable Yield', risk: 'Rendah', ret: '+7.8%', ytd: 'YTD' },
                ].map(f => (
                  <div key={f.name} className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between cursor-pointer active:opacity-80">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{f.name}</p>
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Risiko {f.risk}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-blue-600">{f.ret}</p>
                      <p className="text-xs text-gray-400">{f.ytd}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── BORROW ────────────────────────────────────────── */}
      {activeTab === 'Borrow' && (
        <div className="px-4 py-4 space-y-3">
          {/* Gadai Aset (Option 2) / Gadai Digital (Option 1) */}
          <div className="bg-white rounded-card shadow-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{variant === 'option2' ? 'Gadai Aset' : 'Gadai Digital'}</h4>
                <p className="text-xs text-gray-500">{variant === 'option2' ? 'Pinjam cash langsung, cicil bayar balik' : 'Pinjam IDR dengan kolateral crypto'}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="text-xl font-extrabold text-purple-600">0.5%</p>
                <p className="text-xs text-gray-400">bunga/bln</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
              <div>
                <p className="text-xs text-gray-400">LTV Maks.</p>
                <p className="text-xs font-semibold text-gray-700">60%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Kolateral</p>
                <p className="text-xs font-semibold text-gray-700">BTC, ETH, dll</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => navigate('/grow/gadai')}
                  className="bg-surface-dark text-white text-xs font-bold px-4 py-2 rounded-pill active:opacity-80"
                >
                  Mulai Gadai
                </button>
              </div>
            </div>
          </div>

          {/* Cicil Aset (Option 2) / Cicil Emas (Option 1) */}
          <div className="bg-white rounded-card shadow-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{variant === 'option2' ? 'Cicil Aset' : 'Cicil Emas'}</h4>
                <p className="text-xs text-gray-500">{variant === 'option2' ? 'Dapat aset langsung, cicil bayar utang' : 'Beli emas fisik dengan cicilan fleksibel'}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="text-xl font-extrabold text-amber-500">{variant === 'option2' ? 'Multi' : '1g'}</p>
                <p className="text-xs text-gray-400">{variant === 'option2' ? 'aset' : 'mulai dari'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
              <div>
                <p className="text-xs text-gray-400">Jangka</p>
                <p className="text-xs font-semibold text-gray-700">6–24 bulan</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Uang muka</p>
                <p className="text-xs font-semibold text-gray-700">Mulai 10%</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => navigate('/grow/cicil')}
                  className="bg-surface-dark text-white text-xs font-bold px-4 py-2 rounded-pill active:opacity-80"
                >
                  Mulai Cicil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── UTILITY ───────────────────────────────────────── */}
      {activeTab === 'Utility' && (
        <div className="px-4 py-4 space-y-3">
          {/* NBT Xchange — both variants */}
          <div className="bg-white rounded-card shadow-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">NBT Xchange</h4>
                <p className="text-xs text-gray-500">Tukar koin NBT untuk pulsa, voucher, dan utilitas lainnya</p>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="text-xl font-extrabold text-indigo-600">50+</p>
                <p className="text-xs text-gray-400">merchant</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
              <div>
                <p className="text-xs text-gray-400">Kategori</p>
                <p className="text-xs font-semibold text-gray-700">Pulsa, Voucher, dll</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Pembayaran</p>
                <p className="text-xs font-semibold text-gray-700">Koin NBT</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => navigate('/grow/nbt-xchange')}
                  className="bg-surface-dark text-white text-xs font-bold px-4 py-2 rounded-pill active:opacity-80"
                >
                  Buka
                </button>
              </div>
            </div>
          </div>

          {/* Option 1 only: Automate items */}
          {variant === 'option1' && (
            <>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest pt-1">Automate</p>
              {AUTOMATE_ITEMS.map(item => (
                <div key={item.title} className="bg-white rounded-card shadow-card p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <div className="ml-3 shrink-0">
                      <button
                        onClick={() => navigate(item.path)}
                        className="bg-surface-dark text-white text-xs font-bold px-4 py-2 rounded-pill active:opacity-80"
                      >
                        Mulai
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                    {item.meta.map(m => (
                      <div key={m.label}>
                        <p className="text-xs text-gray-400">{m.label}</p>
                        <p className="text-xs font-semibold text-gray-700">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

const BORROW_ITEMS = [
  {
    title: 'Gadai Digital',
    desc: 'Pinjam IDR dengan kolateral crypto. LTV 60%, bunga 0.5%/bulan.',
    path: '/grow/gadai',
    color: 'from-purple-50 to-purple-100',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    title: 'Cicil Emas',
    desc: 'Beli emas fisik dengan cicilan fleksibel mulai 1g.',
    path: '/grow/cicil',
    color: 'from-yellow-50 to-amber-100',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
]

const AUTOMATE_ITEMS = [
  {
    title: 'Copy Trade',
    desc: 'Salin strategi trader terbaik secara otomatis',
    path: '/grow/automate/copy-trade',
    meta: [
      { label: 'Trader aktif', value: '120+' },
      { label: 'Min. modal', value: 'Rp 100rb' },
      { label: 'Fee', value: '10% profit' },
    ],
  },
  {
    title: 'DCA Otomatis',
    desc: 'Beli aset secara rutin pada jadwal yang Anda tentukan',
    path: '/grow/automate/dca',
    meta: [
      { label: 'Frekuensi', value: 'Harian–Bulanan' },
      { label: 'Min. per order', value: 'Rp 50rb' },
      { label: 'Fee', value: 'Gratis' },
    ],
  },
  {
    title: 'Bundle',
    desc: 'Beli paket aset terdiversifikasi dalam satu transaksi',
    path: '/grow/automate/bundle',
    meta: [
      { label: 'Pilihan bundle', value: '10+' },
      { label: 'Min. investasi', value: 'Rp 500rb' },
      { label: 'Rebalance', value: 'Otomatis' },
    ],
  },
]
