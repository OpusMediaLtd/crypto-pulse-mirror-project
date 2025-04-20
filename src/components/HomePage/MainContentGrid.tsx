
import React from 'react';
import RecentArticles from '@/components/RecentArticles';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeaturedStories from '@/components/FeaturedStories';
import DeepDives from '@/components/DeepDives';
import AdSpace from '@/components/AdSpace';
import TopCasinosCard from './TopCasinosCard';

interface MainContentGridProps {
  recentArticles: any[];
  featuredStories: any[];
  deepDives: any[];
}

const MainContentGrid = ({ recentArticles, featuredStories, deepDives }: MainContentGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-3">
        <RecentArticles articles={recentArticles} />
        <div className="mt-6">
          <AdSpace variant="sidebar" message="Premium Trading Tools - Special Offer" />
        </div>
      </div>

      <div className="md:col-span-6">
        <FeaturedStories stories={featuredStories} />
        <TopCasinosCard />
        <div className="mt-8">
          <AdSpace variant="banner" message="Get Started with Crypto Trading - 30% Discount" />
        </div>
      </div>

      <div className="md:col-span-3">
        <DeepDives articles={deepDives} />
        <div className="mt-6">
          <AdSpace variant="sidebar" message="Crypto Market Analysis Tools" />
        </div>
      </div>
    </div>
  );
};

export default MainContentGrid;
