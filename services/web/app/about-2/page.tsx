import { FloatingShapes, StatusEmoji, GeometricPattern, BlackRoadSymbol, MetricEmoji } from '../components/BlackRoadVisuals'

export default function About2Page() {
  const timeline = [
    { year: '2023', title: 'Founded', description: 'BlackRoad OS begins as a side project exploring multi-agent systems' },
    { year: '2024', title: 'First Deploy', description: 'Launched autonomous deployment system with PS-SHA-∞ memory' },
    { year: '2024', title: 'Multi-Agent', description: '27+ AI agents collaborating in real-time with distributed blackroad os' },
    { year: '2025', title: 'Scale Up', description: 'Supporting 1000+ deployments/day across 300+ edge locations' },
    { year: '2025', title: 'Today', description: 'Building the future of autonomous infrastructure' }
  ]

  const stats = [
    { value: '27+', label: 'AI Agents', icon: '🤖' },
    { value: '22K+', label: 'Indexed Components', icon: '📦' },
    { value: '4000+', label: 'Memory Entries', icon: '💾' },
    { value: '300+', label: 'Edge Locations', icon: '🌍' },
    { value: '1000+', label: 'Daily Deploys', icon: '🚀' },
    { value: '<50ms', label: 'p99 Latency', icon: '⚡' }
  ]

  const values = [
    {
      icon: '⚡',
      title: 'Speed is Everything',
      description: 'Ship fast. Iterate constantly. Deploy fearlessly. Speed compounds.'
    },
    {
      icon: '🤖',
      title: 'AI-First Culture',
      description: 'Embrace automation. Let AI handle repetitive work. Focus on creativity.'
    },
    {
      icon: '🔓',
      title: 'No Lock-In',
      description: 'You own your stack. Deploy anywhere. Multi-cloud by design.'
    },
    {
      icon: '🌍',
      title: 'Build in Public',
      description: 'Transparent roadmap. Open collaboration. Community-driven development.'
    },
    {
      icon: '🎯',
      title: 'Mission Over Metrics',
      description: 'Build what matters. Solve real problems. Create lasting impact.'
    },
    {
      icon: '💡',
      title: 'Learn & Adapt',
      description: 'Continuous learning. Rapid iteration. Evolution over perfection.'
    }
  ]

  return (
    <main className="min-h-screen bg-[var(--br-deep-black)] text-white relative overflow-hidden">
      <FloatingShapes />
      <GeometricPattern type="dots" opacity={0.03} />
      
      {/* Hero */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="mb-4">
          <BlackRoadSymbol size="lg" />
        </div>
        <h1 className="text-6xl font-bold mb-6 hover-glow">
          About BlackRoad OS
        </h1>
        <p className="text-2xl br-text-muted mb-8 max-w-3xl">
          We're building autonomous infrastructure for the next generation of software.
          Multi-agent AI, edge-first deployment, and zero lock-in.
        </p>
      </section>

      {/* Mission */}
      <section className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl br-text-soft leading-relaxed mb-6">
            To democratize autonomous infrastructure. Every developer should have access
            to world-class deployment systems without the complexity, cost, or vendor lock-in.
          </p>
          <p className="text-xl br-text-muted leading-relaxed">
            We believe AI agents can handle 90% of DevOps work, freeing developers to focus
            on building products. Our multi-agent system orchestrates deployments, monitors
            performance, and self-heals issues—all without human intervention.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.15)]">
        <h2 className="text-4xl font-bold mb-12 text-center">By the Numbers</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-6 text-center hover:border-white transition-all hover-lift">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm br-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.15)]">
        <h2 className="text-4xl font-bold mb-12">Our Journey</h2>
        <div className="max-w-4xl space-y-8">
          {timeline.map((event, i) => (
            <div key={i} className="flex gap-8 items-start">
              <div className="w-24 flex-shrink-0">
                <div className="text-2xl font-bold br-text-muted">{event.year}</div>
              </div>
              <div className="flex-1 bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-6 hover:border-white transition-all">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="br-text-muted">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.15)]">
        <h2 className="text-4xl font-bold mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <div key={i} className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] p-8 hover:border-white transition-all hover-lift">
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
              <p className="br-text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.15)]">
        <h2 className="text-4xl font-bold mb-8">Technology Stack</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Frontend <MetricEmoji type="lightning" />
            </h3>
            <ul className="space-y-3 br-text-muted">
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Next.js 14 (App Router)</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> React Server Components</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> TypeScript (strict mode)</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Tailwind CSS</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Custom visual components</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Backend <MetricEmoji type="cd" />
            </h3>
            <ul className="space-y-3 br-text-muted">
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Node.js + TypeScript</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Cloudflare Workers</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Railway containers</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> PostgreSQL + Redis</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> NATS messaging</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              AI/ML <MetricEmoji type="rocket" />
            </h3>
            <ul className="space-y-3 br-text-muted">
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Claude (Anthropic)</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> GPT-4 (OpenAI)</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Ollama (local models)</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Custom embeddings</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Vector search (Pinecone)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Infrastructure <MetricEmoji type="globe" />
            </h3>
            <ul className="space-y-3 br-text-muted">
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Cloudflare (300+ PoPs)</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Railway (containers)</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Raspberry Pi clusters</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> GitHub Actions</li>
              <li className="flex items-center gap-2"><span className="text-[var(--br-hot-pink)]">✓</span> Grafana + Prometheus</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto text-center border-t border-[rgba(255,255,255,0.15)]">
        <h2 className="text-4xl font-bold mb-6">Join Us on This Journey</h2>
        <p className="text-xl br-text-muted mb-8 max-w-2xl mx-auto">
          We're building the future of autonomous infrastructure.
          Come help us shape what's possible.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/careers" className="px-8 py-4 bg-white text-black font-bold text-lg hover:bg-[rgba(255,255,255,0.85)] transition-all hover-lift">
            View Open Roles
          </a>
          <a href="/contact" className="px-8 py-4 border border-[rgba(255,255,255,0.3)] hover:border-white font-bold text-lg transition-all hover-lift">
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  )
}
