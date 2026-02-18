import { FloatingShapes, StatusEmoji, MetricEmoji, GeometricPattern, AnimatedGrid, BlackRoadSymbol } from '../components/BlackRoadVisuals'

export default function FeaturesPage() {
  const features = [
    {
      icon: '🤖',
      title: 'Multi-Agent AI',
      description: '27+ AI agents collaborate in real-time with PS-SHA-∞ memory persistence. No human bottlenecks.',
      benefits: ['Autonomous deployment', 'Self-healing systems', 'Real-time collaboration', '4000+ memory entries']
    },
    {
      icon: '⚡',
      title: 'Edge-First Deploy',
      description: 'Deploy to 300+ Cloudflare edge locations globally. Sub-50ms p99 latency worldwide.',
      benefits: ['Global CDN', 'Automatic failover', 'DDoS protection', 'Zero-config SSL']
    },
    {
      icon: '🔓',
      title: 'No Lock-In',
      description: 'Deploy anywhere: Cloudflare, Railway, Pi clusters, or your own infrastructure. You own it.',
      benefits: ['Multi-cloud ready', 'Export anytime', 'Standard containers', 'Open protocols']
    },
    {
      icon: '🌐',
      title: 'Pi Cluster Support',
      description: 'Deploy to Raspberry Pi clusters for edge computing. Full Kubernetes orchestration.',
      benefits: ['ARM64 support', 'Local-first', 'Cost-effective', '7-device tested']
    },
    {
      icon: '🔍',
      title: 'Distributed BlackRoad OS',
      description: '22,244 indexed components searchable in <50ms. Find solutions instantly.',
      benefits: ['Full-text search', 'Semantic matching', 'Code examples', 'Auto-documentation']
    },
    {
      icon: '📊',
      title: 'Real-Time Observability',
      description: 'Metrics, logs, traces all in one place. AI-powered alerts that actually matter.',
      benefits: ['Live dashboards', 'Smart alerts', 'Distributed tracing', 'Custom metrics']
    },
    {
      icon: '🔐',
      title: 'Zero-Trust Security',
      description: 'End-to-end encryption, zero-trust networking, automated security scans.',
      benefits: ['TLS everywhere', 'Secret management', 'Auto-patching', 'Compliance ready']
    },
    {
      icon: '🚀',
      title: 'Git-Native Workflows',
      description: 'Push to deploy. Every commit is a deployment. Automatic preview environments.',
      benefits: ['GitHub Actions', 'Auto-PR creation', 'Preview deploys', 'Rollback instantly']
    },
    {
      icon: '💾',
      title: 'PS-SHA-∞ Memory',
      description: 'Append-only memory system with cryptographic integrity. Never lose context.',
      benefits: ['Immutable logs', 'Time-travel debug', 'Conflict-free sync', 'Quantum-resistant']
    }
  ]

  return (
    <main className="min-h-screen bg-[var(--br-deep-black)] text-white relative overflow-hidden">
      <FloatingShapes />
      <AnimatedGrid />
      
      {/* Hero */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="mb-4">
          <BlackRoadSymbol size="lg" />
        </div>
        <h1 className="text-6xl font-bold mb-6 hover-glow">
          Features Built Different <StatusEmoji status="green" />
        </h1>
        <p className="text-2xl br-text-muted mb-8 max-w-3xl">
          Multi-agent AI. Edge-first deployment. Zero lock-in.
          Everything you need to ship faster, scale infinitely, and own your stack.
        </p>
        <div className="flex gap-4">
          <a href="/docs" className="px-8 py-4 bg-white text-black font-bold text-lg hover:bg-[rgba(255,255,255,0.85)] transition-all hover-lift">
            Get Started →
          </a>
          <a href="/comparison-table" className="px-8 py-4 border border-[rgba(255,255,255,0.3)] hover:border-white font-bold text-lg transition-all hover-lift">
            Compare Platforms
          </a>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-8 hover:border-white transition-all hover-lift">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="br-text-muted mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm br-text-soft">
                    <span className="text-[var(--br-hot-pink)]">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-8">
            <div className="text-5xl font-bold mb-2">27+</div>
            <div className="br-text-muted">AI Agents</div>
          </div>
          <div className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-8">
            <div className="text-5xl font-bold mb-2">22K+</div>
            <div className="br-text-muted">Indexed Components</div>
          </div>
          <div className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-8">
            <div className="text-5xl font-bold mb-2">&lt;50ms</div>
            <div className="br-text-muted">p99 Latency</div>
          </div>
          <div className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-8">
            <div className="text-5xl font-bold mb-2">300+</div>
            <div className="br-text-muted">Edge Locations</div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.15)]">
        <h2 className="text-4xl font-bold mb-12">Built For</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-8">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold mb-4">Startups</h3>
            <p className="br-text-muted">
              Ship fast without DevOps overhead. Multi-agent AI handles infrastructure while you build product.
            </p>
          </div>
          <div className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-8">
            <div className="text-4xl mb-4">🏗️</div>
            <h3 className="text-2xl font-bold mb-4">Enterprises</h3>
            <p className="br-text-muted">
              Scale to millions of users with zero-trust security, compliance automation, and multi-cloud flexibility.
            </p>
          </div>
          <div className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-8">
            <div className="text-4xl mb-4">👨‍💻</div>
            <h3 className="text-2xl font-bold mb-4">Developers</h3>
            <p className="br-text-muted">
              Git-native workflows, instant previews, distributed blackroad os. Everything you need, nothing you don't.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to experience the difference?</h2>
        <p className="text-xl br-text-muted mb-8">
          Join teams building the next generation of software infrastructure.
        </p>
        <a 
          href="/pricing"
          className="inline-block px-8 py-4 bg-white text-black font-bold text-lg hover:bg-[rgba(255,255,255,0.85)] transition-all hover-lift"
        >
          View Pricing →
        </a>
      </section>
    </main>
  )
}
