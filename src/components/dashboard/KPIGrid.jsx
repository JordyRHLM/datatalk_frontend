const fmt = (v) => {
  if (typeof v !== 'number') return String(v)
  if (v >= 1_000_000) return `$${(v/1_000_000).toFixed(2)}M`
  if (v >= 1_000)     return `$${(v/1_000).toFixed(1)}k`
  return v.toLocaleString('es-AR', { maximumFractionDigits: 2 })
}

const KPI_COLORS = [
  { gradient: 'linear-gradient(135deg,#6366F1,#8B5CF6)', shadow: 'rgba(99,102,241,0.3)'  },
  { gradient: 'linear-gradient(135deg,#10B981,#06B6D4)', shadow: 'rgba(16,185,129,0.3)'  },
  { gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)', shadow: 'rgba(245,158,11,0.3)'  },
  { gradient: 'linear-gradient(135deg,#06B6D4,#6366F1)', shadow: 'rgba(6,182,212,0.3)'   },
]

export default function KPIGrid({ kpis }) {
  if (!kpis?.length) return null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(kpis.length,4)},minmax(0,1fr))`, gap: 12 }}>
      {kpis.map((kpi, i) => {
        const c = KPI_COLORS[i % KPI_COLORS.length]
        return (
          <div key={i} style={{
            borderRadius: 14, padding: '18px 20px',
            background: c.gradient,
            boxShadow: `0 8px 24px ${c.shadow}`,
            animation: `fadeUp ${0.2 + i*0.08}s ease`,
          }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              {kpi.label}
            </p>
            <p style={{ fontSize: 26, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
              {fmt(kpi.value)}
            </p>
          </div>
        )
      })}
    </div>
  )
}