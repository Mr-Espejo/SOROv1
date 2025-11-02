'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const steps = [
  { id: 'welcome', title: 'Bienvenida' },
  { id: 'clinic-data', title: 'Datos de la Clínica' },
  { id: 'contact-data', title: 'Datos de Contacto' },
  { id: 'test-mode', title: 'Modo de Prueba' },
  { id: 'test-objective', title: 'Objetivo' },
];

const WelcomeStep = ({ onNext }: { onNext: () => void }) => (
    <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
         ¡Hola! 👋 Soy SORO, tu asistente automatizado para clínicas.
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
            En 2 minutos podrás probar cómo funciona.
        </p>
        <Button size="lg" onClick={onNext} className="mt-8">Comenzar</Button>
    </div>
);

const ClinicDataStep = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>1. Datos de tu clínica o negocio</CardTitle>
            <CardDescription>Esto nos permite personalizar el entorno de prueba y los mensajes del chatbot.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
             <div className="space-y-2">
                <Label htmlFor="clinicName">Nombre de la clínica o consultorio</Label>
                <Input id="clinicName" placeholder="Ej: Clínica Sonrisas Bogotá" />
            </div>
             <div className="space-y-2">
                <Label>Tipo de servicio</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="odontologia">Odontología</SelectItem>
                        <SelectItem value="estetica">Estética</SelectItem>
                        <SelectItem value="medicina">Medicina</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" placeholder="Ej: Bogotá" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Input id="country" placeholder="Ej: Colombia" />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="schedule">Horario de atención</Label>
                <Input id="schedule" placeholder="Ej. Lunes a Viernes 8am – 6pm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo (Opcional)</Label>
              <Input id="logo" type="file" />
              <p className="text-xs text-muted-foreground">Si deseas que aparezca en la interfaz de prueba.</p>
            </div>
            <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={onBack}>Atrás</Button>
                <Button onClick={onNext}>Siguiente</Button>
            </div>
        </CardContent>
    </Card>
);


export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const progress = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      {currentStep > 0 && (
          <div className="mb-8 space-y-4">
              <Progress value={progress} className="w-full" />
              <p className="text-center text-sm text-muted-foreground">Paso {currentStep} de {steps.length -1}</p>
          </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 0 && <WelcomeStep onNext={handleNext} />}
          {currentStep === 1 && <ClinicDataStep onNext={handleNext} onBack={handleBack} />}
          {/* Los siguientes pasos se añadirán aquí */}
          {currentStep === 2 && <div className="text-center p-8 bg-gray-100 rounded-lg">Paso de Contacto (en construcción) <div className="flex justify-between pt-4"><Button variant="ghost" onClick={handleBack}>Atrás</Button><Button onClick={handleNext}>Siguiente</Button></div></div>}
          {currentStep === 3 && <div className="text-center p-8 bg-gray-100 rounded-lg">Paso de Modo de Prueba (en construcción) <div className="flex justify-between pt-4"><Button variant="ghost" onClick={handleBack}>Atrás</Button><Button onClick={handleNext}>Siguiente</Button></div></div>}
          {currentStep === 4 && <div className="text-center p-8 bg-gray-100 rounded-lg">Paso de Objetivo (en construcción) <div className="flex justify-between pt-4"><Button variant="ghost" onClick={handleBack}>Atrás</Button><Button onClick={() => alert("¡Flujo completado!")}>Finalizar</Button></div></div>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}