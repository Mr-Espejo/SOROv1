import type { Metadata } from 'next';

import { VoiceHome } from '@/components/home/voice-home';

export const metadata: Metadata = {
  title: 'SORO™ - Asistente de Voz para Clínicas Dentales',
  description:
    'Comunicación y gestión de pacientes con IA para clínicas dentales. Captura más citas y libera a tu personal.',
};

export default function SpanishHomePage() {
  return <VoiceHome locale="es" />;
}
