'use client'

import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()

  const handleCheckout = () => {
    setTimeout(() => router.push('/success'), 1500)
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 100%)' }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: '3rem', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900 }}>Complete Your Purchase</h1>
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 600 }}>BlackRoad OS Professional - $97/month</p>
        
        <div style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{ display: 'block', color: '#4a148c', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 700 }}>Card Number</label>
            <input type="text" placeholder="4242 4242 4242 4242" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'white', border: '2px solid #667eea', borderRadius: '8px', color: '#333', fontSize: '1rem', fontWeight: 600 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', color: '#4a148c', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 700 }}>Expiry</label>
              <input type="text" placeholder="MM / YY" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'white', border: '2px solid #667eea', borderRadius: '8px', color: '#333', fontSize: '1rem', fontWeight: 600 }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', color: '#4a148c', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 700 }}>CVC</label>
              <input type="text" placeholder="123" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'white', border: '2px solid #667eea', borderRadius: '8px', color: '#333', fontSize: '1rem', fontWeight: 600 }} />
            </div>
          </div>
        </div>

        <button onClick={handleCheckout} style={{ width: '100%', padding: '1.25rem 2rem', fontSize: '1.25rem', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 800, marginBottom: '1rem', boxShadow: '0 6px 20px rgba(240, 147, 251, 0.4)' }}>
          Pay $97 💳
        </button>
        <p style={{ fontSize: '0.75rem', color: '#999', fontWeight: 600 }}>🔒 Secure payment powered by Stripe</p>
      </div>
    </main>
  )
}
