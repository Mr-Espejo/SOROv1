import Link from 'next/link';
import { SoroLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <SoroLogo />
        </Link>
        <nav className="flex items-center gap-4">
          <Button asChild className="bg-teal-500 text-white hover:bg-teal-600">
            <Link href="/demo">Solicitar un Demo</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
