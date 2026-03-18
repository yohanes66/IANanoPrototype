import { useParams } from 'react-router-dom'
import DetailPage from '../../components/templates/DetailPage'
import Button from '../../components/atoms/Button'
import StatRow from '../../components/molecules/StatRow'
import { GROW_DATA } from '../../mock-data/grow'
import { useUI } from '../../context/UIContext'
import { formatIDR } from '../../utils/formatters'

export default function EarnDetailPage() {
  const { id } = useParams()
  const { addToast, simulateAction } = useUI()
  const program = GROW_DATA.earn.find(p => p.id === id) || GROW_DATA.earn[0]

  const handleSubscribe = () => {
    simulateAction(() => {
      addToast(`Berhasil bergabung ${program.name}! Earn mulai besok`, 'success')
    })
  }

  return (
    <DetailPage title={program.name}>
      <div className="px-4 py-4 pb-24">
        {/* APY Banner */}
        <div className="bg-surface-dark rounded-card p-6 mb-4 text-white text-center shadow-dark">
          <p className="text-xs text-gray-400 mb-1">Annual Percentage Yield</p>
          <p className="text-5xl font-extrabold text-brand">{program.apy}%</p>
          <p className="text-sm text-gray-400 mt-1">per tahun</p>
          <div className="mt-4 bg-white/10 rounded-xl p-3">
            <p className="text-xs text-gray-300">Simulasi: Rp10jt selama 1 tahun</p>
            <p className="text-base font-bold text-positive mt-0.5">+{formatIDR(10000000 * program.apy / 100, true)} bunga</p>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-card shadow-card p-4 mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Detail Program</p>
          <StatRow label="Mata Uang" value={program.currency} />
          <StatRow label="Minimum Investasi" value={formatIDR(program.minAmount)} />
          <StatRow label="Lock Period" value={program.lockPeriod ? `${program.lockPeriod} hari` : 'Fleksibel (kapan saja)'} />
          <StatRow label="Pembayaran Bunga" value="Harian" />
          <StatRow label="Total Earned Anda" value={formatIDR(program.totalEarned, true)} valueClass="text-positive" />
        </div>

        {/* Description */}
        <div className="bg-white rounded-card shadow-card p-4 mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Cara Kerja</p>
          <p className="text-sm text-gray-600 leading-relaxed">{program.description}</p>
          <div className="mt-3 space-y-2">
            {['Bunga dihitung setiap hari dan dibayarkan harian', 'Tidak ada biaya penarikan', 'Dana dijamin hingga Rp2 miliar'].map((point, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-positive text-xs mt-0.5">✓</span>
                <span className="text-xs text-gray-600">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 px-4 py-3 z-50">
        <Button variant="orange" fullWidth size="xl" onClick={handleSubscribe}>
          Mulai Earn Sekarang
        </Button>
      </div>
    </DetailPage>
  )
}
