
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Script from 'next/script';

export default function ScheduleCallPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
