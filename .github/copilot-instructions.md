# BlackRoad OS Development Guidelines

**⚠️ CRITICAL: READ FIRST**

Before responding to ANY request, you MUST:
1. Read `/Users/alexa/CURRENT_CONTEXT.md` - Contains what we're actively working on
2. Check recent git commits if needed: `git log --oneline -5`
3. NEVER ask the user to repeat context that's in CURRENT_CONTEXT.md

This prevents wasting Alexa's time re-explaining what was just done in the last session.

---

This repository is the control center for BlackRoad OS distributed infrastructure. It contains services, scripts, and configuration for managing 15+ GitHub organizations, 1,000+ repositories, 200+ Cloudflare Pages projects, and multiple physical devices.

## Build, Test, and Lint Commands

### Service Development

All services use **Next.js 14** with TypeScript. Navigate to the specific service directory before running commands:

```bash
cd services/<service-name>  # e.g., services/web, services/prism, services/operator
npm install
npm run dev        # Start dev server (web: 3000, prism: 3001, operator: 3002)
npm run build      # Production build
npm run start      # Run production server
npm run lint       # Run ESLint
npm run type-check # TypeScript validation
```

**Important**: No test runner is configured. Rely on `npm run lint` and `npm run type-check` for validation.

### Root-Level Commands

```bash
npm start          # Run blackroad-dashboard-server.js
```

### Scripts

The `scripts/` directory contains 100+ utilities. Key scripts:
- `scripts/memory.sh` - Memory system operations
- `scripts/claude-session-init.sh` - Initialize multi-agent sessions
- Various `deploy-*.sh`, `test-*.sh`, `setup-*.sh` scripts

## Architecture

### High-Level Structure

This is a **multi-domain, multi-repo, multi-agent** infrastructure following subdomain-oriented architecture:

```
Cloudflare Edge (DNS/TLS/WAF) → Compute (Railway/Raspberry Pi/Jetson) → Failover
```

**Key Principle**: One subdomain = one service. DNS is the router—no giant internal routers needed.

### Canonical Registries

- **`infra/blackroad_registry.json`** - Master service registry for 24 services across blackroad.io and blackroad.systems domains
- **`templates/web-service/`** - Standard Next.js template for creating new services
- **`services/<service>/`** - Individual deployed services

### Domain Architecture

| Domain | Purpose | Environment |
|--------|---------|-------------|
| blackroad.io | Public apps/products | Cloudflare Pages (preview) |
| blackroad.systems | Internal systems | Railway (production) |
| lucidia.earth | Simulation engine | Mixed |
| blackroad.company | Company operations | Mixed |

Each domain maps to a Railway project with independent failure boundaries.

### Service Structure

Services follow this structure:
```
services/<name>/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── health/        # Health check endpoint
│   │   ├── version/       # Version info
│   │   └── ready/         # Readiness probe
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components (optional)
├── lib/                   # Utilities (optional)
├── Dockerfile             # Multi-stage build
├── railway.json           # Railway configuration
├── next.config.mjs        # Next.js config
├── .env.example           # Environment template
└── package.json           # Dependencies
```

### Multi-Agent Coordination

**Multiple Claude AI agents work concurrently**. Coordination systems:

- **Memory System**: `~/.blackroad/memory/` - PS-SHA-infinity append-only journals (4,000+ entries)
- **Codex**: `~/blackroad-codex/` - 22,244 indexed components searchable via `python3 ~/blackroad-codex-search.py`
- **Traffic Lights**: Project status tracking (green/yellow/red)
- **Task Marketplace**: Shared task queue across agents
- **TIL Broadcasts**: Shared learnings between agents

**Before starting work**: Check `~/memory-realtime-context.sh live $MY_CLAUDE compact` for conflicts and `python3 ~/blackroad-codex-search.py` for existing solutions.

## Key Conventions

### Code Style

- **2-space indentation**
- **Single quotes** preferred
- **No semicolons** in `services/*/app` directories
- TypeScript strict mode enabled

### Naming Conventions

- **Services**: lowercase, short names (e.g., `services/prism`, `services/operator`)
- **Packages**: `blackroad-os-<service>` format
- **Scripts**: Prefix indicates purpose:
  - `memory-*.sh` - Memory operations
  - `claude-*.sh` - Agent collaboration
  - `blackroad-*.sh` - Infrastructure
  - `deploy-*.sh` - Deployment automation

### Environment Configuration

- Copy `.env.example` to `.env` in each service
- Never commit `.env` files
- All services support `SERVICE_NAME` and `SERVICE_ENV` variables

### Deployment Configuration

- Each service includes `Dockerfile` for containerized deployment
- `railway.json` defines Railway-specific configuration
- Keep deployment configs aligned with service changes

## Important Patterns

### Health Check Endpoints

All services must implement:
- `/api/health` - Basic health check
- `/api/version` - Version and build info
- `/api/ready` - Readiness probe for orchestration

### Service-to-Service Communication

- Use Railway internal networking for service communication
- Authenticate via tokens (no shared mega projects)
- Each service can fail independently

### Creating New Services

1. Copy `templates/web-service/` as starting point
2. Update `package.json` name to `blackroad-os-<service>`
3. Add entry to `infra/blackroad_registry.json`
4. Configure environment variables from `.env.example`
5. Deploy to Cloudflare Pages (preview) and/or Railway (production)

### Working with Memory System

When making significant changes, log to memory:
```bash
~/memory-system.sh log <action> <entity> <details> <tags>
```

Check for conflicts before starting:
```bash
~/memory-realtime-context.sh live $MY_CLAUDE compact
```

### Searching Existing Solutions

Before implementing, search Codex (22,244 components):
```bash
python3 ~/blackroad-codex-search.py "your search query"
```

## Session Initialization

**REQUIRED - DO THIS FIRST, EVERY SESSION**:

```bash
# 1. Read current context (MANDATORY)
cat /Users/alexa/CURRENT_CONTEXT.md

# 2. Check what was just done
cd /Users/alexa && git log --oneline -5

# 3. For AI agents: Initialize if needed
~/claude-session-init.sh  # Auto-assigns identity, checks memory/codex/traffic lights
```

**Never skip step 1**. If you respond without reading CURRENT_CONTEXT.md, you're wasting Alexa's time.

## Documentation References

- **Architecture**: `ARCHITECTURE.md` - System design and principles
- **Deployment**: `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- **Services Registry**: `infra/blackroad_registry.json` - Service definitions
- **Agent Guidelines**: `AGENTS.md` - Multi-agent coordination
- **Claude-Specific**: `.claude/CLAUDE.md` - Detailed agent protocols

## GitHub Workflows

Key automation workflows in `.github/workflows/`:
- `self-healing-master.yml` - Autonomous system healing
- `cross-repo-orchestration.yml` - Multi-repo coordination
- `autonomous-monitoring.yml` - Infrastructure monitoring
- `intelligent-auto-pr.yml` - Automated PR creation
- `deploy-web.yml` - Web service deployment

## Debugging Workflows

### Service Won't Start

**Common causes & fixes**:

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000  # or 3001, 3002, etc.
   # Kill the process
   kill -9 <PID>
   ```

2. **Missing dependencies**
   ```bash
   cd services/<service>
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Environment variables missing**
   ```bash
   # Check if .env exists
   ls -la services/<service>/.env
   # Copy template if missing
   cp services/<service>/.env.example services/<service>/.env
   # Verify required vars
   grep -v '^#' services/<service>/.env.example
   ```

4. **TypeScript errors blocking build**
   ```bash
   npm run type-check          # See all errors
   # Quick fix: Check next.config.mjs has typescript.ignoreBuildErrors
   # Better: Fix the actual type errors
   ```

### Deployment Failures

**Railway deployment fails**:

1. **Check Railway logs**
   ```bash
   # Railway CLI if installed
   railway logs
   # Or check Railway dashboard directly
   ```

2. **Build timeout**
   - Issue: Large dependencies or slow build
   - Fix: Optimize Dockerfile, use caching layers
   - Check: `Dockerfile` has multi-stage build pattern

3. **Environment variables not set**
   - Issue: Missing env vars in Railway dashboard
   - Fix: Go to Railway project → Variables tab
   - Check: Compare with `.env.example`

**Cloudflare Pages deployment fails**:

1. **Build command incorrect**
   - Check: `wrangler.toml` or Pages project settings
   - Should be: `npm run build` for Next.js services

2. **Node version mismatch**
   - Check: `package.json` engines field
   - Should be: `"node": ">=20.0.0"`
   - Fix: Update in Pages dashboard → Settings → Build config

### Service Communication Issues

**Service can't reach another service**:

1. **Check Railway internal networking**
   ```bash
   # Services in same project use: <service-name>.railway.internal
   # Example: api.railway.internal:3000
   ```

2. **Authentication failing**
   - Check: Service tokens in environment variables
   - Verify: Headers include `Authorization: Bearer <token>`
   - Debug: Log request headers (temporarily)

3. **CORS errors in browser**
   ```typescript
   // In next.config.mjs, add:
   async headers() {
     return [
       {
         source: '/api/:path*',
         headers: [
           { key: 'Access-Control-Allow-Origin', value: '*' },
           { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
         ],
       },
     ]
   }
   ```

### Database/State Issues

**Memory system conflicts**:

```bash
# Check for conflicts before starting work
~/memory-realtime-context.sh live $MY_CLAUDE compact

# If conflicts found:
# 1. Read the conflicting entry details
~/memory-system.sh query --recent 10

# 2. Coordinate with other agent or wait
# 3. Update your approach to avoid overlap

# 4. Log your work when done
~/memory-system.sh log "created" "services/api" "added /auth endpoint" "api,auth"
```

**Registry out of sync**:

```bash
# Symptom: Service deployed but not in registry
# Fix: Update infra/blackroad_registry.json
# Then verify:
cat infra/blackroad_registry.json | jq '.domains["blackroad.io"]' | grep -i <service-name>
```

### Performance Issues

**Slow dev server**:

1. **Too many files being watched**
   - Check: `.gitignore` excludes `node_modules`, `.next`, etc.
   - Add to `.gitignore`: `*.log`, `dist/`, `.env.local`

2. **Memory usage high**
   ```bash
   # Check Node memory
   node --max-old-space-size=4096 node_modules/.bin/next dev
   ```

3. **TypeScript slow**
   - Use `incremental: true` in `tsconfig.json`
   - Already configured in template

### Lint/Type Check Failures

**ESLint errors**:

```bash
# Auto-fix what's possible
npm run lint -- --fix

# Check specific files
npx eslint services/web/app/page.tsx

# Common issues:
# - Missing React import (not needed in Next.js 14)
# - Unused variables (prefix with _ or remove)
# - Missing key prop in lists
```

**TypeScript errors**:

```bash
# See all errors
npm run type-check

# Common issues:
# - Implicit any: Add explicit types
# - Missing types for dependencies: npm install --save-dev @types/<package>
# - Clerk types: Already included via @clerk/nextjs
# - Stripe types: Already included via stripe package
```

### Common Error Patterns

**"Cannot find module" errors**:

1. **Missing dependency**
   ```bash
   npm install <package-name>
   ```

2. **Wrong import path**
   ```typescript
   // ❌ Wrong
   import { Component } from 'components/Component'
   
   // ✅ Correct - Next.js uses absolute imports from root
   import { Component } from '@/components/Component'
   ```

3. **TypeScript can't find types**
   ```bash
   npm install --save-dev @types/<package-name>
   ```

**"Address already in use" errors**:

```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3003 npm run dev
```

**Clerk authentication errors**:

1. **Missing API keys**
   ```bash
   # Check .env has:
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   ```

2. **Middleware not configured**
   ```typescript
   // Ensure middleware.ts exists in service root
   // Should export default clerkMiddleware()
   ```

**Stripe webhook errors**:

1. **Signature verification fails**
   - Check: `STRIPE_WEBHOOK_SECRET` in environment
   - Verify: Using raw body (not parsed JSON)

2. **Events not processing**
   ```typescript
   // In /api/webhooks/stripe/route.ts
   // Log event type to debug
   console.log('Received event:', event.type)
   ```

### Quick Diagnosis Commands

**Check service health**:
```bash
# Local
curl http://localhost:3000/api/health

# Production
curl https://web.blackroad.io/api/health
curl https://api.blackroad.systems/api/health
```

**Verify environment**:
```bash
cd services/<service>
node --version  # Should be 20+
npm --version
ls -la .env     # Should exist
npm run type-check  # Should pass
```

**Check recent memory logs**:
```bash
~/memory-system.sh query --recent 20 --format compact
```

**Verify registry consistency**:
```bash
# List all services in registry
cat infra/blackroad_registry.json | jq -r '.domains | to_entries[] | .key as $domain | .value | to_entries[] | "\($domain)/\(.key) -> \(.value.service_name)"'
```

## Security

- Security issues: Report to security@blackroad.io (do NOT create public issues)
- All repos use proprietary BlackRoad OS license
- Follow zero-trust principles for service authentication
