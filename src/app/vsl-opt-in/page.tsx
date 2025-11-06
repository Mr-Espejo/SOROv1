
'use client';

import { useState, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { LeadForm } from '@/components/landing/lead-form';
import { Footer } from '@/components/footer';
import { Calendar, Presentation, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLeadCaptured, setIsLeadCaptured] = useState(false);

  // Open the lead capture popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLeadCaptured) { // Only open if the lead hasn't been captured yet
        setIsPopupOpen(true);
      }
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [isLeadCaptured]);


  const handleFormSuccess = () => {
    setIsLeadCaptured(true);
    // Keep the popup open for a moment to show a success message, then close it.
    setTimeout(() => {
       setIsPopupOpen(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground py-2 px-4 text-center">
        <p className="font-semibold text-sm uppercase tracking-wider">
          PARA DUEÑOS DE CLÍNICAS DENTALES QUE BUSCAN LLENAR SU AGENDA Y AUMENTAR SUS INGRESOS CON INTELIGENCIA ARTIFICIAL
        </p>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container flex flex-col items-center justify-center gap-10 px-4 text-center md:px-6">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">Oferta por Tiempo Limitado</div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Descubre Cómo <span className="text-accent">Automatizar el 90%</span> de la Comunicación de Tu Clínica en Menos de 5 Minutos
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Mira esta breve presentación para ver cómo SORO™ puede duplicar tus agendamientos de citas y liberar a tu personal de tareas repetitivas.
              </p>
            </div>
            
            {/* Video container */}
            <div className="w-full max-w-4xl">
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl shadow-2xl bg-black">
                <video
                  src="https://file.notion.so/f/f/ed6477b8-cb1b-4174-8d7a-3c87e939e5b9/1f137d7d-5d61-4001-909e-c0a1880f8826/Stan_Christ_-_Trepidation.webm?table=block&id=2995454f-b3d8-80cf-9dca-ff1955cf0f58&spaceId=ed6477b8-cb1b-4174-8d7a-3c87e939e5b9&expirationTimestamp=1762488000000&signature=Z3Qw3TnUAp4Bkqcr3y5ITV3Mq7fP47UOfTShcdvq3ws&downloadName=Stan+Christ+-+Trepidation.webm"
                  controls
                  className="h-full w-full"
                >
                  Tu navegador no soporta el tag de video.
                </video>
              </AspectRatio>
            </div>

            {/* Lead Capture Popup */}
            <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
              <DialogContent 
                className="max-w-lg p-0"
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
                hideCloseButton={true}
              >
                 <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="text-2xl">Accede a la Presentación Exclusiva</DialogTitle>
                  <DialogDescription>
                    Ingresa tus datos para desbloquear el contenido completo y recibir más información.
                  </DialogDescription>
                </DialogHeader>
                  <div className="p-6 pt-0">
                     <LeadForm
                        formFields={formFields}
                        ctaText="Continuar Viendo"
                        formTitle=""
                        formDescription=""
                        source="VSL Popup"
                        onSuccess={handleFormSuccess}
                      />
                  </div>
              </DialogContent>
            </Dialog>
            
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
          </div>
        </section>
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
