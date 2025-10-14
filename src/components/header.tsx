import Link from 'next/link';
import { SoroLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <SoroLogo />
        </Link>
        <nav className="flex items-center gap-4">
          <Button asChild className="bg-accent hover:bg-accent/90">
            <Link href="/personalized-demo#demo-form">Request a Demo</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
