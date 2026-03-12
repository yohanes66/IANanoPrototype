import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MarketPulseCard from '../../../components/molecules/MarketPulseCard'
import AssetListItem from '../../../components/molecules/AssetListItem'
import SectionHeader from '../../../components/molecules/SectionHeader'
import GainersLosersTable from '../../../components/organisms/GainersLosersTable'
import Chip from '../../../components/atoms/Chip'
import Badge from '../../../components/atoms/Badge'
import { MARKET_DATA } from '../../../mock-data/market'
import { ASSETS, TRENDING } from '../../../mock-data/assets'
import { useUI } from '../../../context/UIContext'

const CATEGORIES = ['Semua', 'L1', 'DeFi', 'Web3', 'Meme', 'Exchange']

export default function CryptoTab() {
  const navigate = useNavigate()
  const { openSheet } = useUI()
  const [activeCategory, setActiveCategory] = useState('Semua')

  const cryptoAssets = ASSETS.filter(a => a.class === 'crypto')
  const filtered = activeCategory === 'Semua'
    ? cryptoAssets
    : cryptoAssets.filter(a => a.category.includes(activeCategory))

  const trendingSpot = TRENDING.crypto.map(t => ASSETS.find(a => a.ticker === t)).filter(Boolean)
  const web3Assets = TRENDING.web3.map(t => ASSETS.find(a => a.ticker === t)).filter(Boolean)

  return (
    <div className="px-4 py-4 space-y-4">
      {/* AI Market Pulse */}
      <MarketPulseCard data={MARKET_DATA.marketPulse.crypto} />

      {/* Feature Highlights */}
      <div className="grid grid-cols-2 gap-3">
        <FeatureCard
          icon="🔮"
          title="Gadai Digital"
          subtitle="Pinjam IDR, Hold Kripto"
          color="from-purple-50 to-purple-100"
          onClick={() => navigate('/grow/gadai')}
        />
        <FeatureCard
          icon="🔄"
          title="NBT Xchange"
          subtitle="Swap token instan"
          color="from-blue-50 to-blue-100"
          onClick={() => {}}
        />
      </div>

      {/* Category Filter */}
      <div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {CATEGORIES.map(cat => (
            <Chip key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
          ))}
        </div>
      </div>

      {/* Trending Spot */}
      <div className="bg-white rounded-card shadow-card p-4">
        <SectionHeader title="Trending Spot" />
        <div className="divide-y divide-gray-50">
          {trendingSpot.map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
      </div>

      {/* Web3 */}
      {web3Assets.length > 0 && (
        <div className="bg-white rounded-card shadow-card p-4">
          <SectionHeader title="Web3" />
          <div className="divide-y divide-gray-50">
            {web3Assets.map(asset => (
              <AssetListItem key={asset.ticker} asset={asset} />
            ))}
          </div>
        </div>
      )}

      {/* Gainers / Losers */}
      <div className="bg-white rounded-card shadow-card p-4">
        <SectionHeader title="Pergerakan" />
        <GainersLosersTable />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, subtitle, color, onClick }) {
  return (
    <div
      className={`bg-gradient-to-br ${color} rounded-2xl p-4 cursor-pointer active:opacity-80`}
      onClick={onClick}
    >
      <span className="text-2xl">{icon}</span>
      <p className="text-sm font-bold text-gray-900 mt-2">{title}</p>
      <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
    </div>
  )
}
