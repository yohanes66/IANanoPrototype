export const WALLET_INITIAL = {
  fiat: {
    IDR: { balance: 20000000, currency: 'IDR', symbol: 'Rp', flag: '🇮🇩' },
    USD: { balance: 1500.00, currency: 'USD', symbol: '$', flag: '🇺🇸' },
    HKD: { balance: 8000.00, currency: 'HKD', symbol: 'HK$', flag: '🇭🇰' },
    RMB: { balance: 5000.00, currency: 'RMB', symbol: '¥', flag: '🇨🇳' },
    SGD: { balance: 500.00, currency: 'SGD', symbol: 'S$', flag: '🇸🇬' },
  },
  crypto: {
    BTC: { balance: 0.0432, valueIDR: 26784000 },
    ETH: { balance: 0.85, valueIDR: 40630000 },
    USDT: { balance: 1200, valueIDR: 19200000 },
  },
  fxRates: {
    USD: 15820,
    HKD: 2025,
    RMB: 2180,
    SGD: 11700,
  },
  transactions: [
    {
      id: 'tx001', type: 'topup', amount: 5000000, currency: 'IDR',
      timestamp: '2026-03-10T09:30:00Z', status: 'completed',
      description: 'Top Up via BCA Virtual Account', relatedAsset: null,
    },
    {
      id: 'tx002', type: 'buy', amount: 1550000, currency: 'IDR',
      timestamp: '2026-03-09T14:15:00Z', status: 'completed',
      description: 'Beli 0.0025 BTC', relatedAsset: 'BTC',
    },
    {
      id: 'tx003', type: 'fx_transfer', amount: 1000000, currency: 'IDR',
      timestamp: '2026-03-08T10:00:00Z', status: 'completed',
      description: 'Transfer IDR → USD ($63.22)', relatedAsset: null,
      toAmount: 63.22, toCurrency: 'USD',
    },
    {
      id: 'tx004', type: 'sell', amount: 2300000, currency: 'IDR',
      timestamp: '2026-03-07T16:45:00Z', status: 'completed',
      description: 'Jual 0.048 ETH', relatedAsset: 'ETH',
    },
    {
      id: 'tx005', type: 'cetak_emas', amount: 3240000, currency: 'IDR',
      timestamp: '2026-03-05T11:20:00Z', status: 'shipped',
      description: 'Cetak Emas 2 gram – Antam', relatedAsset: 'GOLD',
    },
    {
      id: 'tx006', type: 'earn', amount: 125000, currency: 'IDR',
      timestamp: '2026-03-01T00:00:00Z', status: 'completed',
      description: 'Bunga IDDR Earn bulan Februari', relatedAsset: null,
    },
    {
      id: 'tx007', type: 'topup', amount: 10000000, currency: 'IDR',
      timestamp: '2026-02-28T09:00:00Z', status: 'completed',
      description: 'Top Up via Mandiri VA', relatedAsset: null,
    },
    {
      id: 'tx008', type: 'cetak_emas', amount: 1620000, currency: 'IDR',
      timestamp: '2026-02-20T13:00:00Z', status: 'delivered',
      description: 'Cetak Emas 1 gram – Antam', relatedAsset: 'GOLD',
    },
  ],
}
