import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LeadForm } from '@/components/landing/lead-form';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PlayCircle } from 'lucide-react';

const formFields = [
  { name: 'name' as const, label: 'Nombre Completo', placeholder: 'Ej: Ana Pérez', type: 'text' },
  { name: 'email' as const, label: 'Correo Electrónico', placeholder: 'tu@ejemplo.com', type: 'email' },
  { name: 'clinicName' as const, label: 'Nombre de la Clínica', placeholder: 'Ej: Sonrisas Brillantes Dental', type: 'text' },
];

export default function VslOptInPage() {
  const vslThumbnail = PlaceHolderImages.find(p => p.id === 'vsl_thumbnail');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold">Oferta por Tiempo Limitado</div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Descubre Cómo Automatizar el 90% de la Comunicación de Tu Clínica en Menos de 5 Minutos
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Mira esta breve presentación para ver cómo SORO™ puede duplicar tus agendamientos de citas y liberar a tu personal de tareas repetitivas.
                  </p>
                </div>
                <div className="w-full max-w-lg">
                  <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl">
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
                </div>
              </div>
              <div className="flex items-center justify-center">
                <LeadForm
                  formFields={formFields}
                  ctaText="Obtener una Consulta Gratuita"
                  formTitle="Inicia Tu Viaje de Automatización"
                  formDescription="Completa el formulario a continuación para reclamar tu consulta gratuita y sin compromiso con uno de nuestros expertos en automatización."
                  source="Carta de Ventas en Video (VSL)"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
