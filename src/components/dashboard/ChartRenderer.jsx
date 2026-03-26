import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts'

const COLORS = ['#4F46E5', '#6EE7B7', '#F59E0B', '#EF4444', '#8B5CF6', '#10B981']

const fmtNum = (v) => {
  if (typeof v !== 'number') return v
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}k`
  return v.toLocaleString('es-AR', { maximumFractionDigits: 2 })
}

const tooltipStyle = {
  background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8,
  fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
}

export default function ChartRenderer({ recharts }) {
  if (!recharts || recharts.chart_type === 'none') return null
  const { chart_type, data, keys, title } = recharts
  const xKey = keys?.x
  const yKeys = keys?.y || []

  if (chart_type === 'bar' || chart_type === 'bar_horizontal') {
    const isH = chart_type === 'bar_horizontal'
    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout={isH ? 'vertical' : 'horizontal'}
          margin={{ top: 4, right: 16, left: isH ? 80 : 0, bottom: isH ? 4 : 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          {isH
            ? <><YAxis dataKey={xKey} type="category" tick={{ fontSize: 12, fill: '#6B7280' }} width={80} /><XAxis type="number" tickFormatter={fmtNum} tick={{ fontSize: 11, fill: '#9CA3AF' }} /></>
            : <><XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#6B7280' }} angle={-25} textAnchor="end" /><YAxis tickFormatter={fmtNum} tick={{ fontSize: 11, fill: '#9CA3AF' }} /></>
          }
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [fmtNum(v)]} />
          {yKeys.map((k, i) => (
            <Bar key={k} dataKey={k} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} maxBarSize={48} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (chart_type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#6B7280' }} angle={-25} textAnchor="end" />
          <YAxis tickFormatter={fmtNum} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [fmtNum(v)]} />
          {yKeys.map((k, i) => (
            <Line key={k} dataKey={k} stroke={COLORS[i % COLORS.length]} strokeWidth={2}
              dot={{ r: 4, fill: COLORS[i % COLORS.length] }} activeDot={{ r: 6 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (chart_type === 'pie') {
    const pieData = data.map(row => ({ name: String(row[xKey]), value: row[yKeys[0]] }))
    return (
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}>
            {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [fmtNum(v)]} />
          <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return null
}