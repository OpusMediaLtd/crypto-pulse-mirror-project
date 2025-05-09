
/**
 * WordPress API services for categories
 */
import { getDirectApiUrl } from './config';
import { WordPressCategory } from './types';
import { fetchWithCache } from './utils';

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
    return await fetchWithCache(url, CATEGORIES_CACHE_TIME);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Re-throw to allow component to handle the error
  }
};
