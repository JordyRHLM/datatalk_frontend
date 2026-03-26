import ChartRenderer from './ChartRenderer'
import KPIGrid from './KPIGrid'
import DataTable from './DataTable'

const INTENT_META = {
  RANKING:     { color: '#6366F1', bg: '#EEF2FF', icon: '🏆' },
  TENDENCIA:   { color: '#10B981', bg: '#D1FAE5', icon: '📈' },
  COMPARATIVA: { color: '#F59E0B', bg: '#FEF3C7', icon: '⚖️' },
  ANOMALIA:    { color: '#EF4444', bg: '#FEE2E2', icon: '🔍' },
  AGREGACION:  { color: '#06B6D4', bg: '#ECFEFF', icon: '📊' },
}

export default function DashboardPanel({ result }) {
  if (!result) return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, opacity: 0.12 }}>
        {[60,80,45,95].map((h, i) => (
          <div key={i} style={{ width: 80, height: h, background: 'var(--indigo)', borderRadius: 8 }} />
        ))}
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', textAlign: 'center' }}>
        Los resultados aparecerán acá<br />
        <span style={{ fontSize: 11 }}>Hacé una consulta en el chat →</span>
      </p>
    </div>
  )

  const recharts = result.chart?.recharts
  const data = result.data
  const im = INTENT_META[result.intent] || INTENT_META.AGREGACION

  return (
    <div style={{ padding: '20px', overflowY: 'auto', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* KPIs */}
      {recharts?.kpis?.length > 0 && <KPIGrid kpis={recharts.kpis} />}

      {/* Chart card */}
      {recharts && recharts.chart_type !== 'none' && recharts.chart_type !== 'kpi' && (
        <div style={{
          background: 'var(--surface)', borderRadius: 16,
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          animation: 'fadeUp 0.35s ease',
        }}>
          {/* Header del chart con accent */}
          <div style={{
            padding: '14px 18px 0',
            borderBottom: '1px solid var(--border-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 32, height: 32, borderRadius: 8,
                background: im.bg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 16,
              }}>{im.icon}</span>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>
                  {recharts.title || 'Visualización'}
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                  {data?.length} resultado{data?.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
              background: im.bg, color: im.color,
              padding: '3px 10px', borderRadius: 20,
              border: `1px solid ${im.color}25`,
            }}>
              {recharts.chart_type.replace('_',' ').toUpperCase()}
            </span>
          </div>
          <div style={{ padding: '16px 8px 8px' }}>
            <ChartRenderer recharts={recharts} />
          </div>
        </div>
      )}

      {/* Explanation */}
      {result.explanation && (
        <div style={{
          background: 'var(--surface)', borderRadius: 14,
          boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)',
          borderLeft: `4px solid ${im.color}`,
          padding: '16px 18px',
          animation: 'fadeUp 0.4s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 14 }}>💡</span>
            <p style={{ fontSize: 11, fontWeight: 700, color: im.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Análisis automático
            </p>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text-primary)' }}>{result.explanation}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border-soft)' }}>
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
              ⏱ {result.attempts} intento{result.attempts !== 1 ? 's' : ''}
            </span>
            {result.autocorrected && (
              <span style={{ fontSize: 11, background: '#FEF3C7', color: '#92400e', padding: '1px 8px', borderRadius: 10, fontWeight: 500 }}>
                ⚡ SQL autocorregido
              </span>
            )}
          </div>
        </div>
      )}

      {/* Tabla */}
      {data?.length > 0 && (
        <div style={{
          background: 'var(--surface)', borderRadius: 14,
          boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)',
          overflow: 'hidden', animation: 'fadeUp 0.45s ease',
        }}>
          <div style={{
            padding: '12px 18px', borderBottom: '1px solid var(--border-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--surface-raised)',
          }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              📋 Datos · {data.length} filas
            </p>
          </div>
          <DataTable data={data} accentColor={im.color} />
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  )
}