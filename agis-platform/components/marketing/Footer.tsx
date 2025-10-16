import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const footerLinks = {
    Product: [
      { label: "Agents", href: "/agents" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/integrations" },
      { label: "Changelog", href: "/changelog" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    Legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Compliance", href: "/compliance" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              AGIS
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Artificial General Intelligence as a Service. Run 20+ specialized
              AI agents with powerful orchestration.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} AGIS. All rights reserved.
          </p>
          <p className="text-text-muted text-sm mt-4 md:mt-0">
            Built with Next.js, Supabase, and Claude
          </p>
        </div>
      </div>
    </footer>
  );
}

