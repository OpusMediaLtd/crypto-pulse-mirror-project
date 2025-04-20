import { WORDPRESS_API_URL, DEFAULT_WP_API_URL } from './config';
import { WordPressPost, NewsItem } from './types';
import { getMockPosts } from './mocks';

// Cache durations
const POSTS_CACHE_TIME = 5 * 60 * 1000; // 5 minutes

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
  let url = `${WORDPRESS_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`;
  
  if (category) {
    url += `&categories=${category}`;
  }

  try {
    return await fetchWithCache(url, POSTS_CACHE_TIME);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/**
 * Fetch a single post by slug
 */
export const getPostBySlug = async (slug: string): Promise<WordPressPost> => {
  if (WORDPRESS_API_URL.includes('yourdomain.com')) {
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
    return createFallbackNewsItem();
  }

  // Default fallback image
  const fallbackImage = 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format';
  
  // Safely extract featured media URL
  let featuredMediaUrl = fallbackImage;
  try {
    const mediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    
    if (mediaUrl && typeof mediaUrl === 'string' && mediaUrl.startsWith('http')) {
      featuredMediaUrl = mediaUrl;
    }
  } catch (error) {
    console.warn('Error extracting featured media:', error);
  }
  
  return {
    id: post.id,
    title: post.title.rendered,
    description: stripHtmlTags(post.excerpt.rendered),
    image: featuredMediaUrl,
    category: 'News',
    time: formatPostDate(post.date),
    slug: post.slug,
    author: extractAuthor(post)
  };
};

// Helper function to strip HTML tags
const stripHtmlTags = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

// Helper function to format post date
const formatPostDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleString();
  } catch (error) {
    console.warn('Invalid date:', dateString);
    return new Date().toLocaleString();
  }
};

// Helper function to extract author (placeholder implementation)
const extractAuthor = (post: WordPressPost): string => {
  // You might want to implement more sophisticated author extraction
  return 'CryptoPulse Staff';
};

// Fallback function for invalid posts
const createFallbackNewsItem = (): NewsItem => ({
  id: 0,
  title: 'Unavailable Content',
  description: 'Content could not be loaded',
  image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format',
  category: 'News',
  time: new Date().toLocaleString(),
  slug: 'unavailable',
  author: 'Unknown'
});
