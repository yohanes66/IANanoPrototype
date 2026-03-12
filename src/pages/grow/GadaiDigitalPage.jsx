import DetailPage from '../../components/templates/DetailPage'
import StatRow from '../../components/molecules/StatRow'
import Badge from '../../components/atoms/Badge'
import { GROW_DATA } from '../../mock-data/grow'

export default function GadaiDigitalPage() {
  const { gadai } = GROW_DATA
  return (
    <DetailPage title="Gadai Digital">
      <div className="px-4 py-4 pb-24">
        <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-card p-5 text-white mb-4 shadow-dark">
          <p className="text-xs text-purple-200 mb-1">Pinjam IDR tanpa jual kripto</p>
          <p className="text-3xl font-extrabold">Gadai Digital</p>
          <div className="flex gap-4 mt-3">
            <div><p className="text-xs text-purple-200">LTV</p><p className="text-xl font-bold">{gadai.ltv}%</p></div>
            <div><p className="text-xs text-purple-200">Bunga</p><p className="text-xl font-bold">{gadai.interestRate}%/bln</p></div>
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-4 mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Cara Kerja</p>
          {['1. Pilih aset kripto sebagai jaminan', '2. Masukkan jumlah pinjaman (maks 60% dari nilai jaminan)', '3. Dana IDR langsung masuk ke Wallet Anda', '4. Lunasi pinjaman + bunga untuk menerima kripto kembali'].map((s, i) => (
            <p key={i} className="text-sm text-gray-600 py-1.5 border-b border-gray-50 last:border-0">{s}</p>
          ))}
        </div>

        <div className="bg-white rounded-card shadow-card p-4 mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Aset yang Didukung</p>
          <div className="flex gap-2">
            {gadai.supportedAssets.map(a => <Badge key={a} color="orange">{a}</Badge>)}
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 text-center">
          <p className="text-3xl mb-2">🏗️</p>
          <p className="text-sm font-bold text-gray-900">Buat Pinjaman Baru</p>
          <p className="text-xs text-gray-500 mt-1">Fitur ini akan segera aktif</p>
          <Badge color="gray" size="md">Coming Soon</Badge>
        </div>
      </div>
    </DetailPage>
  )
}
