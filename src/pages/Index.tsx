
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

// Mock data to use as fallback
const mockPosts = [
  {
    id: 1,
    title: { rendered: "Bitcoin Reaches New All-Time High" },
    excerpt: { rendered: "<p>Bitcoin has surpassed previous records, reaching a new all-time high price.</p>" },
    slug: "bitcoin-new-ath",
    date: new Date().toISOString(),
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format" }],
      'wp:term': [[{ name: "Bitcoin", slug: "bitcoin" }]],
      'author': [{ name: "CryptoPulse Staff" }]
    }
  },
  {
    id: 2,
    title: { rendered: "Ethereum 2.0 Update Progress" },
    excerpt: { rendered: "<p>The latest on Ethereum's transition to proof-of-stake.</p>" },
    slug: "ethereum-2-progress",
    date: new Date().toISOString(),
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600&auto=format" }],
      'wp:term': [[{ name: "Ethereum", slug: "ethereum" }]],
      'author': [{ name: "CryptoPulse Staff" }]
    }
  },
  {
    id: 3,
    title: { rendered: "Regulations Coming For Crypto Exchanges" },
    excerpt: { rendered: "<p>New regulatory frameworks being developed for cryptocurrency exchanges worldwide.</p>" },
    slug: "crypto-exchange-regulations",
    date: new Date().toISOString(),
    _embedded: {
      'wp:featuredmedia': [{ source_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&auto=format" }],
      'wp:term': [[{ name: "Regulation", slug: "regulation" }]],
      'author': [{ name: "CryptoPulse Staff" }]
    }
  }
];

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
      try {
        // Use explicit numeric values to ensure proper parameter type
        const wpPosts = await wordpress.getPosts(1, 9);
        console.log('WordPress posts retrieved:', wpPosts);
        return wpPosts;
      } catch (err) {
        console.error('Error fetching posts:', err);
        toast({
          title: "Could not load content",
          description: "We're having trouble connecting to our content server. Using fallback content.",
          variant: "destructive"
        });
        // Return mock data as fallback
        return mockPosts;
      }
    },
    staleTime: 1 * 60 * 1000, // Consider posts fresh for 1 minute
    retry: 1, // Only retry once
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
      description: "Trying to fetch fresh content from the server..."
    });
    refetch();
  };

  // If there's an error and no posts, show error message
  if (error && (!posts || posts.length === 0)) {
    // Return minimal layout with no content
    return (
      <Layout>
        <div className="mt-12 text-center">
          <Alert variant="destructive" className="max-w-2xl mx-auto mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Unable to load content</AlertTitle>
            <AlertDescription>
              We're having trouble connecting to our content server. Please try again later.
              <div className="mt-4">
                <Button onClick={handleRefresh} variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                </Button>
              </div>
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
