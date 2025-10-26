'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { saveLead } from '@/lib/firebase/firestore';
import { useState } from 'react';

type FormFieldConfig = {
    name: 'name' | 'email' | 'phone' | 'clinicName';
    label: string;
    placeholder: string;
    type: string;
};

interface LeadFormProps {
  formFields: FormFieldConfig[];
  ctaText: string;
  formTitle: string;
  formDescription: string;
  source: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }).optional().or(z.literal('')),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  phone: z.string().optional().or(z.literal('')),
  clinicName: z.string().optional().or(z.literal('')),
});

export function LeadForm({ formFields, ctaText, formTitle, formDescription, source }: LeadFormProps) {
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      clinicName: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (!firestore) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudo conectar a la base de datos. Por favor, inténtalo más tarde.",
        });
        setIsSubmitting(false);
        return;
    }
    
    // We are not awaiting here. The UI will show a success message optimistically.
    // The saveLead function will handle permission errors in the background.
    saveLead(firestore, { ...values, source });

    toast({
        title: '¡Éxito!',
        description: "Hemos recibido tu información y nos pondremos en contacto en breve.",
    });
    
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-background/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{formTitle}</CardTitle>
        <CardDescription>{formDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {formFields.map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={fieldConfig.placeholder} {...field} type={fieldConfig.type} className="text-base"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" size="lg" className="w-full bg-accent text-lg font-semibold hover:bg-accent/90" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {ctaText}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
