
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
  let url = `${baseUrl}/posts?_embed&page=${page}&per_page=${perPage}`;

  if (category) {
    url += `&categories=${category}`;
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
