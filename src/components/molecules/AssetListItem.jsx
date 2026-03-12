import { useNavigate } from 'react-router-dom'
import AssetIcon from '../atoms/AssetIcon'
import PercentageBadge from '../atoms/PercentageBadge'
import { formatIDR } from '../../utils/formatters'

export default function AssetListItem({ asset, holding, onClick, showHolding = false }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) onClick()
    else navigate(`/market/asset/${asset.ticker}`)
  }

  return (
    <div className="flex items-center gap-3 py-3 active:bg-gray-50 cursor-pointer" onClick={handleClick}>
      <AssetIcon asset={asset} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-gray-900">{asset.ticker}</span>
          {asset.category?.[0] && (
            <span className="text-[10px] text-gray-400 font-medium bg-gray-100 px-1.5 py-0.5 rounded">{asset.category[0]}</span>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{asset.name}</p>
        {showHolding && holding && (
          <p className="text-xs text-gray-400">{holding.qty} {asset.ticker}</p>
        )}
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-semibold text-gray-900">{formatIDR(asset.price, true)}</p>
        <PercentageBadge value={asset.change24h} size="xs" />
      </div>
    </div>
  )
}
