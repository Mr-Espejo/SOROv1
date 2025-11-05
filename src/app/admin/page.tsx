'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadsTable } from '@/components/admin/leads-table';
import type { Lead } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowRight } from 'lucide-react';

export default function AdminPage() {
  const firestore = useFirestore();

  const leadsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'leads'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: leads, isLoading } = useCollection<Lead>(leadsQuery);

  const leadsBySource = useMemo(() => {
    if (!leads) return {};
    return leads.reduce((acc, lead) => {
      const source = lead.source || 'Desconocido';
      if (!acc[source]) {
        acc[source] = [];
      }
      acc[source].push(lead);
      return acc;
    }, {} as Record<string, Lead[]>);
  }, [leads]);
  
  const sources = [
    'Todos', 
    'Carta de Ventas en Video (VSL)', 
    'Demo Personalizado', 
    'Descarga de Lead Magnet'
  ];

  const createdPages = [
    {
      title: 'Carta de Ventas en Video (VSL)',
      href: '/vsl-opt-in',
      description: 'Página con video para capturar leads de alto interés.'
    },
    {
      title: 'Demo Personalizado',
      href: '/personalized-demo',
      description: 'Ofrece una demo a medida para clínicas.'
    },
    {
      title: 'Ebook (Lead Magnet)',
      href: '/lead-magnet',
      description: 'Página para descargar la guía gratuita a cambio de datos.'
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-muted/40 py-12 md:py-16">
        <div className="container mx-auto max-w-7xl space-y-8 px-4">
          <h1 className="text-4xl font-bold tracking-tighter">Panel de Administración</h1>

          <Card>
            <CardHeader>
                <CardTitle>Páginas Creadas</CardTitle>
                <CardDescription>Accede y revisa las páginas de destino que están activas.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link 
                        href="/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
                    >
                        <h3 className="font-semibold text-primary">Página de Inicio</h3>
                        <p className="text-sm text-muted-foreground">La página principal de bienvenida a SORO.</p>
                        <div className="mt-2 flex items-center text-xs font-semibold text-primary/80">
                            Ver página <ArrowRight className="ml-1 h-3 w-3" />
                        </div>
                    </Link>
                    {createdPages.map((page) => (
                        <Link 
                            href={page.href} 
                            key={page.title} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
                        >
                            <h3 className="font-semibold text-primary">{page.title}</h3>
                            <p className="text-sm text-muted-foreground">{page.description}</p>
                            <div className="mt-2 flex items-center text-xs font-semibold text-primary/80">
                                Ver página <ArrowRight className="ml-1 h-3 w-3" />
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle>Prospectos Capturados</CardTitle>
                <CardDescription>Visualiza todos los prospectos generados a través de tus páginas de destino.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="ml-4 text-muted-foreground">Cargando prospectos...</p>
                    </div>
                ) : (
                <Tabs defaultValue="Todos">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                        {sources.map(source => (
                            <TabsTrigger key={source} value={source}>{source}</TabsTrigger>
                        ))}
                    </TabsList>
                    
                    <TabsContent value="Todos">
                        <LeadsTable leads={leads} />
                    </TabsContent>

                    {sources.slice(1).map(source => (
                        <TabsContent key={source} value={source}>
                            <LeadsTable leads={leadsBySource[source] || []} />
                        </TabsContent>
                    ))}
                </Tabs>
                )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
