import { useNavigate } from 'react-router-dom'
import Badge from '../atoms/Badge'
import { formatIDR } from '../../utils/formatters'

export default function EarnProgramCard({ program, type = 'earn' }) {
  const navigate = useNavigate()
  const path = type === 'earn' ? `/grow/earn/${program.id}` : `/grow/staking/${program.id}`

  return (
    <div
      className="bg-white rounded-card shadow-card p-4 cursor-pointer active:bg-gray-50"
      onClick={() => navigate(path)}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-bold text-gray-900">{program.name}</h4>
            {program.badge && <Badge color={program.badge === 'High APY' ? 'orange' : 'green'} size="xs">{program.badge}</Badge>}
          </div>
          <p className="text-xs text-gray-500">{program.description?.slice(0, 60)}...</p>
        </div>
        <div className="text-right flex-shrink-0 ml-3">
          <p className="text-xl font-extrabold text-brand">{program.apy}%</p>
          <p className="text-xs text-gray-400">APY</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
        <div>
          <p className="text-xs text-gray-400">Min. Investasi</p>
          <p className="text-xs font-semibold text-gray-700">{formatIDR(program.minAmount, true)}</p>
        </div>
        {program.lockPeriod && (
          <div>
            <p className="text-xs text-gray-400">Lock Period</p>
            <p className="text-xs font-semibold text-gray-700">{program.lockPeriod} hari</p>
          </div>
        )}
        {!program.lockPeriod && (
          <div>
            <p className="text-xs text-gray-400">Lock Period</p>
            <p className="text-xs font-semibold text-positive">Fleksibel</p>
          </div>
        )}
      </div>
    </div>
  )
}
