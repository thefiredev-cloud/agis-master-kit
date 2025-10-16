import { createClient } from "@supabase/supabase-js";

// Server-side client with service role (bypass RLS)
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Client-side/Server-side client with RLS
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

// Database types
export interface Tenant {
  id: string;
  slug: string;
  created_at: string;
}

export interface User {
  id: string;
  tenant_id: string;
  email: string;
  role: "owner" | "admin" | "member";
  created_at: string;
}

export interface Agent {
  id: string;
  tenant_id: string;
  key: string;
  name: string;
  config: Record<string, unknown>;
  version: string;
  created_at: string;
}

export interface Run {
  id: string;
  agent_id: string;
  status: "queued" | "running" | "succeeded" | "failed" | "needs_review";
  started_at: string;
  finished_at?: string;
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  cost_cents: number;
}

export interface AuditLog {
  id: number;
  tenant_id: string;
  actor: string;
  action: string;
  target: string;
  context?: Record<string, unknown>;
  at: string;
}

