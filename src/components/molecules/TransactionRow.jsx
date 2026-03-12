import { formatIDR, formatRelativeTime } from '../../utils/formatters'

const TX_CONFIG = {
  topup:       { label: 'Top Up',      color: 'text-positive', sign: '+', iconBg: 'bg-green-50',  iconStroke: '#22C55E' },
  buy:         { label: 'Beli',        color: 'text-gray-900', sign: '-', iconBg: 'bg-gray-100',  iconStroke: '#374151' },
  sell:        { label: 'Jual',        color: 'text-positive', sign: '+', iconBg: 'bg-green-50',  iconStroke: '#22C55E' },
  fx_transfer: { label: 'Transfer FX', color: 'text-gray-900', sign: '-', iconBg: 'bg-blue-50',   iconStroke: '#3B82F6' },
  earn:        { label: 'Earn',        color: 'text-positive', sign: '+', iconBg: 'bg-orange-50', iconStroke: '#F7931A' },
  cetak_emas:  { label: 'Cetak Emas',  color: 'text-gray-900', sign: '-', iconBg: 'bg-yellow-50', iconStroke: '#EAB308' },
  withdraw:    { label: 'Tarik Dana',  color: 'text-negative', sign: '-', iconBg: 'bg-red-50',    iconStroke: '#EF4444' },
}

const STATUS_BADGE = {
  completed:  null,
  processing: { text: 'Diproses', cls: 'text-yellow-600 bg-yellow-50' },
  shipped:    { text: 'Dikirim',  cls: 'text-blue-600 bg-blue-50' },
  delivered:  { text: 'Diterima', cls: 'text-positive bg-green-50' },
  failed:     { text: 'Gagal',    cls: 'text-negative bg-red-50' },
}

function TxIcon({ type, iconBg, iconStroke }) {
  const s = { stroke: iconStroke, fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const icons = {
    topup:       <svg width="16" height="16" viewBox="0 0 24 24" {...s}><path d="M12 20V4"/><path d="M5 11l7-7 7 7"/></svg>,
    buy:         <svg width="16" height="16" viewBox="0 0 24 24" {...s}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    sell:        <svg width="16" height="16" viewBox="0 0 24 24" {...s}><path d="M12 4v16"/><path d="M5 13l7 7 7-7"/></svg>,
    fx_transfer: <svg width="16" height="16" viewBox="0 0 24 24" {...s}><path d="M7 17L17 7M7 7h10v10"/></svg>,
    earn:        <svg width="16" height="16" viewBox="0 0 24 24" {...s}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    cetak_emas:  <svg width="16" height="16" viewBox="0 0 24 24" {...s}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    withdraw:    <svg width="16" height="16" viewBox="0 0 24 24" {...s}><path d="M12 4v16"/><path d="M5 13l7 7 7-7"/></svg>,
  }
  return (
    <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
      {icons[type] || <svg width="16" height="16" viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/></svg>}
    </div>
  )
}

export default function TransactionRow({ tx }) {
  const config = TX_CONFIG[tx.type] || { label: tx.type, color: 'text-gray-900', sign: '', iconBg: 'bg-gray-100', iconStroke: '#374151' }
  const statusBadge = STATUS_BADGE[tx.status]

  return (
    <div className="flex items-center gap-3 py-3">
      <TxIcon type={tx.type} iconBg={config.iconBg} iconStroke={config.iconStroke} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900 truncate">{tx.description}</p>
          {statusBadge && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${statusBadge.cls}`}>
              {statusBadge.text}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400">{formatRelativeTime(tx.timestamp)}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-semibold tabular-nums ${config.color}`}>
          {config.sign}{formatIDR(tx.amount)}
        </p>
        <p className="text-xs text-gray-400">{tx.currency}</p>
      </div>
    </div>
  )
}
