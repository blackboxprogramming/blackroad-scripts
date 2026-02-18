'use client'

import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="br-gradient-full" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: '3rem', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
        <h1 className="br-gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 900 }}>Welcome to BlackRoad OS!</h1>
        <p className="br-text-muted" style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.6', fontWeight: 600 }}>
          Your subscription is now active. You have full access to the BlackRoad OS Professional platform.
        </p>
        <div className="br-gradient-br" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
          <p className="br-text-orange" style={{ marginBottom: '0.5rem', fontWeight: 700 }}>Next billing date</p>
          <p className="br-text-purple" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link href="/">
          <button className="br-gradient-br" style={{ padding: '1.25rem 2.5rem', fontSize: '1.25rem', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 800, boxShadow: '0 6px 20px rgba(255, 0, 102, 0.35)' }}>
            Go to Dashboard 🚀
          </button>
        </Link>
      </div>
    </main>
  )
}
