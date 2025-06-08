import React from 'react';
import { MessageSquare } from 'lucide-react';

export const VSLHeader: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-teal-400 mr-2" />
            <span className="text-2xl font-bold text-white">
              SORO<span className="text-xs align-top text-teal-400">™</span>
            </span>
          </div>
          <div className="hidden md:block">
            <p className="text-teal-400 font-medium">
              Acceso Exclusivo: Solo para Odontólogos Seleccionados
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};