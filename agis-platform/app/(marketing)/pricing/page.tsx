"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Check, Zap, ArrowRight } from "lucide-react";
import { animateFadeUp, initScrollAnimations } from "@/lib/animations/scroll-animations";

const pricingPlans = [
  {
    name: "Starter",
    price: 49,
    description: "Perfect for small teams getting started with AI agents",
    features: [
      "5 active agents",
      "1,000 agent runs/month",
      "Basic MCP connectors (GitHub, Slack)",
      "Community support",
      "Basic analytics",
      "7-day run history",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 199,
    description: "For growing teams that need more power and flexibility",
    features: [
      "All 20 agents included",
      "10,000 agent runs/month",
      "All MCP connectors",
      "Priority support",
      "Advanced analytics & dashboards",
      "90-day run history",
      "Custom budgets & rate limits",
      "Human-in-the-loop approvals",
      "Webhook integrations",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: null,
    description: "For large organizations with custom requirements",
    features: [
      "Unlimited agents & runs",
      "All Pro features",
      "Dedicated support & SLA",
      "Custom MCP connectors",
      "SSO & advanced security",
      "Audit logs & compliance",
      "Multi-region deployment",
      "Custom contract & billing",
      "On-premise option available",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "What counts as an agent run?",
    answer:
      "An agent run is a single execution of an agent, whether triggered manually, by webhook, or on schedule. Each run may include multiple tool calls (e.g., GitHub API, Stripe API) but counts as one run.",
  },
  {
    question: "How does usage-based billing work?",
    answer:
      "You pay a base monthly fee for your plan, plus overages if you exceed your included runs. Overages are billed at $0.10 per additional run, calculated at the end of each billing cycle.",
  },
  {
    question: "Can I upgrade or downgrade anytime?",
    answer:
      "Yes! You can change plans anytime. Upgrades take effect immediately, while downgrades apply at the end of your billing cycle. You'll be prorated accordingly.",
  },
  {
    question: "What's included in the free trial?",
    answer:
      "All plans include a 14-day free trial with full access to features. No credit card required to start. You can cancel anytime during the trial without being charged.",
  },
  {
    question: "What MCP connectors are available?",
    answer:
      "We support 15+ MCP connectors including GitHub, Stripe, Slack, Google Workspace, Notion, Netlify, and more. Enterprise plans can request custom connectors.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use multi-tenant isolation with Row Level Security (RLS), encrypt all data at rest and in transit, and never share your data between tenants. We're SOC 2 compliant and GDPR ready.",
  },
];

export default function PricingPage() {
  useEffect(() => {
    const { enabled } = initScrollAnimations();
    if (enabled) {
      setTimeout(() => {
        animateFadeUp(".pricing-card", { stagger: 0.15, y: 80 });
        animateFadeUp(".faq-item", { stagger: 0.1 });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary"
                  : "bg-surface border border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-text-secondary text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  {plan.price !== null ? (
                    <>
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-text-muted ml-2">/month</span>
                    </>
                  ) : (
                    <span className="text-5xl font-bold">Custom</span>
                  )}
                </div>
              </div>

              <Link
                href={plan.price !== null ? "/sign-up" : "/contact"}
                className={`w-full block text-center py-3 rounded-lg font-medium transition-all mb-6 ${
                  plan.highlighted
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-surface-alt border border-border text-text-primary hover:bg-surface"
                }`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className={`${
                        plan.highlighted ? "text-primary" : "text-accent"
                      } flex-shrink-0 mt-0.5`}
                    />
                    <span className="text-text-secondary text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Usage-Based Billing Explanation */}
        <div className="bg-surface border border-border rounded-2xl p-8 mb-24">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Zap size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Usage-Based Billing</h3>
              <p className="text-text-secondary mb-4">
                Pay only for what you use. Your base plan includes a generous
                allocation of runs. If you exceed your limit, overages are billed
                at $0.10 per additional run. Track your usage in real-time from
                the dashboard.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-bg rounded-lg p-4">
                  <p className="text-text-muted text-sm mb-1">Base Fee</p>
                  <p className="text-2xl font-bold">$49-199/mo</p>
                </div>
                <div className="bg-bg rounded-lg p-4">
                  <p className="text-text-muted text-sm mb-1">Overage Rate</p>
                  <p className="text-2xl font-bold">$0.10/run</p>
                </div>
                <div className="bg-bg rounded-lg p-4">
                  <p className="text-text-muted text-sm mb-1">Billing Cycle</p>
                  <p className="text-2xl font-bold">Monthly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-surface border border-border rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-text-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Start your 14-day free trial today. No credit card required.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all text-lg font-medium"
          >
            Start Free Trial
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}

