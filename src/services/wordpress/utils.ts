
/**
 * Utility functions for the WordPress API service
 */

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
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    // Use the CORS proxy for the request
    const proxyUrl = getCorsProxyUrl(url);
    console.log('Using CORS proxy URL:', proxyUrl);

    // Log the decoded URL for debugging
    const decodedUrl = decodeURIComponent(proxyUrl);
    console.log('Full request URL (decoded):', decodedUrl);
    
    // Further inspect the URL parameters before fetch
    try {
      const urlObj = new URL(decodedUrl.replace('https://corsproxy.io/?', ''));
      console.log('URL parameters:', {
        page: urlObj.searchParams.get('page'),
        per_page: urlObj.searchParams.get('per_page'),
        categories: urlObj.searchParams.get('categories')
      });
    } catch (e) {
      console.error('Failed to parse URL for inspection:', e);
    }
    
    // Make the fetch request with additional headers
    const response = await fetch(proxyUrl, { 
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Failed to fetch from ${url}: Status ${response.status} ${response.statusText}`);
      
      try {
        // Try to get error details from the response
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        try {
          // Try to parse as JSON if possible
          const errorData = JSON.parse(errorText);
          console.error('API error details:', errorData);
          
          if (errorData.data?.params) {
            console.error('Parameter errors:', errorData.data.params);
            
            // Check for specific parameter type issues
            Object.entries(errorData.data.params).forEach(([param, error]) => {
              console.error(`Parameter error with ${param}:`, error);
            });
          }
          
          if (errorData.message) {
            throw new Error(`API error: ${errorData.message}`);
          }
        } catch (jsonError) {
          // If can't parse as JSON, just log the text
          console.error('Non-JSON error response');
        }
      } catch (textError) {
        console.error('Could not read error response text');
      }
      
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('WordPress API Response received successfully');

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
      console.error('This may be a CORS issue. Using CORS proxy but still failed.');
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
