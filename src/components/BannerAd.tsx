
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import bannerAdService from '@/services/bannerAdService';

const BannerAd = () => {
  const [imgError, setImgError] = useState(false);
  
  const { data: bannerAd } = useQuery({
    queryKey: ['banner-ad', 'banner'],
    queryFn: () => bannerAdService.getRandomBannerAdForLocation('banner'),
    staleTime: 5 * 60 * 1000, // Banner ads are fresh for 5 minutes
  });

  // Reset image error state when ad changes
  useEffect(() => {
    setImgError(false);
  }, [bannerAd]);

  const handleAdClick = () => {
    if (bannerAd) {
      // Track the click
      bannerAdService.trackBannerAdClick(bannerAd.id);
      
      // Open the link in a new tab
      window.open(bannerAd.link, '_blank', 'noopener,noreferrer');
    }
  };

  if (!bannerAd) {
    return null;
  }

  // Always display an image when available
  if (bannerAd.image && !imgError) {
    return (
      <div 
        className="w-full cursor-pointer bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800 dark:to-slate-900"
        onClick={handleAdClick}
      >
        <div className="container mx-auto px-4 py-2 relative">
          <img 
            src={bannerAd.image} 
            alt={bannerAd.title}
            className="w-full h-auto object-contain max-h-24"
            onError={() => setImgError(true)}
          />
          <div className="absolute top-2 left-4 flex items-center space-x-2">
            <Badge variant="outline" className="bg-background/80 dark:bg-slate-900/80 text-xs">
              Sponsored
            </Badge>
          </div>
        </div>
      </div>
    );
  }
  
  // Fallback to text banner if image fails to load
  return (
    <div 
      className="w-full bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800/50 dark:to-slate-800/80 backdrop-blur-sm border-y dark:border-slate-800 cursor-pointer"
      onClick={handleAdClick}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-primary dark:text-gray-400" />
            <Badge variant="outline" className="bg-background/50 dark:bg-slate-900/50">
              Sponsored
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {bannerAd.content || bannerAd.title}
          </p>
          <span className="text-sm font-medium text-primary hover:text-primary/80 dark:text-white dark:hover:text-gray-300 transition-colors">
            Learn More →
          </span>
        </div>
      </div>
    </div>
  );
};

export default BannerAd;
