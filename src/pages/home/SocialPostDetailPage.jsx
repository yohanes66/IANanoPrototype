import { useState } from 'react'
import { useParams } from 'react-router-dom'
import DetailPage from '../../components/templates/DetailPage'
import SocialPostCard from '../../components/molecules/SocialPostCard'
import Avatar from '../../components/atoms/Avatar'
import { SOCIAL_DATA } from '../../mock-data/social'
import { PORTFOLIO } from '../../mock-data/portfolio'

const MOCK_COMMENTS = [
  { id: 'c1', author: 'Budi Santoso', handle: '@budi_invest', text: 'Setuju! Support di level ini sangat kuat. Saya juga menambah posisi.', time: '2j' },
  { id: 'c2', author: 'Dewi Kusuma', handle: '@dewi_crypto', text: 'Hati-hati dengan level resistensi di $41K ya. Bisa ada rejection dulu.', time: '1j' },
  { id: 'c3', author: 'Ahmad Fauzi', handle: '@ahmad_fx', text: 'Volume beli memang meningkat. Fundamentalnya bagus menjelang halving.', time: '45m' },
]

export default function SocialPostDetailPage() {
  const { postId } = useParams()
  const post = SOCIAL_DATA.posts.find(p => p.id === postId) || SOCIAL_DATA.posts[0]
  const [newComment, setNewComment] = useState('')

  return (
    <DetailPage title="Post">
      <div className="px-4 py-4 pb-24">
        <SocialPostCard post={post} />

        <div className="mt-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Komentar ({post.comments})</p>
          <div className="space-y-3">
            {MOCK_COMMENTS.map(c => (
              <div key={c.id} className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-card">
                <Avatar name={c.author} size="sm" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-gray-900">{c.author}</p>
                    <span className="text-xs text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-0.5">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment input */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-2 z-30">
        <Avatar name={PORTFOLIO.user.name} size="sm" />
        <input
          className="flex-1 bg-gray-100 rounded-pill px-4 py-2 text-sm focus:outline-none focus:bg-gray-50"
          placeholder="Tambahkan komentar..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <button className="text-brand font-bold text-sm active:opacity-70" onClick={() => setNewComment('')}>
          Kirim
        </button>
      </div>
    </DetailPage>
  )
}
