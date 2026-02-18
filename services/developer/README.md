# BlackRoad Developer API Platform

A complete API key management and developer portal built with Next.js 14, TypeScript, and modern React patterns.

## 🚀 Features

### API Key Management
- **Generate API Keys** - Create unlimited API keys with custom names
- **Rate Limiting** - Built-in rate limiting (60/min, 10K/day)
- **Usage Tracking** - Real-time usage analytics and monitoring
- **Key Revocation** - Instantly revoke compromised keys

### Developer Portal
- **Interactive Dashboard** - Manage all your API keys in one place
- **Live API Tester** - Test endpoints directly from the browser
- **Comprehensive Docs** - Complete API reference with code examples
- **Multi-Language Examples** - JavaScript, Python, and cURL snippets

### Security
- **Bearer Token Auth** - Industry-standard authentication
- **Rate Limit Headers** - X-RateLimit-* headers on all responses
- **Key Masking** - API keys are masked in the UI after creation
- **One-Time Display** - Full keys only shown once at creation

## 📁 Project Structure

```
services/developer/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── dashboard/
│   │   └── page.tsx                # API key management dashboard
│   ├── docs/
│   │   └── page.tsx                # Interactive API documentation
│   └── api/
│       ├── keys/
│       │   └── route.ts            # Create/list/revoke API keys
│       └── v1/
│           └── hello/
│               └── route.ts        # Example protected endpoint
├── lib/
│   ├── api-keys.ts                 # Core API key utilities
│   └── middleware.ts               # Authentication middleware
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🛠️ Installation

```bash
cd services/developer
npm install
```

## 🏃 Running Locally

```bash
# Development server (port 3003)
npm run dev

# Production build
npm run build
npm start
```

## 🌐 API Endpoints

### Management Endpoints

**POST /api/keys** - Create new API key
```bash
curl -X POST http://localhost:3003/api/keys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Production Key",
    "permissions": ["read", "write"],
    "rateLimit": {
      "requestsPerMinute": 60,
      "requestsPerDay": 10000
    }
  }'
```

**GET /api/keys** - List all API keys
```bash
curl http://localhost:3003/api/keys
```

**DELETE /api/keys?id=KEY_ID** - Revoke API key
```bash
curl -X DELETE "http://localhost:3003/api/keys?id=abc123"
```

### Protected API Endpoints

**GET /api/v1/hello** - Example authenticated endpoint
```bash
curl http://localhost:3003/api/v1/hello?q=world \
  -H "Authorization: Bearer br_live_YOUR_KEY"
```

Response:
```json
{
  "message": "Hello, world!",
  "timestamp": "2025-01-27T12:00:00.000Z",
  "apiKeyName": "My Production Key",
  "usage": {
    "totalRequests": 42,
    "lastUsed": "2025-01-27T11:59:00.000Z"
  }
}
```

## 🔐 Authentication

All API v1 endpoints require a Bearer token:

```
Authorization: Bearer br_live_YOUR_API_KEY
```

Invalid or missing keys return `401 Unauthorized`.
Rate limit exceeded returns `429 Too Many Requests`.

## ⚡ Rate Limiting

Default limits per API key:
- **60 requests per minute**
- **10,000 requests per day**

Rate limit headers are included in all responses:
- `X-RateLimit-Limit` - Total requests allowed per window
- `X-RateLimit-Remaining` - Requests remaining in current window  
- `X-RateLimit-Reset` - Time when rate limit resets

## 📊 Usage Tracking

Each API key tracks:
- Total requests made
- Last used timestamp
- Real-time rate limit consumption

View usage stats in the dashboard at `/dashboard`.

## 🎨 UI Pages

- **/** - Homepage with features and quick start
- **/dashboard** - API key management (create, list, revoke)
- **/docs** - Interactive API documentation with live tester

## 🚀 Deployment

### Railway

```bash
# Deploy to Railway
railway up

# Set environment variables
railway variables set NODE_ENV=production
```

### Vercel

```bash
# Deploy to Vercel
vercel

# Production deployment
vercel --prod
```

### Cloudflare Pages

```bash
# Build for Cloudflare
npm run build

# Deploy with Wrangler
wrangler pages deploy .next
```

## 🔧 Configuration

Edit rate limits in `lib/api-keys.ts`:

```typescript
export function createAPIKey(
  userId: string,
  name: string,
  permissions: string[] = ['read'],
  rateLimit = { 
    requestsPerMinute: 60,    // Change here
    requestsPerDay: 10000      // Change here
  }
)
```

## 📝 Adding New API Endpoints

1. Create route file in `app/api/v1/your-endpoint/route.ts`
2. Import and use the `withAPIKey` middleware
3. Implement your handler function

Example:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { withAPIKey } from '@/lib/middleware'

async function handler(req: NextRequest, apiKey: any) {
  // Your logic here
  return NextResponse.json({ data: 'Your response' })
}

export const GET = withAPIKey(handler)
export const POST = withAPIKey(handler)
```

## 🎯 Next Steps

- [ ] Add user authentication (Clerk/Auth0)
- [ ] Integrate with PostgreSQL for persistence
- [ ] Add Redis for distributed rate limiting
- [ ] Implement webhook notifications
- [ ] Add API usage billing/metering
- [ ] Create admin panel for key management
- [ ] Add API versioning support
- [ ] Implement IP whitelisting
- [ ] Add CORS configuration
- [ ] Create SDKs (JS, Python, Go)

## 🐛 Known Limitations

- **In-Memory Storage** - API keys stored in memory (not persistent)
- **Single Instance** - Rate limiting doesn't work across multiple instances
- **No Auth** - Currently uses demo user ID, needs real authentication
- **No Persistence** - Data lost on server restart

For production use, replace in-memory storage with PostgreSQL/Redis.

## 📚 Documentation

Visit `/docs` when running locally to see:
- Quick start guide
- Authentication details
- Live API tester
- Code examples in multiple languages
- Rate limit information
- Error code reference

## 🎉 What We Built

✅ Complete API key lifecycle management
✅ Rate limiting with per-minute and per-day windows
✅ Real-time usage tracking and analytics
✅ Beautiful, responsive dashboard UI
✅ Interactive API documentation
✅ Live API testing in browser
✅ Multi-language code examples
✅ Secure Bearer token authentication
✅ Rate limit headers on all responses
✅ Key masking and security best practices

## 💡 Use Cases

Perfect for:
- SaaS platforms needing API access
- Developer portals and marketplaces
- API-first products
- Internal tool APIs
- Microservice authentication
- Third-party integrations

---

Built with ❤️ by BlackRoad OS Inc.
