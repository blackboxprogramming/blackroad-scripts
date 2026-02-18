import { readFile } from 'node:fs/promises'
import path from 'node:path'

type RegistryService = {
  subdomain: string
  service_name: string
  type: string
  target?: string
  cloudflare_target?: string
  prod_url?: string
  description?: string
}

type Registry = {
  version: string
  updated: string
  domains: Record<string, Record<string, RegistryService>>
}

const registryPath = path.resolve(
  process.cwd(),
  '..',
  '..',
  'infra',
  'blackroad_registry.json'
)

async function loadRegistry(): Promise<Registry | null> {
  try {
    const raw = await readFile(registryPath, 'utf8')
    return JSON.parse(raw) as Registry
  } catch {
    return null
  }
}

export default async function Home() {
  const serviceName = 'blackroad-os-prism-console'
  const serviceEnv = process.env.SERVICE_ENV || 'development'
  const registry = await loadRegistry()
  const domains = registry?.domains ?? {}
  const ioEntries = Object.entries(domains['blackroad.io'] ?? {}).sort(([a], [b]) =>
    a.localeCompare(b)
  )
  const systemsEntries = Object.entries(domains['blackroad.systems'] ?? {}).sort(([a], [b]) =>
    a.localeCompare(b)
  )
  const totalServices = ioEntries.length + systemsEntries.length
  const uniqueServices = new Set(
    [...ioEntries, ...systemsEntries].map(([, service]) => service.service_name)
  ).size

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '900px',
        width: '100%',
        padding: '3rem',
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        border: '1px solid #333',
        boxShadow: '0 0 40px rgba(102, 126, 234, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '0.5rem'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            ◇
          </div>
          <h1 style={{
            fontSize: '3rem',
            margin: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Prism Console
          </h1>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          fontSize: '0.875rem',
          flexWrap: 'wrap'
        }}>
          <span style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: '#2a2a2a',
            borderRadius: '4px',
            border: '1px solid #444'
          }}>
            {serviceName}
          </span>
          <span style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: serviceEnv === 'production' ? '#1a472a' : '#2a2a2a',
            borderRadius: '4px',
            border: `1px solid ${serviceEnv === 'production' ? '#2d5f3d' : '#444'}`
          }}>
            {serviceEnv}
          </span>
          <span style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: '#2a2a2a',
            borderRadius: '4px',
            border: '1px solid #444',
            color: '#888'
          }}>
            prism.blackroad.io
          </span>
          <span style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: '#2a2a2a',
            borderRadius: '4px',
            border: '1px solid #444',
            color: '#888'
          }}>
            prism.blackroad.systems
          </span>
        </div>

        <p style={{
          fontSize: '1.25rem',
          lineHeight: '1.75',
          marginBottom: '2rem',
          color: '#b0b0b0'
        }}>
          Advanced console interface for managing and monitoring BlackRoad infrastructure.
          Prism provides unified visibility across all services, domains, and deployments.
        </p>

        <div style={{
          padding: '1.5rem',
          backgroundColor: '#0f0f0f',
          borderRadius: '8px',
          border: '1px solid #2a2a2a',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1rem',
            marginBottom: '1rem',
            color: '#667eea'
          }}>
            Console Status Dashboard
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.25rem' }}>SERVICE</div>
              <div style={{ fontSize: '1rem', fontWeight: 500 }}>Prism Console</div>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.25rem' }}>STATUS</div>
              <div style={{ fontSize: '1rem', fontWeight: 500, color: '#4ade80' }}>Online</div>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.25rem' }}>VERSION</div>
              <div style={{ fontSize: '1rem', fontWeight: 500 }}>0.0.1</div>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.25rem' }}>SERVICES</div>
              <div style={{ fontSize: '1rem', fontWeight: 500 }}>
                {totalServices ? `${totalServices} Total` : 'n/a'}
              </div>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.25rem' }}>UNIQUE</div>
              <div style={{ fontSize: '1rem', fontWeight: 500 }}>
                {uniqueServices ? `${uniqueServices} Services` : 'n/a'}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            marginBottom: '0.5rem',
            color: '#e0e0e0'
          }}>
            Service Endpoints
          </h2>

          <a
            href="/api/health"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: '#2a2a2a',
              borderRadius: '6px',
              border: '1px solid #444',
              textDecoration: 'none',
              color: '#667eea',
              transition: 'all 0.2s'
            }}
          >
            <strong>/api/health</strong>
            <span style={{ color: '#888', marginLeft: '1rem' }}>→ Health check endpoint</span>
          </a>

          <a
            href="/api/version"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: '#2a2a2a',
              borderRadius: '6px',
              border: '1px solid #444',
              textDecoration: 'none',
              color: '#667eea',
              transition: 'all 0.2s'
            }}
          >
            <strong>/api/version</strong>
            <span style={{ color: '#888', marginLeft: '1rem' }}>→ Version information</span>
          </a>

          <a
            href="/api/ready"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: '#2a2a2a',
              borderRadius: '6px',
              border: '1px solid #444',
              textDecoration: 'none',
              color: '#667eea',
              transition: 'all 0.2s'
            }}
          >
            <strong>/api/ready</strong>
            <span style={{ color: '#888', marginLeft: '1rem' }}>→ Readiness probe</span>
          </a>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#0f0f0f',
          borderRadius: '8px',
          border: '1px solid #2a2a2a'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <h3 style={{
              fontSize: '1rem',
              margin: 0,
              color: '#667eea'
            }}>
              Registry Snapshot
            </h3>
            <span style={{ color: '#888', fontSize: '0.75rem' }}>
              {registry ? `v${registry.version} | updated ${registry.updated}` : 'registry unavailable'}
            </span>
          </div>

          {registry ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              fontSize: '0.875rem'
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#121212',
                borderRadius: '6px',
                border: '1px solid #222'
              }}>
                <div style={{ color: '#e0e0e0', fontWeight: 600, marginBottom: '0.75rem' }}>
                  blackroad.io ({ioEntries.length})
                </div>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {ioEntries.map(([key, service]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <span style={{ color: '#cfcfcf' }}>{key}</span>
                      <span style={{ color: '#777' }}>{service.service_name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: '#121212',
                borderRadius: '6px',
                border: '1px solid #222'
              }}>
                <div style={{ color: '#e0e0e0', fontWeight: 600, marginBottom: '0.75rem' }}>
                  blackroad.systems ({systemsEntries.length})
                </div>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {systemsEntries.map(([key, service]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <span style={{ color: '#cfcfcf' }}>{key}</span>
                      <span style={{ color: '#777' }}>{service.service_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: '#888', fontSize: '0.875rem' }}>
              Unable to read `infra/blackroad_registry.json` from this build context.
            </div>
          )}
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#0f0f0f',
          borderRadius: '6px',
          border: '1px solid #2a2a2a'
        }}>
          <h3 style={{
            fontSize: '0.875rem',
            marginBottom: '0.5rem',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Quick Access
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}>
            <span style={{ color: '#667eea' }}>→ Service Registry</span>
            <span style={{ color: '#667eea' }}>→ Deployment Logs</span>
            <span style={{ color: '#667eea' }}>→ Infrastructure Map</span>
            <span style={{ color: '#667eea' }}>→ Analytics</span>
          </div>
        </div>

        <footer style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #333',
          fontSize: '0.875rem',
          color: '#666',
          textAlign: 'center'
        }}>
          BlackRoad Prism Infrastructure · {new Date().getFullYear()}
        </footer>
      </div>
    </main>
  )
}
