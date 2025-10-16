/**
 * MCP Connector Registry
 * Maps AGIS agents to their MCP tool implementations
 *
 * Available MCP Connectors:
 * - GitHub (mcp__github__*)
 * - Stripe (mcp__stripe__*)
 * - Supabase (mcp__supabase__*)
 * - Netlify (mcp__netlify__*)
 * - Clerk (mcp__clerk__*)
 * - Chrome DevTools (mcp__chrome-devtools__*)
 */

export type MCPConnectorType =
  | 'github'
  | 'stripe'
  | 'supabase'
  | 'netlify'
  | 'clerk'
  | 'chrome-devtools'
  | 'slack'
  | 'gmail'
  | 'google'
  | 'notion'
  | 'pagerduty'
  | 'macos_automator';

export interface MCPConnectorConfig {
  type: MCPConnectorType;
  available: boolean;
  mcpPrefix?: string;
  requiredEnvVars: string[];
  scopes?: string[];
}

/**
 * Registry of all available MCP connectors
 */
export const MCP_CONNECTORS: Record<MCPConnectorType, MCPConnectorConfig> = {
  github: {
    type: 'github',
    available: true,
    mcpPrefix: 'mcp__github__',
    requiredEnvVars: ['GITHUB_TOKEN'],
    scopes: ['repo', 'write:org', 'read:user'],
  },
  stripe: {
    type: 'stripe',
    available: true,
    mcpPrefix: 'mcp__stripe__',
    requiredEnvVars: ['STRIPE_SECRET_KEY'],
    scopes: [],
  },
  supabase: {
    type: 'supabase',
    available: true,
    mcpPrefix: 'mcp__supabase__',
    requiredEnvVars: ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'],
    scopes: [],
  },
  netlify: {
    type: 'netlify',
    available: true,
    mcpPrefix: 'mcp__netlify__',
    requiredEnvVars: ['NETLIFY_AUTH_TOKEN'],
    scopes: [],
  },
  clerk: {
    type: 'clerk',
    available: true,
    mcpPrefix: 'mcp__clerk__',
    requiredEnvVars: ['CLERK_SECRET_KEY'],
    scopes: [],
  },
  'chrome-devtools': {
    type: 'chrome-devtools',
    available: true,
    mcpPrefix: 'mcp__chrome-devtools__',
    requiredEnvVars: [],
    scopes: [],
  },
  slack: {
    type: 'slack',
    available: false, // TODO: Add MCP integration
    requiredEnvVars: ['SLACK_BOT_TOKEN'],
    scopes: ['chat:write', 'channels:read', 'users:read'],
  },
  gmail: {
    type: 'gmail',
    available: false, // TODO: Add MCP integration
    requiredEnvVars: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    scopes: ['gmail.send', 'gmail.readonly'],
  },
  google: {
    type: 'google',
    available: false, // TODO: Add MCP integration
    requiredEnvVars: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    scopes: ['calendar', 'drive'],
  },
  notion: {
    type: 'notion',
    available: false, // TODO: Add MCP integration
    requiredEnvVars: ['NOTION_API_KEY'],
    scopes: [],
  },
  pagerduty: {
    type: 'pagerduty',
    available: false, // TODO: Add MCP integration
    requiredEnvVars: ['PAGERDUTY_API_KEY'],
    scopes: [],
  },
  macos_automator: {
    type: 'macos_automator',
    available: false, // TODO: Add MCP integration
    requiredEnvVars: [],
    scopes: [],
  },
};

/**
 * Agent-to-Connector mapping
 * Maps each agent key to its required connectors
 */
export const AGENT_CONNECTOR_MAP: Record<string, MCPConnectorType[]> = {
  // Coding Agents
  'code-refactorer': ['github'],
  'spec-to-scaffold': ['github'],
  'pr-reviewer': ['github'],
  'dependency-sentinel': ['github'],
  'docs-syncer': ['github', 'notion'],

  // Admin/Ops Agents
  'approvals-router': ['slack', 'gmail'],
  'calendar-concierge': ['google'],
  'vendor-intake': ['google', 'notion'],
  'ticket-triage': ['slack', 'github'],
  'ops-runbook': ['pagerduty', 'macos_automator'],

  // Analytics Agents
  'kpi-pipeline': ['supabase'],
  'forecaster': ['supabase'],
  'experiment-analyst': ['supabase'],
  'churn-watch': ['stripe', 'supabase'],
  'unit-economics': ['stripe', 'supabase'],

  // Marketing/Creative Agents
  'campaign-builder': ['slack', 'notion'],
  'seo-aeo-optimizer': ['netlify', 'chrome-devtools'],
  'content-studio': ['notion'],
  'outbound-prospector': ['gmail'],
  'release-notes': ['github', 'netlify'],
};

/**
 * Get available connectors for an agent
 */
export function getAgentConnectors(agentKey: string): MCPConnectorConfig[] {
  const connectorTypes = AGENT_CONNECTOR_MAP[agentKey] || [];
  return connectorTypes.map((type) => MCP_CONNECTORS[type]);
}

/**
 * Check if an agent has all required connectors available
 */
export function isAgentFullySupported(agentKey: string): boolean {
  const connectors = getAgentConnectors(agentKey);
  return connectors.every((connector) => connector.available);
}

/**
 * Get missing connectors for an agent
 */
export function getMissingConnectors(agentKey: string): MCPConnectorType[] {
  const connectors = getAgentConnectors(agentKey);
  return connectors
    .filter((connector) => !connector.available)
    .map((connector) => connector.type);
}

/**
 * Get all fully supported agents
 */
export function getFullySupportedAgents(): string[] {
  return Object.keys(AGENT_CONNECTOR_MAP).filter(isAgentFullySupported);
}

/**
 * Get agent readiness summary
 */
export function getAgentReadinessSummary() {
  const allAgents = Object.keys(AGENT_CONNECTOR_MAP);
  const fullySupported = getFullySupportedAgents();
  const partiallySupported = allAgents.filter(
    (key) => !isAgentFullySupported(key)
  );

  return {
    total: allAgents.length,
    fullySupported: fullySupported.length,
    partiallySupported: partiallySupported.length,
    agents: {
      ready: fullySupported,
      pending: partiallySupported,
    },
  };
}
