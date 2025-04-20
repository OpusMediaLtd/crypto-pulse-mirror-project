
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
  
  // Array of working image URLs from Unsplash
  const cryptoImages = [
    'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format',
    'https://images.unsplash.com/photo-1523759533935-e4b770303016?w=600&auto=format',
    'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=600&auto=format',
    'https://images.unsplash.com/photo-1543699539-33a389c5dcfe?w=600&auto=format',
    'https://images.unsplash.com/photo-1625815796776-e08a1c35db53?w=600&auto=format',
    'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format',
    'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=600&auto=format',
    'https://images.unsplash.com/photo-1631603090989-93f9ef6f9d80?w=600&auto=format',
    'https://images.unsplash.com/photo-1629339942248-45d4b1c9f1c4?w=600&auto=format',
    'https://images.unsplash.com/photo-1629342285508-53a84366d5e8?w=600&auto=format',
    'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600&auto=format',
    'https://images.unsplash.com/photo-1642010654727-a41d1b33c48d?w=600&auto=format',
    'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=600&auto=format',
    'https://images.unsplash.com/photo-1609726494499-27d3e942456c?w=600&auto=format',
    'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&auto=format'
  ];
  
  // Create posts for each category
  categories.forEach((category) => {
    // Create 3 posts per category
    for (let i = 0; i < 3; i++) {
      // Pick a random image from the array
      const randomImageIndex = Math.floor(Math.random() * cryptoImages.length);
      const imageUrl = cryptoImages[randomImageIndex];
      
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
              source_url: imageUrl
            }
          ]
        }
      });
    }
  });

  return mockPosts;
};
