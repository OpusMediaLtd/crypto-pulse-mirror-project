
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
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { currency } = useCurrency();

  const { 
    data: posts, 
    isLoading: postsLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching posts from WordPress');
      // Ensure we're getting enough posts for all sections
      return await wordpress.getPosts(1, 12);
    },
    staleTime: 1 * 60 * 1000, // Consider posts fresh for 1 minute
    retry: 2, // Retry twice
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

  const handleRefresh = () => {
    toast({
      title: "Refreshing content",
      description: "Fetching fresh content from the server..."
    });
    refetch();
  };

  // If there's an error, show the error UI
  if (error) {
    console.error('Error in Index component:', error);
  }

  const displayedPosts = posts || [];
  console.log("Total posts received:", displayedPosts.length);
  
  // Ensure proper distribution of posts to different sections
  const recentArticles = convertWordPressPosts(displayedPosts);
  
  // Make sure we have enough items for featured stories (first 3)
  const featuredStories = convertWordPressPosts(displayedPosts.slice(0, 3));
  
  // Deep dives should use posts 3-5 (if available)
  // Make sure we have at least 2 posts for deep dives
  const deepDivesPosts = displayedPosts.length >= 5 
    ? displayedPosts.slice(3, 5) 
    : (displayedPosts.length >= 3 ? displayedPosts.slice(0, 2) : []);
    
  const deepDives = deepDivesPosts.length > 0 
    ? convertWordPressPosts(deepDivesPosts) 
    : [];
    
  console.log("Articles distribution:", {
    recentTotal: recentArticles.length,
    featuredTotal: featuredStories.length,
    deepDivesTotal: deepDives.length
  });

  return (
    <Layout>
      {error && (
        <Alert variant="destructive" className="max-w-2xl mx-auto mb-8 mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Content Connection Issue</AlertTitle>
          <AlertDescription>
            We're having trouble connecting to our content server. Please check your WordPress API settings.
            <div className="mt-4">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {!error && postsLoading && (
        <div className="max-w-2xl mx-auto text-center py-12">
          <p>Loading content...</p>
        </div>
      )}
      
      {!error && !postsLoading && displayedPosts.length === 0 && (
        <Alert className="max-w-2xl mx-auto mb-8 mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Content Available</AlertTitle>
          <AlertDescription>
            No posts were found. Please check your WordPress API configuration or try again later.
            <div className="mt-4">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {(!error && displayedPosts.length > 0) && (
        <MainContentGrid 
          recentArticles={recentArticles}
          featuredStories={featuredStories}
          deepDives={deepDives}
        />
      )}
      
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
