
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import wordpress from '@/services/wordpress';
import { useCurrency } from '@/contexts/CurrencyContext';
import StatsSection from '@/components/StatsSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import MainContentGrid from '@/components/HomePage/MainContentGrid';

const Index = () => {
  const { currency } = useCurrency();
  
  const { data: latestPosts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => wordpress.getPosts(1, 5),
    staleTime: 2 * 60 * 1000, // Consider posts fresh for 2 minutes
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => wordpress.getCategories(),
    staleTime: 5 * 60 * 1000, // Categories don't change often
  });

  const displayedPosts = latestPosts || [];
  const recentArticles = displayedPosts;
  const featuredStories = displayedPosts.slice(0, 4);
  const deepDives = displayedPosts.slice(4);

  return (
    <Layout>
      <MainContentGrid 
        recentArticles={recentArticles}
        featuredStories={featuredStories}
        deepDives={deepDives}
      />
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
