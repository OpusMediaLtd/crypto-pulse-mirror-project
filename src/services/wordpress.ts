
/**
 * WordPress API service
 * This service handles fetching data from a WordPress backend via the REST API
 */

const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://yourdomain.com/wp-json/wp/v2';

interface WordPressPost {
  id: number;
  date: string;
  slug: string;
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
  // If WORDPRESS_API_URL is not configured, return mock data
  if (WORDPRESS_API_URL === 'https://yourdomain.com/wp-json/wp/v2') {
    return getMockPosts();
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
 * Fetch categories from WordPress
 */
export const getCategories = async (): Promise<WordPressCategory[]> => {
  // If WORDPRESS_API_URL is not configured, return mock data
  if (WORDPRESS_API_URL === 'https://yourdomain.com/wp-json/wp/v2') {
    return getMockCategories();
  }
  
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

/**
 * Get mock posts for local development
 */
const getMockPosts = (): WordPressPost[] => {
  return [
    {
      id: 1,
      date: '2025-04-19T12:00:00',
      slug: 'rugpull-losses-soar-2025-crypto-scams',
      title: {
        rendered: 'Rugpull Losses Soar 6,500% in 2025 as Crypto Scams Turn Deadlier'
      },
      excerpt: {
        rendered: 'The cryptocurrency space has seen an alarming rise in scam activity over the past year, with rugpull losses increasing by an unprecedented 6,500% according to a new report from DappRadar.'
      },
      content: {
        rendered: '<p>Full article content here...</p>'
      },
      categories: [1, 4],
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
          }
        ]
      }
    },
    {
      id: 2,
      date: '2025-04-19T10:30:00',
      slug: 'lyn-alden-bitcoin-higher-trump-tariff',
      title: {
        rendered: 'Lyn Alden Says Bitcoin Would Be Higher if Not for Trump\'s Tariff Shock'
      },
      excerpt: {
        rendered: 'Renowned financial strategist Lyn Alden believes that Bitcoin would be trading at significantly higher prices if not for the market uncertainty created by former President Donald Trump\'s recent comments on potential tariff implementations.'
      },
      content: {
        rendered: '<p>Full article content here...</p>'
      },
      categories: [1, 3],
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
          }
        ]
      }
    },
    {
      id: 3,
      date: '2025-04-18T15:45:00',
      slug: 'why-bitcoin-might-turn-bullish-again',
      title: {
        rendered: 'Why Bitcoin Might Be About to Turn Bullish Again'
      },
      excerpt: {
        rendered: 'After several weeks of sideways trading and declining volatility, Bitcoin may be on the verge of resuming its bullish trend, according to a convergence of technical indicators and on-chain metrics.'
      },
      content: {
        rendered: '<p>Full article content here...</p>'
      },
      categories: [1, 5],
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
          }
        ]
      }
    },
    {
      id: 4,
      date: '2025-04-18T09:15:00',
      slug: 'trumps-attacks-jerome-powell-crypto',
      title: {
        rendered: 'What Trump\'s Attacks on Jerome Powell Could Mean for Crypto'
      },
      excerpt: {
        rendered: 'Former President Donald Trump\'s recent criticisms of Federal Reserve Chair Jerome Powell have sent ripples through financial markets, with potential implications for cryptocurrency valuations and adoption.'
      },
      content: {
        rendered: '<p>Full article content here...</p>'
      },
      categories: [2, 6],
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
          }
        ]
      }
    },
    {
      id: 5,
      date: '2025-04-17T14:20:00',
      slug: 'crypto-banking-battle-regulators',
      title: {
        rendered: 'Crypto\'s Banking Battle: Are Regulators Going Too Far?'
      },
      excerpt: {
        rendered: 'The relationship between cryptocurrency companies and traditional banking institutions has grown increasingly strained in recent months, as regulatory pressures have led to account closures, payment processing difficulties, and limited access to financial services for crypto businesses.'
      },
      content: {
        rendered: '<p>Full article content here...</p>'
      },
      categories: [2, 7],
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
          }
        ]
      }
    }
  ];
};

/**
 * Get mock categories for local development
 */
const getMockCategories = (): WordPressCategory[] => {
  return [
    {
      id: 1,
      name: 'Bitcoin',
      slug: 'bitcoin'
    },
    {
      id: 2,
      name: 'Ethereum',
      slug: 'ethereum'
    },
    {
      id: 3,
      name: 'Markets',
      slug: 'markets'
    },
    {
      id: 4,
      name: 'DeFi',
      slug: 'defi'
    },
    {
      id: 5,
      name: 'NFTs',
      slug: 'nfts'
    },
    {
      id: 6,
      name: 'Regulation',
      slug: 'regulation'
    },
    {
      id: 7,
      name: 'Technology',
      slug: 'technology'
    }
  ];
};

export default {
  getPosts,
  getPostBySlug,
  getCategories,
  convertPostToNewsItem
};
