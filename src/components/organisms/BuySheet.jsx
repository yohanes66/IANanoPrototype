import { useState } from 'react'
import FullPageOverlay from '../templates/FullPageOverlay'
import AssetIcon from '../atoms/AssetIcon'
import { useUI } from '../../context/UIContext'
import { useWallet } from '../../context/WalletContext'
import { ASSET_MAP } from '../../mock-data/assets'
import { formatIDR, formatCrypto } from '../../utils/formatters'

export default function BuySheet() {
  const { sheet, closeSheet, addToast, simulateAction } = useUI()
  const { wallet, buyAsset } = useWallet()
  const [rawInput, setRawInput] = useState('')

  const isOpen = sheet?.type === 'buy'
  const ticker = sheet?.payload?.ticker
  const asset = ticker ? ASSET_MAP[ticker] : null
  const availableIDR = wallet.fiat.IDR.balance

  const numericValue = parseFloat(rawInput) || 0
  const fee = Math.floor(numericValue * 0.003)
  const total = numericValue + fee
  const estimatedUnits = asset ? numericValue / asset.price : 0

  const handleClose = () => {
    setRawInput('')
    closeSheet()
  }

  const handleKey = (key) => {
    if (key === 'DEL') {
      setRawInput(r => r.slice(0, -1))
    } else if (key === '25%') {
      setRawInput(String(Math.floor(availableIDR * 0.25)))
    } else if (key === '50%') {
      setRawInput(String(Math.floor(availableIDR * 0.5)))
    } else if (key === 'MAX') {
      setRawInput(String(Math.floor(availableIDR * 0.997)))
    } else if (key === '.') {
      if (!rawInput.includes('.')) setRawInput(r => r + '.')
    } else {
      if (rawInput.length < 13) setRawInput(r => r + key)
    }
  }

  const handleConfirm = () => {
    if (numericValue <= 0 || total > availableIDR) return
    simulateAction(() => {
      buyAsset(ticker, numericValue, fee)
      addToast(`Pembelian ${ticker} berhasil!`, 'success')
      handleClose()
    })
  }

  const KEYS = [
    ['7','8','9','DEL'],
    ['4','5','6','25%'],
    ['1','2','3','50%'],
    ['.','0','MAX',''],
  ]

  const displayAmount = rawInput ? formatIDR(parseFloat(rawInput) || 0) : 'Rp0'
  const canConfirm = numericValue > 0 && total <= availableIDR

  return (
    <FullPageOverlay isOpen={isOpen} onClose={handleClose} title={`Beli ${asset?.name || ''}`}>
      <div className="flex flex-col h-full">

        {/* Asset info + summary — scrollable top section */}
        <div className="px-5 pt-4 pb-3 flex-shrink-0">
          {asset && (
            <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 mb-4">
              <AssetIcon asset={asset} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{asset.name}</p>
                <p className="text-xs text-gray-400">{formatIDR(asset.price)} / {ticker}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400">Saldo IDR</p>
                <p className="text-sm font-bold text-gray-900 tabular-nums">{formatIDR(availableIDR)}</p>
              </div>
            </div>
          )}

          {/* Big amount display */}
          <div className="text-center py-4">
            <p className="text-4xl font-extrabold text-gray-900 tracking-tight tabular-nums">{displayAmount}</p>
            {estimatedUnits > 0 && (
              <p className="text-sm text-gray-400 mt-1.5">≈ {formatCrypto(estimatedUnits, ticker || '')}</p>
            )}
          </div>

          {/* Fee breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 p-3 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Nominal Beli</span>
              <span className="font-semibold text-gray-900 tabular-nums">{formatIDR(numericValue)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Biaya Transaksi (0.3%)</span>
              <span className="font-semibold text-gray-900 tabular-nums">{formatIDR(fee)}</span>
            </div>
            <div className="flex justify-between text-xs pt-1.5 border-t border-gray-100">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900 tabular-nums">{formatIDR(total)}</span>
            </div>
          </div>

          {total > availableIDR && numericValue > 0 && (
            <p className="text-xs text-negative text-center mt-2">Saldo IDR tidak mencukupi</p>
          )}
        </div>

        {/* Numpad + CTA — pinned to bottom */}
        <div className="px-5 pb-6 mt-auto flex-shrink-0">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {KEYS.flat().map((key, i) => {
              if (key === '') return <div key={i} />
              const isAction = ['DEL', '25%', '50%', 'MAX'].includes(key)
              return (
                <button
                  key={i}
                  onClick={() => handleKey(key)}
                  className={`h-14 rounded-2xl text-base font-bold flex items-center justify-center active:scale-95 transition-transform ${
                    isAction ? 'bg-white border border-gray-100 text-gray-700 text-sm' : 'bg-white border border-gray-100 text-gray-900'
                  }`}
                >
                  {key === 'DEL' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>
                    </svg>
                  ) : key}
                </button>
              )
            })}
          </div>

          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={`w-full h-14 rounded-pill font-bold text-base transition-all ${
              canConfirm
                ? 'bg-surface-dark text-white active:opacity-80'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Beli {ticker}
          </button>
        </div>
      </div>
    </FullPageOverlay>
  )
}
