
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import NewsCard from '@/components/NewsCard';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';
import wordpress from '@/services/wordpress';
import { useCurrency } from '@/contexts/CurrencyContext';
import StatsSection from '@/components/StatsSection';
import NewsletterSignup from '@/components/NewsletterSignup';

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
      <StatsSection />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Recent Articles (Left Sidebar) */}
        <div className="md:col-span-3">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
              <h2 className="text-xl font-bold">Latest Crypto News</h2>
            </div>
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <div key={article.id} className="border-b pb-4">
                  <div className="text-xs text-gray-500 mb-1">
                    <span className="text-blue-500">{article.category}</span> • {article.time}
                  </div>
                  <Link to={`/post/${article.slug}`} className="block font-medium hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Stories (Middle) */}
        <div className="md:col-span-6">
          <h2 className="text-xl font-bold mb-4">Crypto News Spotlight</h2>
          <div className="space-y-6">
            {/* Main Featured Story */}
            <Card className="overflow-hidden">
              <Link to={`/post/${featuredStories[0].slug}`} className="block">
                <div className="aspect-video relative">
                  <img 
                    src={featuredStories[0].image} 
                    alt={featuredStories[0].title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{featuredStories[0].title}</h3>
                  <div className="text-sm text-gray-500">
                    {featuredStories[0].time} • by {featuredStories[0].author}
                  </div>
                </div>
              </Link>
            </Card>

            {/* Other Featured Stories */}
            {featuredStories.slice(1).map((story) => (
              <div key={story.id} className="flex gap-4 border-t pt-4">
                <Link to={`/post/${story.slug}`} className="shrink-0">
                  <div className="w-32 h-24 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
                <div>
                  <div className="text-xs text-blue-500 mb-1">{story.category}</div>
                  <Link to={`/post/${story.slug}`} className="font-medium hover:text-primary transition-colors block mb-1">
                    {story.title}
                  </Link>
                  <div className="text-xs text-gray-500">
                    {story.time} • by {story.author}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dives (Right Sidebar) */}
        <div className="md:col-span-3">
          <h2 className="text-xl font-bold mb-4">Deep Dives</h2>
          <div className="space-y-6">
            {deepDives.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <Link to={`/post/${article.slug}`} className="block">
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="object-cover w-full h-40"
                    />
                    <span className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 mb-1">{article.title}</h3>
                    <div className="text-xs text-gray-500">By {article.author}</div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12">
        <NewsletterSignup />
      </div>
    </Layout>
  );
};

export default Index;
