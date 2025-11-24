
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Script from 'next/script';
import { Whatsapp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=%2B573192992780&text=Hola%2C+me+gustar%C3%ADa+obtener+m%C3%A1s+informaci%C3%B3n+sobre+SORO.&type=phone_number&app_absent=0"

export default function ScheduleCallPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        buttonText="Contactar por WhatsApp"
        buttonLink={WHATSAPP_LINK}
        buttonTarget="_blank"
      />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Agenda tu Demostración
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-xl">
            Elige un horario que te convenga para una demostración personalizada de SORO™.
          </p>
          <div className="mt-10">
            {/* Calendly inline widget begin */}
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/sistemaparaodontologos/15min?hide_event_type_details=1&hide_gdpr_banner=1"
              style={{
                minWidth: '320px',
                height: '700px',
                backgroundColor: 'hsl(162 70% 95%)',
                borderRadius: '12px',
                padding: '10px'
              }}
            ></div>
            <Script
              type="text/javascript"
              src="https://assets.calendly.com/assets/external/widget.js"
              async
            ></Script>
            {/* Calendly inline widget end */}
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">¿Prefieres una atención más rápida? Contáctanos directamente.</p>
            <Button asChild size="lg" className="mt-4">
              <Link href={WHATSAPP_LINK} target="_blank">
                <Whatsapp className="mr-2 h-5 w-5" />
                Chatear en WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
