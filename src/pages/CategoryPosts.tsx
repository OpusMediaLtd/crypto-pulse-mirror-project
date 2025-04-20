
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import NewsCard from '@/components/NewsCard';
import wordpress from '@/services/wordpress';

const CategoryPosts = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => wordpress.getCategories()
  });
  
  const category = categories?.find(cat => cat.slug === slug);
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', 'category', slug],
    queryFn: () => wordpress.getPosts(1, 12, category?.id),
    enabled: !!category?.id
  });

  return (
    <Layout 
      title={category?.name || 'Category'}
      description={`Latest ${category?.name || 'cryptocurrency'} news and analysis from CryptoPulse`}
      canonical={`https://cryptopulse.com/category/${slug}`}
    >
      <section>
        <h1 className="text-3xl font-bold mb-8">{category?.name || 'Category'}</h1>
        
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
              return <NewsCard key={post.id} {...newsItem} />;
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-gray-500">
              There are currently no articles in this category. Please check back later.
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CategoryPosts;
