'use client';

import { ArrowRight, QrCode, TestTube } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function DemoPage() {
  const router = useRouter();

  const handleSelection = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                ¿Cómo quieres probar SORO por primera vez?
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Puedes hacerlo de dos formas. Ambas te permitirán ver cómo el asistente agenda citas automáticamente.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2">
              {/* Opción 1: Conectar WhatsApp */}
              <Card className="flex flex-col justify-between shadow-lg transition-transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <QrCode className="h-10 w-10 text-primary" />
                    <CardTitle className="text-2xl font-bold">Conectar mi WhatsApp</CardTitle>
                  </div>
                  <CardDescription className="pt-2">
                    Escanea un código QR con tu celular para conectar tu cuenta. Ideal si quieres probarlo con tus pacientes reales.
                    <br />
                    <span className="mt-2 block font-semibold text-foreground">⏱️ Tarda 2 minutos.</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => handleSelection('/demo/qr-connect')}
                  >
                    Conectar mi WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Opción 2: Demo Web */}
              <Card className="flex flex-col justify-between shadow-lg transition-transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <TestTube className="h-10 w-10 text-primary" />
                    <CardTitle className="text-2xl font-bold">Probar SORO en la web</CardTitle>
                  </div>
                  <CardDescription className="pt-2">
                    Accede a una demostración interactiva sin usar tu número real. Ideal si solo quieres ver cómo funciona.
                    <br />
                    <span className="mt-2 block font-semibold text-foreground">⏱️ Tarda 1 minuto.</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => handleSelection('/demo/sandbox')}
                  >
                    Probar en modo demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
