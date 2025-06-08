import React, { useState } from 'react';
import { MessageSquare, Calendar, Bot, BarChart3, BellRing, Users, FileText, Phone } from 'lucide-react';

export const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('whatsapp');
  
  const features = [
    {
      id: 'whatsapp',
      icon: <Phone className="h-6 w-6" />,
      title: 'WhatsApp',
      description: 'Respuesta automática a mensajes de WhatsApp con tu chatbot personalizado.',
      image: 'https://images.pexels.com/photos/5644599/pexels-photo-5644599.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'web',
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Sitio Web',
      description: 'Widget de chat en tu sitio web para capturar consultas las 24 horas.',
      image: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'agenda',
      icon: <Calendar className="h-6 w-6" />,
      title: 'Agendamiento',
      description: 'Integración con tu calendario para agendar citas automáticamente.',
      image: 'https://images.pexels.com/photos/5752254/pexels-photo-5752254.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'analiticas',
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analíticas',
      description: 'Reportes detallados de conversaciones, citas y efectividad.',
      image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];
  
  const activeFeature = features.find(f => f.id === activeTab) || features[0];

  return (
    <section id="características" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Características Principales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            SORO™ funciona donde tus pacientes ya están, con inteligencia artificial especializada en odontología.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gradient-to-b from-teal-500 to-cyan-600 p-6 md:p-8">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-6">Canales integrados</h3>
              
              <div className="space-y-4">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all flex items-center ${
                      activeTab === feature.id
                        ? 'bg-white text-teal-600 shadow-md'
                        : 'bg-transparent text-white bg-opacity-20 hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <div className={`rounded-full p-2 mr-3 ${
                      activeTab === feature.id ? 'bg-teal-100' : 'bg-teal-100 bg-opacity-20'
                    }`}>
                      {feature.icon}
                    </div>
                    <span className="font-medium">{feature.title}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{activeFeature.title}</h3>
                  <p className="text-gray-600">{activeFeature.description}</p>
                </div>
                
                <div className="flex-grow rounded-xl overflow-hidden relative h-64 md:h-80">
                  <img 
                    src={activeFeature.image} 
                    alt={activeFeature.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Bot />, title: "IA Especializada", desc: "Entrenada en odontología" },
            { icon: <BellRing />, title: "Notificaciones", desc: "Alertas de nuevas citas" },
            { icon: <Users />, title: "Multiusuario", desc: "Acceso para todo tu equipo" },
            { icon: <FileText />, title: "Plantillas", desc: "Respuestas predefinidas" }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-teal-50 w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-teal-500">{item.icon}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};