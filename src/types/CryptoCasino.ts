
export interface CryptoCurrency {
  name: string;
  code: string;
  icon?: string;
}

export interface CasinoReview {
  thumbsUp: number;
  thumbsDown: number;
}

export interface CryptoCasino {
  id: number;
  name: string;
  logo: string;
  rating: number; // 1-5 stars
  description: string;
  acceptedCurrencies: CryptoCurrency[];
  welcomeBonus: string;
  affiliateLink: string;
  featured: boolean;
  review: CasinoReview;
  rank?: number; // For ordering in lists
}

export interface CasinoListFilters {
  currency?: string;
  minRating?: number;
}
