
/**
 * WordPress API types
 */

export interface WordPressPost {
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

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}

export interface NewsItem {
  title: string;
  description: string;
  image: string;
  category: string;
  time: string;
  slug: string;
  id: number;
}
