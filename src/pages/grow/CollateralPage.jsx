import DetailPage from '../../components/templates/DetailPage'

export default function CollateralPage() {
  return (
    <DetailPage title="Collateral Kartu Kredit">
      <div className="px-4 py-4 pb-20 space-y-4">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-card p-5">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>
            </svg>
          </div>
          <h2 className="text-lg font-extrabold text-gray-900">Collateral Kartu Kredit</h2>
          <p className="text-sm text-gray-600 mt-1">Gunakan aset kripto atau emas digital Anda sebagai jaminan untuk mendapatkan limit kartu kredit hingga Rp 500 juta.</p>
        </div>

        {/* How it works */}
        <p className="text-sm font-bold text-gray-900">Cara Kerja</p>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Pilih Aset Kolateral', desc: 'Pilih crypto atau emas yang akan dijadikan jaminan (BTC, ETH, GOLD).' },
            { step: '2', title: 'Tentukan Limit', desc: 'Limit kartu hingga 60% dari nilai aset kolateral Anda.' },
            { step: '3', title: 'Aktivasi Kartu', desc: 'Kartu kredit fisik atau virtual dikirim dalam 3–5 hari kerja.' },
            { step: '4', title: 'Gunakan & Lunasi', desc: 'Bayar tagihan dari saldo IDR atau aset secara otomatis.' },
          ].map(s => (
            <div key={s.step} className="bg-white rounded-card shadow-card p-4 flex gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xs font-extrabold text-blue-600">{s.step}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{s.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full bg-surface-dark text-white font-bold py-4 rounded-card active:opacity-80">
          Ajukan Sekarang
        </button>
      </div>
    </DetailPage>
  )
}
