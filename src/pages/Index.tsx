
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { useCurrency } from '@/contexts/CurrencyContext';
import StatsSection from '@/components/StatsSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import MainContentGrid from '@/components/HomePage/MainContentGrid';
import wordpress from '@/services/wordpress';

const Index = () => {
  const { currency } = useCurrency();
  
  const { data: posts, isLoading: postsLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => wordpress.getPosts(1, 9),
    staleTime: 2 * 60 * 1000, // Consider posts fresh for 2 minutes
  });

  // Convert WordPress posts to the format expected by components
  const convertWordPressPosts = (posts = []) => {
    return posts.map(post => wordpress.convertPostToNewsItem(post)).filter(Boolean);
  };

  const displayedPosts = posts || [];
  const recentArticles = convertWordPressPosts(displayedPosts);
  
  // Make sure we have enough items for featured and deep dives
  const featuredStories = convertWordPressPosts(displayedPosts.slice(0, 3));
  const deepDivesPosts = displayedPosts.slice(3, 5);
  const deepDives = deepDivesPosts.length > 0 
    ? convertWordPressPosts(deepDivesPosts) 
    : [];

  if (error) {
    console.error('Error fetching posts:', error);
  }

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
