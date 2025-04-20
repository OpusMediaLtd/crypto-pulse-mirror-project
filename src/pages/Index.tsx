import React from 'react';
import Header from '@/components/Header';
import PriceTicker from '@/components/PriceTicker';
import NewsCard from '@/components/NewsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bitcoin, TrendingUp } from 'lucide-react';

const newsData = [
  {
    title: "Bitcoin Surges Past $40K as Market Shows Strong Recovery Signs",
    description: "The leading cryptocurrency has broken through a key resistance level, suggesting a potential bull run ahead.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Markets",
    time: "2 hours ago"
  },
  {
    title: "Major Bank Announces New Crypto Trading Platform",
    description: "In a significant move for institutional adoption, one of the world's largest banks is launching a cryptocurrency trading service.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "Adoption",
    time: "4 hours ago"
  },
  {
    title: "New NFT Collection Breaks Sales Records",
    description: "A highly anticipated NFT collection has generated over $100 million in sales within its first 24 hours.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    category: "NFTs",
    time: "6 hours ago"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PriceTicker />
      
      <main className="container mx-auto px-4 py-8">
        {/* Featured News */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured News</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </section>

        {/* Market Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['BTC', 'ETH', 'BNB', 'XRP'].map((symbol) => (
              <Card key={symbol} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bitcoin className="h-6 w-6 text-primary" />
                    <span className="font-semibold">{symbol}</span>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold">$41,235.67</div>
                  <div className="text-sm text-green-500">+2.5%</div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Bitcoin', 'Blockchain', 'NFTs', 'DeFi'].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="h-24 text-lg font-semibold"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
