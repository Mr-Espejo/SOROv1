import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {Chatbot} from '@/components/chatbot';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import 'react-phone-number-input/style.css'

export const metadata: Metadata = {
  title: 'SORO™ - Automatiza Tu Clínica Dental',
  description:
    'Comunicación y gestión de pacientes con IA para clínicas dentales. Captura más citas y libera a tu personal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
