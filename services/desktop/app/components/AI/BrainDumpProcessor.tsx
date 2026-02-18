'use client'

import { useState } from 'react'
import { Brain, Zap, FileText, Folder } from 'lucide-react'

interface ProcessedIdea {
  id: string
  original: string
  structured: {
    title: string
    category: string
    actionItems: string[]
    relatedTopics: string[]
    priority: 'low' | 'medium' | 'high'
  }
  timestamp: string
}

export default function BrainDumpProcessor() {
  const [input, setInput] = useState('')
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState<ProcessedIdea[]>([])

  const processBrainDump = async () => {
    if (!input.trim()) return

    setProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      const idea: ProcessedIdea = {
        id: Date.now().toString(),
        original: input,
        structured: {
          title: extractTitle(input),
          category: categorize(input),
          actionItems: extractActionItems(input),
          relatedTopics: extractTopics(input),
          priority: determinePriority(input),
        },
        timestamp: new Date().toISOString(),
      }

      setProcessed([idea, ...processed])
      setInput('')
      setProcessing(false)
    }, 1500)
  }

  // Simple extraction functions (would use AI in production)
  const extractTitle = (text: string) => {
    const words = text.split(' ').slice(0, 5).join(' ')
    return words.length > 50 ? words.slice(0, 47) + '...' : words
  }

  const categorize = (text: string) => {
    const categories = ['development', 'design', 'business', 'research']
    return categories[Math.floor(Math.random() * categories.length)]
  }

  const extractActionItems = (text: string) => {
    const items = text.match(/(?:need to|should|must|will)\s+([^.!?]+)/gi) || []
    return items.slice(0, 3).map(item => item.trim())
  }

  const extractTopics = (text: string) => {
    const topics = ['AI', 'Frontend', 'Backend', 'Infrastructure', 'UX']
    return topics.slice(0, Math.floor(Math.random() * 3) + 1)
  }

  const determinePriority = (text: string) => {
    if (text.toLowerCase().includes('urgent') || text.toLowerCase().includes('asap')) {
      return 'high'
    }
    if (text.toLowerCase().includes('important')) {
      return 'medium'
    }
    return 'low'
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#0a0a0a',
    }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #333' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <Brain size={24} />
          Brain Dump Processor
        </h2>
        <p style={{ fontSize: '14px', color: '#888' }}>
          Dump your thoughts. AI will organize them into structured content.
        </p>
      </div>

      {/* Input Area */}
      <div style={{ padding: '20px', borderBottom: '1px solid #333' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Just start typing or speaking your ideas... AI will handle the rest!"
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '12px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '6px',
            color: '#e0e0e0',
            fontSize: '14px',
            resize: 'vertical',
            outline: 'none',
          }}
        />
        <button
          onClick={processBrainDump}
          disabled={processing || !input.trim()}
          style={{
            marginTop: '12px',
            padding: '10px 20px',
            background: processing
              ? '#444'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            cursor: processing ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Zap size={16} />
          {processing ? 'Processing...' : 'Process with AI'}
        </button>
      </div>

      {/* Processed Ideas */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Structured Output</h3>
        {processed.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#666',
            padding: '40px',
            fontSize: '14px',
          }}>
            No ideas processed yet. Start by dumping your thoughts above!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {processed.map((idea) => (
              <div
                key={idea.id}
                style={{
                  padding: '16px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '12px',
                }}>
                  <h4 style={{ fontSize: '16px', color: '#667eea' }}>
                    {idea.structured.title}
                  </h4>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: idea.structured.priority === 'high'
                      ? '#ff4444'
                      : idea.structured.priority === 'medium'
                      ? '#ff9900'
                      : '#4ade80',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                    {idea.structured.priority}
                  </span>
                </div>

                <div style={{
                  padding: '12px',
                  backgroundColor: '#0f0f0f',
                  borderRadius: '6px',
                  marginBottom: '12px',
                  fontSize: '13px',
                  color: '#aaa',
                }}>
                  {idea.original}
                </div>

                {idea.structured.actionItems.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>
                      Action Items:
                    </div>
                    {idea.structured.actionItems.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: '13px',
                          padding: '6px',
                          backgroundColor: '#0f0f0f',
                          borderLeft: '3px solid #667eea',
                          marginBottom: '4px',
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  fontSize: '12px',
                }}>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '4px',
                  }}>
                    <Folder size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {idea.structured.category}
                  </span>
                  {idea.structured.relatedTopics.map((topic, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#1a472a',
                        border: '1px solid #2d5f3d',
                        borderRadius: '4px',
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
