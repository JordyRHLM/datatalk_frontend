export const MOCK_USERS = [
  { email: 'admin@datatalk.com',    password: 'demo1234', role: 'admin',   name: 'Admin Demo',      branch: null },
  { email: 'norte@datatalk.com',    password: 'demo1234', role: 'manager', name: 'Manager Norte',   branch: 'norte' },
  { email: 'analista@datatalk.com', password: 'demo1234', role: 'analyst', name: 'Analista Demo',   branch: null },
  { email: 'viewer@datatalk.com',   password: 'demo1234', role: 'viewer',  name: 'Viewer Demo',     branch: null },
]

export const ROLE_CONFIG = {
  admin:   { label: 'Admin',    color: '#4F46E5', bg: '#EEF2FF', canQuery: true,  canSensitive: true  },
  manager: { label: 'Gerente',  color: '#059669', bg: '#D1FAE5', canQuery: true,  canSensitive: false },
  analyst: { label: 'Analista', color: '#0284C7', bg: '#E0F2FE', canQuery: true,  canSensitive: false },
  viewer:  { label: 'Viewer',   color: '#9CA3AF', bg: '#F3F4F6', canQuery: false, canSensitive: false },
}

export const saveSession = (data) => {
  localStorage.setItem('dt_token', data.access_token)
  localStorage.setItem('dt_user', JSON.stringify(data))
}

export const getSession = () => {
  const u = localStorage.getItem('dt_user')
  return u ? JSON.parse(u) : null
}

export const clearSession = () => {
  localStorage.removeItem('dt_token')
  localStorage.removeItem('dt_user')
}