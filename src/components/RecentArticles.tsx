
import React from 'react';
import { Link } from 'react-router-dom';

interface Article {
  id: number;
  title: string;
  category: string;
  time: string;
  slug: string;
  image?: string;
}

interface RecentArticlesProps {
  articles: Article[];
}

const RecentArticles = ({ articles }: RecentArticlesProps) => {
  // Fallback image only for broken images, not for mock content
  const fallbackImage = 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format';
  
  // Function to validate image URL
  const getValidImageUrl = (url: string) => {
    if (!url || 
        typeof url !== 'string' || 
        url.includes('undefined') || 
        url.includes('null') || 
        url === 'null' || 
        url === 'undefined' || 
        !url.startsWith('http')) {
      return fallbackImage;
    }
    return url;
  };

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
        <h2 className="text-xl font-bold">Latest Crypto News</h2>
      </div>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="border-b pb-4">
            <div className="flex gap-2">
              {article.image && (
                <Link to={`/post/${article.slug}`} className="shrink-0">
                  <div className="w-16 h-16 overflow-hidden rounded">
                    <img 
                      src={getValidImageUrl(article.image)} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop
                        target.src = fallbackImage;
                      }}
                      loading="lazy"
                    />
                  </div>
                </Link>
              )}
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">
                  <span className="text-blue-500">{article.category}</span> • {article.time}
                </div>
                <Link to={`/post/${article.slug}`} className="block font-medium hover:text-primary transition-colors">
                  {article.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentArticles;
