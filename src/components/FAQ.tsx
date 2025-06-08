import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);
  
  const faqItems = [
    {
      question: "¿Cuánto tiempo toma implementar SORO en mi clínica?",
      answer: "La implementación completa toma 8 semanas, siguiendo nuestro proceso estructurado. Sin embargo, la versión básica de SORO puede estar funcionando en WhatsApp en tan solo 48 horas si eliges la opción de Setup Express."
    },
    {
      question: "¿Necesito cambiar mis sistemas actuales de agenda y gestión?",
      answer: "No, SORO está diseñado para integrarse con tus sistemas existentes. Funciona con Google Calendar, sistemas de gestión dental populares y agendas manuales. Nuestro equipo se encarga de la integración durante el proceso de implementación."
    },
    {
      question: "¿Cómo maneja SORO las consultas complejas o situaciones de emergencia?",
      answer: "SORO está entrenado para identificar situaciones de emergencia y escalarlas inmediatamente a tu equipo humano. Para consultas complejas, el sistema recopila la información básica y la transfiere a un especialista humano cuando es necesario, garantizando que ninguna situación importante quede sin atención."
    },
    {
      question: "¿Funciona SORO con cualquier especialidad odontológica?",
      answer: "Sí, SORO se personaliza específicamente para tu especialidad, ya sea odontología general, ortodoncia, cirugía maxilofacial, odontopediatría, etc. Entrenamos al sistema con tu información específica, tratamientos, precios y protocolos."
    },
    {
      question: "¿Qué pasa si ya tengo una recepcionista o asistente?",
      answer: "SORO complementa el trabajo de tu personal actual, liberándolos de tareas repetitivas y permitiéndoles enfocarse en actividades de mayor valor. Tu recepcionista puede concentrarse en brindar atención personalizada a los pacientes presenciales mientras SORO maneja las consultas digitales 24/7."
    },
    {
      question: "¿Cómo se garantiza la privacidad de los datos de los pacientes?",
      answer: "SORO cumple con todas las normativas de protección de datos. La información se almacena con encriptación de nivel bancario y nunca se comparte con terceros. Además, implementamos protocolos de consentimiento informado para cumplir con las regulaciones de salud."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre la implementación de SORO™ en tu clínica.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center"
                  onClick={() => setOpenItem(openItem === index ? null : index)}
                >
                  <h3 className="font-bold text-gray-800">{item.question}</h3>
                  {openItem === index ? (
                    <ChevronUp className="h-5 w-5 text-teal-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-teal-500" />
                  )}
                </button>
                
                {openItem === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-3">¿Tienes más preguntas?</h3>
            <p className="text-gray-600 mb-6">
              Estamos aquí para ayudarte. Agenda una llamada de consulta gratuita y resolveremos todas tus dudas.
            </p>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md transition-colors font-medium">
              Contactar a un Especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};