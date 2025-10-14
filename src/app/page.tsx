import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SoroLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  const landingPages = [
    {
      title: 'Video Sales Letter',
      description: 'Capture leads with a compelling VSL and a direct opt-in.',
      href: '/vsl-opt-in',
    },
    {
      title: 'Personalized Demo',
      description: "Offer a tailored demo to showcase SORO's value proposition.",
      href: '/personalized-demo',
    },
    {
      title: 'Lead Magnet Download',
      description: 'Attract potential clients with a valuable free resource.',
      href: '/lead-magnet',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <SoroLogo className="justify-center" />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  The Future of Dental Clinic Management
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore our high-converting landing page templates designed to capture leads and grow your practice with SORO™.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
          <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-3">
            {landingPages.map((page) => (
              <Link href={page.href} key={page.title} className="group">
                <Card className="flex h-full flex-col justify-between rounded-xl border-transparent bg-background shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-primary/20 hover:shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{page.title}</CardTitle>
                    <CardDescription className="pt-2">{page.description}</CardDescription>
                  </CardHeader>
                  <div className="p-6 pt-0">
                    <div className="inline-flex items-center text-sm font-semibold text-primary">
                      View Page <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
