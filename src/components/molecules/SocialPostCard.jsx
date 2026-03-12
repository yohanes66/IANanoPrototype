import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../atoms/Avatar'
import TierBadge from './TierBadge'
import { formatRelativeTime } from '../../utils/formatters'
import { useUI } from '../../context/UIContext'
import { ASSET_MAP } from '../../mock-data/assets'

export default function SocialPostCard({ post, compact = false }) {
  const navigate = useNavigate()
  const { openSheet } = useUI()
  const [liked, setLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = (e) => {
    e.stopPropagation()
    setLiked(l => !l)
    setLikeCount(c => liked ? c - 1 : c + 1)
  }

  const renderContent = (text) => {
    const parts = text.split(/(\$[A-Z0-9.]+)/g)
    return parts.map((part, i) => {
      if (part.startsWith('$')) {
        const ticker = part.slice(1)
        return (
          <span
            key={i}
            className="text-brand font-semibold cursor-pointer"
            onClick={(e) => { e.stopPropagation(); navigate(`/market/asset/${ticker}`) }}
          >
            {part}
          </span>
        )
      }
      return part
    })
  }

  return (
    <div
      className="bg-white rounded-card shadow-card p-4 active:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/social/${post.id}`)}
    >
      <div className="flex items-start gap-3">
        <Avatar name={post.author.name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-gray-900">{post.author.name}</span>
            <TierBadge tier={post.author.tier} size="sm" />
            <span className="text-xs text-gray-400">{formatRelativeTime(post.timestamp)}</span>
          </div>
          <p className="text-xs text-gray-500">{post.author.handle}</p>
          <p className={`text-sm text-gray-700 mt-2 leading-relaxed ${compact ? 'line-clamp-3' : ''}`}>
            {renderContent(post.content)}
          </p>
          {post.taggedAssets?.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {post.taggedAssets.map(ticker => {
                const asset = ASSET_MAP[ticker]
                return (
                  <button
                    key={ticker}
                    onClick={(e) => { e.stopPropagation(); openSheet('buy', { ticker }) }}
                    className="flex items-center gap-1 bg-brand-light text-brand text-xs font-semibold px-2 py-1 rounded-pill active:bg-orange-100"
                  >
                    <span style={{ backgroundColor: asset?.iconBg || '#888' }} className="w-3 h-3 rounded-full" />
                    {ticker}
                  </button>
                )
              })}
            </div>
          )}
          <div className="flex items-center gap-4 mt-3">
            <button onClick={handleLike} className={`flex items-center gap-1 text-xs font-medium ${liked ? 'text-red-500' : 'text-gray-400'} active:scale-110`}>
              {liked ? '❤️' : '🤍'} {likeCount}
            </button>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              💬 {post.comments}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              🔁 {post.reposts}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
