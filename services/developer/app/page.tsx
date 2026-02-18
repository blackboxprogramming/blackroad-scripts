import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            BlackRoad Developer API
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Build powerful integrations with enterprise-grade APIs
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            Get started in minutes with our simple API key authentication, comprehensive documentation,
            and generous rate limits. Perfect for developers building the next generation of apps.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg font-bold text-lg transition-all"
            >
              View Documentation
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-3">Quick Start</h3>
            <p className="text-gray-400">
              Get your API key and start making requests in under 5 minutes. No complex setup required.
            </p>
          </div>

          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-blue-500/50 transition-all">
            <div className="text-5xl mb-4">🔐</div>
            <h3 className="text-2xl font-bold mb-3">Secure by Default</h3>
            <p className="text-gray-400">
              Industry-standard authentication with API keys. Rate limiting and usage tracking included.
            </p>
          </div>

          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-pink-500/50 transition-all">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-3">Usage Analytics</h3>
            <p className="text-gray-400">
              Monitor your API usage in real-time with detailed analytics and usage breakdowns.
            </p>
          </div>

          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-green-500/50 transition-all">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">High Performance</h3>
            <p className="text-gray-400">
              Built for speed with 60 requests per minute and 10,000 requests per day.
            </p>
          </div>

          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-yellow-500/50 transition-all">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-3">Great Docs</h3>
            <p className="text-gray-400">
              Comprehensive documentation with code examples in multiple languages.
            </p>
          </div>

          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-red-500/50 transition-all">
            <div className="text-5xl mb-4">🧪</div>
            <h3 className="text-2xl font-bold mb-3">Live Testing</h3>
            <p className="text-gray-400">
              Test API calls directly from your browser with our interactive API explorer.
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div className="mb-20 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Simple. Powerful. Ready.</h2>
          
          <div className="bg-black/50 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="text-gray-500 mb-2">// Example API call</div>
            <pre className="text-green-400">{`const response = await fetch('https://developer.blackroad.io/api/v1/hello', {
  headers: {
    'Authorization': 'Bearer br_live_YOUR_KEY'
  }
});

const data = await response.json();
console.log(data.message); // "Hello, world!"`}</pre>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center p-12 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl">
          <h2 className="text-4xl font-bold mb-4">Free to Start</h2>
          <p className="text-xl text-gray-300 mb-6">
            No credit card required. Start building today.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">60/min</div>
              <div className="text-sm text-gray-400">Requests per minute</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">10K/day</div>
              <div className="text-sm text-gray-400">Requests per day</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">∞</div>
              <div className="text-sm text-gray-400">API keys</div>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="inline-block px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
          >
            Create Your Free Account
          </Link>
        </div>
      </div>
    </div>
  )
}
