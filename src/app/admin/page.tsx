'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadsTable } from '@/components/admin/leads-table';
import type { Lead } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-muted/40 py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="mb-8 text-4xl font-bold tracking-tighter">Panel de Administración</h1>
          
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
