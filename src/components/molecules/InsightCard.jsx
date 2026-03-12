import { useNavigate } from 'react-router-dom'
import Badge from '../atoms/Badge'
import { ASSET_MAP } from '../../mock-data/assets'

const CAT_COLORS = {
  'Crypto': 'orange', 'US Stocks': 'blue', 'Gold': 'yellow',
  'Education': 'gray', 'Bonds': 'green', 'HK Stocks': 'blue',
}

export default function InsightCard({ article, compact = false }) {
  const navigate = useNavigate()

  return (
    <div
      className={`bg-white rounded-card shadow-card p-4 cursor-pointer active:bg-gray-50 ${compact ? 'w-52 flex-shrink-0' : ''}`}
      onClick={() => navigate(`/insights/${article.id}`)}
    >
      <Badge color={CAT_COLORS[article.category] || 'gray'} size="xs">{article.category}</Badge>
      <h4 className={`font-bold text-gray-900 mt-2 leading-snug ${compact ? 'text-sm line-clamp-2' : 'text-sm'}`}>{article.title}</h4>
      {!compact && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{article.summary}</p>}
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-400">⏱ {article.readTime} menit</span>
        {article.hasDirectBuy && (
          <span className="text-xs font-semibold text-brand">Beli Langsung →</span>
        )}
      </div>
    </div>
  )
}
