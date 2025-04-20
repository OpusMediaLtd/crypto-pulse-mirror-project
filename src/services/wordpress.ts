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
  // Generate 100 mock articles
  const mockPosts: WordPressPost[] = [];
  const topics = [
    { name: 'Bitcoin', categories: [1, 3] },
    { name: 'Ethereum', categories: [2, 3] },
    { name: 'DeFi', categories: [4, 3] },
    { name: 'NFTs', categories: [5] },
    { name: 'Regulation', categories: [6] },
    { name: 'Technology', categories: [7] },
    { name: 'Markets', categories: [3] }
  ];

  const images = [
    'photo-1649972904349-6e44c42644a7',
    'photo-1488590528505-98d2b5aba04b',
    'photo-1518770660439-4636190af475',
    'photo-1461749280684-dccba630e2f6',
    'photo-1486312338219-ce68d2c6f44d',
    'photo-1581091226825-a6a2a5aee158',
    'photo-1485827404703-89b55fcc595e',
    'photo-1526374965328-7f61d4dc18c5',
    'photo-1531297484001-80022131f5a1',
    'photo-1487058792275-0ad4aaf24ca7'
  ];

  const headlines = [
    { prefix: "Breaking: ", suffix: "Sends Shockwaves Through Crypto Market" },
    { prefix: "Analysis: ", suffix: "Could Reshape Digital Asset Landscape" },
    { prefix: "Expert Opinion: ", suffix: "Marks New Era for Cryptocurrency" },
    { prefix: "Market Alert: ", suffix: "Triggers Major Price Movement" },
    { prefix: "Exclusive: ", suffix: "Sets New Precedent in Blockchain Space" },
    { prefix: "Report: ", suffix: "Raises Questions About Future of DeFi" },
    { prefix: "Investigation: ", suffix: "Reveals Hidden Trends in Crypto" },
    { prefix: "Breaking News: ", suffix: "Changes Game for Digital Assets" }
  ];

  const companies = [
    "Binance", "Coinbase", "Kraken", "FTX", "Gemini", "BitMEX", "Uniswap", "Aave",
    "Compound", "MakerDAO", "Curve", "SushiSwap", "dYdX", "Synthetix", "Yearn",
    "1inch", "PancakeSwap", "Balancer", "Nexo", "Celsius"
  ];

  const actions = [
    "Launches", "Announces", "Implements", "Develops", "Reveals", "Introduces",
    "Publishes", "Releases", "Deploys", "Initiates", "Proposes", "Establishes"
  ];

  const features = [
    "New Trading Platform", "Revolutionary Protocol", "Innovative Solution",
    "Groundbreaking Technology", "Strategic Partnership", "Major Upgrade",
    "Security Enhancement", "Compliance Framework", "Development Roadmap",
    "Community Initiative"
  ];

  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days
    
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const headline = headlines[Math.floor(Math.random() * headlines.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const feature = features[Math.floor(Math.random() * features.length)];
    
    const title = Math.random() > 0.5 ? 
      `${headline.prefix}${company} ${action} ${feature} - ${headline.suffix}` :
      `${company} ${action} ${feature}: What This Means for ${topic.name}`;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    mockPosts.push({
      id: i + 1,
      date: date.toISOString(),
      slug,
      title: {
        rendered: title
      },
      excerpt: {
        rendered: `In a significant development for the ${topic.name} ecosystem, ${company} has made headlines with their latest announcement. This move is expected to have far-reaching implications for the broader cryptocurrency market and could potentially reshape the way we think about digital assets.`
      },
      content: {
        rendered: `
          <p>In a significant development for the ${topic.name} ecosystem, ${company} has made headlines with their latest announcement. This move is expected to have far-reaching implications for the broader cryptocurrency market and could potentially reshape the way we think about digital assets.</p>
          
          <h2>Key Highlights</h2>
          <ul>
            <li>Revolutionary approach to ${topic.name} implementation</li>
            <li>Enhanced security measures and user protection</li>
            <li>Improved scalability and performance metrics</li>
            <li>New features aimed at institutional adoption</li>
          </ul>
          
          <h2>Market Impact</h2>
          <p>The announcement has already begun to influence market sentiment, with many experts predicting significant implications for the broader crypto ecosystem. Industry analysts suggest this could mark a turning point for institutional adoption and market maturity.</p>
          
          <h2>Expert Opinions</h2>
          <p>Leading industry experts have weighed in on this development, with many expressing optimism about its potential impact on the market. Some have suggested that this could be a catalyst for the next phase of crypto evolution.</p>
          
          <blockquote>
            <p>"This is a game-changing development that could fundamentally alter how we think about ${topic.name}," said Sarah Chen, Chief Analyst at Digital Assets Research.</p>
          </blockquote>
          
          <h2>Looking Ahead</h2>
          <p>As the crypto industry continues to evolve, developments like this underscore the growing maturity of the space. Market participants will be watching closely to see how this initiative unfolds and what it means for the future of digital assets.</p>
        `
      },
      categories: topic.categories,
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: `https://images.unsplash.com/${images[Math.floor(Math.random() * images.length)]}`
          }
        ]
      }
    });
  }

  // Sort by date descending
  return mockPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
  convertPostToNewsItem,
  WORDPRESS_API_URL
};
