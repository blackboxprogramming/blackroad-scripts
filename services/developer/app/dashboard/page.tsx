'use client'

import { useState, useEffect } from 'react'

interface APIKey {
  id: string
  name: string
  key: string
  permissions: string[]
  rateLimit: {
    requestsPerMinute: number
    requestsPerDay: number
  }
  usage: {
    totalRequests: number
    lastUsed: string | null
  }
  createdAt: string
  revoked: boolean
}

export default function DashboardPage() {
  const [keys, setKeys] = useState<APIKey[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [createdKey, setCreatedKey] = useState<string | null>(null)

  useEffect(() => {
    fetchKeys()
  }, [])

  async function fetchKeys() {
    try {
      const res = await fetch('/api/keys')
      const data = await res.json()
      setKeys(data.apiKeys || [])
    } catch (error) {
      console.error('Failed to fetch keys:', error)
    } finally {
      setLoading(false)
    }
  }

  async function createKey() {
    if (!newKeyName.trim()) {
      alert('Please enter a key name')
      return
    }

    setCreating(true)
    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newKeyName,
          permissions: ['read', 'write'],
          rateLimit: {
            requestsPerMinute: 60,
            requestsPerDay: 10000,
          },
        }),
      })

      const data = await res.json()
      if (data.success) {
        setCreatedKey(data.apiKey.key)
        setNewKeyName('')
        fetchKeys()
      }
    } catch (error) {
      console.error('Failed to create key:', error)
    } finally {
      setCreating(false)
    }
  }

  async function revokeKey(keyId: string) {
    if (!confirm('Are you sure you want to revoke this API key?')) return

    try {
      await fetch(`/api/keys?id=${keyId}`, { method: 'DELETE' })
      fetchKeys()
    } catch (error) {
      console.error('Failed to revoke key:', error)
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Developer Dashboard</h1>
          <p className="text-gray-400 text-lg">Manage your API keys and monitor usage</p>
        </div>

        {/* Created Key Alert */}
        {createdKey && (
          <div className="mb-8 p-6 bg-green-900/30 border border-green-500 rounded-lg">
            <h3 className="text-xl font-bold text-green-400 mb-2">🎉 API Key Created!</h3>
            <p className="text-gray-300 mb-4">
              Copy this key now - it won't be shown again:
            </p>
            <div className="flex items-center gap-4">
              <code className="flex-1 p-4 bg-black/50 rounded font-mono text-sm break-all">
                {createdKey}
              </code>
              <button
                onClick={() => copyToClipboard(createdKey)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
              >
                Copy
              </button>
            </div>
            <button
              onClick={() => setCreatedKey(null)}
              className="mt-4 text-sm text-gray-400 hover:text-white"
            >
              I've copied it, close this
            </button>
          </div>
        )}

        {/* Create New Key */}
        <div className="mb-12 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Create New API Key</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter key name (e.g., Production App)"
              className="flex-1 px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && createKey()}
            />
            <button
              onClick={createKey}
              disabled={creating}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 rounded-lg font-semibold"
            >
              {creating ? 'Creating...' : 'Create Key'}
            </button>
          </div>
        </div>

        {/* API Keys List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your API Keys</h2>
          
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading...</div>
          ) : keys.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No API keys yet</p>
              <p className="text-sm text-gray-500">Create your first key above to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {keys.map((key) => (
                <div
                  key={key.id}
                  className={`p-6 bg-white/5 backdrop-blur-sm border rounded-xl ${
                    key.revoked ? 'border-red-500/50 opacity-50' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{key.name}</h3>
                      <p className="text-sm text-gray-400 font-mono">{key.key}</p>
                    </div>
                    {key.revoked ? (
                      <span className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm font-semibold">
                        Revoked
                      </span>
                    ) : (
                      <button
                        onClick={() => revokeKey(key.id)}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg text-sm font-semibold"
                      >
                        Revoke
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Total Requests</p>
                      <p className="text-2xl font-bold">{key.usage.totalRequests.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Rate Limit</p>
                      <p className="text-lg font-semibold">
                        {key.rateLimit.requestsPerMinute}/min
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Daily Limit</p>
                      <p className="text-lg font-semibold">
                        {key.rateLimit.requestsPerDay.toLocaleString()}/day
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Last Used</p>
                      <p className="text-sm">
                        {key.usage.lastUsed
                          ? new Date(key.usage.lastUsed).toLocaleDateString()
                          : 'Never'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500">
                      Created {new Date(key.createdAt).toLocaleString()} • Permissions: {key.permissions.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
