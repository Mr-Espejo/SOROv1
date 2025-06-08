import React from 'react';
import { MessageSquare, Mail, Phone, Instagram, Facebook, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <MessageSquare className="h-8 w-8 text-teal-400 mr-2" />
              <span className="text-2xl font-bold">
                SORO<span className="text-xs align-top">™</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Sistema Odontológico de Respuesta Oportuna. Transformando clínicas dentales con inteligencia artificial.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {['Inicio', 'Beneficios', 'Características', 'Implementación', 'Precios', 'Testimonios'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Recursos</h3>
            <ul className="space-y-2">
              {[
                'Blog', 
                'Casos de Éxito', 
                'Preguntas Frecuentes', 
                'Guías de Implementación',
                'Política de Privacidad',
                'Términos y Condiciones'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-teal-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">info@sorodental.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-teal-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">+57 300 123 4567</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium text-white mb-2">Suscríbete a nuestro newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:border-teal-400 w-full"
                />
                <button className="bg-teal-500 hover:bg-teal-400 px-4 py-2 rounded-r-md transition-colors">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SORO™ - Sistema Odontológico de Respuesta Oportuna. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};