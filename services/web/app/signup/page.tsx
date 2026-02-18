'use client'

import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Create your account</h1>
          <p className="text-gray-400">Join BlackRoad OS in minutes.</p>
        </div>
        <div className="bg-[var(--br-charcoal)] border border-[var(--br-charcoal)] rounded-lg p-6">
          <SignUp />
        </div>
      </div>
    </main>
  )
}
