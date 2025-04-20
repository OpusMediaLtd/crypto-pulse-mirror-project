
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  time: string;
}

const NewsCard = ({ title, description, image, category, time }: NewsCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-sm">
          {category}
        </span>
      </div>
      <CardHeader className="space-y-1 p-4">
        <CardTitle className="line-clamp-2 text-lg font-semibold hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
