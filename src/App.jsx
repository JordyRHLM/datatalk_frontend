import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import { useDataTalk } from './hooks/useDataTalk'
import { useState } from 'react'
import LoginScreen from './components/auth/LoginScreen'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import ChatPanel from './components/chat/ChatPanel'
import DashboardPanel from './components/dashboard/DashboardPanel'
import AuditPanel from './components/history/AuditPanel'

export default function App() {
  const { user, loading: authLoading, error: authError, login, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const {
    schema, messages, loading, result, fileName,
    availableFiles, loadAvailableFiles,
    handleUpload, handleSelectFile, handleQuestion, handleApprove,
  } = useDataTalk(user)

  useEffect(() => {
    if (user) loadAvailableFiles()
  }, [user, loadAvailableFiles])

  if (authLoading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cloud)' }}>
      <div style={{ width: 32, height: 32, border: '2px solid var(--border)', borderTop: '2px solid var(--indigo)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!user) return <LoginScreen onLogin={login} error={authError} loading={authLoading} />

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar active={activeTab} onChange={setActiveTab} user={user} onLogout={logout} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header schema={schema} activeTab={activeTab} fileName={fileName} />

        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {activeTab === 'dashboard' && (
            <>
              <div style={{ width: 400, flexShrink: 0, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
                <ChatPanel
                  messages={messages} loading={loading}
                  onQuestion={handleQuestion} onApprove={handleApprove}
                  onUpload={handleUpload} onSelectFile={handleSelectFile}
                  availableFiles={availableFiles} fileName={fileName}
                />
              </div>
              <div style={{ flex: 1, background: 'var(--cloud)', overflow: 'hidden' }}>
                <DashboardPanel result={result} />
              </div>
            </>
          )}

          {activeTab === 'chat' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
              <ChatPanel
                messages={messages} loading={loading}
                onQuestion={handleQuestion} onApprove={handleApprove}
                onUpload={handleUpload} onSelectFile={handleSelectFile}
                availableFiles={availableFiles} fileName={fileName}
              />
            </div>
          )}

          {activeTab === 'history' && <AuditPanel />}
        </div>
      </div>
    </div>
  )
}