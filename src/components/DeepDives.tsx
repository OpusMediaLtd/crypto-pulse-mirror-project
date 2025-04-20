
import React from 'react';
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
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Deep Dives</h2>
      <div className="space-y-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <Link to={`/post/${article.slug}`} className="block">
              <div className="relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="object-cover w-full h-40"
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
