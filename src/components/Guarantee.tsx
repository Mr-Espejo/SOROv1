import React from 'react';
import { Shield } from 'lucide-react';

export const Guarantee: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl p-8 border-2 border-teal-400">
          <div className="flex flex-col md:flex-row items-center text-center md:text-left">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="bg-teal-400 bg-opacity-20 rounded-full p-4">
                <Shield className="h-12 w-12 text-teal-400" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Garantía de Resultados a 30 Días
              </h2>
              <p className="text-gray-300 text-lg mb-4">
                Si en los primeros 30 días no tienes al menos 15 interacciones automatizadas y 3 citas reales generadas, te devolvemos el 100% de tu inversión.
              </p>
              <p className="text-teal-400 font-medium">
                Sin preguntas. Sin condiciones ocultas. Garantizado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};