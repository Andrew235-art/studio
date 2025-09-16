// AI-enhanced inquiry assistant for Stamerck Enterprise medical transport services.
'use server';

/**
 * @fileOverview AI-enhanced inquiry assistant for Stamerck Enterprise. It answers user queries and suggests additional services.
 *
 * - aiInquiryAssistant - A function that processes user inquiries and provides AI-generated responses.
 * - AIInquiryAssistantInput - The input type for the aiInquiryAssistant function.
 * - AIInquiryAssistantOutput - The return type for the aiInquiryAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIInquiryAssistantInputSchema = z.object({
  inquiry: z.string().describe('The user inquiry about Stamerck Enterprise services.'),
});
export type AIInquiryAssistantInput = z.infer<typeof AIInquiryAssistantInputSchema>;

const AIInquiryAssistantOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user inquiry.'),
  suggestedServices: z
    .string()
    .describe('Additional services suggested by the AI based on the inquiry.'),
});
export type AIInquiryAssistantOutput = z.infer<typeof AIInquiryAssistantOutputSchema>;

export async function aiInquiryAssistant(input: AIInquiryAssistantInput): Promise<AIInquiryAssistantOutput> {
  return aiInquiryAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiInquiryAssistantPrompt',
  input: {schema: AIInquiryAssistantInputSchema},
  output: {schema: AIInquiryAssistantOutputSchema},
  prompt: `You are an AI assistant for Stamerck Enterprise, a non-emergency medical transportation company.  A user has submitted the following inquiry: {{{inquiry}}}.\n\nRespond to the inquiry directly and suggest additional relevant services that Stamerck Enterprise offers, so that the user can quickly get the information they need and understand all available options.  Focus on services that may not be immediately obvious based on the inquiry, suggesting services the user may not have considered.\n\nFormat your response as follows:\n\nResponse: [Your direct answer to the user's inquiry]\nSuggested Services: [A comma separated list of suggested services]`,
});

const aiInquiryAssistantFlow = ai.defineFlow(
  {
    name: 'aiInquiryAssistantFlow',
    inputSchema: AIInquiryAssistantInputSchema,
    outputSchema: AIInquiryAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
