import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 30000,
})

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('dt_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export const login = (username, password) =>
  api.post('/auth/login', { username, password })

export const getMe = () => api.get('/auth/me')

export const listFiles = () => api.get('/files')

export const uploadFile = (file, userId) => {
  const form = new FormData()
  form.append('file', file)
  form.append('user_id', userId)
  return api.post('/upload', form)
}

export const sendQuery = (question, filePath, userId) =>
  api.post('/query', { question, file_path: filePath, user_id: userId, generate_chart: true })

export const approveQuery = (queryId, approvedBy, approved = true) =>
  api.post('/approve', { query_id: queryId, approved, approved_by: approvedBy })

export const getHistory = (limit = 50) =>
  api.get(`/history?limit=${limit}`)