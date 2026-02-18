import { FloatingShapes, StatusEmoji, GeometricPattern, BlackRoadSymbol } from '../components/BlackRoadVisuals'

export default function Pricing2Page() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for side projects and experiments',
      features: [
        { text: '3 projects', included: true },
        { text: '10GB bandwidth/month', included: true },
        { text: 'Community support', included: true },
        { text: 'Auto-scaling', included: true },
        { text: 'Custom domains', included: true },
        { text: 'AI agents (1 concurrent)', included: true },
        { text: 'Advanced analytics', included: false },
        { text: 'Priority support', included: false },
        { text: 'SLA guarantee', included: false }
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For professional developers and small teams',
      features: [
        { text: 'Unlimited projects', included: true },
        { text: '100GB bandwidth/month', included: true },
        { text: 'Priority support', included: true },
        { text: 'Auto-scaling', included: true },
        { text: 'Custom domains', included: true },
        { text: 'AI agents (5 concurrent)', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Team collaboration', included: true },
        { text: '99.9% SLA', included: true }
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For organizations at scale',
      features: [
        { text: 'Unlimited everything', included: true },
        { text: 'Dedicated infrastructure', included: true },
        { text: '24/7 phone support', included: true },
        { text: 'Auto-scaling', included: true },
        { text: 'Custom domains', included: true },
        { text: 'AI agents (unlimited)', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Team collaboration', included: true },
        { text: '99.99% SLA', included: true },
        { text: 'Security audit', included: true },
        { text: 'Compliance (SOC2, HIPAA)', included: true },
        { text: 'Custom contracts', included: true }
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const addons = [
    { name: 'Extra Bandwidth', price: '$5', unit: '/100GB', icon: '🌐' },
    { name: 'Additional AI Agent', price: '$10', unit: '/agent/month', icon: '🤖' },
    { name: 'Priority Builds', price: '$15', unit: '/month', icon: '⚡' },
    { name: 'Extended Logs', price: '$20', unit: '/month', icon: '📊' }
  ]

  const faqs = [
    {
      q: 'Can I change plans anytime?',
      a: 'Yes! Upgrade or downgrade anytime. Changes take effect immediately.'
    },
    {
      q: 'What happens if I exceed bandwidth?',
      a: 'We\'ll notify you at 80% and 100%. Service continues, but you\'ll be billed for overages at $0.05/GB.'
    },
    {
      q: 'Do you offer annual billing?',
      a: 'Yes! Pay annually and save 20%. Contact sales for enterprise annual contracts.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'Credit card, ACH, wire transfer for enterprise. Crypto coming soon!'
    }
  ]

  return (
    <main className="min-h-screen bg-[var(--br-deep-black)] text-white relative overflow-hidden">
      <FloatingShapes />
      <GeometricPattern type="dots" opacity={0.03} />
      
      {/* Hero */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto text-center">
        <div className="mb-4 flex justify-center">
          <BlackRoadSymbol size="lg" />
        </div>
        <h1 className="text-6xl font-bold mb-6 hover-glow">
          Simple, Transparent Pricing
        </h1>
        <p className="text-2xl br-text-muted mb-8">
          Start free. Scale as you grow. No surprises.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`bg-[var(--br-charcoal)] border-2 p-8 transition-all hover-lift relative ${
                plan.popular ? 'border-white' : 'border-[var(--br-charcoal)] hover:border-[rgba(255,255,255,0.3)]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="br-text-muted">{plan.period}</span>
              </div>
              <p className="br-text-muted mb-8">{plan.description}</p>
              
              <button className={`w-full py-4 font-bold text-lg mb-8 transition-all ${
                plan.popular 
                  ? 'bg-white text-black hover:bg-[rgba(255,255,255,0.85)]' 
                  : 'border-2 border-[rgba(255,255,255,0.3)] hover:border-white'
              }`}>
                {plan.cta}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    {feature.included ? (
                      <span className="text-[var(--br-hot-pink)] text-xl">✓</span>
                    ) : (
                      <span className="br-text-faint text-xl">✗</span>
                    )}
                    <span className={feature.included ? 'br-text-soft' : 'br-text-faint'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.15)]">
        <h2 className="text-4xl font-bold mb-12 text-center">Add-Ons</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {addons.map((addon, i) => (
            <div key={i} className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-6 text-center hover:border-white transition-all hover-lift">
              <div className="text-4xl mb-3">{addon.icon}</div>
              <h3 className="text-lg font-bold mb-2">{addon.name}</h3>
              <div className="text-2xl font-bold mb-1">{addon.price}</div>
              <div className="text-sm br-text-muted">{addon.unit}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-8">
              <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
              <p className="br-text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto text-center border-t border-[rgba(255,255,255,0.15)]">
        <h2 className="text-4xl font-bold mb-6">Still have questions?</h2>
        <p className="text-xl br-text-muted mb-8">
          Our team is here to help. Schedule a call or send us a message.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/contact" className="px-8 py-4 bg-white text-black font-bold text-lg hover:bg-[rgba(255,255,255,0.85)] transition-all hover-lift">
            Contact Sales
          </a>
          <a href="/docs" className="px-8 py-4 border border-[rgba(255,255,255,0.3)] hover:border-white font-bold text-lg transition-all hover-lift">
            Read Docs
          </a>
        </div>
      </section>
    </main>
  )
}
