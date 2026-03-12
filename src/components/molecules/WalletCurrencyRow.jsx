import { formatIDR, formatCurrency } from '../../utils/formatters'

const CURRENCY_BADGE = {
  IDR:  { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Rp' },
  USD:  { bg: 'bg-blue-100',   text: 'text-blue-700',   label: '$' },
  HKD:  { bg: 'bg-orange-100', text: 'text-orange-700', label: 'HK' },
  RMB:  { bg: 'bg-red-100',    text: 'text-red-700',    label: '¥' },
  SGD:  { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'S$' },
}

const CURRENCY_NAME = {
  IDR: 'Rupiah Indonesia',
  USD: 'US Dollar',
  HKD: 'Hong Kong Dollar',
  RMB: 'Renminbi',
  SGD: 'Singapore Dollar',
}

export default function WalletCurrencyRow({ entry, fxRates, onClick }) {
  const { balance, currency } = entry
  const valueIDR = currency === 'IDR' ? balance : balance * (fxRates?.[currency] || 1)
  const badge = CURRENCY_BADGE[currency] || { bg: 'bg-gray-100', text: 'text-gray-600', label: currency.slice(0, 2) }

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-3.5 active:bg-gray-50 transition-colors text-left"
    >
      {/* Currency badge */}
      <div className={`w-10 h-10 rounded-full ${badge.bg} flex items-center justify-center flex-shrink-0`}>
        <span className={`text-xs font-extrabold ${badge.text}`}>{badge.label}</span>
      </div>

      {/* Name + IDR equiv */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900">{currency}</p>
        <p className="text-xs text-gray-400">{CURRENCY_NAME[currency] || currency}</p>
      </div>

      {/* Native balance + IDR equiv */}
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold text-gray-900 tabular-nums">
          {formatCurrency(balance, currency)}
        </p>
        {currency !== 'IDR' && (
          <p className="text-xs text-gray-400 tabular-nums">≈ {formatIDR(valueIDR)}</p>
        )}
      </div>
    </button>
  )
}
