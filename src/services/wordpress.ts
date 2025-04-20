
/**
 * WordPress API service
 * This service handles fetching data from a WordPress backend via the REST API
 */

const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://yourdomain.com/wp-json/wp/v2';

interface WordPressPost {
  id: number;
  date: string;
  slug: string; // Add the missing slug property
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
  categories: number[];
}

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}

/**
 * Fetch posts from WordPress
 */
export const getPosts = async (page = 1, perPage = 9, category?: number): Promise<WordPressPost[]> => {
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
  const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  
  const posts = await response.json();
  return posts[0];
};

/**
 * Fetch categories from WordPress
 */
export const getCategories = async (): Promise<WordPressCategory[]> => {
  const response = await fetch(`${WORDPRESS_API_URL}/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
};

/**
 * Convert WordPress post to NewsCard format
 */
export const convertPostToNewsItem = (post: WordPressPost) => {
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

export default {
  getPosts,
  getPostBySlug,
  getCategories,
  convertPostToNewsItem
};
