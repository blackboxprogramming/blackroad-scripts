import { CommandPrompt, StatusEmoji, GeometricPattern } from '../components/BlackRoadVisuals'
import Link from 'next/link'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Getting started guides, API references, and tutorials for BlackRoad OS platform, ALICE QI, Lucidia, and RoadChain.',
}


export default function DocsPage() {
  const sections = [
    { title: 'Getting Started', items: ['Installation', 'Quick Start', 'Configuration'] },
    { title: 'Core Concepts', items: ['Architecture', 'Agents', 'Memory System'] },
    { title: 'API Reference', items: ['REST API', 'WebSockets', 'GraphQL'] },
    { title: 'Deployment', items: ['Cloudflare', 'Railway', 'Pi Cluster'] },
  ]

  return (
    <div className="relative flex min-h-screen bg-black text-white">
      <GeometricPattern type="lines" />
      
      {/* Sidebar */}
      <aside className="relative z-10 w-72 bg-[var(--br-deep-black)] border-r border-[var(--br-charcoal)] p-6 fixed h-screen overflow-y-auto">
        <Link href="/" className="block mb-8">
          <div className="text-xl font-bold hover-glow">● BlackRoad OS</div>
        </Link>
        
        <nav className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="text-xs uppercase text-gray-500 mb-3">{section.title}</div>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                       className="block px-3 py-2 rounded hover:bg-white/5 transition-all text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 ml-72 flex-1 p-12 max-w-4xl">
        <div className="mb-8">
          <StatusEmoji status="online" />
          <span className="ml-2 text-sm text-gray-400">Documentation v2.0</span>
        </div>

        <h1 className="text-6xl font-bold mb-4 hover-glow">Documentation 📚</h1>
        <p className="text-xl text-gray-400 mb-12">
          Everything you need to build with BlackRoad OS
        </p>

        <div className="mb-8">
          <CommandPrompt>blackroad docs --search "getting started"</CommandPrompt>
        </div>

        {/* Getting Started */}
        <section className="mb-16">
          <h2 id="installation" className="text-4xl font-bold mb-6">Installation ⚡</h2>
          <div className="bg-[var(--br-deep-black)] border border-[var(--br-charcoal)] rounded-lg p-6 mb-6">
            <pre className="font-mono text-sm text-green-400">
              <code>{`npm install @blackroad/os
# or
pnpm add @blackroad/os
# or
yarn add @blackroad/os`}</code>
            </pre>
          </div>
          <p className="text-gray-400 mb-4">
            Install BlackRoad OS in any Node.js project. Works with Next.js, Express, and vanilla Node.
          </p>
        </section>

        <section className="mb-16">
          <h2 id="quick-start" className="text-4xl font-bold mb-6">Quick Start 🚀</h2>
          <div className="bg-[var(--br-deep-black)] border border-[var(--br-charcoal)] rounded-lg p-6 mb-6">
            <pre className="font-mono text-sm text-blue-400">
              <code>{`import { BlackRoad } from '@blackroad/os'

const br = new BlackRoad({
  memory: true,
  agents: true,
  autonomous: true
})

await br.start()
console.log('BlackRoad OS running!')`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-16">
          <h2 id="architecture" className="text-4xl font-bold mb-6">Architecture 🏗️</h2>
          <p className="text-gray-400 mb-6">
            BlackRoad OS is built on three core pillars:
          </p>
          <div className="grid gap-4">
            {[
              { icon: '🧠', title: 'Memory System', desc: 'PS-SHA-∞ append-only journals' },
              { icon: '🤖', title: 'Agent Network', desc: '30,000+ autonomous agents' },
              { icon: '🌐', title: 'Distributed Compute', desc: 'Multi-cloud + edge deployment' },
            ].map((item) => (
              <div key={item.title} className="bg-[var(--br-deep-black)] border border-[var(--br-charcoal)] rounded-lg p-6 hover-lift transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-[var(--br-charcoal)] pt-8 mt-16 flex justify-between text-sm text-gray-500">
          <div>Last updated: Feb 2026</div>
          <a href="#" className="hover:text-white transition-colors">Edit on GitHub →</a>
        </div>
      </main>
    </div>
  )
}
