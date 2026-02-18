'use client'

import { useState } from 'react'
import Window from './components/Window'
import {
  Terminal,
  FolderOpen,
  Database,
  Cloud,
  Activity,
  Key,
  Network,
  Server
} from 'lucide-react'

interface AppWindow {
  id: string
  title: string
  content: string
  icon: React.ReactNode
}

export default function DesktopOS() {
  const [windows, setWindows] = useState<AppWindow[]>([])
  const [apiKey, setApiKey] = useState<string | null>(null)

  const apps = [
    { id: 'api-keys', title: 'API Keys', icon: <Key size={20} />, content: 'api-keys' },
    { id: 'file-explorer', title: 'File Explorer', icon: <FolderOpen size={20} />, content: 'file-explorer' },
    { id: 'terminal', title: 'Terminal', icon: <Terminal size={20} />, content: 'terminal' },
    { id: 'services', title: 'Services', icon: <Server size={20} />, content: 'services' },
    { id: 'agents', title: 'Agent Network', icon: <Network size={20} />, content: 'agents' },
    { id: 'railway', title: 'Railway', icon: <Cloud size={20} />, content: 'railway' },
    { id: 'cloudflare', title: 'Cloudflare', icon: <Cloud size={20} />, content: 'cloudflare' },
    { id: 'monitoring', title: 'Monitoring', icon: <Activity size={20} />, content: 'monitoring' },
  ]

  const openWindow = (app: typeof apps[0]) => {
    if (!windows.find(w => w.id === app.id)) {
      setWindows([...windows, { ...app }])
    }
  }

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id))
  }

  const generateAPIKey = async () => {
    try {
      const response = await fetch('/api/auth/generate', {
        method: 'POST',
      })
      const data = await response.json()
      if (data.success) {
        setApiKey(data.data.key)
      }
    } catch (error) {
      console.error('Failed to generate API key:', error)
    }
  }

  const renderWindowContent = (content: string) => {
    switch (content) {
      case 'api-keys':
        return (
          <div style={{ padding: '20px' }}>
            <h2>Unified API Authentication</h2>
            <p>Generate a unified API key that grants access to ALL BlackRoad services.</p>

            <button
              onClick={generateAPIKey}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '20px',
              }}
            >
              Generate Unified API Key
            </button>

            {apiKey && (
              <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '6px',
              }}>
                <h3>Your Unified API Key:</h3>
                <code style={{
                  display: 'block',
                  padding: '10px',
                  backgroundColor: '#0a0a0a',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  wordBreak: 'break-all',
                  fontSize: '12px',
                  color: '#4ade80',
                }}>
                  {apiKey}
                </code>
                <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
                  ⚠️ Store this key securely. It grants access to all services.
                </p>

                <div style={{ marginTop: '20px' }}>
                  <h4>Services Accessible:</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px' }}>
                    {['web', 'api', 'prism', 'operator', 'docs', 'brand', 'core', 'demo', 'ideas', 'infra', 'research', 'desktop'].map(service => (
                      <div key={service} style={{
                        padding: '8px',
                        backgroundColor: '#1a472a',
                        border: '1px solid #2d5f3d',
                        borderRadius: '4px',
                        fontSize: '12px',
                        textAlign: 'center',
                      }}>
                        ✓ {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 'services':
        return (
          <div style={{ padding: '20px' }}>
            <h2>BlackRoad Services</h2>
            <p>All 11 services in the BlackRoad ecosystem:</p>
            <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
              {[
                { name: 'web', port: 3000, status: 'running' },
                { name: 'prism', port: 3001, status: 'running' },
                { name: 'operator', port: 3002, status: 'running' },
                { name: 'api', port: 3003, status: 'running' },
                { name: 'docs', port: 3004, status: 'running' },
                { name: 'brand', port: 3005, status: 'running' },
                { name: 'core', port: 3006, status: 'ready' },
                { name: 'demo', port: 3007, status: 'ready' },
                { name: 'ideas', port: 3008, status: 'ready' },
                { name: 'infra', port: 3009, status: 'ready' },
                { name: 'research', port: 3010, status: 'ready' },
              ].map(service => (
                <div key={service.name} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '6px',
                }}>
                  <span>{service.name}</span>
                  <span style={{ fontSize: '12px', color: '#888' }}>Port {service.port}</span>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: service.status === 'running' ? '#1a472a' : '#2a2a2a',
                    border: `1px solid ${service.status === 'running' ? '#2d5f3d' : '#444'}`,
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}>
                    {service.status === 'running' ? '✓ Running' : '○ Ready'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )

      case 'agents':
        return (
          <div style={{ padding: '20px' }}>
            <h2>Distributed Agent Network</h2>
            <p>IP-aware intelligent agents with distributed memory and computing.</p>
            <div style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '6px',
            }}>
              <h3>Active Nodes: 0</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>
                No agents currently registered. Deploy nodes to join the network.
              </p>
            </div>
          </div>
        )

      default:
        return (
          <div style={{ padding: '20px' }}>
            <h2>{content}</h2>
            <p>This feature is under development.</p>
          </div>
        )
    }
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      overflow: 'hidden',
    }}>
      {/* Desktop Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 60,
        padding: '20px',
      }}>
        {/* Desktop Icons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 100px)',
          gap: '20px',
        }}>
          {apps.map(app => (
            <div
              key={app.id}
              onClick={() => openWindow(app)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '8px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                color: '#fff',
              }}>
                {app.icon}
              </div>
              <span style={{ fontSize: '12px', textAlign: 'center', color: '#fff' }}>
                {app.title}
              </span>
            </div>
          ))}
        </div>

        {/* Windows */}
        {windows.map((window, index) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            icon={window.icon}
            initialPosition={{ x: 100 + index * 30, y: 100 + index * 30 }}
            onClose={() => closeWindow(window.id)}
          >
            {renderWindowContent(window.content)}
          </Window>
        ))}
      </div>

      {/* Taskbar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
        borderTop: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: '10px',
      }}>
        <div style={{
          padding: '8px 16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '6px',
          fontWeight: 'bold',
          fontSize: '14px',
        }}>
          BlackRoad OS
        </div>

        {windows.map(window => (
          <div
            key={window.id}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {window.icon}
            {window.title}
          </div>
        ))}

        <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#888' }}>
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
