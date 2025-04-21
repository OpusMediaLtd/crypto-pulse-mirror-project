
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import bannerAdService from '@/services/bannerAdService';
import { useQuery } from '@tanstack/react-query';

interface AdSpaceProps {
  variant: 'banner' | 'sidebar' | 'article-inline';
  message?: string;
}

const AdSpace = ({ variant, message = "Advertisement Space" }: AdSpaceProps) => {
  const [imgError, setImgError] = useState(false);
  
  const { data: bannerAd } = useQuery({
    queryKey: ['banner-ad', variant],
    queryFn: () => bannerAdService.getRandomBannerAdForLocation(variant),
    staleTime: 5 * 60 * 1000, // Banner ads are fresh for 5 minutes
  });

  // Reset image error state when ad changes
  useEffect(() => {
    setImgError(false);
  }, [bannerAd]);

  const getAdStyles = () => {
    switch (variant) {
      case 'banner':
        return "w-full h-[250px]";
      case 'sidebar':
        return "w-full h-[600px]";
      case 'article-inline':
        return "w-full h-[180px]";
      default:
        return "w-full h-[250px]";
    }
  };

  const handleAdClick = () => {
    if (bannerAd) {
      // Track the click
      bannerAdService.trackBannerAdClick(bannerAd.id);
      
      // Open the link in a new tab
      window.open(bannerAd.link, '_blank', 'noopener,noreferrer');
    }
  };

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
      className={`${getAdStyles()} bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800/50 dark:to-slate-800/80 backdrop-blur-sm border dark:border-slate-800 rounded-lg mb-8 cursor-pointer`}
      onClick={handleAdClick}
    >
      {bannerAd.image && !imgError ? (
        <div className="h-full relative overflow-hidden rounded-lg">
          <img 
            src={bannerAd.image} 
            alt={bannerAd.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <Package className="h-4 w-4 text-white" />
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
          {bannerAd?.title === "Betpanda.io – #1 Crypto Casino" && (
            <p className="mt-4 text-xl font-bold text-primary">Betpanda.io</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdSpace;
