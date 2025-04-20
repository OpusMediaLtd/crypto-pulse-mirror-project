
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

  // Convert WordPress posts to the format expected by components
  const convertWordPressPosts = (posts = []) => {
    return posts.map(post => {
      const featuredMediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475';
      
      return {
        id: post.id,
        title: post.title.rendered,
        category: 'News', // Default category
        time: new Date(post.date).toLocaleString(),
        slug: post.slug,
        image: featuredMediaUrl,
        author: 'CryptoPulse'
      };
    });
  };

  const displayedPosts = latestPosts || [];
  const recentArticles = convertWordPressPosts(displayedPosts);
  const featuredStories = convertWordPressPosts(displayedPosts.slice(0, 4));
  const deepDives = convertWordPressPosts(displayedPosts.slice(4));

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
