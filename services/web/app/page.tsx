'use client'

export default function Home() {
  const serviceName = 'blackroad-os-web'
  const serviceEnv = process.env.SERVICE_ENV || 'development'

  const handleSignIn = () => {
    alert('Sign in will be enabled once Clerk keys are configured in Vercel')
  }

  const handleCheckout = () => {
    alert('Checkout will be enabled once Stripe keys are configured in Vercel')
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        padding: '3rem',
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
        borderRadius: '16px',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
          fontWeight: 800
        }}>
          BlackRoad OS
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          textAlign: 'center',
          color: '#a1a1aa',
          marginBottom: '2rem',
          fontWeight: 300
        }}>
          Operator-controlled • Local-first • Sovereign
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <button onClick={handleSignIn} style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}>
            Sign In
          </button>
          <button onClick={handleSignIn} style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#764ba2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}>
            Get Started
          </button>
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
            web.blackroad.io
          </span>
          <span style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: '#2a2a2a',
            borderRadius: '4px',
            border: '1px solid #444',
            color: '#888'
          }}>
            web.blackroad.systems
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            padding: '2rem',
            backgroundColor: 'rgba(102, 126, 234, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#e0e0e0' }}>Operator-Controlled</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>
              Full control over your infrastructure. No black boxes, no vendor lock-in.
            </p>
          </div>
          
          <div style={{
            padding: '2rem',
            backgroundColor: 'rgba(118, 75, 162, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(118, 75, 162, 0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#e0e0e0' }}>Local-First</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>
              Your data stays on your hardware. Privacy and security by design.
            </p>
          </div>
          
          <div style={{
            padding: '2rem',
            backgroundColor: 'rgba(102, 126, 234, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#e0e0e0' }}>Sovereign</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>
              Own your stack. Build and deploy on your terms, your way.
            </p>
          </div>
        </div>

        <div style={{
          marginBottom: '3rem',
          padding: '3rem',
          backgroundColor: 'rgba(102, 126, 234, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '1rem',
            color: '#e0e0e0'
          }}>
            Simple Pricing
          </h2>
          <p style={{
            fontSize: '1.125rem',
            textAlign: 'center',
            color: '#a1a1aa',
            marginBottom: '3rem'
          }}>
            Get started with BlackRoad OS Professional
          </p>

          <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            padding: '2.5rem',
            backgroundColor: 'rgba(26, 26, 26, 0.8)',
            borderRadius: '12px',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: '#667eea'
            }}>
              Professional
            </h3>
            <div style={{
              fontSize: '3rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: '#e0e0e0'
            }}>
              $97<span style={{ fontSize: '1.5rem', color: '#888' }}>/mo</span>
            </div>
            <p style={{
              color: '#a1a1aa',
              marginBottom: '2rem'
            }}>
              Full access to BlackRoad OS infrastructure
            </p>
            <ul style={{
              textAlign: 'left',
              listStyle: 'none',
              padding: 0,
              marginBottom: '2rem'
            }}>
              <li style={{ padding: '0.5rem 0', color: '#a1a1aa' }}>✓ Unlimited deployments</li>
              <li style={{ padding: '0.5rem 0', color: '#a1a1aa' }}>✓ 24/7 infrastructure access</li>
              <li style={{ padding: '0.5rem 0', color: '#a1a1aa' }}>✓ Priority support</li>
              <li style={{ padding: '0.5rem 0', color: '#a1a1aa' }}>✓ Advanced monitoring</li>
            </ul>
            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              Subscribe Now
            </button>
          </div>
        </div>

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
            Service Status Dashboard
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.25rem' }}>SERVICE</div>
              <div style={{ fontSize: '1rem', fontWeight: 500 }}>Web Platform</div>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.25rem' }}>STATUS</div>
              <div style={{ fontSize: '1rem', fontWeight: 500, color: '#4ade80' }}>Operational</div>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.25rem' }}>VERSION</div>
              <div style={{ fontSize: '1rem', fontWeight: 500 }}>0.0.1</div>
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

        <footer style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #333',
          fontSize: '0.875rem',
          color: '#666',
          textAlign: 'center'
        }}>
          BlackRoad Infrastructure · {new Date().getFullYear()}
        </footer>
      </div>
    </main>
  )
}
