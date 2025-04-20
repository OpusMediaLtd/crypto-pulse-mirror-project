
/**
 * WordPress API services for categories
 */
import { WORDPRESS_API_URL } from './config';
import { WordPressCategory } from './types';
import { getMockCategories } from './mocks';

/**
 * Fetch categories from WordPress
 */
export const getCategories = async (): Promise<WordPressCategory[]> => {
  // If WORDPRESS_API_URL is not configured, return mock data
  if (WORDPRESS_API_URL === 'https://yourdomain.com/wp-json/wp/v2') {
    return getMockCategories();
  }
  
  const response = await fetch(`${WORDPRESS_API_URL}/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
};
