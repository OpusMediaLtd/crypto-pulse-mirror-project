
/**
 * Utility functions for the WordPress API service
 */
import { WORDPRESS_API_FALLBACKS } from './config';

// In-memory cache
const cache: Record<string, { data: any; timestamp: number }> = {};

/**
 * Function to get a CORS-friendly URL
 */
export const getCorsProxyUrl = (url: string): string => {
  // Use corsproxy.io as a proxy
  return `https://corsproxy.io/?${encodeURIComponent(url)}`;
};

/**
 * Fetch with simple in-memory cache, timeout, and multiple fallback attempts
 */
export const fetchWithCache = async (url: string, cacheDuration: number) => {
  const now = Date.now();
  const cacheKey = url;

  // Check cache
  if (cache[cacheKey] && (now - cache[cacheKey].timestamp) < cacheDuration) {
    console.log('Using cached data for:', url);
    return cache[cacheKey].data;
  }

  console.log('Fetching WordPress data from:', url);
  
  // Try the provided URL first, then try fallbacks if needed
  let lastError: Error | null = null;
  
  // First try direct URL
  try {
    console.log('Attempting direct API request to:', url);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    const directResponse = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (directResponse.ok) {
      const data = await directResponse.json();
      console.log('WordPress API direct response received successfully');
      
      // Update cache
      cache[cacheKey] = {
        data,
        timestamp: now
      };
      
      return data;
    }
    
    console.log('Direct request failed with status:', directResponse.status);
  } catch (directError) {
    console.log('Direct request failed:', directError);
    lastError = directError as Error;
  }
  
  // Try with CORS proxy as fallback
  try {
    console.log('Falling back to CORS proxy...');
    const proxyUrl = getCorsProxyUrl(url);
    console.log('Using CORS proxy URL:', proxyUrl);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    const response = await fetch(proxyUrl, { 
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      console.log('WordPress API response via CORS proxy received successfully');
      
      // Update cache
      cache[cacheKey] = {
        data,
        timestamp: now
      };
      
      return data;
    }
    
    console.log('CORS proxy request failed with status:', response.status);
  } catch (proxyError) {
    console.log('CORS proxy request failed:', proxyError);
    lastError = proxyError as Error;
  }
  
  // Try fallback WordPress sites
  for (const fallbackBaseUrl of WORDPRESS_API_FALLBACKS) {
    try {
      // Skip if this is the same as our original URL
      if (url.includes(fallbackBaseUrl)) {
        continue;
      }
      
      // Create fallback URL by replacing the base URL portion
      const endpoint = url.split('/wp-json/wp/v2/')[1];
      if (!endpoint) continue;
      
      const fallbackUrl = `${fallbackBaseUrl}/${endpoint}`;
      console.log('Trying fallback WordPress site:', fallbackUrl);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const fallbackResponse = await fetch(fallbackUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (fallbackResponse.ok) {
        const data = await fallbackResponse.json();
        console.log('Fallback WordPress site response successful');
        
        // Update cache
        cache[cacheKey] = {
          data,
          timestamp: now
        };
        
        return data;
      }
      
      console.log('Fallback request failed with status:', fallbackResponse.status);
    } catch (fallbackError) {
      console.log('Fallback request failed:', fallbackError);
      lastError = fallbackError as Error;
    }
  }
  
  // All attempts failed, throw the last error
  console.error('All WordPress API attempts failed');
  throw lastError || new Error('Failed to fetch data from all WordPress sources');
};

/**
 * Helper: strip HTML tags
 */
export const stripHtmlTags = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

/**
 * Helper: format post date
 */
export const formatPostDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleString();
  } catch (error) {
    console.warn('Invalid date:', dateString);
    return new Date().toLocaleString();
  }
};
