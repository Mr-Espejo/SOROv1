import { Bot, CalendarCheck, LayoutGrid } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: '24/7 AI Assistant',
    description: 'Our WhatsApp-integrated AI works around the clock to answer patient queries, schedule appointments, and send reminders.',
  },
  {
    icon: <CalendarCheck className="h-10 w-10 text-primary" />,
    title: 'Automated Scheduling',
    description: "Let patients book, reschedule, or cancel appointments seamlessly through a conversational chat experience, reducing no-shows.",
  },
  {
    icon: <LayoutGrid className="h-10 w-10 text-primary" />,
    title: 'Centralized Dashboard',
    description: 'Manage patients, appointments, and bot performance from a single, intuitive web interface designed for dental clinics.',
  },
];

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything Your Clinic Needs</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SORO™ provides an all-in-one solution to automate communication, streamline workflows, and grow your practice.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full bg-card/50 transition-all hover:bg-card">
              <CardHeader className="flex flex-col items-center text-center gap-4 p-8">
                {feature.icon}
                <div className="space-y-2">
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
