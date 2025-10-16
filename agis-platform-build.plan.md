<!-- 9dda7418-4c08-45b4-a779-386eb79fcab0 a039bd73-2d7f-4a0e-b4a5-512d0c6a81d2 -->
# AGIS Platform - Complete Build

## Architecture Overview

Full-stack Next.js 14 App Router application with:

- **Marketing site**: WebGL hero, scroll-driven animations, split-letter titles, pinned image sequences
- **Dashboard**: Agent orchestration, run management, billing, analytics
- **Backend**: tRPC API, BullMQ workers on Railway, Supabase PostgreSQL with RLS
- **Auth**: Clerk (orgs/tenants), **Billing**: Stripe (seat + usage), **Deploy**: Netlify

## Phase 1: Project Foundation & Structure

### Setup Next.js 14 monorepo

- Initialize Next.js 14 with TypeScript, App Router, Tailwind CSS
- Configure `apps/web/` structure with marketing + dashboard routes
- Install dependencies: Three.js (r169+), GSAP + ScrollTrigger, Radix UI, tRPC, Clerk SDK, Stripe SDK
- Copy brand assets from `00_brand/` → `public/` (logos, favicon)
- Create `tailwind.config.ts` with AGIS palette (#0B0F14, #3BA0FF, #7AE2B3) and Inter/JetBrains Mono fonts
- Setup `.env.local` using `05_tech_stack/env.sample` template

### File organization

```
agis-platform/
├── app/
│   ├── (marketing)/        # Public pages
│   │   ├── page.tsx        # Homepage with WebGL hero
│   │   ├── about/
│   │   ├── agents/         # Agent catalog showcase
│   │   ├── pricing/
│   │   └── layout.tsx      # Marketing nav + footer
│   ├── dashboard/          # Protected routes
│   │   ├── layout.tsx      # Dashboard shell
│   │   ├── page.tsx        # Overview/runs
│   │   ├── agents/         # Agent management
│   │   ├── settings/       # Org/billing settings
│   │   └── analytics/
│   └── api/                # tRPC + webhooks
├── components/
│   ├── marketing/          # Hero, Features, ScrollSections
│   ├── dashboard/          # AgentCard, RunsTable, Charts
│   └── ui/                 # Radix primitives
├── lib/
│   ├── three/              # WebGL scene setup
│   ├── animations/         # GSAP scroll effects
│   ├── trpc/               # tRPC client/server
│   └── db/                 # Supabase client
└── public/
    └── brand/              # Logos, images
```

## Phase 2: Marketing Site (Mont-Fort Visual Effects)

### WebGL Hero Background

- Create `components/marketing/HeroCanvas.tsx` with Three.js scene
- Implement subtle particle system or geometric shapes (performance-optimized)
- Add mouse parallax effect, smooth camera movement
- Respect `prefers-reduced-motion` (disable animations)

### Scroll-Driven Animations (GSAP ScrollTrigger)

- **Split-letter titles**: Use GSAP SplitText (or custom implementation) for character-by-character reveals
- **Section reveals**: Fade-up animations on scroll into view
- **Pinned image sequences**: Pin sections while images scroll/transition
- Configure `scrub: true` for smooth scroll-linked animation (no scroll-jacking)

### Marketing Pages

1. **Homepage** (`app/(marketing)/page.tsx`)

   - WebGL hero with "Artificial General Intelligence as a Service" tagline
   - Features grid (20 agents categorized: Coding, Ops, Analytics, Marketing)
   - Social proof section, CTA to dashboard signup

2. **Agents Catalog** (`app/(marketing)/agents/page.tsx`)

   - Parse `04_agents/agents_catalog.csv` → display cards
   - Filter by category (Coding, Admin/Ops, Analytics, Marketing/Creative)
   - Show connectors, triggers, KPIs per agent

3. **Pricing** (`app/(marketing)/pricing/page.tsx`)

   - 3-tier pricing cards (Starter, Pro, Enterprise)
   - Seat + usage hybrid model
   - Stripe Checkout integration

4. **About** (`app/(marketing)/about/page.tsx`)

   - Tech stack showcase, architecture diagram (use Mermaid if possible)
   - Team/mission placeholder content

### Responsive Image Pipeline

- Use Next.js `<Image>` with WebP optimization
- Implement `<picture>` elements with multiple sources for Canva assets (`02_canva/*.png`)
- Lazy loading with `loading="lazy"`
- Use placeholder images from `02_canva/` as starting assets

### Accessibility & Performance

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`
- Keyboard focus visible (2px #3BA0FF ring per brand guidelines)
- Skip-to-content link
- ARIA labels for interactive elements
- Target: Lighthouse 90+ Performance/Best Practices/SEO, 100 Accessibility

## Phase 3: Authentication & Multi-Tenancy (Clerk)

### Clerk Integration

- Install `@clerk/nextjs`, configure middleware
- Setup sign-in/sign-up flows with Clerk components
- Enable **organizations** for multi-tenancy
- Map Clerk `org_id` → Supabase `tenant_id` (RLS policies)

### Protected Routes

- Wrap `/dashboard` with Clerk auth check
- Implement role-based access (Admin, Member)
- Create user profile settings page

## Phase 4: Database Layer (Supabase)

### Schema Setup

- Parse `05_tech_stack/schema.sql` → apply to Supabase project
- Core tables:
  - `tenants` (org metadata, billing tier)
  - `agents` (20 agent configurations)
  - `runs` (execution logs, status, cost)
  - `events` (audit trail, telemetry)
  - `mcp_connectors` (GitHub, Stripe, etc. credentials per tenant)
- Enable **Row Level Security (RLS)** policies for tenant isolation
- Setup pgvector extension for agent memory/embeddings (optional Phase 5)

### Supabase Client

- Create `lib/db/supabase.ts` with server/client instances
- Implement helper functions: `createRun()`, `listAgents()`, `getOrgUsage()`

## Phase 5: Dashboard Application

### Dashboard Layout

- Sidebar navigation (Runs, Agents, Analytics, Settings, Billing)
- Breadcrumbs, user menu (Clerk UserButton)
- Dark-first theme with AGIS brand colors

### Key Dashboard Pages

1. **Runs Overview** (`/dashboard/page.tsx`)

   - Table of recent agent runs with status badges (pending, running, success, failed)
   - Filters: agent type, date range, status
   - Cost breakdown, usage stats

2. **Agent Management** (`/dashboard/agents/page.tsx`)

   - Grid of 20 agents from CSV (enable/disable per tenant)
   - Configure triggers (schedule, webhook, manual)
   - Set budgets, rate limits, scope whitelists

3. **Agent Detail** (`/dashboard/agents/[id]/page.tsx`)

   - Agent description, connectors, sample runs
   - "Run Now" button → trigger agent execution
   - Configuration form (cron schedule, budget cap, PII redaction toggle)

4. **Settings** (`/dashboard/settings/page.tsx`)

   - Organization details (Clerk sync)
   - MCP connector setup (GitHub token, Stripe keys, etc.)
   - Team members, roles

5. **Billing** (`/dashboard/billing/page.tsx`)

   - Current plan, usage meters (API calls, agent runs, storage)
   - Upgrade/downgrade CTAs → Stripe Customer Portal
   - Invoice history

### Real-Time Updates

- Use Supabase Realtime subscriptions for run status updates
- Toast notifications for completed runs

## Phase 6: API Layer (tRPC + Server Actions)

### tRPC Router Setup

- Create `app/api/trpc/[trpc]/route.ts`
- Routers:
  - `agents.list()`, `agents.getById()`, `agents.configure()`
  - `runs.create()`, `runs.list()`, `runs.getDetails()`
  - `billing.getUsage()`, `billing.createCheckout()`
  - `connectors.list()`, `connectors.authenticate()`

### Server Actions (Next.js 14)

- `createAgentRun()`: Validate budget → queue BullMQ job → return run ID
- `updateConnector()`: Store encrypted credentials in Supabase Vault

### Webhook Endpoints

- `POST /api/webhooks/stripe`: Handle subscription events, update tenant entitlements
- `POST /api/webhooks/clerk`: Sync org/user changes to Supabase

## Phase 7: Agent Runtime Orchestration

### BullMQ Worker Setup (Railway)

- Create `apps/worker/` directory with separate Node.js service
- Connect to Railway Redis
- Define job processor: `processAgentRun(job)`

### Agent Execution Logic

- Parse agent type from job data → load MCP connector
- Execute agent prompt (use Claude via Anthropic API)
- Tool calls routed through MCP connectors (GitHub, Stripe, etc.)
- Apply guardrails: budget cap (stop at threshold), scope whitelist (reject out-of-scope actions), PII redaction
- Human-in-the-loop: Pause run, send approval request (Slack/email), resume on approval
- Store run result in Supabase `runs` table

### Job Scheduling

- Parse agent triggers from CSV: schedule (cron), webhook, manual
- Use BullMQ repeat jobs for scheduled agents
- Expose webhook endpoints: `POST /api/webhooks/agents/[agentId]`

## Phase 8: Billing Integration (Stripe)

### Stripe Products & Prices

- Create 3 plans: Starter ($49/mo), Pro ($199/mo), Enterprise (custom)
- Metered usage billing for overages (API calls, agent runs)
- Setup subscription checkout with Stripe Checkout

### Usage Tracking

- After each agent run: calculate cost → send metered event to Stripe
- Cost formula: base fee + (tool calls × $0.01) + (tokens × $0.000002)

### Customer Portal

- Embed Stripe Customer Portal for self-service billing

## Phase 9: Observability & Monitoring

### OpenTelemetry Setup

- Install `@opentelemetry/api`, `@opentelemetry/sdk-node`
- Export traces/logs to Grafana Cloud or Honeycomb
- Instrument agent runs, API calls, database queries

### Dashboards (in app)

- Agent performance metrics: success rate, avg runtime, cost per run
- System health: API latency, worker queue depth, error rate
- Per-tenant analytics: run count, budget utilization

### Error Tracking

- Install Sentry for frontend + backend error monitoring
- Capture failed agent runs with full context

## Phase 10: Deployment & CI/CD

### Netlify Deployment (Frontend)

- Create `netlify.toml` with Next.js build settings
- Configure environment variables (Clerk, Supabase, Stripe public keys)
- Setup branch deploys for preview

### Railway Deployment (API + Workers)

- Deploy API service: Fastify HTTP server with tRPC
- Deploy worker service: BullMQ processor
- Provision Redis addon
- Configure secrets (Stripe secret key, Anthropic API key, Clerk secret)

### GitHub Actions CI/CD

- Lint, type-check, build on PR
- Deploy to Netlify (frontend) + Railway (backend) on merge to main
- Run E2E tests (Playwright) against staging environment

## Phase 11: Polish & Launch Prep

### Content Placeholders

- Replace all lorem ipsum with AGIS-specific copy
- Use tagline: "Artificial General Intelligence as a Service"
- Write agent descriptions (expand from CSV)

### Final QA Checklist

- [ ] All 20 agents visible in catalog
- [ ] WebGL hero performs smoothly (60fps)
- [ ] Scroll animations work, honor prefers-reduced-motion
- [ ] Lighthouse scores: 90+ across all metrics
- [ ] Clerk auth flow complete (sign up → dashboard)
- [ ] Stripe checkout works (test mode)
- [ ] Agent run can be triggered manually
- [ ] BullMQ job processes successfully
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Keyboard navigation functional
- [ ] Security headers configured (CSP, HSTS)

### Documentation

- Create `README.md` with setup instructions
- Document environment variables
- Write deployment guide
- Add MCP connector setup guide

---

**Technologies Used:**

- Next.js 14 (App Router, TypeScript, Server Actions)
- Three.js r169+ (WebGL hero background)
- GSAP + ScrollTrigger (scroll-driven animations)
- Tailwind CSS (styling with AGIS brand palette)
- Clerk (authentication, organizations, multi-tenancy)
- Supabase (PostgreSQL with RLS, Storage, Realtime)
- Stripe (subscription + usage billing)
- tRPC (type-safe API)
- BullMQ + Redis (job queue on Railway)
- OpenTelemetry (observability)
- Netlify (frontend hosting)
- Railway (backend services)

### To-dos

- [ ] Initialize Next.js 14 project with TypeScript, Tailwind, and install all dependencies (Three.js, GSAP, Radix UI, Clerk, Stripe, tRPC, Supabase)
- [ ] Copy brand assets to public/, configure Tailwind with AGIS palette, setup fonts (Inter, JetBrains Mono)
- [ ] Build WebGL hero canvas with Three.js - particle system, mouse parallax, prefers-reduced-motion support
- [ ] Implement GSAP ScrollTrigger effects - split-letter titles, section reveals, pinned image sequences
- [ ] Create marketing pages (Homepage, Agents catalog, Pricing, About) with responsive images and accessibility
- [ ] Setup Clerk authentication with organizations, protected routes, middleware configuration
- [ ] Apply schema.sql to Supabase, setup RLS policies for multi-tenancy, create Supabase client helpers
- [ ] Build dashboard shell with sidebar navigation, breadcrumbs, dark theme
- [ ] Create dashboard pages (Runs, Agents, Agent Detail, Settings, Billing) with real-time updates
- [ ] Setup tRPC routers for agents, runs, billing, connectors with server actions
- [ ] Integrate Stripe checkout, customer portal, webhook handling, usage metering
- [ ] Create BullMQ worker service for agent execution with MCP connectors, guardrails, job scheduling
- [ ] Add OpenTelemetry instrumentation, in-app analytics dashboards, Sentry error tracking
- [ ] Create netlify.toml, Railway configs, GitHub Actions CI/CD pipeline
- [ ] Final QA - Lighthouse audits, accessibility testing, content placeholders, documentation