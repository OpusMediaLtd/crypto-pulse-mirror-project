
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
    'wp:term'?: {
      name: string;
      slug: string;
      id: number;
    }[][];
    author?: {
      name: string;
      id: number;
    }[];
  };
  categories: number[];
  tags?: number[];
  acf?: Record<string, any>; // For Advanced Custom Fields
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  parent?: number;
  meta?: Record<string, any>;
}

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface NewsItem {
  title: string;
  description: string;
  image: string;
  category: string;
  time: string;
  slug: string;
  id: number;
  author: string;
  tags?: string[];
  isSponsored?: boolean;
}

export interface BannerAdResponse {
  id: number;
  date: string;
  slug: string;
  title: {
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
  acf?: {
    ad_link: string;
    ad_location: string;
    is_active: boolean;
    ad_tracking_id?: string;
  };
}

export interface CasinoPostResponse {
  id: number;
  date: string;
  slug: string;
  title: {
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
  acf?: {
    casino_rating: number;
    welcome_bonus: string;
    affiliate_link: string;
    accepted_currencies: string[];
    is_featured: boolean;
    casino_rank: number;
    thumbs_up: number;
    thumbs_down: number;
  };
}
