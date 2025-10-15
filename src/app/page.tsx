'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, Calendar, Clock, Menu, X, CheckCircle2, MessageSquare, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { SoroLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { Benefits } from '@/components/landing/benefits';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogoCloud } from '@/components/landing/logo-cloud';

const features = [
  {
    icon: <Bot className="h-8 w-8 text-teal-500" />,
    title: 'IA Conversacional',
    description: 'Responde el 95% de las preguntas frecuentes de tus pacientes al instante.',
  },
  {
    icon: <Calendar className="h-8 w-8 text-teal-500" />,
    title: 'Agendamiento Inteligente',
    description: 'Permite que tus pacientes agenden citas 24/7, sin intervención humana.',
  },
  {
    icon: <Clock className="h-8 w-8 text-teal-500" />,
    title: 'Disponibilidad 24/7',
    description: 'Tu clínica nunca duerme. Captura prospectos y citas incluso fuera del horario de oficina.',
  },
];

const DynamicHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    router.push('/');
    setIsMenuOpen(false);
  };

  const handleDemoClick = () => {
    router.push('/personalized-demo');
    setIsMenuOpen(false);
  };

  const navItems = [
    { 
      name: 'Funcionalidades', 
      isDropdown: true,
      content: (
        <div className="grid grid-cols-2 gap-4 p-2">
          <div>
            <DropdownMenuLabel className="text-muted-foreground font-semibold text-xs">SOLUCIONES</DropdownMenuLabel>
            <DropdownMenuItem className="gap-3">
              <div className="bg-orange-100 p-2 rounded-md">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="4" width="12" height="16" rx="2" fill="#FDE68A"/>
                  <path d="M9 8H15" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 11H15" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 14H12" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M18 7C19.1046 7 20 7.89543 20 9V9.5C20 10.6046 19.1046 11.5 18 11.5V11.5C16.8954 11.5 16 10.6046 16 9.5V9C16 7.89543 16.8954 7 18 7V7Z" fill="white" stroke="#F59E0B" strokeWidth="1.5"/>
                  <path d="M18.5 9.5C18.7761 9.5 19 9.27614 19 9C19 8.72386 18.7761 8.5 18.5 8.5V9.5ZM18.5 8.5C18.2239 8.5 18 8.72386 18 9C18 9.27614 18.2239 9.5 18.5 9.5V8.5Z" fill="#F59E0B" stroke="#F59E0B"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold">Atiende más y mejor a tus pacientes</p>
                <p className="text-xs text-muted-foreground">Automatiza tareas de recepción y gestión de citas gracias a la IA</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3">
              <div className="bg-orange-100 p-2 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="8" width="16" height="8" rx="2" fill="#FDE68A"/>
                  <path d="M7 12H9" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 12H14" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="8" y="5" width="2" height="3" rx="1" fill="#F59E0B"/>
                  <rect x="14" y="5" width="2" height="3" rx="1" fill="#F59E0B"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold">Controla la operación de tu clínica</p>
                <p className="text-xs text-muted-foreground">Gestiona la tesorería, honorarios médicos y productividad</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3">
              <div className="bg-orange-100 p-2 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3431 11.6569L5.27208 4.58579L3.85786 6L10.9289 13.0711L12.3431 11.6569Z" fill="#F59E0B"/>
                    <path d="M17.6569 6.34315L6.34315 17.6569" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.6569 12.3431L4.58579 5.27208L6 3.85786L13.0711 10.9289L11.6569 12.3431Z" fill="#F59E0B"/>
                    <path d="M20 4L13 11" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold">Ahorra tiempo de gestión</p>
                <p className="text-xs text-muted-foreground">Deja que organicemos facturas, historias clínicas y más</p>
              </div>
            </DropdownMenuItem>
          </div>
           <div>
            <DropdownMenuLabel className="text-muted-foreground font-semibold text-xs">SOLUCIONES</DropdownMenuLabel>
            <DropdownMenuItem className="gap-3"><Calendar size={20}/> Agenda y recordatorios automáticos</DropdownMenuItem>
            <DropdownMenuItem className="gap-3"><Bot size={20}/> Agregación bancaria</DropdownMenuItem>
            <DropdownMenuItem className="gap-3"><MessageSquare size={20}/> Recepción por IA</DropdownMenuItem>
            <DropdownMenuItem className="gap-3"><CheckCircle2 size={20}/> Producción de clínica</DropdownMenuItem>
          </div>
        </div>
      )
    },
    { name: '¿Para quién es?', isDropdown: true },
    { name: 'Recursos', isDropdown: true },
  ];

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button onClick={handleLogoClick} className="flex items-center gap-2">
            <SoroLogo />
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            item.isDropdown ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 data-[state=open]:bg-teal-50 data-[state=open]:text-teal-600 gap-1 rounded-md px-3 py-2">
                    {item.name}
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                {item.content && (
                  <DropdownMenuContent className="w-[500px]">
                    {item.content}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            ) : (
              <Button 
                key={item.name} 
                variant="ghost"
                className={`transition-colors font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-md px-3 py-2`}
              >
                {item.name}
              </Button>
            )
          ))}
          <Button onClick={handleDemoClick} className="bg-teal-500 hover:bg-teal-600 text-white ml-2">
            Ver Demo
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className={`md:hidden text-gray-700`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 px-4">
          <nav className="flex flex-col space-y-4">
             {navItems.map((item) => (
              <button 
                key={item.name} 
                className="text-gray-700 hover:text-teal-500 transition-colors font-medium py-2 text-left"
              >
                {item.name}
              </button>
            ))}
            <Button onClick={handleDemoClick} className="bg-teal-500 hover:bg-teal-600 text-white w-full">
              Ver Demo
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);


const Hero: React.FC = () => {
  const router = useRouter();

  const handleDemoClick = () => {
    router.push('/personalized-demo');
  };

  const scrollToFeatures = () => {
    const element = document.getElementById('caracteristicas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-10 pb-20 md:pt-16 md:pb-24 bg-gradient-to-br from-cyan-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">

          {/* Chat Mockup - Mobile first, then text */}
          <div className="relative w-full flex justify-center mb-4 lg:hidden">
            {/* Mobile/Tablet Mockup */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-4 md:p-6 w-[360px] h-[380px] flex flex-col justify-between relative mx-auto overflow-hidden">
                <div className="absolute top-2 right-2 z-20">
                    <Image src="https://cdn.pixabay.com/photo/2015/08/03/13/58/whatsapp-873316_1280.png" alt="Whatsapp Icon" width={48} height={48} className="object-contain" />
                </div>
                <div className="flex items-center border-b pb-3 mb-4 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-teal-500" />
                  </div>
                  <div className="ml-3 flex flex-col">
                    <h3 className="font-bold text-gray-800">Tu Clínica</h3>
                    <p className="text-sm text-teal-500 flex items-center">
                      <WhatsappIcon className="h-4 w-4 mr-1 text-green-500" />
                      En línea
                    </p>
                  </div>
                </div>
                <div className="flex-1 relative overflow-y-auto space-y-4 mb-4 px-1">
                  <div className="bg-teal-50 rounded-lg p-3 max-w-xs ml-auto relative">
                    <p className="text-gray-700">Hola, me gustaría agendar una cita para una limpieza dental.</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs relative">
                    <p className="text-gray-700">¡Hola! Con gusto te ayudo a agendar tu cita para limpieza dental. ¿Para qué día te gustaría programarla?</p>
                  </div>
                   <div className="bg-teal-50 rounded-lg p-3 max-w-xs ml-auto relative">
                    <p className="text-gray-700">¿Tienen disponibilidad para este viernes en la tarde?</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none bg-gradient-to-t from-cyan-50 to-transparent z-10 mx-auto w-[360px]"></div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center lg:text-left w-full">
            {/* Text Content */}
            <div className="max-w-3xl lg:w-1/2 lg:order-first">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-800">
                Gestiona tu clínica dental con <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">SORO™</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Tu asistente virtual con inteligencia artificial diseñado para automatizar la comunicación con pacientes, gestionar citas y liberar a tu equipo de tareas repetitivas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <Button 
                  onClick={handleDemoClick}
                  size="lg"
                  className="bg-teal-500 hover:bg-teal-600 text-white text-lg font-medium"
                >
                  Solicitar Demostración
                </Button>
                <Button 
                  onClick={scrollToFeatures}
                  size="lg"
                  variant="outline"
                  className="border-teal-500 text-teal-500 hover:bg-teal-50 text-lg font-medium"
                >
                  Ver Cómo Funciona
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {[
                  { icon: <Bot className="h-5 w-5 text-teal-500" />, text: "Respuestas inteligentes" },
                  { icon: <Calendar className="h-5 w-5 text-teal-500" />, text: "Agendamiento automático" },
                  { icon: <Clock className="h-5 w-5 text-teal-500" />, text: "Disponible 24/7" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                    {item.icon}
                    <span className="ml-2 text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Mockup */}
            <div className="relative hidden lg:block lg:w-1/2 lg:order-last">
              <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 max-w-md mx-auto transform rotate-1">
                <div className="border-b pb-3 mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <Bot className="h-6 w-6 text-teal-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold text-gray-800">SORO™ Asistente</h3>
                      <p className="text-sm text-teal-500">En línea</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-4">
                  <div className="bg-teal-50 rounded-lg p-3 max-w-xs ml-auto">
                    <p className="text-gray-700">Hola, me gustaría agendar una cita para una limpieza dental.</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-gray-700">¡Hola! Con gusto te ayudo a agendar tu cita para limpieza dental. ¿Para qué día te gustaría programarla?</p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-3 max-w-xs ml-auto">
                    <p className="text-gray-700">¿Tienen disponibilidad para este viernes en la tarde?</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg transform -rotate-3 hidden md:block">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Cita agendada exitosamente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800">
      <DynamicHeader />
      <main className="flex-1">
        
        <Hero />
        <LogoCloud />
        <Benefits />

        {/* Features Section */}
        <section id="caracteristicas" className="w-full py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
                 <h2 className="text-3xl font-bold tracking-tighter text-gray-900 md:text-4xl/tight">
                    Todo lo que tu clínica necesita para triunfar
                </h2>
                <p className="mx-auto max-w-2xl text-gray-600 md:text-xl/relaxed mt-4">
                    SORO™ te da las herramientas para automatizar la comunicación, optimizar flujos y crecer tu negocio.
                </p>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-teal-100">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Section */}
        <section id="explore" className="w-full bg-gray-50 py-20 md:py-24 lg:py-32">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter text-gray-900 md:text-4xl/tight">
                Explora nuestras Páginas de Aterrizaje
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre plantillas de alta conversión diseñadas para hacer crecer tu práctica.
              </p>
            </div>
            <div className="flex justify-center">
                <Button asChild size="lg" variant="link" className="text-teal-600">
                  <Link href="/landing-pages">
                    Ver todas las plantillas <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

    