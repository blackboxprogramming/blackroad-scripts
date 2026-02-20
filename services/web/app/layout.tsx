import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'BlackRoad OS — The Operating System for Governed AI',
    template: '%s | BlackRoad OS',
  },
  description: 'Deploy 30,000 autonomous AI agents with cryptographic identity, deterministic reasoning, and complete audit trails. Built for fintech, healthcare, education, and government.',
  keywords: ['AI platform', 'agent orchestration', 'governed AI', 'compliance', 'audit trails', 'BlackRoad OS'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{
          margin: 0,
          fontFamily: 'var(--br-font)',
          backgroundColor: 'var(--br-deep-black)',
          color: 'var(--br-cream)',
        }}>
          <Navigation />
          <div style={{ paddingTop: '64px' }}>
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
