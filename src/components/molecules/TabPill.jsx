export default function TabPill({ tabs, activeTab, onSelect, size = 'sm' }) {
  const sizes = { sm: 'text-xs px-3 py-1.5', md: 'text-sm px-4 py-2' }

  return (
    <div className="flex gap-1">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`flex-shrink-0 rounded-pill font-semibold transition-all active:scale-95 ${sizes[size]} ${
            activeTab === tab.id
              ? 'bg-surface-dark text-white'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
