import MarketPulseCard from '../../../components/molecules/MarketPulseCard'
import AssetListItem from '../../../components/molecules/AssetListItem'
import SectionHeader from '../../../components/molecules/SectionHeader'
import { MARKET_DATA } from '../../../mock-data/market'
import { ASSETS } from '../../../mock-data/assets'
import Badge from '../../../components/atoms/Badge'

export default function HKTab() {
  const hkAssets = ASSETS.filter(a => a.class === 'hk')

  return (
    <div className="px-4 py-4 space-y-4">
      <MarketPulseCard data={MARKET_DATA.marketPulse.hk} />
      <div className="bg-white rounded-card shadow-card p-4">
        <SectionHeader title="Saham Hong Kong" />
        <div className="divide-y divide-gray-50">
          {hkAssets.map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
      </div>
      <div className="bg-blue-50 rounded-card p-4 border border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🏗️</span>
          <p className="text-sm font-bold text-gray-900">Fitur Segmentasi Industri</p>
        </div>
        <p className="text-xs text-gray-500">Analisis mendalam industri Hang Seng segera hadir</p>
        <Badge color="blue" size="sm">Coming Soon</Badge>
      </div>
    </div>
  )
}
