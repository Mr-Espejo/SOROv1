import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <section id="precios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Inversión y Garantía
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Una inversión que se paga sola capturando las citas que antes se perdían.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          {/* Main pricing card */}
          <div className="lg:w-2/3 bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-teal-500">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-2">SORO ELITE™</h3>
                  <p className="opacity-90">8 Semanas para Automatizar y Escalar tu Clínica con IA</p>
                </div>
                <div className="bg-white text-teal-600 px-3 py-1 rounded-full text-sm font-semibold">
                  Más Popular
                </div>
              </div>
              
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-bold">$4,997,000</span>
                <span className="ml-2 opacity-80">COP</span>
              </div>
              <p className="mt-2 opacity-90">Pago único por implementación completa</p>
            </div>
            
            <div className="p-8">
              <h4 className="font-bold text-gray-800 mb-4 text-lg">Incluye:</h4>
              
              <div className="space-y-3 mb-8">
                {[
                  "SORO™ Chatbot IA personalizado para tu clínica",
                  "Integración en 3 canales (WhatsApp, web, Instagram DM)",
                  "Entrenamiento personalizado con tus servicios y precios",
                  "Panel de control y alertas de citas agendadas",
                  "Soporte VIP 30 días (ajustes + mejoras continuas)",
                  "Posicionamiento digital con contenido automático",
                  "Integración con tu calendario y sistema actual",
                  "Exclusividad de zona por 12 meses"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg transition-colors font-medium text-lg mb-4">
                Quiero SORO en mi Clínica
              </button>
              
              <p className="text-sm text-gray-500 text-center">
                Pago seguro mediante transferencia bancaria o tarjeta de crédito
              </p>
            </div>
          </div>
          
          {/* Guarantee and bonuses */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {/* Guarantee card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="rounded-full bg-orange-100 w-12 h-12 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Garantía 30 Días Sin Riesgo</h3>
              <p className="text-gray-600 mb-4">
                Si en los primeros 30 días no tienes al menos 15 interacciones automatizadas y 3 citas reales generadas, no pagas nada. Así de simple.
              </p>
              <div className="text-sm text-gray-500 italic">
                *Se aplican términos y condiciones
              </div>
            </div>
            
            {/* Bonuses card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex-grow">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Bonos Especiales</h3>
              <div className="space-y-4">
                {[
                  "Setup Express en 48h (valor: $500 USD)",
                  "Plantilla de WhatsApp reactivo (valor: $250 USD)",
                  "Kit de contenidos automáticos (valor: $400 USD)",
                  "Video Publicitario Animado (valor: $600 USD)"
                ].map((bonus, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-teal-100 text-teal-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">
                      +
                    </div>
                    <span className="text-gray-700">{bonus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};