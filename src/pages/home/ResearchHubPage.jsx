import { useState } from 'react'
import InsightCard from '../../components/molecules/InsightCard'
import Chip from '../../components/atoms/Chip'
import { INSIGHTS_DATA } from '../../mock-data/insights'

export default function ResearchHubPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')

  const filtered = activeCategory === 'Semua'
    ? INSIGHTS_DATA.articles
    : INSIGHTS_DATA.articles.filter(a => a.category === activeCategory)

  return (
    <div className="pb-4">
      <div className="bg-white px-4 pt-3 pb-3 sticky top-0 z-10">
        <h1 className="text-xl font-extrabold text-gray-900 mb-3">Nano Insights</h1>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {INSIGHTS_DATA.categories.map(cat => (
            <Chip key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {filtered.map(article => (
          <InsightCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
