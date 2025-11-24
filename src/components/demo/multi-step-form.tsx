
'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ArrowRight, MessageSquare, Phone, User, HeartPulse, Bone, Smile, Baby, Scissors } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { createInitialDemoDocuments, updateDemoDocuments } from '@/lib/firebase/demo';
import { collection, doc } from 'firebase/firestore';
import { PhoneInput } from 'react-international-phone';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

const step1Schema = z.object({
  clinicName: z.string().min(2, 'El nombre de la clínica es requerido'),
  email: z.string().email('El correo electrónico no es válido'),
  phone: z.string().min(10, 'El número de teléfono no es válido'),
});

const step2Schema = z.object({
  city: z.string().min(2, 'La ciudad es requerida'),
  website: z.string().url('Por favor, introduce una URL válida.').optional().or(z.literal('')),
});

const ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6.1 20.4c.4-1.2.9-2.6 1.2-4.4.3-2.3.4-4.8.4-7.3V3h5.7v5.7c0 2.5.1 5 .4 7.3.3 1.8.8 3.2 1.2 4.4"/>
        <path d="m18.5 3-3.6 4.3c-.3.4-.6.8-.8 1.2"/>
        <path d="m5.5 3 3.6 4.3c.3.4.6.8.8 1.2"/>
        <path d="M15 22h-6"/>
    </svg>
);


const services = [
  { id: "Limpieza Dental", label: "Limpieza Dental", icon: <ToothIcon className="h-6 w-6" /> },
  { id: "Blanqueamiento Dental", label: "Blanqueamiento", icon: <Smile className="h-6 w-6" /> },
  { id: "Ortodoncia", label: "Ortodoncia", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z"></path><path d="M16 8h-2a2 2 0 1 0 0-4h2v4Z"></path><path d="M8 16H6a2 2 0 1 1 0-4h2v4Z"></path><path d="M16 16v2a2 2 0 1 1-4 0v-2h4Z"></path><path d="M8 8v-2a2 2 0 1 0-4 0v2h4Z"></path></svg> },
  { id: "Implantes Dentales", label: "Implantes", icon: <Bone className="h-6 w-6" /> },
  { id: "Endodoncia", label: "Endodoncia", icon: <HeartPulse className="h-6 w-6" /> },
  { id: "Periodoncia", label: "Periodoncia", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.4 3.4C11.1 2 9.4 2 8.2 3.4L4.9 7c-1.2 1.4-1.2 3.6 0 5l6.9 8.4c.6.8 1.5 1.2 2.5 1.2s1.9-.4 2.5-1.2l3.4-4.2c1.2-1.4 1.2-3.6 0-5l-3.2-3.8c-1.2-1.4-2.9-1.4-4.1-.1z"></path><path d="m14 7 3 3"></path></svg> },
  { id: "Prótesis Dentales", label: "Prótesis", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4v-4Z"></path><path d="M16 8V7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1"></path></svg> },
  { id: "Odontopediatría", label: "Odontopediatría", icon: <Baby className="h-6 w-6" /> },
  { id: "Cirugía Oral", label: "Cirugía Oral", icon: <Scissors className="h-6 w-6" /> }
] as const;


const step3Schema = z.object({
    services: z.array(z.string()).refine(value => value.some(item => item), {
    message: "Tienes que seleccionar al menos un servicio.",
  }),
});


const step4Schema = z.object({
  testMode: z.enum(['qr_connect', 'sandbox', 'expert_call'], {
    required_error: 'Debes seleccionar una opción',
  }),
});


const validationSchemas = [
    null, // Welcome step has no validation
    step1Schema,
    step2Schema,
    step3Schema,
    step4Schema
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
             <FormField
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Teléfono</FormLabel>
                   <FormControl>
                     <PhoneInput
                        defaultCountry="co"
                        preferredCountries={['co', 'mx', 'ar', 'pe', 'cl', 'ec', 'gt', 'bo', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'us', 'ca', 'es', 'pt', 'fr', 'de', 'it', 'gb']}
                        value={field.value}
                        onChange={field.onChange}
                        inputClassName="w-full"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                name="website"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Tu dirección web (Opcional)</FormLabel>
                    <FormControl>
                    <Input placeholder="https://tuclinica.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </CardContent>
    </Card>
);

const Step3 = () => {
    const { control, setValue, getValues } = useFormContext();
    const selectedServices = getValues('services') || [];

    const handleServiceClick = (serviceId: string) => {
        const currentServices = getValues('services') || [];
        const newServices = currentServices.includes(serviceId)
            ? currentServices.filter((s: string) => s !== serviceId)
            : [...currentServices, serviceId];
        setValue('services', newServices, { shouldValidate: true });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>3. Servicios de la Clínica</CardTitle>
                <CardDescription>Selecciona los servicios que ofreces. Esto ayudará a SORO a responder mejor a tus pacientes.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <FormField
                    control={control}
                    name="services"
                    render={() => (
                        <FormItem>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {services.map((service) => (
                                    <button
                                        type="button"
                                        key={service.id}
                                        onClick={() => handleServiceClick(service.id)}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 text-center transition-all duration-200",
                                            selectedServices.includes(service.id)
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-border bg-card hover:bg-muted/50"
                                        )}
                                    >
                                        {service.icon}
                                        <span className="text-sm font-medium">{service.label}</span>
                                    </button>
                                ))}
                            </div>
                            <FormMessage className="pt-4" />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );
};

const Step4 = () => {
  const { control } = useFormContext();

  return (
     <Card className="w-full">
        <CardHeader>
            <CardTitle>4. Elige cómo quieres probar SORO</CardTitle>
            <CardDescription>Ambas opciones te permitirán ver cómo el asistente agenda citas automáticamente.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
           <FormField
            name="testMode"
            control={control}
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
};

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [clinicId, setClinicId] = useState<string | null>(null);
  const firestore = useFirestore();
  const router = useRouter();

  // Generate a unique ID for the session once
  useEffect(() => {
    if (!firestore) return;
    if (!clinicId) {
      const newClinicId = doc(collection(firestore, 'clinics')).id;
      setClinicId(newClinicId);
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
      phone: '',
      city: '',
      website: '',
      services: [],
      testMode: undefined as 'qr_connect' | 'sandbox' | 'expert_call' | undefined,
    },
  });

  const watchedTestMode = methods.watch('testMode');

  const totalSteps = 5; // Including welcome + new services step

  useEffect(() => {
    const handleAutoNavigation = async () => {
        if (currentStep !== totalSteps - 1) return;

        const selectedMode = methods.getValues('testMode');
        
        if (selectedMode === 'sandbox') {
            await saveData();
            router.push('/demo/sandbox');
        } else if (selectedMode === 'qr_connect') {
            await saveData();
            router.push('/demo/qr-connect');
        } else if (selectedMode === 'expert_call') {
            await saveData();
            router.push('/schedule-call');
        }
    };
    handleAutoNavigation();
  }, [watchedTestMode, currentStep, router]);


  const saveData = async () => {
    if (!firestore || !clinicId) {
        console.error("Firestore not ready or clinicId not set");
        return false;
    }
    
    const values = methods.getValues();

    try {
        if (currentStep === 1) {
          await createInitialDemoDocuments(firestore, clinicId, values);
        } else if (currentStep > 1) {
          await updateDemoDocuments(firestore, clinicId, values);
        }
        
        // Track Facebook Pixel Schedule event on the final step
        if (currentStep === totalSteps - 1 && values.testMode) {
            if (typeof window !== 'undefined' && window.fbq) {
                window.fbq('track', 'Schedule');
            }
        }

        return true;
    } catch (error) {
        console.error("Error saving data to Firestore:", error);
        return false;
    }
  };


  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    const dataSaved = await saveData();
    if (!dataSaved) return;
    
    const selectedTestMode = methods.getValues('testMode');

    if (currentStep === totalSteps - 1) {
        if (selectedTestMode === 'expert_call') {
            router.push('/schedule-call');
            return;
        }
      // Sandbox and QR connect are handled by useEffect, but we can leave this as a fallback.
      return; 
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
  
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  const stepsComponents = [
      <WelcomeStep key="welcome" onNext={handleNext} />,
      <Step1 key="step1" />,
      <Step2 key="step2" />,
      <Step3 key="step3" />,
      <Step4 key="step4" />,
  ];

  const isFinalStep = currentStep === totalSteps - 1;
  const selectedTestMode = methods.watch('testMode');

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
                    <Button onClick={handleNext} disabled={isFinalStep && (selectedTestMode === 'sandbox' || selectedTestMode === 'qr_connect' || selectedTestMode === 'expert_call')}>
                        {isFinalStep ? 'Finalizar' : 'Siguiente'}
                        {!isFinalStep && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </div>
            )}
        </FormProvider>
    </div>
  );
}


    