import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Features } from '@/components/landing/features';
import { Testimonials } from '@/components/landing/testimonials';
import { LeadForm } from '@/components/landing/lead-form';

const formFields = [
  { name: 'name' as const, label: 'Full Name', placeholder: 'e.g., Dr. Jane Doe', type: 'text' },
  { name: 'email' as const, label: 'Work Email', placeholder: 'you@yourclinic.com', type: 'email' },
  { name: 'phone' as const, label: 'Phone Number', placeholder: '(555) 123-4567', type: 'tel' },
  { name: 'clinicName' as const, label: 'Clinic Name', placeholder: 'e.g., Bright Smiles Dental', type: 'text' },
];

export default function PersonalizedDemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  The Last Assistant You'll Ever Need to Hire
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get a personalized demo of SORO™ and see exactly how our AI can double your appointments and revolutionize your patient communication.
                </p>
              </div>
              <Button asChild size="lg" className="bg-accent text-lg font-semibold hover:bg-accent/90">
                <Link href="#demo-form">
                  Schedule My Free Demo
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Demo Form Section */}
        <section id="demo-form" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <LeadForm
              formFields={formFields}
              ctaText="Schedule My Demo"
              formTitle="Request Your Personalized Demo"
              formDescription="Provide your details below, and our team will prepare a demo tailored to your clinic's specific needs."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
