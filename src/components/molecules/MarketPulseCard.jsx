import Badge from '../atoms/Badge'

export default function MarketPulseCard({ data }) {
  if (!data) return null
  const { sentiment, score, summary } = data

  const sentimentConfig = {
    bullish: { label: 'Bullish', color: 'green', emoji: '🟢', bgClass: 'from-green-50 to-transparent' },
    neutral: { label: 'Netral', color: 'gray', emoji: '🟡', bgClass: 'from-yellow-50 to-transparent' },
    bearish: { label: 'Bearish', color: 'red', emoji: '🔴', bgClass: 'from-red-50 to-transparent' },
  }
  const config = sentimentConfig[sentiment] || sentimentConfig.neutral

  return (
    <div className={`bg-gradient-to-b ${config.bgClass} bg-white border border-gray-100 rounded-card p-4 mb-4`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-surface-dark rounded-full flex items-center justify-center">
            <span className="text-xs">🤖</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">AI Market Pulse</p>
            <p className="text-[10px] text-gray-400">Diperbarui 1j lalu</p>
          </div>
        </div>
        <div className="text-right">
          <Badge color={sentiment === 'bullish' ? 'green' : sentiment === 'bearish' ? 'red' : 'gray'}>
            {config.emoji} {config.label}
          </Badge>
          <p className="text-xs text-gray-400 mt-1">Skor: {score}/100</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed">{summary}</p>
    </div>
  )
}
