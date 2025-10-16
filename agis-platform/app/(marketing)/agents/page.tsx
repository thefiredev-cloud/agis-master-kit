"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Zap, Filter } from "lucide-react";
import { animateFadeUp, initScrollAnimations } from "@/lib/animations/scroll-animations";

// Agent data (hardcoded from CSV since server components can't be used with animations)
const agentsData = [
  {
    category: "Coding",
    name: "Code Refactorer",
    description: "Refactors repo modules, updates docs, opens PRs.",
    connectors: ["github"],
    triggers: "schedule/webhook",
    kpis: "Merged PRs, lint/CI pass rate",
  },
  {
    category: "Coding",
    name: "Spec-to-Scaffold",
    description: "Converts spec tickets into repo scaffolds with tests.",
    connectors: ["github"],
    triggers: "webhook",
    kpis: "Lead time reduced",
  },
  {
    category: "Coding",
    name: "PR Reviewer",
    description: "LLM-assisted code review and SAST hints.",
    connectors: ["github"],
    triggers: "webhook",
    kpis: "Defect density, review time",
  },
  {
    category: "Coding",
    name: "Dependency Sentinel",
    description: "Monitors CVEs, opens version-bump PRs.",
    connectors: ["github"],
    triggers: "schedule",
    kpis: "Vuln MTTR",
  },
  {
    category: "Coding",
    name: "Docs Syncer",
    description: "Syncs code comments → docs site/Notion.",
    connectors: ["github", "notion"],
    triggers: "schedule",
    kpis: "Docs freshness",
  },
  {
    category: "Admin/Ops",
    name: "Approvals Router",
    description: "Routes expense/leave approvals via Slack + email.",
    connectors: ["slack", "gmail"],
    triggers: "webhook",
    kpis: "Approval latency",
  },
  {
    category: "Admin/Ops",
    name: "Calendar Concierge",
    description: "Lays out meeting options, resolves conflicts.",
    connectors: ["google"],
    triggers: "webhook",
    kpis: "Scheduling success",
  },
  {
    category: "Admin/Ops",
    name: "Vendor Intake",
    description: "Reads PDFs/forms, creates vendor records.",
    connectors: ["google", "notion"],
    triggers: "webhook",
    kpis: "Onboarding time",
  },
  {
    category: "Admin/Ops",
    name: "Ticket Triage",
    description: "Sorts inbound tickets, tags, assigns.",
    connectors: ["slack", "github"],
    triggers: "webhook",
    kpis: "First response time",
  },
  {
    category: "Admin/Ops",
    name: "Ops Runbook",
    description: "Detects alerts → runs scripted automations.",
    connectors: ["pagerduty", "macos_automator"],
    triggers: "stream",
    kpis: "Auto-resolve rate",
  },
  {
    category: "Analytics",
    name: "KPI Pipeline",
    description: "Ingests CSV/DB → computes KPIs/dashboards.",
    connectors: ["supabase"],
    triggers: "schedule",
    kpis: "Pipeline freshness",
  },
  {
    category: "Analytics",
    name: "Forecaster",
    description: "Time-series forecasts for revenue/usage.",
    connectors: ["supabase"],
    triggers: "schedule",
    kpis: "MAE/MAPE",
  },
  {
    category: "Analytics",
    name: "Experiment Analyst",
    description: "AB test analysis and recommendations.",
    connectors: ["supabase"],
    triggers: "schedule",
    kpis: "Uplift CI",
  },
  {
    category: "Analytics",
    name: "Churn Watch",
    description: "Flags churn risk cohorts; triggers outreach.",
    connectors: ["stripe", "supabase"],
    triggers: "schedule",
    kpis: "Net retention",
  },
  {
    category: "Analytics",
    name: "Unit Economics",
    description: "CAC/LTV/Payback analysis by segment.",
    connectors: ["stripe", "supabase"],
    triggers: "schedule",
    kpis: "Payback days",
  },
  {
    category: "Marketing/Creative",
    name: "Campaign Builder",
    description: "Generates multi-channel campaigns + calendars.",
    connectors: ["slack", "notion"],
    triggers: "schedule",
    kpis: "CTR/CVR",
  },
  {
    category: "Marketing/Creative",
    name: "SEO/AEO Optimizer",
    description: "Optimizes pages for search and agents.",
    connectors: ["netlify", "chrome-devtools"],
    triggers: "schedule",
    kpis: "Core Web Vitals, rankings",
  },
  {
    category: "Marketing/Creative",
    name: "Content Studio",
    description: "Brief → outlines → drafts → assets.",
    connectors: ["notion"],
    triggers: "schedule",
    kpis: "Publish cadence",
  },
  {
    category: "Marketing/Creative",
    name: "Outbound Prospector",
    description: "Builds ICP lists, drafts emails.",
    connectors: ["gmail"],
    triggers: "schedule",
    kpis: "Reply rate",
  },
  {
    category: "Marketing/Creative",
    name: "Release Notes",
    description: "Aggregates merged PRs into customer-facing notes.",
    connectors: ["github", "netlify"],
    triggers: "schedule",
    kpis: "Release cadence",
  },
];

const categories = ["All", "Coding", "Admin/Ops", "Analytics", "Marketing/Creative"];

function AgentsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAgents, setFilteredAgents] = useState(agentsData);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const categoryName =
        category.charAt(0).toUpperCase() + category.slice(1);
      setSelectedCategory(categoryName);
    }
  }, [searchParams]);

  useEffect(() => {
    const { enabled } = initScrollAnimations();
    if (enabled) {
      setTimeout(() => {
        animateFadeUp(".agent-card", { stagger: 0.1 });
      }, 100);
    }
  }, [filteredAgents]);

  useEffect(() => {
    let results = agentsData;

    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter((agent) => agent.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAgents(results);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Agent Catalog
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            20 specialized agents for coding, operations, analytics, and
            marketing. Built with MCP connectors and powered by Claude.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              size={20}
            />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder:text-text-muted"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-text-muted">
              <Filter size={16} />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-surface text-text-secondary hover:bg-surface-alt border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-text-muted">
            Showing <span className="text-text-primary font-medium">{filteredAgents.length}</span> of {agentsData.length} agents
          </p>
        </div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, index) => (
              <div
                key={index}
                className="agent-card bg-surface border border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap size={20} className="text-primary" />
                    </div>
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                      {agent.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {agent.name}
                </h3>
                <p className="text-text-secondary mb-4">{agent.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-text-muted font-medium min-w-[80px]">
                      Connectors:
                    </span>
                    <span className="text-text-secondary">
                      {agent.connectors.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-text-muted font-medium min-w-[80px]">
                      Triggers:
                    </span>
                    <span className="text-text-secondary">{agent.triggers}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-text-muted font-medium min-w-[80px]">
                      KPIs:
                    </span>
                    <span className="text-text-secondary">{agent.kpis}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-text-muted">No agents found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-text-muted">Loading agents...</p>
        </div>
      </div>
    }>
      <AgentsContent />
    </Suspense>
  );
}

