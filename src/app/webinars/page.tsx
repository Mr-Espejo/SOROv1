'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Presentation, Calendar } from 'lucide-react';

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);


export default function WebinarsPage() {
  const handleTrackEvent = (eventName: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Presentation className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl">
            Conviértete en un Experto con Nuestros Webinars
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-xl">
            Accede a nuestro grupo exclusivo de WhatsApp donde te mantendremos al tanto de los próximos webinars con estrategias avanzadas para automatizar y hacer crecer tu clínica.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button asChild size="lg" onClick={() => handleTrackEvent('JoinGroup')}>
                <Link href="https://chat.whatsapp.com/HT9nzujcIy2C6sW4m9UVZt" target="_blank" rel="noopener noreferrer">
                    <WhatsappIcon className="mr-2 h-5 w-5" />
                    Unirme al Grupo Exclusivo
                </Link>
            </Button>
            <p className="text-sm text-muted-foreground">Serás el primero en saber de nuevas fechas y contenido.</p>

            <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="h-px w-20 bg-border"></div>
                <span className="text-xs font-medium text-muted-foreground">O SI PREFIERES</span>
                <div className="h-px w-20 bg-border"></div>
            </div>

            <Button asChild size="lg" variant="secondary" className="mt-4">
                <Link href="/schedule-call">
                    <Calendar className="mr-2 h-5 w-5" />
                    AGENDAR UNA DEMO AHORA
                </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    