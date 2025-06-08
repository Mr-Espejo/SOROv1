import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, Volume2, VolumeX } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Descubre Cómo Automatizar tu Clínica Dental y Conseguir Más Pacientes con Inteligencia Artificial
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Mira este video de 12 minutos y descubre cómo SORO™ puede transformar tu consulta dental
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          {!isPlaying && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-10">
              <button
                onClick={() => {
                  setIsPlaying(true);
                  setIsMuted(false);
                }}
                className="bg-teal-500 hover:bg-teal-400 text-white rounded-full p-6 transition-transform transform hover:scale-110"
              >
                <Play className="h-12 w-12" />
              </button>
            </div>
          )}
          
          <div className="aspect-video bg-gray-800">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              width="100%"
              height="100%"
              playing={isPlaying}
              muted={isMuted}
              controls={isPlaying}
              config={{
                youtube: {
                  playerVars: { showinfo: 0, rel: 0 }
                }
              }}
            />
          </div>
          
          {!isPlaying && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-70 p-2 rounded-full"
            >
              {isMuted ? (
                <VolumeX className="h-6 w-6 text-white" />
              ) : (
                <Volume2 className="h-6 w-6 text-white" />
              )}
            </button>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            🔊 Asegúrate de tener el sonido activado para una mejor experiencia
          </p>
        </div>
      </div>
    </section>
  );
};