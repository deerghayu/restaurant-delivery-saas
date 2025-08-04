import Link from "next/link";
import { ReactNode } from "react";
import { Button } from '@/components/ui';

interface PageLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

export default function PageLayout({ children, showNavigation = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showNavigation && (
        <header className="bg-card shadow-sm border-b">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl" aria-hidden="true">🚚</span>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">ZOOMDISHES</span>
              </Link>
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth"
                  className="text-muted-foreground hover:text-primary font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link href="/auth?mode=signup">
                  <Button variant="default">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </header>
      )}
      
      <main className="min-h-screen">
        {children}
      </main>

      <footer className="bg-card text-muted-foreground py-12 mt-auto border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl" aria-hidden="true">🚚</span>
                <span className="text-xl font-bold text-foreground">ZOOMDISHES</span>
              </div>
              <p className="text-sm">
                Empowering Australian restaurants to own their delivery experience.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#features" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-primary transition-colors">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/docs/setup-guide" className="hover:text-primary transition-colors">
                    Setup Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 ZoomDishes. Made with <span role="img" aria-label="love">❤️</span> in Australia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}