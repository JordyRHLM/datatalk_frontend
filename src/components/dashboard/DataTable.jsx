import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useMemo } from 'react'

const fmtCell = (v) => {
  if (typeof v === 'number') return v.toLocaleString('es-AR', { maximumFractionDigits: 2 })
  return String(v ?? '')
}

export default function DataTable({ data }) {
  const columns = useMemo(() => {
    if (!data?.length) return []
    return Object.keys(data[0]).map(k => ({
      accessorKey: k,
      header: k.replace(/_/g, ' '),
      cell: info => fmtCell(info.getValue()),
    }))
  }, [data])

  const table = useReactTable({ data: data || [], columns, getCoreRowModel: getCoreRowModel() })

  if (!data?.length) return null

  return (
    <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid var(--border)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id} style={{ background: 'var(--cloud)' }}>
              {hg.headers.map(h => (
                <th key={h.id} style={{
                  padding: '9px 14px', textAlign: 'left', fontWeight: 500,
                  fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase',
                  letterSpacing: '0.05em', borderBottom: '1px solid var(--border)',
                }}>
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--cloud)' }}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{
                  padding: '8px 14px', borderBottom: '1px solid var(--border-soft)',
                  color: 'var(--text-primary)',
                }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}