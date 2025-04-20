
/**
 * This file is kept for compatibility but no longer provides mock data.
 * The application now requires a proper WordPress API connection.
 */

import { WordPressPost, WordPressCategory } from './types';

/**
 * Empty mock categories - no longer used
 */
export const getMockCategories = (): WordPressCategory[] => {
  console.error('getMockCategories called but mock data is disabled');
  return [];
};

/**
 * Empty mock posts - no longer used
 */
export const getMockPosts = (): WordPressPost[] => {
  console.error('getMockPosts called but mock data is disabled');
  return [];
};
