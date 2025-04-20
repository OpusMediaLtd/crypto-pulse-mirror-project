
/**
 * WordPress API configuration
 */

// Define URLs as regular strings (not as literal types)
export const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API || 'https://cryptopulsegg-10eda24.ingress-bonde.ewp.live/wp-json/wp/v2';
export const DEFAULT_WP_API_URL = 'https://yourdomain.com/wp-json/wp/v2';

export default {
  WORDPRESS_API_URL,
  DEFAULT_WP_API_URL
};

