import { useState } from 'react'
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'

const PERIODS = [
  { id: '1W', label: '1M', count: 7 },
  { id: '1M', label: '1B', count: 14 },
  { id: '3M', label: '3B', count: 21 },
  { id: '1Y', label: '1T', count: 30 },
]

export default function MiniCandleChart({ ohlcv = [], change24h = 0 }) {
  const [period, setPeriod] = useState('1M')
  const isPositive = change24h >= 0
  const color = isPositive ? '#22C55E' : '#EF4444'

  const periodConfig = PERIODS.find(p => p.id === period) || PERIODS[1]
  const data = ohlcv.slice(-periodConfig.count).map(d => ({
    ...d,
    range: [d.low, d.high],
    body: [Math.min(d.open, d.close), Math.max(d.open, d.close)],
    isUp: d.close >= d.open,
  }))

  const prices = data.map(d => d.close)
  const minPrice = Math.min(...prices) * 0.998
  const maxPrice = Math.max(...prices) * 1.002

  return (
    <div className="bg-white rounded-card shadow-card p-4 mb-4">
      {/* Period Selector */}
      <div className="flex justify-center gap-1 mb-3">
        {PERIODS.map(p => (
          <button
            key={p.id}
            onClick={() => setPeriod(p.id)}
            className={`px-3 py-1 text-xs font-bold rounded-pill transition-all ${period === p.id ? 'bg-surface-dark text-white' : 'text-gray-400 hover:text-gray-700'}`}
          >
            {p.id}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: '#9CA3AF' }}
              tickFormatter={v => v.slice(5)}
              interval={Math.floor(data.length / 4)}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              tick={{ fontSize: 9, fill: '#9CA3AF' }}
              tickFormatter={v => {
                if (v >= 1000000) return `${(v/1000000).toFixed(0)}jt`
                if (v >= 1000) return `${(v/1000).toFixed(0)}rb`
                return v.toFixed(0)
              }}
              axisLine={false}
              tickLine={false}
              width={45}
            />
            <Tooltip
              contentStyle={{ fontSize: 10, borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              formatter={(v) => {
                if (v >= 1000000) return [`Rp${(v/1000000).toFixed(2)}jt`, '']
                return [`Rp${Number(v).toLocaleString('id-ID')}`, '']
              }}
              labelFormatter={l => l}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
