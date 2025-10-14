import Image from 'next/image';
import { CheckCircle, Download } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LeadForm } from '@/components/landing/lead-form';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';

const formFields = [
  { name: 'name' as const, label: 'First Name', placeholder: 'e.g., Jane', type: 'text' },
  { name: 'email' as const, label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
];

const benefits = [
  "Proven strategies to reduce patient no-shows.",
  "Templates for effective automated communication.",
  "Tips for optimizing your online booking process.",
  "How to leverage AI for clinic growth.",
];

export default function LeadMagnetPage() {
  const ebookCover = PlaceHolderImages.find(p => p.id === 'ebook_cover');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-center justify-center lg:items-start">
                <Card className="overflow-hidden rounded-xl shadow-2xl shadow-primary/10">
                  {ebookCover && (
                    <Image
                      src={ebookCover.imageUrl}
                      alt="Ebook Cover: Optimize Your Clinic"
                      width={400}
                      height={600}
                      className="object-cover"
                      data-ai-hint={ebookCover.imageHint}
                    />
                  )}
                </Card>
              </div>
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold">Free Guide</div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                    Unlock the Secrets to a Fully Booked Clinic
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Download our free ebook, "The Modern Dentist's Guide to Patient Communication," and learn actionable strategies to fill your schedule and boost revenue.
                  </p>
                </div>

                <ul className="grid gap-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <LeadForm
                  formFields={formFields}
                  ctaText="Download Free Ebook"
                  formTitle="Get Your Free Guide Now"
                  formDescription="Enter your details to get instant access."
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
