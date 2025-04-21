
import React from 'react';
import { Badge } from '@/components/ui/badge';

// Styling constants
const TEXT_HIGHLIGHT = "bg-white text-[#7E69AB] rounded-md px-2 py-0.5 font-bold mx-1";
const BANNER_WIDTH = 444;
const BANNER_HEIGHT = 88;

const BannerAd = () => {
  const handleAdClick = () => {
    window.open("https://betpanda.io/", '_blank', 'noopener,noreferrer');
    console.log("Banner ad clicked, redirecting to Betpanda.io");
  };

  return (
    <div
      className="w-full mx-auto relative cursor-pointer rounded-lg shadow-lg overflow-hidden border border-[#e5deff] mb-8"
      onClick={handleAdClick}
      style={{ 
        maxWidth: BANNER_WIDTH, 
        height: BANNER_HEIGHT,
        background: "linear-gradient(90deg, #e5deff 0%, #d6bcfa 100%)"
      }}
      aria-label="Betpanda Casino Sponsored Content"
    >
      <div className="absolute -top-3 left-4 z-10">
        <Badge className="bg-gray-500 hover:bg-gray-500 text-white text-xs py-0.5 px-2 rounded">
          Sponsored
        </Badge>
      </div>
      
      <div className="flex flex-col h-full w-full items-center justify-center px-6 text-center select-none">
        <span className="font-extrabold text-2xl sm:text-xl text-[#403E43] leading-snug tracking-tight">
          <span className={`${TEXT_HIGHLIGHT}`}>Betpanda.io</span> #1 Crypto Casino
        </span>
        <span className="text-sm sm:text-xs text-[#7E69AB] mt-2 font-medium">
          100% Bonus up to 1 BTC&nbsp;·&nbsp;Instant Crypto Withdrawals&nbsp;·&nbsp;Regional Sponsor of Team Argentina
        </span>
      </div>
    </div>
  );
};

export default BannerAd;
