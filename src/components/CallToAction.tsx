import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Agenda tu Sesión de Diagnóstico
            <span className="block text-teal-400 mt-2">100% Gratuita</span>
          </h2>
          
          <div className="bg-gray-900 rounded-xl p-6 md:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "Análisis personalizado de tu clínica",
                "Plan de implementación a medida",
                "Proyección de ROI específica",
                "Demo en vivo de SORO™"
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-teal-400 mr-2" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/connect-whatsapp')}
                className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors w-full md:w-auto"
              >
                <span className="flex items-center justify-center">
                  Conectar WhatsApp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </button>
              
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors w-full md:w-auto">
                <span className="flex items-center justify-center">
                  Reservar Mi Diagnóstico Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </button>
            </div>
          </div>
          
          <p className="text-gray-400">
            * Cupos limitados: Solo 5 clínicas por semana
          </p>
        </div>
      </div>
    </section>
  );
};