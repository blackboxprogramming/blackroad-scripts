import { GeometricPattern, StatusEmoji } from '../components/BlackRoadVisuals'

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-white text-black">
      <GeometricPattern type="dots" />
      <div className="relative z-10 max-w-6xl mx-auto px-10 py-16">
        <header className="mb-32 border-b border-black pb-10">
          <h1 className="text-7xl font-bold mb-4 hover-glow">
            Alexa Amundson <StatusEmoji status="online" />
          </h1>
          <p className="text-2xl font-light text-gray-600">
            🏗️ Infrastructure Architect · 🚀 AI Systems Engineer
          </p>
        </header>
        <section>
          <h2 className="text-sm uppercase text-gray-500 mb-12">Selected Work ✨</h2>
          <div className="space-y-24">
            {[
              { title: 'BlackRoad OS', year: '2026', desc: 'Distributed operating system', emoji: '🌌' },
              { title: 'Autonomous CI/CD', year: '2026', desc: 'Self-healing deployments', emoji: '🤖' },
              { title: '30K Agent Platform', year: '2026', desc: 'Multi-agent orchestration', emoji: '🚀' },
            ].map((p) => (
              <article key={p.title} className="hover-lift transition-all">
                <div className="flex justify-between mb-4">
                  <h3 className="text-4xl font-bold">{p.emoji} {p.title}</h3>
                  <span className="text-lg text-gray-500">{p.year}</span>
                </div>
                <p className="text-xl text-gray-600">{p.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
