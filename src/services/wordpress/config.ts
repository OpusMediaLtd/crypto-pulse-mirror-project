
/**
 * WordPress API configuration
 */

// Set a default staging URL that can be overridden in production
export const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://api.cryptopulse.gg/wp-json/wp/v2';

export default {
  WORDPRESS_API_URL
};
