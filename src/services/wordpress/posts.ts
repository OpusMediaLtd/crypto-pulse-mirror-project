
import { getDirectApiUrl } from './config';
import { WordPressPost } from './types';
import { fetchWithCache } from './utils';
import { convertPostToNewsItem } from './convert';

// Cache durations
const POSTS_CACHE_TIME = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch posts from WordPress
 */
export const getPosts = async (page = 1, perPage = 9, category?: number): Promise<WordPressPost[]> => {
  // Get the correct API base URL
  const baseUrl = getDirectApiUrl();

  // Convert parameters to numbers if they aren't already
  const pageNum = Number(page); 
  const perPageNum = Number(perPage);
  const categoryNum = category ? Number(category) : undefined;
  
  // Create URL with proper integer parameters
  let url = `${baseUrl}/posts?_embed&page=${pageNum}&per_page=${perPageNum}`;

  // If category is provided, add it to the URL
  if (categoryNum) {
    url += `&categories=${categoryNum}`;
  }

  console.log('Attempting to fetch posts from:', url);
  return await fetchWithCache(url, POSTS_CACHE_TIME);
};

/**
 * Fetch a single post by slug
 */
export const getPostBySlug = async (slug: string): Promise<WordPressPost> => {
  const baseUrl = getDirectApiUrl();
  const url = `${baseUrl}/posts?slug=${slug}&_embed`;
  const posts = await fetchWithCache(url, POSTS_CACHE_TIME);
  
  if (Array.isArray(posts) && posts.length > 0) {
    return posts[0];
  }
  
  throw new Error(`Post with slug "${slug}" not found`);
};

export { convertPostToNewsItem };
