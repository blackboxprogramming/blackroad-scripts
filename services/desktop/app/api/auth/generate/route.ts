import { NextResponse } from 'next/server'
import { UnifiedAuth } from '@/lib/auth'

/**
 * Generate Unified API Key
 * POST /api/auth/generate
 *
 * Returns a new unified API key that grants access to ALL BlackRoad services
 */
export async function POST() {
  try {
    const apiKey = UnifiedAuth.generateKey()

    return NextResponse.json({
      success: true,
      message: 'Unified API key generated successfully',
      data: {
        ...apiKey,
        // Only return the key once for security
        warning: 'Store this key securely. It will not be shown again.',
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate API key',
      },
      { status: 500 }
    )
  }
}
