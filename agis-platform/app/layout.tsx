import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "AGIS - Artificial General Intelligence as a Service",
  description: "Run 20+ specialized AI agents for coding, operations, analytics, and marketing with powerful MCP connectors and multi-tenant orchestration.",
  icons: {
    icon: "/brand/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
