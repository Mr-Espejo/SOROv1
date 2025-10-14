'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, Calendar, Clock, Menu, X, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SoroLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { Benefits } from '@/components/landing/benefits';

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Beneficios', id: 'beneficios' },
    { name: 'Características', id: 'caracteristicas' },
    { name: 'Implementación', id: 'implementacion' },
    { name: 'Precios', id: 'precios' },
    { name: 'Testimonios', id: 'testimonios' }
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
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button 
              key={item.name} 
              onClick={() => scrollToSection(item.id)}
              className={`transition-colors font-medium text-gray-700 hover:text-teal-500`}
            >
              {item.name}
            </button>
          ))}
          <Button onClick={handleDemoClick} className="bg-teal-500 hover:bg-teal-600 text-white">
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
                onClick={() => scrollToSection(item.id)}
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
    <section className="pt-24 pb-20 md:pt-28 md:pb-24 bg-gradient-to-br from-cyan-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-800">
            Gestiona tu clínica dental con <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">SORO™</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Tu asistente virtual con inteligencia artificial diseñado para automatizar la comunicación con pacientes, gestionar citas y liberar a tu equipo de tareas repetitivas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
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
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
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
          
          <div className="md:w-1/2 md:pl-10 relative">
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
                
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-gray-700">Sí, tenemos disponibilidad el viernes a las 3:00 PM o 5:30 PM. ¿Cuál horario prefieres?</p>
                </div>
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  className="flex-grow px-4 py-2 bg-gray-100 rounded-l-lg focus:outline-none"
                  readOnly
                />
                <button className="bg-teal-500 text-white px-4 py-2 rounded-r-lg">
                  Enviar
                </button>
              </div>
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
    </section>
  );
};


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800">
      <DynamicHeader />
      <main className="flex-1">
        
        <Hero />
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
