
/**
 * Utility functions for the WordPress API service
 */

// In-memory cache
const cache: Record<string, { data: any; timestamp: number }> = {};

/**
 * Fetch with simple in-memory cache and timeout
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
  try {
    // Add a timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Failed to fetch from ${url}: Status ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('WordPress API Response:', data);

    // Update cache
    cache[cacheKey] = {
      data,
      timestamp: now
    };

    return data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);

    // If this is a timeout or network error, check if we have stale cache
    if (cache[cacheKey]) {
      console.warn('Using stale cache due to fetch error');
      return cache[cacheKey].data;
    }

    // If it's a CORS error, suggest solutions in the console
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('This may be a CORS issue. Ensure your WordPress site has CORS headers configured properly.');
      console.error('For WordPress, you can use a plugin like "WP CORS" or add headers in your .htaccess file.');
    }

    throw error; // Re-throw to handle it in the calling function
  }
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
