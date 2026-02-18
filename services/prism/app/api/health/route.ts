import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'blackroad-os-prism-console',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
}
