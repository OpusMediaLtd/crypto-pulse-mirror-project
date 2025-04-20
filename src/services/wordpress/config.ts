
// Check for environment variables, then use a reliable demo URL if not available
export const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API || 'https://wptavern.com/wp-json/wp/v2';

// Based on the screenshots, our URLs need to use the direct path format
export const getDirectApiUrl = () => {
  // For sites using pretty permalinks
  if (WORDPRESS_API_URL.includes('/index.php?rest_route=')) {
    // Convert to direct path format if using index.php?rest_route format
    return WORDPRESS_API_URL.replace('/index.php?rest_route=/wp/v2', '/wp-json/wp/v2');
  }
  
  console.log('Using WordPress API base URL:', WORDPRESS_API_URL);
  return WORDPRESS_API_URL;
};

// Custom post types API endpoints
export const WORDPRESS_CASINO_ENDPOINT = `${getDirectApiUrl()}/crypto-casinos`;
export const WORDPRESS_BANNER_ADS_ENDPOINT = `${getDirectApiUrl()}/banner-ads`;

// Log the API URL being used
console.log('WordPress API URL configured as:', WORDPRESS_API_URL);
console.log('Direct API URL format:', getDirectApiUrl());

export default {
  WORDPRESS_API_URL: getDirectApiUrl(),
  WORDPRESS_CASINO_ENDPOINT,
  WORDPRESS_BANNER_ADS_ENDPOINT
};
