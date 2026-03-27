/**
 * AuthCallbackPage — VERSIÓN CORREGIDA
 * Ruta: /auth/callback
 *
 * CAMBIO PRINCIPAL: Lee el token desde el hash fragment (#token=...)
 * en vez de query params (?token=...) para evitar el error:
 * "A listener indicated an asynchronous response by returning true,
 *  but the message channel closed before a response was received"
 *
 * Esto también resuelve el warning de cookies SameSite=None sin Secure,
 * ya que el hash fragment nunca cruza dominios hacia el servidor.
 */
import { useEffect, useState } from 'react'
import { saveSession } from '../../lib/auth'

export default function AuthCallbackPage() {
  const [status, setStatus] = useState('loading')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    // ANTES usaba: new URLSearchParams(window.location.search)  → ?param=val
    // AHORA usa:   window.location.hash                         → #param=val
    // Esto evita que el browser bloquee los params cross-site

    const hash = window.location.hash.slice(1) // saca el '#' inicial
    const params = new URLSearchParams(hash)

    // Fallback: si el backend todavía usa query params, intentar también
    const searchParams = new URLSearchParams(window.location.search)

    // Helper que busca en hash primero, luego en search params
    const get = (key) => params.get(key) || searchParams.get(key)

    const error = get('error')

    if (error) {
      setErrorMsg(decodeURIComponent(error))
      setStatus('error')
      return
    }

    const token        = get('token')
    const user_id      = get('user_id')
    const role         = get('role')
    const display_name = get('display_name')
    const mode         = get('mode') || 'entra_id'

    if (!token || !user_id) {
      setErrorMsg(
        'No se recibió token del servidor. ' +
        'Verificá que AZURE_REDIRECT_URI en el .env apunta a http://localhost:8000/auth/callback'
      )
      setStatus('error')
      return
    }

    // Limpiar el hash de la URL por seguridad (no dejar el token visible)
    window.history.replaceState({}, document.title, window.location.pathname)

    saveSession({
      access_token:  token,
      user_id,
      role,
      display_name:  display_name || user_id,
      mode,
    })

    setStatus('success')

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
    text:  { color: '#94A3B8', fontSize: 14 },
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
      <p style={{ ...styles.text, maxWidth: 420, textAlign: 'center', lineHeight: 1.6 }}>
        {errorMsg}
      </p>
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