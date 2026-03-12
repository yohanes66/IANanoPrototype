import DetailPage from '../../components/templates/DetailPage'
import { GROW_DATA } from '../../mock-data/grow'
import { formatIDR } from '../../utils/formatters'
import Badge from '../../components/atoms/Badge'

export default function BondsPage() {
  return (
    <DetailPage title="Obligasi Ritel">
      <div className="px-4 py-4">
        <div className="bg-green-50 rounded-card p-4 border border-green-100 mb-4">
          <p className="text-sm font-bold text-green-900">📜 Obligasi Negara — Investasi Paling Aman</p>
          <p className="text-xs text-green-700 mt-1">Diterbitkan langsung oleh Kementerian Keuangan RI dengan jaminan penuh negara (AAA rating)</p>
        </div>
        <div className="space-y-3">
          {GROW_DATA.bonds.map(bond => (
            <div key={bond.id} className="bg-white rounded-card shadow-card p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-base font-bold text-gray-900">{bond.name}</p>
                  <p className="text-xs text-gray-400">{bond.issuer}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-green-600">{bond.coupon}%</p>
                  <p className="text-xs text-gray-400">/tahun</p>
                </div>
              </div>
              <div className="flex gap-3 text-xs text-gray-500">
                <span>Jatuh tempo: {bond.maturity}</span>
                <span>Min: {formatIDR(bond.minAmount, true)}</span>
              </div>
              <div className="flex gap-2 mt-3 items-center">
                <Badge color="green">AAA</Badge>
                <Badge color="gray">Pemerintah RI</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DetailPage>
  )
}
