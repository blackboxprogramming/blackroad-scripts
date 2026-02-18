'use client'

import { useState } from 'react'
import { Sparkles, Wand2, Rocket, CheckCircle } from 'lucide-react'

interface ProjectStage {
  name: string
  status: 'pending' | 'in_progress' | 'complete'
  description: string
}

export default function CreatorPortal() {
  const [dream, setDream] = useState('')
  const [generating, setGenerating] = useState(false)
  const [stages, setStages] = useState<ProjectStage[]>([])

  const generateProject = async () => {
    if (!dream.trim()) return

    setGenerating(true)
    setStages([
      { name: 'Understanding Requirements', status: 'in_progress', description: 'Analyzing your vision...' },
      { name: 'Designing Architecture', status: 'pending', description: 'Creating system design' },
      { name: 'Generating Code', status: 'pending', description: 'Writing components' },
      { name: 'Adding Tests', status: 'pending', description: 'Creating test suites' },
      { name: 'Setting Up Deploy', status: 'pending', description: 'Configuring deployment' },
    ])

    // Simulate progress
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStages(prev => prev.map((stage, idx) => {
        if (idx === i) return { ...stage, status: 'complete' }
        if (idx === i + 1) return { ...stage, status: 'in_progress' }
        return stage
      }))
    }

    setGenerating(false)
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
      }}>
        <h2 style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '8px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          <Sparkles size={24} />
          Creator Portal
        </h2>
        <p style={{ fontSize: '14px', color: '#888' }}>
          Dream it. We'll build it. In minutes.
        </p>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {/* Dream Input */}
        <div style={{
          padding: '24px',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          marginBottom: '24px',
        }}>
          <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>
            What do you want to build?
          </h3>
          <textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="E.g., A social media app for pet owners with image upload, comments, and a feed algorithm..."
            disabled={generating}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '16px',
              backgroundColor: '#0a0a0a',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#e0e0e0',
              fontSize: '14px',
              resize: 'vertical',
              outline: 'none',
            }}
          />
          <button
            onClick={generateProject}
            disabled={generating || !dream.trim()}
            style={{
              marginTop: '16px',
              padding: '12px 24px',
              background: generating
                ? '#444'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: generating ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Wand2 size={20} />
            {generating ? 'Generating...' : 'Generate Project'}
          </button>
        </div>

        {/* Generation Progress */}
        {stages.length > 0 && (
          <div style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '12px',
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>
              Building Your Project
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {stages.map((stage, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: stage.status !== 'pending' ? '#0f0f0f' : 'transparent',
                    borderLeft: `4px solid ${
                      stage.status === 'complete'
                        ? '#4ade80'
                        : stage.status === 'in_progress'
                        ? '#667eea'
                        : '#333'
                    }`,
                    borderRadius: '4px',
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: stage.status === 'complete'
                      ? '#1a472a'
                      : stage.status === 'in_progress'
                      ? 'rgba(102, 126, 234, 0.2)'
                      : '#2a2a2a',
                    border: `2px solid ${
                      stage.status === 'complete'
                        ? '#4ade80'
                        : stage.status === 'in_progress'
                        ? '#667eea'
                        : '#444'
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {stage.status === 'complete' && <CheckCircle size={18} color="#4ade80" />}
                    {stage.status === 'in_progress' && (
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: '2px solid #667eea',
                        borderTopColor: 'transparent',
                        animation: 'spin 1s linear infinite',
                      }} />
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      marginBottom: '4px',
                      color: stage.status !== 'pending' ? '#e0e0e0' : '#666',
                    }}>
                      {stage.name}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: stage.status !== 'pending' ? '#888' : '#555',
                    }}>
                      {stage.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {stages.every(s => s.status === 'complete') && (
              <button
                style={{
                  marginTop: '24px',
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #4ade80 0%, #2d5f3d 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <Rocket size={20} />
                Deploy to Production
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
