import { NextResponse } from 'next/server'
import { UnifiedAuth } from '@/lib/auth'

/**
 * Verify Unified API Key
 * POST /api/auth/verify
 *
 * Body: { apiKey: string, service?: string }
 */
export async function POST(request: Request) {
  try {
    const { apiKey, service } = await request.json()

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'API key required' },
        { status: 400 }
      )
    }

    // In production, verify against stored hash in database
    // For now, just hash and return verification structure
    const hash = UnifiedAuth.hashKey(apiKey)

    // Generate service-specific token if service specified
    const serviceToken = service
      ? UnifiedAuth.createServiceToken(apiKey, service)
      : null

    return NextResponse.json({
      success: true,
      message: 'API key verified',
      data: {
        hash,
        serviceToken,
        verified: true,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to verify API key',
      },
      { status: 500 }
    )
  }
}
