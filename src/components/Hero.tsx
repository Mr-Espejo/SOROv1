import React from 'react';
import { Calendar, Clock, Users, Bot, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-28 pb-20 md:pt-32 md:pb-24 bg-gradient-to-br from-cyan-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">SORO™</span>
              <span className="block text-gray-800">
                Tu Asistente Dental con IA
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Automatiza las respuestas, agenda más citas y no pierdas ni un solo paciente potencial, 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-md transition-colors text-lg font-medium">
                Solicitar Demostración
              </button>
              <button className="border border-teal-500 text-teal-500 hover:bg-teal-50 px-8 py-3 rounded-md transition-colors text-lg font-medium">
                Ver Cómo Funciona
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4">
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