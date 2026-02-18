import { NextRequest, NextResponse } from 'next/server'
import { withAPIKey } from '@/lib/middleware'

// Example protected API endpoint
async function handler(req: NextRequest, apiKey: any) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || 'world'
  
  return NextResponse.json({
    message: `Hello, ${query}!`,
    timestamp: new Date().toISOString(),
    apiKeyName: apiKey.name,
    usage: apiKey.usage,
  })
}

export const GET = withAPIKey(handler)
