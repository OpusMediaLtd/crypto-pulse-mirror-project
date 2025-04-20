
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
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
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
