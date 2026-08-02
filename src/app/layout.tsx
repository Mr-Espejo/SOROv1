import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {ConditionalChatbot} from '@/components/conditional-chatbot';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import 'react-international-phone/style.css';
import { GoogleAnalytics } from '@/components/analytics';

export const metadata: Metadata = {
  title: 'SORO™ - AI Voice Assistant for Dental Clinics',
  description:
    'AI-powered patient communication and scheduling for dental clinics. Book more appointments and free your staff.',
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
    <html lang="en">
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
        <GoogleAnalytics />
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
        <ConditionalChatbot />
        
        {/* --- Píxel de Seguimiento --- */}
        <Script id="tracking-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '818538310887510');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* Fallback para navegadores sin JavaScript. Reemplaza TU_PIXEL_ID aquí también. */}
          <img height="1" width="1" style={{display: 'none'}}
               src="https://www.facebook.com/tr?id=818538310887510&ev=PageView&noscript=1" />
        </noscript>
        {/* --- Fin del Píxel de Seguimiento --- */}
      </body>
    </html>
  );
}
