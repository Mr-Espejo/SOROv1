'use server';

/**
 * @fileOverview A Genkit flow for answering initial visitor queries on the landing page using a lightweight AI chatbot.
 *
 * - aiAnswerInitialQueries - A function that handles the chatbot query and returns an answer.
 * - AIAnswerInitialQueriesInput - The input type for the aiAnswerInitialQueries function.
 * - AIAnswerInitialQueriesOutput - The return type for the aiAnswerInitialQueries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIAnswerInitialQueriesInputSchema = z.object({
  query: z.string().describe('The user query about SORO.'),
});
export type AIAnswerInitialQueriesInput = z.infer<typeof AIAnswerInitialQueriesInputSchema>;

const AIAnswerInitialQueriesOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type AIAnswerInitialQueriesOutput = z.infer<typeof AIAnswerInitialQueriesOutputSchema>;

export async function aiAnswerInitialQueries(input: AIAnswerInitialQueriesInput): Promise<AIAnswerInitialQueriesOutput> {
  return aiAnswerInitialQueriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAnswerInitialQueriesPrompt',
  input: {schema: AIAnswerInitialQueriesInputSchema},
  output: {schema: AIAnswerInitialQueriesOutputSchema},
  prompt: `You are a lightweight AI chatbot on a landing page for SORO (Sistema Odontológico de Respuesta Oportuna), an intelligent platform designed for dental clinics to automate communication and patient management.

  Your goal is to answer initial questions from visitors about SORO and guide them towards scheduling a demo or providing their contact information. Keep your answers concise and helpful.

  Here's some information about SORO:
  - It's a virtual assistant with AI that works 24/7.
  - It integrates with WhatsApp to converse with patients.
  - It automates appointment scheduling, confirmations, and reminders.
  - Patients can manage their appointments via WhatsApp.
  - It has a knowledge base to answer common questions.
  - It can escalate complex queries to human agents.
  - It provides a centralized control panel for managing patients, appointments, and bot analytics.

  Now, answer the following question:
  {{query}}`,
});

const aiAnswerInitialQueriesFlow = ai.defineFlow(
  {
    name: 'aiAnswerInitialQueriesFlow',
    inputSchema: AIAnswerInitialQueriesInputSchema,
    outputSchema: AIAnswerInitialQueriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
