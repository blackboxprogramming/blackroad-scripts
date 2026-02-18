'use client'

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

        {/* Subscription Status */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Subscription</h2>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-400">Current Plan</div>
              <div className="text-xl font-semibold">Developer (Free)</div>
            </div>
            <div className="text-green-400 text-sm">Active</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <div className="text-gray-400">Concurrent Agents</div>
              <div className="font-semibold">5 / 10</div>
            </div>
            <div>
              <div className="text-gray-400">API Requests Today</div>
              <div className="font-semibold">247 / 1,000</div>
            </div>
            <div>
              <div className="text-gray-400">Storage Used</div>
              <div className="font-semibold">0.4 GB / 1 GB</div>
            </div>
            <div>
              <div className="text-gray-400">Team Members</div>
              <div className="font-semibold">1 / 1</div>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href="/pricing"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
            >
              Upgrade Plan
            </a>
            <button
              type="button"
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
              onClick={() => {
                // This would call the portal API
                window.location.href = '/api/portal'
              }}
            >
              Manage Billing
            </button>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Usage This Month</h2>
          
          <div className="space-y-4">
            <UsageBar label="Agent Hours" used={42} total={100} />
            <UsageBar label="API Calls" used={7420} total={30000} />
            <UsageBar label="Storage" used={0.4} total={1} unit="GB" />
          </div>
        </div>
      </div>
    </div>
  )
}

function UsageBar({ 
  label, 
  used, 
  total, 
  unit = '' 
}: { 
  label: string
  used: number
  total: number
  unit?: string
}) {
  const percentage = (used / total) * 100
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">{label}</span>
        <span className="font-semibold">
          {used.toLocaleString()} / {total.toLocaleString()} {unit}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}
