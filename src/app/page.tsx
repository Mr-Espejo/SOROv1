import { ArrowRight, Bot, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

import { SoroLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChatMockup } from '@/components/landing/chat-mockup';

const features = [
  {
    icon: <Bot className="h-8 w-8 text-teal-500" />,
    title: 'IA Conversacional',
    description: 'Responde el 95% de las preguntas frecuentes de tus pacientes al instante.',
  },
  {
    icon: <Calendar className="h-8 w-8 text-teal-500" />,
    title: 'Agendamiento Inteligente',
    description: 'Permite que tus pacientes agenden citas 24/7, sin intervención humana.',
  },
  {
    icon: <Clock className="h-8 w-8 text-teal-500" />,
    title: 'Disponibilidad 24/7',
    description: 'Tu clínica nunca duerme. Captura prospectos y citas incluso fuera del horario de oficina.',
  },
];


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-cyan-50 to-teal-50 py-20 md:py-32 lg:py-40">
          <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">
            <div className="flex flex-col items-start space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Tu clínica dental,
                <br />
                automatizada con{' '}
                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                  SORO™
                </span>
              </h1>
              <p className="max-w-lg text-xl text-gray-600 md:text-2xl">
                Automatiza las respuestas, agenda más citas y libera a tu personal para que puedan centrarse en lo que de verdad importa: tus pacientes.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-teal-500 text-white hover:bg-teal-600">
                  <Link href="/personalized-demo">Solicitar Demostración</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50 hover:text-teal-600">
                  <Link href="/vsl-opt-in">Ver Cómo Funciona</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <ChatMockup />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-teal-100">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Section */}
        <section className="w-full bg-gray-50 py-20 md:py-24 lg:py-32">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter text-gray-900 md:text-4xl/tight">
                Explora nuestras Páginas de Aterrizaje
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre plantillas de alta conversión diseñadas para hacer crecer tu práctica.
              </p>
            </div>
            <div className="flex justify-center">
                <Button asChild size="lg" variant="link" className="text-teal-600">
                  <Link href="/landing-pages">
                    Ver todas las plantillas <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}