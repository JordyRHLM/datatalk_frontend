import { useState, useEffect, useCallback } from 'react'
import { getHistory } from '../../lib/api'

const EVENT_STYLE = {
  ACCESS_GRANTED:    { bg: '#D1FAE5', color: '#065f46', label: 'Acceso' },
  QUERY_EXECUTED:    { bg: '#DBEAFE', color: '#1e40af', label: 'Ejecutada' },
  QUERY_FAILED:      { bg: '#FEE2E2', color: '#991b1b', label: 'Fallida'  },
  BLOCKED_INJECTION: { bg: '#FEF3C7', color: '#92400e', label: 'Bloqueada'},
  BLOCKED_RBAC:      { bg: '#EDE9FE', color: '#5b21b6', label: 'Sin acceso'},
}

const ROLE_STYLE = {
  admin:   { bg: '#EEF2FF', color: '#3730a3' },
  manager: { bg: '#D1FAE5', color: '#065f46' },
  analyst: { bg: '#E0F2FE', color: '#0369a1' },
  viewer:  { bg: '#F3F4F6', color: '#6B7280' },
}

function fmt(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export default function AuditPanel() {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const { data } = await getHistory(100)
      setEvents(data.events || [])
    } catch { /* silencioso */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = filter === 'ALL' ? events : events.filter(e => e.event === filter)

  const stats = {
    total:     events.length,
    executed:  events.filter(e => e.event === 'QUERY_EXECUTED').length,
    blocked:   events.filter(e => e.event?.startsWith('BLOCKED')).length,
    sensitive: events.filter(e => e.sensitive).length,
  }

  const FILTERS = ['ALL', 'ACCESS_GRANTED', 'QUERY_EXECUTED', 'QUERY_FAILED', 'BLOCKED_INJECTION']

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0', borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 500 }}>Audit log</h2>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>Trazabilidad completa · Responsible AI</p>
          </div>
          <button onClick={load} style={{
            padding: '6px 14px', background: 'var(--cloud)', border: '1px solid var(--border)',
            borderRadius: 8, fontSize: 12, cursor: 'pointer', color: 'var(--text-secondary)',
          }}>↻ Actualizar</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Total eventos', value: stats.total, color: 'var(--indigo)' },
            { label: 'Ejecutadas', value: stats.executed, color: '#059669' },
            { label: 'Bloqueadas', value: stats.blocked, color: '#DC2626' },
            { label: 'Sensibles', value: stats.sensitive, color: '#D97706' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--cloud)', borderRadius: 10, padding: '12px 14px' }}>
              <p style={{ fontSize: 20, fontWeight: 500, color: s.color }}>{s.value}</p>
              <p style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 6, paddingBottom: 1 }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '5px 12px', fontSize: 11, borderRadius: '6px 6px 0 0', cursor: 'pointer',
              border: '1px solid', borderBottom: filter === f ? '1px solid var(--surface)' : '1px solid var(--border)',
              background: filter === f ? 'var(--surface)' : 'var(--cloud)',
              color: filter === f ? 'var(--indigo)' : 'var(--text-tertiary)',
              fontWeight: filter === f ? 500 : 400, marginBottom: -1,
            }}>
              {f === 'ALL' ? 'Todos' : (EVENT_STYLE[f]?.label || f)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--surface)' }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>Cargando…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>
            <p style={{ fontSize: 28, marginBottom: 12 }}>📋</p>
            No hay eventos todavía. Hacé una consulta primero.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--cloud)', zIndex: 1 }}>
              <tr>
                {['Timestamp', 'Evento', 'Usuario', 'Rol', 'Pregunta', 'Detalles'].map(h => (
                  <th key={h} style={{
                    padding: '10px 16px', textAlign: 'left', fontWeight: 500,
                    fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase',
                    letterSpacing: '0.06em', borderBottom: '1px solid var(--border)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => {
                const es = EVENT_STYLE[e.event] || { bg: '#F3F4F6', color: '#374151', label: e.event }
                const rs = ROLE_STYLE[e.role] || ROLE_STYLE.viewer
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-soft)' }}
                    onMouseEnter={ev => ev.currentTarget.style.background = 'var(--cloud)'}
                    onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '10px 16px', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{fmt(e.timestamp)}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ background: es.bg, color: es.color, padding: '2px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600 }}>
                        {es.label}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-secondary)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.user_id || '—'}</td>
                    <td style={{ padding: '10px 16px' }}>
                      {e.role && <span style={{ background: rs.bg, color: rs.color, padding: '2px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600 }}>{e.role}</span>}
                    </td>
                    <td style={{ padding: '10px 16px', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}
                      title={e.question}>{e.question || '—'}</td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-tertiary)' }}>
                      {e.attempts != null && `${e.attempts} intento${e.attempts !== 1 ? 's' : ''}`}
                      {e.autocorrected && <span style={{ marginLeft: 6, color: '#D97706', fontSize: 10 }}>⚡ corregido</span>}
                      {e.sensitive && <span style={{ marginLeft: 6, color: '#D97706', fontSize: 10 }}>⚠ sensible</span>}
                      {e.reason && <span style={{ color: '#DC2626' }}>{e.reason.slice(0, 40)}</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}