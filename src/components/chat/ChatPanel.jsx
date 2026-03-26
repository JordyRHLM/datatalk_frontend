import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'

export default function ChatPanel({ messages, loading, onQuestion, onApprove, onUpload, hasFile }) {
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const fileRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const submit = () => {
    const q = input.trim()
    if (!q || loading || !hasFile) return
    onQuestion(q)
    setInput('')
  }

  const suggestions = [
    '¿Cuáles son las 3 categorías con más ventas?',
    '¿Qué productos tienen menos de 50 unidades?',
    '¿Hay anomalías en las ventas de este mes?',
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {messages.length === 0 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, paddingTop: 40 }}>
            <div style={{
              width: 52, height: 52, background: 'var(--indigo)', borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3l2.5 7H22l-6 4.5 2.5 7L12 17l-6.5 4.5 2.5-7L2 10h7.5z" fill="white"/></svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 500, fontSize: 16, marginBottom: 6 }}>DataTalk</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                {hasFile ? 'Hacé una pregunta sobre tus datos' : 'Primero cargá un archivo Excel o CSV'}
              </p>
            </div>
            {hasFile && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 380 }}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => { onQuestion(s) }} style={{
                    textAlign: 'left', padding: '10px 14px', background: 'var(--surface)',
                    border: '1px solid var(--border)', borderRadius: 10, cursor: 'pointer',
                    fontSize: 13, color: 'var(--text-secondary)', transition: 'border-color 0.15s, color 0.15s',
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = 'var(--indigo)'; e.target.style.color = 'var(--text-primary)' }}
                    onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-secondary)' }}
                  >{s}</button>
                ))}
              </div>
            )}
          </div>
        )}
        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} onApprove={onApprove} loading={loading} />
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 4, paddingLeft: 4 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 7, height: 7, borderRadius: '50%', background: 'var(--indigo)',
                animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
              }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px', background: 'var(--surface)' }}>
        {!hasFile && (
          <button onClick={() => fileRef.current?.click()} style={{
            width: '100%', padding: '10px', border: '2px dashed var(--border)', borderRadius: 10,
            background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)',
            fontSize: 13, marginBottom: 10, transition: 'border-color 0.15s',
          }}
            onMouseEnter={e => e.target.style.borderColor = 'var(--indigo)'}
            onMouseLeave={e => e.target.style.borderColor = 'var(--border)'}
          >
            + Cargar archivo Excel / CSV
          </button>
        )}
        <input type="file" ref={fileRef} accept=".xlsx,.xls,.csv" style={{ display: 'none' }}
          onChange={e => e.target.files[0] && onUpload(e.target.files[0])} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
            placeholder={hasFile ? 'Preguntá algo sobre tus datos…' : 'Cargá un archivo primero'}
            disabled={!hasFile || loading}
            rows={1}
            style={{
              flex: 1, padding: '9px 12px', border: '1px solid var(--border)', borderRadius: 10,
              fontFamily: 'inherit', fontSize: 14, resize: 'none', outline: 'none',
              background: hasFile ? 'var(--surface)' : 'var(--cloud)', color: 'var(--text-primary)',
              lineHeight: 1.5, transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--indigo)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <button onClick={submit} disabled={!hasFile || loading || !input.trim()} style={{
            width: 38, height: 38, background: 'var(--indigo)', border: 'none', borderRadius: 10,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: (!hasFile || !input.trim()) ? 0.4 : 1, transition: 'opacity 0.15s',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M9 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>
    </div>
  )
}