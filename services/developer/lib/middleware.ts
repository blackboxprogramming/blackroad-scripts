import { NextRequest, NextResponse } from 'next/server'
import { validateAPIKey, checkRateLimit } from '@/lib/api-keys'

export function withAPIKey(
  handler: (req: NextRequest, apiKey: any) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid Authorization header' },
        { status: 401 }
      )
    }
    
    const key = authHeader.substring(7)
    const validation = validateAPIKey(key)
    
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.reason },
        { status: 401 }
      )
    }
    
    const rateLimit = checkRateLimit(key)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          retryAfter: Math.ceil((rateLimit.resetAt.getTime() - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': validation.apiKey!.rateLimit.requestsPerMinute.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetAt.toISOString(),
          },
        }
      )
    }
    
    return handler(req, validation.apiKey!)
  }
}
