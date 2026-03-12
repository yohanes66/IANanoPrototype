const TIER_CONFIG = {
  bronze: { label: 'Bronze', emoji: '🥉', textColor: 'text-amber-700', bgColor: 'bg-amber-100', borderColor: 'border-amber-300' },
  silver: { label: 'Silver', emoji: '🥈', textColor: 'text-gray-500', bgColor: 'bg-gray-100', borderColor: 'border-gray-300' },
  gold: { label: 'Gold', emoji: '🥇', textColor: 'text-yellow-600', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-300' },
  platinum: { label: 'Platinum', emoji: '💎', textColor: 'text-slate-600', bgColor: 'bg-slate-100', borderColor: 'border-slate-300' },
}

export default function TierBadge({ tier, size = 'sm' }) {
  const config = TIER_CONFIG[tier] || TIER_CONFIG.bronze
  const sizes = { sm: 'text-xs px-2 py-1', md: 'text-sm px-3 py-1.5' }

  return (
    <span className={`inline-flex items-center gap-1 rounded-pill border font-bold ${config.textColor} ${config.bgColor} ${config.borderColor} ${sizes[size]}`}>
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  )
}

export { TIER_CONFIG }
