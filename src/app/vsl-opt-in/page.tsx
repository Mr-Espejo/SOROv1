'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LeadForm } from '@/components/landing/lead-form';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PlayCircle, Calendar, Presentation, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Testimonials } from '@/components/landing/testimonials';

const formFields = [
  { name: 'name' as const, label: 'Nombre Completo', placeholder: 'Ej: Ana Pérez', type: 'text' },
  { name: 'email' as const, label: 'Correo Electrónico', placeholder: 'tu@ejemplo.com', type: 'email' },
  { name: 'clinicName' as const, label: 'Nombre de la Clínica', placeholder: 'Ej: Sonrisas Brillantes Dental', type: 'text' },
];

export default function VslOptInPage() {
  const vslThumbnail = PlaceHolderImages.find(p => p.id === 'vsl_thumbnail');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container flex flex-col items-center justify-center gap-10 px-4 text-center md:px-6">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold">Oferta por Tiempo Limitado</div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Descubre Cómo <span className="text-primary">Automatizar el 90%</span> de la Comunicación de Tu Clínica en Menos de 5 Minutos
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Mira esta breve presentación para ver cómo SORO™ puede duplicar tus agendamientos de citas y liberar a tu personal de tareas repetitivas.
              </p>
            </div>
            <div className="w-full max-w-2xl">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <button className="w-full">
                    <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl shadow-2xl">
                      {vslThumbnail && (
                        <div className="relative group h-full w-full">
                          <Image
                            src={vslThumbnail.imageUrl}
                            alt="Miniatura VSL"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={vslThumbnail.imageHint}
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <PlayCircle className="h-20 w-20 text-white/70 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      )}
                    </AspectRatio>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Video de Ventas</DialogTitle>
                    <DialogDescription>
                      Una ventana modal que contiene un video de ventas incrustado de YouTube.
                    </DialogDescription>
                  </DialogHeader>
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full rounded-lg"
                    ></iframe>
                  </AspectRatio>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/schedule-call">
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Reunión
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/webinars">
                  <Presentation className="mr-2 h-5 w-5" />
                  Ingresar a Webinar
                </Link>
              </Button>
            </div>

             <div className="w-full max-w-2xl text-center space-y-4">
              <p className="font-bold text-destructive animate-pulse">SOLO 12 CUPOS ESTA SEMANA</p>
              <div className="flex justify-center items-center gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>4 minutos de valor puro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Casos reales verificados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Estrategia paso a paso</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-lg pt-8">
              <LeadForm
                formFields={formFields}
                ctaText="Obtener una Consulta Gratuita"
                formTitle="Inicia Tu Viaje de Automatización"
                formDescription="Completa el formulario a continuación para reclamar tu consulta gratuita y sin compromiso."
                source="Carta de Ventas en Video (VSL)"
              />
            </div>
          </div>
        </section>
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
