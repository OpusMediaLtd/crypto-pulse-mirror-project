import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import NewsCard from '@/components/NewsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';
import wordpress from '@/services/wordpress';
import crypto from '@/services/crypto';

const Index = () => {
  const { data: latestPosts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => wordpress.getPosts(1, 3)
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => wordpress.getCategories()
  });

  const { data: cryptoPrices, isLoading: pricesLoading } = useQuery({
    queryKey: ['crypto-prices'],
    queryFn: () => crypto.getPrices(['bitcoin', 'ethereum', 'binancecoin', 'ripple']),
    refetchInterval: 30000,
  });

  const newsData = [
    {
      title: "Bitcoin Surges Past $40K as Market Shows Strong Recovery Signs",
      description: "The leading cryptocurrency has broken through a key resistance level, suggesting a potential bull run ahead.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      category: "Markets",
      time: "2 hours ago",
      slug: "bitcoin-surges-past-40k"
    },
    {
      title: "Major Bank Announces New Crypto Trading Platform",
      description: "In a significant move for institutional adoption, one of the world's largest banks is launching a cryptocurrency trading service.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      category: "Adoption",
      time: "4 hours ago",
      slug: "major-bank-announces-crypto-platform"
    },
    {
      title: "New NFT Collection Breaks Sales Records",
      description: "A highly anticipated NFT collection has generated over $100 million in sales within its first 24 hours.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      category: "NFTs",
      time: "6 hours ago",
      slug: "nft-collection-breaks-records"
    },
  ];

  const displayedPosts = latestPosts ? 
    latestPosts.map(post => wordpress.convertPostToNewsItem(post)) : 
    newsData;

  return (
    <Layout>
      {/* Featured News */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured News</h2>
          <Button variant="outline" asChild>
            <Link to="/category/featured">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((news, index) => (
            <NewsCard key={index} {...news} />
          ))}
        </div>
      </section>

      {/* Market Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricesLoading ? (
            ['BTC', 'ETH', 'BNB', 'XRP'].map((symbol) => (
              <Card key={symbol} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bitcoin className="h-6 w-6 text-primary" />
                    <span className="font-semibold">{symbol}</span>
                  </div>
                  <TrendingUp className="h-5 w-5 text-muted-foreground animate-pulse" />
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold bg-muted-foreground/20 animate-pulse w-24 h-6 rounded" />
                  <div className="text-sm bg-muted-foreground/20 animate-pulse w-12 h-4 mt-1 rounded" />
                </div>
              </Card>
            ))
          ) : (
            cryptoPrices?.map((crypto) => (
              <Card key={crypto.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bitcoin className="h-6 w-6 text-primary" />
                    <span className="font-semibold">{crypto.symbol.toUpperCase()}</span>
                  </div>
                  {crypto.price_change_percentage_24h > 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold">
                    ${crypto.current_price.toLocaleString()}
                  </div>
                  <div className={`text-sm ${
                    crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {crypto.price_change_percentage_24h > 0 ? '+' : ''}
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoriesLoading ? (
            ['Bitcoin', 'Blockchain', 'NFTs', 'DeFi'].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="h-24 text-lg font-semibold"
                asChild
              >
                <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
              </Button>
            ))
          ) : (
            categories?.slice(0, 4).map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="h-24 text-lg font-semibold"
                asChild
              >
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
              </Button>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
