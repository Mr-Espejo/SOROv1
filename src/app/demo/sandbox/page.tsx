'use client';

import { ArrowLeft, Bot, Send, User } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const messages = [
  {
    role: 'assistant' as const,
    text: '¡Hola! Te mostraré cómo SORO agenda una cita. Escribe "Quiero una cita" para empezar.',
  },
  {
    role: 'user' as const,
    text: 'Hola, quiero una cita para limpieza dental',
  },
  {
    role: 'assistant' as const,
    text: '¡Claro! Con gusto te ayudo. Para agilizar, ¿me confirmas el nombre completo del paciente?',
  },
  {
    role: 'user' as const,
    text: 'Ana Lucía Martínez',
  },
  {
    role: 'assistant' as const,
    text: 'Perfecto, Ana. Tengo estos horarios disponibles para la limpieza: \n- Mañana a las 10:00 AM\n- Pasado mañana a las 2:30 PM\n\n¿Cuál te funciona mejor?',
  },
];

export default function SandboxPage() {
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
              🧠 Explora cómo funciona SORO
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
              Estás viendo una demostración interactiva. Escribe en el chat como si fueras un paciente y observa cómo SORO responde y agenda automáticamente.
            </p>
          </div>

          {/* Chat Simulator */}
          <Card className="w-full max-w-lg shadow-2xl">
             <CardHeader className="flex flex-row items-center justify-between border-b">
                  <div className="flex items-center gap-3">
                      <Avatar className='border-2 border-primary'>
                         <AvatarFallback className="bg-transparent text-primary"><Bot size={24} /></AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                          <CardTitle className="leading-tight">Asistente de Tu Clínica</CardTitle>
                          <CardDescription className="flex items-center gap-1.5 text-xs">
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                              </span>
                              En línea
                          </CardDescription>
                      </div>
                  </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[450px] p-6">
                   <div className="space-y-6">
                      {messages.map((message, index) => (
                        <div key={index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}>
                          {message.role === 'assistant' && (
                            <Avatar className="h-8 w-8 border-2 border-primary shrink-0">
                                <AvatarFallback className="bg-transparent text-primary"><Bot size={20} /></AvatarFallback>
                            </Avatar>
                          )}
                          <div className={cn('max-w-[80%] rounded-xl px-4 py-2.5 text-sm shadow-md', message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                            <p className="whitespace-pre-wrap">{message.text}</p>
                          </div>
                          {message.role === 'user' && (
                            <Avatar className="h-8 w-8 shrink-0">
                                <AvatarFallback><User size={20} /></AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                    </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t">
                  <div className="flex w-full items-center gap-2">
                    <Input
                      placeholder="Escribe un mensaje..."
                      className="flex-1"
                      disabled
                    />
                    <Button type="submit" size="icon" disabled>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
              </CardFooter>
          </Card>

           <div className="mt-8 text-center">
              <p className="text-muted-foreground">Así respondería SORO a tus pacientes. ¿Listo para probarlo con tu número real?</p>
              <div className="mt-4 flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/demo/qr-connect">Conectar mi WhatsApp real (2 min)</Link>
                </Button>
                <Button variant="secondary">Ver planes y activación</Button>
              </div>
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
