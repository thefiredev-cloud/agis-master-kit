# Netlify Deployment Setup

Your AGIS Platform is ready to deploy! Follow these steps to connect your GitHub repository to Netlify for automatic deployments.

## Step 1: Push Code to GitHub

If you haven't already, push your code to GitHub:

```bash
cd /path/to/agis-platform
git push origin main
```

## Step 2: Connect Repository to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"New site from Git"** (or navigate to your existing `agis-platform` site)
3. Click **"Connect to Git"**
4. Select **GitHub**
5. Search for your repository (e.g., `agis-platform`)
6. Click **"Deploy site"**

## Step 3: Configure Build Settings

Netlify should auto-detect your `netlify.toml` configuration. Verify:

**Build settings:**
- Build command: `npm ci && npm run build`
- Publish directory: `.next`
- Node version: 20 (set in netlify.toml)

## Step 4: Set Environment Variables in Netlify Dashboard

1. Go to **Site settings → Environment variables**
2. Add the following variables (copy from your `.env.local`):

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cmlnaHQtbWFjYXF1ZS0zNy5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_MOKnv3g6HW6ttqurCokDTMDbwsbm4BVOhsIsDDQ1IY

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://wkwmqtntmvtgxibyvcap.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrd21xdG50bXZ0Z3hpYnl2Y2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1OTM1NTgsImV4cCI6MjA3NjE2OTU1OH0.uUdsRB8KxmfOROG2OtstI6FGPw3U55TfiVhCikPM7io
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrd21xdG50bXZ0Z3hpYnl2Y2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDU5MzU1OCwiZXhwIjoyMDc2MTY5NTU4fQ.testservicerolekey

# Stripe (get from your dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51QXB1ICpQQvQZ8wXBkOXqZxQvQZ8wXBkOXqZxQvQZ8wXBkOXqZx
STRIPE_SECRET_KEY=sk_test_51QXB1ICpQQvQZ8wXBkOXqZxQvQZ8wXBkOXqZxQvQZ8wXBkOXqZx
STRIPE_WEBHOOK_SECRET=whsec_test_51QXB1ICpQQvQZ8wXBkOXqZxQvQZ8wXBkOXqZx
```

## Step 5: Trigger Deploy

1. Netlify should automatically start building
2. Monitor progress in the **Deploys** tab
3. Once build completes, you'll see your site live at `https://agis-platform.netlify.app`

## Step 6: Verify Deployment

Visit your site:
- 🌍 **https://agis-platform.netlify.app**

Check that:
- ✅ Homepage loads with WebGL animations
- ✅ Agent catalog displays 20 agents
- ✅ Navigation works smoothly
- ✅ Pricing page functional
- ✅ About page visible

## Troubleshooting

If build fails:

1. Check **Deploys** tab for error logs
2. Common issues:
   - Missing environment variables → Add them in Site settings
   - Node version mismatch → Set to 20 in netlify.toml
   - Legacy peer deps → Already handled with `--legacy-peer-deps` flag

## Next Deploys

Once connected, every time you push to `main`:
```bash
git push origin main
```

Netlify will automatically:
1. Pull latest code
2. Run `npm ci && npm run build`
3. Deploy to production

## Custom Domain (Optional)

1. Go to **Site settings → Domain management**
2. Add your custom domain
3. Configure DNS (instructions provided by Netlify)
4. Enable HTTPS (automatic with Netlify)

---

**Your site is production-ready! 🚀**
