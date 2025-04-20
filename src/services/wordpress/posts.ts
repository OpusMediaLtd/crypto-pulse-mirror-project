import { WORDPRESS_API_URL } from './config';
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
  
  console.log('Fetching WordPress data from:', url);
  const response = await fetch(url);
    
  if (!response.ok) {
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
};

/**
 * Fetch posts from WordPress
 */
export const getPosts = async (page = 1, perPage = 9, category?: number): Promise<WordPressPost[]> => {
  // Construct the URL with the correct query parameter format
  let url = `${WORDPRESS_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`;

  if (category) {
    url += `&categories=${category}`;
  }

  try {
    console.log('Attempting to fetch posts from:', url);
    const posts = await fetchWithCache(url, POSTS_CACHE_TIME);
    console.log('Fetched posts successfully:', posts);
    
    if (Array.isArray(posts) && posts.length > 0) {
      return posts;
    } else {
      console.warn('API returned empty or invalid posts array');
      return [];
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Return an empty array instead of mock posts
    return [];
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
  console.log("Converting post to news item:", post);

  // Skip field checks! Always just return the basic structure you provided:
  return {
    id: post.id,
    title: post.title.rendered,
    description: post.excerpt.rendered,
    image: '', // skip for now
    category: 'News',
    time: post.date,
    slug: post.slug,
    author: 'Author'
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

// Helper function to extract author (updated implementation)
const extractAuthor = (post: WordPressPost): string => {
  try {
    if (post._embedded && 
        post._embedded.author && 
        post._embedded.author[0] && 
        post._embedded.author[0].name) {
      return post._embedded.author[0].name;
    }
  } catch (error) {
    console.warn('Error extracting author:', error);
  }
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
