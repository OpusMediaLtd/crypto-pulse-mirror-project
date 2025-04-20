
/**
 * WordPress API services for categories
 */
import { getDirectApiUrl } from './config';
import { WordPressCategory } from './types';
import { fetchWithCache } from './utils';
import { getMockCategories } from './mocks';

// Cache durations
const CATEGORIES_CACHE_TIME = 30 * 60 * 1000; // 30 minutes

/**
 * Fetch categories from WordPress
 */
export const getCategories = async (): Promise<WordPressCategory[]> => {
  try {
    const baseUrl = getDirectApiUrl();
    console.log('Fetching categories from WordPress API:', baseUrl);
    
    const url = `${baseUrl}/categories`;
    const categories = await fetchWithCache(url, CATEGORIES_CACHE_TIME);
    
    if (Array.isArray(categories) && categories.length > 0) {
      console.log('Successfully retrieved categories:', categories.length);
      return categories;
    } else {
      console.warn('No categories found in the API response');
      return getMockCategories();
    }
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    // Only use mock data as last resort
    console.warn('Using mock categories as fallback');
    return getMockCategories();
  }
};
