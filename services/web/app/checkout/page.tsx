'use client'

import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()

  const handleCheckout = () => {
    setTimeout(() => router.push('/success'), 1500)
  }

  return (
    <main className="br-gradient-full" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: '3rem', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}>
        <h1 className="br-gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 900 }}>Complete Your Purchase</h1>
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 600 }}>BlackRoad OS Professional - $97/month</p>
        
        <div className="br-gradient-br" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{ display: 'block', color: '#4a148c', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 700 }}>Card Number</label>
            <input type="text" placeholder="4242 4242 4242 4242" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'white', border: '2px solid var(--br-cyber-blue)', borderRadius: '8px', color: 'var(--br-charcoal)', fontSize: '1rem', fontWeight: 600 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', color: '#4a148c', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 700 }}>Expiry</label>
              <input type="text" placeholder="MM / YY" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'white', border: '2px solid var(--br-cyber-blue)', borderRadius: '8px', color: 'var(--br-charcoal)', fontSize: '1rem', fontWeight: 600 }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', color: '#4a148c', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 700 }}>CVC</label>
              <input type="text" placeholder="123" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'white', border: '2px solid var(--br-cyber-blue)', borderRadius: '8px', color: 'var(--br-charcoal)', fontSize: '1rem', fontWeight: 600 }} />
            </div>
          </div>
        </div>

        <button onClick={handleCheckout} className="br-gradient-br" style={{ width: '100%', padding: '1.25rem 2rem', fontSize: '1.25rem', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 800, marginBottom: '1rem', boxShadow: '0 6px 20px rgba(255, 157, 0, 0.4)' }}>
          Pay $97 💳
        </button>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>🔒 Secure payment powered by Stripe</p>
      </div>
    </main>
  )
}
