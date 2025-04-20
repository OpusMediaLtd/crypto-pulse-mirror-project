
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import NewsCard from '@/components/NewsCard';
import wordpress from '@/services/wordpress';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CategoryPosts = () => {
  const { slug } = useParams<{ slug: string }>();
  const [apiTestStatus, setApiTestStatus] = useState<{success: boolean, message: string} | null>(null);
  
  // Test direct API connection
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        // Test both endpoint formats to diagnose the issue
        const directEndpoint = `${wordpress.WORDPRESS_API_URL}/categories`;
        console.log('Testing direct API connection to:', directEndpoint);
        
        const response = await fetch(directEndpoint, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          setApiTestStatus({ success: true, message: 'API connection successful' });
          console.log('API connection test successful');
        } else {
          setApiTestStatus({ 
            success: false, 
            message: `API returned status: ${response.status} ${response.statusText}` 
          });
          console.error('API connection test failed:', response.status, response.statusText);
        }
      } catch (error) {
        setApiTestStatus({ 
          success: false, 
          message: `API connection error: ${error instanceof Error ? error.message : String(error)}` 
        });
        console.error('API connection test error:', error);
      }
    };
    
    testApiConnection();
  }, []);
  
  const { data: categories, isLoading: categoriesLoading, refetch: refetchCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => wordpress.getCategories(),
    staleTime: 5 * 60 * 1000, // Categories don't change often
    retry: 3,
    retryDelay: 1000,
  });
  
  // Find the category by slug
  const category = categories?.find(cat => cat.slug === slug);
  
  const { 
    data: posts, 
    isLoading: postsLoading, 
    error: postsError,
    refetch: refetchPosts
  } = useQuery({
    queryKey: ['posts', 'category', slug, category?.id],
    queryFn: async () => {
      if (!category?.id && categories?.length > 0) {
        throw new Error(`Category "${slug}" not found`);
      }
      return await wordpress.getPosts(1, 12, category?.id);
    },
    enabled: !!slug || categories?.length > 0,
    staleTime: 2 * 60 * 1000, // Consider posts fresh for 2 minutes
    retry: 3, // Try up to 4 times (initial + 3 retries)
    retryDelay: 1000,
  });

  // Show toast when there's an error
  useEffect(() => {
    if (postsError) {
      console.error('Error loading category posts:', postsError);
      toast({
        title: "Error loading posts",
        description: `There was a problem loading posts for "${slug}". Please check API configuration.`,
        variant: "destructive"
      });
    }
  }, [postsError, slug]);

  // For debugging
  console.log('Category data:', { 
    slug, 
    categoryId: category?.id, 
    categoriesFound: categories?.length,
    postsFound: posts?.length,
    isLoading: postsLoading,
    apiTestStatus,
    error: postsError ? String(postsError) : null
  });

  const isLoading = categoriesLoading || postsLoading;
  
  const handleRefresh = () => {
    setApiTestStatus(null);
    refetchCategories();
    refetchPosts();
    toast({
      title: "Refreshing content",
      description: "Fetching fresh content from the server..."
    });
    
    // Test API connection again
    const testApiConnection = async () => {
      try {
        const directEndpoint = `${wordpress.WORDPRESS_API_URL}/categories`;
        const response = await fetch(directEndpoint);
        setApiTestStatus({ 
          success: response.ok, 
          message: response.ok ? 'Connection successful' : `Status: ${response.status}` 
        });
      } catch (error) {
        setApiTestStatus({ 
          success: false, 
          message: `Connection error: ${error instanceof Error ? error.message : String(error)}` 
        });
      }
    };
    
    testApiConnection();
  };

  return (
    <Layout 
      title={category?.name || slug || 'Category'}
      description={`Latest ${category?.name || slug || 'cryptocurrency'} news and analysis from CryptoPulse`}
      canonical={`https://cryptopulse.com/category/${slug}`}
    >
      <section>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{category?.name || slug}</h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </div>
        
        {apiTestStatus && !apiTestStatus.success && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>API Connection Issue</AlertTitle>
            <AlertDescription>
              There's a problem connecting to the WordPress API: {apiTestStatus.message}
              <div className="mt-2">
                <p className="text-sm">Make sure to set the VITE_WORDPRESS_API environment variable to your WordPress API URL.</p>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : postsError ? (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium mb-2">API Connection Error</h3>
            <p className="text-gray-500 mb-6">
              There was an error connecting to the WordPress API. Please check your API configuration.
            </p>
            
            <Button onClick={handleRefresh} className="mb-4">
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
            
            <div className="mt-4 mx-auto max-w-md">
              <details className="text-left text-xs">
                <summary className="cursor-pointer text-gray-500">Technical details</summary>
                <pre className="mt-2 bg-gray-100 p-4 rounded-lg overflow-auto max-h-40 text-xs whitespace-pre-wrap">
                  {JSON.stringify({ 
                    slug, 
                    categoryId: category?.id,
                    apiUrl: wordpress.WORDPRESS_API_URL,
                    apiTestStatus,
                    error: postsError ? String(postsError) : null 
                  }, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const newsItem = wordpress.convertPostToNewsItem(post);
              return <NewsCard key={post.id} {...newsItem} />;
            })}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium mb-2">No Articles Found</h3>
            <p className="text-gray-500 mb-6">
              There are currently no articles in the "{slug}" category.
            </p>
            
            <Button onClick={handleRefresh} className="mb-4">
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CategoryPosts;
