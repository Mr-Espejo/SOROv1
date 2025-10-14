'use server';

import { aiAnswerInitialQueries } from '@/ai/flows/ai-answer-initial-queries';
import type { AIAnswerInitialQueriesOutput } from '@/ai/flows/ai-answer-initial-queries';

export async function handleChatQuery(query: string): Promise<AIAnswerInitialQueriesOutput> {
  try {
    const response = await aiAnswerInitialQueries({ query });
    return response;
  } catch (error) {
    console.error('Error handling chat query:', error);
    return { answer: "Lo siento, pero estoy teniendo problemas para conectarme en este momento. Por favor, inténtalo de nuevo en un momento." };
  }
}
