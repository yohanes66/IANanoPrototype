import { useParams } from 'react-router-dom'
import DetailPage from '../../components/templates/DetailPage'
import Avatar from '../../components/atoms/Avatar'
import TierBadge from '../../components/molecules/TierBadge'
import SocialPostCard from '../../components/molecules/SocialPostCard'
import { SOCIAL_DATA } from '../../mock-data/social'

export default function UserProfilePage() {
  const { userId } = useParams()
  const allAuthors = SOCIAL_DATA.posts.map(p => p.author)
  const author = allAuthors.find(a => a.id === userId) || allAuthors[0]
  const userPosts = SOCIAL_DATA.posts.filter(p => p.author.id === author.id)
  const stats = userPosts[0]?.performanceStats || { totalReturn: 0, winRate: 0, followers: 0 }

  return (
    <DetailPage title="Profil">
      <div className="pb-4">
        {/* Profile Header */}
        <div className="bg-white px-4 pt-4 pb-4 mb-2">
          <div className="flex items-center gap-4 mb-4">
            <Avatar name={author.name} size="xl" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-extrabold text-gray-900">{author.name}</h2>
                <TierBadge tier={author.tier} />
              </div>
              <p className="text-sm text-gray-400">{author.handle}</p>
              <button className="mt-2 bg-surface-dark text-white text-xs font-bold px-4 py-1.5 rounded-pill active:opacity-80">
                Follow
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Total Return', value: `${stats.totalReturn > 0 ? '+' : ''}${stats.totalReturn}%`, color: stats.totalReturn >= 0 ? 'text-positive' : 'text-negative' },
              { label: 'Win Rate', value: `${stats.winRate}%`, color: 'text-blue-600' },
              { label: 'Followers', value: stats.followers.toLocaleString(), color: 'text-gray-900' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className={`text-lg font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="px-4 space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Post ({userPosts.length})</p>
          {userPosts.map(post => <SocialPostCard key={post.id} post={post} />)}
        </div>
      </div>
    </DetailPage>
  )
}
