/**
 * Type definitions for AGIS Agent Execution
 */

export type AgentCategory = 'Coding' | 'Admin/Ops' | 'Analytics' | 'Marketing/Creative';

export type AgentStatus = 'queued' | 'running' | 'succeeded' | 'failed' | 'needs_review';

export type TriggerType = 'schedule' | 'webhook' | 'manual' | 'stream';

export interface AgentConfig {
  category: AgentCategory;
  description: string;
  connectors: string[];
  triggers: TriggerType[];
  kpis: string;

  // Execution config
  budget?: {
    maxCostCents?: number;
    maxDurationMs?: number;
    maxToolCalls?: number;
  };

  // Security config
  scope?: {
    allowedActions?: string[];
    deniedActions?: string[];
    requiresApproval?: boolean;
  };

  // PII handling
  piiRedaction?: {
    enabled: boolean;
    patterns?: string[];
  };

  // Schedule config (if trigger includes 'schedule')
  schedule?: {
    cron?: string;
    timezone?: string;
  };
}

export interface AgentRun {
  id: string;
  agentId: string;
  status: AgentStatus;
  startedAt: Date;
  finishedAt?: Date;
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  costCents: number;

  // Execution metadata
  toolCalls?: number;
  tokensUsed?: number;
  errors?: string[];
}

export interface AgentExecutionContext {
  agentKey: string;
  agentName: string;
  tenantId: string;
  runId: string;
  inputs: Record<string, unknown>;
  config: AgentConfig;
}

export interface ConnectorCredentials {
  tenantId: string;
  connectorType: string;
  credentials: Record<string, string>;
  expiresAt?: Date;
}
