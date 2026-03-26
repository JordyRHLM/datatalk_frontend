import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import FileSelector from './FileSelector'

const SUGGESTIONS = {
  ventas: [
    '¿Cuáles son las 3 categorías con más ventas?',
    '¿Cómo evolucionaron las ventas mes a mes?',
    '¿Por qué cayeron las ventas de Lácteos?',
  ],
  logistica: [
    '¿Qué zona tiene más demoras?',
    '¿Cuántos pedidos hay por transportista?',
    'Compará demoras entre zona Norte y el resto',
  ],
  rrhh: [
    '¿Cuál es el ausentismo promedio por área?',
    '¿Qué área tiene más ausencias?',
  ],
}

function getSuggestions(fileName) {
  if (!fileName) return []
  const f = fileName.toLowerCase()
  if (f.includes('logistica')) return SUGGESTIONS.logistica
  if (f.includes('rrhh')) return SUGGESTIONS.rrhh
  return SUGGESTIONS.ventas
}

export default function ChatPanel({ messages, loading, onQuestion, onApprove, onUpload, onSelectFile, availableFiles, fileName }) {
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const hasFile = !!fileName

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const submit = () => {
    const q = input.trim()
    if (!q || loading || !hasFile) return
    onQuestion(q)
    setInput('')
  }

  const suggestions = getSuggestions(fileName)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileSelector files={availableFiles} onSelect={onSelectFile} onUpload={onUpload} current={fileName} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.length === 0 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, paddingTop: 20 }}>
            {!hasFile ? (
              <p style={{ color: 'var(--text-tertiary)', fontSize: 13, textAlign: 'center' }}>Seleccioná o subí un archivo para comenzar</p>
            ) : (
              <>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Sugerencias para <strong>{fileName}</strong>:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
                  {suggestions.map((s, i) => (
                    <button key={i} onClick={() => onQuestion(s)} style={{
                      textAlign: 'left', padding: '9px 14px', background: 'var(--surface)',
                      border: '1px solid var(--border)', borderRadius: 10, cursor: 'pointer',
                      fontSize: 13, color: 'var(--text-secondary)', transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--indigo)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                    >{s}</button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} onApprove={onApprove} loading={loading} />
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 5, padding: '4px 0' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 7, height: 7, borderRadius: '50%', background: 'var(--indigo)',
                animation: `bounce 1s ease-in-out ${i * 0.18}s infinite`,
              }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ borderTop: '1px solid var(--border)', padding: '10px 12px', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
            placeholder={hasFile ? 'Preguntá sobre tus datos…' : 'Seleccioná un archivo primero'}
            disabled={!hasFile || loading} rows={1}
            style={{
              flex: 1, padding: '9px 12px', border: '1px solid var(--border)', borderRadius: 10,
              fontFamily: 'inherit', fontSize: 13, resize: 'none', outline: 'none',
              background: 'var(--surface)', color: 'var(--text-primary)', lineHeight: 1.5,
            }}
            onFocus={e => e.target.style.borderColor = 'var(--indigo)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <button onClick={submit} disabled={!hasFile || loading || !input.trim()} style={{
            width: 36, height: 36, background: 'var(--indigo)', border: 'none', borderRadius: 9,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: (!hasFile || !input.trim()) ? 0.35 : 1, transition: 'opacity 0.15s', flexShrink: 0,
          }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 7.5h11M9 3l5 4.5L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
    </div>
  )
}