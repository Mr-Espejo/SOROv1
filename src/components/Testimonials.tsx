import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Dra. Carolina Mejía",
      role: "Odontóloga General, Clínica Dental Sonrisa",
      image: "https://images.pexels.com/photos/5214956/pexels-photo-5214956.jpeg?auto=compress&cs=tinysrgb&w=800",
      quote: "SORO ha transformado mi práctica. Antes perdía al menos 5 citas potenciales a la semana por no contestar a tiempo. Ahora mi agenda está siempre llena y mis pacientes quedan impresionados con la rapidez de atención.",
      rating: 5
    },
    {
      name: "Dr. Andrés Gutiérrez",
      role: "Ortodoncista, Centro de Especialidades Dentales",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800",
      quote: "Como especialista, mi tiempo es muy valioso. SORO me permite concentrarme en los tratamientos mientras el sistema maneja todas las consultas iniciales y agendamiento. Ha sido una inversión que se pagó sola en el primer mes.",
      rating: 5
    },
    {
      name: "Dra. Valentina Torres",
      role: "Directora, Clínica Odontológica Moderna",
      image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=800",
      quote: "Implementamos SORO en nuestras 3 sedes y el resultado ha sido espectacular. Aumentamos las citas en un 40% y redujimos los costos de personal de recepción. La personalización para cada especialidad fue excepcional.",
      rating: 5
    }
  ];
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Odontólogos que ya están experimentando el poder de la automatización inteligente.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute top-6 left-6 w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center z-10">
              <Quote className="h-6 w-6 text-teal-500" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 h-64 md:h-auto">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 text-lg italic mb-6">
                    "{testimonials[activeIndex].quote}"
                  </blockquote>
                </div>
                
                <div>
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-800 text-lg">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-500">{testimonials[activeIndex].role}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {activeIndex + 1} de {testimonials.length}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={prevTestimonial}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={nextTestimonial}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-teal-50 rounded-xl p-8 border border-teal-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md mx-auto md:mx-0">
                  <img 
                    src="https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Dental Clinic"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">¿Quieres ser el próximo caso de éxito?</h3>
                <p className="text-gray-600 mb-4">
                  Únete a las clínicas que están revolucionando la atención dental con SORO™.
                </p>
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md transition-colors font-medium">
                  Solicitar Demostración Gratuita
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};