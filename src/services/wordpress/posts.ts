
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

  // Construct the URL with the correct format based on the screenshots
  // Ensure parameters are numbers by using parseInt
  const pageNum = parseInt(String(page), 10);
  const perPageNum = parseInt(String(perPage), 10);
  
  // Build the URL with proper query parameters - Force numeric parameters
  // The API requires these to be actual integers passed directly in the URL
  let url = `${baseUrl}/posts?_embed&page=${pageNum}&per_page=${perPageNum}`;

  if (category) {
    const categoryNum = parseInt(String(category), 10);
    url += `&categories=${categoryNum}`;
  }

  try {
    console.log('Attempting to fetch posts from:', url);
    const posts = await fetchWithCache(url, POSTS_CACHE_TIME);
    console.log('WordPress posts retrieved:', posts);

    if (Array.isArray(posts) && posts.length > 0) {
      return posts;
    } else {
      console.warn('API returned empty or invalid posts array');
      throw new Error('No posts returned from the WordPress API');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/**
 * Fetch a single post by slug
 */
export const getPostBySlug = async (slug: string): Promise<WordPressPost> => {
  const baseUrl = getDirectApiUrl();
  const url = `${baseUrl}/posts?slug=${slug}&_embed`;

  try {
    const posts = await fetchWithCache(url, POSTS_CACHE_TIME);
    if (!Array.isArray(posts) || posts.length === 0) {
      throw new Error('Post not found');
    }
    return posts[0];
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export { convertPostToNewsItem };
