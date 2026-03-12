export default function Button({
  children, onClick, variant = 'primary', size = 'md',
  fullWidth = false, disabled = false, className = '', type = 'button',
}) {
  const base = 'inline-flex items-center justify-center font-semibold transition-all active:scale-95 select-none rounded-pill'

  const variants = {
    primary: 'bg-surface-dark text-white shadow-dark',
    orange: 'bg-brand text-white shadow-orange',
    secondary: 'bg-gray-100 text-gray-800',
    ghost: 'bg-transparent text-gray-600',
    outline: 'border border-gray-200 bg-white text-gray-800',
    danger: 'bg-negative text-white',
  }

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-6 text-base',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
