
/**
 * Mock data for WordPress API
 */
import { WordPressPost, WordPressCategory } from './types';

/**
 * Get mock posts for local development
 */
export const getMockPosts = (): WordPressPost[] => {
  const mockPosts: WordPressPost[] = [];
  
  // Generate just a few mock posts instead of 100
  for (let i = 0; i < 5; i++) {
    mockPosts.push({
      id: i + 1,
      date: new Date().toISOString(),
      slug: `mock-post-${i + 1}`,
      title: {
        rendered: `Mock Post ${i + 1}`
      },
      excerpt: {
        rendered: `This is a mock excerpt for post ${i + 1}`
      },
      content: {
        rendered: `<p>Mock content for post ${i + 1}</p>`
      },
      categories: [1],
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
          }
        ]
      }
    });
  }

  return mockPosts;
};

/**
 * Get mock categories for local development
 */
export const getMockCategories = (): WordPressCategory[] => {
  return [
    {
      id: 1,
      name: 'News',
      slug: 'news'
    }
  ];
};
