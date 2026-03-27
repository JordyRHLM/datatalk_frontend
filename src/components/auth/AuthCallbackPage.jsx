/**
 * AuthCallbackPage
 * Ruta: /auth/callback
 * 
 * Microsoft redirige aquí después del login con Entra ID.
 * Lee el token de los query params, lo guarda en localStorage
 * y redirige al dashboard.
 */
import { useEffect, useState } from 'react'
import { saveSession } from '../../lib/auth'

export default function AuthCallbackPage() {
  const [status, setStatus] = useState('loading')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const error  = params.get('error')

    if (error) {
      setErrorMsg(decodeURIComponent(error))
      setStatus('error')    
      return
    }

    const token        = params.get('token')
    const user_id      = params.get('user_id')
    const role         = params.get('role')
    const display_name = params.get('display_name')
    const mode         = params.get('mode') || 'entra_id'

    if (!token || !user_id) {
      setErrorMsg('No se recibió token del servidor. Intentá de nuevo.')
      setStatus('error')
      return
    }

    // Guardar sesión en el mismo formato que el mock
    saveSession({
      access_token:  token,
      user_id,
      role,
      display_name:  display_name || user_id,
      mode,
    })

    setStatus('success')

    // Redirigir al dashboard
    setTimeout(() => {
      window.location.href = '/'
    }, 800)
  }, [])

  const styles = {
    page: {
      height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--ink)', gap: 16,
    },
    spinner: {
      width: 40, height: 40,
      border: '3px solid rgba(99,102,241,0.3)',
      borderTop: '3px solid #6366F1',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    },
    text: { color: '#94A3B8', fontSize: 14 },
    title: { color: 'white', fontSize: 18, fontWeight: 600 },
    btn: {
      padding: '10px 24px', background: '#6366F1', color: 'white',
      border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14,
      marginTop: 8,
    },
  }

  if (status === 'loading') return (
    <div style={styles.page}>
      <div style={styles.spinner} />
      <p style={styles.text}>Completando inicio de sesión con Microsoft...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (status === 'error') return (
    <div style={styles.page}>
      <span style={{ fontSize: 48 }}>❌</span>
      <p style={styles.title}>Error al iniciar sesión</p>
      <p style={{ ...styles.text, maxWidth: 400, textAlign: 'center' }}>{errorMsg}</p>
      <button style={styles.btn} onClick={() => window.location.href = '/'}>
        Volver al inicio
      </button>
    </div>
  )

  return (
    <div style={styles.page}>
      <span style={{ fontSize: 48 }}>✅</span>
      <p style={styles.title}>¡Sesión iniciada!</p>
      <p style={styles.text}>Redirigiendo al dashboard...</p>
    </div>
  )
}