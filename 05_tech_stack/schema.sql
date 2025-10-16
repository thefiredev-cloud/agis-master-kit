-- Minimal Postgres schema (Supabase, with RLS to enforce tenancy)
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
  key text not null, -- e.g. 'code-refactorer'
  name text not null,
  config jsonb not null default '{}', -- tool scopes, triggers
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
  actor text, -- user or system
  action text,
  target text,
  context jsonb,
  at timestamptz default now()
);
