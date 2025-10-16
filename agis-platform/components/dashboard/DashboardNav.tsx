"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {
  LayoutDashboard,
  Zap,
  BarChart3,
  Settings,
  CreditCard,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Agents",
    href: "/dashboard/agents",
    icon: Zap,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-surface border-r border-border">
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-border">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image
                src="/brand/logo-dark.svg"
                alt="AGIS"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-semibold">AGIS</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:bg-surface-alt hover:text-text-primary"
                  )}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-border">
            <UserButton afterSignOutUrl="/" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                Your Account
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-surface border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Image
              src="/brand/logo-dark.svg"
              alt="AGIS"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-semibold">AGIS</span>
          </Link>
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-text-primary"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="px-4 py-4 space-y-1 bg-surface border-t border-border">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:bg-surface-alt hover:text-text-primary"
                  )}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </>
  );
}

