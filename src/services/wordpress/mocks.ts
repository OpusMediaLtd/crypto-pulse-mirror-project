
/**
 * Mock data for WordPress API
 */
import { WordPressPost, WordPressCategory } from './types';

/**
 * Get mock categories for local development
 */
export const getMockCategories = (): WordPressCategory[] => {
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
      name: 'DeFi',
      slug: 'defi'
    },
    {
      id: 4,
      name: 'NFTs',
      slug: 'nfts'
    },
    {
      id: 5,
      name: 'Regulation',
      slug: 'regulation'
    }
  ];
};

/**
 * Get mock posts for local development
 */
export const getMockPosts = (): WordPressPost[] => {
  const mockPosts: WordPressPost[] = [];
  const categories = getMockCategories();
  
  // Create posts for each category
  categories.forEach((category) => {
    // Create 3 posts per category
    for (let i = 0; i < 3; i++) {
      mockPosts.push({
        id: mockPosts.length + 1,
        date: new Date().toISOString(),
        slug: `${category.slug}-post-${i + 1}`,
        title: {
          rendered: `${category.name} Update ${i + 1}: Latest Developments`
        },
        excerpt: {
          rendered: `This is a mock excerpt for ${category.name} post ${i + 1}`
        },
        content: {
          rendered: `<p>Welcome to our latest ${category.name} update! Here we discuss the most recent developments in the ${category.name} space.</p>
                    <h2>Key Points</h2>
                    <ul>
                      <li>Important development 1</li>
                      <li>Market analysis</li>
                      <li>Future predictions</li>
                    </ul>
                    <p>Stay tuned for more updates on ${category.name}!</p>`
        },
        categories: [category.id],
        _embedded: {
          'wp:featuredmedia': [
            {
              source_url: `https://images.unsplash.com/photo-${1518770660439 + mockPosts.length}`
            }
          ]
        }
      });
    }
  });

  return mockPosts;
};

