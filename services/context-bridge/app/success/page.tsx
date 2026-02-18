'use client'

import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: '3rem', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900 }}>Welcome to BlackRoad OS!</h1>
        <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem', lineHeight: '1.6', fontWeight: 600 }}>
          Your subscription is now active. You have full access to the BlackRoad OS Professional platform.
        </p>
        <div style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
          <p style={{ color: '#8b4513', marginBottom: '0.5rem', fontWeight: 700 }}>Next billing date</p>
          <p style={{ fontSize: '1.5rem', color: '#4a148c', fontWeight: 800 }}>
            {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link href="/">
          <button style={{ padding: '1.25rem 2.5rem', fontSize: '1.25rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 800, boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)' }}>
            Go to Dashboard 🚀
          </button>
        </Link>
      </div>
    </main>
  )
}
