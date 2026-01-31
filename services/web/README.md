# BlackRoad OS Web

The main web interface for BlackRoad OS.

## Features

- 🎨 Beautiful gradient UI
- 🔐 Demo authentication system
- 💳 Stripe-ready checkout
- 📊 Health & status endpoints
- ⚡ Next.js 14 + TypeScript

## Development

```bash
pnpm install
pnpm dev
```

Visit http://localhost:3000

## API Endpoints

- `/api/health` - Health check with metrics
- `/api/status` - Service status and features
- `/api/version` - Version information
- `/api/ready` - Readiness probe

## Deployment

Deploys to Vercel via Railway/Cloudflare routing.

Built with ❤️ by BlackRoad Infrastructure
