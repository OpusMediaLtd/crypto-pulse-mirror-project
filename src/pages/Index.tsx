
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { useCurrency } from '@/contexts/CurrencyContext';
import StatsSection from '@/components/StatsSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import MainContentGrid from '@/components/HomePage/MainContentGrid';
import wordpress from '@/services/wordpress';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const { currency } = useCurrency();
  
  const { data: posts, isLoading: postsLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching posts from WordPress');
      const wpPosts = await wordpress.getPosts(1, 9);
      console.log('WordPress posts retrieved:', wpPosts);
      return wpPosts;
    },
    staleTime: 2 * 60 * 1000, // Consider posts fresh for 2 minutes
  });

  // Convert WordPress posts to the format expected by components
  const convertWordPressPosts = (posts = []) => {
    console.log('Converting WordPress posts to news items:', posts);
    const newsItems = posts.map(post => wordpress.convertPostToNewsItem(post)).filter(Boolean);
    console.log('Converted news items:', newsItems);
    return newsItems;
  };

  const displayedPosts = posts || [];
  const recentArticles = convertWordPressPosts(displayedPosts);
  
  // Make sure we have enough items for featured and deep dives
  const featuredStories = convertWordPressPosts(displayedPosts.slice(0, 3));
  const deepDivesPosts = displayedPosts.slice(3, 5);
  const deepDives = deepDivesPosts.length > 0 
    ? convertWordPressPosts(deepDivesPosts) 
    : [];

  React.useEffect(() => {
    if (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Could not load latest posts",
        description: "Using placeholder content instead",
        variant: "destructive"
      });
    }
  }, [error]);

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
