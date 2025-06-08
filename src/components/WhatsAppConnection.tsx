import React, { useState } from 'react';
import { MessageSquare, Phone, Check, AlertCircle } from 'lucide-react';

export const WhatsAppConnection: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.match(/^\+?[1-9]\d{1,14}$/)) {
      setError('Por favor ingresa un número de WhatsApp válido');
      return;
    }

    // Here you would typically send this to your backend
    setIsSubmitted(true);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <MessageSquare className="h-12 w-12 text-teal-400 mr-3" />
              <Phone className="h-12 w-12 text-teal-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Conecta tu WhatsApp con SORO™
            </h1>
            <p className="text-xl text-gray-300">
              Comienza a automatizar tus respuestas y agenda en menos de 5 minutos
            </p>
          </div>

          {!isSubmitted ? (
            <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-white mb-2 font-medium">
                    Número de WhatsApp
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+57 300 123 4567"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                  {error && (
                    <div className="mt-2 flex items-center text-coral-500">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 text-gray-300">
                  <p className="font-medium">Al continuar:</p>
                  <ul className="space-y-2">
                    {[
                      'Recibirás un mensaje de WhatsApp para confirmar la conexión',
                      'SORO™ comenzará a responder automáticamente',
                      'Podrás personalizar las respuestas desde tu panel',
                      'Mantendrás el control total de tu WhatsApp'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-teal-400 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-400 text-white py-3 rounded-lg transition-colors font-medium text-lg"
                >
                  Conectar WhatsApp
                </button>
              </form>

              <p className="mt-6 text-sm text-gray-400 text-center">
                Tu información está segura y nunca será compartida con terceros.
              </p>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl p-8 shadow-xl text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                ¡Excelente! Ya casi está listo
              </h2>
              <p className="text-gray-300 mb-6">
                Revisa tu WhatsApp para completar la conexión con SORO™. Te hemos enviado un mensaje con los siguientes pasos.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
              >
                Usar otro número
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};