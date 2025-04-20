import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import wordpress from '@/services/wordpress';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => wordpress.getPostBySlug(slug || ''),
    enabled: !!slug,
    retry: 1, // Only retry once for 404s
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  if (isLoading) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse space-y-4 w-full max-w-3xl">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout title="Article Not Found">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  const featuredMediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475';

  return (
    <Layout 
      title={post.title.rendered}
      description={post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}
      ogImage={featuredMediaUrl}
      ogType="article"
      canonical={`https://cryptopulse.com/post/${slug}`}
    >
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div className="flex items-center justify-between text-gray-500 text-sm mb-6">
            <span>{new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
            <img 
              src={featuredMediaUrl} 
              alt={post.title.rendered}
              className="object-cover w-full h-full"
            />
          </div>
        </header>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
        
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-bold mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <Button variant="outline">Twitter</Button>
            <Button variant="outline">Facebook</Button>
            <Button variant="outline">LinkedIn</Button>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default PostDetail;
