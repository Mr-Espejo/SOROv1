'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ArrowRight, MessageSquare, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';


const step1Schema = z.object({
  clinicName: z.string().min(2, 'El nombre de la clínica es requerido'),
  email: z.string().email('El correo electrónico no es válido'),
  countryCode: z.string().min(1, 'Requerido').max(4),
  phone: z.string().min(7, 'El número de teléfono no es válido'),
});

const step2Schema = z.object({
  city: z.string().min(2, 'La ciudad es requerida'),
  address: z.string().min(5, 'La dirección es requerida'),
  openingHours: z.string().min(5, 'El horario es requerido'),
});

const step3Schema = z.object({
  testMode: z.enum(['qr_connect', 'sandbox', 'expert_call'], {
    required_error: 'Debes seleccionar una opción',
  }),
});


const validationSchemas = [
    null, // Welcome step has no validation
    step1Schema,
    step2Schema,
    step3Schema
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

const Step1 = () => (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>1. Datos de tu clínica</CardTitle>
            <CardDescription>Estos datos nos permiten personalizar el entorno de prueba.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
            <FormField
              name="clinicName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la clínica o consultorio</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Clínica Sonrisas Bogotá" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@tuclinica.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="space-y-2">
                <FormLabel>Número de Teléfono</FormLabel>
                <div className="flex gap-2">
                    <FormField
                    name="countryCode"
                    render={({ field }) => (
                        <FormItem className="w-1/4">
                        <FormControl>
                            <Input placeholder="+57" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="w-3/4">
                        <FormControl>
                            <Input placeholder="3001234567" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
            </div>
        </CardContent>
    </Card>
);

const Step2 = () => (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>2. Detalles de la clínica</CardTitle>
            <CardDescription>Esta información nos ayuda a entender mejor tus necesidades.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Bogotá" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Cra 7 #71-21" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <FormField
              name="openingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horario de atención</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Lunes a Viernes 8am – 6pm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </CardContent>
    </Card>
);

const Step3 = () => (
     <Card className="w-full">
        <CardHeader>
            <CardTitle>3. Elige cómo quieres probar SORO</CardTitle>
            <CardDescription>Ambas opciones te permitirán ver cómo el asistente agenda citas automáticamente.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
           <FormField
            name="testMode"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 gap-4">
                            <Label htmlFor="qr_connect" className="flex flex-col items-start gap-4 rounded-lg border p-4 transition-all hover:shadow-lg has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:shadow-xl">
                                <RadioGroupItem value="qr_connect" id="qr_connect" className="sr-only" />
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <span className="font-bold">Conectar mi WhatsApp</span>
                                    </div>
                                    <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-xs font-medium">Recomendado</div>
                                </div>
                                <p className="text-sm text-muted-foreground">Escanea un código QR con tu celular para conectar tu cuenta. Ideal si quieres probarlo con tus pacientes reales. ⏱️ Tarda 2 minutos.</p>
                            </Label>

                            <Label htmlFor="sandbox" className="flex flex-col items-start gap-4 rounded-lg border p-4 transition-all hover:shadow-lg has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:shadow-xl">
                                <RadioGroupItem value="sandbox" id="sandbox" className="sr-only" />
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <MessageSquare className="h-6 w-6" />
                                    </div>
                                    <span className="font-bold">Probar SORO en la web</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Accede a una demostración interactiva sin usar tu número real. Ideal si solo quieres ver cómo funciona. ⏱️ Tarda 1 minuto.</p>
                            </Label>

                            <Label htmlFor="expert_call" className="flex flex-col items-start gap-4 rounded-lg border p-4 transition-all hover:shadow-lg has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:shadow-xl">
                                <RadioGroupItem value="expert_call" id="expert_call" className="sr-only" />
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <span className="font-bold">Hablar con un experto</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Agenda una llamada para resolver tus dudas y recibir una asesoría personalizada sobre cómo SORO puede ayudar a tu clínica.</p>
                            </Label>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage className="pt-4"/>
                </FormItem>
            )}
            />
        </CardContent>
    </Card>
);

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const methods = useForm({
    resolver: async (data, context, options) => {
        const schema = validationSchemas[currentStep];
        if(!schema) return { values: data, errors: {} };
        return await zodResolver(schema)(data, context, options);
    },
    mode: "onChange",
  });

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
        const values = methods.getValues();
        setFormData(prev => ({...prev, ...values}));
      if (currentStep < 4 - 1) { // 4 steps in total (0-indexed)
        setCurrentStep(currentStep + 1);
      } else {
        // Final step, handle submission
        const finalData = {...formData, ...values};
        console.log('Final form data:', finalData);
        // Here you would save to Firestore
        // For now, navigate based on selection
        if (finalData.testMode === 'sandbox') {
            router.push('/demo/sandbox');
        } else {
            // Placeholder for other routes
            alert(`Flujo para "${finalData.testMode}" en construcción.`);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const totalSteps = 4; // Including welcome
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  const stepsComponents = [
      <WelcomeStep key="welcome" onNext={handleNext} />,
      <Step1 key="step1" />,
      <Step2 key="step2" />,
      <Step3 key="step3" />,
  ];

  const isFinalStep = currentStep === totalSteps - 1;

  return (
    <div className="w-full">
        <FormProvider {...methods}>
            {currentStep > 0 && (
              <div className="mb-8 space-y-4">
                  <Progress value={progress} className="w-full" />
                  <p className="text-center text-sm text-muted-foreground">Paso {currentStep} de {totalSteps -1}</p>
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
                  {stepsComponents[currentStep]}
                </motion.div>
            </AnimatePresence>

            {currentStep > 0 && (
                <div className="mt-8 flex justify-between">
                    <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0}>Atrás</Button>
                    <Button onClick={handleNext}>
                        {isFinalStep ? 'Finalizar' : 'Siguiente'}
                        {!isFinalStep && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </div>
            )}
        </FormProvider>
    </div>
  );
}
