
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import bannerAdService from '@/services/bannerAdService';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface ArticleInlineAdSpaceProps {
  message: string;
}

const ArticleInlineAdSpace = ({ message }: ArticleInlineAdSpaceProps) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const { data: bannerAd, isLoading } = useQuery({
    queryKey: ['banner-ad', 'article-inline'],
    queryFn: () => bannerAdService.getRandomBannerAdForLocation('article-inline'),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setImgError(false);
    setImgLoaded(false);
    console.log(`ArticleInlineAdSpace loaded with data:`, bannerAd);
  }, [bannerAd]);

  const handleAdClick = () => {
    if (bannerAd) {
      bannerAdService.trackBannerAdClick(bannerAd.id);
      window.open(bannerAd.link, '_blank', 'noopener,noreferrer');
    }
  };

  const getAdStyles = () => "w-full h-[180px]";

  if (isLoading) {
    return (
      <div className={`${getAdStyles()} bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800/50 dark:to-slate-800/80 backdrop-blur-sm border dark:border-slate-800 rounded-lg mb-8 flex items-center justify-center`}>
        <div className="text-center">
          <Package className="h-5 w-5 text-primary dark:text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground dark:text-gray-400">Loading ad...</p>
        </div>
      </div>
    );
  }

  if (!bannerAd) {
    return (
      <div className={`${getAdStyles()} bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800/50 dark:to-slate-800/80 backdrop-blur-sm border dark:border-slate-800 rounded-lg mb-8 flex items-center justify-center`}>
        <div className="text-center">
          <Package className="h-5 w-5 text-primary dark:text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground dark:text-gray-400">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${getAdStyles()} bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800/50 dark:to-slate-800/80 backdrop-blur-sm border dark:border-slate-800 rounded-lg mb-8 cursor-pointer relative`}
      onClick={handleAdClick}
    >
      {!imgLoaded && !imgError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-muted-foreground">Loading ad...</p>
        </div>
      )}
      {bannerAd.image && !imgError ? (
        <div className="h-full relative overflow-hidden rounded-lg">
          <img
            src={bannerAd.image}
            alt={bannerAd.title}
            className={`w-full h-full object-cover ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s ease' }}
            onLoad={() => {
              console.log(`article-inline image loaded successfully:`, bannerAd.image);
              setImgLoaded(true);
            }}
            onError={() => {
              console.error(`Error loading article-inline ad image:`, bannerAd.image);
              setImgError(true);
              toast.error(`Failed to load article-inline ad image`);
            }}
          />
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <Badge variant="outline" className="bg-black/50 text-white border-white/20">
              Sponsored
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
            <p className="text-white text-sm font-medium">
              {bannerAd.content || bannerAd.title}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-full p-4 flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2 mb-4">
            <Package className="h-5 w-5 text-primary dark:text-gray-400" />
            <Badge variant="outline" className="bg-background/50 dark:bg-slate-900/50">
              Sponsored
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground dark:text-gray-400 text-center">
            {bannerAd ? (bannerAd.content || bannerAd.title) : message}
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticleInlineAdSpace;
