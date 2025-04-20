
// Check for environment variables, then use the provided WordPress API URL
export const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API || 'https://cryptopulsegg-10eda24.ingress-bonde.ewp.live/index.php?rest_route=/wp/v2';

// Custom endpoints for different post types
export const WORDPRESS_BANNER_ADS_ENDPOINT = `${WORDPRESS_API_URL}/banner-ads`;
export const WORDPRESS_CASINO_ENDPOINT = `${WORDPRESS_API_URL}/casinos`;
export const WORDPRESS_EXCHANGE_ENDPOINT = `${WORDPRESS_API_URL}/crypto-exchanges`;
export const WORDPRESS_LANDING_PAGE_ENDPOINT = `${WORDPRESS_API_URL}/landing-pages`;

// Get the direct API URL format
export const getDirectApiUrl = () => {
  // For sites using pretty permalinks vs index.php?rest_route format
  if (WORDPRESS_API_URL.includes('/index.php?rest_route=')) {
    return WORDPRESS_API_URL;
  }
  
  console.log('Using WordPress API base URL:', WORDPRESS_API_URL);
  return WORDPRESS_API_URL;
};

// Log the API URL being used
console.log('WordPress API URL configured as:', WORDPRESS_API_URL);
console.log('Direct API URL format:', getDirectApiUrl());
console.log('Banner Ads endpoint:', WORDPRESS_BANNER_ADS_ENDPOINT);
console.log('Casinos endpoint:', WORDPRESS_CASINO_ENDPOINT);
console.log('Exchanges endpoint:', WORDPRESS_EXCHANGE_ENDPOINT);
console.log('Landing Pages endpoint:', WORDPRESS_LANDING_PAGE_ENDPOINT);

export default {
  WORDPRESS_API_URL,
  WORDPRESS_BANNER_ADS_ENDPOINT,
  WORDPRESS_CASINO_ENDPOINT,
  WORDPRESS_EXCHANGE_ENDPOINT,
  WORDPRESS_LANDING_PAGE_ENDPOINT,
  getDirectApiUrl
};
