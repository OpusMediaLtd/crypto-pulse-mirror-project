
/**
 * WordPress API services for posts
 */
import { WORDPRESS_API_URL } from './config';
import { WordPressPost, NewsItem } from './types';
import { getMockPosts } from './mocks';

// Cache durations
const POSTS_CACHE_TIME = 5 * 60 * 1000; // 5 minutes
const CATEGORIES_CACHE_TIME = 30 * 60 * 1000; // 30 minutes

// In-memory cache
const cache: Record<string, { data: any; timestamp: number }> = {};

const fetchWithCache = async (url: string, cacheDuration: number) => {
  const now = Date.now();
  const cacheKey = url;
  
  // Check cache
  if (cache[cacheKey] && (now - cache[cacheKey].timestamp) < cacheDuration) {
    return cache[cacheKey].data;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Update cache
  cache[cacheKey] = {
    data,
    timestamp: now
  };
  
  return data;
};

/**
 * Fetch posts from WordPress
 */
export const getPosts = async (page = 1, perPage = 9, category?: number): Promise<WordPressPost[]> => {
  if (WORDPRESS_API_URL === 'https://yourdomain.com/wp-json/wp/v2') {
    console.log('Using mock data with category:', category);
    const allMockPosts = getMockPosts();
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    let filteredPosts = allMockPosts;
    if (category) {
      filteredPosts = allMockPosts.filter(post => post.categories.includes(category));
      console.log(`Filtered to ${filteredPosts.length} posts for category ${category}`);
    }
    
    return filteredPosts.slice(startIndex, endIndex);
  }
  
  let url = `${WORDPRESS_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`;
  
  if (category) {
    url += `&categories=${category}`;
  }
  
  try {
    return await fetchWithCache(url, POSTS_CACHE_TIME);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return getMockPosts().slice(0, perPage);
  }
};

/**
 * Fetch a single post by slug
 */
export const getPostBySlug = async (slug: string): Promise<WordPressPost> => {
  if (WORDPRESS_API_URL === 'https://yourdomain.com/wp-json/wp/v2') {
    const mockPosts = getMockPosts();
    const post = mockPosts.find(p => p.slug === slug);
    if (post) return post;
    throw new Error('Post not found');
  }
  
  const url = `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`;
  
  try {
    const posts = await fetchWithCache(url, POSTS_CACHE_TIME);
    if (!posts.length) {
      throw new Error('Post not found');
    }
    return posts[0];
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

/**
 * Convert WordPress post to NewsCard format
 */
export const convertPostToNewsItem = (post: WordPressPost): NewsItem => {
  if (!post || !post.title || !post.excerpt) {
    console.warn('Invalid post object:', post);
    return {
      id: 0,
      title: 'Unavailable',
      description: 'Content unavailable',
      image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format',
      category: 'News',
      time: new Date().toLocaleString(),
      slug: 'unavailable',
      author: 'Unknown'
    };
  }

  // Default fallback image if nothing is available
  const fallbackImage = 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format';
  
  // Get the featured media URL with proper fallback handling
  let featuredMediaUrl;
  
  try {
    // Try to safely access the featured media URL
    featuredMediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    
    // Validate the URL - check if it's a string and not empty
    if (!featuredMediaUrl || typeof featuredMediaUrl !== 'string' || featuredMediaUrl.trim() === '') {
      console.warn('Empty or invalid featured media URL for post:', post.id);
      featuredMediaUrl = fallbackImage;
    } else {
      // Try to construct a URL object to validate it further
      try {
        new URL(featuredMediaUrl);
      } catch (urlError) {
        console.warn('Invalid URL format:', featuredMediaUrl);
        featuredMediaUrl = fallbackImage;
      }
    }
  } catch (error) {
    console.warn('Error accessing featured media URL:', error);
    featuredMediaUrl = fallbackImage;
  }
  
  // Check for common URL patterns that wouldn't be images
  if (featuredMediaUrl.includes('undefined') || featuredMediaUrl.includes('null')) {
    console.warn('URL contains invalid substrings:', featuredMediaUrl);
    featuredMediaUrl = fallbackImage;
  }
  
  // Final check: ensure URL is absolute
  if (!featuredMediaUrl.startsWith('http')) {
    console.warn('URL is not absolute:', featuredMediaUrl);
    featuredMediaUrl = fallbackImage;
  }
  
  return {
    id: post.id,
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ""), // Strip HTML
    image: featuredMediaUrl,
    category: 'News', // You would map this based on actual categories
    time: new Date(post.date).toLocaleString(),
    slug: post.slug,
    author: 'CryptoPulse Staff' // Default author if not available
  };
};
