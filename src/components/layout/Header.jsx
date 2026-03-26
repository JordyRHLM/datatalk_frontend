export default function Header({ schema, activeTab }) {
  const labels = { dashboard: 'Dashboard', chat: 'Consultas', history: 'Historial de auditoría' }
  return (
    <header style={{
      height: 52, borderBottom: '1px solid var(--border)', background: 'var(--surface)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 500, fontSize: 15 }}>{labels[activeTab]}</span>
        {schema && (
          <span style={{
            fontSize: 11, background: 'var(--indigo-light)', color: 'var(--indigo-dim)',
            padding: '2px 8px', borderRadius: 5, fontWeight: 500,
          }}>
            {schema.table_name} · {schema.row_count.toLocaleString()} filas
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', background: 'var(--indigo)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 500, color: 'white',
        }}>DT</div>
      </div>
    </header>
  )
}