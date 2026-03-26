import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useMemo } from 'react'

const fmtCell = (v) => {
  if (typeof v === 'number') return v.toLocaleString('es-AR', { maximumFractionDigits: 2 })
  return String(v ?? '')
}

const isNum = (v) => typeof v === 'number'

export default function DataTable({ data, accentColor = '#6366F1' }) {
  const columns = useMemo(() => {
    if (!data?.length) return []
    return Object.keys(data[0]).map(k => ({
      accessorKey: k,
      header: k.replace(/_/g, ' '),
      cell: info => fmtCell(info.getValue()),
      meta: { isNum: isNum(data[0][k]) },
    }))
  }, [data])

  const table = useReactTable({ data: data || [], columns, getCoreRowModel: getCoreRowModel() })
  if (!data?.length) return null

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id} style={{ background: '#F8FAFF' }}>
              {hg.headers.map((h, i) => (
                <th key={h.id} style={{
                  padding: '10px 16px', textAlign: i === 0 ? 'left' : 'right',
                  fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)',
                  textTransform: 'uppercase', letterSpacing: '0.07em',
                  borderBottom: `2px solid ${accentColor}20`,
                }}>
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id}
              style={{ background: i % 2 === 0 ? 'white' : '#FAFBFF', transition: 'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = `${accentColor}08`}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'white' : '#FAFBFF'}
            >
              {row.getVisibleCells().map((cell, ci) => {
                const v = cell.getValue()
                const num = isNum(data[i]?.[cell.column.id])
                return (
                  <td key={cell.id} style={{
                    padding: '10px 16px',
                    textAlign: ci === 0 ? 'left' : 'right',
                    borderBottom: '1px solid var(--border-soft)',
                    fontWeight: num ? 600 : 400,
                    color: num ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontFamily: num ? 'var(--mono)' : 'inherit',
                    fontSize: num ? 12 : 13,
                  }}>
                    {ci === 0 ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: accentColor, opacity: 0.6, flexShrink: 0,
                        }} />
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </span>
                    ) : flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}