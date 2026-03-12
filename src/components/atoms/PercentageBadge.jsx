import { formatPct } from '../../utils/formatters'

export default function PercentageBadge({ value, size = 'sm', showArrow = true }) {
  const isPositive = value > 0
  const isZero = value === 0

  const color = isZero ? 'text-gray-500' : isPositive ? 'text-positive' : 'text-negative'
  const sizes = { xs: 'text-xs', sm: 'text-xs font-semibold', md: 'text-sm font-semibold', lg: 'text-base font-bold' }

  const arrow = showArrow ? (isPositive ? '▲' : isZero ? '' : '▼') : ''

  return (
    <span className={`${color} ${sizes[size]}`}>
      {arrow && <span className="mr-0.5">{arrow}</span>}
      {formatPct(value)}
    </span>
  )
}
