import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {Chatbot} from '@/components/chatbot';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import 'react-international-phone/style.css';

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
  const faviconSvg = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="5" fill="hsl(162 70% 55%)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" font-weight="bold" fill="white">AI</text>
    </svg>
  `;
  const faviconDataUrl = `data:image/svg+xml;base64,${btoa(faviconSvg)}`;

  return (
    <html lang="es">
      <head>
        <link rel="icon" href={faviconDataUrl} type="image/svg+xml" />
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
