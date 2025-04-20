
/**
 * WordPress API services for posts
 */
import { WORDPRESS_API_URL } from './config';
import { WordPressPost, NewsItem } from './types';
import { getMockPosts } from './mocks';

/**
 * Fetch posts from WordPress
 */
export const getPosts = async (page = 1, perPage = 9, category?: number): Promise<WordPressPost[]> => {
  // If WORDPRESS_API_URL is not configured, return mock data
  if (WORDPRESS_API_URL === 'https://yourdomain.com/wp-json/wp/v2') {
    const allMockPosts = getMockPosts();
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    let filteredPosts = allMockPosts;
    if (category) {
      filteredPosts = allMockPosts.filter(post => post.categories.includes(category));
    }
    
    return filteredPosts.slice(startIndex, endIndex);
  }
  
  let url = `${WORDPRESS_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`;
  
  if (category) {
    url += `&categories=${category}`;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
};

/**
 * Fetch a single post by slug
 */
export const getPostBySlug = async (slug: string): Promise<WordPressPost> => {
  // If WORDPRESS_API_URL is not configured, return mock data
  if (WORDPRESS_API_URL === 'https://yourdomain.com/wp-json/wp/v2') {
    const mockPosts = getMockPosts();
    const post = mockPosts.find(p => p.slug === slug);
    if (post) return post;
    throw new Error('Post not found');
  }
  
  const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  
  const posts = await response.json();
  return posts[0];
};

/**
 * Convert WordPress post to NewsCard format
 */
export const convertPostToNewsItem = (post: WordPressPost): NewsItem => {
  const featuredMediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475';
  
  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ""), // Strip HTML
    image: featuredMediaUrl,
    category: 'News', // You would map this based on actual categories
    time: new Date(post.date).toLocaleString(),
    slug: post.slug,
    id: post.id
  };
};
