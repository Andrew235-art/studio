'use server';

import { aiInquiryAssistant, AIInquiryAssistantInput, AIInquiryAssistantOutput } from '@/ai/flows/ai-inquiry-assistant';
import { z } from 'zod';

const InquirySchema = z.object({
  inquiry: z.string().min(1, 'Inquiry cannot be empty.'),
});

export async function handleInquiry(input: AIInquiryAssistantInput): Promise<AIInquiryAssistantOutput> {
  const validation = InquirySchema.safeParse(input);

  if (!validation.success) {
    throw new Error('Invalid input for inquiry.');
  }

  try {
    console.log('Calling AI assistant with inquiry:', validation.data.inquiry);
    const output = await aiInquiryAssistant(validation.data);
    console.log('AI assistant responded:', output);
    return output;
  } catch (error) {
    console.error('Error in aiInquiryAssistant flow:', error);
    // In a real app, you might want to return a more structured error
    throw new Error('Failed to get a response from the AI assistant.');
  }
}
