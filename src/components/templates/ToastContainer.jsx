import { useUI } from '../../context/UIContext'

export default function ToastContainer() {
  const { toasts } = useUI()

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 w-full max-w-[370px] px-4 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-xl shadow-dark text-sm font-semibold text-white flex items-center gap-2 animate-fade-in ${
            toast.type === 'success' ? 'bg-surface-dark' :
            toast.type === 'error' ? 'bg-negative' : 'bg-blue-600'
          }`}
          style={{ animation: 'fadeIn 0.2s ease' }}
        >
          <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}</span>
          {toast.message}
        </div>
      ))}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
