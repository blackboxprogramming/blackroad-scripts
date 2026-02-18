'use client'

import { useState, useRef } from 'react'
import { Save, Download, FileText, Sparkles } from 'lucide-react'

export default function DocumentEditor() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('Untitled Document')
  const [isAIAssisting, setIsAIAssisting] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  const handleAIAssist = async () => {
    setIsAIAssisting(true)
    // AI autocomplete would call LLM API here
    setTimeout(() => {
      setIsAIAssisting(false)
    }, 1000)
  }

  const exportAsMarkdown = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.md`
    a.click()
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#0a0a0a',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '12px',
        backgroundColor: '#1a1a1a',
        borderBottom: '1px solid #333',
        alignItems: 'center',
      }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#e0e0e0',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          onClick={handleAIAssist}
          style={{
            padding: '6px 12px',
            background: isAIAssisting
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : '#2a2a2a',
            border: '1px solid #444',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
          }}
        >
          <Sparkles size={14} />
          AI Assist
        </button>
        <button
          onClick={exportAsMarkdown}
          style={{
            padding: '6px 12px',
            background: '#2a2a2a',
            border: '1px solid #444',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
          }}
        >
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={(e) => setContent(e.currentTarget.textContent || '')}
        style={{
          flex: 1,
          padding: '40px',
          outline: 'none',
          overflow: 'auto',
          lineHeight: '1.6',
          fontSize: '14px',
          color: '#e0e0e0',
        }}
      >
        Start writing...
      </div>

      {/* Status Bar */}
      <div style={{
        padding: '8px 12px',
        backgroundColor: '#1a1a1a',
        borderTop: '1px solid #333',
        fontSize: '12px',
        color: '#888',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>{content.length} characters</span>
        <span>{content.split(/\s+/).filter(w => w).length} words</span>
      </div>
    </div>
  )
}
