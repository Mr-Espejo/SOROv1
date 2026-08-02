'use client';

import { usePathname } from 'next/navigation';

import { Chatbot } from '@/components/chatbot';

export function ConditionalChatbot() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return <Chatbot />;
}
