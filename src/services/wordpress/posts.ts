
import { getDirectApiUrl } from './config';
import { WordPressPost } from './types';
import { fetchWithCache } from './utils';
import { convertPostToNewsItem } from './convert';

// Cache durations
const POSTS_CACHE_TIME = 5 * 60 * 1000; // 5 minutes

// Mock data for development and fallback
const createMockPosts = () => {
  console.warn('Using mock data due to API connection issues');
  
  const mockPosts: WordPressPost[] = [
    {
      id: 1,
      title: { rendered: 'Bitcoin Reaches New All-Time High' },
      excerpt: { rendered: '<p>Bitcoin has surpassed previous records, reaching a new all-time high price.</p>' },
      content: { rendered: '<p>Bitcoin has surpassed previous records, reaching a new all-time high price.</p>' },
      slug: 'bitcoin-new-ath',
      date: new Date().toISOString(),
      categories: [1],
      _embedded: {
        'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format' }],
        'wp:term': [[{ name: 'Bitcoin', slug: 'bitcoin', id: 1 }]],
        author: [{ name: 'CryptoPulse Staff', id: 1 }]
      }
    },
    {
      id: 2,
      title: { rendered: 'Ethereum 2.0 Update Progress' },
      excerpt: { rendered: '<p>The latest on Ethereum\'s transition to proof-of-stake.</p>' },
      content: { rendered: '<p>The latest on Ethereum\'s transition to proof-of-stake.</p>' },
      slug: 'ethereum-2-progress',
      date: new Date().toISOString(),
      categories: [2],
      _embedded: {
        'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600&auto=format' }],
        'wp:term': [[{ name: 'Ethereum', slug: 'ethereum', id: 2 }]],
        author: [{ name: 'CryptoPulse Staff', id: 1 }]
      }
    },
    {
      id: 3,
      title: { rendered: 'Regulations Coming For Crypto Exchanges' },
      excerpt: { rendered: '<p>New regulatory frameworks being developed for cryptocurrency exchanges worldwide.</p>' },
      content: { rendered: '<p>New regulatory frameworks being developed for cryptocurrency exchanges worldwide.</p>' },
      slug: 'crypto-exchange-regulations',
      date: new Date().toISOString(),
      categories: [3],
      _embedded: {
        'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&auto=format' }],
        'wp:term': [[{ name: 'Regulation', slug: 'regulation', id: 3 }]],
        author: [{ name: 'CryptoPulse Staff', id: 1 }]
      }
    },
    {
      id: 4,
      title: { rendered: 'NFT Market Shows Signs of Recovery' },
      excerpt: { rendered: '<p>After months of declining sales, the NFT market is showing positive indicators.</p>' },
      content: { rendered: '<p>After months of declining sales, the NFT market is showing positive indicators.</p>' },
      slug: 'nft-market-recovery',
      date: new Date().toISOString(),
      categories: [4],
      _embedded: {
        'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=600&auto=format' }],
        'wp:term': [[{ name: 'NFTs', slug: 'nfts', id: 4 }]],
        author: [{ name: 'CryptoPulse Staff', id: 1 }]
      }
    },
    {
      id: 5,
      title: { rendered: 'DeFi Protocol Security Audit Results' },
      excerpt: { rendered: '<p>Recent security audits reveal strengths and vulnerabilities in popular DeFi protocols.</p>' },
      content: { rendered: '<p>Recent security audits reveal strengths and vulnerabilities in popular DeFi protocols.</p>' },
      slug: 'defi-security-audits',
      date: new Date().toISOString(),
      categories: [5],
      _embedded: {
        'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1639152201720-5e536d254d81?w=600&auto=format' }],
        'wp:term': [[{ name: 'DeFi', slug: 'defi', id: 5 }]],
        author: [{ name: 'CryptoPulse Staff', id: 1 }]
      }
    },
    {
      id: 6,
      title: { rendered: 'Major Bank Launches Crypto Custody Service' },
      excerpt: { rendered: '<p>One of the world\'s largest banks now offers cryptocurrency custody for institutional clients.</p>' },
      content: { rendered: '<p>One of the world\'s largest banks now offers cryptocurrency custody for institutional clients.</p>' },
      slug: 'bank-crypto-custody',
      date: new Date().toISOString(),
      categories: [6],
      _embedded: {
        'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=600&auto=format' }],
        'wp:term': [[{ name: 'Banking', slug: 'banking', id: 6 }]],
        author: [{ name: 'CryptoPulse Staff', id: 1 }]
      }
    }
  ];
  
  return mockPosts;
};

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

  try {
    console.log('Attempting to fetch posts from:', url);
    const posts = await fetchWithCache(url, POSTS_CACHE_TIME);
    console.log('WordPress posts retrieved:', posts);

    if (Array.isArray(posts) && posts.length > 0) {
      return posts;
    } else {
      console.warn('API returned empty or invalid posts array');
      console.log('Returning mock posts as fallback');
      return createMockPosts();
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    console.log('Returning mock posts due to error');
    return createMockPosts();
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
      // If no post found, return a mock post
      console.warn('Post not found, using mock data');
      return createMockPosts().find(p => p.slug === slug) || createMockPosts()[0];
    }
    return posts[0];
  } catch (error) {
    console.error('Error fetching post:', error);
    // Return a mock post as fallback
    return createMockPosts().find(p => p.slug === slug) || createMockPosts()[0];
  }
};

export { convertPostToNewsItem };
