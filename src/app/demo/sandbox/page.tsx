'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Bot, Loader2, Send, User } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { handleChatQuery } from '@/app/actions';

type Message = {
  role: 'user' | 'assistant';
  text: string;
};

const initialMessages: Message[] = [
  {
    role: 'assistant',
    text: '¡Hola! Te mostraré cómo SORO agenda una cita. Escribe "Quiero una cita" para empezar.',
  },
];


export default function SandboxPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [messages]);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const response = await handleChatQuery(currentInput);
            const assistantMessage: Message = { role: 'assistant', text: response.answer };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                role: 'assistant',
                text: "Lo siento, estoy teniendo problemas para conectarme. Por favor, inténtalo de nuevo más tarde.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };


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
                <ScrollArea className="h-[450px] p-6" ref={scrollAreaRef}>
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
                      {isLoading && (
                        <div className="flex items-start gap-3">
                           <Avatar className="h-8 w-8 border-2 border-primary shrink-0">
                                <AvatarFallback className="bg-transparent text-primary"><Bot size={20} /></AvatarFallback>
                            </Avatar>
                          <div className="bg-secondary rounded-xl px-4 py-2.5 flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t">
                  <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
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
