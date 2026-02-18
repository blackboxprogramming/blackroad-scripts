'use client'

import { useState } from 'react'
import { Users, Plus, Activity, Zap, Code, Pen, BarChart3, Palette } from 'lucide-react'

interface Agent {
  id: string
  name: string
  role: string
  icon: React.ReactNode
  status: 'active' | 'idle' | 'busy'
  tasks: number
  capabilities: string[]
}

export default function AgentPortal() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'CodeWizard',
      role: 'Developer',
      icon: <Code size={20} />,
      status: 'active',
      tasks: 3,
      capabilities: ['TypeScript', 'React', 'Node.js', 'Python'],
    },
    {
      id: '2',
      name: 'DocMaster',
      role: 'Writer',
      icon: <Pen size={20} />,
      status: 'idle',
      tasks: 0,
      capabilities: ['Technical Writing', 'Content', 'Documentation'],
    },
    {
      id: '3',
      name: 'DataNinja',
      role: 'Analyst',
      icon: <BarChart3 size={20} />,
      status: 'busy',
      tasks: 5,
      capabilities: ['SQL', 'Python', 'Data Viz', 'ML'],
    },
  ])

  const createAgent = () => {
    const roles = ['Developer', 'Designer', 'Writer', 'Analyst']
    const role = roles[Math.floor(Math.random() * roles.length)]
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: `Agent${agents.length + 1}`,
      role,
      icon: <Zap size={20} />,
      status: 'idle',
      tasks: 0,
      capabilities: ['General AI'],
    }
    setAgents([...agents, newAgent])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4ade80'
      case 'busy': return '#ff9900'
      default: return '#666'
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#0a0a0a',
    }}>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Users size={24} />
            Agent Portal
          </h2>
          <p style={{ fontSize: '14px', color: '#888' }}>
            Manage your AI agents and assign tasks
          </p>
        </div>
        <button
          onClick={createAgent}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Plus size={16} />
          Create Agent
        </button>
      </div>

      {/* Agent Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        padding: '20px',
        borderBottom: '1px solid #333',
      }}>
        <div style={{
          padding: '16px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          border: '1px solid #333',
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4ade80' }}>
            {agents.length}
          </div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            Total Agents
          </div>
        </div>
        <div style={{
          padding: '16px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          border: '1px solid #333',
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
            {agents.filter(a => a.status === 'active').length}
          </div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            Active Now
          </div>
        </div>
        <div style={{
          padding: '16px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          border: '1px solid #333',
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff9900' }}>
            {agents.reduce((sum, a) => sum + a.tasks, 0)}
          </div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            Active Tasks
          </div>
        </div>
      </div>

      {/* Agent List */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        <div style={{ display: 'grid', gap: '12px' }}>
          {agents.map((agent) => (
            <div
              key={agent.id}
              style={{
                padding: '16px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}>
                {agent.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px',
                }}>
                  <h3 style={{ fontSize: '16px', margin: 0 }}>{agent.name}</h3>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(agent.status),
                  }} />
                  <span style={{
                    fontSize: '12px',
                    color: '#888',
                    textTransform: 'capitalize',
                  }}>
                    {agent.status}
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
                  {agent.role} • {agent.tasks} active tasks
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {agent.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#2a2a2a',
                        borderRadius: '4px',
                        fontSize: '11px',
                      }}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Assign Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
