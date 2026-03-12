import { useUI } from '../../context/UIContext'

export default function LoadingOverlay() {
  const { isLoading } = useUI()
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 shadow-dark">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-brand rounded-full animate-spin" />
        <p className="text-sm font-semibold text-gray-700">Memproses...</p>
      </div>
    </div>
  )
}
