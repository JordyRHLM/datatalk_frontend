import { useState } from 'react'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: <GridIcon /> },
  { id: 'chat', label: 'Consultas', icon: <ChatIcon /> },
  { id: 'history', label: 'Historial', icon: <HistoryIcon /> },
]

export default function Sidebar({ active, onChange }) {
  return (
    <aside style={{
      width: 56, background: 'var(--ink)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '16px 0', gap: 4, flexShrink: 0,
    }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{
          width: 32, height: 32, background: 'var(--indigo)', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <SparkIcon />
        </div>
      </div>
      {NAV.map(item => (
        <button key={item.id} onClick={() => onChange(item.id)} title={item.label} style={{
          width: 40, height: 40, border: 'none', cursor: 'pointer', borderRadius: 8,
          background: active === item.id ? 'var(--indigo)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s',
          color: active === item.id ? 'white' : '#6B7280',
        }}>
          {item.icon}
        </button>
      ))}
    </aside>
  )
}

function GridIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/><rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity=".6"/><rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity=".6"/><rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" opacity=".3"/></svg>
}
function ChatIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H6l-3 2V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
}
function HistoryIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
function SparkIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.5 4.5H14l-3.75 2.75 1.5 4.5L8 11 4.25 13.75l1.5-4.5L2 6.5h4.5z" fill="white"/></svg>
}