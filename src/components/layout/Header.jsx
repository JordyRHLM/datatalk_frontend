const INTENT_META = {
  RANKING:     { color: '#6366F1', bg: '#EEF2FF', label: 'Ranking'     },
  TENDENCIA:   { color: '#10B981', bg: '#D1FAE5', label: 'Tendencia'   },
  COMPARATIVA: { color: '#F59E0B', bg: '#FEF3C7', label: 'Comparativa' },
  ANOMALIA:    { color: '#EF4444', bg: '#FEE2E2', label: 'Anomalía'    },
  AGREGACION:  { color: '#06B6D4', bg: '#ECFEFF', label: 'Agregación'  },
}

const TAB_LABELS = { dashboard: 'Dashboard', chat: 'Consultas', history: 'Auditoría' }

export default function Header({ schema, activeTab, fileName, result }) {
  const intent = result?.intent
  const im = intent ? INTENT_META[intent] : null

  return (
    <header style={{
      height: 54, borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 22px', flexShrink: 0,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          {TAB_LABELS[activeTab]}
        </span>
        {fileName && (
          <span style={{
            fontSize: 11, fontWeight: 500,
            background: 'var(--indigo-light)', color: 'var(--indigo-dim)',
            padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(99,102,241,0.15)',
          }}>
            {fileName.replace('.xlsx','').replace('.csv','').replace(/_/g,' ')}
            {schema && ` · ${schema.row_count?.toLocaleString()} filas`}
          </span>
        )}
        {im && (
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
            background: im.bg, color: im.color,
            padding: '3px 9px', borderRadius: 20,
            border: `1px solid ${im.color}30`,
            animation: 'fadeIn 0.3s ease',
          }}>
            {im.label.toUpperCase()}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {result?.autocorrected && (
          <span style={{
            fontSize: 11, color: '#D97706', background: '#FEF3C7',
            padding: '3px 9px', borderRadius: 20, fontWeight: 500,
          }}>⚡ Autocorregido</span>
        )}
        <div style={{
          width: 8, height: 8, borderRadius: '50%', background: '#10B981',
          boxShadow: '0 0 6px rgba(16,185,129,0.5)',
        }} title="API conectada" />
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Live</span>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </header>
  )
}