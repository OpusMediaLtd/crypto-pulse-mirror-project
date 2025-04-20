
// Check for environment variables, then use the fallback URL if not available
export const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API || 'https://cryptopulsegg-10eda24.ingress-bonde.ewp.live/wp-json/wp/v2';

// Original fallback URL kept for reference
export const DEFAULT_WP_API_URL = 'https://yourdomain.com/wp-json/wp/v2';

// Log the API URL being used
console.log('WordPress API URL being used:', WORDPRESS_API_URL);

export default {
  WORDPRESS_API_URL,
  DEFAULT_WP_API_URL
};
