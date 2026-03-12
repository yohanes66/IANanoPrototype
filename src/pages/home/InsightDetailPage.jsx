import { useParams } from 'react-router-dom'
import DetailPage from '../../components/templates/DetailPage'
import Badge from '../../components/atoms/Badge'
import Button from '../../components/atoms/Button'
import { INSIGHTS_DATA } from '../../mock-data/insights'
import { useUI } from '../../context/UIContext'
import { formatDate } from '../../utils/formatters'

const CAT_COLORS = { 'Crypto': 'orange', 'US Stocks': 'blue', 'Gold': 'yellow', 'Education': 'gray', 'Bonds': 'green', 'HK Stocks': 'blue' }

export default function InsightDetailPage() {
  const { id } = useParams()
  const { openSheet } = useUI()
  const article = INSIGHTS_DATA.articles.find(a => a.id === id)

  if (!article) return <DetailPage title="Artikel tidak ditemukan"><p className="p-4 text-gray-400">Artikel tidak ditemukan</p></DetailPage>

  const paragraphs = article.content.split('\n\n')

  return (
    <DetailPage title="">
      <div className="px-4 py-4 pb-28">
        <Badge color={CAT_COLORS[article.category] || 'gray'} size="sm">{article.category}</Badge>
        <h1 className="text-xl font-extrabold text-gray-900 mt-3 mb-2 leading-tight">{article.title}</h1>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs text-gray-400">✍️ {article.author}</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">⏱ {article.readTime} menit</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{formatDate(article.publishedAt)}</span>
        </div>

        <div className="space-y-4">
          {paragraphs.map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <p key={i} className="text-sm font-bold text-gray-900">{para.replace(/\*\*/g, '')}</p>
            }
            if (para.startsWith('•')) {
              return (
                <ul key={i} className="space-y-1">
                  {para.split('\n').map((line, j) => (
                    <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-brand mt-0.5">•</span>
                      <span>{line.replace('•', '').trim()}</span>
                    </li>
                  ))}
                </ul>
              )
            }
            return <p key={i} className="text-sm text-gray-700 leading-relaxed">{para}</p>
          })}
        </div>

        {article.tags?.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-6 pt-4 border-t border-gray-100">
            {article.tags.map(tag => (
              <span key={tag} className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-pill">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Direct Buy CTA */}
      {article.hasDirectBuy && article.buyAssetTicker && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 px-4 py-3 z-30">
          <Button
            variant="orange"
            fullWidth
            size="xl"
            onClick={() => openSheet('buy', { ticker: article.buyAssetTicker })}
          >
            Beli {article.buyAssetTicker} Langsung →
          </Button>
        </div>
      )}
    </DetailPage>
  )
}
