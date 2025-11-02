'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ArrowRight, MessageSquare, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { createInitialDemoDocuments, updateDemoDocuments } from '@/lib/firebase/demo';
import { collection, doc } from 'firebase/firestore';
import { PhoneInput } from 'react-international-phone';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const step1Schema = z.object({
  clinicName: z.string().min(2, 'El nombre de la clínica es requerido'),
  email: z.string().email('El correo electrónico no es válido'),
  phone: z.string().min(10, 'El número de teléfono no es válido'),
});

const dayOpeningHoursSchema = z.object({
    day: z.string(),
    isOpen: z.boolean().default(false),
    openTime: z.string().optional(),
    closeTime: z.string().optional(),
});

const step2Schema = z.object({
  city: z.string().min(2, 'La ciudad es requerida'),
  address: z.string().min(5, 'La dirección es requerida'),
  openingHours: z.array(dayOpeningHoursSchema),
});


const services = [
  "Limpieza Dental", "Blanqueamiento Dental", "Ortodoncia", 
  "Implantes Dentales", "Endodoncia", "Periodoncia", "Prótesis Dentales",
  "Odontopediatría", "Cirugía Oral"
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
                        inputProps={{
                          className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        }}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </CardContent>
    </Card>
);

const OpeningHoursField = () => {
    const { control, getValues, setValue } = useFormContext();
    const { fields } = useFieldArray({
        control,
        name: "openingHours",
    });

    const handleApplyToAll = () => {
        const values = getValues('openingHours');
        const firstChecked = values.find((day: any) => day.isOpen);
        if (firstChecked) {
            const { openTime, closeTime } = firstChecked;
            values.forEach((day: any, index: number) => {
                if (day.isOpen) {
                    setValue(`openingHours.${index}.openTime`, openTime);
                    setValue(`openingHours.${index}.closeTime`, closeTime);
                }
            });
        }
    };
    
    const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
        const hour = Math.floor(i / 2);
        const minute = (i % 2) * 30;
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        return `${formattedHour}:${formattedMinute}`;
    });

    return (
        <div className="space-y-4">
             <div className="flex justify-end">
                <Button type="button" variant="link" size="sm" onClick={handleApplyToAll}>
                    Aplicar horario a todos los días marcados
                </Button>
            </div>
            <div className="rounded-md border">
                <div className="w-full">
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-[100px_1fr_1fr] items-center gap-4 p-4 border-b last:border-b-0">
                            <FormField
                                control={control}
                                name={`openingHours.${index}.isOpen`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel className="font-normal capitalize">{getValues(`openingHours.${index}.day`)}</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`openingHours.${index}.openTime`}
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!getValues(`openingHours.${index}.isOpen`)}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Abre" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {timeOptions.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`openingHours.${index}.closeTime`}
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!getValues(`openingHours.${index}.isOpen`)}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Cierra" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {timeOptions.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


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
            <OpeningHoursField />
        </CardContent>
    </Card>
);

const Step3 = () => (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>3. Servicios de la Clínica</CardTitle>
            <CardDescription>Selecciona los servicios que ofreces. Esto ayudará a SORO a responder mejor a tus pacientes.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
            <FormField
              name="services"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {services.map((item) => (
                      <FormField
                        key={item}
                        name="services"
                        render={({ field }) => {
                          return (
                            <FormItem key={item} className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
        </CardContent>
    </Card>
);

const Step4 = () => (
     <Card className="w-full">
        <CardHeader>
            <CardTitle>4. Elige cómo quieres probar SORO</CardTitle>
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
      address: '',
      openingHours: [
        { day: 'lunes', isOpen: false, openTime: '09:00', closeTime: '18:00' },
        { day: 'martes', isOpen: false, openTime: '09:00', closeTime: '18:00' },
        { day: 'miércoles', isOpen: false, openTime: '09:00', closeTime: '18:00' },
        { day: 'jueves', isOpen: false, openTime: '09:00', closeTime: '18:00' },
        { day: 'viernes', isOpen: false, openTime: '09:00', closeTime: '18:00' },
        { day: 'sábado', isOpen: false, openTime: '10:00', closeTime: '14:00' },
        { day: 'domingo', isOpen: false, openTime: '10:00', closeTime: '14:00' },
      ],
      services: [],
      testMode: undefined,
    },
  });

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    if (!firestore || !clinicId) {
        console.error("Firestore not ready or clinicId not set");
        return;
    }
    
    const values = methods.getValues();

    try {
        if (currentStep === 1) {
          await createInitialDemoDocuments(firestore, clinicId, values);
        } else if (currentStep > 1) {
          await updateDemoDocuments(firestore, clinicId, values);
        }
    } catch (error) {
        console.error("Error saving data to Firestore:", error);
        return;
    }

    if (currentStep === totalSteps - 1) {
      const selectedTestMode = methods.getValues('testMode');
      if (selectedTestMode === 'sandbox') {
        router.push('/demo/sandbox');
        return;
      }
      alert(`Flujo para "${selectedTestMode}" en construcción.`);
      return; // Stop here for the final step
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
  
  const totalSteps = 5; // Including welcome + new services step
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  const stepsComponents = [
      <WelcomeStep key="welcome" onNext={handleNext} />,
      <Step1 key="step1" />,
      <Step2 key="step2" />,
      <Step3 key="step3" />,
      <Step4 key="step4" />,
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
