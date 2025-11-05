'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, Calendar, Clock, Menu, X, CheckCircle2, MessageSquare, ChevronDown, Video, BookOpen, Presentation, PlayCircle, Cpu, Sliders, Sparkles, MessageCircle, BarChart, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { SoroLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogoCloud } from '@/components/landing/logo-cloud';
import { Card, CardContent } from '@/components/ui/card';

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
    router.push('/demo');
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
    { 
      name: '¿Para quién es?', 
      isDropdown: true,
      content: (
        <div className="p-2">
          <DropdownMenuLabel className="text-muted-foreground font-semibold text-xs">SOLUCIONES PARA</DropdownMenuLabel>
          <DropdownMenuItem className="gap-3">
              <div className="bg-teal-100 p-2 rounded-md">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 14C8 12.3431 9.34315 11 11 11H13C14.6569 11 16 12.3431 16 14V18H8V14Z" stroke="#14B8A6" strokeWidth="1.5"/>
                    <path d="M14 8C15.1046 8 16 8.89543 16 10V11H14V10C14 9.44772 13.5523 9 13 9H11C10.4477 9 10 9.44772 10 10V11H8V10C8 8.89543 8.89543 8 10 8H14Z" stroke="#14B8A6" strokeWidth="1.5"/>
                    <path d="M12 4L14 7H10L12 4Z" fill="#14B8A6"/>
                    <rect x="5" y="18" width="14" height="2" rx="1" fill="#14B8A6"/>
                 </svg>
              </div>
              <div>
                <p className="font-semibold">Propietarios de Clínica</p>
                <p className="text-xs text-muted-foreground">Soluciones para Odontólogos Propietarios</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3">
              <div className="bg-teal-100 p-2 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="12" height="14" rx="2" stroke="#14B8A6" strokeWidth="1.5"/>
                    <path d="M10 11H14" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M10 14H14" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 6V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V6" stroke="#14B8A6" strokeWidth="1.5"/>
                    <path d="M12 11V14" stroke="#14B8A6" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold">Directores de Clínica</p>
                <p className="text-xs text-muted-foreground">Herramientas para gestionar eficientemente tu Clínica Dental</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3">
              <div className="bg-teal-100 p-2 rounded-md">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="#14B8A6" strokeWidth="1.5"/>
                    <path d="M12 3V21" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 12H21" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7 8C8.85694 7.35991 10.8856 7 12 7C13.1144 7 15.1431 7.35991 17 8" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7 16C8.85694 16.6401 10.8856 17 12 17C13.1144 17 15.1431 16.6401 17 16" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round"/>
                 </svg>
              </div>
              <div>
                <p className="font-semibold">Directores de Cadena de Clínicas</p>
                <p className="text-xs text-muted-foreground">Control centralizado de múltiples centros</p>
              </div>
            </DropdownMenuItem>
        </div>
      )
    },
    { 
      name: 'Recursos',
      isDropdown: true,
      content: (
        <div className="p-2">
          <DropdownMenuLabel className="text-muted-foreground font-semibold text-xs">APRENDE MÁS</DropdownMenuLabel>
          <Link href="/demo">
            <DropdownMenuItem className="gap-3"><PlayCircle size={20}/> Realizar Demo</DropdownMenuItem>
          </Link>
          <Link href="/lead-magnet">
            <DropdownMenuItem className="gap-3"><BookOpen size={20}/> Ver Ebook</DropdownMenuItem>
          </Link>
          <Link href="/demo">
            <DropdownMenuItem className="gap-3"><Presentation size={20}/> Ver Webinars</DropdownMenuItem>
          </Link>
          <Link href="/vsl-opt-in">
            <DropdownMenuItem className="gap-3"><Video size={20}/> Ver Video de Ventas</DropdownMenuItem>
          </Link>
        </div>
      )
    },
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
                  <DropdownMenuContent className={item.name === 'Funcionalidades' ? 'w-[500px]' : 'w-auto'}>
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
    router.push('/demo');
  };

  const scrollToFeatures = () => {
    const element = document.getElementById('caracteristicas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-10 pb-12 md:pt-16 md:pb-20 bg-gradient-to-br from-cyan-50 to-teal-50">
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
                <span className="text-3xl md:text-4xl lg:text-5xl text-green-600 font-semibold ml-2">+ Whatsapp</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Tu asistente virtual con IA para automatizar la comunicación por WhatsApp, gestionar citas y liberar a tu equipo de tareas repetitivas.
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


const SectionWrapper: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => (
  <motion.section
    className={className}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.section>
);


const WhySoroSection: React.FC = () => {
  const valueBullets = [
    { icon: <Bot />, title: 'Responde con inteligencia humana', description: 'SORO entiende las preguntas reales de tus pacientes.' },
    { icon: <Calendar />, title: 'Agenda automática', description: 'Integra WhatsApp, Instagram y Google Calendar.' },
    { icon: <Clock />, title: 'Nunca duerme', description: 'Atiende 24/7, sin pausas, sin errores.' },
    { icon: <Sliders />, title: 'Habla como tu clínica', description: 'Personaliza el tono, respuestas y estilo.' },
  ];
  return (
    <SectionWrapper className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-teal-500 font-semibold">Por qué SORO cambia las reglas del juego</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              La nueva forma de atender pacientes ha llegado.
            </h2>
            <p className="text-lg text-gray-600">
              “Antes necesitabas recepcionistas, recordatorios manuales y horas respondiendo mensajes de WhatsApp. Con SORO™, tu clínica se vuelve autónoma: responde, agenda y confirma citas automáticamente.”
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valueBullets.map(bullet => (
              <div key={bullet.title} className="bg-gray-50/80 p-6 rounded-xl border border-gray-100 transition-all hover:border-teal-200 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-teal-600 mb-4">
                  {React.cloneElement(bullet.icon, { className: 'h-6 w-6' })}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{bullet.title}</h3>
                <p className="text-gray-600 text-sm">{bullet.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const TestimonialSection: React.FC = () => {
  return (
    <SectionWrapper className="py-12 md:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          De mensajes sin responder... a pacientes felices.
        </h2>
        <blockquote className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-300 italic mb-6">
            “Antes perdíamos pacientes cada fin de semana. Ahora, SORO responde al instante por WhatsApp, agenda y nos notifica. Cerramos más citas que nunca.”
          </p>
          <footer className="text-teal-400 font-semibold">— Clínica Dental SmilePro, Bogotá</footer>
        </blockquote>
      </div>
    </SectionWrapper>
  );
};


const HowItWorksSection: React.FC = () => {
  const router = useRouter();
  const steps = [
    {
      icon: <MessageSquare className="h-8 w-8 text-teal-500" />,
      title: 'El paciente escribe',
      description: 'Inicia la conversación por WhatsApp o Instagram, a cualquier hora.',
    },
    {
      icon: <Bot className="h-8 w-8 text-teal-500" />,
      title: 'SORO responde',
      description: 'Automáticamente propone horarios disponibles según tu calendario.',
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-teal-500" />,
      title: 'Cita confirmada',
      description: 'El paciente confirma y tú solo te preocupas por atenderlo.',
    },
  ];
  return (
    <SectionWrapper className="py-12 md:py-20 bg-gradient-to-b from-cyan-50 to-teal-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Tu clínica trabaja mientras tú descansas.
          </h2>
          <p className="text-lg text-gray-600">
            Sin apps nuevas. Sin configuraciones complicadas. Solo resultados.
          </p>
        </div>

        <div className="relative">
          <div className="grid lg:grid-cols-3 gap-8 items-start relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md relative">
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white font-bold text-lg shadow-sm">
                    {index + 1}
                  </span>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600 max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
          {/* Decorative line for desktop */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-200/80 -translate-y-1/2 z-0"></div>
        </div>

        <div className="text-center mt-16">
          <Button
            size="lg"
            onClick={() => router.push('/demo')}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            Pide una demo y mira cómo SORO trabaja por ti <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
};

const InnovationSection: React.FC = () => {
  return (
    <SectionWrapper className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Más que un chatbot, una nueva generación de atención dental.
            </h2>
            <p className="text-lg text-gray-600">
              SORO™ no es un bot genérico. Es un sistema conversacional entrenado para el sector odontológico, diseñado para hablar el idioma de tus pacientes, realizar seguimiento y convertir conversaciones en ingresos reales.
            </p>
          </div>
          <div>
            <Image
              src="https://picsum.photos/seed/soro-chat-mockup-new/600/400"
              alt="Conversación de chat de SORO en un teléfono"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
              data-ai-hint="chatbot conversation whatsapp"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const FinalCTASection: React.FC = () => {
  const router = useRouter();
  return (
    <SectionWrapper className="py-12 md:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          Tu clínica no necesita más horas… necesita a SORO.
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          Agenda una demostración gratuita y descubre cómo automatizar el 80% de la atención sin perder el toque humano.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => router.push('/demo')} className="bg-teal-500 hover:bg-teal-600 text-white">
            Agendar Demo Gratis
          </Button>
          <Button size="lg" variant="outline" onClick={() => router.push('/demo')} className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900">
            Hablar con un Especialista
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
};


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800">
      <DynamicHeader />
      <main className="flex-1">
        <Hero />
        <LogoCloud />
        <WhySoroSection />
        <TestimonialSection />
        <HowItWorksSection />
        <InnovationSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
