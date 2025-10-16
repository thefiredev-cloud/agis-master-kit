"use client";

import { useState } from "react";
import { Zap, Play, Settings2, Search } from "lucide-react";
import Link from "next/link";

// Agent data from catalog
const agentsData = [
  {
    id: "code-refactorer",
    name: "Code Refactorer",
    category: "Coding",
    description: "Refactors repo modules, updates docs, opens PRs.",
    enabled: true,
    lastRun: "2 hours ago",
    runCount: 145,
  },
  {
    id: "pr-reviewer",
    name: "PR Reviewer",
    category: "Coding",
    description: "LLM-assisted code review and SAST hints.",
    enabled: true,
    lastRun: "45 minutes ago",
    runCount: 89,
  },
  {
    id: "spec-to-scaffold",
    name: "Spec-to-Scaffold",
    category: "Coding",
    description: "Converts spec tickets into repo scaffolds with tests.",
    enabled: false,
    lastRun: "Never",
    runCount: 0,
  },
  {
    id: "dependency-sentinel",
    name: "Dependency Sentinel",
    category: "Coding",
    description: "Monitors CVEs, opens version-bump PRs.",
    enabled: true,
    lastRun: "1 day ago",
    runCount: 234,
  },
  {
    id: "docs-syncer",
    name: "Docs Syncer",
    category: "Coding",
    description: "Syncs code comments → docs site/Notion.",
    enabled: true,
    lastRun: "3 hours ago",
    runCount: 67,
  },
  {
    id: "approvals-router",
    name: "Approvals Router",
    category: "Admin/Ops",
    description: "Routes expense/leave approvals via Slack + email.",
    enabled: true,
    lastRun: "10 minutes ago",
    runCount: 412,
  },
  {
    id: "calendar-concierge",
    name: "Calendar Concierge",
    category: "Admin/Ops",
    description: "Lays out meeting options, resolves conflicts.",
    enabled: false,
    lastRun: "Never",
    runCount: 0,
  },
  {
    id: "vendor-intake",
    name: "Vendor Intake",
    category: "Admin/Ops",
    description: "Reads PDFs/forms, creates vendor records.",
    enabled: true,
    lastRun: "5 hours ago",
    runCount: 23,
  },
  {
    id: "ticket-triage",
    name: "Ticket Triage",
    category: "Admin/Ops",
    description: "Sorts inbound tickets, tags, assigns.",
    enabled: true,
    lastRun: "30 minutes ago",
    runCount: 567,
  },
  {
    id: "ops-runbook",
    name: "Ops Runbook",
    category: "Admin/Ops",
    description: "Detects alerts → runs scripted automations.",
    enabled: false,
    lastRun: "Never",
    runCount: 0,
  },
  {
    id: "kpi-pipeline",
    name: "KPI Pipeline",
    category: "Analytics",
    description: "Ingests CSV/DB → computes KPIs/dashboards.",
    enabled: true,
    lastRun: "1 hour ago",
    runCount: 892,
  },
  {
    id: "forecaster",
    name: "Forecaster",
    category: "Analytics",
    description: "Time-series forecasts for revenue/usage.",
    enabled: true,
    lastRun: "6 hours ago",
    runCount: 145,
  },
  {
    id: "experiment-analyst",
    name: "Experiment Analyst",
    category: "Analytics",
    description: "AB test analysis and recommendations.",
    enabled: false,
    lastRun: "Never",
    runCount: 0,
  },
  {
    id: "churn-watch",
    name: "Churn Watch",
    category: "Analytics",
    description: "Flags churn risk cohorts; triggers outreach.",
    enabled: true,
    lastRun: "4 hours ago",
    runCount: 234,
  },
  {
    id: "unit-economics",
    name: "Unit Economics",
    category: "Analytics",
    description: "CAC/LTV/Payback analysis by segment.",
    enabled: true,
    lastRun: "8 hours ago",
    runCount: 67,
  },
  {
    id: "campaign-builder",
    name: "Campaign Builder",
    category: "Marketing/Creative",
    description: "Generates multi-channel campaigns + calendars.",
    enabled: true,
    lastRun: "2 days ago",
    runCount: 34,
  },
  {
    id: "seo-optimizer",
    name: "SEO/AEO Optimizer",
    category: "Marketing/Creative",
    description: "Optimizes pages for search and agents.",
    enabled: true,
    lastRun: "1 day ago",
    runCount: 123,
  },
  {
    id: "content-studio",
    name: "Content Studio",
    category: "Marketing/Creative",
    description: "Brief → outlines → drafts → assets.",
    enabled: false,
    lastRun: "Never",
    runCount: 0,
  },
  {
    id: "outbound-prospector",
    name: "Outbound Prospector",
    category: "Marketing/Creative",
    description: "Builds ICP lists, drafts emails.",
    enabled: true,
    lastRun: "12 hours ago",
    runCount: 78,
  },
  {
    id: "release-notes",
    name: "Release Notes",
    category: "Marketing/Creative",
    description: "Aggregates merged PRs into customer-facing notes.",
    enabled: true,
    lastRun: "3 days ago",
    runCount: 45,
  },
];

const categories = [
  "All",
  "Coding",
  "Admin/Ops",
  "Analytics",
  "Marketing/Creative",
];

export default function AgentsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAgents = agentsData.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || agent.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "enabled" && agent.enabled) ||
      (statusFilter === "disabled" && !agent.enabled);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const enabledCount = agentsData.filter((a) => a.enabled).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Agent Management</h1>
          <p className="text-text-secondary">
            Configure and monitor your 20 specialized agents
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-muted">Active:</span>
          <span className="font-bold text-accent">{enabledCount}</span>
          <span className="text-text-muted">/</span>
          <span className="font-bold">{agentsData.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            size={20}
          />
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category and Status Filters */}
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-sm text-text-muted mb-2 block">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    categoryFilter === category
                      ? "bg-primary text-white"
                      : "bg-bg text-text-secondary hover:bg-surface-alt border border-border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-text-muted mb-2 block">Status</label>
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "all"
                    ? "bg-primary text-white"
                    : "bg-bg text-text-secondary hover:bg-surface-alt border border-border"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("enabled")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "enabled"
                    ? "bg-primary text-white"
                    : "bg-bg text-text-secondary hover:bg-surface-alt border border-border"
                }`}
              >
                Enabled
              </button>
              <button
                onClick={() => setStatusFilter("disabled")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "disabled"
                    ? "bg-primary text-white"
                    : "bg-bg text-text-secondary hover:bg-surface-alt border border-border"
                }`}
              >
                Disabled
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className={`bg-surface border rounded-xl p-6 transition-all ${
              agent.enabled
                ? "border-border hover:border-primary/50"
                : "border-border/50 opacity-75"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    agent.enabled ? "bg-primary/10" : "bg-text-muted/10"
                  }`}
                >
                  <Zap
                    size={20}
                    className={agent.enabled ? "text-primary" : "text-text-muted"}
                  />
                </div>
                <span className="text-xs font-medium text-text-muted uppercase">
                  {agent.category}
                </span>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  agent.enabled
                    ? "bg-accent/10 text-accent"
                    : "bg-text-muted/10 text-text-muted"
                }`}
              >
                {agent.enabled ? "Active" : "Disabled"}
              </div>
            </div>

            <h3 className="text-lg font-bold mb-2">{agent.name}</h3>
            <p className="text-text-secondary text-sm mb-4">{agent.description}</p>

            <div className="flex items-center justify-between text-sm mb-4">
              <div>
                <p className="text-text-muted">Last run</p>
                <p className="font-medium">{agent.lastRun}</p>
              </div>
              <div className="text-right">
                <p className="text-text-muted">Total runs</p>
                <p className="font-medium">{agent.runCount}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/dashboard/agents/${agent.id}`}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center text-sm font-medium"
              >
                <Settings2 size={16} className="inline mr-1" />
                Configure
              </Link>
              <button className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium">
                <Play size={16} className="inline" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted">No agents found matching your filters</p>
        </div>
      )}
    </div>
  );
}

