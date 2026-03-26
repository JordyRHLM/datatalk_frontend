import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import ChatPanel from './components/chat/ChatPanel'
import DashboardPanel from './components/dashboard/DashboardPanel'
import { useDataTalk } from './hooks/useDataTalk'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { schema, messages, loading, result, filePath, handleUpload, handleQuestion, handleApprove } = useDataTalk()

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar active={activeTab} onChange={setActiveTab} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header schema={schema} activeTab={activeTab} />

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {activeTab === 'dashboard' && (
            <>
              {/* Chat — izquierda */}
              <div style={{ width: 420, flexShrink: 0, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
                <ChatPanel
                  messages={messages}
                  loading={loading}
                  onQuestion={handleQuestion}
                  onApprove={handleApprove}
                  onUpload={handleUpload}
                  hasFile={!!filePath}
                />
              </div>
              {/* Dashboard — derecha */}
              <div style={{ flex: 1, background: 'var(--cloud)', overflow: 'hidden' }}>
                <DashboardPanel result={result} />
              </div>
            </>
          )}

          {activeTab === 'chat' && (
            <div style={{ flex: 1, background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
              <ChatPanel
                messages={messages}
                loading={loading}
                onQuestion={handleQuestion}
                onApprove={handleApprove}
                onUpload={handleUpload}
                hasFile={!!filePath}
              />
            </div>
          )}

          {activeTab === 'history' && (
            <div style={{ flex: 1, padding: 24, color: 'var(--text-secondary)', fontSize: 13 }}>
              Historial de auditoría — próximamente
            </div>
          )}
        </div>
      </div>
    </div>
  )
}