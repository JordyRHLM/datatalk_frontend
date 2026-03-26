import { useState, useEffect } from 'react'
import { login as apiLogin } from '../lib/api'
import { saveSession, getSession, clearSession } from '../lib/auth'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const session = getSession()
    if (session) setUser(session)
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setError(null)
    setLoading(true)
    try {
      const { data } = await apiLogin(email, password)
      saveSession(data)
      setUser(data)
      return true
    } catch {
      setError('Credenciales incorrectas')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    clearSession()
    setUser(null)
  }

  return { user, loading, error, login, logout }
}