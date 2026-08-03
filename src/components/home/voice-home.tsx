'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { AssistantOverrides } from '@vapi-ai/web/dist/api';
import { useEffect, useRef, useState } from 'react';
import {
  AudioLines,
  BarChart3,
  BellRing,
  CalendarCheck2,
  ChevronRight,
  Clock3,
  CheckCheck,
  Loader2,
  LockKeyhole,
  Menu,
  MessageSquare,
  Mic,
  MoreVertical,
  PhoneCall,
  Play,
  RotateCcw,
  Smile,
  Sparkles,
  Users,
  VolumeX,
  type LucideIcon,
} from 'lucide-react';
import { PhoneInput } from 'react-international-phone';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { saveLead } from '@/lib/firebase/firestore';
import { cn } from '@/lib/utils';

import styles from './voice-home.module.css';

type WhatsAppMessage = {
  side: 'patient' | 'soro';
  text: string;
  time: string;
  appointment?: boolean;
};

type VoiceOrbStatus =
  | 'idle'
  | 'connecting'
  | 'listening'
  | 'speaking'
  | 'ending'
  | 'error'
  | 'unconfigured';

type HomeContent = {
  lang: 'en' | 'es';
  homeHref: string;
  languageHref: string;
  languageLabel: string;
  languageButtonLabel: string;
  homeAria: string;
  navAria: string;
  mobileNavAria: string;
  openMenu: string;
  menuTitle: string;
  menuDescription: string;
  tryVoice: string;
  whatsappFunnel: string;
  navItems: readonly { label: string; href: string }[];
  benefits: readonly { icon: LucideIcon; title: string; description: string }[];
  workflow: readonly { icon: LucideIcon; title: string; description: string }[];
  metrics: readonly { icon: LucideIcon; value: string; label: string }[];
  whatsappMessages: readonly WhatsAppMessage[];
  voiceOrbLabels: Record<VoiceOrbStatus, string>;
  heroTitle: string;
  heroDescription: string;
  seeHow: string;
  workflowEyebrow: string;
  workflowTitle: string;
  workflowDescription: string;
  whatsappTitle: string;
  whatsappDescription: string;
  replayConversation: string;
  assistantName: string;
  online: string;
  protectedMessages: string;
  appointmentConfirmed: string;
  cleaning: string;
  appointmentDate: string;
  typing: string;
  messagePlaceholder: string;
  resultsAria: string;
  invitationTitle: string;
  invitationDescription: string;
  invitationImageAlt: string;
  startVoice: string;
  stopVoice: string;
  listeningStatus: string;
  inactiveStatus: string;
  orbImageAlt: string;
  startMaryAria: string;
  stopMaryAria: string;
  leadPromptTitle: string;
  leadPromptDescription: string;
  leadPromptDismiss: string;
  leadPromptNameLabel: string;
  leadPromptNamePlaceholder: string;
  leadPromptPhoneLabel: string;
  leadPromptEmailLabel: string;
  leadPromptEmailPlaceholder: string;
  leadPromptSubmit: string;
  leadPromptSubmitting: string;
  leadPromptSuccessTitle: string;
  leadPromptSuccessDescription: string;
  leadPromptValidation: string;
  legalAria: string;
  support: string;
  demo: string;
  rights: string;
};

const homeContent: Record<'en' | 'es', HomeContent> = {
  en: {
    lang: 'en',
    homeHref: '/',
    languageHref: '/esp',
    languageLabel: 'Español',
    languageButtonLabel: 'Ver en Español',
    homeAria: 'SORO, go to home',
    navAria: 'Main navigation',
    mobileNavAria: 'Mobile navigation',
    openMenu: 'Open menu',
    menuTitle: 'Navigation menu',
    menuDescription: 'Browse SORO sections and switch language.',
    tryVoice: 'Try the voice',
    whatsappFunnel: 'SORO + WhatsApp',
    navItems: [
      { label: 'Product', href: '#producto' },
      { label: 'How it works', href: '#como-funciona' },
      { label: 'Benefits', href: '#beneficios' },
    ],
    benefits: [
      { icon: MessageSquare, title: 'Instant answers', description: 'Answer every call immediately, with no waiting time.' },
      { icon: CalendarCheck2, title: 'Automatic scheduling', description: 'Find the best time and confirm the appointment instantly.' },
      { icon: BellRing, title: 'Smart reminders', description: 'Reduce no-shows with voice and SMS reminders.' },
      { icon: BarChart3, title: 'Clear reports', description: 'See what matters and make better decisions.' },
    ],
    workflow: [
      { icon: PhoneCall, title: 'Patient calls', description: 'The patient calls your clinic as usual.' },
      { icon: AudioLines, title: 'SORO talks', description: 'It responds naturally, understands the need and offers options.' },
      { icon: CalendarCheck2, title: 'Appointment ready', description: 'It schedules, confirms and sends reminders. Your team stays informed.' },
    ],
    metrics: [
      { icon: Users, value: '+500', label: 'Patients assisted' },
      { icon: Clock3, value: '24/7', label: 'Automatic service' },
      { icon: Smile, value: '98%', label: 'Satisfaction' },
      { icon: LockKeyhole, value: '100%', label: 'Safe and reliable' },
    ],
    whatsappMessages: [
      { side: 'patient', text: 'Hi, I would like to schedule a cleaning this week.', time: '10:24' },
      { side: 'soro', text: 'Hi, Laura! Of course 😊 I have Wednesday at 10:30 a.m. or Thursday at 3:00 p.m.', time: '10:24' },
      { side: 'patient', text: 'Thursday at 3 works perfectly.', time: '10:25' },
      { side: 'soro', text: 'Great. Could you confirm your full name?', time: '10:25' },
      { side: 'patient', text: 'Laura Gómez.', time: '10:25' },
      { side: 'soro', text: 'All set! Your appointment is confirmed. I will send you a reminder before your visit.', time: '10:26', appointment: true },
    ],
    voiceOrbLabels: {
      idle: 'Tap SORO to talk', connecting: 'Connecting with Mary…', listening: 'Mary is listening…',
      speaking: 'Mary is responding…', ending: 'Ending the conversation…',
      error: 'We could not connect. Tap to try again.', unconfigured: 'The Vapi public key has not been configured',
    },
    heroTitle: 'Your clinic always answers',
    heroDescription: 'SORO answers calls, schedules patients and follows up 24/7 with a natural voice.',
    seeHow: 'See how it works',
    workflowEyebrow: 'One call. One appointment.',
    workflowTitle: 'How SORO works',
    workflowDescription: 'Your patient speaks naturally while SORO handles the operational work in the background.',
    whatsappTitle: 'From one message to a confirmed appointment',
    whatsappDescription: 'SORO talks through WhatsApp, understands what each patient needs and schedules without your team stepping in.',
    replayConversation: 'Replay conversation',
    assistantName: 'SORO Assistant',
    online: 'online',
    protectedMessages: 'Messages are protected. SORO responds automatically.',
    appointmentConfirmed: 'Appointment confirmed',
    cleaning: 'Dental cleaning',
    appointmentDate: 'Thursday · 3:00 p.m.',
    typing: 'SORO is typing',
    messagePlaceholder: 'Type a message',
    resultsAria: 'SORO results',
    invitationTitle: 'Hear how SORO can serve your clinic',
    invitationDescription: 'Talk with SORO and experience a natural, fast voice built to turn calls into appointments.',
    invitationImageAlt: 'SORO ready to answer a call',
    startVoice: 'Talk with SORO',
    stopVoice: 'Stop listening',
    listeningStatus: 'SORO is listening…',
    inactiveStatus: 'Voice experience inactive',
    orbImageAlt: 'SORO face; tap it to start a voice conversation',
    startMaryAria: 'Talk with Mary, SORO assistant',
    stopMaryAria: 'End conversation with Mary',
    leadPromptTitle: 'Want to keep talking?',
    leadPromptDescription: 'Leave your details and our team will continue with you after this call.',
    leadPromptDismiss: 'Not now',
    leadPromptNameLabel: 'Name + clinic',
    leadPromptNamePlaceholder: 'Jane Doe - Smile Dental',
    leadPromptPhoneLabel: 'Phone number',
    leadPromptEmailLabel: 'Email',
    leadPromptEmailPlaceholder: 'jane@smiledental.com',
    leadPromptSubmit: 'Send my details',
    leadPromptSubmitting: 'Sending...',
    leadPromptSuccessTitle: 'Perfect',
    leadPromptSuccessDescription: 'We saved your details and will follow up shortly.',
    leadPromptValidation: 'Please complete name + clinic, phone and email.',
    legalAria: 'Legal links',
    support: 'Support',
    demo: 'Demo',
    rights: 'All rights reserved.',
  },
  es: {
    lang: 'es',
    homeHref: '/esp',
    languageHref: '/',
    languageLabel: 'English',
    languageButtonLabel: 'View in English',
    homeAria: 'SORO, ir al inicio',
    navAria: 'Navegación principal',
    mobileNavAria: 'Navegación móvil',
    openMenu: 'Abrir menú',
    menuTitle: 'Menú de navegación',
    menuDescription: 'Explora las secciones de SORO y cambia de idioma.',
    tryVoice: 'Probar la voz',
    whatsappFunnel: 'SORO + WhatsApp',
    navItems: [
      { label: 'Producto', href: '#producto' },
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Beneficios', href: '#beneficios' },
    ],
    benefits: [
      { icon: MessageSquare, title: 'Respuestas instantáneas', description: 'Atiende cada llamada al momento, sin tiempos de espera.' },
      { icon: CalendarCheck2, title: 'Agenda automática', description: 'Encuentra el mejor horario y confirma la cita al instante.' },
      { icon: BellRing, title: 'Recordatorios inteligentes', description: 'Reduce inasistencias con recordatorios por voz y SMS.' },
      { icon: BarChart3, title: 'Reportes claros', description: 'Visualiza lo importante y toma mejores decisiones.' },
    ],
    workflow: [
      { icon: PhoneCall, title: 'Llama', description: 'El paciente llama a tu clínica como siempre.' },
      { icon: AudioLines, title: 'SORO conversa', description: 'Responde con una voz natural, entiende la necesidad y ofrece opciones.' },
      { icon: CalendarCheck2, title: 'La cita queda lista', description: 'Agenda, confirma y envía recordatorios. Tu equipo queda informado.' },
    ],
    metrics: [
      { icon: Users, value: '+500', label: 'Pacientes atendidos' },
      { icon: Clock3, value: '24/7', label: 'Atención automática' },
      { icon: Smile, value: '98%', label: 'Satisfacción' },
      { icon: LockKeyhole, value: '100%', label: 'Seguro y confiable' },
    ],
    whatsappMessages: [
      { side: 'patient', text: 'Hola, quiero agendar una limpieza esta semana.', time: '10:24' },
      { side: 'soro', text: '¡Hola, Laura! Claro 😊 Tengo disponibilidad el miércoles a las 10:30 a. m. o el jueves a las 3:00 p. m.', time: '10:24' },
      { side: 'patient', text: 'El jueves a las 3 está perfecto.', time: '10:25' },
      { side: 'soro', text: 'Excelente. ¿Me confirmas tu nombre completo?', time: '10:25' },
      { side: 'patient', text: 'Laura Gómez.', time: '10:25' },
      { side: 'soro', text: '¡Listo! Tu cita quedó confirmada. Te enviaré un recordatorio antes de la consulta.', time: '10:26', appointment: true },
    ],
    voiceOrbLabels: {
      idle: 'Toca a SORO para hablar', connecting: 'Conectando con Mary…', listening: 'Mary te está escuchando…',
      speaking: 'Mary está respondiendo…', ending: 'Finalizando la conversación…',
      error: 'No pudimos conectar. Toca para intentar de nuevo.', unconfigured: 'Falta configurar la clave pública de Vapi',
    },
    heroTitle: 'Tu clínica siempre responde',
    heroDescription: 'SORO atiende llamadas, agenda pacientes y da seguimiento 24/7 con una voz natural.',
    seeHow: 'Ver cómo funciona',
    workflowEyebrow: 'Una llamada. Una cita.',
    workflowTitle: 'Así funciona SORO',
    workflowDescription: 'Tu paciente conversa con naturalidad; SORO hace el trabajo operativo en segundo plano.',
    whatsappTitle: 'De un mensaje a una cita confirmada',
    whatsappDescription: 'SORO conversa por WhatsApp, entiende lo que necesita cada paciente y agenda sin que tu equipo tenga que intervenir.',
    replayConversation: 'Repetir conversación',
    assistantName: 'SORO Asistente',
    online: 'en línea',
    protectedMessages: 'Los mensajes están protegidos. SORO responde de forma automática.',
    appointmentConfirmed: 'Cita confirmada',
    cleaning: 'Limpieza dental',
    appointmentDate: 'Jueves · 3:00 p. m.',
    typing: 'SORO está escribiendo',
    messagePlaceholder: 'Escribe un mensaje',
    resultsAria: 'Resultados de SORO',
    invitationTitle: 'Escucha cómo puede atender tu clínica',
    invitationDescription: 'Habla con SORO y siente una voz natural, rápida y preparada para convertir llamadas en citas.',
    invitationImageAlt: 'SORO listo para atender una llamada',
    startVoice: 'Hablar con SORO',
    stopVoice: 'Detener escucha',
    listeningStatus: 'SORO está escuchando…',
    inactiveStatus: 'Experiencia de voz inactiva',
    orbImageAlt: 'Rostro de SORO; tócalo para iniciar la conversación por voz',
    startMaryAria: 'Hablar con Mary, asistente de SORO',
    stopMaryAria: 'Finalizar conversación con Mary',
    leadPromptTitle: 'Si quieres seguir hablando',
    leadPromptDescription: 'Rellena tus datos y nuestro equipo continuara contigo despues de esta conversacion.',
    leadPromptDismiss: 'Ahora no',
    leadPromptNameLabel: 'Nombre + clinica',
    leadPromptNamePlaceholder: 'Andrea - Clinica Sonrisa',
    leadPromptPhoneLabel: 'Telefono',
    leadPromptEmailLabel: 'Correo electronico',
    leadPromptEmailPlaceholder: 'hola@tuclinica.com',
    leadPromptSubmit: 'Enviar mis datos',
    leadPromptSubmitting: 'Enviando...',
    leadPromptSuccessTitle: 'Perfecto',
    leadPromptSuccessDescription: 'Tus datos quedaron guardados y te contactaremos pronto.',
    leadPromptValidation: 'Completa nombre + clinica, telefono y correo.',
    legalAria: 'Enlaces legales',
    support: 'Soporte',
    demo: 'Demo',
    rights: 'Todos los derechos reservados.',
  },
};

type VoiceLeadDraft = {
  contactAndClinic: string;
  phone: string;
  email: string;
};

const EMPTY_VOICE_LEAD: VoiceLeadDraft = {
  contactAndClinic: '',
  phone: '',
  email: '',
};

function SoroMark({ content }: { content: HomeContent }) {
  return (
    <Link href={content.homeHref} className="flex items-center gap-2.5" aria-label={content.homeAria}>
      <MessageSquare aria-hidden="true" className="size-8 text-primary" strokeWidth={2.2} />
      <span className="text-2xl font-bold tracking-[-0.04em] text-[#082448]">
        SORO<span className="align-super text-[0.55rem] font-semibold tracking-normal text-primary">™</span>
      </span>
    </Link>
  );
}

function VoiceBars({ active = false, compact = false }: { active?: boolean; compact?: boolean }) {
  const heights = compact ? [10, 18, 26, 16, 22, 12] : [18, 34, 52, 30, 62, 40, 24, 48, 32, 18];

  return (
    <span className="flex items-center justify-center gap-1" aria-hidden="true">
      {heights.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={cn('w-1 rounded-full bg-current', active ? styles.waveBar : 'opacity-70')}
          style={{ height }}
        />
      ))}
    </span>
  );
}

function Header({ content }: { content: HomeContent }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <SoroMark content={content} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label={content.navAria}>
          {content.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#082448]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/soro-whatsapp"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-[#082448]"
          >
            {content.whatsappFunnel}
          </Link>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="outline" size="sm">
            <Link href={content.languageHref}>{content.languageButtonLabel}</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="#hablar-con-soro">{content.tryVoice}</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label={content.openMenu}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-8">
            <SheetHeader>
              <SheetTitle className="sr-only">{content.menuTitle}</SheetTitle>
              <SheetDescription className="sr-only">{content.menuDescription}</SheetDescription>
              <SoroMark content={content} />
            </SheetHeader>
            <nav className="flex flex-col gap-1" aria-label={content.mobileNavAria}>
              {content.navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-4 text-lg font-semibold text-[#082448] hover:bg-slate-50"
                  >
                    {item.label}
                    <ChevronRight aria-hidden="true" className="size-5 text-slate-400" />
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  href="/soro-whatsapp"
                  className="flex items-center justify-between rounded-lg px-3 py-4 text-lg font-semibold text-[#082448] hover:bg-slate-50"
                >
                  {content.whatsappFunnel}
                  <ChevronRight aria-hidden="true" className="size-5 text-slate-400" />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href={content.languageHref}
                  className="flex items-center justify-between rounded-lg px-3 py-4 text-lg font-semibold text-primary hover:bg-slate-50"
                >
                  {content.languageLabel}
                  <ChevronRight aria-hidden="true" className="size-5" />
                </Link>
              </SheetClose>
            </nav>
            <SheetClose asChild>
              <Button asChild size="xl" className="mt-auto">
                <Link href="#hablar-con-soro">{content.tryVoice}</Link>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function VoiceExperience({ content, compact = false }: { content: HomeContent; compact?: boolean }) {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className={cn('flex flex-col', compact ? 'items-start gap-4' : 'items-center gap-5 sm:items-start')}>
      <Button
        size="xl"
        onClick={() => setIsListening((current) => !current)}
        data-testid={compact ? 'hero-voice-button' : 'closing-voice-button'}
        aria-pressed={isListening}
        aria-label={isListening ? content.stopVoice : content.startVoice}
      >
        {isListening ? <VolumeX data-icon="inline-start" /> : <VoiceBars compact />}
        {isListening ? content.stopVoice : content.startVoice}
      </Button>
      <div
        data-testid={compact ? 'hero-voice-status' : 'closing-voice-status'}
        className={cn(
          'items-center gap-3 text-sm font-medium text-primary',
          isListening ? 'flex' : 'sr-only'
        )}
        role="status"
        aria-live="polite"
      >
        <VoiceBars active={isListening} compact />
        <span>{isListening ? content.listeningStatus : content.inactiveStatus}</span>
      </div>
    </div>
  );
}

function VoiceLeadCapture({
  content,
  value,
  onChange,
  onDismiss,
  onSubmit,
  isSubmitting,
  isSubmitted,
}: {
  content: HomeContent;
  value: VoiceLeadDraft;
  onChange: (nextValue: VoiceLeadDraft) => void;
  onDismiss: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
}) {
  return (
    <div className="relative z-20 mt-6 w-full max-w-md rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 text-left shadow-[0_28px_80px_rgba(8,36,72,0.16)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold tracking-[-0.03em] text-[#082448]">{content.leadPromptTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{content.leadPromptDescription}</p>
        </div>
        {!isSubmitted ? (
          <Button type="button" variant="ghost" size="sm" className="shrink-0 text-slate-500" onClick={onDismiss}>
            {content.leadPromptDismiss}
          </Button>
        ) : null}
      </div>

      {isSubmitted ? (
        <div className="mt-5 rounded-2xl bg-emerald-50 px-4 py-4">
          <p className="font-semibold text-emerald-800">{content.leadPromptSuccessTitle}</p>
          <p className="mt-1 text-sm leading-6 text-emerald-700">{content.leadPromptSuccessDescription}</p>
        </div>
      ) : (
        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#082448]">{content.leadPromptNameLabel}</label>
            <Input
              value={value.contactAndClinic}
              onChange={(event) => onChange({ ...value, contactAndClinic: event.target.value })}
              placeholder={content.leadPromptNamePlaceholder}
              className="h-12 rounded-2xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#082448]">{content.leadPromptPhoneLabel}</label>
            <PhoneInput
              defaultCountry={content.lang === 'es' ? 'co' : 'us'}
              preferredCountries={['co', 'mx', 'ar', 'pe', 'cl', 'ec', 'gt', 'bo', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'us', 'ca', 'es']}
              value={value.phone}
              onChange={(phone) => onChange({ ...value, phone })}
              inputClassName="w-full h-12"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#082448]">{content.leadPromptEmailLabel}</label>
            <Input
              type="email"
              value={value.email}
              onChange={(event) => onChange({ ...value, email: event.target.value })}
              placeholder={content.leadPromptEmailPlaceholder}
              className="h-12 rounded-2xl"
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-2xl" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 data-icon="inline-start" className="animate-spin" /> : null}
            {isSubmitting ? content.leadPromptSubmitting : content.leadPromptSubmit}
          </Button>
        </form>
      )}
    </div>
  );
}

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY?.trim();
const VAPI_ASSISTANTS: Record<HomeContent['lang'], { assistantId: string; assistantOverrides?: AssistantOverrides }> = {
  en: {
    assistantId: '49b2b068-4fff-495f-bb3f-5d55fb844a45',
  },
  es: {
    assistantId: '960b9652-e2e9-4585-9e64-428460256f04',
    assistantOverrides: {
      transcriber: {
        provider: 'deepgram',
        model: 'nova-3',
        language: 'es',
        smartFormat: true,
      },
      model: {
        provider: 'openai',
        model: 'gpt-4o-mini',
        temperature: 0.2,
      },
      analysisPlan: {
        minMessagesThreshold: 2,
        summaryPlan: {
          enabled: true,
          timeoutSeconds: 20,
          messages: [
            {
              role: 'system',
              content:
                'Eres un experto tomando notas para una clinica dental. Resume la llamada en español en 2 o 3 frases. Incluye intencion del paciente, datos confirmados, cita solicitada o confirmada y siguiente paso. No devuelvas nada excepto el resumen.',
            },
            {
              role: 'user',
              content:
                'Transcripcion de la llamada:\n\n{{transcript}}\n\nMotivo de finalizacion:\n\n{{endedReason}}\n\n',
            },
          ],
        },
        structuredDataPlan: {
          enabled: true,
          timeoutSeconds: 20,
          schema: {
            type: 'object',
            title: 'Datos estructurados de llamada dental',
            description:
              'Extrae los datos confirmados durante la llamada. Usa campos en español. Si un dato no fue mencionado o confirmado, omite el campo.',
            properties: {
              nombre_paciente: {
                type: 'string',
                description: 'Nombre completo del paciente o prospecto.',
              },
              telefono: {
                type: 'string',
                description: 'Telefono del paciente, si fue mencionado.',
              },
              correo: {
                type: 'string',
                format: 'email',
                description: 'Correo electronico del paciente, si fue mencionado.',
              },
              motivo_consulta: {
                type: 'string',
                description: 'Motivo principal de la llamada o consulta dental.',
              },
              tratamiento_interes: {
                type: 'string',
                description: 'Tratamiento o servicio dental de interes.',
              },
              fecha_preferida: {
                type: 'string',
                description: 'Fecha preferida para la cita, tal como fue expresada.',
              },
              hora_preferida: {
                type: 'string',
                description: 'Hora preferida para la cita, tal como fue expresada.',
              },
              sede_preferida: {
                type: 'string',
                description: 'Sede, ubicacion o clinica preferida.',
              },
              seguro_dental: {
                type: 'string',
                description: 'Seguro dental o plan mencionado por el paciente.',
              },
              es_nuevo_paciente: {
                type: 'boolean',
                description: 'Verdadero si el paciente indico que es nuevo.',
              },
              urgencia: {
                type: 'string',
                enum: ['baja', 'media', 'alta'],
                description: 'Nivel de urgencia inferido de la llamada.',
              },
              cita_solicitada: {
                type: 'boolean',
                description: 'Verdadero si el paciente pidio agendar una cita.',
              },
              cita_confirmada: {
                type: 'boolean',
                description: 'Verdadero si la cita quedo confirmada durante la llamada.',
              },
              notas: {
                type: 'string',
                description: 'Notas utiles para el equipo de ventas o recepcion.',
              },
              siguiente_paso: {
                type: 'string',
                description: 'Accion recomendada despues de la llamada.',
              },
            },
          },
        },
      },
    },
  },
};

function VoiceOrbExperience({ content }: { content: HomeContent }) {
  const vapiAssistant = VAPI_ASSISTANTS[content.lang];
  const initialStatus: VoiceOrbStatus = VAPI_PUBLIC_KEY ? 'idle' : 'unconfigured';
  const firestore = useFirestore();
  const [status, setStatus] = useState<VoiceOrbStatus>(initialStatus);
  const [leadDraft, setLeadDraft] = useState<VoiceLeadDraft>(EMPTY_VOICE_LEAD);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);
  const waveLayerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<VoiceOrbStatus>(initialStatus);
  const vapiRef = useRef<import('@vapi-ai/web').default | null>(null);
  const localVolumeRef = useRef(0);
  const remoteVolumeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const leadCaptureTimerRef = useRef<number | null>(null);

  const clearLeadCaptureTimer = () => {
    if (leadCaptureTimerRef.current !== null) {
      window.clearTimeout(leadCaptureTimerRef.current);
      leadCaptureTimerRef.current = null;
    }
  };

  const queueLeadCapture = () => {
    clearLeadCaptureTimer();

    if (isLeadSubmitted) {
      return;
    }

    leadCaptureTimerRef.current = window.setTimeout(() => {
      setShowLeadCapture(true);
    }, 40000);
  };

  const updateStatus = (nextStatus: VoiceOrbStatus) => {
    statusRef.current = nextStatus;
    setStatus(nextStatus);
  };

  const handleLeadSubmit = () => {
    const trimmedName = leadDraft.contactAndClinic.trim();
    const trimmedPhone = leadDraft.phone.trim();
    const trimmedEmail = leadDraft.email.trim();

    if (!trimmedName || !trimmedPhone || !trimmedEmail) {
      toast({
        variant: 'destructive',
        title: 'SORO',
        description: content.leadPromptValidation,
      });
      return;
    }

    setIsLeadSubmitting(true);

    try {
      saveLead(firestore, {
        name: trimmedName,
        contactAndClinic: trimmedName,
        phone: trimmedPhone,
        email: trimmedEmail,
        source: 'Vapi Voice Assistant Capture',
        collectionName: 'lead_soro',
      });

      setIsLeadSubmitted(true);
      clearLeadCaptureTimer();

      toast({
        title: content.leadPromptSuccessTitle,
        description: content.leadPromptSuccessDescription,
      });
    } finally {
      setIsLeadSubmitting(false);
    }
  };

  const toggleConversation = async () => {
    if (!VAPI_PUBLIC_KEY) {
      updateStatus('unconfigured');
      return;
    }

    if (['connecting', 'listening', 'speaking', 'ending'].includes(statusRef.current)) {
      updateStatus('ending');
      clearLeadCaptureTimer();
      try {
        await vapiRef.current?.stop();
      } finally {
        localVolumeRef.current = 0;
        remoteVolumeRef.current = 0;
        updateStatus('idle');
      }
      return;
    }

    try {
      updateStatus('connecting');

      if (!vapiRef.current) {
        const { default: Vapi } = await import('@vapi-ai/web');
        const vapi = new Vapi(VAPI_PUBLIC_KEY);

        vapi.on('call-start', () => {
          updateStatus('listening');
          queueLeadCapture();
        });
        vapi.on('call-end', () => {
          clearLeadCaptureTimer();
          localVolumeRef.current = 0;
          remoteVolumeRef.current = 0;
          updateStatus('idle');
        });
        vapi.on('speech-start', () => updateStatus('speaking'));
        vapi.on('speech-end', () => updateStatus('listening'));
        vapi.on('local-volume-level', (volume) => {
          localVolumeRef.current = volume;
        });
        vapi.on('volume-level', (volume) => {
          remoteVolumeRef.current = volume;
        });
        vapi.on('error', () => {
          clearLeadCaptureTimer();
          updateStatus('error');
        });
        vapi.on('call-start-failed', () => {
          clearLeadCaptureTimer();
          updateStatus('error');
        });

        vapiRef.current = vapi;
      }

      const call = await vapiRef.current.start(vapiAssistant.assistantId, vapiAssistant.assistantOverrides);
      if (!call && statusRef.current === 'connecting') {
        updateStatus('error');
      }
    } catch {
      updateStatus('error');
    }
  };

  useEffect(() => {
    const draw = (time: number) => {
      const isConnected = ['listening', 'speaking'].includes(statusRef.current);
      const liveVolume = statusRef.current === 'speaking'
        ? remoteVolumeRef.current
        : localVolumeRef.current;
      const idlePulse = 0.28 + Math.sin(time / 520) * 0.06;
      const voiceLevel = isConnected ? Math.max(liveVolume, 0.08) : idlePulse;

      if (waveLayerRef.current) {
        const scale = isConnected
          ? 0.8 + voiceLevel * 2.1
          : 0.82 + voiceLevel * 0.7;
        waveLayerRef.current.style.setProperty('--voice-scale', scale.toFixed(3));
        waveLayerRef.current.style.setProperty('--voice-opacity', isConnected ? '1' : '0.72');
      }

      animationFrameRef.current = window.requestAnimationFrame(draw);
    };

    animationFrameRef.current = window.requestAnimationFrame(draw);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      clearLeadCaptureTimer();
      const vapi = vapiRef.current;
      vapiRef.current = null;
      if (vapi) {
        vapi.removeAllListeners();
        void vapi.stop();
      }
    };
  }, []);

  const isActive = ['connecting', 'listening', 'speaking', 'ending'].includes(status);

  return (
    <div id="hablar-con-soro" className="relative flex w-full max-w-5xl scroll-mt-24 flex-col items-center">
      <div
        ref={waveLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[44%] z-20 flex -translate-y-1/2 items-center justify-between px-0 text-primary sm:px-8"
      >
        <span className={styles.soundReactiveWave}><VoiceBars active /></span>
        <span className={styles.soundReactiveWave}><VoiceBars active /></span>
      </div>
      <button
        type="button"
        data-testid="hero-voice-orb"
        onClick={toggleConversation}
        aria-pressed={isActive}
        aria-label={isActive ? content.stopMaryAria : content.startMaryAria}
        className="group relative z-10 mt-6 block w-[88vw] max-w-[520px] rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:ring-offset-8 sm:mt-8"
      >
        <span className={cn(
          'absolute inset-[7%] rounded-full border-2 border-primary/20 transition-all duration-500',
          isActive ? cn('border-primary/70', styles.listeningRing) : 'group-hover:border-primary/45'
        )} />
        <span className="absolute inset-[2%] rounded-full border border-teal-100 transition-transform duration-500 group-hover:scale-105" />
        <span className={cn('relative block transition-transform duration-500 group-hover:scale-[1.025]', styles.heroAssistant)}>
          <Image
            src="/images/soro-voice-assistant-light.png"
            alt={content.orbImageAlt}
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 640px) 88vw, 520px"
            className="h-auto w-full"
          />
        </span>
        <span className={cn(
          'absolute bottom-[9%] left-1/2 flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-white shadow-[0_12px_35px_rgba(20,184,166,0.32)] transition-transform duration-300',
          isActive ? 'scale-110' : 'group-hover:scale-110'
        )}>
          {isActive ? <VolumeX aria-hidden="true" className="size-6" /> : <Mic aria-hidden="true" className="size-6" />}
        </span>
      </button>
      <div
        data-testid="hero-voice-orb-status"
        className={cn(
          'relative z-10 mt-1 flex min-h-12 items-center gap-3 rounded-full bg-white/90 px-5 text-sm font-semibold shadow-[0_10px_35px_rgba(8,36,72,0.07)] backdrop-blur',
          status === 'error' || status === 'unconfigured' ? 'text-amber-700' : 'text-[#082448]'
        )}
        role="status"
        aria-live="polite"
      >
        <span className={cn('size-2 rounded-full', isActive ? 'animate-pulse bg-primary' : 'bg-slate-300')} />
        {content.voiceOrbLabels[status]}
      </div>
      {showLeadCapture ? (
        <VoiceLeadCapture
          content={content}
          value={leadDraft}
          onChange={setLeadDraft}
          onDismiss={() => setShowLeadCapture(false)}
          onSubmit={handleLeadSubmit}
          isSubmitting={isLeadSubmitting}
          isSubmitted={isLeadSubmitted}
        />
      ) : null}
    </div>
  );
}

function Hero({ content }: { content: HomeContent }) {
  return (
    <section id="producto" className="overflow-hidden bg-white">
      <div className="mx-auto flex min-h-[880px] max-w-7xl flex-col items-center px-5 pb-16 pt-14 text-center sm:px-8 md:pb-20 md:pt-16 lg:px-10">
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="text-balance text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-[#082448] sm:text-6xl lg:text-7xl">
            {content.heroTitle}<span className="text-primary">.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            {content.heroDescription}
          </p>
        </div>
        <VoiceOrbExperience content={content} />
        <div className="relative z-10 mt-5">
          <Button asChild variant="outline" size="xl">
            <Link href="#como-funciona">
              <Play data-icon="inline-start" />
              {content.seeHow}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Benefits({ content }: { content: HomeContent }) {
  return (
    <section id="beneficios" className="border-y border-slate-100 bg-slate-50/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
        {content.benefits.map(({ icon: Icon, title, description }) => (
          <article key={title} className="flex flex-col items-start px-3 py-7 sm:px-7 sm:py-10 lg:py-12">
            <Icon aria-hidden="true" className="size-6 text-primary sm:size-8" strokeWidth={1.8} />
            <h2 className="mt-4 text-sm font-bold leading-5 tracking-[-0.02em] text-[#082448] sm:mt-5 sm:text-lg sm:leading-tight">{title}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Workflow({ content }: { content: HomeContent }) {
  return (
    <section id="como-funciona" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{content.workflowEyebrow}</p>
          <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] text-[#082448] sm:text-5xl">{content.workflowTitle}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{content.workflowDescription}</p>
        </div>
        <div className="relative mx-auto mt-10 grid max-w-5xl grid-cols-3 gap-3 sm:mt-12 sm:gap-6">
          <div className="absolute left-[16%] right-[16%] top-9 hidden border-t border-dashed border-teal-300 sm:block" />
          {content.workflow.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="relative z-10 flex flex-col items-center text-center px-1 sm:px-4">
              <span className="mb-2 flex size-5 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-[#082448] sm:mb-3 sm:size-6 sm:text-xs">{index + 1}</span>
              <div className="flex size-14 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-[0_10px_24px_rgba(8,36,72,0.08)] sm:size-20 sm:shadow-[0_14px_36px_rgba(8,36,72,0.08)]">
                <Icon aria-hidden="true" className="size-5 sm:size-8" strokeWidth={1.7} />
              </div>
              <h3 className="mt-3 text-sm font-bold leading-4 tracking-[-0.02em] text-[#082448] sm:mt-5 sm:text-lg sm:leading-tight">{title}</h3>
              <p className="mt-2 max-w-[10rem] text-[11px] leading-4 text-slate-600 sm:max-w-[15rem] sm:text-sm sm:leading-6">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsAppDemo({ content }: { content: HomeContent }) {
  const [animationStep, setAnimationStep] = useState(0);
  const totalMessageSteps = content.whatsappMessages.length * 2;
  const visibleMessages = Math.min(content.whatsappMessages.length, Math.floor((animationStep + 1) / 2));
  const isTyping = animationStep < totalMessageSteps && animationStep % 2 === 0;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setAnimationStep((current) => current >= totalMessageSteps + 3 ? 0 : current + 1);
    }, 950);

    return () => window.clearInterval(interval);
  }, [totalMessageSteps]);

  return (
    <section className="overflow-hidden bg-[#f7fbfa] py-16 sm:py-24" aria-labelledby="whatsapp-demo-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <MessageSquare aria-hidden="true" className="mx-auto size-9 text-primary lg:mx-0" strokeWidth={1.8} />
          <h2 id="whatsapp-demo-title" className="mt-5 text-4xl font-bold tracking-[-0.045em] text-[#082448] sm:text-5xl">
            {content.whatsappTitle}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {content.whatsappDescription}
          </p>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="mt-7"
            onClick={() => setAnimationStep(0)}
            data-testid="restart-whatsapp-demo"
          >
            <RotateCcw data-icon="inline-start" />
            {content.replayConversation}
          </Button>
        </div>

        <div className="relative mx-auto w-full max-w-[430px]">
          <div className="absolute -inset-10 rounded-full bg-emerald-200/30 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2.35rem] border-[7px] border-[#12352f] bg-white shadow-[0_28px_80px_rgba(8,36,72,0.18)]">
            <div className="flex items-center gap-3 bg-[#075e54] px-4 py-4 text-white">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#075e54] shadow-sm">
                <MessageSquare aria-hidden="true" className="size-6" strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{content.assistantName}</p>
                <p className="text-xs text-emerald-100">{content.online}</p>
              </div>
              <PhoneCall aria-hidden="true" className="size-5" />
              <MoreVertical aria-hidden="true" className="size-5" />
            </div>

            <div
              className="flex min-h-[565px] flex-col bg-[#efeae2] px-3 py-5 sm:px-4"
              aria-live="polite"
              data-testid="whatsapp-chat"
            >
              <div className="mx-auto mb-4 rounded-md bg-[#fff3c4] px-3 py-2 text-center text-[10px] leading-4 text-[#5c584a] shadow-sm">
                {content.protectedMessages}
              </div>

              <div className="flex flex-1 flex-col gap-2.5">
                {content.whatsappMessages.slice(0, visibleMessages).map((message, index) => (
                  <div
                    key={`${message.time}-${index}`}
                    className={cn(
                      'max-w-[86%] rounded-lg px-3 py-2 text-[13px] leading-[1.45] shadow-sm',
                      styles.chatMessageEnter,
                      message.side === 'patient'
                        ? 'ml-auto rounded-tr-sm bg-[#d9fdd3] text-[#172b27]'
                        : 'mr-auto rounded-tl-sm bg-white text-[#172b27]'
                    )}
                  >
                    <p>{message.text}</p>
                    {message.appointment ? (
                      <div className="mt-2.5 rounded-md border border-emerald-100 bg-emerald-50 p-2.5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#087b6c]">{content.appointmentConfirmed}</p>
                        <p className="mt-1 font-semibold text-[#12352f]">{content.cleaning}</p>
                        <p className="text-xs text-slate-600">{content.appointmentDate}</p>
                      </div>
                    ) : null}
                    <span className="mt-1 flex items-center justify-end gap-1 text-[10px] leading-none text-slate-500">
                      {message.time}
                      {message.side === 'patient' ? <CheckCheck aria-hidden="true" className="size-3.5 text-[#53bdeb]" /> : null}
                    </span>
                  </div>
                ))}

                {isTyping ? (
                  <div className={cn('mr-auto flex h-9 items-center gap-1 rounded-lg rounded-tl-sm bg-white px-3 shadow-sm', styles.chatMessageEnter)}>
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                    <span className="sr-only">{content.typing}</span>
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm text-slate-400 shadow-sm">
                {content.messagePlaceholder}
                <Mic aria-hidden="true" className="ml-auto size-4 text-[#075e54]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metrics({ content }: { content: HomeContent }) {
  return (
    <section aria-label={content.resultsAria} className="border-y border-slate-100 bg-cyan-50/35">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-10">
        {content.metrics.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center border-slate-200 px-3 py-10 text-center even:border-l lg:border-l lg:first:border-l-0 lg:py-12">
            <Icon aria-hidden="true" className="size-8 text-primary" strokeWidth={1.8} />
            <strong className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-primary">{value}</strong>
            <span className="mt-2 max-w-32 text-sm leading-5 text-[#082448]">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function VoiceInvitation({ content }: { content: HomeContent }) {
  return (
    <section id="voz" className="overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
        <div className="max-w-xl">
          <Sparkles aria-hidden="true" className="size-8 text-primary" />
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.045em] text-[#082448] sm:text-5xl">{content.invitationTitle}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{content.invitationDescription}</p>
          <div className="mt-8">
            <VoiceExperience content={content} />
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-x-6 bottom-8 h-20 rounded-full bg-teal-100/70 blur-3xl" />
          <Image
            src="/images/soro-voice-assistant-light.png"
            alt={content.invitationImageAlt}
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 1024px) 90vw, 520px"
            className="relative h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

function Footer({ content }: { content: HomeContent }) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <SoroMark content={content} />
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500" aria-label={content.legalAria}>
          <Link href="/soro-whatsapp" className="hover:text-[#082448]">{content.whatsappFunnel}</Link>
          <Link href="/schedule-call" className="hover:text-[#082448]">{content.support}</Link>
          <Link href="/demo" className="hover:text-[#082448]">{content.demo}</Link>
          <Link href={content.languageHref} className="font-medium text-primary hover:text-[#082448]">{content.languageLabel}</Link>
        </nav>
        <p className="text-sm text-slate-400">© {new Date().getFullYear()} SORO. {content.rights}</p>
      </div>
    </footer>
  );
}

export function VoiceHome({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const content = homeContent[locale];

  return (
    <div className="min-h-screen bg-white text-[#082448]" lang={content.lang}>
      <Header content={content} />
      <main>
        <Hero content={content} />
        <Benefits content={content} />
        <Workflow content={content} />
        <WhatsAppDemo content={content} />
        <Metrics content={content} />
        <VoiceInvitation content={content} />
      </main>
      <Footer content={content} />
    </div>
  );
}
