
import { CryptoCasino, CasinoListFilters } from '@/types/CryptoCasino';
import { WORDPRESS_CASINO_ENDPOINT } from './wordpress/config';
import { fetchWithCache } from './wordpress/utils';

// Cache duration for casino data
const CASINO_CACHE_TIME = 15 * 60 * 1000; // 15 minutes

/**
 * Add Betpanda.io casino entry as the first item in the toplist.
 */
const betpandaCasino: CryptoCasino = {
  id: 100000,
  name: "Betpanda.io",
  logo: "https://betpanda.io/cdn/images/logo-dark.svg", // replace with actual Betpanda logo URL if available
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
 * Fetch crypto casino listings from WordPress and insert Betpanda.io at the top
 */
export const getCryptoCasinos = async (filters?: CasinoListFilters): Promise<CryptoCasino[]> => {
  // Build query parameters
  let url = `${WORDPRESS_CASINO_ENDPOINT}?_embed&per_page=50`;

  if (filters) {
    if (filters.currency) {
      url += `&currency=${filters.currency}`;
    }

    if (filters.minRating) {
      url += `&min_rating=${filters.minRating}`;
    }
  }

  try {
    console.log('Fetching casino listings from WordPress');
    const response = await fetchWithCache(url, CASINO_CACHE_TIME);

    let casinos: CryptoCasino[] = [];
    if (Array.isArray(response) && response.length > 0) {
      casinos = response.map(transformCasinoResponse);

      // Remove any duplicate Betpanda-like entries and Cryptorino placement will be next handled
      casinos = casinos.filter(
        c => c.name.toLowerCase() !== 'betpanda.io' && c.affiliateLink !== betpandaCasino.affiliateLink
      );
    } else {
      casinos = getMockCasinoListings();
    }

    // Insert Betpanda.io at the top
    return [betpandaCasino, ...insertCryptorinoSecondIfExists(casinos)];
  } catch (error) {
    console.error('Error fetching casino listings:', error);
    let casinos = getMockCasinoListings();
    // Insert Betpanda.io at the top
    return [betpandaCasino, ...insertCryptorinoSecondIfExists(casinos)];
  }
};

/**
 * Utility: put "Cryptorino.io" as 2nd, if found in the array
 */
function insertCryptorinoSecondIfExists(casinos: CryptoCasino[]): CryptoCasino[] {
  const idx = casinos.findIndex(c => c.name.toLowerCase() === "cryptorino.io" || c.affiliateLink.includes("cryptorino.io"));
  if (idx === -1) return casinos;
  // Remove and insert at 2nd position, after Betpanda
  const [cryptorino] = casinos.splice(idx, 1);
  return [cryptorino, ...casinos];
}

export const trackCasinoClick = async (casinoId: number): Promise<void> => {
  try {
    await fetch(`${WORDPRESS_CASINO_ENDPOINT}/${casinoId}/track-click`, {
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
    await fetch(`${WORDPRESS_CASINO_ENDPOINT}/${casinoId}/review`, {
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

const transformCasinoResponse = (wpCasino: any): CryptoCasino => {
  let imageUrl = '';
  try {
    if (
      wpCasino._embedded &&
      wpCasino._embedded['wp:featuredmedia'] &&
      wpCasino._embedded['wp:featuredmedia'][0]
    ) {
      imageUrl = wpCasino._embedded['wp:featuredmedia'][0].source_url;
    }
  } catch (error) {
    console.warn('Error extracting casino logo:', error);
  }

  const currencyCodes = wpCasino.acf?.accepted_currencies || ['BTC'];

  // Transform currency codes to full objects
  const currencies = currencyCodes.map((code: string) => {
    const currencyInfo = getCryptoCurrencyByCode(code);
    return currencyInfo || { name: code, code: code, icon: code.charAt(0) };
  });

  return {
    id: wpCasino.id,
    name: wpCasino.title.rendered,
    logo: imageUrl || `https://logo.clearbit.com/${wpCasino.slug.replace(/-/g, '')}.com`,
    rating: wpCasino.acf?.casino_rating || 3,
    description: wpCasino.excerpt?.rendered || wpCasino.content?.rendered || '',
    acceptedCurrencies: currencies,
    welcomeBonus: wpCasino.acf?.welcome_bonus || 'Welcome Bonus',
    affiliateLink: wpCasino.acf?.affiliate_link || '#',
    featured: wpCasino.acf?.is_featured || false,
    review: {
      thumbsUp: wpCasino.acf?.thumbs_up || 0,
      thumbsDown: wpCasino.acf?.thumbs_down || 0
    },
    rank: wpCasino.acf?.casino_rank
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
    'MoonStake', 'CryptoJackpot', 'NFTWin', 'WalletWager', 'HashRoll', 'Cryptorino.io'
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
      affiliateLink: name === "Cryptorino.io" ? "https://cryptorino.io/" : `https://example.com/refer/${name.toLowerCase().replace(/\s+/g, '')}`,
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
