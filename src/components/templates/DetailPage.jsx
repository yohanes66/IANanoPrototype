import { useNavigate } from 'react-router-dom'

export default function DetailPage({ title, children, actions, onBack }) {
  const navigate = useNavigate()
  const handleBack = onBack || (() => navigate(-1))

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-50 sticky top-0 z-10">
        <button
          onClick={handleBack}
          className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 flex-shrink-0 transition-colors"
          aria-label="Kembali"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        {title && <h1 className="flex-1 text-base font-bold text-gray-900 truncate">{title}</h1>}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
