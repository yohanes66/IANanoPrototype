import DetailPage from '../../components/templates/DetailPage'
import TransactionRow from '../../components/molecules/TransactionRow'
import { useWallet } from '../../context/WalletContext'

export default function TransactionHistoryPage() {
  const { wallet } = useWallet()

  return (
    <DetailPage title="Riwayat Transaksi">
      <div className="px-4 py-4">
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="divide-y divide-gray-50">
            {wallet.transactions.map(tx => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </div>
        </div>
      </div>
    </DetailPage>
  )
}
