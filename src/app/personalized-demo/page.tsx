import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Features } from '@/components/landing/features';
import { Testimonials } from '@/components/landing/testimonials';
import { LeadForm } from '@/components/landing/lead-form';

const formFields = [
  { name: 'name' as const, label: 'Nombre Completo', placeholder: 'Ej: Dra. Ana Pérez', type: 'text' },
  { name: 'email' as const, label: 'Email de Trabajo', placeholder: 'tu@tuclinica.com', type: 'email' },
  { name: 'phone' as const, label: 'Número de Teléfono', placeholder: '(555) 123-4567', type: 'tel' },
  { name: 'clinicName' as const, label: 'Nombre de la Clínica', placeholder: 'Ej: Sonrisas Brillantes Dental', type: 'text' },
];

export default function PersonalizedDemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  El Último Asistente que Necesitarás Contratar
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Obtén una demostración personalizada de SORO™ y ve exactamente cómo nuestra IA puede duplicar tus citas y revolucionar la comunicación con tus pacientes.
                </p>
              </div>
              <Button asChild size="lg" className="bg-accent text-lg font-semibold hover:bg-accent/90">
                <Link href="#demo-form">
                  Agendar Mi Demo Gratis
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Demo Form Section */}
        <section id="demo-form" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <LeadForm
              formFields={formFields}
              ctaText="Agendar Mi Demo"
              formTitle="Solicita Tu Demo Personalizado"
              formDescription="Proporciona tus datos a continuación y nuestro equipo preparará una demostración adaptada a las necesidades específicas de tu clínica."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
