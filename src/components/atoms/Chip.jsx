export default function Chip({ label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3 py-1.5 rounded-pill text-sm font-semibold transition-all active:scale-95 ${
        active
          ? 'bg-surface-dark text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  )
}
