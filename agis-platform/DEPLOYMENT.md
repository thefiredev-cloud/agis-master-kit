# AGIS Platform Deployment Guide

Complete guide for deploying AGIS to production on Netlify with Supabase, Clerk, and Stripe.

## 📋 Pre-Deployment Checklist

- [ ] Supabase project created and schema applied
- [ ] Clerk application configured with organizations
- [ ] Stripe products and prices created
- [ ] Environment variables documented
- [ ] Database RLS policies enabled
- [ ] Webhooks configured (Clerk, Stripe)

## 🗄️ 1. Supabase Setup

### Create Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Set project name: `agis-platform`
4. Set database password (save securely)
5. Choose region closest to users

### Apply Schema

```sql
-- Copy from ../05_tech_stack/schema.sql
-- Run in Supabase SQL Editor

create table tenants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  created_at timestamptz default now()
);

create table users (
  id uuid primary key,
  tenant_id uuid references tenants(id) on delete cascade,
  email text not null,
  role text check (role in ('owner','admin','member')) not null,
  created_at timestamptz default now()
);

create table agents (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id) on delete cascade,
  key text not null,
  name text not null,
  config jsonb not null default '{}',
  version text not null default '1.0.0',
  created_at timestamptz default now()
);

create table runs (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id) on delete cascade,
  status text check (status in ('queued','running','succeeded','failed','needs_review')) not null,
  started_at timestamptz default now(),
  finished_at timestamptz,
  inputs jsonb,
  outputs jsonb,
  cost_cents int default 0
);

create table audit_log (
  id bigserial primary key,
  tenant_id uuid references tenants(id) on delete cascade,
  actor text,
  action text,
  target text,
  context jsonb,
  at timestamptz default now()
);
```

### Enable RLS Policies

```sql
-- Enable RLS
alter table tenants enable row level security;
alter table users enable row level security;
alter table agents enable row level security;
alter table runs enable row level security;
alter table audit_log enable row level security;

-- Sample RLS policy (expand based on needs)
create policy "Users can view own tenant data"
  on users for select
  using (auth.uid() = id);

create policy "Tenants can manage own agents"
  on agents for all
  using (tenant_id in (
    select tenant_id from users where id = auth.uid()
  ));
```

### Get Credentials

1. Go to Project Settings → API
2. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

## 🔐 2. Clerk Setup

### Create Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create new application
3. Choose "Next.js" as framework
4. Enable **Organizations** feature

### Configure URLs

In Clerk Dashboard → Paths:

```
Home URL: https://your-domain.com
Sign-in URL: /sign-in
Sign-up URL: /sign-up
After sign-in URL: /dashboard
After sign-up URL: /dashboard
```

### Enable Organizations

1. Go to Organizations tab
2. Enable organization creation
3. Set max members per org (or unlimited)
4. Configure roles: Owner, Admin, Member

### Get API Keys

1. Go to API Keys tab
2. Copy:
   - Publishable Key → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Secret Key → `CLERK_SECRET_KEY`

### Configure Webhooks

1. Go to Webhooks tab
2. Add endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Subscribe to events:
   - `user.created`
   - `user.updated`
   - `organization.created`
   - `organization.updated`
   - `organizationMembership.created`
4. Copy Signing Secret for verification

## 💳 3. Stripe Setup

### Create Products

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Products → Add Product

**Starter Plan**
- Name: AGIS Starter
- Price: $49/month
- Billing: Recurring monthly

**Pro Plan**
- Name: AGIS Pro
- Price: $199/month
- Billing: Recurring monthly

**Enterprise Plan**
- Name: AGIS Enterprise
- Price: Custom
- Contact sales

### Configure Metered Billing

1. Add usage-based component
2. Metric: Agent Runs
3. Price: $0.10 per run (100 cents per 1000 runs)

### Setup Webhooks

1. Developers → Webhooks → Add endpoint
2. URL: `https://your-domain.com/api/webhooks/stripe`
3. Events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `invoice.finalized`
4. Copy Webhook Signing Secret

### Get API Keys

1. Developers → API keys
2. Copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
   - Webhook secret → `STRIPE_WEBHOOK_SECRET`

## 🌐 4. Netlify Deployment

### Connect Repository

1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. New site from Git
4. Connect to GitHub repo
5. Select `agis-platform` repository

### Configure Build Settings

```
Build command: npm run build
Publish directory: .next
```

### Set Environment Variables

Go to Site settings → Environment variables:

```bash
# App
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Optional: AI Providers
MODEL_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-xxx
OPENAI_API_KEY=sk-xxx

# Optional: Observability
OTEL_EXPORTER_OTLP_ENDPOINT=https://api.honeycomb.io
OTEL_SERVICE_NAME=agis-platform
```

### Deploy

1. Click "Deploy site"
2. Wait for build to complete (~5 minutes)
3. Check deploy logs for errors
4. Visit your site!

### Configure Custom Domain

1. Site settings → Domain management
2. Add custom domain
3. Configure DNS:
   - CNAME record: `www` → `your-site.netlify.app`
   - A record: `@` → Netlify Load Balancer IP
4. Enable HTTPS (automatic with Netlify)

## 🧪 5. Post-Deployment Testing

### Test Authentication

1. Visit `/sign-up`
2. Create test account
3. Verify redirect to `/dashboard`
4. Check Supabase users table
5. Check Clerk dashboard

### Test Stripe Checkout

1. Visit `/pricing`
2. Click "Get Started"
3. Use test card: `4242 4242 4242 4242`
4. Complete checkout
5. Verify subscription in Stripe dashboard
6. Check webhook received

### Test Dashboard

1. Navigate to `/dashboard`
2. Check runs table renders
3. Navigate to `/dashboard/agents`
4. Verify all 20 agents display
5. Check filters work

### Performance Testing

1. Run Lighthouse audit
2. Target scores:
   - Performance: 90+
   - Accessibility: 100
   - Best Practices: 90+
   - SEO: 90+
3. Test on mobile devices
4. Verify WebGL hero performs at 60fps

## 🔄 6. Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Branch Previews

Netlify automatically creates preview deploys for:
- Pull requests
- Feature branches
- Each gets unique URL

## 📊 7. Monitoring & Observability

### Netlify Analytics

- Enable Netlify Analytics
- Track page views, unique visitors
- Monitor Core Web Vitals

### Supabase Monitoring

- Database usage and connections
- API request volume
- Storage usage

### Stripe Dashboard

- Revenue tracking
- Customer metrics
- Subscription analytics

### Error Tracking

Consider adding Sentry:

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## 🚨 Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
netlify build --clear-cache

# Check logs
netlify logs
```

### Authentication Issues

- Verify Clerk webhook is receiving events
- Check Clerk API key environment variables
- Ensure redirect URLs match production domain

### Database Connection

- Test Supabase connection string
- Verify RLS policies don't block queries
- Check service role key is set correctly

### Stripe Webhooks

- Verify webhook URL is accessible
- Check webhook signing secret matches
- Test webhooks in Stripe dashboard

## ✅ Production Checklist

- [ ] All environment variables set in Netlify
- [ ] Custom domain configured with HTTPS
- [ ] Clerk webhooks receiving events
- [ ] Stripe webhooks receiving events
- [ ] Database RLS policies tested
- [ ] Lighthouse scores meet targets
- [ ] Error tracking configured
- [ ] Analytics enabled
- [ ] Backup strategy in place
- [ ] Documentation updated

## 🎉 You're Live!

Your AGIS platform is now deployed and ready for users. Monitor your dashboards and iterate based on usage patterns.

---

**Need help?** Check Netlify/Supabase/Clerk docs or contact support.

