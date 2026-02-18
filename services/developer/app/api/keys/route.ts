import { NextRequest, NextResponse } from 'next/server'
import { createAPIKey, listAPIKeys, revokeAPIKey } from '@/lib/api-keys'

// POST /api/keys - Create new API key
export async function POST(req: NextRequest) {
  try {
    const { name, permissions, rateLimit } = await req.json()
    
    // TODO: Get user ID from session/auth
    const userId = 'user_demo'
    
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }
    
    const apiKey = createAPIKey(userId, name, permissions, rateLimit)
    
    return NextResponse.json({
      success: true,
      apiKey: {
        id: apiKey.id,
        key: apiKey.key, // Only shown once!
        name: apiKey.name,
        permissions: apiKey.permissions,
        rateLimit: apiKey.rateLimit,
        createdAt: apiKey.createdAt,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    )
  }
}

// GET /api/keys - List all API keys for user
export async function GET(req: NextRequest) {
  try {
    // TODO: Get user ID from session/auth
    const userId = 'user_demo'
    
    const keys = listAPIKeys(userId)
    
    return NextResponse.json({
      apiKeys: keys.map(key => ({
        id: key.id,
        name: key.name,
        key: `${key.key.substring(0, 12)}...`, // Masked
        permissions: key.permissions,
        rateLimit: key.rateLimit,
        usage: key.usage,
        createdAt: key.createdAt,
        revoked: key.revoked,
      })),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
      { status: 500 }
    )
  }
}

// DELETE /api/keys - Revoke an API key
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const keyId = searchParams.get('id')
    
    if (!keyId) {
      return NextResponse.json(
        { error: 'Key ID is required' },
        { status: 400 }
      )
    }
    
    // TODO: Verify user owns this key
    const success = revokeAPIKey(keyId)
    
    if (!success) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'API key revoked successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to revoke API key' },
      { status: 500 }
    )
  }
}
