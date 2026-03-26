import { useState, useCallback } from 'react'
import { uploadFile, sendQuery, approveQuery } from '../lib/api'

export function useDataTalk() {
  const [userId] = useState('demo@empresa.com')
  const [filePath, setFilePath] = useState(null)
  const [schema, setSchema] = useState(null)
  const [messages, setMessages] = useState([])
  const [pending, setPending] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const addMsg = (msg) => setMessages(prev => [...prev, { id: Date.now(), ...msg }])

  const handleUpload = useCallback(async (file) => {
    setLoading(true)
    try {
      const { data } = await uploadFile(file, userId)
      setFilePath(data.file_path)
      setSchema(data)
      addMsg({ type: 'system', text: `Archivo cargado: ${file.name} · ${data.row_count} filas · ${data.columns.length} columnas` })
      if (data.sensitive) addMsg({ type: 'warning', text: 'Este archivo contiene datos sensibles. Las consultas quedarán registradas.' })
    } catch (e) {
      addMsg({ type: 'error', text: 'Error al cargar el archivo. Verificá el formato.' })
    } finally {
      setLoading(false)
    }
  }, [userId])

  const handleQuestion = useCallback(async (question) => {
    if (!filePath) return
    addMsg({ type: 'user', text: question })
    setLoading(true)
    try {
      const { data } = await sendQuery(question, filePath, userId)
      setPending(data)
      addMsg({ type: 'approval', queryId: data.query_id, intent: data.intent, sql: data.sql, sensitive: data.sensitive })
    } catch (e) {
      addMsg({ type: 'error', text: 'Error generando la consulta. Intentá reformular la pregunta.' })
    } finally {
      setLoading(false)
    }
  }, [filePath, userId])

  const handleApprove = useCallback(async (queryId, approved) => {
    setLoading(true)
    try {
      const { data } = await approveQuery(queryId, userId, approved)
      setPending(null)
      if (!approved) {
        addMsg({ type: 'system', text: 'Consulta rechazada.' })
        return
      }
      if (!data.success) {
        addMsg({ type: 'error', text: data.message })
        return
      }
      setResult(data)
      addMsg({ type: 'result', text: data.explanation, chart: data.chart, rowCount: data.data?.length })
    } catch (e) {
      addMsg({ type: 'error', text: 'Error ejecutando la consulta.' })
    } finally {
      setLoading(false)
    }
  }, [userId])

  return { schema, messages, loading, result, filePath, handleUpload, handleQuestion, handleApprove }
}