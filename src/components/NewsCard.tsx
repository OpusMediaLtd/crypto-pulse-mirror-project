
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  time: string;
  slug: string;
}

const NewsCard = ({ title, description, image, category, time, slug }: NewsCardProps) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format';
  
  const handleImageError = () => {
    console.warn('Image failed to load:', image);
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow hover-scale">
      <Link to={`/post/${slug}`} className="block">
        <div className="aspect-video relative overflow-hidden group">
          <img 
            src={imageError ? fallbackImage : image} 
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
          />
          <span className="absolute top-2 left-2 bg-primary/90 text-white px-2 py-1 rounded-full text-sm backdrop-blur-sm">
            {category}
          </span>
        </div>
        <CardHeader className="space-y-1 p-4">
          <CardTitle className="line-clamp-2 text-lg font-semibold story-link">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">{description}</p>
          <p className="text-xs text-gray-400">{time}</p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default NewsCard;
