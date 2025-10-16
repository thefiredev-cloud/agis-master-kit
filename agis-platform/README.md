# AGIS Platform

**Artificial General Intelligence as a Service** - Multi-tenant agent orchestration platform with 20+ specialized AI agents.

## 🚀 Features

- **WebGL Hero Canvas**: Stunning Three.js particle system with mouse parallax
- **Scroll-Driven Animations**: GSAP ScrollTrigger with split-letter reveals and section transitions
- **20 Specialized Agents**: Coding, Admin/Ops, Analytics, and Marketing/Creative agents
- **Multi-Tenant Dashboard**: Runs overview, agent management, analytics, and billing
- **Enterprise Security**: Clerk authentication, Supabase RLS, budget controls
- **Usage-Based Billing**: Stripe integration with transparent pricing

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - App Router, TypeScript, Server Actions
- **Three.js r169** - WebGL hero background
- **GSAP + ScrollTrigger** - Scroll-linked animations
- **Tailwind CSS** - Styling with custom AGIS brand palette
- **Radix UI** - Accessible component primitives
- **Clerk** - Authentication & organizations

### Backend
- **Supabase** - PostgreSQL with Row Level Security
- **tRPC** - Type-safe API layer
- **Stripe** - Subscription and usage billing
- **OpenTelemetry** - Observability (planned)

### Deployment
- **Netlify** - Frontend hosting
- **Railway** - Worker services (planned)

## 🎨 Brand Colors

```css
--bg: #0B0F14
--surface: #121923
--primary: #3BA0FF
--accent: #7AE2B3
--text-primary: #E6EDF3
```

## 🏃 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- Supabase account
- Clerk account
- Stripe account

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Configure your environment variables
# - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# - CLERK_SECRET_KEY
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# - STRIPE_SECRET_KEY
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Database Setup

1. Create a Supabase project
2. Run the schema migration from `../05_tech_stack/schema.sql`
3. Enable Row Level Security (RLS) policies
4. Configure your connection strings in `.env.local`

### Clerk Setup

1. Create a Clerk application
2. Enable organizations for multi-tenancy
3. Configure redirect URLs:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`
4. Add Clerk keys to `.env.local`

### Stripe Setup

1. Create Stripe products for your pricing tiers
2. Set up webhooks pointing to `/api/webhooks/stripe`
3. Configure webhook events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Add Stripe keys to `.env.local`

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

```bash
# Connect your repository to Netlify
netlify init

# Configure environment variables in Netlify dashboard
# Deploy
netlify deploy --prod
```

## 🎯 Project Structure

```
agis-platform/
├── app/
│   ├── (marketing)/         # Public marketing pages
│   │   ├── page.tsx         # Homepage with WebGL hero
│   │   ├── agents/          # Agent catalog
│   │   ├── pricing/         # Pricing page
│   │   └── about/           # About page
│   ├── dashboard/           # Protected dashboard
│   │   ├── page.tsx         # Runs overview
│   │   ├── agents/          # Agent management
│   │   ├── analytics/       # Analytics dashboard
│   │   ├── settings/        # Organization settings
│   │   └── billing/         # Billing & usage
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/
│   ├── marketing/           # Marketing components
│   │   ├── HeroCanvas.tsx   # Three.js WebGL canvas
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── dashboard/           # Dashboard components
│   │   └── DashboardNav.tsx
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── three/               # Three.js utilities
│   ├── animations/          # GSAP scroll animations
│   ├── trpc/                # tRPC setup
│   ├── db/                  # Supabase client
│   └── utils.ts             # Helper functions
├── public/
│   ├── brand/               # Logo, favicon, palette
│   └── images/              # Canva assets
├── middleware.ts            # Clerk auth middleware
└── tailwind.config.ts       # Tailwind configuration
```

## 🎬 Marketing Pages

- **Homepage** (`/`) - WebGL hero, feature grid, agent categories
- **Agents** (`/agents`) - Searchable catalog with 20 agents
- **Pricing** (`/pricing`) - Three-tier pricing with FAQs
- **About** (`/about`) - Tech stack and architecture

## 🎛️ Dashboard Pages

- **Overview** (`/dashboard`) - Runs table, stats, cost tracking
- **Agents** (`/dashboard/agents`) - Enable/disable, configure agents
- **Analytics** (`/dashboard/analytics`) - Performance metrics (planned)
- **Settings** (`/dashboard/settings`) - Org and connector setup (planned)
- **Billing** (`/dashboard/billing`) - Usage and invoices (planned)

## ♿ Accessibility

- Semantic HTML throughout
- WCAG AA compliant color contrast (4.5:1+)
- Keyboard navigation support
- `prefers-reduced-motion` respected
- Focus indicators visible
- ARIA labels on interactive elements

## 🎨 Visual Effects

### WebGL Hero
- Three.js particle system with 2000 particles
- Mouse parallax camera movement
- AGIS brand colors (#3BA0FF, #7AE2B3)
- Performance optimized (60fps target)

### Scroll Animations
- Split-letter text reveals
- Fade-up section transitions
- Smooth scroll-linked effects (no scroll-jacking)
- Reduced motion support

## 📊 Performance Targets

- **Performance**: 90+
- **Best Practices**: 90+
- **Accessibility**: 100
- **SEO**: 90+

## 🔐 Security

- Multi-tenant isolation with Supabase RLS
- Clerk authentication with organizations
- Budget caps and rate limiting
- PII redaction capabilities
- Encrypted credentials storage

## 📝 License

Proprietary - All rights reserved

## 🙏 Acknowledgments

Built with:
- Brand assets from `00_brand/`
- Agent catalog from `04_agents/agents_catalog.csv`
- Schema from `05_tech_stack/schema.sql`
- Canva templates from `02_canva/`

---

**Need Help?** Contact the team or check the documentation.
