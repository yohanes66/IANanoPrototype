/**
 * FullPageOverlay — renders inside the phone frame as a full-screen page.
 * Replaces BottomSheet for transactional flows (Buy, Sell, Cetak Emas).
 * Slides up from bottom on open; slides down on close.
 */
export default function FullPageOverlay({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div
      className="absolute inset-0 z-50 bg-[#F5F5F5] flex flex-col"
      style={{ animation: 'slideUpFull 0.32s cubic-bezier(0.32,0.72,0,1)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 flex-shrink-0">
        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors flex-shrink-0"
          aria-label="Tutup"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        {title && <h1 className="flex-1 text-base font-bold text-gray-900 truncate">{title}</h1>}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

      <style>{`
        @keyframes slideUpFull {
          from { transform: translateY(100%); opacity: 0.6; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}
