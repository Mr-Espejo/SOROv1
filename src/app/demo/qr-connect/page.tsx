'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, Loader2, QrCode, Smartphone, Bot } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ConnectionStatus = 'generating' | 'waiting' | 'verifying' | 'connected';

export default function QrConnectPage() {
  const [status, setStatus] = useState<ConnectionStatus>('generating');
  const router = useRouter();

  useEffect(() => {
    if (status === 'generating') {
      const timer = setTimeout(() => setStatus('waiting'), 2500);
      return () => clearTimeout(timer);
    }
    if (status === 'waiting') {
      const timer = setTimeout(() => setStatus('verifying'), 8000); // User scans QR
      return () => clearTimeout(timer);
    }
    if (status === 'verifying') {
      const timer = setTimeout(() => setStatus('connected'), 3000); // Backend verifies
      return () => clearTimeout(timer);
    }
  }, [status]);

  const qrPlaceholder = PlaceHolderImages.find(p => p.id === 'qr_code_placeholder');

  const statusConfig = {
    generating: {
      icon: <Loader2 className="h-16 w-16 animate-spin text-primary" />,
      title: 'Generando tu código QR seguro...',
      description: 'Esto tomará solo un momento. Prepara tu teléfono.',
      showQr: false,
    },
    waiting: {
      icon: <QrCode className="h-16 w-16 text-primary" />,
      title: '¡Listo! Escanea el código QR',
      description: 'Abre WhatsApp en tu teléfono, ve a "Dispositivos vinculados" y apunta tu cámara aquí.',
      showQr: true,
    },
    verifying: {
      icon: <Loader2 className="h-16 w-16 animate-spin text-primary" />,
      title: 'Verificando conexión...',
      description: 'Estamos conectando tu WhatsApp con SORO. Mantén tu teléfono conectado a internet.',
      showQr: true, // Keep showing QR for reference
    },
    connected: {
      icon: <CheckCircle className="h-16 w-16 text-green-500" />,
      title: '¡Conexión Exitosa!',
      description: 'Tu WhatsApp ha sido vinculado. Ya puedes iniciar la demostración guiada.',
      showQr: false,
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container flex max-w-4xl flex-col items-center gap-8 px-4 md:px-6">
          <div className="w-full text-center">
            <Link href="/demo" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a las opciones
            </Link>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              🔗 Conecta tu WhatsApp
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
              Sigue los pasos a continuación para vincular tu número de WhatsApp y ver a SORO en acción. Es 100% seguro.
            </p>
          </div>

          <div className="grid w-full max-w-4xl gap-10 md:grid-cols-2">
            {/* Left Side: Instructions */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Cómo funciona</CardTitle>
                <CardDescription>Sigue estos 3 simples pasos en tu teléfono.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
                  <div>
                    <h3 className="font-semibold">Abre WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">En tu teléfono, abre la aplicación de WhatsApp.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</div>
                  <div>
                    <h3 className="font-semibold">Ve a Dispositivos Vinculados</h3>
                    <p className="text-sm text-muted-foreground">Toca el menú (⋮ o ⚙️) &gt; <span className="font-semibold">Dispositivos vinculados</span> &gt; <span className="font-semibold">Vincular un dispositivo</span>.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">3</div>
                  <div>
                    <h3 className="font-semibold">Escanea el Código QR</h3>
                    <p className="text-sm text-muted-foreground">Apunta la cámara de tu teléfono al código QR que aparece en esta pantalla.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Side: QR Code and Status */}
            <Card className="flex flex-col items-center justify-center p-8 text-center bg-secondary">
              <div className="relative flex h-80 w-full flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  >
                    {currentStatus.icon}
                    <h3 className="text-xl font-bold">{currentStatus.title}</h3>
                    <p className="max-w-xs text-muted-foreground">{currentStatus.description}</p>
                  </motion.div>
                </AnimatePresence>

                {currentStatus.showQr && qrPlaceholder && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative h-64 w-64 rounded-lg overflow-hidden shadow-2xl"
                  >
                     <Image
                        src={qrPlaceholder.imageUrl}
                        alt="QR Code Placeholder"
                        width={256}
                        height={256}
                        data-ai-hint={qrPlaceholder.imageHint}
                      />
                    {status === 'verifying' && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                           <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        </div>
                    )}
                  </motion.div>
                )}
                 
                 {status === 'connected' && (
                    <Button
                        size="lg"
                        className="mt-6"
                        onClick={() => alert('¡Demo guiada en construcción!')}
                    >
                        <Bot className="mr-2 h-5 w-5" />
                        Iniciar Demo Guiada
                    </Button>
                 )}
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
