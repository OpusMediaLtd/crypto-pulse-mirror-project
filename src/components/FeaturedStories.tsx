import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import ShareButtons from '@/components/ShareButtons';

interface Story {
  id: number;
  title: string;
  image: string;
  category?: string;
  time: string;
  author: string;
  slug: string;
}

interface FeaturedStoriesProps {
  stories: Story[];
}

const FeaturedStories = ({ stories }: FeaturedStoriesProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Crypto News Spotlight</h2>
      <div className="space-y-6">
        {/* Main Featured Story */}
        <Card className="overflow-hidden">
          <Link to={`/post/${stories[0].slug}`} className="block">
            <div className="aspect-video relative">
              <img 
                src={stories[0].image} 
                alt={stories[0].title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{stories[0].title}</h3>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {stories[0].time} • by {stories[0].author}
                </div>
                <ShareButtons title={stories[0].title} url={`${window.location.origin}/post/${stories[0].slug}`} />
              </div>
            </div>
          </Link>
        </Card>

        {/* Other Featured Stories */}
        {stories.slice(1).map((story) => (
          <div key={story.id} className="flex gap-4 border-t pt-4">
            <Link to={`/post/${story.slug}`} className="shrink-0">
              <div className="w-32 h-24 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
            <div className="flex-1">
              <div className="text-xs text-blue-500 mb-1">{story.category}</div>
              <Link to={`/post/${story.slug}`} className="font-medium hover:text-primary transition-colors block mb-1">
                {story.title}
              </Link>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  {story.time} • by {story.author}
                </div>
                <ShareButtons title={story.title} url={`${window.location.origin}/post/${story.slug}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedStories;
