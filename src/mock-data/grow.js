export const GROW_DATA = {
  earn: [
    {
      id: 'iddr-earn', name: 'IDDR Earn', apy: 8.5, currency: 'IDDR',
      minAmount: 100000, lockPeriod: null, userBalance: 15000000,
      description: 'Dapatkan bunga harian dari saldo IDDR Anda tanpa lock-up period.',
      totalEarned: 125000, badge: 'Popular',
    },
    {
      id: 'asdd-earn', name: 'ASDD Earn', apy: 6.2, currency: 'ASDD',
      minAmount: 50, lockPeriod: null, userBalance: 0,
      description: 'Earn dari saldo ASDD stablecoin USD-pegged.',
      totalEarned: 0, badge: null,
    },
  ],
  staking: [
    {
      id: 'nbt-stake', name: 'NBT Staking', apy: 12.0, currency: 'NBT',
      minAmount: 100, lockPeriod: 30, userBalance: 500,
      description: 'Stake NBT dan dapatkan rewards 12% APY. Lock 30 hari.',
      totalEarned: 48, badge: 'High APY',
    },
    {
      id: 'eth-stake', name: 'ETH Staking', apy: 4.8, currency: 'ETH',
      minAmount: 0.01, lockPeriod: null, userBalance: 0.25,
      description: 'Dukung jaringan Ethereum dan dapatkan staking rewards.',
      totalEarned: 0.0023, badge: null,
    },
  ],
  bonds: [
    {
      id: 'b001', name: 'ORI025', coupon: 6.25, maturity: '2027-10-15',
      minAmount: 1000000, issuer: 'Pemerintah RI', rating: 'AAA',
      description: 'Obligasi Ritel Indonesia seri ORI025, diterbitkan Kemenkeu.',
    },
    {
      id: 'b002', name: 'SBR012', coupon: 6.55, maturity: '2026-07-10',
      minAmount: 1000000, issuer: 'Pemerintah RI', rating: 'AAA',
      description: 'Savings Bond Ritel Indonesia dengan kupon mengambang.',
    },
    {
      id: 'b003', name: 'SR019', coupon: 6.40, maturity: '2028-03-10',
      minAmount: 1000000, issuer: 'Pemerintah RI', rating: 'AAA',
      description: 'Sukuk Ritel berbasis syariah, aman dan halal.',
    },
  ],
  gadai: {
    ltv: 60,
    interestRate: 0.5,
    supportedAssets: ['BTC', 'ETH', 'BNB'],
    activeLoans: [],
    description: 'Gadaikan aset kripto Anda untuk mendapatkan pinjaman IDR tanpa perlu menjual.',
  },
  automate: {
    copyTrades: [
      { id: 'ct001', trader: 'Hendra Wijaya', handle: '@hendra_macro', return30d: +18.4, followers: 8920, fee: 10 },
      { id: 'ct002', trader: 'Dewi Kusuma', handle: '@dewi_crypto', return30d: +24.1, followers: 3120, fee: 10 },
    ],
    recurringBuys: [
      { id: 'rb001', ticker: 'BTC', amount: 500000, frequency: 'weekly', nextDate: '2026-03-15', active: true },
    ],
    bundles: [
      {
        id: 'bnd001', name: 'Crypto Blue Chip', category: 'crypto',
        assets: [
          { ticker: 'BTC', allocation: 50 },
          { ticker: 'ETH', allocation: 30 },
          { ticker: 'BNB', allocation: 20 },
        ],
        return30d: +12.4, riskLevel: 'Medium',
      },
      {
        id: 'bnd002', name: 'US Tech Giants', category: 'us',
        assets: [
          { ticker: 'NVDA', allocation: 35 },
          { ticker: 'AAPL', allocation: 30 },
          { ticker: 'MSFT', allocation: 35 },
        ],
        return30d: +8.7, riskLevel: 'Low-Medium',
      },
    ],
  },
}
