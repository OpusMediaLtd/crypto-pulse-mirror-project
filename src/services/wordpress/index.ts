
/**
 * WordPress API service index
 * This service handles fetching data from a WordPress backend via the REST API
 */

import { WORDPRESS_API_URL, getDirectApiUrl, WORDPRESS_CASINO_ENDPOINT, WORDPRESS_BANNER_ADS_ENDPOINT } from './config';
import { getPosts, getPostBySlug, convertPostToNewsItem } from './posts';
import { getCategories } from './categories';
import { fetchWithCache } from './utils';

// Export helpers for working with WordPress API
export { 
  getPosts, 
  getPostBySlug, 
  getCategories, 
  convertPostToNewsItem,
  fetchWithCache
};

// Export configuration for direct use
export {
  WORDPRESS_API_URL,
  getDirectApiUrl,
  WORDPRESS_CASINO_ENDPOINT,
  WORDPRESS_BANNER_ADS_ENDPOINT
};

export default {
  getPosts,
  getPostBySlug,
  getCategories,
  convertPostToNewsItem,
  fetchWithCache,
  WORDPRESS_API_URL,
  getDirectApiUrl,
  WORDPRESS_CASINO_ENDPOINT,
  WORDPRESS_BANNER_ADS_ENDPOINT
};
