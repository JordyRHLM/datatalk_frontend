export default function ApprovalCard({ msg, onApprove, loading }) {
  const intentColors = {
    RANKING: { bg: '#EEF2FF', text: '#3730a3' },
    TENDENCIA: { bg: '#D1FAE5', text: '#065f46' },
    COMPARATIVA: { bg: '#FEF3C7', text: '#92400e' },
    ANOMALIA: { bg: '#FEE2E2', text: '#991b1b' },
    AGREGACION: { bg: '#F3F4F6', text: '#374151' },
  }
  const ic = intentColors[msg.intent] || intentColors.AGREGACION

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 12, padding: 14, maxWidth: 480,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)' }}>SQL generado</span>
        <span style={{
          fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4,
          background: ic.bg, color: ic.text, letterSpacing: '0.04em',
        }}>{msg.intent}</span>
        {msg.sensitive && (
          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: 'var(--coral-bg)', color: 'var(--coral-text)', fontWeight: 600 }}>SENSIBLE</span>
        )}
      </div>
      <pre style={{
        fontFamily: 'var(--mono)', fontSize: 11.5, background: 'var(--cloud)',
        border: '1px solid var(--border-soft)', borderRadius: 8, padding: '10px 12px',
        color: '#374151', overflowX: 'auto', lineHeight: 1.6, marginBottom: 12,
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
      }}>{msg.sql}</pre>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
        Revisá el SQL antes de ejecutar. Una vez aprobado se correrá contra tus datos.
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onApprove(msg.queryId, true)} disabled={loading} style={{
          padding: '7px 18px', background: 'var(--indigo)', color: 'white',
          border: 'none', borderRadius: 8, fontWeight: 500, cursor: 'pointer',
          fontSize: 13, opacity: loading ? 0.6 : 1, transition: 'opacity 0.15s',
        }}>
          {loading ? 'Ejecutando…' : 'Aprobar y ejecutar'}
        </button>
        <button onClick={() => onApprove(msg.queryId, false)} disabled={loading} style={{
          padding: '7px 14px', background: 'transparent', color: 'var(--text-secondary)',
          border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', fontSize: 13,
        }}>
          Rechazar
        </button>
      </div>
    </div>
  )
}