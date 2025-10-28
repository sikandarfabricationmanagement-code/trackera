'use server';
/**
 * @fileOverview Recommends menu items based on a customer's order history.
 *
 * - recommendMenuItems - A function that recommends menu items based on order history.
 * - RecommendMenuItemsInput - The input type for the recommendMenuItems function.
 * - RecommendMenuItemsOutput - The return type for the recommendMenuItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendMenuItemsInputSchema = z.object({
  orderHistory: z
    .array(
      z.object({
        item: z.string().describe('The name of the menu item ordered.'),
        quantity: z.number().describe('The quantity of the item ordered.'),
        orderDate: z.string().describe('The date the order was placed.'),
      })
    )
    .describe('The customer order history.'),
  currentTrends: z.array(z.string()).describe('The current trending menu items.'),
  realTimeFeedback: z.string().describe('Real-time customer feedback or reviews.'),
});
export type RecommendMenuItemsInput = z.infer<typeof RecommendMenuItemsInputSchema>;

const RecommendMenuItemsOutputSchema = z.object({
  recommendedItems: z
    .array(z.string())
    .describe('A list of recommended menu items based on order history, trends, and feedback.'),
});
export type RecommendMenuItemsOutput = z.infer<typeof RecommendMenuItemsOutputSchema>;

export async function recommendMenuItems(input: RecommendMenuItemsInput): Promise<RecommendMenuItemsOutput> {
  return recommendMenuItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendMenuItemsPrompt',
  input: {schema: RecommendMenuItemsInputSchema},
  output: {schema: RecommendMenuItemsOutputSchema},
  prompt: `You are a restaurant menu recommendation expert.

Based on the customer's order history, current trends, and real-time feedback, recommend menu items that the customer might like.

Order History:
{{#each orderHistory}}
- {{quantity}} x {{item}} ({{orderDate}})
{{/each}}

Current Trends:
{{#each currentTrends}}
- {{this}}
{{/each}}

Real-time Feedback: {{realTimeFeedback}}

Recommend items that are similar to what they have ordered before, as well as incorporating current trends and feedback.
Ensure the recommendations are diverse and interesting.

Output only a list of recommended menu items. Do not include any extra conversational text.`,
});

const recommendMenuItemsFlow = ai.defineFlow(
  {
    name: 'recommendMenuItemsFlow',
    inputSchema: RecommendMenuItemsInputSchema,
    outputSchema: RecommendMenuItemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
