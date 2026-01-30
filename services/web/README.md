# BlackRoad Web Service

Main marketing and public-facing website for the BlackRoad ecosystem.

## Service Information

- **Service Name**: `blackroad-os-web`
- **Type**: Next.js Frontend
- **Domains**:
  - Development: `web.blackroad.io`
  - Production: `web.blackroad.systems`
- **Current Deployment**:
  - Cloudflare Pages: `blackroad-os-web.pages.dev`
  - Railway: `blackroad-os-web-production-a2ee.up.railway.app`

## Quick Start

```bash
# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/version` - Version information
- `GET /api/ready` - Readiness probe

## Deployment

### Railway Production

This service is deployed to Railway at:
- **URL**: `https://blackroad-os-web-production-a2ee.up.railway.app`

**Environment Variables (Railway)**:
```
SERVICE_NAME=blackroad-os-web
SERVICE_ENV=production
NEXT_PUBLIC_APP_NAME=BlackRoad Web
NEXT_PUBLIC_BASE_URL=https://web.blackroad.systems
```

### Cloudflare Pages Preview

This service is also deployed to Cloudflare Pages at:
- **URL**: `https://blackroad-os-web.pages.dev`

## Cloudflare + Railway Wiring

### Production (blackroad.systems)

1. **Cloudflare DNS** CNAME record:
   - **Type**: CNAME
   - **Name**: `web`
   - **Target**: `blackroad-os-web-production-a2ee.up.railway.app`
   - **Proxy**: Enabled (orange cloud)

2. **Railway Environment**:
   ```
   NEXT_PUBLIC_BASE_URL=https://web.blackroad.systems
   ```

### Preview (blackroad.io)

1. **Cloudflare DNS** CNAME record:
   - **Type**: CNAME
   - **Name**: `web`
   - **Target**: `blackroad-os-web.pages.dev`
   - **Proxy**: Enabled (orange cloud)

## Architecture

This service powers the main BlackRoad web presence, including:
- Marketing pages
- Product information
- Company information
- Landing pages

Built with Next.js 14 App Router for optimal performance and SEO.

---

**Part of BlackRoad Infrastructure** · See [registry](../../infra/blackroad_registry.json)
