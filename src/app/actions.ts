'use server';

import { recommendMenuItems, type RecommendMenuItemsInput } from '@/ai/flows/menu-recommendation-from-order-history';

export async function getMenuRecommendations(input: RecommendMenuItemsInput): Promise<{ success: boolean; data: string[]; error?: string } | { success: false; error: string; data?: undefined; }> {
  try {
    const result = await recommendMenuItems(input);
    if (!result || !result.recommendedItems) {
      return { success: false, error: 'AI did not return any recommendations.' };
    }
    return { success: true, data: result.recommendedItems };
  } catch (error) {
    console.error('Error in getMenuRecommendations server action:', error);
    return { success: false, error: 'Failed to get recommendations from the AI service.' };
  }
}
