import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import wordpress from '@/services/wordpress';
import { useCurrency } from '@/contexts/CurrencyContext';
import StatsSection from '@/components/StatsSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import RecentArticles from '@/components/RecentArticles';
import FeaturedStories from '@/components/FeaturedStories';
import DeepDives from '@/components/DeepDives';

const Index = () => {
  const { currency } = useCurrency();
  
  const { data: latestPosts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => wordpress.getPosts(1, 5)
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => wordpress.getCategories()
  });

  // Mock data for recent articles (left sidebar)
  const recentArticles = [
    {
      id: 1,
      title: "Abraxas Capital Wallet Acquires Nearly $250M in Bitcoin Ahead of Easter",
      category: "Bitcoin News",
      time: "4 hours ago",
      slug: "abraxas-capital-wallet-acquires-bitcoin"
    },
    {
      id: 2,
      title: "Canary Capital Files for Spot Tron ETF with Staking Feature",
      category: "Bitcoin News",
      time: "23 hours ago",
      slug: "canary-capital-files-spot-tron-etf"
    },
    {
      id: 3,
      title: "Pompliano Warns Trump Firing Fed Chair Would Set Dangerous Precedent",
      category: "Bitcoin News",
      time: "1 day ago",
      slug: "pompliano-warns-trump-firing-fed-chair"
    },
    {
      id: 4,
      title: "MoonPay CEO's Letter to Congress: Stablecoin Bill Risks Creating National Monopoly",
      category: "Blockchain News",
      time: "1 day ago",
      slug: "moonpay-ceo-letter-congress-stablecoin"
    },
    {
      id: 5,
      title: "Coinbase Faces Déjà Vu: Oregon AG 'Revives' SEC Allegations in High-Stakes State Suit",
      category: "Crypto Regulation News",
      time: "1 day ago",
      slug: "coinbase-faces-deja-vu-oregon-ag"
    }
  ];

  // Mock data for featured stories (middle)
  const featuredStories = [
    {
      id: 1,
      title: "Rugpull Losses Soar 6,500% in 2025 as Crypto Scams Turn Deadlier, Nearly $6B Lost – DappRadar",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      time: "2 days ago",
      author: "Hassan Shittu",
      slug: "rugpull-losses-soar-2025-crypto-scams"
    },
    {
      id: 2,
      title: "Lyn Alden Says Bitcoin Would Be Higher if Not for Trump's Tariff Shock",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      category: "Bitcoin News",
      time: "1 day ago",
      author: "Ruholamin Haqshanas",
      slug: "lyn-alden-bitcoin-higher-trump-tariff"
    },
    {
      id: 3,
      title: "Sam Bankman-Fried Moved to Notorious LA Prison That Housed Al Capone, Charles Manson",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      category: "Blockchain News",
      time: "1 day ago",
      author: "Julia Smith",
      slug: "sam-bankman-fried-moved-notorious-prison"
    },
    {
      id: 4,
      title: "Trump's Return Could Ignite Crypto Market Growth, CleanSpark CEO Predicts After SEC Shift",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      category: "Regulation News",
      time: "1 day ago",
      author: "Julia Smith",
      slug: "trump-return-ignite-crypto-market-growth"
    }
  ];

  // Mock data for deep dives (right sidebar)
  const deepDives = [
    {
      id: 1,
      title: "Why Bitcoin Might Be About to Turn Bullish Again",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      category: "Featured",
      author: "Connor Sephton",
      slug: "why-bitcoin-might-turn-bullish-again"
    },
    {
      id: 2,
      title: "What Trump's Attacks on Jerome Powell Could Mean for Crypto",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      category: "Featured",
      author: "Connor Sephton",
      slug: "trumps-attacks-jerome-powell-crypto"
    },
    {
      id: 3,
      title: "Crypto's Banking Battle: Are Regulators Going Too Far?",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      category: "Opinion",
      author: "Daniel Richards",
      slug: "crypto-banking-battle-regulators"
    },
    {
      id: 4,
      title: "The Bitcoin 'Honeymoon' May Be Over. Here's Why",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      category: "Featured",
      author: "Jeffrey Green",
      slug: "bitcoin-honeymoon-may-be-over"
    }
  ];

  const displayedPosts = latestPosts ? 
    latestPosts.map(post => wordpress.convertPostToNewsItem(post)) : 
    recentArticles;

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Recent Articles (Left Sidebar) */}
        <div className="md:col-span-3">
          <RecentArticles articles={recentArticles} />
        </div>

        {/* Featured Stories (Middle) */}
        <div className="md:col-span-6">
          <FeaturedStories stories={featuredStories} />
        </div>

        {/* Deep Dives (Right Sidebar) */}
        <div className="md:col-span-3">
          <DeepDives articles={deepDives} />
        </div>
      </div>

      <div className="mt-12">
        <StatsSection />
      </div>
      <div className="mt-12">
        <NewsletterSignup />
      </div>
    </Layout>
  );
};

export default Index;
