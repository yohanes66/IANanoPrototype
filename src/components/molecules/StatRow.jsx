export default function StatRow({ label, value, valueClass = 'text-gray-900', labelClass = 'text-gray-500' }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className={`text-sm ${labelClass}`}>{label}</span>
      <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
    </div>
  )
}
