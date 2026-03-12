import { useNavigate } from 'react-router-dom'
import AssetListItem from '../../../components/molecules/AssetListItem'
import SectionHeader from '../../../components/molecules/SectionHeader'
import { useMarket } from '../../../context/MarketContext'

export default function WatchlistTab() {
  const navigate = useNavigate()
  const { watchlistAssets, assets } = useMarket()

  const allAssets = assets.slice(0, 8)

  return (
    <div className="px-4 py-4">
      <div className="bg-white rounded-card shadow-card p-4 mb-4">
        <SectionHeader title="⭐ Watchlist Saya" />
        {watchlistAssets.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-3xl mb-2">⭐</p>
            <p className="text-sm text-gray-400">Belum ada aset di watchlist</p>
            <p className="text-xs text-gray-300 mt-1">Tambahkan dari halaman detail aset</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {watchlistAssets.map(asset => (
              <AssetListItem key={asset.ticker} asset={asset} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-card shadow-card p-4">
        <SectionHeader title="Semua Aset" />
        <div className="divide-y divide-gray-50">
          {allAssets.map(asset => (
            <AssetListItem key={asset.ticker} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  )
}
