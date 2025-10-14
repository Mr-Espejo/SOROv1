import Link from 'next/link';
import { SoroLogo } from '@/components/logo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <SoroLogo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {currentYear} SORO™. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/vsl-opt-in" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Watch VSL
          </Link>
          <Link href="/personalized-demo" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Demo
          </Link>
          <Link href="/lead-magnet" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Ebook
          </Link>
        </nav>
      </div>
    </footer>
  );
}
