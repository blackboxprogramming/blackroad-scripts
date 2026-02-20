import { ScanLine, MetricEmoji, PulsingDot, CommandPrompt } from '../components/BlackRoadVisuals'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terminal',
  description: 'BlackRoad OS terminal-style interface for system monitoring and agent management.',
}


export default function TerminalDashboard() {
  return (
    <div className="relative flex min-h-screen bg-black text-white font-mono text-sm">
      <ScanLine />
      <aside className="w-60 bg-[var(--br-deep-black)] border-r border-[var(--br-charcoal)] p-5 fixed h-screen z-20">
        <div className="font-bold mb-8 pb-2 border-b border-[var(--br-charcoal)] flex items-center gap-2">
          ● BLACKROAD OS <PulsingDot />
        </div>
        <nav className="space-y-6">
          <div>
            <div className="text-[#666] text-xs mb-2">SYSTEM</div>
            <ul className="space-y-1">
              <li><a href="#" className="block px-3 py-1.5 rounded hover:bg-white/5">Dashboard</a></li>
              <li><a href="#" className="block px-3 py-1.5 rounded hover:bg-white/5">Metrics</a></li>
              <li><a href="#" className="block px-3 py-1.5 rounded hover:bg-white/5">Logs</a></li>
            </ul>
          </div>
        </nav>
      </aside>
      <main className="relative z-10 ml-60 flex-1 p-8">
        <div className="mb-4">
          <CommandPrompt>blackroad status --live</CommandPrompt>
        </div>
        <h1 className="text-2xl font-bold mb-2">System Dashboard 🖥️</h1>
        <p className="br-text-muted mb-8">Real-time infrastructure monitoring</p>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'CPU', value: '42%', emoji: 'cpu' },
            { label: 'Memory', value: '6.2 GB', emoji: 'memory' },
            { label: 'Disk I/O', value: '124 MB/s', emoji: 'disk' },
            { label: 'Network', value: '1.2 GB/s', emoji: 'network' },
          ].map((m) => (
            <div key={m.label} className="bg-[var(--br-deep-black)] border border-[var(--br-charcoal)] p-4 rounded hover-lift transition-all">
              <div className="text-[#666] text-xs mb-1 flex items-center gap-2">
                <MetricEmoji type={m.emoji as any} />
                {m.label}
              </div>
              <div className="text-2xl font-bold">{m.value}</div>
              <PulsingDot />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
