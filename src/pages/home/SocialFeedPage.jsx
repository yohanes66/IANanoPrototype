import { useState } from 'react'
import SocialPostCard from '../../components/molecules/SocialPostCard'
import { SOCIAL_DATA } from '../../mock-data/social'

const FEED_TABS = ['Trending', 'Following']

export default function SocialFeedPage() {
  const [activeTab, setActiveTab] = useState('Trending')

  const posts = activeTab === 'Trending'
    ? [...SOCIAL_DATA.posts].sort((a, b) => b.likes - a.likes)
    : SOCIAL_DATA.posts.filter(p => p.isFollowing)

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-0 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-extrabold text-gray-900">Social</h1>
          <button className="bg-surface-dark text-white text-xs font-bold px-3 py-1.5 rounded-pill active:opacity-80">
            + Post
          </button>
        </div>
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {FEED_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-bold transition-colors ${activeTab === tab ? 'text-gray-900 border-b-2 border-surface-dark' : 'text-gray-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 py-4 space-y-3">
        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-3xl mb-2">👥</p>
            <p className="text-sm text-gray-400">Belum ada post dari yang Anda ikuti</p>
          </div>
        ) : (
          posts.map(post => <SocialPostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}
