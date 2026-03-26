import ApprovalCard from './ApprovalCard'

export default function MessageBubble({ msg, onApprove, loading }) {
  if (msg.type === 'user') return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{
        background: 'var(--indigo)', color: 'white', padding: '9px 14px',
        borderRadius: '12px 12px 3px 12px', maxWidth: 400, fontSize: 14, lineHeight: 1.5,
      }}>{msg.text}</div>
    </div>
  )

  if (msg.type === 'approval') return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <ApprovalCard msg={msg} onApprove={onApprove} loading={loading} />
    </div>
  )

  if (msg.type === 'system') return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span style={{
        fontSize: 11, color: 'var(--text-tertiary)', background: 'var(--border-soft)',
        padding: '4px 12px', borderRadius: 20,
      }}>{msg.text}</span>
    </div>
  )

  if (msg.type === 'warning') return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span style={{
        fontSize: 11, color: 'var(--amber-text)', background: 'var(--amber-bg)',
        padding: '4px 12px', borderRadius: 20,
      }}>⚠ {msg.text}</span>
    </div>
  )

  if (msg.type === 'error') return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div style={{
        background: 'var(--coral-bg)', color: 'var(--coral-text)', padding: '9px 14px',
        borderRadius: '12px 12px 12px 3px', maxWidth: 400, fontSize: 13,
        border: '1px solid #FECACA',
      }}>{msg.text}</div>
    </div>
  )

  if (msg.type === 'result') return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: '12px 12px 12px 3px', padding: '12px 16px', maxWidth: 480,
      }}>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-primary)', marginBottom: 6 }}>
          {msg.text}
        </p>
        {msg.rowCount != null && (
          <span style={{
            fontSize: 11, color: 'var(--text-tertiary)',
          }}>{msg.rowCount} resultado{msg.rowCount !== 1 ? 's' : ''}</span>
        )}
      </div>
    </div>
  )

  return null
}