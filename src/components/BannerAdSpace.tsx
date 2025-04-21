
import React from 'react';
import { Badge } from '@/components/ui/badge';

const BETPANDA_BANNER_LINK = "https://betpanda.io/";

interface BannerAdSpaceProps {
  message: string;
}

const BannerAdSpace = ({ message }: BannerAdSpaceProps) => (
  <div 
    className="w-full max-w-[444px] h-[88px] mx-auto mb-8 relative cursor-pointer"
    onClick={() => window.open(BETPANDA_BANNER_LINK, '_blank', 'noopener,noreferrer')}
    aria-label="Betpanda Casino Sponsored Content"
  >
    <div className="absolute -top-3 left-4 z-10">
      <Badge className="bg-gray-500 hover:bg-gray-500 text-white text-xs py-0.5 px-2 rounded">
        Sponsored
      </Badge>
    </div>
    
    <div className="w-full h-full bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center px-6">
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-semibold text-lg text-primary dark:text-white">
          Betpanda.io - #1 Crypto Casino
        </span>
        <span className="text-sm text-muted-foreground">
          100% Bonus up to 1 BTC · Regional Sponsor of Team Argentina
        </span>
      </div>
    </div>
  </div>
);

export default BannerAdSpace;
