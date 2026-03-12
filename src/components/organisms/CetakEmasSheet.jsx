import { useState } from 'react'
import FullPageOverlay from '../templates/FullPageOverlay'
import Button from '../atoms/Button'
import { useUI } from '../../context/UIContext'
import { useWallet } from '../../context/WalletContext'
import { formatIDR } from '../../utils/formatters'

const GOLD_PRICE_PER_GRAM = 1620000
const DENOMINATIONS = [1, 2, 5, 10, 25, 50, 100]

export default function CetakEmasSheet() {
  const { sheet, closeSheet, addToast, simulateAction } = useUI()
  const { wallet, cetakEmas } = useWallet()
  const [step, setStep] = useState(1)
  const [denomination, setDenomination] = useState(null)
  const [qty, setQty] = useState(1)
  const [form, setForm] = useState({ name: 'Yohanes Nico', address: 'Jl. Sudirman No. 45', city: 'Jakarta Selatan', phone: '081234567890' })

  const isOpen = sheet?.type === 'cetak_emas'

  const handleClose = () => {
    setStep(1)
    setDenomination(null)
    setQty(1)
    closeSheet()
  }

  const totalCost = denomination ? denomination * qty * GOLD_PRICE_PER_GRAM : 0
  const availableIDR = wallet.fiat.IDR.balance

  const handleConfirm = () => {
    simulateAction(() => {
      cetakEmas(denomination * qty, totalCost)
      addToast(`Cetak Emas ${denomination * qty}g berhasil! 🏅 Estimasi 3-5 hari kerja`, 'success')
      handleClose()
    })
  }

  return (
    <FullPageOverlay isOpen={isOpen} onClose={handleClose} title="Cetak Emas">
      <div className="px-5 pb-6">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-5">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? 'bg-surface-dark text-white' : 'bg-gray-100 text-gray-400'}`}>{s}</div>
              {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-surface-dark' : 'bg-gray-100'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">Pilih Denominasi</h4>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {DENOMINATIONS.map(d => (
                <button
                  key={d}
                  onClick={() => setDenomination(d)}
                  className={`py-3 rounded-xl text-sm font-bold border-2 transition-all active:scale-95 ${denomination === d ? 'border-surface-dark bg-surface-dark text-white' : 'border-gray-100 bg-gray-50 text-gray-900'}`}
                >
                  {d}g
                </button>
              ))}
            </div>
            {denomination && (
              <div className="bg-yellow-50 rounded-xl p-3 mb-4 border border-yellow-100">
                <p className="text-xs text-yellow-700 font-semibold">Emas Antam {denomination}g Sertifikat</p>
                <p className="text-sm font-bold text-yellow-900 mt-0.5">{formatIDR(denomination * GOLD_PRICE_PER_GRAM)}/batang</p>
              </div>
            )}
            <Button variant="primary" fullWidth size="lg" onClick={() => setStep(2)} disabled={!denomination}>
              Lanjut
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">Jumlah & Konfirmasi Harga</h4>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-900">Emas Antam {denomination}g</p>
                  <p className="text-xs text-gray-400">{formatIDR(denomination * GOLD_PRICE_PER_GRAM)}/batang</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold active:bg-gray-300">−</button>
                  <span className="text-lg font-bold text-gray-900 w-6 text-center">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center text-lg font-bold text-white active:opacity-80">+</button>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Total Emas</span>
                  <span className="font-semibold">{denomination * qty} gram</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-gray-900">Total Biaya</span>
                  <span className="font-bold text-gray-900">{formatIDR(totalCost)}</span>
                </div>
              </div>
            </div>
            {totalCost > availableIDR && (
              <p className="text-xs text-negative text-center mb-3">Saldo IDR tidak mencukupi</p>
            )}
            <div className="flex gap-2">
              <Button variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">Kembali</Button>
              <Button variant="primary" size="lg" onClick={() => setStep(3)} disabled={totalCost > availableIDR} className="flex-1">Lanjut</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">Alamat Pengiriman</h4>
            <div className="space-y-3 mb-4">
              {[['name','Nama Lengkap'],['address','Alamat'],['city','Kota'],['phone','No. Telepon']].map(([k,l]) => (
                <div key={k}>
                  <label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 mt-1 focus:outline-none focus:border-brand"
                    value={form[k]}
                    onChange={e => setForm(f => ({...f, [k]: e.target.value}))}
                  />
                </div>
              ))}
            </div>
            <div className="bg-orange-50 rounded-xl p-3 mb-4 text-xs text-orange-700 border border-orange-100">
              📦 Estimasi pengiriman 3–5 hari kerja. Emas dikemas dalam sertifikat resmi Antam.
            </div>
            <div className="bg-gray-50 rounded-xl p-3 mb-4 flex justify-between">
              <span className="text-sm font-bold text-gray-900">Total Bayar</span>
              <span className="text-sm font-bold text-gray-900">{formatIDR(totalCost)}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg" onClick={() => setStep(2)} className="flex-1">Kembali</Button>
              <Button variant="orange" size="lg" onClick={handleConfirm} className="flex-1">Konfirmasi</Button>
            </div>
          </div>
        )}
      </div>
    </FullPageOverlay>
  )
}
