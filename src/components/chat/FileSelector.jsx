import { useEffect, useRef } from 'react'

export default function FileSelector({ files, onSelect, onUpload, current }) {
  const fileRef = useRef(null)

  return (
    <div style={{
      padding: '12px 16px', borderBottom: '1px solid var(--border)',
      background: 'var(--cloud)',
    }}>
      <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Archivo activo
      </p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        {files.map(f => (
          <button key={f.name} onClick={() => onSelect(`uploads/${f.name}`, f.name)} style={{
            padding: '5px 10px', fontSize: 12, borderRadius: 6, cursor: 'pointer',
            border: '1px solid',
            borderColor: current === f.name ? 'var(--indigo)' : 'var(--border)',
            background: current === f.name ? 'var(--indigo-light)' : 'var(--surface)',
            color: current === f.name ? 'var(--indigo-dim)' : 'var(--text-secondary)',
            fontWeight: current === f.name ? 500 : 400,
            transition: 'all 0.15s',
          }}>
            {f.name.replace('.xlsx', '').replace('.csv', '').replace(/_/g, ' ')}
          </button>
        ))}
        <button onClick={() => fileRef.current?.click()} style={{
          padding: '5px 10px', fontSize: 12, borderRadius: 6, cursor: 'pointer',
          border: '1px dashed var(--border)', background: 'transparent',
          color: 'var(--text-tertiary)', transition: 'all 0.15s',
        }}>
          + Subir nuevo
        </button>
        <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv"
          style={{ display: 'none' }}
          onChange={e => e.target.files[0] && onUpload(e.target.files[0])} />
      </div>
    </div>
  )
}