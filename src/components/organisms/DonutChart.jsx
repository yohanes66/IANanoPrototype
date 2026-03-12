import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#F7931A', '#3B82F6', '#22C55E', '#A855F7', '#EF4444', '#F59E0B', '#14B8A6']

export default function DonutChart({ data, title }) {
  // data = [{ name, value, pct }]
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="bg-white rounded-card shadow-card p-4 mb-4">
      {title && <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">{title}</p>}
      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="w-32 h-32 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius="60%" outerRadius="85%"
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 10, borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(v, n) => [`${((v/total)*100).toFixed(1)}%`, n]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="flex-1 space-y-1.5">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-xs text-gray-600">{d.name}</span>
              </div>
              <span className="text-xs font-bold text-gray-900">
                {d.pct !== undefined ? `${d.pct}%` : `${((d.value/total)*100).toFixed(1)}%`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
