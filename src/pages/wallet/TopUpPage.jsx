import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DetailPage from '../../components/templates/DetailPage'
import Button from '../../components/atoms/Button'
import { useWallet } from '../../context/WalletContext'
import { useUI } from '../../context/UIContext'
import { formatIDR } from '../../utils/formatters'

const AMOUNTS = [50000, 100000, 250000, 500000, 1000000, 5000000]
const BANKS = ['BCA', 'Mandiri', 'BRI', 'BNI', 'GOPAY', 'OVO']

export default function TopUpPage() {
  const navigate = useNavigate()
  const { topUp } = useWallet()
  const { simulateAction, addToast } = useUI()
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedBank, setSelectedBank] = useState(null)

  const finalAmount = selectedAmount || parseInt(customAmount.replace(/\D/g, '')) || 0

  const handleConfirm = () => {
    if (!finalAmount || !selectedBank) return
    simulateAction(() => {
      topUp('IDR', finalAmount)
      addToast(`Top Up ${formatIDR(finalAmount, true)} berhasil! 🎉`, 'success')
      navigate('/wallet')
    })
  }

  return (
    <DetailPage title="Top Up IDR">
      <div className="px-5 py-4">
        <p className="text-sm font-bold text-gray-900 mb-3">Pilih Nominal</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {AMOUNTS.map(amount => (
            <button
              key={amount}
              onClick={() => { setSelectedAmount(amount); setCustomAmount('') }}
              className={`py-3 rounded-xl text-xs font-bold border-2 transition-all ${selectedAmount === amount ? 'border-surface-dark bg-surface-dark text-white' : 'border-gray-100 bg-white text-gray-700'}`}
            >
              {formatIDR(amount, true)}
            </button>
          ))}
        </div>

        <p className="text-sm font-bold text-gray-900 mb-2">Atau masukkan nominal lain</p>
        <div className="relative mb-5">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-semibold">Rp</span>
          <input
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand"
            placeholder="0"
            value={customAmount}
            onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
            type="number"
          />
        </div>

        <p className="text-sm font-bold text-gray-900 mb-3">Metode Pembayaran</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {BANKS.map(bank => (
            <button
              key={bank}
              onClick={() => setSelectedBank(bank)}
              className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${selectedBank === bank ? 'border-surface-dark bg-gray-50 text-surface-dark' : 'border-gray-100 bg-white text-gray-600'}`}
            >
              {bank}
            </button>
          ))}
        </div>

        {finalAmount > 0 && selectedBank && (
          <div className="bg-gray-50 rounded-xl p-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Nominal</span>
              <span className="font-bold">{formatIDR(finalAmount)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1.5">
              <span className="text-gray-500">Via</span>
              <span className="font-semibold">{selectedBank} Virtual Account</span>
            </div>
          </div>
        )}

        <Button
          variant="primary" fullWidth size="xl"
          onClick={handleConfirm}
          disabled={!finalAmount || !selectedBank}
        >
          Top Up {finalAmount > 0 ? formatIDR(finalAmount, true) : ''}
        </Button>
      </div>
    </DetailPage>
  )
}
