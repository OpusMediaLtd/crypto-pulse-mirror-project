import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';
import AdSpace from './AdSpace';

export interface ArticleContentProps {
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  relatedArticles?: Array<{
    id: number;
    title: string;
    slug: string;
    image?: string;
  }>;
}

const ArticleContent = ({
  title,
  content,
  author,
  date,
  category,
  image,
  relatedArticles = []
}: ArticleContentProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-primary hover:underline flex items-center text-sm">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Home
        </Link>
      </div>
      
      <div className="mb-8">
        <div className="text-sm text-primary mb-2">{category}</div>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="text-sm text-gray-500 mb-6">By {author} • {date}</div>
        
        {image && (
          <div className="mb-8">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-auto max-h-[500px] object-cover rounded-lg"
            />
          </div>
        )}
      </div>
      
      <div className="prose max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: content.slice(0, content.length / 2) }} />
        <AdSpace variant="article-inline" message="Discover Premium Crypto Analysis Tools" />
        <div dangerouslySetInnerHTML={{ __html: content.slice(content.length / 2) }} />
      </div>
      
      <AdSpace variant="banner" message="Join Our Premium Trading Community" />
      
      {relatedArticles.length > 0 && (
        <div className="mt-12">
          <Separator className="mb-6" />
          <h3 className="text-xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map(article => (
              <Link 
                key={article.id} 
                to={`/post/${article.slug}`}
                className="group"
              >
                <div className="h-40 overflow-hidden rounded-lg mb-2">
                  <img 
                    src={article.image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-12 py-6 border-t">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Share this article:</span>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-600 hover:text-primary">Twitter</a>
              <a href="#" className="text-gray-600 hover:text-primary">Facebook</a>
              <a href="#" className="text-gray-600 hover:text-primary">LinkedIn</a>
            </div>
          </div>
          <Link to="/" className="text-primary hover:underline">
            View more articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;
