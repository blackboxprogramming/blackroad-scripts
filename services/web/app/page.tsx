'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('demo_user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  const handleSignIn = () => {
    const demoUser = { email: 'demo@blackroad.io', name: 'Demo User' }
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
    setUser(demoUser)
  }

  const handleSignOut = () => {
    localStorage.removeItem('demo_user')
    setUser(null)
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(244, 143, 177, 0.3) 0%, transparent 50%)' }} />
      
      <div style={{ maxWidth: '1200px', width: '100%', padding: '3rem', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: '4.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center', fontWeight: 900, letterSpacing: '-0.02em' }}>BlackRoad OS</h1>
        
        <p style={{ fontSize: '1.5rem', textAlign: 'center', color: '#667eea', marginBottom: '2rem', fontWeight: 600 }}>Operator-controlled • Local-first • Sovereign</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {!user ? (
            <>
              <button onClick={handleSignIn} style={{ padding: '1rem 2.5rem', fontSize: '1.125rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)', transform: 'translateY(0)', transition: 'all 0.3s' }}>Sign In</button>
              <button onClick={handleSignIn} style={{ padding: '1rem 2.5rem', fontSize: '1.125rem', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, boxShadow: '0 4px 15px rgba(240, 147, 251, 0.4)' }}>Get Started</button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 2rem', background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', borderRadius: '12px', boxShadow: '0 4px 15px rgba(168, 237, 234, 0.3)' }}>
              <span style={{ color: '#4a148c', fontWeight: 700 }}>👋 Welcome, {user.name}!</span>
              <button onClick={handleSignOut} style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>Sign Out</button>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '16px', color: 'white', boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>Operator-Controlled</h3>
            <p style={{ opacity: 0.95, lineHeight: '1.6', fontSize: '1.05rem' }}>Full control over your infrastructure. No black boxes, no vendor lock-in.</p>
          </div>
          <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderRadius: '16px', color: 'white', boxShadow: '0 8px 25px rgba(240, 147, 251, 0.3)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>Local-First</h3>
            <p style={{ opacity: 0.95, lineHeight: '1.6', fontSize: '1.05rem' }}>Your data stays on your hardware. Privacy and security by design.</p>
          </div>
          <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', borderRadius: '16px', color: 'white', boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>Sovereign</h3>
            <p style={{ opacity: 0.95, lineHeight: '1.6', fontSize: '1.05rem' }}>Own your stack. Build and deploy on your terms, your way.</p>
          </div>
        </div>

        <div style={{ marginBottom: '3rem', padding: '3rem', background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderRadius: '20px', boxShadow: '0 8px 25px rgba(252, 182, 159, 0.3)' }}>
          <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900 }}>Simple Pricing</h2>
          <p style={{ fontSize: '1.25rem', textAlign: 'center', color: '#8b4513', marginBottom: '3rem', fontWeight: 600 }}>Get started with BlackRoad OS Professional</p>
          <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2.5rem', background: 'white', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.15)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>Professional</h3>
            <div style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>$97<span style={{ fontSize: '1.5rem', color: '#999' }}>/mo</span></div>
            <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.05rem' }}>Full access to BlackRoad OS infrastructure</p>
            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              <li style={{ padding: '0.75rem 0', color: '#333', fontSize: '1.05rem', fontWeight: 600 }}>✓ Unlimited deployments</li>
              <li style={{ padding: '0.75rem 0', color: '#333', fontSize: '1.05rem', fontWeight: 600 }}>✓ 24/7 infrastructure access</li>
              <li style={{ padding: '0.75rem 0', color: '#333', fontSize: '1.05rem', fontWeight: 600 }}>✓ Priority support</li>
              <li style={{ padding: '0.75rem 0', color: '#333', fontSize: '1.05rem', fontWeight: 600 }}>✓ Advanced monitoring</li>
            </ul>
            <Link href={user ? '/checkout' : '#'} onClick={(e) => !user && e.preventDefault()}>
              <button disabled={!user} style={{ width: '100%', padding: '1.25rem 2rem', fontSize: '1.25rem', background: user ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#ccc', color: 'white', border: 'none', borderRadius: '12px', cursor: user ? 'pointer' : 'not-allowed', fontWeight: 800, boxShadow: user ? '0 6px 20px rgba(102, 126, 234, 0.4)' : 'none' }}>
                {user ? 'Subscribe Now 🚀' : 'Sign In to Subscribe'}
              </button>
            </Link>
          </div>
        </div>

        <div style={{ marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', borderRadius: '16px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#4a148c', fontWeight: 800 }}>Stay Updated</h2>
          <p style={{ color: '#6a1b9a', marginBottom: '1.5rem', fontSize: '1.05rem' }}>Get the latest updates and insights delivered to your inbox</p>
          <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '500px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="your@email.com"
              id="newsletter-email"
              style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '2px solid #667eea', fontSize: '1rem' }}
            />
            <button
              onClick={() => {
                const input = document.getElementById('newsletter-email') as HTMLInputElement
                if (input.value) {
                  fetch('/api/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: input.value })
                  }).then(() => {
                    alert('✅ Subscribed successfully!')
                    input.value = ''
                  })
                }
              }}
              style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}
            >
              Subscribe
            </button>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/dashboard" style={{ display: 'inline-block', padding: '1rem 2rem', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)' }}>
            📊 View System Dashboard
          </Link>
        </div>

        <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '2px solid #eee', fontSize: '0.875rem', color: '#999', textAlign: 'center', fontWeight: 600 }}>
          BlackRoad Infrastructure · {new Date().getFullYear()}
        </footer>
      </div>
    </main>
  )
}
