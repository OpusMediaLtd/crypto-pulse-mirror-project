
import { CryptoCasino, CasinoListFilters } from '@/types/CryptoCasino';
import { WORDPRESS_API_URL } from './wordpress/config';
import { fetchWithCache } from './wordpress/utils';

// Cache duration for casino data
const CASINO_CACHE_TIME = 15 * 60 * 1000; // 15 minutes

/**
 * Add Betpanda.io casino entry as the first item in the toplist.
 */
const betpandaCasino: CryptoCasino = {
  id: 100000,
  name: "Betpanda.io",
  logo: "https://placehold.co/300x300/1F2937/FFFFFF?text=Betpanda.io", // Using a reliable placeholder image
  rating: 5,
  description: "Betpanda.io is the #1 crypto casino for 2025. Top bonuses, instant crypto payouts, and a massive library of provably fair games. Sign up and experience next-level crypto gambling.",
  acceptedCurrencies: [
    { name: 'Bitcoin', code: 'BTC', icon: '₿' },
    { name: 'Ethereum', code: 'ETH', icon: 'Ξ' },
    { name: 'Litecoin', code: 'LTC', icon: 'Ł' },
    { name: 'Dogecoin', code: 'DOGE', icon: 'Ð' },
    { name: 'USDT', code: 'USDT', icon: '₮' }
  ],
  welcomeBonus: '500% Bonus + 300 Free Spins',
  affiliateLink: 'https://betpanda.io/', // Main link for Betpanda
  featured: true,
  review: {
    thumbsUp: 9999,
    thumbsDown: 7
  },
  rank: 1
};

/**
 * Add Cryptorino.io as the second item in the casino toplist
 */
const cryptorinoCasino: CryptoCasino = {
  id: 100001,
  name: "Cryptorino.io",
  logo: "https://placehold.co/300x300/1F2937/FFFFFF?text=Cryptorino.io",
  rating: 4.5,
  description: "Cryptorino.io offers an exceptional crypto gambling experience with thousands of games, lightning-fast withdrawals, and generous bonuses for both new and existing players.",
  acceptedCurrencies: [
    { name: 'Bitcoin', code: 'BTC', icon: '₿' },
    { name: 'Ethereum', code: 'ETH', icon: 'Ξ' },
    { name: 'Tether', code: 'USDT', icon: '₮' },
    { name: 'Cardano', code: 'ADA', icon: 'A' }
  ],
  welcomeBonus: '400% up to 3 BTC + 200 Free Spins',
  affiliateLink: 'https://cryptorino.io/',
  featured: true,
  review: {
    thumbsUp: 876,
    thumbsDown: 21
  },
  rank: 2
};

/**
 * Fetch crypto casino/exchange listings from WordPress and insert fixed entries at the top
 */
export const getCryptoCasinos = async (type = 'casinos', filters?: CasinoListFilters): Promise<CryptoCasino[]> => {
  // Build query parameters
  const endpoint = type === 'exchanges' ? 'crypto-exchanges' : 'casinos';
  let url = `${WORDPRESS_API_URL}/${endpoint}?_embed&per_page=50`;

  if (filters) {
    if (filters.currency) {
      url += `&currency=${filters.currency}`;
    }

    if (filters.minRating) {
      url += `&min_rating=${filters.minRating}`;
    }
  }

  try {
    console.log(`Fetching ${type} listings from WordPress`);
    const response = await fetchWithCache(url, CASINO_CACHE_TIME);

    let items: CryptoCasino[] = [];
    if (Array.isArray(response) && response.length > 0) {
      items = response.map(item => transformListingResponse(item, type));

      // Remove any duplicate Betpanda/Cryptorino entries
      items = items.filter(
        c => c.name.toLowerCase() !== 'betpanda.io' && 
             c.name.toLowerCase() !== 'cryptorino.io' && 
             c.affiliateLink !== betpandaCasino.affiliateLink && 
             c.affiliateLink !== cryptorinoCasino.affiliateLink
      );
    } else {
      items = getMockListings(type);
    }

    // For casinos, insert Betpanda and Cryptorino at the top
    if (type === 'casinos' || type === 'crypto-casinos') {
      return [betpandaCasino, cryptorinoCasino, ...items];
    } 
    // For other types, just return the items
    return items;
  } catch (error) {
    console.error(`Error fetching ${type} listings:`, error);
    let items = getMockListings(type);
    
    // For casinos, insert Betpanda and Cryptorino at the top
    if (type === 'casinos' || type === 'crypto-casinos') {
      return [betpandaCasino, cryptorinoCasino, ...items];
    }
    // For other types, just return the items
    return items;
  }
};

export const trackCasinoClick = async (casinoId: number): Promise<void> => {
  try {
    await fetch(`${WORDPRESS_API_URL}/casinos/${casinoId}/track-click`, {
      method: 'POST',
    });
    console.log(`Tracking click for casino ID: ${casinoId}`);
  } catch (error) {
    console.error('Error tracking casino click:', error);
  }
};

export const submitCasinoReview = async (
  casinoId: number,
  isPositive: boolean
): Promise<void> => {
  try {
    await fetch(`${WORDPRESS_API_URL}/casinos/${casinoId}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isPositive,
      }),
    });
    console.log(`Submitting ${isPositive ? 'positive' : 'negative'} review for casino ID: ${casinoId}`);
  } catch (error) {
    console.error('Error submitting casino review:', error);
  }
};

const transformListingResponse = (wpListing: any, type: string): CryptoCasino => {
  let imageUrl = '';
  try {
    if (
      wpListing._embedded &&
      wpListing._embedded['wp:featuredmedia'] &&
      wpListing._embedded['wp:featuredmedia'][0]
    ) {
      imageUrl = wpListing._embedded['wp:featuredmedia'][0].source_url;
    }
  } catch (error) {
    console.warn('Error extracting listing logo:', error);
  }

  const currencyCodes = wpListing.acf?.accepted_currencies || ['BTC'];

  // Transform currency codes to full objects
  const currencies = currencyCodes.map((code: string) => {
    const currencyInfo = getCryptoCurrencyByCode(code);
    return currencyInfo || { name: code, code: code, icon: code.charAt(0) };
  });

  return {
    id: wpListing.id,
    name: wpListing.title.rendered,
    logo: imageUrl || `https://placehold.co/300x300/1F2937/FFFFFF?text=${encodeURIComponent(wpListing.title.rendered)}`,
    rating: wpListing.acf?.rating || 3,
    description: wpListing.excerpt?.rendered || wpListing.content?.rendered || '',
    acceptedCurrencies: currencies,
    welcomeBonus: wpListing.acf?.welcome_bonus || (type === 'exchanges' ? 'New User Offer' : 'Welcome Bonus'),
    affiliateLink: wpListing.acf?.affiliate_link || '#',
    featured: wpListing.acf?.is_featured || false,
    review: {
      thumbsUp: wpListing.acf?.thumbs_up || 0,
      thumbsDown: wpListing.acf?.thumbs_down || 0
    },
    rank: wpListing.acf?.rank
  };
};

const getCryptoCurrencyByCode = (code: string) => {
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
  return cryptos.find(crypto => crypto.code === code);
};

const getMockListings = (type: string): CryptoCasino[] => {
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

  const names = type === 'exchanges' 
    ? ['CoinTrader', 'CryptoSwap', 'BlockExchange', 'TokenTrade', 'ChainMarket', 'BitSwitch', 'CoinFlip']
    : ['CryptoRoyal', 'BitVegas', 'EtherPlay', 'CoinWager', 'BlockchainBets', 'SatoshiSpins', 'DecentralWin'];

  const bonuses = type === 'exchanges'
    ? ['$50 Sign-up Bonus', '0% Trading Fees for 60 Days', '$100 Welcome Bonus', '$25 Deposit Bonus']
    : ['Up to 5 BTC + 200 Free Spins', '100% up to 1 BTC First Deposit', '200% Match + 50 Free Spins'];

  const descriptions = type === 'exchanges'
    ? [
        'Leading cryptocurrency exchange with low fees and high liquidity.',
        'Trade crypto with confidence on this secure and regulated platform.',
        'Fast and reliable exchange with support for 100+ cryptocurrencies.'
      ]
    : [
        'Premier crypto casino offering a wide range of games with instant withdrawals.',
        'Provably fair gaming platform with over 2000 slots and table games.',
        'Leading blockchain casino with exclusive bonuses for crypto deposits.'
      ];

  return names.map((name, index) => {
    // Choose a random number of cryptocurrencies (3-7)
    const shuffledCryptos = [...cryptos].sort(() => 0.5 - Math.random());
    const selectedCryptos = shuffledCryptos.slice(0, 3 + Math.floor(Math.random() * 5));

    return {
      id: index + 1,
      name,
      logo: `https://placehold.co/300x300/1F2937/FFFFFF?text=${encodeURIComponent(name)}`,
      rating: 3 + Math.floor(Math.random() * 3), // 3-5 star rating
      description: descriptions[index % descriptions.length],
      acceptedCurrencies: selectedCryptos,
      welcomeBonus: bonuses[index % bonuses.length],
      affiliateLink: `https://example.com/refer/${name.toLowerCase().replace(/\s+/g, '')}`,
      featured: index < 3,
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
