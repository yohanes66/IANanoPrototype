import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WalletCurrencyRow from '../../components/molecules/WalletCurrencyRow'
import TransactionRow from '../../components/molecules/TransactionRow'
import { useWallet } from '../../context/WalletContext'
import { formatIDR } from '../../utils/formatters'

const TX_FILTERS = [
  { id: 'all',         label: 'Semua' },
  { id: 'topup',       label: 'Top Up' },
  { id: 'buy',         label: 'Beli' },
  { id: 'sell',        label: 'Jual' },
  { id: 'fx_transfer', label: 'Transfer' },
  { id: 'earn',        label: 'Earn' },
]

const PAYMENT_ITEMS = [
  {
    title: 'Kartu Kredit Cobranding',
    desc: 'Kartu kredit dengan cashback ke saldo investasi',
    color: 'from-gray-100 to-gray-200',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>
      </svg>
    ),
  },
  {
    title: 'Collateral Kartu Kredit',
    desc: 'Gunakan aset sebagai kolateral untuk limit kartu kredit',
    color: 'from-blue-50 to-blue-100',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>
        <circle cx="18" cy="16" r="1.5" fill="#2563EB"/>
      </svg>
    ),
  },
  {
    title: 'Collateral Kartu Debit',
    desc: 'Gunakan aset sebagai kolateral untuk kartu debit',
    color: 'from-green-50 to-green-100',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>
        <line x1="5" y1="15" x2="9" y2="15"/>
      </svg>
    ),
  },
]

const CRYPTO_BADGE = {
  BTC:  { bg: '#F7931A', label: '₿' },
  ETH:  { bg: '#627EEA', label: 'Ξ' },
  USDT: { bg: '#26A17B', label: '₮' },
}

const CRYPTO_NAME = {
  BTC: 'Bitcoin', ETH: 'Ethereum', USDT: 'Tether',
}

export default function WalletPage() {
  const navigate = useNavigate()
  const { wallet } = useWallet()
  const { fiat, crypto, fxRates, transactions } = wallet
  const [activeTab, setActiveTab] = useState('dompet')
  const [dompetSubTab, setDompetSubTab] = useState('fiat')
  const [txFilter, setTxFilter] = useState('all')

  const totalFiat = Object.values(fiat).reduce((sum, f) =>
    f.currency === 'IDR' ? sum + f.balance : sum + f.balance * (fxRates[f.currency] || 0), 0)
  const totalCrypto = Object.values(crypto).reduce((sum, c) => sum + c.valueIDR, 0)
  const grandTotal = totalFiat + totalCrypto

  const filteredTx = txFilter === 'all' ? transactions : transactions.filter(t => t.type === txFilter)

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Balance Hero ── */}
      <div className="bg-white px-4 pt-3 pb-4">
        {activeTab === 'dompet' ? (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 -ml-1"
                aria-label="Kembali"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <h1 className="text-xl font-extrabold text-gray-900">Wallet</h1>
            </div>
            <button
              onClick={() => setActiveTab('riwayat')}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
              aria-label="Riwayat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setActiveTab('dompet')}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 -ml-1"
              aria-label="Kembali"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <h1 className="text-xl font-extrabold text-gray-900">Riwayat</h1>
          </div>
        )}
        <div className="bg-surface-dark rounded-card p-5 text-white">
          <p className="text-xs text-gray-400 mb-1">Total Saldo</p>
          <h2 className="text-3xl font-extrabold tracking-tight tabular-nums">{formatIDR(grandTotal)}</h2>
          <div className="flex gap-5 mt-3 pt-3 border-t border-white/10">
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">Fiat</p>
              <p className="text-sm font-bold tabular-nums">{formatIDR(totalFiat)}</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">Crypto</p>
              <p className="text-sm font-bold tabular-nums">{formatIDR(totalCrypto)}</p>
            </div>
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div className="flex gap-2 mt-3">
          <QuickAction icon={<PlusIcon />} label="Top Up" onClick={() => navigate('/wallet/topup')} />
          <QuickAction icon={<TransferIcon />} label="Transfer" onClick={() => navigate('/wallet/fx-transfer')} />
          <QuickAction icon={<SendIcon />} label="Kirim Crypto" onClick={() => navigate('/wallet/crypto/send')} />
          <QuickAction icon={<WithdrawIcon />} label="Tarik Dana" onClick={() => {}} />
        </div>
      </div>


      {/* ── Tab: Dompet ── */}
      {activeTab === 'dompet' && (
        <div className="pb-20">

          {/* Sub-tab pills */}
          <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-50">
            <div className="flex gap-2">
              {[{ id: 'fiat', label: 'Fiat' }, { id: 'crypto', label: 'Crypto' }, { id: 'payment', label: 'Payment' }].map(t => (
                <button
                  key={t.id}
                  onClick={() => setDompetSubTab(t.id)}
                  className={`h-8 px-4 rounded-pill text-xs font-bold transition-all ${
                    dompetSubTab === t.id ? 'bg-surface-dark text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fiat */}
          {dompetSubTab === 'fiat' && (
            <div className="bg-white mt-2 px-4 pt-2 pb-2">
              <div className="divide-y divide-gray-50">
                <WalletCurrencyRow
                  entry={fiat.IDR}
                  fxRates={fxRates}
                  onClick={() => navigate('/wallet/topup')}
                />
                {Object.values(fiat).filter(f => f.currency !== 'IDR').map(f => (
                  <WalletCurrencyRow
                    key={f.currency}
                    entry={f}
                    fxRates={fxRates}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Crypto */}
          {dompetSubTab === 'crypto' && (
            <div className="bg-white mt-2 px-4 pt-2 pb-2">
              <div className="divide-y divide-gray-50">
                {Object.entries(crypto).map(([ticker, data]) => {
                  const badge = CRYPTO_BADGE[ticker] || { bg: '#6B7280', label: ticker.slice(0, 1) }
                  return (
                    <button
                      key={ticker}
                      onClick={() => navigate('/wallet/crypto/send')}
                      className="w-full flex items-center gap-3 py-3.5 active:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: badge.bg }}>
                        <span className="text-sm font-extrabold text-white">{badge.label}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">{ticker}</p>
                        <p className="text-xs text-gray-400">{CRYPTO_NAME[ticker] || ticker}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-gray-900 tabular-nums">{formatIDR(data.valueIDR)}</p>
                        <p className="text-xs text-gray-400 tabular-nums">{data.balance} {ticker}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Payment */}
          {dompetSubTab === 'payment' && (
            <div className="px-4 mt-2 space-y-2 pb-4">
              {PAYMENT_ITEMS.map(item => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-4 flex items-center gap-3 opacity-70"
                >
                  <div className={`w-11 h-11 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full whitespace-nowrap">Segera Hadir</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Riwayat ── */}
      {activeTab === 'riwayat' && (
        <div className="pb-20">
          {/* Filter chips */}
          <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-50">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {TX_FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setTxFilter(f.id)}
                  className={`flex-shrink-0 h-8 px-3 rounded-pill text-xs font-bold transition-all ${
                    txFilter === f.id ? 'bg-surface-dark text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white mt-2 px-4 divide-y divide-gray-50">
            {filteredTx.length > 0 ? (
              filteredTx.map(tx => <TransactionRow key={tx.id} tx={tx} />)
            ) : (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-500">Belum ada transaksi</p>
                <p className="text-xs text-gray-400 mt-1">Riwayat akan muncul di sini</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function QuickAction({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col items-center gap-1.5 py-2.5 bg-gray-50 rounded-2xl active:bg-gray-100 transition-colors"
    >
      <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-700">
        {icon}
      </div>
      <span className="text-[10px] font-semibold text-gray-600 leading-tight text-center">{label}</span>
    </button>
  )
}

function PlusIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 4v16M4 12h16"/></svg>
}
function TransferIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
}
function SendIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
}
function WithdrawIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 20V4"/><path d="M5 13l7 7 7-7"/></svg>
}
