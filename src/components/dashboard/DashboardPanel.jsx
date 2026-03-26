import ChartRenderer from './ChartRenderer'
import KPIGrid from './KPIGrid'
import DataTable from './DataTable'

export default function DashboardPanel({ result }) {
  if (!result) return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 12, color: 'var(--text-tertiary)',
    }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="20" width="8" height="16" rx="2" fill="#E5E7EB"/><rect x="16" y="12" width="8" height="24" rx="2" fill="#D1D5DB"/><rect x="28" y="6" width="8" height="30" rx="2" fill="#E5E7EB"/></svg>
      <p style={{ fontSize: 13 }}>Los resultados de tus consultas aparecerán acá</p>
    </div>
  )

  const recharts = result.chart?.recharts
  const data = result.data

  return (
    <div style={{ padding: '20px 24px', overflowY: 'auto', height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPIs */}
      {recharts?.kpis?.length > 0 && <KPIGrid kpis={recharts.kpis} />}

      {/* Chart */}
      {recharts && recharts.chart_type !== 'none' && recharts.chart_type !== 'kpi' && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '16px 12px 8px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingLeft: 4 }}>
            <p style={{ fontWeight: 500, fontSize: 14 }}>{recharts.title}</p>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4,
              background: 'var(--indigo-light)', color: 'var(--indigo-dim)', letterSpacing: '0.04em',
            }}>{recharts.chart_type.replace('_', ' ').toUpperCase()}</span>
          </div>
          <ChartRenderer recharts={recharts} />
        </div>
      )}

      {/* Explanation */}
      {result.explanation && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '14px 16px',
          borderLeft: '3px solid var(--indigo)',
        }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--indigo)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Análisis</p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-primary)' }}>{result.explanation}</p>
          <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Intentos: {result.attempts}</span>
            {result.autocorrected && <span style={{ fontSize: 11, color: 'var(--amber-text)', background: 'var(--amber-bg)', padding: '1px 6px', borderRadius: 4 }}>Autocorregido</span>}
          </div>
        </div>
      )}

      {/* Table */}
      {data?.length > 0 && (
        <div>
          <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Datos · {data.length} resultado{data.length !== 1 ? 's' : ''}
          </p>
          <DataTable data={data} />
        </div>
      )}
    </div>
  )
}