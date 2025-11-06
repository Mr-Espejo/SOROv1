'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Presentation } from 'lucide-react';

export default function WebinarsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Presentation className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl">
            Próximos Webinars
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-xl">
            ¡Contenido emocionante muy pronto! Estamos preparando nuevos webinars para ayudarte a potenciar tu clínica. Vuelve a consultar esta página en breve para ver las próximas fechas y temas.
          </p>
          <div className="mt-10">
            <Button asChild>
                <Link href="/">Volver a la Página de Inicio</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
