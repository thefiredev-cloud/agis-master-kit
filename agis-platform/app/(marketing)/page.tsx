"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Shield, TrendingUp, Code } from "lucide-react";
import { HeroCanvas } from "@/components/marketing/HeroCanvas";
import {
  initScrollAnimations,
  animateSplitText,
  animateFadeUp,
} from "@/lib/animations/scroll-animations";

export default function HomePage() {
  useEffect(() => {
    const { enabled } = initScrollAnimations();

    if (enabled) {
      // Animate hero title
      setTimeout(() => {
        animateSplitText(".hero-title", {
          stagger: 0.03,
          duration: 1,
        });
      }, 300);

      // Animate feature cards
      animateFadeUp(".feature-card", {
        stagger: 0.15,
        y: 80,
      });

      // Animate agent category cards
      animateFadeUp(".agent-category", {
        stagger: 0.2,
      });
    }
  }, []);

  const features = [
    {
      icon: Zap,
      title: "20+ Specialized Agents",
      description:
        "From code refactoring to campaign building, each agent is purpose-built for specific workflows across coding, ops, analytics, and marketing.",
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description:
        "Multi-tenant isolation with RLS, budget caps, scope whitelists, and PII redaction. Your data stays yours, always.",
    },
    {
      icon: TrendingUp,
      title: "Usage-Based Billing",
      description:
        "Pay only for what you use. Transparent seat + usage hybrid model with real-time cost tracking and overage protection.",
    },
    {
      icon: Code,
      title: "MCP Native",
      description:
        "Powerful tool connectors for GitHub, Stripe, Slack, Google, Notion, and more. Extensible architecture for custom integrations.",
    },
  ];

  const agentCategories = [
    {
      title: "Coding",
      count: 5,
      color: "from-primary to-accent",
      agents: [
        "Code Refactorer",
        "PR Reviewer",
        "Dependency Sentinel",
        "Spec-to-Scaffold",
        "Docs Syncer",
      ],
    },
    {
      title: "Admin/Ops",
      count: 5,
      color: "from-accent to-primary",
      agents: [
        "Approvals Router",
        "Calendar Concierge",
        "Vendor Intake",
        "Ticket Triage",
        "Ops Runbook",
      ],
    },
    {
      title: "Analytics",
      count: 5,
      color: "from-primary to-warn",
      agents: [
        "KPI Pipeline",
        "Forecaster",
        "Experiment Analyst",
        "Churn Watch",
        "Unit Economics",
      ],
    },
    {
      title: "Marketing",
      count: 5,
      color: "from-warn to-primary",
      agents: [
        "Campaign Builder",
        "SEO Optimizer",
        "Content Studio",
        "Outbound Prospector",
        "Release Notes",
      ],
    },
  ];

  return (
    <>
      {/* WebGL Background */}
      <HeroCanvas />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Artificial General Intelligence as a Service
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Run 20+ specialized AI agents with powerful orchestration, budget
            controls, and enterprise-grade multi-tenancy. Built for teams that
            ship.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 text-lg font-medium group"
            >
              Get Started Free
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/agents"
              className="px-8 py-4 bg-surface border border-border text-text-primary rounded-lg hover:bg-surface-alt transition-all text-lg font-medium"
            >
              Explore Agents
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex items-center justify-center gap-8 text-text-muted text-sm">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-accent" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-warn" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Code size={16} className="text-primary" />
              <span>Open Source Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for Scale. Built for Speed.
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Enterprise-grade agent orchestration with the DX developers love.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-bg border border-border rounded-xl p-6 hover:border-primary/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Categories */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              20 Agents. Infinite Possibilities.
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Purpose-built agents for every workflow. From code to campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {agentCategories.map((category, index) => (
              <div
                key={index}
                className="agent-category bg-surface border border-border rounded-xl p-8 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {category.title}
                    </h3>
                    <p className="text-text-muted">{category.count} agents</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white text-sm font-medium`}
                  >
                    Popular
                  </div>
                </div>
                <ul className="space-y-2">
                  {category.agents.map((agent, idx) => (
                    <li
                      key={idx}
                      className="text-text-secondary group-hover:text-text-primary transition-colors flex items-center gap-2"
                    >
                      <ArrowRight
                        size={16}
                        className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      {agent}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/agents?category=${category.title.toLowerCase()}`}
                  className="mt-6 inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
                >
                  View all {category.title.toLowerCase()} agents
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium"
            >
              Browse Full Agent Catalog
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build with AGIS?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Start with our free tier. No credit card required. Scale when you&apos;re
            ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 text-lg font-medium"
            >
              Start Building
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-surface border border-border text-text-primary rounded-lg hover:bg-surface-alt transition-all text-lg font-medium"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

