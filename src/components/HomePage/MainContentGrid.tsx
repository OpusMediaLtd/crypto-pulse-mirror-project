
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
const RecentArticles = React.lazy(() => import('@/components/RecentArticles'));
const NewsletterSignup = React.lazy(() => import('@/components/NewsletterSignup'));
const FeaturedStories = React.lazy(() => import('@/components/FeaturedStories'));
const DeepDives = React.lazy(() => import('@/components/DeepDives'));
const AdSpace = React.lazy(() => import('@/components/AdSpace'));
const TopCasinosCard = React.lazy(() => import('./TopCasinosCard'));

interface MainContentGridProps {
  recentArticles: any[];
  featuredStories: any[];
  deepDives: any[];
}

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
);

const MainContentGrid = ({ recentArticles, featuredStories, deepDives }: MainContentGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-3">
        <Suspense fallback={<LoadingSkeleton />}>
          <RecentArticles articles={recentArticles} />
          <div className="mt-6">
            <AdSpace variant="sidebar" message="Premium Trading Tools - Special Offer" />
          </div>
        </Suspense>
      </div>

      <div className="md:col-span-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <FeaturedStories stories={featuredStories} />
          <TopCasinosCard />
          <div className="mt-8">
            <AdSpace variant="banner" message="Get Started with Crypto Trading - 30% Discount" />
          </div>
        </Suspense>
      </div>

      <div className="md:col-span-3">
        <Suspense fallback={<LoadingSkeleton />}>
          <DeepDives articles={deepDives} />
          <div className="mt-6">
            <AdSpace variant="sidebar" message="Crypto Market Analysis Tools" />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default MainContentGrid;
