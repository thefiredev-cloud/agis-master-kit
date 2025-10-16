"use client";

import { useEffect } from "react";
import { 
  Zap, 
  Shield, 
  Code, 
  Database, 
  Cloud, 
  Lock,
  Layers,
  Workflow
} from "lucide-react";
import { animateFadeUp, initScrollAnimations } from "@/lib/animations/scroll-animations";

const techStack = [
  {
    category: "Frontend",
    icon: Code,
    items: [
      "Next.js 14 (App Router)",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Three.js & GSAP",
      "Radix UI",
    ],
  },
  {
    category: "Backend",
    icon: Layers,
    items: [
      "Node.js 20",
      "Fastify & tRPC",
      "BullMQ + Redis",
      "NATS Event Bus",
      "OpenTelemetry",
    ],
  },
  {
    category: "Data",
    icon: Database,
    items: [
      "Supabase PostgreSQL",
      "Row Level Security (RLS)",
      "pgvector for AI memory",
      "Realtime subscriptions",
    ],
  },
  {
    category: "Infrastructure",
    icon: Cloud,
    items: [
      "Netlify (Frontend)",
      "Railway (Workers)",
      "GitHub Actions CI/CD",
      "Grafana/Honeycomb",
    ],
  },
  {
    category: "AI & Integrations",
    icon: Workflow,
    items: [
      "Claude (Anthropic)",
      "OpenAI GPT-4",
      "MCP Connectors",
      "20+ Tool Integrations",
    ],
  },
  {
    category: "Security",
    icon: Shield,
    items: [
      "Clerk Authentication",
      "Multi-tenant isolation",
      "Budget & rate limits",
      "PII redaction",
    ],
  },
];

const features = [
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Built for speed. Optimized rendering, lazy loading, and efficient caching ensure lightning-fast response times.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "SOC 2 compliant, GDPR ready. Multi-tenant isolation, encrypted at rest and in transit, with comprehensive audit logs.",
  },
  {
    icon: Lock,
    title: "Tenant Isolation",
    description:
      "Row Level Security (RLS) ensures complete data separation. Your data stays yours, always.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    const { enabled } = initScrollAnimations();
    if (enabled) {
      setTimeout(() => {
        animateFadeUp(".tech-card", { stagger: 0.12 });
        animateFadeUp(".feature-item", { stagger: 0.15 });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            About AGIS
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Artificial General Intelligence as a Service. Multi-tenant agent
            orchestration platform built for modern teams.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-24">
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-text-secondary leading-relaxed mb-6">
              We&apos;re building the future of work automation. AGIS empowers teams
              to run specialized AI agents that handle repetitive tasks,
              analyze data, generate insights, and orchestrate complex
              workflows—all with enterprise-grade security and complete
              transparency.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              From code reviews to campaign analytics, from dependency
              monitoring to churn prediction, AGIS agents work 24/7 so your
              team can focus on what matters: building great products and
              serving customers.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Built with Modern Tech</h2>
            <p className="text-xl text-text-secondary">
              Production-ready stack optimized for performance and scalability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack, index) => (
              <div
                key={index}
                className="tech-card bg-surface border border-border rounded-xl p-6 hover:border-primary/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <stack.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{stack.category}</h3>
                <ul className="space-y-2">
                  {stack.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-text-secondary flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">System Architecture</h2>
            <p className="text-xl text-text-secondary">
              Multi-tenant orchestration with MCP connectors
            </p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-8 md:p-12">
            <div className="space-y-6">
              {/* Layer 1 - Frontend */}
              <div className="bg-bg rounded-xl p-6 border-l-4 border-primary">
                <h3 className="text-lg font-bold mb-2">Frontend Layer</h3>
                <p className="text-text-secondary text-sm">
                  Next.js 14 App Router • Clerk Auth • Real-time Subscriptions
                </p>
              </div>

              {/* Layer 2 - API */}
              <div className="bg-bg rounded-xl p-6 border-l-4 border-accent">
                <h3 className="text-lg font-bold mb-2">API Layer</h3>
                <p className="text-text-secondary text-sm">
                  tRPC Type-safe APIs • Fastify HTTP Server • Server Actions
                </p>
              </div>

              {/* Layer 3 - Workers */}
              <div className="bg-bg rounded-xl p-6 border-l-4 border-warn">
                <h3 className="text-lg font-bold mb-2">Worker Layer</h3>
                <p className="text-text-secondary text-sm">
                  BullMQ Job Queue • Agent Orchestrator • MCP Tool Calls • Budget
                  Enforcement
                </p>
              </div>

              {/* Layer 4 - Data */}
              <div className="bg-bg rounded-xl p-6 border-l-4 border-primary">
                <h3 className="text-lg font-bold mb-2">Data Layer</h3>
                <p className="text-text-secondary text-sm">
                  Supabase PostgreSQL with RLS • Redis Cache • Supabase Storage
                </p>
              </div>

              {/* Layer 5 - External */}
              <div className="bg-bg rounded-xl p-6 border-l-4 border-accent">
                <h3 className="text-lg font-bold mb-2">External Integrations</h3>
                <p className="text-text-secondary text-sm">
                  GitHub • Stripe • Slack • Google • Notion • Netlify • Chrome
                  DevTools
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why AGIS?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-item bg-surface border border-border rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Want to Learn More?</h2>
          <p className="text-xl text-text-secondary mb-8">
            Explore our agent catalog or get in touch with our team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/agents"
              className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium"
            >
              Explore Agents
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-surface border border-border text-text-primary rounded-lg hover:bg-surface-alt transition-all font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

