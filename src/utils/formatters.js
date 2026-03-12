export function formatIDR(amount, _compact = false) {
  if (amount === null || amount === undefined) return 'Rp-'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount)
}

export function formatUSD(amount) {
  if (amount === null || amount === undefined) return '$-'
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(amount)
}

export function formatCurrency(amount, currency) {
  if (currency === 'IDR') return formatIDR(amount)
  if (currency === 'USD') return `$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  if (currency === 'HKD') return `HK$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  if (currency === 'RMB') return `¥${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  if (currency === 'SGD') return `S$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return `${amount}`
}

export function formatPct(value, showPlus = true) {
  if (value === null || value === undefined) return '-'
  const sign = value > 0 && showPlus ? '+' : ''
  return `${sign}${Number(value).toFixed(2)}%`
}

export function formatCrypto(amount, ticker) {
  if (Math.abs(amount) < 0.0001) return `${amount.toFixed(8)} ${ticker}`
  if (Math.abs(amount) < 1) return `${amount.toFixed(4)} ${ticker}`
  return `${amount.toFixed(2)} ${ticker}`
}

export function formatNumber(n) {
  if (n >= 1_000_000_000_000) return `${(n / 1_000_000_000_000).toFixed(2)}T`
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`
  return String(n)
}

export function formatDate(isoString) {
  const d = new Date(isoString)
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatTime(isoString) {
  const d = new Date(isoString)
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export function formatRelativeTime(isoString) {
  const now = new Date()
  const d = new Date(isoString)
  const diff = (now - d) / 1000
  if (diff < 60) return 'baru saja'
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}j`
  if (diff < 604800) return `${Math.floor(diff / 86400)}h`
  return formatDate(isoString)
}

export function numpadDisplay(raw) {
  if (!raw || raw === '') return 'Rp0'
  const num = parseFloat(raw)
  if (isNaN(num)) return 'Rp0'
  return formatIDR(num)
}
