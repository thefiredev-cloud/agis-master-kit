/**
 * AGIS Platform - MCP Connector Integration
 *
 * This module provides the connector registry and execution engine
 * for integrating AGIS agents with MCP (Model Context Protocol) tools.
 *
 * Currently Supported MCP Connectors:
 * - GitHub (code management, PRs, issues)
 * - Stripe (billing, subscriptions, customers)
 * - Supabase (database, storage, auth)
 * - Netlify (deployments, site management)
 * - Clerk (authentication, organizations)
 * - Chrome DevTools (browser automation, performance)
 *
 * Coming Soon:
 * - Slack, Gmail, Google Calendar, Notion, PagerDuty, macOS Automator
 */

export * from './types';
export * from './registry';
export * from './executor';

export {
  MCP_CONNECTORS,
  AGENT_CONNECTOR_MAP,
  getAgentConnectors,
  isAgentFullySupported,
  getMissingConnectors,
  getFullySupportedAgents,
  getAgentReadinessSummary,
} from './registry';

export { AgentExecutor } from './executor';
