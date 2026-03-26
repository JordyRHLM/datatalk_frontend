import { useState } from 'react'
import { ROLE_CONFIG } from '../../lib/auth'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: GridIcon },
  { id: 'chat',      label: 'Consultas', icon: ChatIcon  },
  { id: 'history',   label: 'Auditoría', icon: ShieldIcon},
]

export default function Sidebar({ active, onChange, user, onLogout }) {
  const [expanded, setExpanded] = useState(false)
  const role = user?.role || 'viewer'
  const rc = ROLE_CONFIG[role] || ROLE_CONFIG.viewer
  const initials = (user?.display_name || user?.user_id || 'DT').slice(0, 2).toUpperCase()

  return (
    <aside style={{
      width: expanded ? 200 : 56, background: 'var(--ink)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.22s cubic-bezier(.4,0,.2,1)',
      overflow: 'hidden', flexShrink: 0,
    }}>
      {/* Logo + toggle */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: expanded ? '14px 14px 14px 14px' : '14px 0',
        justifyContent: expanded ? 'space-between' : 'center',
        borderBottom: '1px solid #1f2333',
      }}>
        <div style={{
          width: 32, height: 32, background: 'var(--indigo)', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <SparkIcon />
        </div>
        {expanded && <span style={{ color: 'white', fontWeight: 600, fontSize: 14, marginLeft: 10, flex: 1 }}>DataTalk</span>}
        <button onClick={() => setExpanded(e => !e)} style={{
          width: 24, height: 24, border: 'none', background: 'transparent',
          cursor: 'pointer', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d={expanded ? 'M9 3L5 7l4 4' : 'M5 3l4 4-4 4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 0' }}>
        {NAV.map(item => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button key={item.id} onClick={() => onChange(item.id)} title={item.label} style={{
              width: '100%', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
              padding: expanded ? '10px 14px' : '10px 0',
              justifyContent: expanded ? 'flex-start' : 'center',
              background: isActive ? '#1a1d2e' : 'transparent',
              borderLeft: isActive ? '2px solid var(--indigo)' : '2px solid transparent',
              color: isActive ? 'white' : '#6B7280',
              transition: 'all 0.15s',
            }}>
              <span style={{ flexShrink: 0, marginLeft: expanded ? 0 : 0 }}><Icon /></span>
              {expanded && <span style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div style={{
        borderTop: '1px solid #1f2333',
        padding: expanded ? '12px 14px' : '12px 0',
        display: 'flex', alignItems: 'center', gap: 10,
        justifyContent: expanded ? 'flex-start' : 'center',
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          background: rc.color, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'white',
        }}>{initials}</div>
        {expanded && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, color: 'white', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.display_name || user?.user_id}
            </p>
            <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: rc.bg, color: rc.color, fontWeight: 600 }}>
              {rc.label}
            </span>
          </div>
        )}
        {expanded && (
          <button onClick={onLogout} title="Salir" style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#6B7280', padding: 4,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2H2v10h3M9 4l3 3-3 3M12 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </aside>
  )
}

function GridIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/><rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity=".5"/><rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity=".5"/><rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" opacity=".25"/></svg> }
function ChatIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H6l-3 2V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg> }
function ShieldIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l5 2v4c0 3-2.5 5-5 6C5.5 13 3 11 3 8V4l5-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg> }
function SparkIcon() { return <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.5 4.5H14l-3.75 2.75 1.5 4.5L8 11 4.25 13.75l1.5-4.5L2 6.5h4.5z" fill="white"/></svg> }