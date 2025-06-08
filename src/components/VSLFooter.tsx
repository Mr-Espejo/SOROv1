import React from 'react';

export const VSLFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">
            © {new Date().getFullYear()} SORO™ - Sistema Odontológico de Respuesta Oportuna
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
              Política de Privacidad
            </a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};