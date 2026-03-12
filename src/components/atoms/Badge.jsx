export default function Badge({ children, color = 'gray', size = 'sm' }) {
  const colors = {
    gray: 'bg-gray-100 text-gray-600',
    orange: 'bg-brand-light text-brand',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  }
  const sizes = { xs: 'text-[10px] px-1.5 py-0.5', sm: 'text-xs px-2 py-0.5', md: 'text-sm px-3 py-1' }

  return (
    <span className={`inline-flex items-center rounded-pill font-semibold ${colors[color]} ${sizes[size]}`}>
      {children}
    </span>
  )
}
