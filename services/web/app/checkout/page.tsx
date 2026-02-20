'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FloatingShapes, GeometricPattern, BlackRoadSymbol } from '../components/BlackRoadVisuals'

export default function CheckoutPage() {
  const router = useRouter()
  const [processing, setProcessing] = useState(false)

  const handleCheckout = () => {
    setProcessing(true)
    setTimeout(() => router.push('/success'), 1500)
  }

  return (
    <main className="min-h-screen bg-[var(--br-deep-black)] text-white relative overflow-hidden flex items-center justify-center">
      <FloatingShapes />
      <GeometricPattern type="dots" opacity={0.03} />

      <div className="relative z-10 w-full max-w-lg mx-6">
        <div className="text-center mb-8">
          <BlackRoadSymbol size="lg" />
          <h1 className="text-4xl font-bold mt-4 mb-2">Complete Your Purchase</h1>
          <p className="br-text-muted text-lg">BlackRoad OS Professional — $499/month</p>
        </div>

        <div className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-8">
          {/* Order Summary */}
          <div className="border-b border-[rgba(255,255,255,0.08)] pb-6 mb-6">
            <h2 className="text-sm font-bold br-text-muted uppercase mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="br-text-soft">Professional Plan</span>
              <span className="font-bold">$499/mo</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="br-text-muted">1,000 concurrent agents, full audit trails</span>
            </div>
          </div>

          {/* Card Details */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-bold mb-2 br-text-muted">Card Number</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="w-full px-4 py-3 bg-[var(--br-onyx)] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:border-[var(--br-hot-pink)] focus:outline-none transition-all font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2 br-text-muted">Expiry</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full px-4 py-3 bg-[var(--br-onyx)] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:border-[var(--br-hot-pink)] focus:outline-none transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 br-text-muted">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 bg-[var(--br-onyx)] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:border-[var(--br-hot-pink)] focus:outline-none transition-all font-mono"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={processing}
            className="w-full py-4 bg-white text-black font-bold text-lg hover:bg-[rgba(255,255,255,0.85)] transition-all disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Pay $499'}
          </button>

          <p className="text-center text-xs br-text-muted mt-4">
            Secure payment powered by Stripe. Cancel anytime.
          </p>
        </div>
      </div>
    </main>
  )
}
