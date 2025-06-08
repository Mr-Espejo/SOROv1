import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export const Timeline: React.FC = () => {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  
  const weeks = [
    {
      week: 1,
      title: "Diagnóstico de atención y flujo actual",
      description: "Analizamos tu proceso actual de captación y atención de pacientes para identificar oportunidades de mejora.",
      details: [
        "Auditoría completa de canales de comunicación",
        "Mapeo de flujos de conversación existentes",
        "Análisis de tiempos de respuesta y efectividad",
        "Identificación de cuellos de botella en el proceso"
      ]
    },
    {
      week: 2,
      title: "Diseño de experiencia conversacional personalizada",
      description: "Creamos la personalidad y flujos de tu asistente virtual adaptados a tu marca y especialidades.",
      details: [
        "Definición del tono y estilo de comunicación",
        "Creación de árbol de decisiones para conversaciones",
        "Diseño de respuestas para preguntas frecuentes",
        "Prototipo inicial de tu chatbot personalizado"
      ]
    },
    {
      week: 3,
      title: "Implementación de SORO en WhatsApp y Web",
      description: "Integramos el chatbot en tus principales canales de comunicación con pacientes.",
      details: [
        "Configuración de WhatsApp Business API",
        "Instalación de widget en tu sitio web",
        "Pruebas de funcionamiento en ambos canales",
        "Ajustes de diseño visual y experiencia"
      ]
    },
    {
      week: 4,
      title: "Integración con calendario y CRM",
      description: "Conectamos SORO con tus herramientas actuales para sincronizar agendas y datos de pacientes.",
      details: [
        "Configuración con Google Calendar",
        "Integración con tu sistema de gestión actual",
        "Sincronización automática de disponibilidad",
        "Configuración de notificaciones por email"
      ]
    },
    {
      week: 5,
      title: "Entrenamiento de IA con tus preguntas frecuentes reales",
      description: "Personalizamos la inteligencia artificial con información específica de tu clínica.",
      details: [
        "Carga de tratamientos y especialidades",
        "Configuración de precios y políticas",
        "Entrenamiento con historiales de conversación",
        "Refinamiento de respuestas personalizadas"
      ]
    },
    {
      week: 6,
      title: "Optimización + Dashboard de rendimiento",
      description: "Afinamos el sistema y te damos acceso a métricas clave sobre su funcionamiento.",
      details: [
        "Análisis de primeras conversaciones",
        "Optimización de flujos problemáticos",
        "Configuración de dashboard personalizado",
        "Capacitación para interpretar métricas"
      ]
    },
    {
      week: 7,
      title: "Posicionamiento digital con IA",
      description: "Potenciamos tu presencia online con contenido generado automáticamente.",
      details: [
        "Creación de videos con voz IA para redes",
        "Generación de posts para Instagram/Facebook",
        "Configuración de publicaciones automáticas",
        "Estrategia de contenido para 90 días"
      ]
    },
    {
      week: 8,
      title: "Sesión de escalamiento + estrategia de adquisición",
      description: "Diseñamos un plan para multiplicar el impacto y captar más pacientes de forma recurrente.",
      details: [
        "Análisis de resultados de las primeras 7 semanas",
        "Plan personalizado para captar 50-100 citas/mes",
        "Estrategia de remarketing automático",
        "Configuración de campañas de captación"
      ]
    }
  ];

  return (
    <section id="implementación" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Implementación en 8 Semanas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un proceso probado y estructurado para transformar tu clínica sin interrumpir tus operaciones diarias.
          </p>
        </div>

        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-teal-100"></div>
          
          <div className="space-y-12">
            {weeks.map((week, index) => (
              <div key={index} className="relative">
                <div className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Week number circle */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold z-10">
                    {week.week}
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div 
                      className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${
                        expandedWeek === week.week ? 'shadow-lg' : 'hover:shadow-lg'
                      }`}
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Semana {week.week}: {week.title}</h3>
                      <p className="text-gray-600 mb-4">{week.description}</p>
                      
                      <button 
                        onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
                        className="text-teal-500 font-medium flex items-center hover:text-teal-600 transition-colors"
                      >
                        {expandedWeek === week.week ? 'Ver menos' : 'Ver detalles'}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                      
                      {expandedWeek === week.week && (
                        <div className="mt-4 space-y-2 pt-4 border-t border-gray-100">
                          {week.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start">
                              <Check className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-md transition-colors text-lg font-medium">
            Comenzar Mi Implementación
          </button>
          <p className="text-gray-500 mt-4">Sin compromiso, agenda una llamada de diagnóstico</p>
        </div>
      </div>
    </section>
  );
};