import { useNavigate } from 'react-router-dom'
import MarketPulseCard from '../../../components/molecules/MarketPulseCard'
import AssetListItem from '../../../components/molecules/AssetListItem'
import SectionHeader from '../../../components/molecules/SectionHeader'
import GainersLosersTable from '../../../components/organisms/GainersLosersTable'
import { MARKET_DATA } from '../../../mock-data/market'
import { ASSETS, TRENDING } from '../../../mock-data/assets'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import { formatDate } from '../../../utils/formatters'

const IMPACT_COLOR = { high: 'bg-red-500', medium: 'bg-yellow-400', low: 'bg-green-400' }

export default function USTab() {
  const navigate = useNavigate()
  const usAssets = ASSETS.filter(a => a.class === 'us')
  const trendingUS = TRENDING.us.map(t => ASSETS.find(a => a.ticker === t)).filter(Boolean)
  const segments = MARKET_DATA.industrySegments.us

  return (
    <div className="px-4 py-4 space-y-4">
      {/* AI Market Pulse */}
      <MarketPulseCard data={MARKET_DATA.marketPulse.us} />

      {/* Industry Segmentation */}
      <div className="bg-white rounded-card shadow-card p-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Segmentasi Industri S&P 500</p>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={segments} layout="vertical" margin={{ left: 0, right: 30 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} width={72} />
              <Tooltip
                contentStyle={{ fontSize: 10, borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(v, n, p) => [`${v}%`, '']}
              />
              <Bar dataKey="pct" radius={[0, 4, 4, 0]} fill="#111">
                {segments.map((s, i) => (
                  <Cell key={i} fill={i === 0 ? '#F7931A' : '#E5E7EB'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-3 gap-2">
        <FeatureCard title="Kalender Ekonomi" emoji="📅" items={MARKET_DATA.economicCalendar.slice(0,2)} type="calendar" />
        <FeatureCard title="Dividen" emoji="💵" items={MARKET_DATA.dividends.slice(0,2)} type="dividend" />
        <FeatureCard title="Analis" emoji="⭐" items={MARKET_DATA.analystRatings.slice(0,2)} type="analyst" />
      </div>

      {/* Trending */}
      <div className="bg-white rounded-card shadow-card p-4">
        <SectionHeader title="Trending Saham & ETF" />
        <div className="divide-y divide-gray-50">
          {trendingUS.map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
      </div>

      {/* Gainers/Losers */}
      <div className="bg-white rounded-card shadow-card p-4">
        <SectionHeader title="Pergerakan" />
        <GainersLosersTable />
      </div>
    </div>
  )
}

function FeatureCard({ title, emoji, items, type }) {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-2xl shadow-card p-3 cursor-pointer active:bg-gray-50" onClick={() => {}}>
      <span className="text-xl">{emoji}</span>
      <p className="text-xs font-bold text-gray-900 mt-1.5 leading-tight">{title}</p>
      <div className="mt-2 space-y-1">
        {items.map((item, i) => (
          <div key={i}>
            {type === 'calendar' && (
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-[9px] text-gray-500 truncate">{item.event.slice(0, 18)}</p>
              </div>
            )}
            {type === 'dividend' && (
              <p className="text-[9px] text-gray-500">{item.ticker} ex {item.exDate?.slice(5)}</p>
            )}
            {type === 'analyst' && (
              <p className="text-[9px] text-gray-500">{item.ticker} {item.rating}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
