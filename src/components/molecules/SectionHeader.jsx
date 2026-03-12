import { useNavigate } from 'react-router-dom'

export default function SectionHeader({ title, seeAllPath, seeAllLabel = 'Lihat Semua', action }) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      {seeAllPath && (
        <button onClick={() => navigate(seeAllPath)} className="text-xs font-semibold text-brand active:opacity-70">
          {seeAllLabel}
        </button>
      )}
      {action && action}
    </div>
  )
}
