import { createContext, useContext, useState, useCallback } from 'react'
import { WALLET_INITIAL } from '../mock-data/wallet'

const WalletContext = createContext(null)

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(JSON.parse(JSON.stringify(WALLET_INITIAL)))

  const topUp = useCallback((currency, amount) => {
    setWallet(w => ({
      ...w,
      fiat: {
        ...w.fiat,
        [currency]: { ...w.fiat[currency], balance: w.fiat[currency].balance + amount },
      },
      transactions: [{
        id: `tx${Date.now()}`, type: 'topup', amount, currency,
        timestamp: new Date().toISOString(), status: 'completed',
        description: `Top Up ${currency === 'IDR' ? formatIDRSimple(amount) : amount} via Virtual Account`,
        relatedAsset: null,
      }, ...w.transactions],
    }))
  }, [])

  const fxTransfer = useCallback((fromCurrency, toCurrency, fromAmount, toAmount) => {
    setWallet(w => ({
      ...w,
      fiat: {
        ...w.fiat,
        [fromCurrency]: { ...w.fiat[fromCurrency], balance: w.fiat[fromCurrency].balance - fromAmount },
        [toCurrency]: { ...w.fiat[toCurrency], balance: w.fiat[toCurrency].balance + toAmount },
      },
      transactions: [{
        id: `tx${Date.now()}`, type: 'fx_transfer', amount: fromAmount, currency: fromCurrency,
        timestamp: new Date().toISOString(), status: 'completed',
        description: `Transfer ${fromCurrency} → ${toCurrency}`,
        toAmount, toCurrency, relatedAsset: null,
      }, ...w.transactions],
    }))
  }, [])

  const buyAsset = useCallback((ticker, amountIDR, fee) => {
    setWallet(w => ({
      ...w,
      fiat: {
        ...w.fiat,
        IDR: { ...w.fiat.IDR, balance: w.fiat.IDR.balance - amountIDR - fee },
      },
      transactions: [{
        id: `tx${Date.now()}`, type: 'buy', amount: amountIDR + fee, currency: 'IDR',
        timestamp: new Date().toISOString(), status: 'completed',
        description: `Beli ${ticker}`, relatedAsset: ticker,
      }, ...w.transactions],
    }))
  }, [])

  const cetakEmas = useCallback((grams, totalCost) => {
    setWallet(w => ({
      ...w,
      fiat: {
        ...w.fiat,
        IDR: { ...w.fiat.IDR, balance: w.fiat.IDR.balance - totalCost },
      },
      transactions: [{
        id: `tx${Date.now()}`, type: 'cetak_emas', amount: totalCost, currency: 'IDR',
        timestamp: new Date().toISOString(), status: 'processing',
        description: `Cetak Emas ${grams} gram – Antam`, relatedAsset: 'GOLD',
      }, ...w.transactions],
    }))
  }, [])

  return (
    <WalletContext.Provider value={{ wallet, topUp, fxTransfer, buyAsset, cetakEmas }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be used within WalletProvider')
  return ctx
}

function formatIDRSimple(amount) {
  return `Rp${Number(amount).toLocaleString('id-ID')}`
}
