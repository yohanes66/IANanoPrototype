/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'text-amber-700', 'text-gray-400', 'text-yellow-500', 'text-slate-300',
    'bg-amber-100', 'bg-gray-100', 'bg-yellow-100', 'bg-slate-100',
    'border-amber-400', 'border-gray-300', 'border-yellow-400', 'border-slate-400',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#F7931A',
          light: '#FFF4E6',
          dark: '#E07B0A',
        },
        surface: {
          dark: '#111111',
          mid: '#1C1C1E',
          card: '#FFFFFF',
        },
        positive: '#22C55E',
        negative: '#EF4444',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.12)',
        dark: '0 8px 24px rgba(0,0,0,0.24)',
        orange: '0 4px 12px rgba(247,147,26,0.32)',
        bottom: '0 -1px 0 rgba(0,0,0,0.06)',
      },
      height: {
        'bottom-nav': '80px',
        'status-bar': '44px',
      },
      screens: {
        mobile: '390px',
      },
    },
  },
  plugins: [],
}
