
// Check for environment variables, then use the fallback URL if not available
export const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API || 'https://demo.wp-api.org/wp-json/wp/v2';

// Based on the screenshots, our URLs need to use the direct path format
export const getDirectApiUrl = () => {
  // Try to use a more reliable WordPress demo site if the main one fails
  const useBackupApi = import.meta.env.VITE_USE_BACKUP_API === 'true';
  
  if (useBackupApi) {
    // Use WordPress.org demo site as backup
    console.log('Using backup WordPress API');
    return 'https://demo.wp-api.org/wp-json/wp/v2';
  }
  
  const baseUrl = WORDPRESS_API_URL.replace('/index.php?rest_route=/wp/v2', '/wp-json/wp/v2');
  console.log('Using WordPress API base URL:', baseUrl);
  return baseUrl;
};

// Original fallback URL kept for reference
export const DEFAULT_WP_API_URL = 'https://demo.wp-api.org/wp-json/wp/v2';

// Custom post types API endpoints
export const WORDPRESS_CASINO_ENDPOINT = `${getDirectApiUrl()}/crypto-casinos`;
export const WORDPRESS_BANNER_ADS_ENDPOINT = `${getDirectApiUrl()}/banner-ads`;

// Log the API URL being used
console.log('WordPress API URL being used:', WORDPRESS_API_URL);
console.log('Direct API URL format:', getDirectApiUrl());

export default {
  WORDPRESS_API_URL: getDirectApiUrl(),
  DEFAULT_WP_API_URL,
  WORDPRESS_CASINO_ENDPOINT,
  WORDPRESS_BANNER_ADS_ENDPOINT
};
