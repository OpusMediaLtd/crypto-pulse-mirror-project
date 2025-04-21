
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import bannerAdService from '@/services/bannerAdService';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface SidebarAdSpaceProps {
  message: string;
}

const SidebarAdSpace = ({ message }: SidebarAdSpaceProps) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const { data: bannerAd, isLoading } = useQuery({
    queryKey: ['banner-ad', 'sidebar'],
    queryFn: () => bannerAdService.getRandomBannerAdForLocation('sidebar'),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setImgError(false);
    setImgLoaded(false);
    console.log(`SidebarAdSpace loaded with data:`, bannerAd);
  }, [bannerAd]);

  const handleAdClick = () => {
    if (bannerAd) {
      bannerAdService.trackBannerAdClick(bannerAd.id);
      window.open(bannerAd.link, '_blank', 'noopener,noreferrer');
    }
  };

  if (isLoading) {
    return (
      <div className="w-[300px] h-[600px] mx-auto bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800/50 dark:to-slate-800/80 border dark:border-slate-800 rounded-lg mb-8 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-5 w-5 text-primary dark:text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground dark:text-gray-400">Loading ad...</p>
        </div>
      </div>
    );
  }

  if (!bannerAd) {
    return (
      <div className="w-[300px] h-[600px] mx-auto bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800/50 dark:to-slate-800/80 border dark:border-slate-800 rounded-lg mb-8 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-5 w-5 text-primary dark:text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground dark:text-gray-400">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-[300px] h-[600px] mx-auto bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800/50 dark:to-slate-800/80 border dark:border-slate-800 rounded-lg mb-8 cursor-pointer relative overflow-hidden"
      onClick={handleAdClick}
      style={{ width: 300, height: 600 }}
    >
      {!imgLoaded && !imgError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-muted-foreground">Loading ad...</p>
        </div>
      )}
      {bannerAd.image && !imgError ? (
        <>
          <img
            src={bannerAd.image}
            alt={bannerAd.title}
            className={`w-full h-full object-contain ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ width: "100%", height: "100%", transition: 'opacity 0.3s ease' }}
            onLoad={() => {
              console.log(`sidebar image loaded successfully:`, bannerAd.image);
              setImgLoaded(true);
            }}
            onError={() => {
              console.error(`Error loading sidebar ad image:`, bannerAd.image);
              setImgError(true);
              toast.error(`Failed to load sidebar ad image`);
            }}
          />
          <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
            <Badge variant="outline" className="bg-black/50 text-white border-white/20">
              Sponsored
            </Badge>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2 mb-4">
            <Package className="h-5 w-5 text-primary dark:text-gray-400" />
            <Badge variant="outline" className="bg-background/50 dark:bg-slate-900/50">
              Sponsored
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground dark:text-gray-400">
            {bannerAd.content || bannerAd.title}
          </span>
        </div>
      )}
    </div>
  );
};

export default SidebarAdSpace;
