import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BlackRoad Desktop OS',
  description: 'Complete browser-based operating system with unified API authentication, distributed computing, and service integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#0a0a0a',
        color: '#e0e0e0',
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
      }}>
        {children}
      </body>
    </html>
  )
}
