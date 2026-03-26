const fmt = (v) => {
  if (typeof v !== 'number') return v
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}k`
  return v.toLocaleString('es-AR', { maximumFractionDigits: 2 })
}

export default function KPIGrid({ kpis }) {
  if (!kpis?.length) return null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(kpis.length, 4)}, minmax(0,1fr))`, gap: 10 }}>
      {kpis.map((kpi, i) => (
        <div key={i} style={{ background: 'var(--cloud)', borderRadius: 10, padding: '14px 16px' }}>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</p>
          <p style={{ fontSize: 24, fontWeight: 500, color: 'var(--text-primary)' }}>{fmt(kpi.value)}</p>
        </div>
      ))}
    </div>
  )
}