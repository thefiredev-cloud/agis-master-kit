"use client";

import { useState } from "react";
import { 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Clock,
  Play,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter
} from "lucide-react";
import { formatRelativeTime, formatCurrency } from "@/lib/utils";

// Mock data - will be replaced with real Supabase queries
const mockStats = {
  totalRuns: 1247,
  successRate: 94.2,
  totalCost: 24567,
  avgDuration: 45,
};

const mockRuns = [
  {
    id: "1",
    agent: "Code Refactorer",
    status: "succeeded" as const,
    started_at: new Date(Date.now() - 3600000).toISOString(),
    finished_at: new Date(Date.now() - 3500000).toISOString(),
    cost_cents: 125,
  },
  {
    id: "2",
    agent: "PR Reviewer",
    status: "succeeded" as const,
    started_at: new Date(Date.now() - 7200000).toISOString(),
    finished_at: new Date(Date.now() - 7100000).toISOString(),
    cost_cents: 89,
  },
  {
    id: "3",
    agent: "Churn Watch",
    status: "running" as const,
    started_at: new Date(Date.now() - 300000).toISOString(),
    cost_cents: 0,
  },
  {
    id: "4",
    agent: "Dependency Sentinel",
    status: "failed" as const,
    started_at: new Date(Date.now() - 10800000).toISOString(),
    finished_at: new Date(Date.now() - 10700000).toISOString(),
    cost_cents: 45,
  },
  {
    id: "5",
    agent: "Campaign Builder",
    status: "needs_review" as const,
    started_at: new Date(Date.now() - 14400000).toISOString(),
    cost_cents: 156,
  },
];

const statusConfig = {
  queued: { icon: Clock, color: "text-text-muted", bg: "bg-text-muted/10" },
  running: { icon: Play, color: "text-warn", bg: "bg-warn/10" },
  succeeded: { icon: CheckCircle2, color: "text-accent", bg: "bg-accent/10" },
  failed: { icon: XCircle, color: "text-error", bg: "bg-error/10" },
  needs_review: { icon: AlertCircle, color: "text-warn", bg: "bg-warn/10" },
};

export default function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredRuns =
    statusFilter === "all"
      ? mockRuns
      : mockRuns.filter((run) => run.status === statusFilter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-text-secondary">
          Monitor your agent runs, costs, and performance metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm font-medium">
              Total Runs
            </span>
            <Zap size={20} className="text-primary" />
          </div>
          <p className="text-3xl font-bold">{mockStats.totalRuns.toLocaleString()}</p>
          <p className="text-sm text-accent mt-1">+12% from last week</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm font-medium">
              Success Rate
            </span>
            <TrendingUp size={20} className="text-accent" />
          </div>
          <p className="text-3xl font-bold">{mockStats.successRate}%</p>
          <p className="text-sm text-accent mt-1">+2.3% from last week</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm font-medium">
              Total Cost
            </span>
            <DollarSign size={20} className="text-warn" />
          </div>
          <p className="text-3xl font-bold">
            {formatCurrency(mockStats.totalCost)}
          </p>
          <p className="text-sm text-text-muted mt-1">This billing cycle</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm font-medium">
              Avg Duration
            </span>
            <Clock size={20} className="text-primary" />
          </div>
          <p className="text-3xl font-bold">{mockStats.avgDuration}s</p>
          <p className="text-sm text-accent mt-1">-8s from last week</p>
        </div>
      </div>

      {/* Recent Runs */}
      <div className="bg-surface border border-border rounded-xl">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Runs</h2>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-text-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-bg border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="succeeded">Succeeded</option>
              <option value="running">Running</option>
              <option value="failed">Failed</option>
              <option value="needs_review">Needs Review</option>
            </select>
          </div>
        </div>

        {/* Runs Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-alt">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Started
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRuns.map((run) => {
                const StatusIcon = statusConfig[run.status].icon;
                const duration = run.finished_at
                  ? Math.floor(
                      (new Date(run.finished_at).getTime() -
                        new Date(run.started_at).getTime()) /
                        1000
                    )
                  : null;

                return (
                  <tr
                    key={run.id}
                    className="hover:bg-surface-alt transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Zap size={16} className="text-primary" />
                        <span className="font-medium">{run.agent}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`${statusConfig[run.status].bg} p-1.5 rounded-lg`}
                        >
                          <StatusIcon
                            size={14}
                            className={statusConfig[run.status].color}
                          />
                        </div>
                        <span className="text-sm capitalize">
                          {run.status.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {formatRelativeTime(run.started_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {duration ? `${duration}s` : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {formatCurrency(run.cost_cents)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRuns.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-text-muted">No runs found with this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}

