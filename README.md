# AGIS Master Kit

Generated: 2025-10-16T03:40:59.540571Z

This bundle includes brand assets, Canva-ready images, Figma Tokens, Mermaid diagrams, 20-agent catalog, tech stack notes, minimal schema, and Claude Sonnet prompts.

## Import tips
- **Canva**: drag `02_canva/*.png` into a new design; duplicate and edit text.
- **Figma**: install Tokens Studio → import `01_figma/tokens.tokens.json`. Use Mermaid plugin to paste `*.mmd` diagrams.
- **Favicons/logos**: in `00_brand/`.
- **Prompts**: in `04_prompts/` (system + user template).

## Next steps
1. Wire Clerk + Stripe + Supabase using `05_tech_stack/env.sample`.
2. Create the 20 agent blueprints from `04_agents/agents_catalog.csv`.
3. Stand up workers on Railway (Redis, NATS optional).
4. Add OpenTelemetry export for traces/logs/metrics.
