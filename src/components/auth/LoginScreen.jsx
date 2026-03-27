import { useState } from 'react'
import { MOCK_USERS } from '../../lib/auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const FLOATING_ICONS = [
  { icon: '💬', x: 8,  y: 12, size: 28, delay: 0,   dur: 7  },
  { icon: '📊', x: 88, y: 8,  size: 24, delay: 1.2, dur: 9  },
  { icon: '🧠', x: 15, y: 75, size: 32, delay: 0.5, dur: 8  },
  { icon: '📈', x: 80, y: 70, size: 26, delay: 2,   dur: 11 },
  { icon: '🔍', x: 50, y: 5,  size: 20, delay: 0.8, dur: 10 },
  { icon: '⚡', x: 92, y: 42, size: 22, delay: 1.5, dur: 7  },
  { icon: '📋', x: 3,  y: 45, size: 24, delay: 2.5, dur: 9  },
  { icon: '💡', x: 72, y: 20, size: 26, delay: 3,   dur: 10 },
]

export default function LoginScreen({ onLogin, error, loading }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showMock, setShowMock] = useState(false)
  const [msError, setMsError]   = useState('')

  const submit = () => onLogin(email, password)

  const loginWithMicrosoft = async () => {
    setMsError('')
    try {
      // Verificar si DEV_MODE=false antes de redirigir
      const res = await fetch(`${API_URL}/auth/verify`)
      const data = await res.json()
      if (data.dev_mode) {
        setMsError('El servidor tiene DEV_MODE=true. Cambiá a DEV_MODE=false en el .env y reiniciá.')
        return
      }
      // Redirigir al login de Microsoft
      window.location.href = `${API_URL}/auth/microsoft`
    } catch {
      setMsError('No se pudo conectar con el servidor. ¿Está corriendo en localhost:8000?')
    }
  }

  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--ink)',
      overflow: 'hidden', position: 'relative',
    }}>

      {/* Fondo animado */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        }} />
        {FLOATING_ICONS.map((f, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${f.x}%`, top: `${f.y}%`,
            fontSize: f.size, opacity: 0.18,
            animation: `floatIcon ${f.dur}s ease-in-out ${f.delay}s infinite alternate`,
          }}>{f.icon}</div>
        ))}
      </div>

      {/* Card */}
      <div style={{
        position: 'relative', width: 400,
        background: 'rgba(255,255,255,0.97)',
        borderRadius: 20, padding: '36px 32px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l2.5 7H22l-6 4.5 2.5 7L12 17l-6.5 4.5 2.5-7L2 10h7.5z" fill="white"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
            DataTalk
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Inteligencia sobre tus datos, en lenguaje natural
          </p>
        </div>

        {/* Botón Microsoft */}
        <button
          onClick={loginWithMicrosoft}
          style={{
            width: '100%', padding: '12px', marginBottom: 8,
            background: '#0078D4', color: 'white',
            border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 10,
            boxShadow: '0 4px 14px rgba(0,120,212,0.35)',
            transition: 'background 0.15s, transform 0.1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#106EBE'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#0078D4'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          {/* Logo Microsoft 2x2 */}
          <svg width="18" height="18" viewBox="0 0 21 21" fill="none">
            <rect x="1"  y="1"  width="9" height="9" fill="#F25022"/>
            <rect x="11" y="1"  width="9" height="9" fill="#7FBA00"/>
            <rect x="1"  y="11" width="9" height="9" fill="#00A4EF"/>
            <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
          </svg>
          Iniciar sesión con Microsoft
        </button>

        {/* Error Microsoft */}
        {msError && (
          <div style={{
            background: '#FEF3C7', color: '#92400e',
            border: '1px solid #FDE68A', borderRadius: 8,
            padding: '8px 12px', fontSize: 12, marginBottom: 8, lineHeight: 1.5,
          }}>
            ⚠️ {msError}
          </div>
        )}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>o acceso de demo</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Formulario mock colapsable */}
        {!showMock ? (
          <button
            onClick={() => setShowMock(true)}
            style={{
              width: '100%', padding: '10px',
              background: 'var(--cloud)', border: '1.5px solid var(--border)',
              borderRadius: 10, fontSize: 13, color: 'var(--text-secondary)',
              cursor: 'pointer', transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--indigo)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            Ingresar con usuario demo →
          </button>
        ) : (
          <div style={{ animation: 'fadeIn 0.2s ease' }}>
            {[
              { label: 'Email',      value: email,    set: setEmail,    type: 'email',    placeholder: 'usuario@datatalk.com' },
              { label: 'Contraseña', value: password, set: setPassword, type: 'password', placeholder: '••••••••' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {f.label}
                </p>
                <input
                  value={f.value} onChange={e => f.set(e.target.value)}
                  type={f.type} placeholder={f.placeholder}
                  onKeyDown={e => e.key === 'Enter' && submit()}
                  style={{
                    width: '100%', padding: '10px 13px',
                    border: '1.5px solid var(--border)', borderRadius: 10,
                    fontSize: 14, outline: 'none', fontFamily: 'inherit',
                    background: 'var(--cloud)', color: 'var(--text-primary)',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--indigo)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)' }}
                  onBlur={e =>  { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
            ))}

            {error && (
              <div style={{ background: 'var(--coral-bg)', color: 'var(--coral-text)', border: '1px solid #FECACA', borderRadius: 8, padding: '8px 12px', fontSize: 13, marginBottom: 12 }}>
                {error}
              </div>
            )}

            <button
              onClick={submit}
              disabled={loading || !email || !password}
              style={{
                width: '100%', padding: '11px', marginBottom: 14,
                background: loading ? '#A5B4FC' : 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                color: 'white', border: 'none', borderRadius: 10,
                fontSize: 14, fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
              }}
            >
              {loading ? 'Ingresando…' : 'Ingresar →'}
            </button>

            {/* Accesos rápidos */}
            <p style={{ fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 8 }}>
              Clic para autocompletar · contraseña: <code style={{ background: 'var(--border-soft)', padding: '1px 5px', borderRadius: 4 }}>demo1234</code>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {MOCK_USERS.map(u => (
                <button
                  key={u.email}
                  onClick={() => { setEmail(u.email); setPassword(u.password) }}
                  style={{
                    padding: '8px 10px', background: 'var(--surface-raised)',
                    border: '1px solid var(--border)', borderRadius: 8,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--indigo)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{u.role}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes floatIcon {
          0%   { transform: translateY(0px) rotate(-3deg); opacity: 0.15; }
          100% { transform: translateY(-18px) rotate(3deg); opacity: 0.25; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}