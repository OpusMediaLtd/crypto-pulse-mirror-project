
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import NewsCard from '@/components/NewsCard';
import wordpress from '@/services/wordpress';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const CategoryPosts = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: categories, isLoading: categoriesLoading, refetch: refetchCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => wordpress.getCategories(),
    staleTime: 5 * 60 * 1000, // Categories don't change often
    retry: 2,
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
    queryFn: () => wordpress.getPosts(1, 12, category?.id),
    enabled: !!slug,
    staleTime: 2 * 60 * 1000, // Consider posts fresh for 2 minutes
    retry: 2, // Try up to 3 times (initial + 2 retries)
    retryDelay: 1000,
  });

  // Show toast when there's an error
  useEffect(() => {
    if (postsError) {
      console.error('Error loading category posts:', postsError);
      toast({
        title: "Error loading posts",
        description: "There was a problem loading posts for this category. Using fallback content.",
        variant: "destructive"
      });
    }
  }, [postsError]);

  // For debugging
  console.log('Category data:', { 
    slug, 
    categoryId: category?.id, 
    categoriesFound: categories?.length,
    postsFound: posts?.length,
    isLoading: postsLoading,
    error: postsError ? String(postsError) : null
  });

  const isLoading = categoriesLoading || postsLoading;
  
  const handleRefresh = () => {
    refetchCategories();
    refetchPosts();
    toast({
      title: "Refreshing content",
      description: "Fetching fresh content from the server..."
    });
  };

  return (
    <Layout 
      title={category?.name || 'Category'}
      description={`Latest ${category?.name || 'cryptocurrency'} news and analysis from CryptoPulse`}
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
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const newsItem = wordpress.convertPostToNewsItem(post);
              console.log('Rendering news item:', newsItem);
              return <NewsCard key={post.id} {...newsItem} />;
            })}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-gray-500 mb-6">
              {postsError 
                ? "There was an error loading articles. You can try refreshing or check back later."
                : "There are currently no articles in this category. Please check back later."}
            </p>
            
            {postsError && (
              <Button onClick={handleRefresh} className="mb-4">
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            )}
            
            <div className="mt-4 mx-auto max-w-md">
              <details className="text-left text-xs">
                <summary className="cursor-pointer text-gray-500">Debug information</summary>
                <pre className="mt-2 bg-gray-100 p-4 rounded-lg overflow-auto max-h-40 text-xs whitespace-pre-wrap">
                  {JSON.stringify({ 
                    slug, 
                    categoryId: category?.id,
                    apiUrl: wordpress.WORDPRESS_API_URL,
                    error: postsError ? String(postsError) : null 
                  }, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CategoryPosts;
