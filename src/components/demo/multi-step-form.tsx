'use client';

import { useState, useEffect } from 'react';
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
import { useFirestore } from '@/firebase';
import { createInitialDemoDocuments, updateDemoDocuments } from '@/lib/firebase/demo';
import { collection, doc } from 'firebase/firestore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const step1Schema = z.object({
  clinicName: z.string().min(2, 'El nombre de la clínica es requerido'),
  email: z.string().email('El correo electrónico no es válido'),
  countryCode: z.string().min(1, 'Requerido'),
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


const countryCodes = [
    { value: '+1-CA', label: '🇨🇦 Canadá (+1)' },
    { value: '+1-US', label: '🇺🇸 Estados Unidos (+1)' },
    { value: '+52', label: '🇲🇽 México (+52)' },
    { value: '+54', label: '🇦🇷 Argentina (+54)' },
    { value: '+55', label: '🇧🇷 Brasil (+55)' },
    { value: '+56', label: '🇨🇱 Chile (+56)' },
    { value: '+57', label: '🇨🇴 Colombia (+57)' },
    { value: '+58', label: '🇻🇪 Venezuela (+58)' },
    { value: '+51', label: '🇵🇪 Perú (+51)' },
    { value: '+591', label: '🇧🇴 Bolivia (+591)' },
    { value: '+593', label: '🇪🇨 Ecuador (+593)' },
    { value: '+595', label: '🇵🇾 Paraguay (+595)' },
    { value: '+598', label: '🇺🇾 Uruguay (+598)' },
    { value: '+502', label: '🇬🇹 Guatemala (+502)' },
    { value: '+503', label: '🇸🇻 El Salvador (+503)' },
    { value: '+504', label: '🇭🇳 Honduras (+504)' },
    { value: '+505', label: '🇳🇮 Nicaragua (+505)' },
    { value: '+506', label: '🇨🇷 Costa Rica (+506)' },
    { value: '+507', label: '🇵🇦 Panamá (+507)' },
    { value: '+53', label: '🇨🇺 Cuba (+53)' },
    { value: '+34', label: '🇪🇸 España (+34)' },
    { value: '+44', label: '🇬🇧 Reino Unido (+44)' },
    { value: '+49', label: '🇩🇪 Alemania (+49)' },
    { value: '+33', label: '🇫🇷 Francia (+33)' },
    { value: '+39', label: '🇮🇹 Italia (+39)' },
    { value: '+351', label: '🇵🇹 Portugal (+351)' },
    { value: '+31', label: '🇳🇱 Países Bajos (+31)' },
    { value: '+32', label: '🇧🇪 Bélgica (+32)' },
    { value: '+41', label: '🇨🇭 Suiza (+41)' },
    { value: '+43', label: '🇦🇹 Austria (+43)' },
    { value: '+45', label: '🇩🇰 Dinamarca (+45)' },
    { value: '+46', label: '🇸🇪 Suecia (+46)' },
    { value: '+47', label: '🇳🇴 Noruega (+47)' },
    { value: '+48', label: '🇵🇱 Polonia (+48)' },
    { value: '+353', label: '🇮🇪 Irlanda (+353)' },
    { value: '+358', label: '🇫🇮 Finlandia (+358)' },
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
                        <FormItem className="w-2/5">
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="País" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countryCodes.map((country) => (
                                <SelectItem key={country.label} value={country.value}>
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="w-3/5">
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
  const [clinicId, setClinicId] = useState<string | null>(null);
  const firestore = useFirestore();
  const router = useRouter();

  // Generate a unique ID for the session once
  useEffect(() => {
    if (!firestore) return;
    if (!clinicId) {
      setClinicId(doc(collection(firestore, 'clinics')).id);
    }
  }, [firestore, clinicId]);

  const methods = useForm({
    resolver: async (data, context, options) => {
        const schema = validationSchemas[currentStep];
        if(!schema) return { values: data, errors: {} };
        return await zodResolver(schema)(data, context, options);
    },
    mode: "onChange",
    defaultValues: {
      clinicName: '',
      email: '',
      countryCode: '',
      phone: '',
      city: '',
      address: '',
      openingHours: '',
      testMode: undefined,
    },
  });

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    if (!firestore || !clinicId) {
        console.error("Firestore not ready or clinicId not set");
        // Optionally, show a toast to the user
        return;
    }
    
    const values = methods.getValues();
    const countryCodeValue = values.countryCode?.split('-')[0];
    const dataToSend = { ...values, countryCode: countryCodeValue };


    if (currentStep === 1) {
      // First step with data, create the documents
      createInitialDemoDocuments(firestore, clinicId, dataToSend);
    } else if (currentStep > 1) {
      // Subsequent steps, update the documents
      updateDemoDocuments(firestore, clinicId, dataToSend);
    }

    if (currentStep === totalSteps - 1) {
      const selectedTestMode = methods.getValues('testMode');
      if (selectedTestMode === 'sandbox') {
        router.push('/demo/sandbox');
        return; // Early return to prevent advancing step
      }
      // Handle final submission for other cases
      alert(`Flujo para "${selectedTestMode}" en construcción.`);
    }

    if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
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

  const handleWelcomeNext = () => {
    setCurrentStep(1);
  };

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
                  {currentStep === 0 ? <WelcomeStep onNext={handleWelcomeNext} /> : stepsComponents[currentStep]}
                </motion.div>
            </AnimatePresence>

            {currentStep > 0 && (
                <div className="mt-8 flex justify-between">
                    <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1}>Atrás</Button>
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

    