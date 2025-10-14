import { Bot, CalendarCheck, LayoutGrid } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'Asistente IA 24/7',
    description: 'Nuestra IA integrada con WhatsApp trabaja día y noche para responder consultas de pacientes, agendar citas y enviar recordatorios.',
  },
  {
    icon: <CalendarCheck className="h-10 w-10 text-primary" />,
    title: 'Agendamiento Automatizado',
    description: "Permite que los pacientes agenden, reprogramen o cancelen citas fácilmente a través de una experiencia de chat conversacional, reduciendo las ausencias.",
  },
  {
    icon: <LayoutGrid className="h-10 w-10 text-primary" />,
    title: 'Panel Centralizado',
    description: 'Gestiona pacientes, citas y el rendimiento del bot desde una única e intuitiva interfaz web diseñada para clínicas dentales.',
  },
];

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold">Características Clave</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Todo lo que Tu Clínica Necesita</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SORO™ ofrece una solución todo en uno para automatizar la comunicación, optimizar los flujos de trabajo y hacer crecer tu práctica.
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
