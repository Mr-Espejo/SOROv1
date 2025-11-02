'use client';

import { MultiStepForm } from '@/components/demo/multi-step-form';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto max-w-2xl px-4">
          <MultiStepForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}