
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface Article {
  id: number;
  title: string;
  image: string;
  category: string;
  author: string;
  slug: string;
}

interface DeepDivesProps {
  articles: Article[];
}

const DeepDives = ({ articles }: DeepDivesProps) => {
  // Fallback image if needed
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Deep Dives</h2>
      <div className="space-y-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <Link to={`/post/${article.slug}`} className="block">
              <div className="relative">
                <img 
                  src={getValidImageUrl(article.image)} 
                  alt={article.title}
                  className="object-cover w-full h-40"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    target.src = fallbackImage;
                  }}
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 bg-background dark:bg-slate-800 text-foreground dark:text-white text-xs px-2 py-1 rounded border border-border dark:border-slate-700">
                  {article.category}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-2 mb-1">{article.title}</h3>
                <div className="text-xs text-gray-500">By {article.author}</div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeepDives;
