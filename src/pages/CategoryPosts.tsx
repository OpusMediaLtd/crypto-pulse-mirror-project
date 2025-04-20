
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import NewsCard from '@/components/NewsCard';
import wordpress from '@/services/wordpress';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

const CategoryPosts = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => wordpress.getCategories(),
    staleTime: 5 * 60 * 1000, // Categories don't change often
  });
  
  // Find the category by slug
  const category = categories?.find(cat => cat.slug === slug);
  
  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['posts', 'category', slug, category?.id],
    queryFn: () => wordpress.getPosts(1, 12, category?.id),
    enabled: !!category?.id || !!slug,
    staleTime: 2 * 60 * 1000, // Consider posts fresh for 2 minutes
    retry: 1, // Only retry once to avoid too many failing requests
  });

  // Show toast when there's an error
  React.useEffect(() => {
    if (postsError) {
      console.error('Error loading category posts:', postsError);
      toast({
        title: "Error loading posts",
        description: "There was a problem loading posts for this category.",
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

  return (
    <Layout 
      title={category?.name || 'Category'}
      description={`Latest ${category?.name || 'cryptocurrency'} news and analysis from CryptoPulse`}
      canonical={`https://cryptopulse.com/category/${slug}`}
    >
      <section>
        <h1 className="text-3xl font-bold mb-8">{category?.name || slug}</h1>
        
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
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-gray-500">
              {postsError 
                ? "There was an error loading articles. Please try again later."
                : "There are currently no articles in this category. Please check back later."}
            </p>
            <pre className="mt-4 text-left bg-gray-100 p-4 rounded-lg overflow-auto max-h-40 text-xs">
              Debug info: {JSON.stringify({ slug, categoryId: category?.id }, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CategoryPosts;
