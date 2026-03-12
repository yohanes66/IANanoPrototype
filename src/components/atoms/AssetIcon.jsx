export default function AssetIcon({ asset, size = 'md' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' }

  if (!asset) {
    return <div className={`${sizes[size]} rounded-full bg-gray-200 flex items-center justify-center`} />
  }

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ backgroundColor: asset.iconBg || '#888' }}
    >
      <span className="leading-none">{asset.iconText || asset.ticker?.slice(0, 2)}</span>
    </div>
  )
}
