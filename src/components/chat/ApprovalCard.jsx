const INTENT_META = {
  RANKING:     { color: '#6366F1', bg: '#EEF2FF', gradient: 'linear-gradient(135deg,#6366F1,#8B5CF6)', label: 'Ranking'     },
  TENDENCIA:   { color: '#10B981', bg: '#D1FAE5', gradient: 'linear-gradient(135deg,#10B981,#06B6D4)', label: 'Tendencia'   },
  COMPARATIVA: { color: '#F59E0B', bg: '#FEF3C7', gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)', label: 'Comparativa' },
  ANOMALIA:    { color: '#EF4444', bg: '#FEE2E2', gradient: 'linear-gradient(135deg,#EF4444,#F59E0B)', label: 'Anomalía'    },
  AGREGACION:  { color: '#06B6D4', bg: '#ECFEFF', gradient: 'linear-gradient(135deg,#06B6D4,#6366F1)', label: 'Agregación'  },
}

export default function ApprovalCard({ msg, onApprove, loading }) {
  const im = INTENT_META[msg.intent] || INTENT_META.AGREGACION

  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 14, maxWidth: 460,
      boxShadow: 'var(--shadow-md)',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      animation: 'slideUp 0.25s ease',
    }}>
      {/* Tira de color por intent */}
      <div style={{ height: 4, background: im.gradient }} />

      <div style={{ padding: '14px 16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
            background: im.bg, color: im.color,
            padding: '3px 9px', borderRadius: 20,
            border: `1px solid ${im.color}30`,
          }}>{im.label.toUpperCase()}</span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>SQL generado · revisión requerida</span>
          {msg.sensitive && (
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, background: '#FEF3C7', color: '#92400e', padding: '2px 8px', borderRadius: 10 }}>
              ⚠ SENSIBLE
            </span>
          )}
        </div>

        {/* SQL block */}
        <div style={{
          background: '#0F172A', borderRadius: 10, padding: '12px 14px',
          marginBottom: 14, position: 'relative',
          border: '1px solid #1e2438',
        }}>
          <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
            {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <pre style={{
            fontFamily: 'var(--mono)', fontSize: 12, color: '#E2E8F0',
            overflowX: 'auto', lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0,
          }}>{msg.sql}</pre>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.5 }}>
          Revisá el SQL antes de ejecutar. El resultado se visualizará automáticamente.
        </p>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onApprove(msg.queryId, true)} disabled={loading} style={{
            flex: 1, padding: '9px', borderRadius: 9, border: 'none',
            background: loading ? '#A5B4FC' : 'linear-gradient(135deg,#6366F1,#8B5CF6)',
            color: 'white', fontWeight: 600, fontSize: 13, cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
            transition: 'transform 0.1s, box-shadow 0.1s',
          }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 6px 16px rgba(99,102,241,0.4)' }}}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 12px rgba(99,102,241,0.3)' }}
          >
            {loading ? '⏳ Ejecutando…' : '✓ Aprobar y ejecutar'}
          </button>
          <button onClick={() => onApprove(msg.queryId, false)} disabled={loading} style={{
            padding: '9px 16px', borderRadius: 9, border: '1.5px solid var(--border)',
            background: 'var(--surface)', color: 'var(--text-secondary)',
            fontSize: 13, cursor: 'pointer', fontWeight: 500,
            transition: 'border-color 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor='var(--coral)'}
            onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
          >Rechazar</button>
        </div>
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}