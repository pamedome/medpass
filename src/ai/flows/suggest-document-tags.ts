// Implemented Genkit flow for suggesting document tags using AI.

'use server';

/**
 * @fileOverview AI-powered document tag suggestion flow.
 *
 * - suggestDocumentTags - A function that suggests relevant tags for uploaded medical documents.
 * - SuggestDocumentTagsInput - The input type for the suggestDocumentTags function.
 * - SuggestDocumentTagsOutput - The return type for the suggestDocumentTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDocumentTagsInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content extracted from the medical document.'),
});
export type SuggestDocumentTagsInput = z.infer<typeof SuggestDocumentTagsInputSchema>;

const SuggestDocumentTagsOutputSchema = z.object({
  tags: z
    .array(z.string())
    .describe('An array of suggested tags for the medical document.'),
});
export type SuggestDocumentTagsOutput = z.infer<typeof SuggestDocumentTagsOutputSchema>;

export async function suggestDocumentTags(input: SuggestDocumentTagsInput): Promise<SuggestDocumentTagsOutput> {
  return suggestDocumentTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDocumentTagsPrompt',
  input: {schema: SuggestDocumentTagsInputSchema},
  output: {schema: SuggestDocumentTagsOutputSchema},
  prompt: `You are an AI assistant specialized in suggesting relevant tags for medical documents.

  Given the text content of a medical document, suggest an array of tags that would help the user categorize and organize their records.
  The tags should be relevant to the content of the document and should be general enough to be useful for a variety of documents.

  Document Text: {{{documentText}}}

  Tags:`,
});

const suggestDocumentTagsFlow = ai.defineFlow(
  {
    name: 'suggestDocumentTagsFlow',
    inputSchema: SuggestDocumentTagsInputSchema,
    outputSchema: SuggestDocumentTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
