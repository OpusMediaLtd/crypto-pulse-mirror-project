
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import bannerAdService from '@/services/bannerAdService';

// Show the banner at its intended dimensions: 444x136
const BANNER_WIDTH = 444;
const BANNER_HEIGHT = 136;

const BannerAd = () => {
  const [imgError, setImgError] = useState(false);

  const { data: bannerAd } = useQuery({
    queryKey: ['banner-ad', 'banner'],
    queryFn: () => bannerAdService.getRandomBannerAdForLocation('banner'),
    staleTime: 5 * 60 * 1000, // Banner ads are fresh for 5 minutes
  });

  useEffect(() => {
    setImgError(false);
  }, [bannerAd]);

  const handleAdClick = () => {
    if (bannerAd) {
      bannerAdService.trackBannerAdClick(bannerAd.id);
      window.open(bannerAd.link, '_blank', 'noopener,noreferrer');
    }
  };

  if (!bannerAd) {
    return null;
  }

  if (bannerAd.image && !imgError) {
    return (
      <div
        className="w-full mx-auto flex items-center justify-center bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800 dark:to-slate-900 rounded-lg cursor-pointer"
        onClick={handleAdClick}
        style={{ maxWidth: BANNER_WIDTH, height: BANNER_HEIGHT, minHeight: 100, overflow: 'hidden' }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={bannerAd.image}
            alt={bannerAd.title}
            className="object-contain w-full h-full"
            style={{ width: '100%', height: '100%' }}
            onError={() => setImgError(true)}
          />
          <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
            <Badge variant="outline" className="bg-black/50 text-white border-white/20 text-xs">
              Sponsored
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to simple content if fails
  return (
    <div
      className="w-full bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800/50 dark:to-slate-800/80 backdrop-blur-sm border-y dark:border-slate-800 cursor-pointer flex items-center justify-center rounded-lg"
      onClick={handleAdClick}
      style={{ maxWidth: BANNER_WIDTH, height: BANNER_HEIGHT, minHeight: 100, overflow: 'hidden' }}
    >
      <div className="flex items-center space-x-2">
        <Package className="h-5 w-5 text-primary dark:text-gray-400" />
        <Badge variant="outline" className="bg-background/50 dark:bg-slate-900/50">
          Sponsored
        </Badge>
        <span className="text-sm text-muted-foreground dark:text-gray-400">
          {bannerAd.content || bannerAd.title}
        </span>
      </div>
    </div>
  );
};

export default BannerAd;
