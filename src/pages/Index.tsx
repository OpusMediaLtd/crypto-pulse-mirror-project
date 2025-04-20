
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { useCurrency } from '@/contexts/CurrencyContext';
import StatsSection from '@/components/StatsSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import MainContentGrid from '@/components/HomePage/MainContentGrid';
import wordpress from '@/services/wordpress';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Index = () => {
  const { currency } = useCurrency();
  
  const { data: posts, isLoading: postsLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching posts from WordPress');
      try {
        // Explicitly pass numeric parameters to ensure they are treated as numbers
        const wpPosts = await wordpress.getPosts(1, 9);
        console.log('WordPress posts retrieved:', wpPosts);
        return wpPosts;
      } catch (err) {
        console.error('Error fetching posts:', err);
        toast({
          title: "Could not load content",
          description: "We're having trouble connecting to our content server. Please try again later.",
          variant: "destructive"
        });
        throw err;
      }
    },
    staleTime: 2 * 60 * 1000, // Consider posts fresh for 2 minutes
    retry: 2, // Only retry twice
    retryDelay: 1000, // 1 second between retries
  });

  // Convert WordPress posts to the format expected by components
  const convertWordPressPosts = (posts = []) => {
    if (!posts || posts.length === 0) return [];
    
    console.log('Converting WordPress posts to news items:', posts);
    const newsItems = posts.map(post => wordpress.convertPostToNewsItem(post)).filter(Boolean);
    console.log('Converted news items:', newsItems);
    return newsItems;
  };

  // If there's an error or no posts, don't display anything
  if (error || !posts || posts.length === 0) {
    // Return minimal layout with no content
    return (
      <Layout>
        <div className="mt-12 text-center">
          <Alert variant="destructive" className="max-w-2xl mx-auto mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Unable to load content</AlertTitle>
            <AlertDescription>
              We're having trouble connecting to our content server. Please try again later.
            </AlertDescription>
          </Alert>
          <StatsSection />
        </div>
        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </Layout>
    );
  }

  const displayedPosts = posts || [];
  const recentArticles = convertWordPressPosts(displayedPosts);
  
  // Make sure we have enough items for featured and deep dives
  const featuredStories = convertWordPressPosts(displayedPosts.slice(0, 3));
  const deepDivesPosts = displayedPosts.slice(3, 5);
  const deepDives = deepDivesPosts.length > 0 
    ? convertWordPressPosts(deepDivesPosts) 
    : [];

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
