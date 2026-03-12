import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AssetIcon from '../atoms/AssetIcon'
import PercentageBadge from '../atoms/PercentageBadge'
import TabPill from '../molecules/TabPill'
import { formatIDR } from '../../utils/formatters'
import { GAINERS, LOSERS, TOP_VOLUME } from '../../mock-data/assets'

const TABS = [
  { id: 'gainers', label: 'Naik' },
  { id: 'losers', label: 'Turun' },
  { id: 'volume', label: 'Volume' },
]

export default function GainersLosersTable({ assets }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('gainers')

  const data = tab === 'gainers' ? GAINERS : tab === 'losers' ? LOSERS : TOP_VOLUME

  return (
    <div>
      <div className="mb-3">
        <TabPill tabs={TABS} activeTab={tab} onSelect={setTab} />
      </div>
      <div className="space-y-0">
        {data.slice(0, 5).map((asset, i) => (
          <div
            key={asset.ticker}
            className="flex items-center gap-3 py-2.5 active:bg-gray-50 cursor-pointer"
            onClick={() => navigate(`/market/asset/${asset.ticker}`)}
          >
            <span className="text-xs text-gray-300 font-bold w-4 text-center">{i + 1}</span>
            <AssetIcon asset={asset} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">{asset.ticker}</p>
              <p className="text-xs text-gray-400 truncate">{asset.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-900">{formatIDR(asset.price, true)}</p>
              <PercentageBadge value={asset.change24h} size="xs" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
