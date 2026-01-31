# BlackRoad Router

Cloudflare Worker that routes BlackRoad domains to their respective deployments.

## Routes

- `blackroad.io` → Vercel (main web)
- `app.blackroad.io` → Cloudflare Pages (console)
- `docs.blackroad.io` → Cloudflare Pages (documentation)
- `demo.blackroad.io` → Cloudflare Pages (demo)
- `home.blackroad.io` → Cloudflare Pages (home)
- `brand.blackroad.io` → Cloudflare Pages (brand)

## Deployment

```bash
wrangler deploy
```

## Features

- Zero-config routing based on hostname
- Automatic CORS handling for blackroad domains
- 404 handling for unknown domains
- Proxy to multiple deployment platforms

Built with ❤️ by BlackRoad Infrastructure
