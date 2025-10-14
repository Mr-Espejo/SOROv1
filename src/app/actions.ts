'use server';

import { aiAnswerInitialQueries } from '@/ai/flows/ai-answer-initial-queries';
import type { AIAnswerInitialQueriesOutput } from '@/ai/flows/ai-answer-initial-queries';

export async function handleChatQuery(query: string): Promise<AIAnswerInitialQueriesOutput> {
  try {
    const response = await aiAnswerInitialQueries({ query });
    return response;
  } catch (error) {
    console.error('Error handling chat query:', error);
    return { answer: "I'm sorry, but I'm having trouble connecting right now. Please try again in a moment." };
  }
}
