import { useState, useCallback } from 'react'
import { uploadFile, sendQuery, approveQuery, listFiles } from '../lib/api'

export function useDataTalk(user) {
  const [filePath, setFilePath] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [schema, setSchema] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [availableFiles, setAvailableFiles] = useState([])

  const userId = user?.user_id || user?.email || 'demo_user'

  const addMsg = (msg) => setMessages(prev => [...prev, { id: Date.now() + Math.random(), ...msg }])

  const loadAvailableFiles = useCallback(async () => {
    try {
      const { data } = await listFiles()
      setAvailableFiles(data.files || [])
    } catch {
      // fallback silencioso
      setAvailableFiles([])
    }
  }, [])

  const handleSelectFile = useCallback(async (fp, fn) => {
    setFilePath(fp)
    setFileName(fn)
    setMessages([])
    setResult(null)
    addMsg({ type: 'system', text: `Archivo seleccionado: ${fn}` })
  }, [])

  const handleUpload = useCallback(async (file) => {
    setLoading(true)
    try {
      const { data } = await uploadFile(file, userId)
      setFilePath(data.file_path)
      setFileName(file.name)
      setSchema(data)
      setMessages([])
      setResult(null)
      addMsg({ type: 'system', text: `✓ ${file.name} · ${data.row_count.toLocaleString()} filas · ${data.columns.length} columnas` })
      if (data.sensitive) addMsg({ type: 'warning', text: 'Archivo con datos sensibles — acceso auditado' })
      await loadAvailableFiles()
    } catch {
      addMsg({ type: 'error', text: 'Error al cargar el archivo. Verificá el formato.' })
    } finally {
      setLoading(false)
    }
  }, [userId, loadAvailableFiles])

  const handleQuestion = useCallback(async (question) => {
    if (!filePath) return
    addMsg({ type: 'user', text: question })
    setLoading(true)
    try {
      const { data } = await sendQuery(question, filePath, userId)
      addMsg({ type: 'approval', queryId: data.query_id, intent: data.intent, sql: data.sql, sensitive: data.sensitive })
    } catch {
      addMsg({ type: 'error', text: 'Error generando la consulta. Intentá reformular.' })
    } finally {
      setLoading(false)
    }
  }, [filePath, userId])

  const handleApprove = useCallback(async (queryId, approved) => {
    setLoading(true)
    try {
      const { data } = await approveQuery(queryId, userId, approved)
      if (!approved) { addMsg({ type: 'system', text: 'Consulta rechazada.' }); return }
      if (!data.success) { addMsg({ type: 'error', text: data.message }); return }
      setResult(data)
      addMsg({ type: 'result', text: data.explanation, chart: data.chart, rowCount: data.data?.length })
    } catch {
      addMsg({ type: 'error', text: 'Error ejecutando la consulta.' })
    } finally {
      setLoading(false)
    }
  }, [userId])

  return {
    schema, messages, loading, result, filePath, fileName,
    availableFiles, loadAvailableFiles,
    handleUpload, handleSelectFile, handleQuestion, handleApprove,
  }
}