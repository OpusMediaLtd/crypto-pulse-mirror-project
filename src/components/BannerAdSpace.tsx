
import React from 'react';
import { Badge } from '@/components/ui/badge';

// Styling constants - you may adjust colors to better fit your palette
const CONTAINER_BG = "bg-gradient-to-r from-[#9b87f5] via-[#7E69AB] to-[#6E59A5]"; // Modern purple gradient
const TEXT_HIGHLIGHT = "bg-white text-[#7E69AB] rounded-md px-2 py-0.5 font-bold mx-1";

const BETPANDA_BANNER_LINK = "https://betpanda.io/";

interface BannerAdSpaceProps {
  message: string;
}

const BannerAdSpace = ({ message }: BannerAdSpaceProps) => (
  <div
    className={`w-full max-w-[444px] h-[88px] mx-auto mb-8 relative cursor-pointer rounded-lg shadow-lg overflow-hidden border border-[#e5deff]`}
    onClick={() => window.open(BETPANDA_BANNER_LINK, '_blank', 'noopener,noreferrer')}
    aria-label="Betpanda Casino Sponsored Content"
    style={{
      background: "linear-gradient(90deg, #e5deff 0%, #d6bcfa 100%)"
    }}
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

export default BannerAdSpace;
