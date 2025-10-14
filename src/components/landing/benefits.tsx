import React from 'react';
import { Clock, Calendar, DollarSign, Users, Bot, CheckCircle2 } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-teal-400" />,
      title: "Atención 24/7",
      description: "Tu clínica nunca duerme: respuestas instantáneas a cualquier hora"
    },
    {
      icon: <Calendar className="h-8 w-8 text-teal-400" />,
      title: "+30% Más Citas",
      description: "Aumento demostrado en citas efectivas al responder al instante"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-teal-400" />,
      title: "$4M+ Mensuales",
      description: "Recupera ingresos perdidos por citas no agendadas"
    },
    {
      icon: <Users className="h-8 w-8 text-teal-400" />,
      title: "Sin Personal Extra",
      description: "Funciona sin necesidad de contratar recepcionistas"
    },
    {
      icon: <Bot className="h-8 w-8 text-teal-400" />,
      title: "IA Especializada",
      description: "Entrenada específicamente en odontología y tu clínica"
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-teal-400" />,
      title: "Setup en 48h",
      description: "Implementación rápida sin interrumpir tu operación"
    }
  ];

  return (
    <section id="beneficios" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ¿Por qué elegir SORO™?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transforma tu clínica dental con la tecnología más avanzada del mercado
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-teal-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="mr-4 bg-teal-50 p-2 rounded-lg">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
