export const REWARDS_DATA = {
  userTier: 'gold',
  points: 12450,
  nextTierPoints: 20000,
  tiers: [
    { name: 'bronze', label: 'Bronze', minPoints: 0, maxPoints: 5000, color: '#CD7F32', textColor: 'text-amber-700', bgColor: 'bg-amber-100' },
    { name: 'silver', label: 'Silver', minPoints: 5000, maxPoints: 10000, color: '#C0C0C0', textColor: 'text-gray-400', bgColor: 'bg-gray-100' },
    { name: 'gold', label: 'Gold', minPoints: 10000, maxPoints: 20000, color: '#FFD700', textColor: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    { name: 'platinum', label: 'Platinum', minPoints: 20000, maxPoints: null, color: '#E5E4E2', textColor: 'text-slate-300', bgColor: 'bg-slate-100' },
  ],
  missions: [
    { id: 'm001', title: 'Transaksi Pertama', desc: 'Lakukan 1 transaksi beli aset', points: 100, completed: true, progress: 1, total: 1, category: 'trading' },
    { id: 'm002', title: 'Trader Aktif', desc: 'Lakukan 5 transaksi minggu ini', points: 500, completed: false, progress: 3, total: 5, category: 'trading' },
    { id: 'm003', title: 'Ajak Teman', desc: 'Referral 1 teman yang berhasil daftar', points: 1000, completed: false, progress: 0, total: 1, category: 'social' },
    { id: 'm004', title: 'Check-in Harian', desc: 'Login 7 hari berturut-turut', points: 200, completed: false, progress: 4, total: 7, category: 'daily' },
    { id: 'm005', title: 'Investor Sosial', desc: 'Post 3 analisis di Social Feed', points: 300, completed: false, progress: 1, total: 3, category: 'social' },
    { id: 'm006', title: 'Diversifikasi', desc: 'Investasi di 3 kelas aset berbeda', points: 750, completed: true, progress: 3, total: 3, category: 'trading' },
  ],
  store: [
    { id: 's001', name: 'Voucher Belanja Rp50.000', cost: 2000, category: 'voucher', brand: 'Shopee' },
    { id: 's002', name: 'Free Trade Ticket (1x)', cost: 5000, category: 'trading', brand: 'InvestApp' },
    { id: 's003', name: 'Voucher GoPay Rp100.000', cost: 4000, category: 'voucher', brand: 'GoPay' },
    { id: 's004', name: 'Fee 0% selama 7 hari', cost: 8000, category: 'trading', brand: 'InvestApp' },
    { id: 's005', name: 'Voucher GRAB Rp75.000', cost: 3000, category: 'voucher', brand: 'Grab' },
  ],
}
