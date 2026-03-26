import { useState } from 'react'
import { MOCK_USERS } from '../../lib/auth'

export default function LoginScreen({ onLogin, error, loading }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => onLogin(email, password)

  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--cloud)',
    }}>
      <div style={{ width: 380 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 52, height: 52, background: 'var(--indigo)', borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l2.5 7H22l-6 4.5 2.5 7L12 17l-6.5 4.5 2.5-7L2 10h7.5z" fill="white"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>DataTalk</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Agente analítico con lenguaje natural</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, padding: 28,
        }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</p>
          <input value={email} onChange={e => setEmail(e.target.value)}
            placeholder="usuario@datatalk.com" type="email"
            style={{
              width: '100%', padding: '9px 12px', border: '1px solid var(--border)',
              borderRadius: 8, fontSize: 14, marginBottom: 14, outline: 'none',
              fontFamily: 'inherit', background: 'var(--surface)', color: 'var(--text-primary)',
            }} />

          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contraseña</p>
          <input value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="••••••••" type="password"
            style={{
              width: '100%', padding: '9px 12px', border: '1px solid var(--border)',
              borderRadius: 8, fontSize: 14, marginBottom: 20, outline: 'none',
              fontFamily: 'inherit', background: 'var(--surface)', color: 'var(--text-primary)',
            }} />

          {error && (
            <div style={{
              background: 'var(--coral-bg)', color: 'var(--coral-text)',
              border: '1px solid #FECACA', borderRadius: 8, padding: '8px 12px',
              fontSize: 13, marginBottom: 16,
            }}>{error}</div>
          )}

          <button onClick={submit} disabled={loading || !email || !password} style={{
            width: '100%', padding: '10px', background: 'var(--indigo)', color: 'white',
            border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500,
            cursor: 'pointer', opacity: loading ? 0.7 : 1,
          }}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </div>

        {/* Demo users */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 10 }}>Usuarios de demo · contraseña: demo1234</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {MOCK_USERS.map(u => (
              <button key={u.email} onClick={() => { setEmail(u.email); setPassword(u.password) }} style={{
                padding: '7px 10px', background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 8, cursor: 'pointer', textAlign: 'left',
              }}>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-primary)' }}>{u.name}</p>
                <p style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{u.role}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}