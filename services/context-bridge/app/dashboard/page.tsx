'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ServiceStatus {
  service: string
  status: string
  timestamp?: string
  uptime?: number
  memory?: { used: number; total: number }
}

export default function Dashboard() {
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStatuses() {
      const endpoints = [
        { name: 'Web', url: '/api/health' },
        { name: 'Status', url: '/api/status' },
        { name: 'Analytics', url: '/api/analytics' },
        { name: 'Newsletter', url: '/api/newsletter' },
      ]

      const results = await Promise.all(
        endpoints.map(async (endpoint) => {
          try {
            const res = await fetch(endpoint.url)
            const data = await res.json()
            return { service: endpoint.name, ...data, status: data.status || 'ok' }
          } catch {
            return { service: endpoint.name, status: 'error' }
          }
        })
      )

      setServices(results)
      setLoading(false)
    }

    fetchStatuses()
    const interval = setInterval(fetchStatuses, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main style={{ minHeight: '100vh', padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '3rem', color: 'white', fontWeight: 900 }}>
            📊 BlackRoad Dashboard
          </h1>
          <Link href="/" style={{ padding: '0.75rem 1.5rem', background: 'white', color: '#667eea', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>
            ← Back to Home
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '4rem' }}>
            Loading services...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {services.map((service) => (
              <div key={service.service} style={{ padding: '2rem', background: 'white', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#333' }}>
                    {service.service}
                  </h3>
                  <span style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, background: service.status === 'ok' || service.status === 'operational' ? '#10b981' : '#ef4444', color: 'white' }}>
                    {service.status === 'ok' || service.status === 'operational' ? '✓ OK' : '✗ ERROR'}
                  </span>
                </div>

                <div style={{ color: '#666', fontSize: '0.875rem' }}>
                  {service.timestamp && (
                    <div style={{ marginBottom: '0.5rem' }}>🕐 {new Date(service.timestamp).toLocaleTimeString()}</div>
                  )}
                  {service.uptime !== undefined && (
                    <div style={{ marginBottom: '0.5rem' }}>⏱️ Uptime: {Math.floor(service.uptime)}s</div>
                  )}
                  {service.memory && (
                    <div>💾 Memory: {service.memory.used}MB / {service.memory.total}MB</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '2rem', color: 'white', fontWeight: 800, marginBottom: '1rem' }}>🎯 Quick Stats</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'white' }}>{services.length}</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Total Services</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#10b981' }}>
                {services.filter(s => s.status === 'ok' || s.status === 'operational').length}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Healthy</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#ef4444' }}>
                {services.filter(s => s.status === 'error').length}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Errors</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
