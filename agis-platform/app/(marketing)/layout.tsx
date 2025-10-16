import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
    </>
  );
}

