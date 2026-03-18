import { useNavigate } from 'react-router-dom'
import AssetListItem from '../../../components/molecules/AssetListItem'
import SectionHeader from '../../../components/molecules/SectionHeader'
import { useMarket } from '../../../context/MarketContext'

export default function WatchlistTab() {
  const navigate = useNavigate()
  const { watchlistAssets, assets } = useMarket()

  const allAssets = assets.slice(0, 8)

  return (
    <div className="px-4 py-4 pb-20">
      <div className="bg-white rounded-card shadow-card p-4 mb-4">
        <SectionHeader title="Watchlist Saya" action={
          <button onClick={() => navigate('/market/watchlist/edit')} className="text-xs font-semibold text-brand active:opacity-70 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
        } />
        {watchlistAssets.length === 0 ? (
          <div className="py-8 text-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
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
