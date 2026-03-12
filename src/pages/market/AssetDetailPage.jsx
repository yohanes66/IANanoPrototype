import { useParams } from 'react-router-dom'
import DetailPage from '../../components/templates/DetailPage'
import MiniCandleChart from '../../components/organisms/MiniCandleChart'
import MarketPulseCard from '../../components/molecules/MarketPulseCard'
import InsightCard from '../../components/molecules/InsightCard'
import Button from '../../components/atoms/Button'
import AssetIcon from '../../components/atoms/AssetIcon'
import PercentageBadge from '../../components/atoms/PercentageBadge'
import StatRow from '../../components/molecules/StatRow'
import SectionHeader from '../../components/molecules/SectionHeader'
import { useUI } from '../../context/UIContext'
import { useMarket } from '../../context/MarketContext'
import { MARKET_DATA } from '../../mock-data/market'
import { INSIGHTS_DATA } from '../../mock-data/insights'
import { formatIDR, formatNumber } from '../../utils/formatters'

export default function AssetDetailPage() {
  const { ticker } = useParams()
  const { assetMap, toggleWatchlist, watchlist } = useMarket()
  const { openSheet } = useUI()

  const asset = assetMap[ticker]
  if (!asset) return (
    <DetailPage title="Aset tidak ditemukan">
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-400">Aset {ticker} tidak ditemukan</p>
      </div>
    </DetailPage>
  )

  const isWatchlisted = watchlist.includes(ticker)
  const pulseKey = asset.class === 'crypto' ? 'crypto' : asset.class === 'us' ? 'us' : asset.class === 'gold' ? 'commodities' : 'hk'
  const marketPulse = MARKET_DATA.marketPulse[pulseKey]
  const relatedInsights = INSIGHTS_DATA.articles.filter(a => a.relatedAssets.includes(ticker)).slice(0, 2)

  return (
    <DetailPage
      title={`${ticker} • ${asset.name}`}
      actions={
        <button
          onClick={() => toggleWatchlist(ticker)}
          className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors"
          aria-label={isWatchlisted ? 'Hapus dari watchlist' : 'Tambah ke watchlist'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isWatchlisted ? '#F7931A' : 'none'} stroke={isWatchlisted ? '#F7931A' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      }
    >
      <div className="px-4 pb-24">
        {/* Price Header */}
        <div className="flex items-center gap-3 py-4">
          <AssetIcon asset={asset} size="lg" />
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-gray-900">{formatIDR(asset.price)}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <PercentageBadge value={asset.change24h} size="md" />
              <span className="text-xs text-gray-400">24 jam</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <MiniCandleChart ohlcv={asset.ohlcv} change24h={asset.change24h} />

        {/* Market Stats */}
        <div className="bg-white rounded-card shadow-card p-4 mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Statistik Pasar</p>
          <StatRow label="Market Cap" value={`$${formatNumber(asset.marketCap)}`} />
          <StatRow label="Volume 24j" value={`${formatIDR(asset.volume24h, true)}`} />
          <StatRow label="Perubahan 7H" value={<PercentageBadge value={asset.change7d} size="sm" />} />
          {asset.priceUSD && <StatRow label="Harga (USD)" value={`$${asset.priceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} />}
          {asset.category?.length > 0 && (
            <StatRow label="Kategori" value={asset.category.join(', ')} />
          )}
        </div>

        {/* AI Market Pulse */}
        <div className="mb-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">AI Market Pulse</p>
          <MarketPulseCard data={marketPulse} />
        </div>

        {/* Description */}
        {asset.description && (
          <div className="bg-white rounded-card shadow-card p-4 mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Tentang {ticker}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{asset.description}</p>
          </div>
        )}

        {/* Related Insights */}
        {relatedInsights.length > 0 && (
          <div>
            <SectionHeader title="Analisis Terkait" seeAllPath="/insights" />
            <div className="space-y-3">
              {relatedInsights.map(a => <InsightCard key={a.id} article={a} />)}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Buy/Sell buttons */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex gap-3 z-30">
        <Button variant="secondary" size="xl" fullWidth onClick={() => openSheet('sell', { ticker })}>
          Jual
        </Button>
        <Button variant="primary" size="xl" fullWidth onClick={() => openSheet('buy', { ticker })}>
          Beli
        </Button>
      </div>
    </DetailPage>
  )
}
