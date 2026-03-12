import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DetailPage from '../../components/templates/DetailPage'
import Button from '../../components/atoms/Button'
import { useWallet } from '../../context/WalletContext'
import { useUI } from '../../context/UIContext'
import { formatIDR, formatCurrency } from '../../utils/formatters'

const FX_OPTIONS = [
  { currency: 'USD', flag: '🇺🇸', label: 'US Dollar' },
  { currency: 'HKD', flag: '🇭🇰', label: 'Hong Kong Dollar' },
  { currency: 'RMB', flag: '🇨🇳', label: 'Renminbi' },
  { currency: 'SGD', flag: '🇸🇬', label: 'Singapore Dollar' },
]

const NUMPAD = [['7','8','9'],['4','5','6'],['1','2','3'],['.',  '0','⌫']]

export default function FXTransferPage() {
  const navigate = useNavigate()
  const { wallet, fxTransfer } = useWallet()
  const { simulateAction, addToast } = useUI()
  const [step, setStep] = useState(1)
  const [targetCurrency, setTargetCurrency] = useState(null)
  const [rawAmount, setRawAmount] = useState('')

  const numericAmount = parseFloat(rawAmount) || 0
  const fxRate = targetCurrency ? wallet.fxRates[targetCurrency] : 1
  const fxSpread = 0.005 // 0.5%
  const fee = Math.floor(numericAmount * fxSpread)
  const netAmount = numericAmount - fee
  const receivedAmount = fxRate > 0 ? netAmount / fxRate : 0
  const availableIDR = wallet.fiat.IDR.balance

  const handleKey = (k) => {
    if (k === '⌫') setRawAmount(r => r.slice(0, -1))
    else if (k === '.') { if (!rawAmount.includes('.')) setRawAmount(r => r + '.') }
    else { if (rawAmount.length < 12) setRawAmount(r => r + k) }
  }

  const handleConfirm = () => {
    simulateAction(() => {
      fxTransfer('IDR', targetCurrency, numericAmount, receivedAmount)
      addToast(`Transfer berhasil! ${formatCurrency(receivedAmount, targetCurrency)} ${targetCurrency}`, 'success')
      navigate('/wallet')
    })
  }

  return (
    <DetailPage title="Transfer FX">
      <div className="px-5 py-4">
        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1,2,3].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? 'bg-surface-dark text-white' : 'bg-gray-100 text-gray-400'}`}>{s}</div>
              {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-surface-dark' : 'bg-gray-100'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Currency */}
        {step === 1 && (
          <div>
            <div className="mb-4 bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500">Dari</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl">🇮🇩</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">IDR — Rupiah</p>
                  <p className="text-xs text-gray-400">Saldo: {formatIDR(availableIDR)}</p>
                </div>
              </div>
            </div>
            <p className="text-sm font-bold text-gray-900 mb-3">Ke mata uang:</p>
            <div className="space-y-2 mb-6">
              {FX_OPTIONS.map(opt => (
                <button
                  key={opt.currency}
                  onClick={() => setTargetCurrency(opt.currency)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all ${targetCurrency === opt.currency ? 'border-surface-dark bg-gray-50' : 'border-gray-100 bg-white'}`}
                >
                  <span className="text-2xl">{opt.flag}</span>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">{opt.currency}</p>
                    <p className="text-xs text-gray-400">{opt.label}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-gray-400">Kurs</p>
                    <p className="text-xs font-semibold text-gray-700">1 {opt.currency} = {formatIDR(wallet.fxRates[opt.currency])}</p>
                  </div>
                </button>
              ))}
            </div>
            <Button variant="primary" fullWidth size="xl" onClick={() => setStep(2)} disabled={!targetCurrency}>
              Lanjut
            </Button>
          </div>
        )}

        {/* Step 2: Enter Amount */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-5">
              <div className="flex-1">
                <p className="text-xs text-gray-400">Dari IDR</p>
                <p className="text-sm font-semibold text-gray-900">Saldo: {formatIDR(availableIDR, true)}</p>
              </div>
              <span className="text-gray-300">→</span>
              <div className="flex-1 text-right">
                <p className="text-xs text-gray-400">Ke {targetCurrency}</p>
                <p className="text-sm font-semibold text-gray-900">
                  {receivedAmount > 0 ? formatCurrency(receivedAmount, targetCurrency) : '-'}
                </p>
              </div>
            </div>

            {/* Amount Display */}
            <div className="text-center mb-4 py-4 bg-gray-50 rounded-2xl">
              <p className="text-3xl font-extrabold text-gray-900">
                {numericAmount > 0 ? formatIDR(numericAmount) : 'Rp0'}
              </p>
              {numericAmount > 0 && (
                <p className="text-sm text-gray-400 mt-1">
                  ≈ {formatCurrency(receivedAmount, targetCurrency)}
                </p>
              )}
            </div>

            {/* Numpad */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {NUMPAD.flat().map((k, i) => (
                <button
                  key={i}
                  onClick={() => handleKey(k)}
                  className="h-14 rounded-xl bg-white text-base font-bold text-gray-900 active:bg-gray-100 shadow-card border border-gray-50"
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Fee */}
            <div className="bg-white rounded-xl shadow-card p-3 mb-4 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">FX Spread (0.5%)</span>
                <span className="text-gray-900 font-semibold">{formatIDR(fee)}</span>
              </div>
              <div className="flex justify-between text-xs border-t border-gray-50 pt-1.5">
                <span className="font-bold text-gray-900">Diterima</span>
                <span className="font-bold text-gray-900">{formatCurrency(receivedAmount, targetCurrency || 'USD')} {targetCurrency}</span>
              </div>
            </div>

            {numericAmount > availableIDR && (
              <p className="text-xs text-negative text-center mb-3">Saldo IDR tidak mencukupi</p>
            )}

            <div className="flex gap-2">
              <Button variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">Kembali</Button>
              <Button variant="primary" size="lg" onClick={() => setStep(3)} disabled={numericAmount <= 0 || numericAmount > availableIDR} className="flex-1">Lanjut</Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div>
            <div className="bg-gray-50 rounded-2xl p-5 mb-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4 text-center">Konfirmasi Transfer</p>
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-400 mb-1">Kirim</p>
                  <span className="text-2xl">🇮🇩</span>
                  <p className="text-lg font-extrabold text-gray-900 mt-1">{formatIDR(numericAmount)}</p>
                  <p className="text-xs text-gray-400">IDR</p>
                </div>
                <div className="text-2xl text-gray-300">→</div>
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-400 mb-1">Terima</p>
                  <span className="text-2xl">{FX_OPTIONS.find(f => f.currency === targetCurrency)?.flag}</span>
                  <p className="text-lg font-extrabold text-gray-900 mt-1">{formatCurrency(receivedAmount, targetCurrency)}</p>
                  <p className="text-xs text-gray-400">{targetCurrency}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Kurs</span>
                  <span className="font-semibold">1 {targetCurrency} = {formatIDR(fxRate)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">FX Spread</span>
                  <span className="font-semibold">{formatIDR(fee)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg" onClick={() => setStep(2)} className="flex-1">Kembali</Button>
              <Button variant="orange" size="lg" onClick={handleConfirm} className="flex-1">Konfirmasi</Button>
            </div>
          </div>
        )}
      </div>
    </DetailPage>
  )
}
