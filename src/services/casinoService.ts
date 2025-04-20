import { CryptoCasino, CasinoListFilters } from '@/types/CryptoCasino';
import wordpress from './wordpress';
import { WORDPRESS_API_URL, DEFAULT_WP_API_URL } from './wordpress/config';

// Use WORDPRESS_API_URL from the config
const WORDPRESS_CASINO_ENDPOINT = `${WORDPRESS_API_URL || DEFAULT_WP_API_URL}/crypto-casinos`;

/**
 * Fetch crypto casino listings from WordPress
 */
export const getCryptoCasinos = async (filters?: CasinoListFilters): Promise<CryptoCasino[]> => {
  // If WordPress API is not configured, return mock data
  if (!WORDPRESS_API_URL || WORDPRESS_API_URL === DEFAULT_WP_API_URL) {
    let casinos = getMockCasinoListings();
    
    // Apply filters
    if (filters) {
      if (filters.currency) {
        casinos = casinos.filter(casino => 
          casino.acceptedCurrencies.some(curr => curr.code.toLowerCase() === filters.currency?.toLowerCase())
        );
      }
      
      if (filters.minRating) {
        casinos = casinos.filter(casino => casino.rating >= (filters.minRating || 0));
      }
    }
    
    // Sort by rank if available
    return casinos.sort((a, b) => (a.rank || 999) - (b.rank || 999));
  }
  
  // Build query parameters
  let url = `${WORDPRESS_CASINO_ENDPOINT}?per_page=50`;
  
  if (filters) {
    if (filters.currency) {
      url += `&crypto=${filters.currency}`;
    }
    
    if (filters.minRating) {
      url += `&min_rating=${filters.minRating}`;
    }
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch casino listings');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching casino listings:', error);
    return getMockCasinoListings();
  }
};

/**
 * Record click on casino affiliate link
 */
export const trackCasinoClick = async (casinoId: number): Promise<void> => {
  if (!WORDPRESS_API_URL || WORDPRESS_API_URL === DEFAULT_WP_API_URL) {
    console.log(`Tracking click for casino ID: ${casinoId}`);
    return;
  }
  
  try {
    await fetch(`${WORDPRESS_CASINO_ENDPOINT}/${casinoId}/track-click`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error tracking casino click:', error);
  }
};

/**
 * Submit a review (thumbs up/down) for a casino
 */
export const submitCasinoReview = async (
  casinoId: number, 
  isPositive: boolean
): Promise<void> => {
  if (!WORDPRESS_API_URL || WORDPRESS_API_URL === DEFAULT_WP_API_URL) {
    console.log(`Submitting ${isPositive ? 'positive' : 'negative'} review for casino ID: ${casinoId}`);
    return;
  }
  
  try {
    await fetch(`${WORDPRESS_CASINO_ENDPOINT}/${casinoId}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isPositive,
      }),
    });
  } catch (error) {
    console.error('Error submitting casino review:', error);
  }
};

/**
 * Get mock casino listings for local development
 */
const getMockCasinoListings = (): CryptoCasino[] => {
  const cryptos = [
    { name: 'Bitcoin', code: 'BTC', icon: '₿' },
    { name: 'Ethereum', code: 'ETH', icon: 'Ξ' },
    { name: 'Litecoin', code: 'LTC', icon: 'Ł' },
    { name: 'Ripple', code: 'XRP', icon: '✕' },
    { name: 'Dogecoin', code: 'DOGE', icon: 'Ð' },
    { name: 'Bitcoin Cash', code: 'BCH', icon: '₿' },
    { name: 'Tether', code: 'USDT', icon: '₮' },
    { name: 'Cardano', code: 'ADA', icon: 'A' },
    { name: 'Solana', code: 'SOL', icon: 'S' }
  ];
  
  const casinoNames = [
    'CryptoRoyal', 'BitVegas', 'EtherPlay', 'CoinWager', 'BlockchainBets',
    'SatoshiSpins', 'DecentralWin', 'TokenGamble', 'ChainedLuck', 'ByteBets',
    'MoonStake', 'CryptoJackpot', 'NFTWin', 'WalletWager', 'HashRoll'
  ];
  
  const bonuses = [
    'Up to 5 BTC + 200 Free Spins', '100% up to 1 BTC First Deposit', 
    '200% Match + 50 Free Spins', '150% Welcome Bonus up to 2 ETH',
    'No Deposit Bonus: 50 Free Spins', 'Welcome Package: 300% up to 3 BTC',
    '100% Deposit Match + Cashback', 'Crypto Starter Pack: 250 Free Spins',
    'Double Your First Deposit', '400% Welcome Bonus up to 4 BTC'
  ];
  
  const descriptions = [
    'Premier crypto casino offering a wide range of games with instant withdrawals.',
    'Provably fair gaming platform with over 2000 slots and table games.',
    'Leading blockchain casino with exclusive bonuses for crypto deposits.',
    'Secure and anonymous gaming with lightning-fast transactions.',
    'Innovative crypto gambling platform with unique games and generous rewards.'
  ];
  
  return casinoNames.map((name, index) => {
    // Choose a random number of cryptocurrencies (3-7)
    const shuffledCryptos = [...cryptos].sort(() => 0.5 - Math.random());
    const casinoCryptos = shuffledCryptos.slice(0, 3 + Math.floor(Math.random() * 5));
    
    return {
      id: index + 1,
      name,
      logo: `https://logo.clearbit.com/${name.toLowerCase().replace(/\s+/g, '')}.com`,
      rating: 3 + Math.floor(Math.random() * 3), // 3-5 star rating
      description: descriptions[index % descriptions.length],
      acceptedCurrencies: casinoCryptos,
      welcomeBonus: bonuses[index % bonuses.length],
      affiliateLink: `https://example.com/refer/${name.toLowerCase().replace(/\s+/g, '')}`,
      featured: index < 3, // First 3 are featured
      review: {
        thumbsUp: 50 + Math.floor(Math.random() * 200),
        thumbsDown: Math.floor(Math.random() * 50)
      },
      rank: index + 1
    };
  });
};

export default {
  getCryptoCasinos,
  trackCasinoClick,
  submitCasinoReview
};
