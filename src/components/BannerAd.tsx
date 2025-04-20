
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';

const BannerAd = () => {
  return (
    <div className="w-full bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800/50 dark:to-slate-800/80 backdrop-blur-sm border-y dark:border-slate-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-primary dark:text-gray-400" />
            <Badge variant="outline" className="bg-background/50 dark:bg-slate-900/50">
              Sponsored
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Get 75% off Bitcoin Pro Trading Suite - Limited Time Offer
          </p>
          <a 
            href="https://example.com/special-offer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:text-primary/80 dark:text-white dark:hover:text-gray-300 transition-colors"
          >
            Learn More →
          </a>
        </div>
      </div>
    </div>
  );
};

export default BannerAd;
