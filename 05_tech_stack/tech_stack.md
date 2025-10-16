# AGIS Tech Stack (Concrete)

**Frontend**
- Next.js 14 (App Router, TypeScript, Server Actions)
- Tailwind CSS + Radix UI primitives (accessible by default)
- Clerk for auth (OIDC, SSO, orgs/tenants)
- TanStack Query for client data fetching
- PostHog (product analytics), Sentry (frontend errors)

**Backend / Runtime**
- Node.js 20 on Railway (containers) for API + workers
- Fastify (HTTP) + tRPC for typed client-server contracts
- Job/Queue: BullMQ on Redis (Railway) for schedules + async work
- Event bus: NATS (Railway) or Redpanda/Kafka (optional)
- Orchestrator: MCP-native agent runners (Claude-compatible) with per-tenant sandboxes
- Connectors: Google, Slack, Stripe, GitHub, Notion, Netlify, Chrome DevTools, macOS Automator, App Store Connect (as available)
- Model vendors: Anthropic/OpenAI (configurable per-tenant)

**Data**
- Supabase Postgres (RLS for multi-tenancy) + pgvector for memory
- Redis for cache/queues; Supabase Storage or R2 for artifacts

**Observability & Ops**
- OpenTelemetry (trace/log/metric) → Grafana/Loki/Tempo or Honeycomb
- Feature flags: Unleash (self-host) or Statsig
- CI/CD: GitHub Actions → Railway deploy; Netlify for the static site/app

**Security**
- Per-tenant key vault (Supabase vault or Railway secrets) — never store end-user creds in code
- Fine-grained scopes for agent tools; budget/rate/PII policies enforced server-side

**Billing**
- Stripe: seat + usage hybrid (metered events + overages)
- Webhooks to sync entitlements and limits

## Folder Structure (monorepo)
- apps/web (Next.js, Clerk)
- apps/api (Fastify + tRPC)
- apps/worker (queues, schedulers, orchestrator)
- packages/core (types, schemas, shared utils)
- packages/ui (design system components)
- infra/ (IaC: Railway, Supabase migrations)

