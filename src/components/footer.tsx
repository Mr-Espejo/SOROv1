import Link from 'next/link';
import { SoroLogo } from '@/components/logo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-gray-50 text-gray-600">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-10 md:h-24 md:flex-row md:py-0 md:px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <SoroLogo />
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {currentYear} SORO™. Todos los derechos reservados.
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/vsl-opt-in" className="text-sm font-medium hover:text-gray-900">
            Ver VSL
          </Link>
          <Link href="/demo" className="text-sm font-medium hover:text-gray-900">
            Demo
          </Link>
          <Link href="/lead-magnet" className="text-sm font-medium hover:text-gray-900">
            Ebook
          </Link>
        </nav>
      </div>
    </footer>
  );
}
