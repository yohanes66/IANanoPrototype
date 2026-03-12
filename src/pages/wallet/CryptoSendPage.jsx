import DetailPage from '../../components/templates/DetailPage'
import Badge from '../../components/atoms/Badge'

export default function CryptoSendPage() {
  return (
    <DetailPage title="Kirim Crypto">
      <div className="px-4 py-8 text-center">
        <div className="text-5xl mb-4">🚀</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Kirim Crypto</h3>
        <p className="text-sm text-gray-500 mb-4">Fitur pengiriman crypto antar wallet sedang dalam pengembangan</p>
        <Badge color="orange">Coming Soon</Badge>
      </div>
    </DetailPage>
  )
}
