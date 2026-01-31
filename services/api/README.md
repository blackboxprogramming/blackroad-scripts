# BlackRoad API Gateway

Central API gateway for BlackRoad OS services.

## Features

- 🔌 Unified API interface
- 🔐 Authentication & authorization
- 🚦 Rate limiting
- 📊 Request analytics
- 🔄 Service routing

## Development

```bash
pnpm install
pnpm dev
```

Visit http://localhost:3003

## Endpoints

### Core
- `GET /health` - Health check
- `GET /status` - Service status
- `GET /version` - API version

### Services
- `/web/*` - Web service proxy
- `/prism/*` - Prism service proxy
- `/operator/*` - Operator service proxy

## Architecture

Routes requests to appropriate microservices with load balancing and failover.

Built with ❤️ by BlackRoad Infrastructure
