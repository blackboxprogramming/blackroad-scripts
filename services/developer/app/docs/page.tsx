'use client'

import { useState } from 'react'

export default function DocsPage() {
  const [apiKey, setApiKey] = useState('')
  const [testResponse, setTestResponse] = useState<any>(null)
  const [testing, setTesting] = useState(false)

  async function testAPI() {
    if (!apiKey) {
      alert('Please enter your API key')
      return
    }

    setTesting(true)
    try {
      const res = await fetch('/api/v1/hello?q=developer', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      })
      const data = await res.json()
      setTestResponse({ status: res.status, data })
    } catch (error) {
      setTestResponse({ error: String(error) })
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">API Documentation</h1>
          <p className="text-gray-400 text-lg">Build powerful integrations with BlackRoad Developer API</p>
        </div>

        {/* Quick Start */}
        <div className="mb-12 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">🚀 Quick Start</h2>
          <ol className="space-y-4 text-gray-300">
            <li>
              <span className="font-bold text-blue-400">1.</span> Get your API key from the{' '}
              <a href="/dashboard" className="text-purple-400 hover:underline">dashboard</a>
            </li>
            <li>
              <span className="font-bold text-blue-400">2.</span> Include it in your requests as a Bearer token
            </li>
            <li>
              <span className="font-bold text-blue-400">3.</span> Start making API calls!
            </li>
          </ol>
        </div>

        {/* Authentication */}
        <div className="mb-12 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">🔐 Authentication</h2>
          <p className="text-gray-300 mb-4">
            All API requests require authentication using an API key in the Authorization header:
          </p>
          
          <div className="bg-black/50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
            <div className="text-gray-500">// Example request</div>
            <div className="text-blue-400">curl</div> <span className="text-green-400">https://developer.blackroad.io/api/v1/hello</span> \<br/>
            <span className="ml-4 text-yellow-400">-H</span> <span className="text-green-400">"Authorization: Bearer br_live_YOUR_API_KEY"</span>
          </div>

          <div className="p-4 bg-blue-900/20 border border-blue-500/50 rounded-lg">
            <p className="text-sm text-blue-300">
              💡 <strong>Tip:</strong> Keep your API keys secure and never commit them to version control
            </p>
          </div>
        </div>

        {/* Live API Tester */}
        <div className="mb-12 p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">🧪 Live API Tester</h2>
          <p className="text-gray-300 mb-6">Test the API directly from your browser:</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Your API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="br_live_..."
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <button
              onClick={testAPI}
              disabled={testing}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 rounded-lg font-semibold"
            >
              {testing ? 'Testing...' : 'Test API Call'}
            </button>

            {testResponse && (
              <div className="mt-4 p-4 bg-black/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">Response:</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    testResponse.status === 200 ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {testResponse.status || 'ERROR'}
                  </span>
                </div>
                <pre className="text-sm text-green-400 overflow-x-auto">
                  {JSON.stringify(testResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">📡 API Endpoints</h2>

          {/* Hello Endpoint */}
          <div className="mb-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-600 rounded font-mono text-sm font-bold">GET</span>
              <code className="text-lg">/api/v1/hello</code>
            </div>
            
            <p className="text-gray-300 mb-4">
              A simple hello world endpoint to test your API integration.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">Query Parameters</h4>
                <div className="bg-black/50 p-4 rounded-lg">
                  <div className="flex items-start gap-4">
                    <code className="text-purple-400">q</code>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Optional string to customize greeting</p>
                      <p className="text-xs text-gray-500 mt-1">Default: "world"</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2">Example Request</h4>
                <div className="bg-black/50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="text-blue-400 mb-2">curl</div>
                  <div className="text-green-400 mb-1">GET https://developer.blackroad.io/api/v1/hello?q=world</div>
                  <div className="text-yellow-400">Authorization: Bearer br_live_YOUR_KEY</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2">Example Response</h4>
                <div className="bg-black/50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre className="text-green-400">{JSON.stringify({
                    message: "Hello, world!",
                    timestamp: "2025-01-27T12:00:00.000Z",
                    apiKeyName: "My Production Key",
                    usage: {
                      totalRequests: 42,
                      lastUsed: "2025-01-27T11:59:00.000Z"
                    }
                  }, null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Limits */}
        <div className="mb-12 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">⚡ Rate Limits</h2>
          <p className="text-gray-300 mb-6">
            API keys have the following rate limits:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Per Minute</h3>
              <p className="text-3xl font-bold text-blue-400">60 requests</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Per Day</h3>
              <p className="text-3xl font-bold text-purple-400">10,000 requests</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
            <p className="text-sm text-yellow-300">
              ⚠️ Requests exceeding rate limits will return <code>429 Too Many Requests</code>
            </p>
          </div>
        </div>

        {/* Error Codes */}
        <div className="mb-12 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">❌ Error Codes</h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-black/50 rounded-lg">
              <code className="px-3 py-1 bg-red-600 rounded font-bold">401</code>
              <span className="text-gray-300">Unauthorized - Invalid or missing API key</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-black/50 rounded-lg">
              <code className="px-3 py-1 bg-orange-600 rounded font-bold">429</code>
              <span className="text-gray-300">Too Many Requests - Rate limit exceeded</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-black/50 rounded-lg">
              <code className="px-3 py-1 bg-red-600 rounded font-bold">500</code>
              <span className="text-gray-300">Internal Server Error - Something went wrong</span>
            </div>
          </div>
        </div>

        {/* SDKs */}
        <div className="p-8 bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">📦 Code Examples</h2>
          
          <div className="space-y-6">
            {/* JavaScript */}
            <div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">JavaScript / Node.js</h3>
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre className="text-green-400">{`const response = await fetch('https://developer.blackroad.io/api/v1/hello', {
  headers: {
    'Authorization': 'Bearer br_live_YOUR_KEY'
  }
});

const data = await response.json();
console.log(data.message);`}</pre>
              </div>
            </div>

            {/* Python */}
            <div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">Python</h3>
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre className="text-green-400">{`import requests

response = requests.get(
    'https://developer.blackroad.io/api/v1/hello',
    headers={'Authorization': 'Bearer br_live_YOUR_KEY'}
)

print(response.json()['message'])`}</pre>
              </div>
            </div>

            {/* cURL */}
            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">cURL</h3>
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre className="text-green-400">{`curl -X GET 'https://developer.blackroad.io/api/v1/hello?q=API' \\
  -H 'Authorization: Bearer br_live_YOUR_KEY'`}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
