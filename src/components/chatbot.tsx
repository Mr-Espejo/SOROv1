"use client";

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Bot, Loader, Send, X, MessageSquare, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { handleChatQuery } from '@/app/actions';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setMessages([
          {
            id: Date.now(),
            role: 'assistant',
            text: "¡Hola! Soy el asistente virtual de SORO. ¿Cómo puedo ayudarte hoy? No dudes en preguntar sobre nuestras características, precios o cómo podemos ayudar a tu clínica dental.",
          },
        ]);
        setIsLoading(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

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

    const userMessage: Message = { id: Date.now(), role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
        const response = await handleChatQuery(currentInput);
        const assistantMessage: Message = { id: Date.now() + 1, role: 'assistant', text: response.answer };
        setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
        const errorMessage: Message = {
            id: Date.now() + 1,
            role: 'assistant',
            text: "Lo siento, estoy teniendo problemas para conectarme. Por favor, inténtalo de nuevo más tarde.",
        };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[101]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-[calc(100vw-3rem)] max-w-sm"
            >
              <Card className="flex h-[70vh] flex-col shadow-2xl shadow-primary/10">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className='border-2 border-primary'>
                           <AvatarFallback className="bg-transparent text-primary"><Bot size={24} /></AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <CardTitle className="leading-tight">Asistente SORO</CardTitle>
                            <CardDescription className="flex items-center gap-1.5 text-xs">
                                <span className="relative flex h-2 w-2">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                                </span>
                                En línea
                            </CardDescription>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className='h-8 w-8 shrink-0'>
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-0">
                  <ScrollArea className="h-full px-6 py-4" ref={scrollAreaRef}>
                    <div className="space-y-6">
                      {messages.map((message) => (
                        <div key={message.id} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}>
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
                      {isLoading && messages.length > 0 && (
                        <div className="flex items-start gap-3">
                           <Avatar className="h-8 w-8 border-2 border-primary shrink-0">
                                <AvatarFallback className="bg-transparent text-primary"><Bot size={20} /></AvatarFallback>
                            </Avatar>
                          <div className="bg-secondary rounded-xl px-4 py-2.5 flex items-center justify-center">
                            <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
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
                      placeholder="Pregunta sobre SORO..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-primary hover:bg-primary/90">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-2xl hover:bg-primary/90 focus:ring-primary"
        >
          <AnimatePresence>
            {isOpen ? (
              <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <X className="h-8 w-8" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                <MessageSquare className="h-8 w-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
        </motion.div>
      </div>
    </>
  );
}
